export class UserService {
  async createUser(username: string, password: string) {
    const response = await fetch("http://127.0.0.1:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    return data;
  }

  async getUser(id: string) {
    const response = await fetch(`http://127.0.0.1:8080/users/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  }

  async loginUser(username: string, password: string) {
    const response = await fetch("http://127.0.0.1:8080/users/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    return data;
  }
}
