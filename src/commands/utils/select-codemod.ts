import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { pathExists } from "fs-extra";
import chalk from "chalk";

const readdir = promisify(fs.readdir);
const prompt = inquirer.createPromptModule();

export interface ISelectCodemodOptions {
  message: string;
}

const defaultSelectOptions: ISelectCodemodOptions = {
  message: "Select a codemod:"
};

export const findCodemods = async (
  dir: string,
  pattern?: string | RegExp
): Promise<string[]> => {
  try {
    const items = await readdir(dir);
    return pattern ? (items || []).filter(item => item.match(pattern)) : items;
  } catch (err) {
    console.log(
      chalk.red(`${dir} does not exist.\n`),
      chalk.yellow("Must provide an existing directory. `--dir [directory]`.")
    );
  }
};

export const selectCodemod = async (
  codemods: string[],
  options: ISelectCodemodOptions = defaultSelectOptions
) => {
  const { message } = options;
  return prompt<{ codemod: string }>({
    name: "codemod",
    type: "list",
    message,
    choices: codemods
  });
};

export const promptForCodemod = async (dir: string) => {
  console.log("Selecting codemods from: ", chalk.green(dir));
  const codemods = await findCodemods(dir);
  if (!codemods || !codemods.length) {
    return;
  }
  return selectCodemod(codemods).then(res => res.codemod);
};

export const ensureCodemod = async (codemod: string, dir: string) => {
  if (codemod && await pathExists(path.join(dir, codemod))) {
    return codemod;
  } else {
    codemod && console.log(chalk.red(codemod), chalk.yellow("did not exist."))
    return await promptForCodemod(dir);
  }
};
