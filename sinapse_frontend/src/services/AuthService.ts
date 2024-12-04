class AuthService {
  public isAuthenticated(): boolean {
    return localStorage.getItem("id") !== null;
  }
}
