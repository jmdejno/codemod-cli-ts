import path from 'path';
import execa from 'execa';
import { setupTempModule, teardownTempModule } from './utils/setup';
import {TempDir, createTempDir} from 'broccoli-test-helper'
import fs, { readdir } from 'fs-extra';

const PROJECT_ROOT = process.cwd();
const EXECUTABLE_PATH = path.join(PROJECT_ROOT, "dist/bin/cli.js");

let tempModuleRoot: TempDir;
let testProjectRoot: TempDir;
describe("CLI", () => {
  beforeAll(async () => {
    tempModuleRoot = await setupTempModule();
  });

  afterAll(() => {
    teardownTempModule(tempModuleRoot);
  });

  beforeEach(async () => {
    testProjectRoot = await createTempDir();
    testProjectRoot.copy(tempModuleRoot.path());
    fs.ensureDirSync(`${testProjectRoot.path()}/node_modules`);
    // fs.symlinkSync(path.join(ROOT, 'node_modules/jest'))
    fs.symlinkSync(PROJECT_ROOT, `${testProjectRoot.path()}/node_modules/codemod-cli`);
    process.chdir(testProjectRoot.path());
  });

  afterEach(() => {
    testProjectRoot.dispose();
    process.chdir(PROJECT_ROOT);
  })

  test("command: generate", async () => {
    const codemodName = "jest"
    await execa(EXECUTABLE_PATH, ['generate', codemodName]);
    const codemods = await readdir(testProjectRoot.path("src/transforms"))
    const fileContents = testProjectRoot.readText(`src/transforms/${codemodName}/index.ts`);
    expect(codemods.includes(codemodName)).toBeTruthy();
    expect(fileContents).toContain(codemodName)
  })
})