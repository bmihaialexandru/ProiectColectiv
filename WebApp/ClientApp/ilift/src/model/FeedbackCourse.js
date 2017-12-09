export class FeedbackCourse {
    constructor(id, stars, message, user_id, course_id, author) {
        this.id = id;
        this.stars = stars;
        this.message = message;
        this.user_id = user_id;
        this.course_id = course_id;
        this.author = author;
    }
}