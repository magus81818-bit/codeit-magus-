import { database } from "../../database/database.js";
import { Memo } from "../../domain/memo.js";

export class MemoRepo {
  loadMemos(): Memo[] {
    return database.memos.map(
      (memo) => new Memo(memo.email, memo.title, memo.content),
    );
  }

  createMemo(email: string, title: string, content: string): void {
    database.memos.push({ email, title, content });
  }
}
