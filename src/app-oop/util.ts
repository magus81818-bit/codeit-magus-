import fs from "node:fs";
import PromptSyncMaker from "prompt-sync";

const promptSync = PromptSyncMaker();
const pipedInputs = process.stdin.isTTY
  ? []
  : fs.readFileSync(0, "utf8").split(/\r?\n/);

export const prompt = (message = ""): string => {
  if (pipedInputs.length > 0) {
    process.stdout.write(message);
    return pipedInputs.shift() ?? "";
  }

  return promptSync(message);
};
