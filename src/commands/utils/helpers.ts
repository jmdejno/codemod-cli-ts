import { defaultArguments, ICodemodCLiTSConfig } from "./constants";

export const filterOptions = (options: {[arg: string]: any}, exclude: ReadonlyArray<string> = []) => {
  const excludeArguments = [...defaultArguments, ...exclude]
  return Object.entries(options).reduce((acc, [key, value]) => {
    if(!excludeArguments.includes(key)) {
      acc[key] = value
    }
    return acc;
  }, {});
}

export const getPkgJsonConfig = (): ICodemodCLiTSConfig => {
  const nearestPackagePath = require("pkg-up").sync();
  const pkg = nearestPackagePath && require(nearestPackagePath);
  return pkg && pkg['codemod-cli-ts'] || {};
}