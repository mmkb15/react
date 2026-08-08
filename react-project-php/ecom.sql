-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2026 at 09:07 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecom`
--

-- --------------------------------------------------------

--
-- Table structure for table `adjustment_types`
--

CREATE TABLE `adjustment_types` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `change_type` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
(1, 'Aarong'),
(2, 'Yellow'),
(3, 'Deshal');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Man'),
(2, 'Women'),
(4, 'Kids');

-- --------------------------------------------------------

--
-- Table structure for table `inventories`
--

CREATE TABLE `inventories` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `balance` int(11) NOT NULL,
  `transaction_type_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_adjustments`
--

CREATE TABLE `inventory_adjustments` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `adjustment_type_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `note` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL DEFAULT 1,
  `user_id` int(11) NOT NULL DEFAULT 1,
  `order_placed_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `user_id`, `order_placed_at`) VALUES
(1, 1, 1, '2026-06-16 06:53:00'),
(2, 1, 1, '2026-06-16 06:53:29'),
(3, 1, 1, '2026-06-16 07:07:59'),
(4, 1, 1, '2026-06-16 07:09:27'),
(5, 1, 1, '2026-06-16 07:09:56'),
(6, 1, 1, '2026-06-16 07:10:29'),
(7, 1, 1, '2026-06-16 07:10:45'),
(8, 1, 1, '2026-06-16 07:11:59'),
(9, 1, 1, '2026-06-16 07:12:27'),
(10, 1, 1, '2026-06-16 07:13:46'),
(11, 1, 1, '2026-06-16 07:14:24'),
(12, 1, 1, '2026-06-16 07:14:33'),
(13, 1, 1, '2026-06-16 07:15:37'),
(14, 1, 1, '2026-06-16 07:15:41'),
(15, 1, 1, '2026-06-20 04:46:59'),
(16, 1, 1, '2026-06-20 05:05:00'),
(17, 1, 1, '2026-06-20 05:05:17'),
(18, 1, 1, '2026-06-20 06:10:39');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `qty`, `price`) VALUES
(1, 1, 5, 4, 1300),
(2, 1, 6, 2, 1500),
(3, 1, 7, 1, 2000),
(4, 2, 8, 1, 1100),
(5, 2, 4, 1, 1200),
(6, 3, 8, 1, 1100),
(7, 3, 4, 1, 1200),
(8, 4, 8, 1, 1100),
(9, 4, 4, 1, 1200),
(10, 5, 8, 1, 1100),
(11, 5, 4, 1, 1200),
(12, 6, 8, 1, 1100),
(13, 6, 4, 1, 1200),
(14, 7, 8, 1, 1100),
(15, 7, 4, 1, 1200),
(16, 8, 8, 1, 1100),
(17, 8, 4, 1, 1200),
(18, 9, 8, 1, 1100),
(19, 9, 4, 1, 1200),
(20, 10, 8, 2, 1100),
(21, 10, 4, 1, 1200),
(22, 10, 3, 3, 5000),
(23, 11, 8, 2, 1100),
(24, 11, 4, 1, 1200),
(25, 11, 3, 3, 5000),
(26, 12, 6, 1, 1500),
(27, 12, 7, 1, 2000),
(28, 12, 3, 1, 5000),
(29, 13, 7, 1, 2000),
(30, 13, 6, 1, 1500),
(31, 14, 7, 1, 2000),
(32, 14, 6, 1, 1500),
(33, 15, 5, 1, 1300),
(34, 15, 6, 1, 1500),
(35, 16, 7, 1, 2000),
(36, 16, 6, 2, 1500),
(37, 17, 7, 1, 2000),
(38, 17, 6, 2, 1500);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `short_description` varchar(255) DEFAULT NULL,
  `price` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `point_of_restock` int(11) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category_id`, `brand_id`, `short_description`, `price`, `quantity`, `point_of_restock`, `image`, `active`) VALUES
(1, 'Red Sharee', 2, 3, 'asd', 1200, 10, 2, NULL, 0),
(2, 'Lali', 2, 1, NULL, 78678, 78, 0, 'uploads/20260615-090735.jpg', 0),
(3, 'Silk Sharee', 2, 1, NULL, 5000, 8, 2, 'uploads/20260616-053502.jpg', 1),
(4, 'Blue Sharee', 2, 3, NULL, 1200, 20, 5, 'uploads/20260616-055245.jpg', 1),
(5, 'Blue Shirt', 1, 2, NULL, 1300, 15, 5, 'uploads/20260616-055319.jpg', 1),
(6, 'Black Shirt', 1, 3, NULL, 1500, 12, 5, 'uploads/20260616-055400.jpg', 1),
(7, 'Red Dress', 4, 1, NULL, 2000, 8, 4, 'uploads/20260616-055432.jpg', 1),
(9, 'Pink Dress', 4, 2, NULL, 1500, 5, 0, 'uploads/20260624-062843.jpg', 1),
(10, 'Baby Dress', 4, 3, NULL, 2000, 14, 5, 'uploads/20260624-063132.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'Manager'),
(3, 'Editor'),
(4, 'Sales Person');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_types`
--

CREATE TABLE `transaction_types` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role_id` int(11) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role_id`, `password`) VALUES
(8, 'Asia', 'asia@mail.com', 1, '$2y$10$FuJFW8c6LX6PoucVFHOeGOnTMgepOU0qu2.s3dYiG2Eikrfq98Xti'),
(9, 'Lali', 'lali@mail.com', 2, '$2y$10$E1zN1JJGikeZpUkzGMPejer3XqbxA5RfhjjbpeboleGbvh3w8NYxm'),
(10, 'Mina', 'm@mail.com', 2, '$2y$10$UZBh6UEUJ0PYtbdQ7rRPdu7S9Ngnxq2MgkM76tDSFrKzNvyGJ.Ws2'),
(11, 'Keya', 'k@mail.com', 3, '$2y$10$JPPr9RD8pJDcCwvI/3IlSODEB0kgq2Gi0bo1JsK3NbL0PQtuH4uea'),
(12, 'Ali', 'ali@example.com', 1, '$2y$10$wADaTpiUoiHQNVIRRnK4yuaVDPh.1R6aCg4FE9Rb/mZxEWtyx2xsS'),
(14, 'Arif', 'a@example.com', 2, '$2y$10$EQb/aJm1Sg9O/D6tFBIZfu8kKCz8nt27LcFs9Ga1UFJcOHovPWhmm'),
(15, 'Keya', 'k@example.com', 3, '$2y$10$FeAmntBmL6K0Njl.YeNke.l9Y/eXTU//4FTRg9nDe6jlxsc88/LqC'),
(16, 'Asia', 'admin@mail.com', 4, '$2y$10$JPPr9RD8pJDcCwvI/3IlSODEB0kgq2Gi0bo1JsK3NbL0PQtuH4uea');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adjustment_types`
--
ALTER TABLE `adjustment_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventories`
--
ALTER TABLE `inventories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_adjustments`
--
ALTER TABLE `inventory_adjustments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction_types`
--
ALTER TABLE `transaction_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adjustment_types`
--
ALTER TABLE `adjustment_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `inventories`
--
ALTER TABLE `inventories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_adjustments`
--
ALTER TABLE `inventory_adjustments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transaction_types`
--
ALTER TABLE `transaction_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
