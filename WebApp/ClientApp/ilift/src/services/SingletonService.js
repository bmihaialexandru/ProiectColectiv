import {UserService} from "./UserService";
import {TrainerService} from "./TrainerService";
import {CourseService} from "./CourseService";
import {FeedbackCourseService} from "./FeedbackCourseService";
import {FeedbackTrainerService} from "./FeedbackTrainerService";
import {PackageService} from "./PackageService";
import {ScheduleService} from "./ScheduleService";
import {SubscribtionService} from "./SubscribtionService";
import {TrainingRoomService} from "./TrainingRoomService";

export class SingletonService {
    static UserService = new UserService();
    static TrainerService = new TrainerService();
    static CourseService = new CourseService();
    static FeedbackCourseService = new FeedbackCourseService();
    static FeedbackTrainerService = new FeedbackTrainerService();
    static PackageService = new PackageService();
    static ScheduleService = new ScheduleService();
    static SubscribtionService = new SubscribtionService();
    static TrainingRoomService = new TrainingRoomService();
}