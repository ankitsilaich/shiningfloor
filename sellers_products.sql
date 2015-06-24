-- phpMyAdmin SQL Dump
-- version 3.5.8.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 23, 2015 at 04:11 PM
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
-- Table structure for table `sellers_products`
--

CREATE TABLE IF NOT EXISTS `sellers_products` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `sellers_id` varchar(255) NOT NULL,
  `products_id` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `comments` varchar(255) NOT NULL,
  `items_per_box` int(11) NOT NULL DEFAULT '0',
  `seller_product_code` int(11) NOT NULL DEFAULT '0',
  `minimum_boxes` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=75 ;

--
-- Dumping data for table `sellers_products`
--

INSERT INTO `sellers_products` (`id`, `sellers_id`, `products_id`, `price`, `comments`, `items_per_box`, `seller_product_code`, `minimum_boxes`) VALUES
(51, '1', '19', '100', 'apple', 0, 0, 0),
(52, '1', '23', '200', 'ball', 0, 0, 0),
(53, '1', '63', '400', '', 0, 0, 0),
(54, '1', '95', '789', '', 0, 0, 0),
(55, '1', '280', '569', 'chekck', 0, 0, 0),
(56, '1', '1472', '345', 'like IITK', 0, 0, 0),
(57, '1', '1491', '1290', 'Kitchen', 0, 0, 0),
(58, '1', '346', '1234', 'Bathroom', 0, 0, 0),
(59, '2', '21', '3000', 'minimum 50 orders', 0, 0, 0),
(60, '2', '22', '400', 'random comment', 0, 0, 0),
(61, '3', '21', '4000', 'minimum 50 orders', 0, 0, 0),
(62, '3', '2', '230', '', 0, 0, 0),
(63, '1', '102', '400', 'random comment 34432432432', 0, 0, 0),
(64, '2', '2', '50', '12', 0, 0, 0),
(65, '2', '4', '1', '', 0, 0, 0),
(66, '2', '5', 'dfa', '', 0, 0, 0),
(67, '2', '6', 'fa', '', 0, 0, 0),
(68, '2', '7', '12', '', 0, 0, 0),
(69, '1', '489', '1245', '', 0, 0, 0),
(70, '1', '11', '69', 'Sex', 0, 0, 0),
(71, '4', '2', '120', 'variation', 0, 0, 0),
(72, '1', '3', '28', '', 0, 0, 0),
(73, '1', '3', '28', '', 0, 0, 0),
(74, '1', '4', '38', '', 0, 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
