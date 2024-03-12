export default class UserModel {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
  
  signIn = (email, password) => {
    const users = [
      { email: "user1@example.com", password: "password1" },
      { email: "user2@example.com", password: "password2" },
      { email: "user@example.com", password: "12345678" },
    ];

    const user = users.find(
      (item) => item.email === email && item.password === password
    );

    if(user) {
      return true;
    } else {
      return false;
    }
  };
}
