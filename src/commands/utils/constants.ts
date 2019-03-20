import path from "path";
import { getPkgJsonConfig } from "./helpers";

export interface ICodemodCLiTSConfig {
  rootDir?: string;
}

export const getDefaultDir = (dist?: boolean) => {
  const config = getPkgJsonConfig();
  return (
    config.rootDir ||
    path.join(process.cwd(), dist ? "dist" : "src", "transforms")
  );
};

export const defaultArguments = ["_", "$0", "help", "version"];
