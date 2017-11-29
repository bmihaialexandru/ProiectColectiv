import {UserService} from "./UserService";
import {TrainerService} from "./TrainerService";

export class SingletonService {
    static UserService = new UserService();
    static TrainerService = new TrainerService();
}