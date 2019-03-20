import yargs = require("yargs");
import { getDefaultDir } from "./utils/constants";
import { ensureCodemod } from "./utils/select-codemod";
import { ensurePaths } from "./utils/select-path";
import { filterOptions } from "./utils/helpers";

interface IRunArgs {
  codemod: string;
  paths: string[];
  dir: string;
  d: string;
}

const runOptions: ReadonlyArray<keyof IRunArgs> = [
  "codemod",
  "d",
  "paths",
  "dir"
];

const command = "run [codemod] [paths..]";
const desc =
  "Run a codemod on paths. Pass any additional options to `jscodeshift`.";
const builder = (yargs: yargs.Argv<IRunArgs>) => {
  yargs.positional("codemod", {
    desc: "Codemod to run.",
    type: "string"
  });
  yargs.positional("paths", {
    desc: "Paths or globs to run codemod on."
  });
  // @ts-ignore
  yargs.option("dir", {
    desc: "directory of codemod.",
    alias: "d",
    default: getDefaultDir(true),
    type: "string"
  });
};

const handler = async (argv: yargs.Arguments<IRunArgs>) => {
  let { codemod, paths, dir, ...options } = argv;
  codemod = await ensureCodemod(codemod, dir);
  paths = await ensurePaths(paths);
  const jscodeshiftArgs = filterOptions(options, runOptions);
  console.log(jscodeshiftArgs);
};

export = {
  command,
  desc,
  builder,
  handler
};
