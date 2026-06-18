import { database } from "../../database/database.js";
import { User } from "../../domain/user.js";

export class UserRepo {
  loadUsers(): User[] {
    return database.users.map(
      (user) => new User(user.email, user.password, user.username),
    );
  }

  createUser(email: string, password: string, username: string): void {
    database.users.push({ email, password, username });
  }

  findUserByEmail(email: string): User | null {
    const foundUser = database.users.find((user) => user.email === email);
    return foundUser !== undefined
      ? new User(foundUser.email, foundUser.password, foundUser.username)
      : null;
  }
}
