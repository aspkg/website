/**
 * Contains custom error classes.
 * @module errors
 */

/**
 * Thrown when attempting to log in while already authenticated.
 */
export class AlreadyAuthenticatedException extends Error {
    constructor() {
        super('Attempt to call `login` when user is already authenticated.')
        this.name = 'AlreadyAuthenticated'
    }
}

/**
 * Thrown when attempting to log out while unauthenticated.
 */
export class NotAuthenticatedException extends Error {
    constructor() {
        super('Attempt to call `logout` when user is unauthenticated.')
        this.name = 'NotAuthenticated'
    }
}
