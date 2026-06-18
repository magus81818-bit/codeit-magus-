import { AuthenticatedUser, UserRepoLike } from "../types.js";

export class AuthService {
  #userRepo: UserRepoLike;

  constructor(userRepo: UserRepoLike) {
    this.#userRepo = userRepo;
  }

  signIn(inputEmail: string, inputPassword: string): AuthenticatedUser | null {
    const foundUser = this.#userRepo.findUserByEmail(inputEmail);

    if (foundUser === null) {
      return null;
    }

    if (foundUser.password !== inputPassword) {
      return null;
    }

    return {
      email: foundUser.email,
      username: foundUser.username,
      credential: `${foundUser.email}-${foundUser.password}`,
    };
  }

  signUp(inputEmail: string, inputPassword: string, inputUsername: string): boolean {
    const foundUser = this.#userRepo.findUserByEmail(inputEmail);

    if (foundUser !== null) {
      return false;
    }

    this.#userRepo.createUser(inputEmail, inputPassword, inputUsername);
    return true;
  }
}
