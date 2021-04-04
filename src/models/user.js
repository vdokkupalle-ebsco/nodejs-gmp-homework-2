export class User {
    constructor(id, login, password, age) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = false;
    }
}
