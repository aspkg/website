/**
 * Contains custom error classes.
 * @module errors
 */

/**
 * Thrown when attempting to call the login function while already authenticated.
 * @see {module:lib.login}
 */
export class AlreadyAuthenticatedException extends Error {
    constructor() {
        super('Attempt to call `login` when user is already authenticated.')
        this.name = 'AlreadyAuthenticated'
    }
}
