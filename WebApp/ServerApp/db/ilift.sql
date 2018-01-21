-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2018 at 03:43 AM
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
(4, 'Boxing course', 'Do you want to learn boxing? Now we have the real way!', '../uploads/php640D.svg'),
(5, 'Running course', 'If you feel like you want to run, this is an excellent way to start', '../uploads/php4176.svg'),
(6, 'Cycling course', 'Cycling every-day is a best practice for keeping fit. Try our course now!', '../uploads/php8F2E.svg'),
(7, 'Lifting course', 'We have the best trainers and the best gym in the city. You got to try us!', '../uploads/php603B.svg'),
(8, 'Yoga class', 'The yoga class is one of the best ways to get fit and feel better!', '../uploads/php2FF0.svg');

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
(12, 5, 'Very good on training. I have learnt the most essentials things in this course.', 1, 4);

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
(4, 5, 'One of the best antrenors I have ever met. He inspires me.', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `icons`
--

CREATE TABLE `icons` (
  `id_icon` int(11) NOT NULL,
  `path_to_icon` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `icons`
--

INSERT INTO `icons` (`id_icon`, `path_to_icon`) VALUES
(1, '/icons/fit-boxing.svg'),
(2, '/icons/fit-cycling.svg'),
(3, '/icons/fit-dumbell.svg'),
(4, '/icons/fit-massage.svg'),
(5, '/icons/fit-swimming.svg'),
(7, '/icons/fit-yoga.svg');

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
(31, 5, 20),
(31, 6, 20),
(32, 6, 10),
(32, 7, 30),
(33, 4, 15),
(33, 6, 5),
(33, 7, 8),
(34, 8, 15);

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

--
-- Dumping data for table `paid_subscribtions`
--

INSERT INTO `paid_subscribtions` (`id_package`, `id_course`, `nr_courses`, `due_date`, `id_user`, `id`) VALUES
(31, 5, 20, '2018-02-20', 8, 16),
(31, 6, 19, '2018-02-20', 8, 17);

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
  `id_training_room` int(11) NOT NULL,
  `id_icon` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedule_entry`
--

INSERT INTO `schedule_entry` (`id`, `day`, `hour_start`, `hour_finish`, `id_course`, `id_trainer`, `id_training_room`, `id_icon`) VALUES
(74, '2018-01-21', '11:00:00', '12:30:00', 4, 1, 4, 1),
(77, '2018-01-21', '12:30:00', '15:00:00', 6, 3, 1, 2),
(78, '2018-01-28', '12:30:00', '15:00:00', 6, 3, 4, 2),
(79, '2018-02-04', '12:30:00', '15:00:00', 6, 3, 4, 2),
(80, '2018-02-11', '12:30:00', '15:00:00', 6, 3, 4, 2),
(81, '2018-02-18', '12:30:00', '15:00:00', 6, 3, 4, 2),
(82, '2018-02-25', '12:30:00', '15:00:00', 6, 3, 4, 2),
(83, '2018-03-04', '12:30:00', '15:00:00', 6, 3, 4, 2),
(84, '2018-03-11', '12:30:00', '15:00:00', 6, 3, 4, 2),
(85, '2018-03-18', '12:30:00', '15:00:00', 6, 3, 4, 2),
(86, '2018-03-25', '12:30:00', '15:00:00', 6, 3, 4, 2),
(87, '2018-04-01', '12:30:00', '15:00:00', 6, 3, 4, 2),
(88, '2018-04-08', '12:30:00', '15:00:00', 6, 3, 4, 2),
(89, '2018-04-15', '12:30:00', '15:00:00', 6, 3, 4, 2),
(90, '2018-04-22', '12:30:00', '15:00:00', 6, 3, 4, 2),
(91, '2018-01-21', '12:30:00', '15:00:00', 5, 2, 5, 5),
(92, '2018-01-28', '12:30:00', '15:00:00', 5, 2, 5, 5),
(93, '2018-02-04', '12:30:00', '15:00:00', 5, 2, 5, 5),
(94, '2018-02-11', '12:30:00', '15:00:00', 5, 2, 5, 5),
(95, '2018-02-18', '12:30:00', '15:00:00', 5, 2, 5, 5),
(96, '2018-02-25', '12:30:00', '15:00:00', 5, 2, 5, 5),
(97, '2018-03-04', '12:30:00', '15:00:00', 5, 2, 5, 5),
(98, '2018-01-22', '10:30:00', '14:00:00', 7, 4, 1, 3),
(99, '2018-01-29', '10:30:00', '14:00:00', 7, 4, 1, 3),
(100, '2018-02-05', '10:30:00', '14:00:00', 7, 4, 1, 3),
(101, '2018-01-22', '14:30:00', '16:00:00', 8, 5, 1, 7),
(102, '2018-01-29', '14:30:00', '16:00:00', 8, 5, 1, 7),
(103, '2018-02-05', '14:30:00', '16:00:00', 8, 5, 1, 7),
(104, '2018-01-23', '10:00:00', '15:00:00', 4, 1, 4, 1),
(105, '2018-01-30', '10:00:00', '15:00:00', 4, 1, 4, 1),
(106, '2018-02-06', '10:00:00', '15:00:00', 4, 1, 4, 1),
(107, '2018-02-13', '10:00:00', '15:00:00', 4, 1, 4, 1),
(108, '2018-01-23', '10:00:00', '15:00:00', 7, 3, 1, 3),
(109, '2018-01-30', '10:00:00', '15:00:00', 7, 3, 1, 3),
(110, '2018-02-06', '10:00:00', '15:00:00', 7, 3, 1, 3),
(111, '2018-02-13', '10:00:00', '15:00:00', 7, 3, 1, 3),
(112, '2018-01-19', '10:00:00', '15:00:00', 7, 3, 1, 3),
(113, '2018-01-26', '10:00:00', '15:00:00', 7, 3, 1, 3),
(114, '2018-02-02', '10:00:00', '15:00:00', 7, 3, 1, 3),
(115, '2018-02-09', '10:00:00', '15:00:00', 7, 3, 1, 3),
(116, '2018-01-18', '10:00:00', '15:00:00', 7, 3, 1, 3),
(117, '2018-01-25', '10:00:00', '15:00:00', 7, 3, 1, 3),
(118, '2018-02-01', '10:00:00', '15:00:00', 7, 3, 1, 3),
(119, '2018-02-08', '10:00:00', '15:00:00', 7, 3, 1, 3),
(120, '2018-01-17', '10:00:00', '15:00:00', 7, 3, 1, 3),
(121, '2018-01-24', '10:00:00', '15:00:00', 7, 3, 1, 3),
(122, '2018-01-31', '10:00:00', '15:00:00', 7, 3, 1, 3),
(123, '2018-02-07', '10:00:00', '15:00:00', 7, 3, 1, 3),
(124, '2018-01-17', '10:00:00', '15:00:00', 5, 2, 5, 5),
(125, '2018-01-24', '10:00:00', '15:00:00', 5, 2, 5, 5),
(126, '2018-01-31', '10:00:00', '15:00:00', 5, 2, 5, 5),
(127, '2018-02-07', '10:00:00', '15:00:00', 5, 2, 5, 5),
(128, '2018-01-18', '10:00:00', '15:00:00', 5, 2, 5, 5),
(129, '2018-01-25', '10:00:00', '15:00:00', 5, 2, 5, 5),
(130, '2018-02-01', '10:00:00', '15:00:00', 5, 2, 5, 5),
(131, '2018-02-08', '10:00:00', '15:00:00', 5, 2, 5, 5),
(132, '2018-01-19', '10:00:00', '15:00:00', 5, 2, 5, 5),
(133, '2018-01-26', '10:00:00', '15:00:00', 5, 2, 5, 5),
(134, '2018-02-02', '10:00:00', '15:00:00', 5, 2, 5, 5),
(135, '2018-02-09', '10:00:00', '15:00:00', 5, 2, 5, 5),
(136, '2018-01-14', '10:00:00', '15:00:00', 8, 4, 1, 7),
(137, '2018-01-15', '10:00:00', '15:00:00', 6, 2, 1, 2),
(138, '2018-01-16', '10:00:00', '15:00:00', 7, 3, 1, 3),
(139, '2018-01-16', '12:00:00', '15:00:00', 4, 4, 4, 1),
(140, '2018-01-16', '16:00:00', '18:00:00', 8, 2, 1, 7);

-- --------------------------------------------------------

--
-- Table structure for table `subscribtion`
--

CREATE TABLE `subscribtion` (
  `id_user` int(10) NOT NULL,
  `id_schentry` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subscribtion`
--

INSERT INTO `subscribtion` (`id_user`, `id_schentry`) VALUES
(8, 137);

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
(31, 'Run and cycle', 'Need to get fit fast? Our trainers has the best recipe for you!', 100, 30),
(32, 'Full bodybuilding', 'Our trainers can do magic with your body! Get this package today and begin to make gains!', 120, 30),
(33, 'Boxing package', 'Want to learn boxing? Boxing is a very good sport, and you can be very good at it and also keep fit!', 160, 30),
(34, 'Yoga class', 'Very recommended for relaxing after a hard day at work. You can be very relaxed and keep fit also!', 95, 20);

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
(1, 'Ion Popescu', '../uploads/phpC562.jpg', 'He is very good on making the whole course more interesting'),
(2, 'Andreea Iordache', '../uploads/trainer-4.jpg', 'One of our professionals. He makes the course as you think you are in the olympiads'),
(3, 'Ion Mihalache', '../uploads/phpC3B9.jpg', 'He is one of our yoga masters, which makes the experience very nice.'),
(4, 'Tomescu Paul', '../uploads/php7806.jpg', 'One of the grandmasters on cycling. He goes to every competition and gets many prizes. We are proud of him!'),
(5, 'Alin Ion', '../uploads/phpFAC4.jpg', 'One of our finest bodybuilders');

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
(1, 30, 'The gym main room'),
(4, 15, 'Boxing Room'),
(5, 20, 'Swimming Pool');

-- --------------------------------------------------------

--
-- Table structure for table `unpaid_subscribtions`
--

CREATE TABLE `unpaid_subscribtions` (
  `id_user` int(11) NOT NULL,
  `id_package` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `unpaid_subscribtions`
--

INSERT INTO `unpaid_subscribtions` (`id_user`, `id_package`, `id`) VALUES
(8, 32, 18),
(8, 34, 19);

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
(1, 'admin', '0771490344', 'nicubodea96@gmail.com', 'd8913df37b24c97f28f840114d05bd110dbb2e44', 1, 1),
(5, 'user', '0732116225', 'user_normal@gmail.com', 'd8913df37b24c97f28f840114d05bd110dbb2e44', 0, 0),
(7, 'george_ionescu', '0722313123', 'gionescu@gmail.com', 'd8913df37b24c97f28f840114d05bd110dbb2e44', 0, 0),
(8, 'mihai_andrei', '0764523423', 'mandrei@mail.ru', 'd8913df37b24c97f28f840114d05bd110dbb2e44', 0, 0);

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
-- Indexes for table `icons`
--
ALTER TABLE `icons`
  ADD PRIMARY KEY (`id_icon`);

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
  ADD KEY `fk_schentry_room` (`id_training_room`),
  ADD KEY `fk_schentry_icon` (`id_icon`);

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `feedback_trainer`
--
ALTER TABLE `feedback_trainer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `icons`
--
ALTER TABLE `icons`
  MODIFY `id_icon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `paid_subscribtions`
--
ALTER TABLE `paid_subscribtions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `schedule_entry`
--
ALTER TABLE `schedule_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT for table `subscribtion_package`
--
ALTER TABLE `subscribtion_package`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `trainer`
--
ALTER TABLE `trainer`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `training_room`
--
ALTER TABLE `training_room`
  MODIFY `id_training_room` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `unpaid_subscribtions`
--
ALTER TABLE `unpaid_subscribtions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  ADD CONSTRAINT `fk_schentry_icon` FOREIGN KEY (`id_icon`) REFERENCES `icons` (`id_icon`) ON DELETE SET NULL ON UPDATE SET NULL,
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
