import yargs from "yargs";

interface ILinkArgs {
  codemod: string;
  dir: string;
}

const command = "link [codemod]"
const desc = "link a codemod globally to run using `codemod-cli-ts run <codemod> <...paths>`"
const builder = (yargs: yargs.Argv<ILinkArgs>) => {
  yargs.positional("codemod", {
    describe: "codemod to link."
  })
  // @ts-ignore
  // yargs.option("dir", defaultOptions.dir)
}

const handler = (argv: yargs.Argv<ILinkArgs>) => {

}

export = {
  command,
  desc,
  builder,
  handler
}