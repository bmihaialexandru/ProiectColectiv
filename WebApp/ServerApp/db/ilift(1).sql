-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2017 at 08:44 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Table structure for table `trainer`
--

CREATE TABLE `trainer` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `url_photo` varchar(100) NOT NULL,
  `description` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `training_room`
--

CREATE TABLE `training_room` (
  `id_training_room` int(11) NOT NULL,
  `max_capacity` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
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
(1, 'admin', '0771490344', 'nicubodea96@gmail.com', '7b9504998358c934138ee62407eaa702fd1aab8f', 0, 1),
(5, 'testy', '07312', 'abcd', 'b24ffa4f898b756cf8fb6b98641dd90b83f1c02f', 0, 0);

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `schedule_entry`
--
ALTER TABLE `schedule_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `trainer`
--
ALTER TABLE `trainer`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `training_room`
--
ALTER TABLE `training_room`
  MODIFY `id_training_room` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
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
-- Constraints for table `schedule_entry`
--
ALTER TABLE `schedule_entry`
  ADD CONSTRAINT `fk_schentry_course` FOREIGN KEY (`id_course`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `fk_schentry_room` FOREIGN KEY (`id_training_room`) REFERENCES `training_room` (`id_training_room`),
  ADD CONSTRAINT `fk_schentry_trainer` FOREIGN KEY (`id_trainer`) REFERENCES `trainer` (`id`);

--
-- Constraints for table `subscribtion`
--
ALTER TABLE `subscribtion`
  ADD CONSTRAINT `fk_subscription_schentry` FOREIGN KEY (`id_schentry`) REFERENCES `schedule_entry` (`id`),
  ADD CONSTRAINT `fk_user_subscription` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;