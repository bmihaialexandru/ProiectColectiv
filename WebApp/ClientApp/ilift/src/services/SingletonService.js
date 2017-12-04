import {UserService} from "./UserService";
import {TrainerService} from "./TrainerService";
import {CourseService} from "./CourseService";

export class SingletonService {
    static UserService = new UserService();
    static TrainerService = new TrainerService();
    static CourseService = new CourseService();
}