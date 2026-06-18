import { MemoView } from "../types.js";
import { IMemoRepo } from "./memo-repo.interface.js";
import { IUserRepo } from "./user-repo.interface.js";

export class MemoService {
  private _userRepo: IUserRepo;
  private _memoRepo: IMemoRepo;

  constructor(userRepo: IUserRepo, memoRepo: IMemoRepo) {
    this._userRepo = userRepo;
    this._memoRepo = memoRepo;
  }

  getMyMemos(credential: string): MemoView[] {
    const [email] = credential.split("-");
    const foundUser = this._userRepo.findUserByEmail(email);
    if (foundUser === null) {
      return [];
    }
    if (foundUser.isCredentialValidate(credential) === false) {
      return [];
    }

    const memos = this._memoRepo.loadMemos();
    return memos
      .filter((v) => v.email === email)
      .map((v) => ({
        email: v.email,
        title: v.title,
        content: v.content,
      }));
  }

  createMemo(credential: string, title: string, content: string): boolean {
    const [email] = credential.split("-");
    const foundUser = this._userRepo.findUserByEmail(email);
    if (foundUser === null) {
      return false;
    }
    if (foundUser.isCredentialValidate(credential) === false) {
      return false;
    }

    this._memoRepo.createMemo(email, title, content);
    return true;
  }
}
