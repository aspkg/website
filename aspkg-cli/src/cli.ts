/* eslint-disable @typescript-eslint/no-empty-function */
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { AlreadyAuthenticatedException, NotAuthenticatedException } from './errors'
import { login, logout, waitForLocks } from './lib'
import chalk from 'chalk'
import open from 'open'

/**
 * The main Command Line Interface.
 * @module cli
 */

yargs(hideBin(process.argv))
    .scriptName('aspkg')
    .usage('Usage: $0 <command> [options]')
    .command('publish', 'Publish the package')
    .command(
        'login',
        'Log in to the registry',
        () => {},
        async () => {
            try {
                await login((code, url) => {
                    open(url)

                    console.log(`Enter the following code in your newly opened browser:\n\n${chalk.bold(code)}\n`)
                    console.log(chalk.red.bold`If your browser didn't open: `)
                    console.log('Head over to ' + chalk.blueBright.bold(url) + '\n')
                })

                console.log(chalk.greenBright`You're now logged in!`)
                await gracefulShutdown(0)
            } catch (e) {
                if (e instanceof AlreadyAuthenticatedException) {
                    console.log(chalk.greenBright`You're already authenticated!`)
                    console.log('use ' + chalk.blueBright.bold`aspkg logout` + ' to log out of your current session.')
                    await gracefulShutdown(0)
                } else if (e instanceof Error) {
                    console.log(chalk.bold.red(e.name + ': ') + e.message)
                    await gracefulShutdown(1)
                } else {
                    console.log(chalk.bold.red(e))
                    await gracefulShutdown(1)
                }
            }
        }
    )
    .command(
        'logout',
        'Log out of the registry',
        () => {},
        async () => {
            try {
                await logout()
                console.log(chalk.greenBright`Successfully logged out.`)
                await gracefulShutdown(0)
            } catch (e) {
                if (e instanceof NotAuthenticatedException) {
                    console.log(chalk.greenBright`Already logged out.`)
                    console.log('use ' + chalk.blueBright.bold`aspkg login` + ' to log in before logging out!')
                    await gracefulShutdown(0)
                } else {
                    console.log(chalk.bold.red(e))
                    await gracefulShutdown(1)
                }
            }
        }
    )
    .help().argv

async function gracefulShutdown(code?: number) {
    await waitForLocks()
    process.exit(code)
}
