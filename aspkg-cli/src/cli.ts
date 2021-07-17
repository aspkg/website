import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { AlreadyAuthenticatedException } from "./errors";
import { login } from "./lib";

yargs(hideBin(process.argv))
  .scriptName("aspkg")
  .usage("Usage: $0 <command> [options]")
  .command("publish", "Publish the package")
  .command(
    "login",
    "Log in to the registry",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
    async () => {
      try {
        await login();
      } catch (e) {
        if (e instanceof AlreadyAuthenticatedException) {
          console.log("Already authenticated.");
        } else {
          console.log("Unimplemented.");
        }
      }
    }
  )
  .command("logout", "Log out of the registry")
  .help().argv;
