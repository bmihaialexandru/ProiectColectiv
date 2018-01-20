-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2017 at 09:37 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ilift`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `url_photo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `name`, `description`, `url_photo`) VALUES
(2, 'Swimming program', 'Lorem ipsum', '../uploads/fit-swimming.svg'),
(3, 'Boxing fitness ', 'Lorem ipsum ', '../uploads/fit-boxing.svg'),
(4, 'Cycling program', 'Lorem ipsum', '../uploads/fit-cycling.svg'),
(5, 'Massage', 'Lorem ipsum', '../uploads/fit-massage.svg'),
(6, 'Body training', 'Lorem ipsum', '../uploads/fit-dumbell.svg'),
(7, 'Yoga program', 'Lorem ipsum', '../uploads/fit-yoga.svg');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(10) NOT NULL,
  `stars` int(1) NOT NULL,
  `message` varchar(500) NOT NULL,
  `user_id` int(10) NOT NULL,
  `course_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `stars`, `message`, `user_id`, `course_id`) VALUES
(1, 4, 'Refershing! Felt amazing!', 5, 2),
(3, 5, 'Loved it.', 6, 2),
(4, 3, 'ii ok cred', 1, 2),
(5, 5, 'Great investment', 3, 5),
(6, 3, 'ii fainut', 1, 2),
(7, 4, 'I would try it again some other time.', 5, 8),
(8, 4, 'super', 4, 7),
(9, 5, 'Difficult but worth it i guess.', 5, 7),
(10, 4, "That's my son!", 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `feedback_trainer`
--

CREATE TABLE `feedback_trainer` (
  `id` int(11) NOT NULL,
  `stars` int(11) NOT NULL,
  `message` varchar(500) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_trainer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feedback_trainer`
--

INSERT INTO `feedback_trainer` (`id`, `stars`, `message`, `id_user`, `id_trainer`) VALUES
(1, 4, 'profesionist', 5, 8),
(2, 4, "He's ok", 4, 2),
(3, 5, "She's great", 6, 1),
(4, 5, 'Yes yes excellent', 4, 6);

-- --------------------------------------------------------

--
-- Table structure for table `package_course`
--

