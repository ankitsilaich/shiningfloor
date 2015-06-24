-- phpMyAdmin SQL Dump
-- version 3.5.8.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 23, 2015 at 04:12 PM
-- Server version: 5.5.34-0ubuntu0.13.04.1
-- PHP Version: 5.4.9-4ubuntu2.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `students`
--

-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE TABLE IF NOT EXISTS `sellers` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `storename` varchar(255) NOT NULL,
  `comments` varchar(25500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `sellers`
--

INSERT INTO `sellers` (`id`, `name`, `address`, `phone`, `storename`, `comments`) VALUES
(1, 'Abhishek Attal', 'C-113, Hall-1 ,IIT KANPUR', '8960274028', 'ATTAL BROTHERS AND SONS', 'Largest shop in IIT KANPUR'),
(2, 'Aamir', 'random address', '3324324432', 'Nazia sons and brothers', 'sddsad,dsa\ndsadsa\ndsadsad\nsadas'),
(3, 'pradumn', 'f-308', '32432432423', 'Pradumn brothers', 'dsadsadsadadasdsadsad'),
(4, 'Mr. Anand', 'M 43 A Greater Kailash 2, Delhi', '9717795209', 'Kajaria Ceramics Limited', 'f---');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
