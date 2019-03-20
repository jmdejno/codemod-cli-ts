import globby from "globby";
import execa from "execa";
import chalk from "chalk";
import path from "path";

/**
 * Run jscodeshift transforms on paths
 * @param transformPath path to transform. Passed to `-t` in `jscodeshift`
 * @param options options to pass to jscodeshift.
 * @param globs paths or globs to run transforms on.
 */
export async function runTransform(
  transformPath: string,
  options: string[],
  ...globs: string[]
) {
  const paths = await Promise.all(globs.map(async glob => await globby(glob)));
  return Promise.all(
    paths.map(paths => executeTransform(transformPath, options, ...paths))
  );
}

/**
 * Execute transform in child process.
 * @param transformPath
 * @param options
 * @param paths
 */
export async function executeTransform(
  transformPath: string,
  options: string[],
  ...paths: string[]
) {
  try {
    const jscodeshift = getJSCodeshiftExecPath();
    return execa(jscodeshift, ["-t", transformPath, ...options, ...paths]);
  } catch (err) {
    console.log(chalk.red(err.stack));
    process.exitCode = 1;
    throw err;
  }
}

/**
 * Get `jscodeshift` executable path
 */
export function getJSCodeshiftExecPath(): string {
  const jscodeshiftPkg = require("jscodeshift/package");
  const jscodeshiftPath = path.dirname(require.resolve("jscodeshift/package"));
  return path.join(jscodeshiftPath, jscodeshiftPkg.bin.jscodeshift);
}
