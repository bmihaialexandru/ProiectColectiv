import React, { Component } from 'react';
import {ServiceCredentials} from './ServiceCredentials';
import {Package} from "../model/Package";
import {PaidPackage} from "../model/PaidPackage";
import {UnpaidPackage} from "../model/UnpaidPackage";
import {PackageCourse} from "../model/PackageCourse";
import {SingletonService} from "./SingletonService";

import {NotificationManager} from "react-notifications";

export class PackageService extends Component {


    constructor() {
        super();

        this.server = ServiceCredentials.SERVER_PATH;
    }

    get_all_packages() {

        return fetch(this.server + "/interface/get_all_packages.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")
        } ).then(result => {
            return result.json();
        }).then(result => {
            return PackageService._get_package_list_for_result(result);
        });
    }

    add_new_package(name, description, pricing, days, courses) {

        console.log(courses);
        let my_courses = courses.map((course) => {
           return "{\"id\":"+course.id+", \"number\":"+course.number+"}";
        });

        console.log(my_courses);
        let course_final = "";
        for(let course in my_courses) {
            course_final += "&courses[]=" +  my_courses[course];
        }

        console.log(course_final);
        console.log("token="+localStorage.getItem("token")+"&package_name="+name+"&package_description="+description+"&pricing="+pricing+"&days="+days+course_final);
        return fetch(this.server + "/interface/add_package.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"&package_name="+name+"&package_description="+description+"&pricing="+pricing+"&days="+days+course_final
        }).then(result => {
            return result.json();
        }).then(result => {
            return PackageService._get_result_simple(result);
        })
    }

    delete_package(id) {
        return fetch(this.server + "/interface/delete_package.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"&id="+id
        }).then(result => {
            return result.json();
        }).then(result => {
            return PackageService._get_result_simple(result);
        })
    }

    subscribe_for_new_package(package_id) {
        return fetch(this.server + "/interface/get_new_package.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"&package_id="+package_id
        }).then(result => {
            return result.json();
        }).then(result => {
            return PackageService._get_result_simple(result);
        })
    }

    get_paid_packages_for_me() {
        return SingletonService.UserService.get_current_user(localStorage.getItem("token")).then((result) => {

            let user_id = result.id;
            return fetch(this.server + "/interface/get_paid_packages_for_user.php", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: "token="+localStorage.getItem("token")+"&user_id="+user_id
            }).then(result => {
                return result.json();
            }).then(result => {
                return PackageService._get_paid_packages_list(result);
            })

        });
    }

    get_paid_packages_for_user(user_id) {
        return fetch(this.server + "/interface/get_paid_packages_for_user.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"&user_id="+user_id
        }).then(result => {
            return result.json();
        }).then(result => {
            return PackageService._get_paid_packages_list(result);
        });
    }

    get_unpaid_packages_for_me() {
        return SingletonService.UserService.get_current_user(localStorage.getItem("token")).then((result) => {

            let user_id = result.id;
            return fetch(this.server + "/interface/get_unpaid_packages_for_user.php", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: "token="+localStorage.getItem("token")+"&user_id="+user_id
            }).then(result => {
                return result.json();
            }).then(result => {
                return PackageService._get_paid_packages_list(result);
            });

        });
    }

    get_unpaid_packages_for_user(user_id) {
        return fetch(this.server + "/interface/get_unpaid_packages_for_user.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"&user_id="+user_id
        }).then(result => {
            return result.json();
        }).then(result => {
            return PackageService._get_unpaid_packages_list(result);
        });
    }

    make_payment(user_id, package_id, unpaid_id) {
        return fetch(this.server + "/interface/make_payment.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "token="+localStorage.getItem("token")+"&user_id="+user_id+"&package_id="+package_id+"&id="+unpaid_id
        }).then(result => {
            return result.json();
        }).then(result => {
            return PackageService._get_result_simple(result);
        });
    }

    static _get_paid_packages_list(result) {

        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                NotificationManager.error(result["reason"], "Error");
                return null;
            }

            /*
            constructor(id, id_user, id_package, nr_courses, due_date, name, package_name)
             */

            return result["packages"].map((pack) => {
                return new PaidPackage(pack["id"], pack["id_user"], pack["id_package"], pack["nr_courses"],
                pack["due_date"], pack["name"], pack["package_name"], pack["pricing"], pack["description"], pack["days"]);
            });


        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
            return null;
        }
    }

    static _get_unpaid_packages_list(result) {

        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                NotificationManager.error(result["reason"], "Error");
                return null;
            }

            /*
            constructor(id, id_user, id_package, package_name, pricing, days)
             */

            return result["packages"].map((pack) => {
                return new UnpaidPackage(pack["id"], pack["id_user"], pack["id_package"], pack["package_name"], pack["pricing"], pack["days"], pack["description"]);
            });


        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
            return null;
        }
    }

    static _get_package_list_for_result(result) {


        try {
            if(result["answer"].localeCompare("Success") !== 0)
            {
                NotificationManager.error(result["reason"], "Error");
                return null;
            }

            /*
            this.id_package = id_package;
           this.id_course = id_course;
           this.number_subscribtions = number_subscribtions;
           this.name = name;
             */


            return result["packages"].map((pack) => {
            let courses = pack["courses"].map((cpack) => {

                return new PackageCourse(cpack['id_package'],
                    cpack['id_course'],
                    cpack['number_subscribtions'],
                    cpack['name']
                )

                });

                return new Package(pack["id"], pack["package_name"], pack["description"], pack["pricing"], pack["days"], courses);
            });
        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
            return null;
        }
    }

    static _get_result_simple(result) {
        try {
            if(result["answer"].localeCompare("Success") !== 0 && result["answer"].localeCompare("Warning") !== 0)
            {
                NotificationManager.error(result["reason"], "Error");
                return null;
            }
            if(result["answer"].localeCompare("Warning") === 0)
            {
                NotificationManager.error(result["reason"], "Error");
            }

            return "Success";
        } catch(error) {
            alert("Critical error: "+ error + ", please try again later");
        }
    }

}