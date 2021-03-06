import chalk from "chalk";

import App from "./app";
import AssetsController from "./controllers/assets";
import JobController from "./controllers/job";
import ScriptsController from "./controllers/scripts";
import UserController from "./controllers/user";
import TestDBController from "./controllers/testDB";

import { checkIfMongoDBIsRunning } from "./util";

/**
 * Main Server Application.
 */
const main = async (): Promise<void> => {
  try {
    const isRunning = await checkIfMongoDBIsRunning();

    if (!isRunning) {
      console.error(chalk.red("ERROR: Could not connect to MongoDB URL"));
      console.log("");
      console.error(
        `Attempted to connect to: ${chalk.red(process.env.MONGODB_URL)}`
      );
      console.log("");
      console.warn(
        "If this is a local MongoDB instance, please ensure you have started MongoDB on your machine."
      );
      console.warn(
        "If this is a remote MongoDB instance, please double check the value for MONGODB_URL in `/.env-cmdrc.json`."
      );
      console.log("");
      return process.exit(1);
    }

    if (!process.env.PORT) throw new Error("No PORT");

    const app = new App(
      [
        new AssetsController(),
        new JobController(),
        new ScriptsController(),
        new UserController(),
        new TestDBController(),
      ],
      process.env.PORT
    );

    app.listen();
  } catch (error) {
    console.error(error);
  }
};

main();
