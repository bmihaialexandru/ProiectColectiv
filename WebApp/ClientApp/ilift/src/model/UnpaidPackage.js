export class UnpaidPackage {
    constructor(id, id_user, id_package, package_name, pricing, days) {
        this.id = id;
        this.id_user = id_user;
        this.id_package = id_package;
        this.package_name = package_name;
        this.pricing = pricing;
        this.days = days;
    }
}