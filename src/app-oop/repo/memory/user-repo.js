import { database } from "../../database/database.js";
import { User } from "../../domain/user.js";

export class UserRepo {
  loadUsers() {
    // const users = [];
    // for (let i = 0; i < database.users.length; i = i + 1) {
    //   const { email, password, username } = database.users[i];
    //   const user = new User(email, password, username);
    //   users.push(user);
    // }
    // return users;
    return database.users.map(
      (user) => new User(user.email, user.password, user.username),
    );
  }

  createUser(email, password, username) {
    database.users.push({ email, password, username });
  }

  findUserByEmail(email) {
    // for (let i = 0; i < database.users.length; i = i + 1) {
    //   if (database.users[i].email === email) {
    //     return new User(
    //       database.users[i].email,
    //       database.users[i].password,
    //       database.users[i].username,
    //     );
    //   }
    // }
    // return null;
    const foundUser = database.users.find((user) => user.email === email);
    return foundUser !== undefined
      ? new User(foundUser.email, foundUser.password, foundUser.username)
      : null;
  }
}
