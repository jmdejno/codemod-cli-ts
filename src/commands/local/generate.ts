import yargs from "yargs";
import fs from "fs-extra";
import path from "path";
import { getDefaultDir } from "../utils/constants";
const { stripIndent } = require("common-tags");

interface IGenerateArgs {
  codemod: string;
  dir: string;
}

const command = "generate <codemod>";
const desc = "Generate a new codemod.";

const builder = (yargs: yargs.Argv<IGenerateArgs>) => {
  yargs.positional("codemod", {
    describe: "codemod name to generate."
  });
  // @ts-ignore
  yargs.option("dir", {
    alias: "d",
    describe: "output directory to place codemod",
    default: getDefaultDir(),
    type: "string"
  });
};

const handler = (yargs: yargs.Arguments<IGenerateArgs>) => {
  const { codemod, dir } = yargs;
  const outputFileName = path.join(dir, codemod, "index.ts");
  const packageJSON = require("import-cwd")("./package.json");
  const packageName = packageJSON.name;

  fs.outputFileSync(
    outputFileName,
    stripIndent`
      import { getParser, getOptions } from '${packageName}';
      import { API, FileInfo } from 'jscodeshift'

      export = function ${codemod}(file: FileInfo, api: API) {
          const j = getParser(api);
          const options = getOptions();

          const root = j(file.source);
          // TODO: codemod here!
          return root.toSource();
        }
    `,
    {
      encoding: "utf8"
    }
  );
};

export = {
  command,
  desc,
  builder,
  handler
};
