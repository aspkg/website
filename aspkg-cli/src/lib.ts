import { homedir } from "os";
import { join } from "path";
import { readFile, writeFile } from "fs/promises";
import { AlreadyAuthenticatedException } from "./errors";

/**
 * JS API for the CLI.
 * @module lib
 */

interface Configuration {
  accessToken?: string;
}

const aspkgrcPath = join(homedir(), ".aspkgrc");

const config: Promise<Configuration> = readFile(aspkgrcPath, "utf-8")
  .then<Configuration>((r) => JSON.parse(r))
  .catch(() => writeFile(aspkgrcPath, "{}").then<Configuration>(() => ({})));

/**
 * Check whether the current user is authenticated.
 * @returns {Promise<boolean>} a Promise that represents whether or not the current user is authenticated.
 * @async
 */
export async function authenticated(): Promise<boolean> {
  return !!(await config).accessToken;
}

/**
 * Prompts the user to log in.
 * @async
 * @returns {Promise<boolean>} a Promise that represents whether or not authentication was successful.
 * @throws {AlreadyAuthenticatedException}
 */
export async function login(): Promise<boolean> {
  const isAuthenticated = await authenticated();
  if (isAuthenticated) {
    throw new AlreadyAuthenticatedException();
  }
  throw "Unimplemented.";
}
