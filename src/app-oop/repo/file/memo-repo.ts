import fs from "node:fs";
import path from "node:path";
import { Memo } from "../../domain/memo.js";

export class MemoRepo {
  filePath: string;

  constructor() {
    this.filePath = path.join(process.cwd(), "src/app-oop/database/memos.txt");
  }

  readFile(): string[] {
    const result = fs.readFileSync(this.filePath);
    return String(result).trim().split("\n");
  }

  loadMemos(): Memo[] {
    const result = this.readFile();
    const memos: Memo[] = [];
    for (let i = 0; i < result.length; i = i + 1) {
      const [email, title, content] = result[i].split(", ");
      memos.push(new Memo(email, title, content));
    }
    return memos;
  }

  createMemo(email: string, title: string, content: string): void {
    fs.appendFileSync(this.filePath, `${email}, ${title}, ${content}\n`);
  }
}
