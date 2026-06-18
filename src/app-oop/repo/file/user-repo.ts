import fs from "node:fs";
import path from "node:path";
import { User } from "../../domain/user.js";
import { IUserRepo } from "../../service/user-repo.interface.js";

export class UserRepo implements IUserRepo {
  filePath: string;

  constructor() {
    this.filePath = path.join(process.cwd(), "src/app-oop/database/users.txt");
  }

  readFile(): string[] {
    const result = fs.readFileSync(this.filePath);
    return String(result).trim().split("\n");
  }

  loadUsers(): User[] {
    const result = this.readFile();
    const users: User[] = [];
    for (let i = 0; i < result.length; i++) {
      const [email, password, username] = result[i].split(", ");
      users.push(new User(email, password, username));
    }
    return users;
  }

  createUser(email: string, password: string, username: string): void {
    fs.appendFileSync(this.filePath, `${email}, ${password}, ${username}\n`);
  }

  findUserByEmail(email: string): User | null {
    const users = this.loadUsers();
    const foundUser = users.find((v) => v.email === email);
    return foundUser !== undefined ? foundUser : null;
  }
}
