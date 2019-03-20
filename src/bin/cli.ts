#!/usr/bin/env node

import yargs from "yargs";
import chalk from "chalk";

function insideProject() {
  let nearestPackagePath = require("pkg-up").sync();
  if (nearestPackagePath === null) {
    return false;
  }
  const pkg = require(nearestPackagePath);
  return pkg.keywords && pkg.keywords.includes("codemod-cli-ts");
}

// if(insideProject()) {
yargs
  .locale("en")
  .commandDir(`../commands`)
  .demandCommand()
  .help()
  .parse();
