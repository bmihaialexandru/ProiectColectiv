-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 19, 2018 at 03:37 AM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.2.0

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
(4, 'Boxing course', 'Do you want to learn boxing? Now we have the real way!', '../uploads/trainer-1.jpg'),
(5, 'Running course', 'If you feel like you want to run, this is an excellent way to start', '../uploads/trainer-2.jpg');

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
(2, '/icons/fit-cycling.svg');

-- --------------------------------------------------------

--
-- Table structure for table `package_course`
--

CREATE TABLE `package_course` (
  `id_package` int(11) NOT NULL,
  `id_course` int(11) NOT NULL,
  `number_subscribtions` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `id_training_room` int(11) NOT NULL,
  `id_icon` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(1, 'Ion Oncescu', '../uploads/trainer-3.jpg', 'He is very good on making the whole course more interesting'),
(2, 'Popescu Vasile', '../uploads/trainer-4.jpg', 'One of our professionals. He makes the course as you think you are in the olympiads');

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
(1, 1, 'The gym main room');

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
(1, 'admin', '0771490344', 'nicubodea96@gmail.com', 'd8913df37b24c97f28f840114d05bd110dbb2e44', 1, 1),
(5, 'user', '07312', 'abcd', 'd8913df37b24c97f28f840114d05bd110dbb2e44', 0, 0);

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `feedback_trainer`
--
ALTER TABLE `feedback_trainer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `icons`
--
ALTER TABLE `icons`
  MODIFY `id_icon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `paid_subscribtions`
--
ALTER TABLE `paid_subscribtions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `schedule_entry`
--
ALTER TABLE `schedule_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
