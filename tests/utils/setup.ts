import { writeJSONSync, ensureDirSync, remove } from "fs-extra";
import {createTempDir, TempDir} from 'broccoli-test-helper'
import path from "path";


export const setupTempModule = async (): Promise<TempDir> => {
  const dir = await createTempDir()
  writeJSONSync(path.join(dir.path(), "package.json"), {
    name: "jest",
    version: "1.0.0",
    description: "Testing codemod-cli-ts.",
    main: "index.js",
    files: ["src"],
    keywords: [
      "codemod-cli-ts"
    ],
    "codemod-cli-ts": {

    }
  });
  return dir;
};

export const teardownTempModule = (dir: TempDir) => {
  dir.dispose();
}
