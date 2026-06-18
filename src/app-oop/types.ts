import { Memo } from "./domain/memo.js";
import { User } from "./domain/user.js";

export type AuthenticatedUser = {
  email: string;
  username: string;
  credential: string;
};

export type MemoView = {
  email: string;
  title: string;
  content: string;
};

export type UserRepoLike = {
  loadUsers(): User[];
  createUser(email: string, password: string, username: string): void;
  findUserByEmail(email: string): User | null;
};

export type MemoRepoLike = {
  loadMemos(): Memo[];
  createMemo(email: string, title: string, content: string): void;
};
