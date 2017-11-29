export class User {

    constructor(id, name, phone_number, email, role, pass_changed) {
        this.id = id;
        this.name = name;
        this.phone_number = phone_number;
        this.email = email;
        this.role = role;
        this.pass_changed = pass_changed;
    }
}