CREATE TABLE `package_course` (
  `id_package` int(11) NOT NULL,
  `id_course` int(11) NOT NULL,
  `number_subscribtions` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `package_course`
--

INSERT INTO `package_course` (`id_package`, `id_course`, `number_subscribtions`) VALUES
(20, 2, 10),
(21, 2, 10);

-- --------------------------------------------------------

--
-- Table structure for table `paid_subscribtions`
--

CREATE TABLE `paid_subscribtions` (
  `id_package` int(11) NOT NULL,
  `id_course` int(11) NOT NULL,
  `nr_courses` int(11) NOT NULL,
  `due_date` date NOT NULL,
  `id_user` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `schedule_entry`
--

CREATE TABLE `schedule_entry` (
  `id` int(11) NOT NULL,
  `day` date NOT NULL,
  `hour_start` time NOT NULL,
  `hour_finish` time NOT NULL,
  `id_course` int(11) NOT NULL,
  `id_trainer` int(11) NOT NULL,
  `id_training_room` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedule_entry`
--

INSERT INTO `schedule_entry` (`id`, `day`, `hour_start`, `hour_finish`, `id_course`, `id_trainer`, `id_training_room`) VALUES
(1, '2017-12-11', '18:00:00', '20:00:00', 2, 1, 1),
(2, '2017-12-09', '18:00:00', '20:00:00', 2, 1, 1),
(3, '2017-12-16', '18:00:00', '20:00:00', 2, 1, 1),
(4, '2017-12-23', '18:00:00', '20:00:00', 2, 1, 1),
(5, '2017-12-30', '18:00:00', '20:00:00', 2, 1, 1),
(6, '2018-01-06', '18:00:00', '20:00:00', 2, 1, 1),
(7, '2018-01-13', '18:00:00', '20:00:00', 2, 1, 1),
(8, '2018-01-20', '18:00:00', '20:00:00', 2, 1, 1),
(9, '2018-01-27', '18:00:00', '20:00:00', 2, 1, 1),
(10, '2018-02-03', '18:00:00', '20:00:00', 2, 1, 1),
(11, '2018-02-10', '18:00:00', '20:00:00', 2, 1, 1),
(12, '2018-02-17', '18:00:00', '20:00:00', 2, 1, 1),
(13, '2018-02-24', '18:00:00', '20:00:00', 2, 1, 1),
(14, '2018-03-03', '18:00:00', '20:00:00', 2, 1, 1),
(15, '2018-03-10', '18:00:00', '20:00:00', 2, 1, 1),
(16, '2018-03-17', '18:00:00', '20:00:00', 2, 1, 1),
(17, '2018-03-24', '18:00:00', '20:00:00', 2, 1, 1),
(18, '2018-03-31', '18:00:00', '20:00:00', 2, 1, 1),
(19, '2018-04-07', '18:00:00', '20:00:00', 2, 1, 1),
(20, '2018-04-14', '18:00:00', '20:00:00', 2, 1, 1),
(21, '2018-04-21', '18:00:00', '20:00:00', 2, 1, 1),
(22, '2018-04-28', '18:00:00', '20:00:00', 2, 1, 1),
(23, '2018-05-05', '18:00:00', '20:00:00', 2, 1, 1),
(24, '2018-05-12', '18:00:00', '20:00:00', 2, 1, 1),
(25, '2018-05-19', '18:00:00', '20:00:00', 2, 1, 1),
(26, '2018-05-26', '18:00:00', '20:00:00', 2, 1, 1),
(27, '2018-06-02', '18:00:00', '20:00:00', 2, 1, 1),
(28, '2018-06-09', '18:00:00', '20:00:00', 2, 1, 1),
(29, '2018-06-16', '18:00:00', '20:00:00', 2, 1, 1),
(30, '2018-06-23', '18:00:00', '20:00:00', 2, 1, 1),
(31, '2018-06-30', '18:00:00', '20:00:00', 2, 1, 1),
(32, '2018-07-07', '18:00:00', '20:00:00', 2, 1, 1),
(33, '2018-07-14', '18:00:00', '20:00:00', 2, 1, 1),
(34, '2018-07-21', '18:00:00', '20:00:00', 2, 1, 1),
(35, '2018-07-28', '18:00:00', '20:00:00', 2, 1, 1),
(36, '2018-08-04', '18:00:00', '20:00:00', 2, 1, 1),
(37, '2018-08-11', '18:00:00', '20:00:00', 2, 1, 1),
(38, '2018-08-18', '18:00:00', '20:00:00', 2, 1, 1),
(39, '2018-08-25', '18:00:00', '20:00:00', 2, 1, 1),
(40, '2018-09-01', '18:00:00', '20:00:00', 2, 1, 1),
(41, '2018-09-08', '18:00:00', '20:00:00', 2, 1, 1),
(42, '2018-09-15', '18:00:00', '20:00:00', 2, 1, 1),
(43, '2018-09-22', '18:00:00', '20:00:00', 2, 1, 1),
(44, '2018-09-29', '18:00:00', '20:00:00', 2, 1, 1),
(45, '2018-10-06', '18:00:00', '20:00:00', 2, 1, 1),
(46, '2018-10-13', '18:00:00', '20:00:00', 2, 1, 1),
(47, '2018-10-20', '18:00:00', '20:00:00', 2, 1, 1),
(49, '2018-11-03', '18:00:00', '20:00:00', 2, 1, 1),
(50, '2018-11-10', '18:00:00', '20:00:00', 2, 1, 1),
(51, '2018-11-17', '18:00:00', '20:00:00', 2, 1, 1),
(52, '2018-11-24', '18:00:00', '20:00:00', 2, 1, 1),
(53, '2018-12-01', '18:00:00', '20:00:00', 2, 1, 1),
(54, '2018-12-08', '18:00:00', '20:00:00', 2, 1, 1),
(55, '2017-12-10', '18:00:00', '20:00:00', 2, 1, 1),
(56, '2017-12-24', '18:00:00', '20:00:00', 2, 1, 1),
(57, '2018-01-07', '19:00:00', '20:00:00', 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `subscribtion`
--

CREATE TABLE `subscribtion` (
  `id_user` int(10) NOT NULL,
  `id_schentry` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `subscribtion_package`
--

CREATE TABLE `subscribtion_package` (
  `id` int(11) NOT NULL,
  `package_name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `pricing` int(11) NOT NULL,
  `days` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subscribtion_package`
--

INSERT INTO `subscribtion_package` (`id`, `package_name`, `description`, `pricing`, `days`) VALUES
(4, 'Test', 'just testing this', 30, 10),
(5, 'Test', 'just testing this', 30, 10),
(6, 'Test', 'just testing this', 30, 10),
(7, 'Test', 'just testing this', 30, 10),
(8, 'Test', 'just testing this', 30, 10),
(9, 'Test', 'just testing this', 30, 10),
(10, 'Test', 'just testing this', 30, 10),
(11, 'Test', 'just testing this', 30, 10),
(12, 'Test', 'just testing this', 30, 10),
(13, 'Testos', 'just testing this', 30, 10),
(14, 'Testosasd', 'just testing this', 30, 10),
(15, 'Testosasde', 'just testing this', 30, 10),
(16, 'Testosasdeqwe', 'just testing this', 30, 10),
(17, 'Testosasdeqweq', 'just testing this', 30, 10),
(18, 'Testosasdeqweqw', 'just testing this', 30, 10),
(20, 'sdaddTestosasdeqweqwa', 'just testing this', 30, 10),
(21, 'sdaddTestosasdeqweqgggwa', 'just testing this', 30, 10);

-- --------------------------------------------------------

--
-- Table structure for table `trainer`
--

CREATE TABLE `trainer` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `url_photo` varchar(100) NOT NULL,
  `description` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trainer`
--

INSERT INTO `trainer` (`id`, `name`, `url_photo`, `description`) VALUES
(1, 'Bica Denisa', '../uploads/trainer-2.jpg', 'Boxing fitness'),
(2, 'Badila Mihai', '../uploads/trainer-1.jpg', 'Body training'),
(3, 'Codrin Stimbei', '../uploads/trainer-3.jpg', 'Massage, Cycling instructor')
(4, 'Sabina Alexa', '../uploads/trainer-5.jpg', 'Pilates instrutor'),
(5, 'Bocioc Titus', '../uploads/trainer-6.jpg', 'Cross-fit instructor'),
(6, 'Carausu Catrinel', '../uploads/trainer-4.jpg', 'TRX, Zumba intructor'),
(7, 'Bodea Nicolae', '../uploads/trainer-7.jpg', 'Strongman instructor'),
(8, 'Baciu Cristian', '../uploads/trainer-8.jpg', 'Swimming, Yoga insturctor');

-- --------------------------------------------------------

--
-- Table structure for table `training_room`
--

CREATE TABLE `training_room` (
  `id_training_room` int(11) NOT NULL,
  `max_capacity` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `training_room`
--

INSERT INTO `training_room` (`id_training_room`, `max_capacity`, `name`) VALUES
(1, 1, 'pula me');

-- --------------------------------------------------------

--
-- Table structure for table `unpaid_subscribtions`
--

CREATE TABLE `unpaid_subscribtions` (
  `id_user` int(11) NOT NULL,
  `id_package` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone_number` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `passwordhash` varchar(100) NOT NULL,
  `user_type` int(10) NOT NULL,
  `pass_changed` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `phone_number`, `email`, `passwordhash`, `user_type`, `pass_changed`) VALUES
(1, 'admin', '0771490344', 'nicubodea96@gmail.com', '9f7382a2dbc31d350f98131cc1b9337ee1e5c759', 1, 1),
(5, 'testy', '07312', 'abcd', 'b24ffa4f898b756cf8fb6b98641dd90b83f1c02f', 0, 0),
(6, 'user_normal', 'dummy', 'dummy', 'd8913df37b24c97f28f840114d05bd110dbb2e44', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_feedback_course` (`course_id`),
  ADD KEY `fk_feedback_user` (`user_id`);

--
-- Indexes for table `feedback_trainer`
--
ALTER TABLE `feedback_trainer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_fdbkt_user` (`id_user`),
  ADD KEY `fk_fdbkt_trainer` (`id_trainer`);

--
-- Indexes for table `package_course`
--
ALTER TABLE `package_course`
  ADD PRIMARY KEY (`id_package`,`id_course`),
  ADD KEY `fk_course` (`id_course`);

--
-- Indexes for table `paid_subscribtions`
--
ALTER TABLE `paid_subscribtions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_paid` (`id_user`),
  ADD KEY `fk_course_paid` (`id_course`),
  ADD KEY `fk_package_paid` (`id_package`);

--
-- Indexes for table `schedule_entry`
--
ALTER TABLE `schedule_entry`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_schentry_course` (`id_course`),
  ADD KEY `fk_schentry_trainer` (`id_trainer`),
  ADD KEY `fk_schentry_room` (`id_training_room`);

--
-- Indexes for table `subscribtion`
--
ALTER TABLE `subscribtion`
  ADD PRIMARY KEY (`id_user`,`id_schentry`),
  ADD KEY `fk_subscribtion_user` (`id_user`),
  ADD KEY `fk_subscription_schentry` (`id_schentry`);

--
-- Indexes for table `subscribtion_package`
--
ALTER TABLE `subscribtion_package`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trainer`
--
ALTER TABLE `trainer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `training_room`
--
ALTER TABLE `training_room`
  ADD PRIMARY KEY (`id_training_room`);

--
-- Indexes for table `unpaid_subscribtions`
--
ALTER TABLE `unpaid_subscribtions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_unpaid` (`id_user`),
  ADD KEY `fk_package_unpaid` (`id_package`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `feedback_trainer`
--
ALTER TABLE `feedback_trainer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `paid_subscribtions`
--
ALTER TABLE `paid_subscribtions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `schedule_entry`
--
ALTER TABLE `schedule_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `subscribtion_package`
--
ALTER TABLE `subscribtion_package`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `trainer`
--
ALTER TABLE `trainer`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `training_room`
--
ALTER TABLE `training_room`
  MODIFY `id_training_room` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `unpaid_subscribtions`
--
ALTER TABLE `unpaid_subscribtions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `fk_feedback_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_feedback_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `feedback_trainer`
--
ALTER TABLE `feedback_trainer`
  ADD CONSTRAINT `fk_fdbkt_trainer` FOREIGN KEY (`id_trainer`) REFERENCES `trainer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_fdbkt_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `package_course`
--
ALTER TABLE `package_course`
  ADD CONSTRAINT `fk_course` FOREIGN KEY (`id_course`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_package` FOREIGN KEY (`id_package`) REFERENCES `subscribtion_package` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `paid_subscribtions`
--
ALTER TABLE `paid_subscribtions`
  ADD CONSTRAINT `fk_course_paid` FOREIGN KEY (`id_course`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_package_paid` FOREIGN KEY (`id_package`) REFERENCES `subscribtion_package` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_paid` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `schedule_entry`
--
ALTER TABLE `schedule_entry`
  ADD CONSTRAINT `fk_schentry_course` FOREIGN KEY (`id_course`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_schentry_room` FOREIGN KEY (`id_training_room`) REFERENCES `training_room` (`id_training_room`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_schentry_trainer` FOREIGN KEY (`id_trainer`) REFERENCES `trainer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subscribtion`
--
ALTER TABLE `subscribtion`
  ADD CONSTRAINT `fk_subscription_schentry` FOREIGN KEY (`id_schentry`) REFERENCES `schedule_entry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_subscription` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `unpaid_subscribtions`
--
ALTER TABLE `unpaid_subscribtions`
  ADD CONSTRAINT `fk_package_unpaid` FOREIGN KEY (`id_package`) REFERENCES `subscribtion_package` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_unpaid` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
