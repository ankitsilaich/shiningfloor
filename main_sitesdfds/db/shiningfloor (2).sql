-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 24, 2015 at 02:40 PM
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
-- Table structure for table `colors`
--

CREATE TABLE IF NOT EXISTS `colors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `color_name`) VALUES
(1, 'red'),
(2, 'black'),
(3, 'green'),
(4, 'white'),
(5, 'pink'),
(6, 'blue'),
(7, 'orange'),
(8, 'grey'),
(9, 'yellow');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE IF NOT EXISTS `customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `country` varchar(30) DEFAULT NULL,
  `contactNo1` varchar(15) DEFAULT NULL,
  `contactNo2` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `postalcode` varchar(10) DEFAULT NULL,
  `joiningDate` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`customerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `designs`
--

CREATE TABLE IF NOT EXISTS `designs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `design_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `designs`
--

INSERT INTO `designs` (`id`, `design_name`) VALUES
(1, 'Modern'),
(2, 'Natural'),
(6, 'cross'),
(7, 'classic'),
(8, 'stone'),
(9, 'metal'),
(10, 'random'),
(11, 'waves'),
(12, 'abstract'),
(13, 'Stripes and Checks'),
(14, 'geometric');

-- --------------------------------------------------------

--
-- Table structure for table `features`
--

CREATE TABLE IF NOT EXISTS `features` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feature_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `features`
--

INSERT INTO `features` (`id`, `feature_name`) VALUES
(1, 'Germ Free'),
(2, 'Water Resistant'),
(3, 'Verified Seller'),
(4, 'Defects free'),
(5, 'Defects'),
(6, 'Yellowis');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `orderNo` bigint(20) NOT NULL AUTO_INCREMENT,
  `customerID` int(11) DEFAULT NULL,
  `supplierID` int(11) DEFAULT NULL,
  `productID` int(11) DEFAULT NULL,
  `product_type` varchar(50) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `color` int(11) DEFAULT NULL,
  `orderDate` varchar(20) DEFAULT NULL,
  `shipDate` varchar(20) DEFAULT NULL,
  `salesTax` float DEFAULT NULL,
  `transactStatus` varchar(100) DEFAULT NULL,
  `paymentDate` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`orderNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `product_price` int(11) DEFAULT NULL,
  `product_brand` varchar(200) DEFAULT NULL,
  `supplierID` int(11) NOT NULL,
  `product_finish_type` varchar(50) DEFAULT NULL,
  `product_desc` varchar(500) DEFAULT NULL,
  `product_rating` float DEFAULT '0',
  `product_img` varchar(100) DEFAULT NULL,
  `isDiscountAvailable` int(11) DEFAULT '0',
  `isProductAvailable` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `type_id`, `product_name`, `product_price`, `product_brand`, `supplierID`, `product_finish_type`, `product_desc`, `product_rating`, `product_img`, `isDiscountAvailable`, `isProductAvailable`) VALUES
