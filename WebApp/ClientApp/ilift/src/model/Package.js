export class Package {
    constructor(id, package_name, description, pricing, days, courses) {
        this.id = id;
        this.package_name = package_name;
        this.description = description;
        this.pricing = pricing;
        this.days = days;
        this.courses = courses;
    }
}