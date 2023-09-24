export class User {
  id: number;
  email: string;
  language: string;
  constructor(id: number, email: string, language: string) {
    this.id = id;
    this.email = email;
    this.language = language;
  }
}
