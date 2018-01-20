
export class PaidPackage {
    constructor(id, id_user, id_package, nr_courses, due_date, name, package_name, pricing, description, days) {
        this.id = id;
        this.id_user = id_user;
        this.id_package = id_package;
        this.nr_courses = nr_courses;
        this.due_date = due_date;
        this.name = name;
        this.package_name = package_name;
        this.pricing = pricing;
        this.description = description;
        this.days = days;
    }
}