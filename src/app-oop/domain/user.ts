export class User {
  #email: string;
  #password: string;
  #username: string;

  constructor(email: string, password: string, username: string) {
    this.#email = email;
    this.#password = password;
    this.#username = username;
  }

  getEmail(): string {
    return this.#email;
  }

  getPassword(): string {
    return this.#password;
  }

  getUsername(): string {
    return this.#username;
  }

  isCredentialValidate(credential: string): boolean {
    const email = credential.split("-")[0];
    const password = credential.split("-")[1];

    return this.#email === email && this.#password === password;
  }
}
