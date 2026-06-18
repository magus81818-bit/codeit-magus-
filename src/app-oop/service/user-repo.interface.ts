import { User } from "../domain/user.js";

export interface IUserRepo {
  loadUsers(): User[];
  createUser(email: string, password: string, username: string): void;
  findUserByEmail(email: string): User | null;
}
