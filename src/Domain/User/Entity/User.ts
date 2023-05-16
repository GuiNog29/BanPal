export class User {
  id: number;
  name: string;
  email: string;
  password: string;

  constructor (userId: number, name: string, email: string, password: string){
    this.id = userId;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
