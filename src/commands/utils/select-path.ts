import inquirer from "inquirer";
import { PathPrompt } from 'inquirer-path';

const prompt = inquirer.createPromptModule();
prompt.registerPrompt("path", PathPrompt);

export const promptForPaths = async (
  message: string = "Path or glob to run codemod on:"
) => {
  return prompt<{paths: string}>({
    type: "path",
    name: "paths",
    message
  }).then(res => [res.paths]);
};

export const ensurePaths = async (paths: string[]) => {
  return paths && paths.length ? paths : await promptForPaths();
};
