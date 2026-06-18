import { Memo } from "../domain/memo.js";

export interface IMemoRepo {
  loadMemos(): Memo[];
  createMemo(email: string, title: string, content: string): void;
}
