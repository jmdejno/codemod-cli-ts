#!/usr/bin/env node

import yargs from "yargs";
import importLocal from "import-local";

function insideProject() {
  const nearestPackagePath = require("pkg-up").sync();
  if (nearestPackagePath === null) {
    return false;
  }
  const pkg = require(nearestPackagePath);
  return pkg.keywords && pkg.keywords.includes("codemod-cli-ts");
}

yargs
    .locale("en")
    .commandDir("../commands")

// if (importLocal(__filename)) {
  yargs
    .commandDir(`../commands/local`, { exclude: /(link\.js)/ })
    .demandCommand()
    .help()
    .parse();
// } else {
//   yargs

//     // .commandDir(`../commands/global`, { exclude: /(link\.js)/ })
//     .demandCommand()
//     .help()
//     .parse();
// }
