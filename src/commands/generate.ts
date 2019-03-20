import yargs from "yargs";
import fs from "fs-extra";
import path from "path";
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
  yargs.option("dir", {
    alias: "d",
    describe: "output directory to place codemod",
    default: path.join(process.cwd(), "transforms"),
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

      export default function ${codemod}(file, api) {
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

module.exports = {
  command,
  desc,
  builder,
  handler
};
