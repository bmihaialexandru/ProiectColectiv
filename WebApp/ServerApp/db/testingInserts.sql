DELETE FROM `course` WHERE `id` = 8888888 or `id` = 9999999;
DELETE FROM `trainer` WHERE `id` = 8888888 or `id` = 9999999;
DELETE FROM `user` WHERE `id` = 8888888 or `id` = 9999999;
DELETE FROM `feedback` WHERE `id` = 8888888 or `id` = 9999999;
DELETE FROM `feedback_trainer` WHERE `id` = 8888888 or `id` = 9999999;
DELETE FROM `package_course` WHERE `id_package` = 8888888 or `id_package` = 9999999;
DELETE FROM `schedule_entry` WHERE `id` = 8888888 or `id` = 9999999;
DELETE FROM `subscribtion_package` WHERE `id` = 8888888 or `id` = 9999999;
DELETE FROM `training_room` WHERE `id_training_room` = 8888888 or `id_training_room` = 9999999;
DELETE FROM `paid_subscribtions` WHERE `id` = 8888888 or `id` = 9999999;
DELETE FROM `subscribtion` WHERE `id_user` = 8888888 or `id_user` = 9999999;
DELETE FROM `unpaid_subscribtions` WHERE `id` = 8888888 or `id` = 9999999;

INSERT INTO `course` (`id`, `name`, `description`, `url_photo`) VALUES
(9999999, 'test value', 'test value', 'test value'),
(8888888, 'test value', 'test value', 'test value');

INSERT INTO `trainer` (`id`, `name`, `url_photo`, `description`) VALUES
(9999999, 'test value', 'test value', 'test value'),
(8888888, 'test value', 'test value', 'test value');

INSERT INTO `user` (`id`, `name`, `phone_number`, `email`, `passwordhash`, `user_type`, `pass_changed`) VALUES
(9999999, 'test value', 'test value', 'testvalue@gmail.com', '9f7382a2dbc31d350f98131cc1b9337ee1e5c759', 1, 1),
(8888888, 'test value', 'test value', 'testvalue@yahoo.com', 'b24ffa4f898b756cf8fb6b98641dd90b83f1c02f', 0, 0);

INSERT INTO `feedback` (`id`, `stars`, `message`, `user_id`, `course_id`) VALUES
(9999999, 4, 'test value', 8888888, 8888888),
(8888888, 4, 'test value', 8888888, 8888888);

INSERT INTO `feedback_trainer` (`id`, `stars`, `message`, `id_user`, `id_trainer`) VALUES
(9999999, 4, 'test value', 8888888, 8888888),
(8888888, 4, 'test value', 8888888, 8888888);

INSERT INTO `subscribtion_package` (`id`, `package_name`, `description`, `pricing`, `days`) VALUES
(9999999, 'Test', 'test data', 30, 10),
(8888888, 'Test', 'test data', 30, 10);

INSERT INTO `package_course` (`id_package`, `id_course`, `number_subscribtions`) VALUES
(9999999, 8888888, 10),
(8888888, 8888888, 10);

INSERT INTO `training_room` (`id_training_room`, `max_capacity`, `name`) VALUES
(9999999, 1, 'test value'),
(8888888, 1, 'test value');

INSERT INTO `schedule_entry` (`id`, `day`, `hour_start`, `hour_finish`, `id_course`, `id_trainer`, `id_training_room`) VALUES
(9999999, '2017-12-11', '18:00:00', '20:00:00', 8888888, 8888888, 8888888),
(8888888, '2017-12-11', '18:00:00', '20:00:00', 8888888, 8888888, 8888888);

INSERT INTO `paid_subscribtions` (`id_package`, `id_course`, `nr_courses`, `due_date`, `id_user`, `id`) VALUES
(8888888, 8888888, 1, '2017-12-11', 9999999, 8888888),
(8888888, 8888888, 1, '2017-12-11', 9999999, 9999999);

INSERT INTO `subscribtion` (`id_user`, `id_schentry`) VALUES
(8888888,8888888);

INSERT INTO `unpaid_subscribtions` (`id_user`, `id_package`, `id`) VALUES
(8888888,8888888,9999999),
(8888888,8888888,8888888);

