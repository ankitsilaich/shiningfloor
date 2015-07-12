-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 12, 2015 at 03:07 PM
-- Server version: 5.6.12-log
-- PHP Version: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `shiningfloor`
--
CREATE DATABASE IF NOT EXISTS `shiningfloor` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `shiningfloor`;

-- --------------------------------------------------------

--
-- Table structure for table `artificials`
--

CREATE TABLE IF NOT EXISTS `artificials` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `usages_area` varchar(50) ,
  `design` varchar(50),
  `design_material` varchar(50),
  `surface_type` varchar(50),
  `brand` varchar(100),
  `finish_type` varchar(50),
  `price` int(11),
  `color` varchar(50),
  `thickness` int(11),
  `size_lengh` int(11),
  `size_width` int(11),
  `size_unit` varchar(10),
  `product_name` varchar(100),
  `product_desc` varchar(300),
  `rating` float,
  `supplierID` int(11) NOT NULL,
  `product_img` varchar(100),
  `discountAvailable` int(11) DEFAULT '0',
  `productAvailable` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Table structure for table `marble`
--

CREATE TABLE IF NOT EXISTS `marble` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `usages_area` varchar(50) ,
  `design` varchar(50),
  `design_material` varchar(50),
  `surface_type` varchar(50),
  `brand` varchar(100),
  `finish_type` varchar(50),
  `price` int(11),
  `color` varchar(50),
  `thickness` int(11),
  `size_lengh` int(11),
  `size_width` int(11),
  `size_unit` varchar(10),
  `product_name` varchar(100),
  `product_desc` varchar(300),
  `rating` float,
  `supplierID` int(11) NOT NULL,
  `product_img` varchar(100),
  `discountAvailable` int(11) DEFAULT '0',
  `productAvailable` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


-- --------------------------------------------------------

--
-- Table structure for table `stone`
--

CREATE TABLE IF NOT EXISTS `stone` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `usages_area` varchar(50) ,
  `design` varchar(50),
  `design_material` varchar(50),
  `surface_type` varchar(50),
  `brand` varchar(100),
  `finish_type` varchar(50),
  `price` int(11),
  `color` varchar(50),
  `thickness` int(11),
  `size_lengh` int(11),
  `size_width` int(11),
  `size_unit` varchar(10),
  `product_name` varchar(100),
  `product_desc` varchar(300),
  `rating` float,
  `supplierID` int(11) NOT NULL,
  `product_img` varchar(100),
  `discountAvailable` int(11) DEFAULT '0',
  `productAvailable` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;



-- --------------------------------------------------------

--
-- Table structure for table `tiles`
--

CREATE TABLE IF NOT EXISTS `tiles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `usages_area` varchar(50) ,
  `design` varchar(50),
  `design_material` varchar(50),
  `surface_type` varchar(50),
  `brand` varchar(100),
  `finish_type` varchar(50),
  `price` int(11),
  `color` varchar(50),
  `thickness` int(11),
  `size_lengh` int(11),
  `size_width` int(11),
  `size_unit` varchar(10),
  `product_name` varchar(100),
  `product_desc` varchar(300),
  `rating` float,
  `supplierID` int(11) NOT NULL,
  `product_img` varchar(100),
  `discountAvailable` int(11) DEFAULT '0',
  `productAvailable` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `wallpapers`
--

CREATE TABLE IF NOT EXISTS `wallpapers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `usages_area` varchar(50) ,
  `design` varchar(50),
  `design_material` varchar(50),
  `surface_type` varchar(50),
  `brand` varchar(100),
  `finish_type` varchar(50),
  `price` int(11),
  `color` varchar(50),
  `thickness` int(11),
  `size_lengh` int(11),
  `size_width` int(11),
  `size_unit` varchar(10),
  `product_name` varchar(100),
  `product_desc` varchar(300),
  `rating` float,
  `supplierID` int(11) NOT NULL,
  `product_img` varchar(100),
  `discountAvailable` int(11) DEFAULT '0',
  `productAvailable` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `woods`
--

CREATE TABLE IF NOT EXISTS `woods` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `usages_area` varchar(50) ,
  `design` varchar(50),
  `design_material` varchar(50),
  `surface_type` varchar(50),
  `brand` varchar(100),
  `finish_type` varchar(50),
  `price` int(11),
  `color` varchar(50),
  `thickness` int(11),
  `size_lengh` int(11),
  `size_width` int(11),
  `size_unit` varchar(10),
  `product_name` varchar(100),
  `product_desc` varchar(300),
  `rating` float,
  `supplierID` int(11) NOT NULL,
  `product_img` varchar(100),
  `discountAvailable` int(11) DEFAULT '0',
  `productAvailable` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
-- --------------------------------------------------------

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `orderNo` bigint(20) NOT NULL AUTO_INCREMENT ,
  `customerID` int(11) ,
  `supplierID` int(11) ,
  `productID` int(11) ,
  `product_type` varchar(50),
  `price` int(11) ,
  `quantity` int(11) ,
  `discount` int(11),  
  `total` int(11) ,
  `color` int(11) ,
  `orderDate` varchar(20) ,
  `shipDate` varchar(20),
  `salesTax` float ,
  `transactStatus` varchar(100),
  `paymentDate` varchar(20),
  PRIMARY KEY (`orderNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE IF NOT EXISTS `suppliers` (
  `supplierID` int(11) NOT NULL AUTO_INCREMENT,
  `companyName` varchar(100) ,
  `contactFirstName` varchar(30) ,
  `contactLastName` varchar(30) ,
  `contactTitle` varchar(30) ,
  `address` varchar(500) ,
  `city` varchar(20) ,
  `state` varchar(20),
  `country` varchar(20) ,
  `contactNo` varchar(20),
  `email` varchar(100) ,
  `url` varchar(100) ,
  `paymentMethods` varchar(100) ,
  `postalcode` varchar(10),
  PRIMARY KEY (`supplierID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE IF NOT EXISTS `customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) ,
  `lastName` varchar(50) ,
  `address` varchar(500) ,
  `city` varchar(30) ,
  `state` varchar(30) ,
  `country` varchar(30),
  `contactNo1` varchar(15),
  `contactNo2` varchar(15),
  `email` varchar(100),
  `password` varchar(100),
  `postalcode` varchar(10),    
  `joiningDate` varchar(15),
  PRIMARY KEY (`customerID`)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
