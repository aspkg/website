import { homedir } from 'os'
import { join } from 'path'
import { readFile, writeFile } from 'fs/promises'
import { AlreadyAuthenticatedException } from './errors'
import { client_id, scope } from './config'
import fetch, { Headers } from 'undici-fetch'

/**
 * JS API for the CLI.
 * @module lib
 */

interface Configuration {
    accessToken?: string
}

const aspkgrcPath = join(homedir(), '.aspkgrc')
const locks: Promise<unknown>[] = []

let config: Configuration = {}

locks.push(
    readFile(aspkgrcPath, 'utf-8')
        .then((r) => {
            config = JSON.parse(r)
        })
        .catch(() => writeFile(aspkgrcPath, '{}'))
)

/**
 * Saves the current configuration in the background.
 */
function saveConfig() {
    locks.push(writeFile(aspkgrcPath, JSON.stringify(config)))
}

/**
 * Wait for configuration reads and writes to be completed.
 * @returns {Promise<void>}
 * @async
 */
export async function waitForLocks(): Promise<void> {
    await Promise.all(locks)
}

/**
 * Check whether the current user is authenticated.
 * @returns {Promise<boolean>} a Promise that represents whether or not the current user is authenticated.
 * @async
 */
export async function authenticated(): Promise<boolean> {
    await waitForLocks()
    return !!config.accessToken
}

/**
 * Prompts the user to log in.
 * @async
 * @returns {Promise<void>} a Promise that rejects when authorization was unsuccessful.
 * @throws {AlreadyAuthenticatedException}
 */
export async function login(codeCallback: (code: string, url: string) => void): Promise<void> {
    const isAuthenticated = await authenticated()
    if (isAuthenticated) {
        throw new AlreadyAuthenticatedException()
    }

    const headers = new Headers()
    headers.set('content-type', 'application/json;charset=utf-8')
    headers.set('accept', 'application/json')

    const codePayload: {
        client_id: string
        scope?: string
    } = { client_id }

    if (scope) codePayload.scope = scope

    const codes: {
        device_code: string
        user_code: string
        verification_uri: string
        expires_in: number
        interval: number
    } = await fetch('https://github.com/login/device/code', {
        method: 'POST',
        body: JSON.stringify(codePayload),
        headers,
    }).then((r) => r.json())

    codeCallback(codes.user_code, codes.verification_uri)

    let interval = codes.interval * 1000
    const pollPayload = {
        method: 'POST',
        body: JSON.stringify({
            client_id,
            device_code: codes.device_code,

            // https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#input-parameters-1
            grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
        }),
        headers,
    }

    interface PollError {
        error: string
    }

    interface PollSuccess {
        access_token: string
        token_type: string
        scope: string
    }

    return await new Promise((resolve, reject) =>
        setTimeout(async function recurse() {
            const pollResponse: PollError | PollSuccess = await fetch(
                'https://github.com/login/oauth/access_token',
                pollPayload
            ).then((r) => r.json())

            if ('error' in pollResponse) {
                switch (pollResponse.error) {
                    case 'authorization_pending':
                        break
                    case 'slow_down':
                        interval += 5000
                        break
                    case 'expired_token':
                        return reject('Code has expired. Please use `aspkg login` again for a new code.')
                    case 'unsupported_grant_type':
                        // Shouldn't happen.
                        return reject('An internal error has occurred. (code 1)')
                    case 'incorrect_client_credentials':
                        return reject('An internal error has occurred. (code 2)')
                    case 'access_denied':
                        return reject('Log in was unsuccessful.')
                }

                setTimeout(recurse, interval)
            } else {
                config.accessToken = pollResponse.access_token
                saveConfig()
                resolve()
            }
        }, interval)
    )
}
