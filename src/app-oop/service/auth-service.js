export class AuthService {
  // 속성
  #userRepo;

  // 메소드
  constructor(userRepo) {
    this.#userRepo = userRepo;
  }

  signIn(inputEmail, inputPassword) {
    const foundUser = this.#userRepo.findUserByEmail(inputEmail);

    if (foundUser === null) {
      return null;
    }

    if (foundUser.getPassword() !== inputPassword) {
      return null;
    }

    return {
      email: foundUser.getEmail(),
      username: foundUser.getUsername(),
      credential: `${foundUser.getEmail()}-${foundUser.getPassword()}`,
    };
  }

  signUp(inputEmail, inputPassword, inputUsername) {
    const foundUser = this.#userRepo.findUserByEmail(inputEmail);

    if (foundUser !== null) {
      return false;
    }

    this.#userRepo.createUser(inputEmail, inputPassword, inputUsername);
    return true;
  }
}
