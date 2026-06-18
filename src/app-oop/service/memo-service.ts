import { MemoRepoLike, MemoView, UserRepoLike } from "../types.js";

export class MemoService {
  #userRepo: UserRepoLike;
  #memoRepo: MemoRepoLike;

  constructor(userRepo: UserRepoLike, memoRepo: MemoRepoLike) {
    this.#userRepo = userRepo;
    this.#memoRepo = memoRepo;
  }

  getMyMemos(credential: string): MemoView[] {
    const email = credential.split("-")[0];
    const foundUser = this.#userRepo.findUserByEmail(email);
    if (foundUser === null) {
      return [];
    }
    if (foundUser.isCredentialValidate(credential) === false) {
      return [];
    }

    return this.#memoRepo
      .loadMemos()
      .filter((v) => v.getEmail() === email)
      .map((v) => ({
        email: v.getEmail(),
        title: v.getTitle(),
        content: v.getContent(),
      }));
  }

  createMemo(credential: string, title: string, content: string): boolean {
    const email = credential.split("-")[0];
    const foundUser = this.#userRepo.findUserByEmail(email);
    if (foundUser === null) {
      return false;
    }
    if (foundUser.isCredentialValidate(credential) === false) {
      return false;
    }

    this.#memoRepo.createMemo(email, title, content);
    return true;
  }
}