(1, 1, 'Rockcon M1-E20545 ', 90, 'Johnson', 1, 'Matt finish', 'This is our most amazing product.', 0, 'images/products/tiles/tile1.jpg', 0, 1),
(2, 2, 'Ureka-E0633MF', 81, 'Somany', 2, 'Glaze', 'A fine product', 1.4, 'images/products/wood/wood1.jpg', 0, 0),
(3, 1, 'Salerno Porcelain Tile', 60, 'Johnson', 1, 'Matt', 'The Salerno Moderna Collection is a high quality porcelain tile that boasts a unique modern linear design. The simple elegance of the pattern makes this collection suitable for both rustic and contemporary decor.\r\nThe porcelain tiles in the Moderna Collection are extremely durable and are resistant ', 4.4, 'images/products/tiles/tile2.jpg', 0, 0),
(4, 2, 'Martin Indi M1-E20545 ', 85, 'Martin', 1, 'Matt finish', 'Amazing product.', 0, 'images/products/wood/wood1.jpg', 0, 1),
(5, 3, 'Zamakian M1-E20545 ', 40, 'Zamaikan', 2, 'Matt finish', 'Amazing product.', 0, 'images/products/marble/marble1.jpg', 0, 1),
(6, 1, 'Zueka-FM343MF', 47, 'Somany', 2, 'Glaze', 'A fine product', 2, 'images/products/tiles/tile2.jpg', 0, 0),
(7, 1, 'Ocean Porcelain', 60, 'Preopeno', 1, 'Matt', 'The Salerno Moderna Collection is a high  are resistant ', 4, 'images/products/tiles/tile1.jpg', 0, 0),
(8, 3, 'Memer Porcelain', 80, 'Slumpipe', 1, 'Matt', 'The Salerno Moderna Collection is a high and are resistant ', 3.4, 'images/products/marble/marble1.jpg', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `products_usages`
--

CREATE TABLE IF NOT EXISTS `products_usages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `products_id` int(11) NOT NULL,
  `usages_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `products_usages`
--

INSERT INTO `products_usages` (`id`, `products_id`, `usages_id`) VALUES
(1, 1, 1),
(2, 1, 3),
(3, 1, 4),
(4, 2, 2),
(5, 2, 3),
(6, 3, 5),
(7, 3, 14),
(8, 8, 3),
(10, 5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `product_colors`
--

CREATE TABLE IF NOT EXISTS `product_colors` (
  `products_id` int(11) NOT NULL,
  `colors_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `product_colors`
--

INSERT INTO `product_colors` (`products_id`, `colors_id`, `id`) VALUES
(1, 2, 1),
(1, 4, 2),
(1, 7, 3),
(2, 8, 4),
(3, 1, 5),
(3, 6, 6),
(4, 7, 7),
(4, 4, 8);

-- --------------------------------------------------------

--
-- Table structure for table `product_designs`
--

CREATE TABLE IF NOT EXISTS `product_designs` (
  `products_id` int(11) NOT NULL,
  `designs_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `product_designs`
--

INSERT INTO `product_designs` (`products_id`, `designs_id`, `id`) VALUES
(1, 1, 1),
(2, 1, 2),
(2, 2, 3),
(3, 6, 4),
(4, 12, 5),
(3, 13, 6);

-- --------------------------------------------------------

--
-- Table structure for table `product_features`
--

CREATE TABLE IF NOT EXISTS `product_features` (
  `products_id` int(11) NOT NULL,
  `features_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `product_features`
--

INSERT INTO `product_features` (`products_id`, `features_id`, `id`) VALUES
(1, 2, 1),
(1, 4, 2),
(2, 1, 3),
(2, 5, 4),
(3, 3, 5),
(4, 6, 6),
(5, 2, 7);

-- --------------------------------------------------------

--
-- Table structure for table `product_subtypes`
--

CREATE TABLE IF NOT EXISTS `product_subtypes` (
  `products_id` int(11) NOT NULL,
  `subtypes_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `product_subtypes`
--

INSERT INTO `product_subtypes` (`products_id`, `subtypes_id`, `id`) VALUES
(1, 1, 1),
(2, 3, 2),
(3, 5, 3),
(4, 9, 4),
(3, 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `product_surface_types`
--

CREATE TABLE IF NOT EXISTS `product_surface_types` (
  `products_id` int(11) NOT NULL,
  `surface_types_id` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_surface_types`
--

INSERT INTO `product_surface_types` (`products_id`, `surface_types_id`, `id`) VALUES
(1, 1, 0),
(2, 1, 0),
(2, 3, 0),
(3, 5, 0),
(3, 6, 0),
(4, 8, 0),
(3, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_thickness`
--

CREATE TABLE IF NOT EXISTS `product_thickness` (
  `product_id` int(11) NOT NULL,
  `thickness_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_types`
--

CREATE TABLE IF NOT EXISTS `product_types` (
  `types_id` int(11) NOT NULL,
  `products_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `product_types`
--

INSERT INTO `product_types` (`types_id`, `products_id`, `id`) VALUES
(1, 0, 1),
(1, 0, 2),
(3, 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `product_usages`
--

CREATE TABLE IF NOT EXISTS `product_usages` (
  `product_id` int(11) NOT NULL,
  `usage_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `product_usages`
--

INSERT INTO `product_usages` (`product_id`, `usage_id`, `id`) VALUES
(1, 1, 1),
(1, 3, 2),
(1, 4, 3),
(2, 2, 4),
(2, 3, 5),
(3, 5, 6),
(3, 14, 7);

-- --------------------------------------------------------

--
-- Table structure for table `subtypes`
--

CREATE TABLE IF NOT EXISTS `subtypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subtype_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `subtypes`
--

INSERT INTO `subtypes` (`id`, `subtype_name`) VALUES
(1, 'Mosasic'),
(2, 'Porcelain'),
(3, 'Digital\r\n'),
(4, 'Ceramic'),
(5, 'Hard Wood'),
(6, 'Laminate'),
(7, 'Engineered'),
(8, 'Makrana'),
(9, 'Banswara'),
(10, 'Udaipur'),
(11, 'Limestone'),
(12, 'Granite'),
(13, 'Vinyl'),
(14, 'Relief'),
(15, 'Woodchip');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE IF NOT EXISTS `suppliers` (
  `supplierID` int(11) NOT NULL AUTO_INCREMENT,
  `companyName` varchar(100) DEFAULT NULL,
  `contactFirstName` varchar(30) DEFAULT NULL,
  `contactLastName` varchar(30) DEFAULT NULL,
  `contactTitle` varchar(30) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `contactNo` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `paymentMethods` varchar(100) DEFAULT NULL,
  `postalcode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`supplierID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`supplierID`, `companyName`, `contactFirstName`, `contactLastName`, `contactTitle`, `address`, `city`, `state`, `country`, `contactNo`, `email`, `url`, `paymentMethods`, `postalcode`) VALUES
(1, 'WS Retail Services Private Limited', 'Ankit', 'Marwadi', 'WS Retail', '71/1, Opposite BESCOM Office, MS Ramaiah Main Road, Gokula, SBM Colony, Mathikere, Bengaluru, Karnataka 560054', 'Bengaluru', 'Karnatka', 'India', '9087854646', 'contact@wsretail.com', 'https://plus.google.com/104728115930746124463/about?gl=in&hl=en', 'all', '560054'),
(2, 'Jupiter Home Services Private Limited', 'Sahil', 'Solanki', 'Jupiter07', 'SBM Colony, Mathikere, Sikar, Rajasthan, 332028', 'sikar', 'Rajasthan', 'India', '90575478552', 'contact@jupiter07.com', 'jupiter07', 'COD', '332028');

-- --------------------------------------------------------

--
-- Table structure for table `surface_types`
--

CREATE TABLE IF NOT EXISTS `surface_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `surface_type_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Dumping data for table `surface_types`
--

INSERT INTO `surface_types` (`id`, `surface_type_name`) VALUES
(1, 'wall'),
(2, 'floor'),
(3, 'Maple'),
(4, 'Exotics'),
(5, 'Synthetic'),
(6, 'Makrana Dungri'),
(7, 'Banswara Ambaji'),
(8, 'Onyx'),
(9, 'wall'),
(10, 'floor'),
(11, 'Maple'),
(12, 'Exotics'),
(13, 'Synthetic'),
(14, 'Makrana Dungri'),
(15, 'Banswara Ambaji'),
(16, 'Onyx'),
(17, 'pvc'),
(18, 'cotton');

-- --------------------------------------------------------

--
-- Table structure for table `thickness`
--

CREATE TABLE IF NOT EXISTS `thickness` (
  `thickness_id` int(11) NOT NULL,
  `thickness` float NOT NULL,
  `thickness_unit` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE IF NOT EXISTS `types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `type_name`) VALUES
(1, 'tiles'),
(2, 'wood'),
(3, 'marble'),
(4, 'stone'),
(5, 'wallpaper'),
(6, 'artificial');

-- --------------------------------------------------------

--
-- Table structure for table `usages`
--

CREATE TABLE IF NOT EXISTS `usages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usage_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `usages`
--

INSERT INTO `usages` (`id`, `usage_name`) VALUES
(1, 'living room'),
(2, 'bathroom'),
(3, 'kitchen'),
(4, 'outdoor'),
(5, 'commercial'),
(6, 'sports surfaces'),
(7, 'stage flooring'),
(8, 'exterior'),
(9, 'stairs'),
(10, 'decorative places'),
(11, 'curtain'),
(12, 'kids room'),
(13, 'bed room'),
(14, 'Residential');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `pwd_update_time` varchar(20) NOT NULL,
  `supplierID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `pwd`, `pwd_update_time`, `supplierID`) VALUES
(1, 'sahil@gmail.com', '2fd388288325325ed29e1cec0281866c', '11:50:30am', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
