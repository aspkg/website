import { homedir } from "os";
import { join } from "path";
import { readFileSync, writeFileSync } from "fs";
import { AlreadyAuthenticatedException } from "./errors";

/**
 * JS API for the CLI.
 * @module lib
 */

interface Configuration {
  accessToken?: string;
}

const aspkgrcPath = join(homedir(), ".aspkgrc");

const config: Configuration = (() => {
  try {
    return JSON.parse(readFileSync(aspkgrcPath, "utf-8"));
  } catch {
    writeFileSync(aspkgrcPath, "{}");
    return {};
  }
})();

/**
 * Check whether the current user is authenticated.
 * @returns {boolean} a boolean that represents whether or not the current user is authenticated.
 */
export function authenticated(): boolean {
  return !!config.accessToken;
}

/**
 * Prompts the user to log in.
 * @async
 * @returns {Promise<boolean>} a Promise that represents whether or not authentication was successful.
 * @throws {AlreadyAuthenticatedException}
 */
export function login(): Promise<boolean> {
  return new Promise((resolve) => {
    if (authenticated()) {
      throw new AlreadyAuthenticatedException();
    }
    throw "Unimplemented.";
  });
}
