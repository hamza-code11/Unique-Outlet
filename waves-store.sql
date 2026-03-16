-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2026 at 01:51 PM
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
-- Database: `waves-store`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_sections`
--

CREATE TABLE `about_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `badge` varchar(255) DEFAULT NULL,
  `heading` varchar(255) NOT NULL,
  `paragraph` text NOT NULL,
  `years` varchar(255) NOT NULL,
  `customers` varchar(255) NOT NULL,
  `products` varchar(255) NOT NULL,
  `support` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `about_sections`
--

INSERT INTO `about_sections` (`id`, `badge`, `heading`, `paragraph`, `years`, `customers`, `products`, `support`, `image`, `created_at`, `updated_at`) VALUES
(1, 'ABOUT US', 'Passionate About\r\nQuality & Innovation', 'We are dedicated to delivering premium vaping products designed for performance, safety, and satisfaction. Our store offers a carefully curated collection of devices and accessories that combine modern technology with elegant design.\r\n\r\nWhether you\'re new to vaping or an experienced enthusiast, our mission is to provide reliable products, trusted quality, and exceptional customer support that makes your experience smooth and enjoyable.', '10+', '50k+', '500+', '24/7', 'about/3xlpWUFenYsWMExop1fr3BSQhwdLsBCfaxoPCDBI.png', '2026-03-09 05:40:33', '2026-03-09 06:16:06');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Vapes', 'vapes', '2026-03-09 05:40:33', '2026-03-09 05:40:33'),
(2, 'Mobile Accessories', 'mobile-accessories', '2026-03-09 05:40:33', '2026-03-09 05:40:33'),
(3, 'Seasonal product', 'seasonal-product', '2026-03-09 05:56:00', '2026-03-09 05:56:00');

-- --------------------------------------------------------

--
-- Table structure for table `checkout_orders`
--

CREATE TABLE `checkout_orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `town_city` varchar(255) NOT NULL,
  `postcode` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `checkout_orders`
--

INSERT INTO `checkout_orders` (`id`, `user_id`, `name`, `email`, `phone`, `country`, `street_address`, `town_city`, `postcode`, `created_at`, `updated_at`, `status`) VALUES
(1, 1, 'shaikh hamza', 'hamza98.dev@gmail.com', '03101132039', 'Pakistan', 'karachi surjani town sector 7/A', 'Karachi', '7510', '2026-03-10 06:40:05', '2026-03-10 06:40:05', 'pending'),
(2, 2, 'shaikh hamza', 'hamza98.dev@gmail.com', '03101132039', 'Pakistan', 'karachi surjani town sector 7/A', 'Karachi', '7510', '2026-03-16 04:42:08', '2026-03-16 04:42:08', 'pending'),
(3, 2, 'shaikh hamza', 'hamza98.dev@gmail.com', '03101132039', 'Pakistan', 'karachi surjani town sector 7/A', 'Karachi', '7510', '2026-03-16 07:03:09', '2026-03-16 07:03:09', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact_sections`
--

CREATE TABLE `contact_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `badge` varchar(255) DEFAULT NULL,
  `heading` varchar(255) NOT NULL,
  `paragraph` text NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `customer_support` varchar(255) NOT NULL,
  `map_location` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_sections`
--

INSERT INTO `contact_sections` (`id`, `badge`, `heading`, `paragraph`, `address`, `phone`, `email`, `customer_support`, `map_location`, `created_at`, `updated_at`) VALUES
(1, 'Contact Us', 'Get in Touch', 'Feel free to contact us anytime', '123 Main Street, New York', '+1 234 567 890', 'support@vape.com', '24/7 Customer Support', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52859625.8737515!2d-161.6458215068694!3d36.03749288732443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2s!4v1772887278885!5m2!1sen!2s', '2026-03-09 05:40:33', '2026-03-09 05:40:33');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faq_sections`
--

CREATE TABLE `faq_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `badge` varchar(255) DEFAULT NULL,
  `heading` varchar(255) NOT NULL,
  `question1` varchar(255) NOT NULL,
  `answer1` text NOT NULL,
  `question2` varchar(255) NOT NULL,
  `answer2` text NOT NULL,
  `question3` varchar(255) NOT NULL,
  `answer3` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `faq_sections`
--

INSERT INTO `faq_sections` (`id`, `image`, `badge`, `heading`, `question1`, `answer1`, `question2`, `answer2`, `question3`, `answer3`, `created_at`, `updated_at`) VALUES
(1, 'faq/qlsW8MkesQEvyL8qciHpya3hctj14iyT4NCHbXXZ.png', 'FAQ', 'Frequently Asked Questions', 'How long does shipping take?', 'Shipping usually takes 2-5 business days.', 'Do you offer refunds?', 'Yes we offer refunds within 7 days.', 'Is customer support available?', 'Our support team is available 24/7.', '2026-03-09 05:40:33', '2026-03-09 06:19:29');

-- --------------------------------------------------------

--
-- Table structure for table `flavours`
--

CREATE TABLE `flavours` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `subcategory_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `desc` text DEFAULT NULL,
  `price` decimal(8,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `flavours`
--

INSERT INTO `flavours` (`id`, `category_id`, `subcategory_id`, `product_id`, `name`, `slug`, `desc`, `price`, `stock`, `image`, `created_at`, `updated_at`) VALUES
(2, 1, 1, 2, 'Drangon Melon', 'drangon-melon', 'Experience the future of vaping with the Geek Bar Pulse 15,000 Puff Disposable Vape, Designed for performance lovers, this advanced disposable device combines cutting-edge technology, futuristic design, and exceptional flavor consistency-giving you the ultimate vape experience every time.', 8.50, 20, 'flavours/2bykew572EPDvnHVcqVbOjZvvRXNDYK5XMV5TER2.webp', '2026-03-10 03:31:02', '2026-03-10 03:46:05'),
(3, 1, 1, 2, 'Cherry bomb', 'cherry-bomb', 'Experience the future of vaping with the Geek Bar Pulse 15,000 Puff Disposable Vape, now available at Vape Mall! Designed for performance lovers, this advanced disposable device combines cutting-edge technology, futuristic design, and exceptional flavor consistency-giving you the ultimate vape experience every time.', 8.50, 20, 'flavours/yXOiKEpTqd4YsYIh93tPqJAWrTYPW2RIXBohR9I3.webp', '2026-03-10 03:45:46', '2026-03-10 03:45:46'),
(4, 1, 1, 2, 'Icy Mintz', 'icy-mintz', 'Experience the future of vaping with the Geek Bar Pulse 15,000 Puff Disposable Vape, Designed for performance lovers, this advanced disposable device combines cutting-edge technology, futuristic design, and exceptional flavor consistency-giving you the ultimate vape experience every time.', 8.50, 20, 'flavours/Ko4M6b8U2jbkAasOYiWBqot6fmQHYg7CTupeHUGO.webp', '2026-03-10 03:52:54', '2026-03-10 03:52:54'),
(5, 1, 1, 2, 'Fcking FAB', 'fcking-fab', 'Experience the future of vaping with the Geek Bar Pulse 15,000 Puff Disposable Vape, Designed for performance lovers, this advanced disposable device combines cutting-edge technology, futuristic design, and exceptional flavor consistency-giving you the ultimate vape experience every time.', 8.50, 20, 'flavours/ylY3PIVx4cBjOY9XSkF7z3JwoUScHkkj2NXREWkR.webp', '2026-03-10 03:54:54', '2026-03-10 03:54:54'),
(6, 1, 1, 3, 'Dualicious', 'dualicious', 'Upgrade your vaping experience with the Geek Bar Pulse-X Standard Version. Engineered with advanced technology and a sleek, modern design, this disposable vape is built for users who want long-lasting performance, smooth flavor delivery, and reliable consistency from the first puff to the last.', 10.50, 20, 'flavours/XY75LbKBn6oLWy4OtJWJrlb95zzh1mUUdvN5PkGw.webp', '2026-03-10 04:37:29', '2026-03-10 04:37:29'),
(7, 1, 1, 3, 'Miami min2', 'miami-min2', 'Upgrade your vaping experience with the Geek Bar Pulse-X Standard Version. Engineered with advanced technology and a sleek, modern design, this disposable vape is built for users who want long-lasting performance, smooth flavor delivery, and reliable consistency from the first puff to the last.', 10.50, 20, 'flavours/aWDGttTJZyCr0o21sFuf2xkg0KqWcfJaeSvxGqx3.webp', '2026-03-10 04:38:19', '2026-03-10 04:38:19'),
(8, 1, 1, 3, 'Orange Mint', 'orange-mint', 'Upgrade your vaping experience with the Geek Bar Pulse-X Standard Version. Engineered with advanced technology and a sleek, modern design, this disposable vape is built for users who want long-lasting performance, smooth flavor delivery, and reliable consistency from the first puff to the last.', 10.50, 20, 'flavours/v6ljlYBy51DOLyPehRQ6bJ152bqBLbV2xQnGFFul.webp', '2026-03-10 04:39:13', '2026-03-10 04:39:13'),
(9, 1, 1, 3, 'Pink and Blue', 'pink-and-blue', 'Upgrade your vaping experience with the Geek Bar Pulse-X Standard Version. Engineered with advanced technology and a sleek, modern design, this disposable vape is built for users who want long-lasting performance, smooth flavor delivery, and reliable consistency from the first puff to the last.', 10.50, 20, 'flavours/W5BAMAnKuZ9pO4ryspHHVQWOiEfPdPnLzrBHrvOw.webp', '2026-03-10 04:40:06', '2026-03-10 04:40:06'),
(11, 1, 3, 16, 'Pink and bluw2', 'pink-and-bluw2', 'Meet the Foger Switch Pro Kit — a modular approach to disposable vapes that includes two parts: a disposable pre-filled pod and rechargeable battery. It\'s the answer for vapers in search of a more cost effective, eco-friendly device. The power bank uses an internal 850 mAh battery while the pod also has a 200mAh battery. The two halves magnetically connect and features pass-through charging, where charging the power bank also charges the pod. Once the pod is empty, simply replace it while keeping the power bank. Featuring a transparent tank and a smart screen, vapers can easily monitor the e-liquid levels, battery life, and even puff time.  Customizable features on the Foger Switch Pro include a dual mesh coil for smooth, consistent flavor, precise stepless airflow control, and two power modes. Vape in norm mode for up to 30,000 puffs, or pick boost mode for up to 18,000 puffs of a hotter and more flavor intensive vape.\r\n\r\n5% nicotine by weight (50mg/mL)\r\nPre-filled & pre-charged\r\n850 mAh power bank\r\n200 mAh disposable pre-filled pod\r\nMagnetic connection\r\nLED screen\r\n1.0 ohm dual mesh coil\r\nBattery life and puff timer display\r\nLanyard hold\r\nNorm mode: up to 30,000 puffs\r\nBurst mode: up to 18,000 puffs', 10.75, 20, 'flavours/biRwljqF9eyoRmMRe4qktwVPVaAxyLFAcACjt98e.png', '2026-03-10 05:53:34', '2026-03-10 05:53:34'),
(12, 1, 3, 16, 'Pink Lemonade', 'pink-lemonade', 'Meet the Foger Switch Pro Kit — a modular approach to disposable vapes that includes two parts: a disposable pre-filled pod and rechargeable battery. It\'s the answer for vapers in search of a more cost effective, eco-friendly device. The power bank uses an internal 850 mAh battery while the pod also has a 200mAh battery. The two halves magnetically connect and features pass-through charging, where charging the power bank also charges the pod. Once the pod is empty, simply replace it while keeping the power bank. Featuring a transparent tank and a smart screen, vapers can easily monitor the e-liquid levels, battery life, and even puff time.  Customizable features on the Foger Switch Pro include a dual mesh coil for smooth, consistent flavor, precise stepless airflow control, and two power modes. Vape in norm mode for up to 30,000 puffs, or pick boost mode for up to 18,000 puffs of a hotter and more flavor intensive vape.\r\n\r\n5% nicotine by weight (50mg/mL)\r\nPre-filled & pre-charged\r\n850 mAh power bank\r\n200 mAh disposable pre-filled pod\r\nMagnetic connection\r\nLED screen\r\n1.0 ohm dual mesh coil\r\nBattery life and puff timer display\r\nLanyard hold\r\nNorm mode: up to 30,000 puffs\r\nBurst mode: up to 18,000 puffs', 10.75, 20, 'flavours/6ySj9Rm5gUYouQxYbzKsHefRBflmDA98HBcJd9Y7.png', '2026-03-10 05:54:13', '2026-03-10 05:54:13'),
(13, 1, 3, 16, 'Strawberry Banana', 'strawberry-banana', 'Meet the Foger Switch Pro Kit — a modular approach to disposable vapes that includes two parts: a disposable pre-filled pod and rechargeable battery. It\'s the answer for vapers in search of a more cost effective, eco-friendly device. The power bank uses an internal 850 mAh battery while the pod also has a 200mAh battery. The two halves magnetically connect and features pass-through charging, where charging the power bank also charges the pod. Once the pod is empty, simply replace it while keeping the power bank. Featuring a transparent tank and a smart screen, vapers can easily monitor the e-liquid levels, battery life, and even puff time.  Customizable features on the Foger Switch Pro include a dual mesh coil for smooth, consistent flavor, precise stepless airflow control, and two power modes. Vape in norm mode for up to 30,000 puffs, or pick boost mode for up to 18,000 puffs of a hotter and more flavor intensive vape.\r\n\r\n5% nicotine by weight (50mg/mL)\r\nPre-filled & pre-charged\r\n850 mAh power bank\r\n200 mAh disposable pre-filled pod\r\nMagnetic connection\r\nLED screen\r\n1.0 ohm dual mesh coil\r\nBattery life and puff timer display\r\nLanyard hold\r\nNorm mode: up to 30,000 puffs\r\nBurst mode: up to 18,000 puffs', 10.75, 20, 'flavours/S4hHrppaHGNwB1RJH7VwPfK7odWukdZmbvxzwbft.png', '2026-03-10 05:55:18', '2026-03-10 05:55:18'),
(14, 1, 3, 16, 'Strawberry B-Pop', 'strawberry-b-pop', 'Meet the Foger Switch Pro Kit — a modular approach to disposable vapes that includes two parts: a disposable pre-filled pod and rechargeable battery. It\'s the answer for vapers in search of a more cost effective, eco-friendly device. The power bank uses an internal 850 mAh battery while the pod also has a 200mAh battery. The two halves magnetically connect and features pass-through charging, where charging the power bank also charges the pod. Once the pod is empty, simply replace it while keeping the power bank. Featuring a transparent tank and a smart screen, vapers can easily monitor the e-liquid levels, battery life, and even puff time.  Customizable features on the Foger Switch Pro include a dual mesh coil for smooth, consistent flavor, precise stepless airflow control, and two power modes. Vape in norm mode for up to 30,000 puffs, or pick boost mode for up to 18,000 puffs of a hotter and more flavor intensive vape.\r\n\r\n5% nicotine by weight (50mg/mL)\r\nPre-filled & pre-charged\r\n850 mAh power bank\r\n200 mAh disposable pre-filled pod\r\nMagnetic connection\r\nLED screen\r\n1.0 ohm dual mesh coil\r\nBattery life and puff timer display\r\nLanyard hold\r\nNorm mode: up to 30,000 puffs\r\nBurst mode: up to 18,000 puffs', 10.75, 20, 'flavours/BAbtCmKUSd2IjU3dZD68TH3gJRvskdj3mZ4KgPmG.png', '2026-03-10 05:55:52', '2026-03-10 05:55:52'),
(15, 1, 2, 17, 'Strawberry Ice Foger Switch Pro Pod 30K Puffs', 'strawberry-ice-foger-switch-pro-pod-30k-puffs', 'Capacity: 19ml\r\nNicotine Strength: 50mg\r\nPuff Count: 30000 Normal Mode, 18000 Boost Mode\r\nCoil: 1.0ohm Dual Mesh Coil\r\nDisposable Vape Capacity: 200mAh\r\nAdjustable Airflow\r\nClear Tank\r\nDisposable Size: 96 x 31 x 27.66mm\r\nCharging: Requires Power Bank for recharging.', 8.35, 20, 'flavours/GOzYWRI2wfmw62IpQSBcLjwjRMh3wVdZapZwpufR.png', '2026-03-10 06:16:08', '2026-03-10 06:16:08'),
(16, 1, 2, 17, 'Strawberry Watermelon Foger Switch Pro Pod 30K Puffs', 'strawberry-watermelon-foger-switch-pro-pod-30k-puffs', 'Capacity: 19ml\r\nNicotine Strength: 50mg\r\nPuff Count: 30000 Normal Mode, 18000 Boost Mode\r\nCoil: 1.0ohm Dual Mesh Coil\r\nDisposable Vape Capacity: 200mAh\r\nAdjustable Airflow\r\nClear Tank\r\nDisposable Size: 96 x 31 x 27.66mm\r\nCharging: Requires Power Bank for recharging.', 8.35, 20, 'flavours/xqKy3g8u34siAhN9OzqdYBkAWOdzfbojg7cVwN54.png', '2026-03-10 06:16:53', '2026-03-10 06:16:53'),
(17, 1, 2, 17, 'Cool Mint Foger Switch Pro Pod 30K Puffs', 'cool-mint-foger-switch-pro-pod-30k-puffs', 'Capacity: 19ml\r\nNicotine Strength: 50mg\r\nPuff Count: 30000 Normal Mode, 18000 Boost Mode\r\nCoil: 1.0ohm Dual Mesh Coil\r\nDisposable Vape Capacity: 200mAh\r\nAdjustable Airflow\r\nClear Tank\r\nDisposable Size: 96 x 31 x 27.66mm\r\nCharging: Requires Power Bank for recharging.', 8.35, 20, 'flavours/kd663xzrK791qHzM6rzwyncClEr5JXkIiV5NWq5s.png', '2026-03-10 06:17:57', '2026-03-10 06:17:57'),
(18, 1, 2, 17, 'Blue Razz Ice Foger Switch Pro Pod 30K Puffs', 'blue-razz-ice-foger-switch-pro-pod-30k-puffs', 'Capacity: 19ml\r\nNicotine Strength: 50mg\r\nPuff Count: 30000 Normal Mode, 18000 Boost Mode\r\nCoil: 1.0ohm Dual Mesh Coil\r\nDisposable Vape Capacity: 200mAh\r\nAdjustable Airflow\r\nClear Tank\r\nDisposable Size: 96 x 31 x 27.66mm\r\nCharging: Requires Power Bank for recharging.', 8.35, 20, 'flavours/AD3lvEjNISngMWWkY3AU98Zz1BuwzCEWpatsYmFx.png', '2026-03-10 06:18:35', '2026-03-10 06:18:35');

-- --------------------------------------------------------

--
-- Table structure for table `footer_settings`
--

CREATE TABLE `footer_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `brand_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `gmail` varchar(255) DEFAULT NULL,
  `newsletter_desc` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `footer_settings`
--

INSERT INTO `footer_settings` (`id`, `brand_name`, `description`, `location`, `contact`, `gmail`, `newsletter_desc`, `created_at`, `updated_at`) VALUES
(1, 'Unique Outlet', 'Best vaping and mobile accessories store with premium quality products.', 'Karachi, Pakistan', '+92 300 1234567', 'support@uniqueoutlet.com', 'Subscribe to our newsletter for latest updates and offers.', '2026-03-09 05:40:33', '2026-03-09 05:40:33');

-- --------------------------------------------------------

--
-- Table structure for table `interactive_promos`
--

CREATE TABLE `interactive_promos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `left_image` varchar(255) NOT NULL,
  `left_heading` varchar(255) NOT NULL,
  `left_paragraph` text NOT NULL,
  `left_button_text` varchar(255) NOT NULL,
  `right_top_image` varchar(255) NOT NULL,
  `right_top_heading` varchar(255) NOT NULL,
  `right_top_paragraph` text NOT NULL,
  `right_top_button_text` varchar(255) NOT NULL,
  `right_bottom_image` varchar(255) NOT NULL,
  `right_bottom_heading` varchar(255) NOT NULL,
  `right_bottom_paragraph` text NOT NULL,
  `right_bottom_button_text` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `interactive_promos`
--

INSERT INTO `interactive_promos` (`id`, `left_image`, `left_heading`, `left_paragraph`, `left_button_text`, `right_top_image`, `right_top_heading`, `right_top_paragraph`, `right_top_button_text`, `right_bottom_image`, `right_bottom_heading`, `right_bottom_paragraph`, `right_bottom_button_text`, `created_at`, `updated_at`) VALUES
(1, 'interactive/KCEj9t6LJPPplcBTPLR81boQRNfdy2fNn0hqAdmk.jpg', 'The Best E-Liquid Bundles', 'Explore a wide range of vaping products with fast delivery and beginner-friendly guidance.', 'Shop Now', 'interactive/v2a4AWp3A3gkG6Ja87J7DpBXkfx1a4OTRofk7Dl0.jpg', 'New To Vaping?', 'Learn how vaping works and choose the right starter kit.', 'Shop Now', 'interactive/4hjpjW6TFYwXGbKeiuVaViFfSf3coylk6f9rmWNM.jpg', 'Vap Mode', 'Discover advanced devices and customize your experience.', 'Shop Now', '2026-03-09 05:40:33', '2026-03-09 05:49:34');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(27, '0001_01_01_000000_create_users_table', 1),
(28, '0001_01_01_000001_create_cache_table', 1),
(29, '0001_01_01_000002_create_jobs_table', 1),
(30, '2026_02_24_123030_create_personal_access_tokens_table', 1),
(31, '2026_02_24_123529_add_role_to_users_table', 1),
(32, '2026_02_25_113900_add_google_fields_to_users_table', 1),
(33, '2026_02_26_094549_create_navbar_settings_table', 1),
(34, '2026_02_26_103225_create_footer_settings_table', 1),
(35, '2026_02_28_071402_create_categories_table', 1),
(36, '2026_02_28_072234_create_sub_categories_table', 1),
(37, '2026_02_28_074151_create_products_table', 1),
(38, '2026_03_03_095511_create_contacts_table', 1),
(39, '2026_03_04_085812_create_checkout_orders', 1),
(40, '2026_03_04_085835_create_order_items_table', 1),
(41, '2026_03_04_092108_add_status_to_checkout_orders_table', 1),
(43, '2026_03_06_111257_create_about_sections_table', 1),
(44, '2026_03_06_121535_create_promo_sections_table', 1),
(45, '2026_03_06_212332_create_interactive_promos_table', 1),
(46, '2026_03_06_214004_create_faq_sections_table', 1),
(47, '2026_03_06_220923_create_promo_product_sections_table', 1),
(48, '2026_03_06_231100_create_promo_features_sections_table', 1),
(49, '2026_03_07_121419_create_contact_sections_table', 1),
(50, '2026_03_07_130021_create_payment_sections_table', 1),
(51, '2026_03_08_122614_create_product_comments_table', 1),
(53, '2026_03_09_072024_create_flavours_table', 2),
(54, '2026_03_06_095941_create_sliders_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `navbar_settings`
--

CREATE TABLE `navbar_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `logo_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `navbar_settings`
--

INSERT INTO `navbar_settings` (`id`, `logo_image`, `created_at`, `updated_at`) VALUES
(1, 'uploads/1773143463.png', '2026-03-09 05:39:58', '2026-03-10 06:51:03');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `checkout_order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `checkout_order_id`, `product_id`, `product_name`, `price`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 'Geek Bar PulseX 25K  Blackberry Blueberry', 10.50, 1, '2026-03-10 06:40:05', '2026-03-10 06:40:05'),
(2, 2, 2, 'Geek bar 15K Meta Moon', 8.50, 1, '2026-03-16 04:42:08', '2026-03-16 04:42:08'),
(3, 3, 2, 'Geek bar 15K Meta Moon', 8.50, 2, '2026-03-16 07:03:09', '2026-03-16 07:03:09');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_sections`
--

CREATE TABLE `payment_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shipping_charges` varchar(255) NOT NULL,
  `bank_name` varchar(255) NOT NULL,
  `account_title` varchar(255) NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `iban` varchar(255) NOT NULL,
  `qrcode_image` varchar(255) NOT NULL,
  `other` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_sections`
--

INSERT INTO `payment_sections` (`id`, `shipping_charges`, `bank_name`, `account_title`, `account_number`, `iban`, `qrcode_image`, `other`, `created_at`, `updated_at`) VALUES
(1, '2', 'Zelle', 'Unique Outlet', '+1 (254) 715 2632', '--', 'payments/qrcode.png', NULL, '2026-03-09 05:40:33', '2026-03-16 07:36:58');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `sub_category_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `brand_name` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `bottle_size` varchar(255) DEFAULT NULL,
  `colors` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`colors`)),
  `specifications` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`specifications`)),
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `image1` varchar(255) DEFAULT NULL,
  `image2` varchar(255) DEFAULT NULL,
  `image3` varchar(255) DEFAULT NULL,
  `image4` varchar(255) DEFAULT NULL,
  `image5` varchar(255) DEFAULT NULL,
  `image6` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `sub_category_id`, `name`, `slug`, `price`, `brand_name`, `stock`, `description`, `bottle_size`, `colors`, `specifications`, `status`, `image1`, `image2`, `image3`, `image4`, `image5`, `image6`, `created_at`, `updated_at`) VALUES
(2, 1, 1, 'Geek bar 15K Meta Moon', 'geek-bar-15k-meta-moon', 8.50, 'Thurmal Edtion', 20, 'Experience the future of vaping with the Geek Bar Pulse 15,000 Puff Disposable Vape, Designed for performance lovers, this advanced disposable device combines cutting-edge technology, futuristic design, and exceptional flavor consistency-giving you the ultimate vape experience every time.', '30ml', NULL, '\"{}\"', 1, 'products/9les167Zzu28u98t1pcndOUkQwihjYqnt9zYCGZL.webp', NULL, NULL, NULL, NULL, NULL, '2026-03-10 02:59:13', '2026-03-10 05:50:49'),
(3, 1, 1, 'Geek Bar PulseX 25K  Blackberry Blueberry', 'geek-bar-pulsex-25k-blackberry-blueberry', 10.50, 'Thurmal Edtion', 20, 'Upgrade your vaping experience with the Geek Bar Pulse-X Standard Version. Engineered with advanced technology and a sleek, modern design, this disposable vape is built for users who want long-lasting performance, smooth flavor delivery, and reliable consistency from the first puff to the last.', '30ml', NULL, '\"{}\"', 1, 'products/fGHLsX5uvHTz9d5sWCBbzla4GIm8UdwejjSumS54.webp', NULL, NULL, NULL, NULL, NULL, '2026-03-10 04:36:07', '2026-03-10 05:50:59'),
(4, 3, 15, '2026 FIFA WORLD Cup Soccer Mascot Toy', '2026-fifa-world-cup-soccer-mascot-toy', 10.00, '2026', 10, 'FIFA World Cup 2026 Official Licensed Product World Cup Mascots Soccer Action Figures Football Mascots', NULL, NULL, NULL, 1, 'products/EU9LZOVzMGkEgxE1lVEOOmRXX5ujUET2ZjYR4JaM.webp', NULL, NULL, NULL, NULL, NULL, '2026-03-10 04:49:42', '2026-03-10 04:49:42'),
(5, 3, 9, 'X12 Plus 7 inch Video Game Console', 'x12-plus-7-inch-video-game-console', 10.00, '2026', 10, '7-inch HD TFT screen for immersive gaming and media viewing\r\nSupports classic NES and 32-bit games with easy downloads\r\nBuilt-in 8GB or 16GB memory with expandable TF card slot (up to 64GB)\r\nPlays a wide range of video (MP4, AVI, RMVB, etc.) and audio formats (MP3, FLAC, AAC, and more)\r\nBuilt-in microphone for AAC format voice recording\r\nSix EQ sound modes including rock, jazz, classical, and more\r\n2500mAh battery delivers 4–6 hours of continuous playtime\r\nLightweight design at only 160g – ultra portable and kid-friendly\r\nUSB 2.0 for fast file transfers and charging', '30ml', NULL, '\"{}\"', 1, 'products/CMmruTAbMB7aPNRbGi4v0WGXa6njZfKt8vpCSrqw.webp', NULL, NULL, NULL, NULL, NULL, '2026-03-10 04:52:57', '2026-03-10 04:59:08'),
(6, 3, 9, 'Wireless Controller for PS4', 'wireless-controller-for-ps4', 10.00, '2026', 10, 'The feel, shape, and sensitivity of the dual analog sticks and trigger buttons have been improved to provide a greater sense of control, no matter what you play\r\n\r\nThe dualshock 4 wireless controller features a built-in speaker and stereo headset jack, putting several new audio options in the player\'s hands\r\n\r\nThe dualshock 4 wireless controller can be easily recharged by plugging it into your PlayStation 4 system, even when in rest mode, or with any standard charger using a USB cable.\r\n\r\nDualShock 4 Wireless Controller PS4 and PC compatible. Item PS5 compatible only when playing PS4 games.', NULL, NULL, NULL, 1, 'products/j4aP2rBCxw8ZU3KJXFzLlCHEV7swEkCI8FhU30dF.webp', NULL, NULL, NULL, NULL, NULL, '2026-03-10 05:00:37', '2026-03-10 05:00:37'),
(7, 2, 10, 'JBL Tune 510BT - Bluetooth Headphones', 'jbl-tune-510bt-bluetooth-headphones', 10.00, '2026', 8, 'Bluetooth Headphones With Up To 40 Hours Battery Microphone For Call\r\nFoldable And Comfortable\r\nAndroid And IOs Compatible Black', NULL, NULL, NULL, 1, 'products/LB9JBKlmoicaYg6UqsfOXZ19yfuX5ySUmlCRAOQV.webp', NULL, NULL, NULL, NULL, NULL, '2026-03-10 05:05:01', '2026-03-10 05:05:01'),
(8, 2, 10, 'soundcore H30i Headphones', 'soundcore-h30i-headphones', 10.00, '2026', 10, 'Pure Bass via 40mm Dynamic Drivers: Specially designed to provide top-quality, detailed sound with pure bass. soundcore H30i on-ear wireless headphones use BassUp technology to offer a listening experience you can feel.\r\n\r\nExtended Playtime: Enjoy 70 hours* of constant playtime on a single charge. Perfect for the on-the-go listener. *Battery playtime is obtained from testing in the soundcore laboratory in continuous audio playback at 50% volume. The actual playtime may vary by volume, audio source, environmental interference, usage, etc.\r\n\r\nFast Charging: Top up your power with lightning-fast charging. A quick 5-minute charge provides an impressive 4 hours of playtime.\r\n\r\nLightweight and Comfortable: soundcore H30i wireless on-ear headphones are ideal for those longer listening sessions at only 183g. Crafted with soft earcups and an ergonomic shape, ear fatigue is a thing of the past.\r\n\r\nBluetooth 5.3: The latest Bluetooth version provides an ultra-stable connection with long-distance connectivity, so the music never stops.\r\n\r\nsoundcore App: Realize the full potential of soundcore H30i wireless on-ear headphones. Craft a unique listening style with customizable and preset EQ settings, and embrace total relaxation with the soundcore app\'s white noise feature.\r\n\r\nMultipoint Connection: Connect and switch between two devices for a smooth, hassle-free listening experience.\r\n\r\nSeamless Pairing: Quick and easy, just turn soundcore H30i wireless on-ear headphones on, and immediately connect to any device.', '30ml', '[\"#000000\",\"#41749d\"]', '\"{}\"', 1, 'products/ZpbEJFzrBI9DRuWz2XBqVqkzwwbTgFOPhOVfYvCD.webp', 'products/w9YTcz5Yx6XMe8MNZGuwXfvU96DCEzA8d49Lx1DV.webp', NULL, NULL, NULL, NULL, '2026-03-10 05:09:03', '2026-03-10 05:56:19'),
(9, 2, 11, 'FS-R112 TWS Speaker, Desktop Style, Rechargeable and Remote Control', 'fs-r112-tws-speaker-desktop-style-rechargeable-and-remote-control', 105.00, '2026', 10, 'TWS (True Wireless Stereo) technology: Connect two compatible speakers wirelessly to enjoy real, immersive stereo sound.\r\nBluetooth connectivity: Play your music wirelessly from your smartphone, tablet or computer, and enjoy total freedom.\r\nUSB and microSD port: Listen to your favorite music directly from a USB memory stick or microSD card without the need for other devices.\r\n3.5mm auxiliary input: Connect devices that do not have Bluetooth, such as MP3 players or laptops, and continue enjoying your music without complications.\r\n5V/2A USB output port: Charge your mobile devices while using the speaker. Ideal for keeping your phone or tablet charged while enjoying your music.\r\nPowerful sound: With one 4″ speaker and two 1.75″ speakers, it reaches 50 watts of power for clear and powerful sound.\r\nInnovative design: Its modern, table-like design is elegant and functional, with an integrated charging port for added convenience.\r\nRemote control included: Adjust the volume, change songs and control all functions from the comfort of your seat.\r\nTECHNICAL SPECIFICATIONS:\r\n\r\nSpeakers: 4″ + 2 x 1.75″ speakers\r\n\r\nPower: 50 watts\r\n\r\nUSB OUT port: 5V/2A\r\n\r\nRemote Control', NULL, NULL, NULL, 1, 'products/ajNI4SfYBESVnO5VSrTpHy418hz2XaACHzxrgywU.webp', NULL, NULL, NULL, NULL, NULL, '2026-03-10 05:20:08', '2026-03-10 05:20:08'),
(10, 2, 12, 'X-5WR drone with FPV goggles, white', 'x-5wr-drone-with-fpv-goggles-white', 55.00, '2026', 10, 'GREAT FEATURES\r\nThe X-5WR drone is packed with great features. Not only does it stream live video to your phone or tablet, it also has a compass function and pre-programmed 3D acrobatic flips.\r\n\r\nVERY EASY TO USE\r\nThe model is very easy to control. Thanks to the mentioned compass, it will be very easy for you to orient yourself in the direction of the drone\'s flight. If the model has a headless function (compass), the front part can be turned in any direction, but when you tilt the lever on the controller forward, it will always fly away from you. Without the headless mode, it would fly in the direction where the front part of the drone is pointing.\r\n\r\nTRANSPORT YOURSELF TO VIRTUAL REALITY\r\nIncluded in the package are great glasses that will project the image from the camera mounted on the drone directly in front of your eyes. By inserting your smartphone into the glasses and turning on the 3D application, you can live view where you are flying and enjoy 3D virtual reality. Of course, you can also use the glasses with other models and applications.\r\n\r\nCONTROL IS UP TO YOU\r\nYou can control the model classically with the buttons on the remote control or with your phone. The latter option is great for teacher/student mode, which will help you learn how to control the drone correctly.', NULL, NULL, NULL, 1, 'products/yCBL1x9ITyNY9pgX58GbF1sLpwOEtItEq1YZ1VDO.webp', NULL, NULL, NULL, NULL, NULL, '2026-03-10 05:27:56', '2026-03-10 05:27:56'),
(11, 2, 12, 'iSoul Avoid Obstacles Remote Control Flying X78 Drone MK30', 'isoul-avoid-obstacles-remote-control-flying-x78-drone-mk30', 55.00, '2026', 10, '1. Obstacle Avoidance Technology: Equipped with advanced sensors that detect and avoid obstacles in real-time, ensuring safe and smooth flights.\r\n\r\n2. HD Camera: Features a high-definition camera for capturing stunning aerial photos and videos, allowing you to document your adventures from a unique perspective.\r\n\r\n3. Easy Controls: User-friendly remote control with intuitive buttons and functions, making it easy for beginners to operate and enjoy.\r\n\r\n4. Long Flight Time: Equipped with a high-capacity battery that provides extended flight time, ensuring you have more time to enjoy your drone.\r\n\r\n5. One-Key Takeoff and Landing: Convenient one-key functions for easy takeoff and landing, ensuring safe and controlled flights.\r\n\r\n6. LED Lights: Integrated LED lights for improved visibility during low-light conditions and nighttime flights.\r\n\r\n7. Durable Design: Built with high-quality materials to withstand crashes and rough landings, ensuring durability and longevity.', NULL, NULL, NULL, 1, 'products/CzGAZ5E4Trh7usre7ZWgyE39NyasgisPkrGLgQwG.webp', NULL, NULL, NULL, NULL, NULL, '2026-03-10 05:29:57', '2026-03-10 05:29:57'),
(12, 2, 11, 'wireless Charger speaker with lamp', 'wireless-charger-speaker-with-lamp', 10.00, '2026', 10, 'Adjustable LED Display\r\nDual Speakers & Bluetooth 5.0\r\nFashionable Appearance\r\n15W Wireless Charging & 2500mAh Battery', NULL, NULL, NULL, 1, 'products/lHoqi9vi4Q77g0AXkHzhklx2CRaAWf7FmQPNfkh0.webp', NULL, NULL, NULL, NULL, NULL, '2026-03-10 05:34:12', '2026-03-10 05:34:12'),
(13, 2, 11, 'BOOM BOX 3 JBL', 'boom-box-3-jbl', 10.00, '2026', 10, 'Premium Sound Quality\r\nDeep bass, clear vocals & immersive powerful audio experience.\r\n\r\nLong-Lasting Battery\r\nEnjoy up to 24 hours of non-stop playtime on a single charge.\r\n\r\nIPX7 Waterproof\r\nFully waterproof design — perfect for pool parties, beach trips & outdoor adventures.\r\n\r\nMultiple Connectivity Options\r\nSupports Bluetooth, AUX & USB for seamless device pairing.\r\n\r\nSolid & Durable Build\r\nDimensions: 19.5 × 10.1 × 7.7 inches\r\nWeight: 11.6 lbs — Built for powerful performance.', NULL, NULL, NULL, 1, 'products/1ynSpFy0AH8pE3PLDsTWGBl5po7rZwfYFaRQeRNr.webp', NULL, NULL, NULL, NULL, NULL, '2026-03-10 05:36:28', '2026-03-10 05:36:28'),
(14, 2, 14, 'Magnetic Car Phone Holder with Suction Cup, Infinite Angles Rotating Vacuum', 'magnetic-car-phone-holder-with-suction-cup-infinite-angles-rotating-vacuum', 10.00, '2026', 10, 'Unlimited Angle Adjustment\r\nEnjoy full 360° rotation with flexible angle positioning. Easily switch between portrait and landscape mode. Foldable design saves space when not in use. Built for long-lasting durability and stability.\r\n\r\nUltra-Strong Suction Power\r\nUpgraded 4-layer nano gel suction cup provides 80% stronger grip than traditional mounts. Simply twist to lock onto smooth surfaces like dashboard, glass, or tiles. No adhesive needed and leaves no residue. Even on rough roads, your phone stays secure.\r\n\r\nPowerful Magnetic Hold\r\nFeatures a high-strength double-layer magnetic ring with precise 1:1 circular alignment. Delivers twice the magnetic force of regular magnets, keeping your phone firmly in place—even during sharp turns, sudden stops, or bumpy drives. Tested for 5,000+ road bumps.\r\n\r\nMulti-Surface & Universal Compatibility\r\nPerfect for car dashboards, mirrors, glass, and other smooth surfaces.\r\nCompatible with iPhone 16/15/14/13/12 series and all magnetic devices. Includes magnetic ring for non-magnetic phones.', NULL, NULL, NULL, 1, 'products/AXaktO96Gsh53jRc6AL7YVNtytKWsu9vPTR243Vq.webp', NULL, NULL, NULL, NULL, NULL, '2026-03-10 05:40:16', '2026-03-10 05:40:16'),
(15, 2, 13, 'High - Power  Portable Car Vacuum Cleaner', 'high-power-portable-car-vacuum-cleaner', 10.00, '2026', 10, 'Power Source: Operates on DC 12 Volts, designed to plug directly into a car\'s cigarette lighter socket. \r\nFunctionality: Suitable for both wet and dry cleaning tasks. \r\nSpecifications: Often features a rated power of around 65W, with a cable length typically around 3 meters.', NULL, NULL, NULL, 1, 'products/SCQDqQBo9Y2QuxC80BS22INmXN9yENQ7p43egQsX.webp', NULL, NULL, NULL, NULL, NULL, '2026-03-10 05:44:26', '2026-03-10 05:44:26'),
(16, 1, 3, 'Foger 30K Gummy Bear', 'foger-30k-gummy-bear', 10.75, 'Thurmal Edtion', 20, 'Meet the Foger Switch Pro Kit — a modular approach to disposable vapes that includes two parts: a disposable pre-filled pod and rechargeable battery. It\'s the answer for vapers in search of a more cost effective, eco-friendly device. The power bank uses an internal 850 mAh battery while the pod also has a 200mAh battery. The two halves magnetically connect and features pass-through charging, where charging the power bank also charges the pod. Once the pod is empty, simply replace it while keeping the power bank. Featuring a transparent tank and a smart screen, vapers can easily monitor the e-liquid levels, battery life, and even puff time.  Customizable features on the Foger Switch Pro include a dual mesh coil for smooth, consistent flavor, precise stepless airflow control, and two power modes. Vape in norm mode for up to 30,000 puffs, or pick boost mode for up to 18,000 puffs of a hotter and more flavor intensive vape.\r\n\r\n5% nicotine by weight (50mg/mL)\r\nPre-filled & pre-charged\r\n850 mAh power bank\r\n200 mAh disposable pre-filled pod\r\nMagnetic connection\r\nLED screen\r\n1.0 ohm dual mesh coil\r\nBattery life and puff timer display\r\nLanyard hold\r\nNorm mode: up to 30,000 puffs\r\nBurst mode: up to 18,000 puffs', '30ml', NULL, '\"{}\"', 1, 'products/0pned2GcKya8E1MjjrQS8MmhDrSktjc3ZMOoBYYn.png', NULL, NULL, NULL, NULL, NULL, '2026-03-10 05:47:48', '2026-03-10 05:51:10'),
(17, 1, 2, 'Juicy Peach Ice Foger Switch Pro Pod 30K Puffs', 'juicy-peach-ice-foger-switch-pro-pod-30k-puffs', 8.35, 'Thurmal Edtion', 20, 'Capacity: 19ml\r\nNicotine Strength: 50mg\r\nPuff Count: 30000 Normal Mode, 18000 Boost Mode\r\nCoil: 1.0ohm Dual Mesh Coil\r\nDisposable Vape Capacity: 200mAh\r\nAdjustable Airflow\r\nClear Tank\r\nDisposable Size: 96 x 31 x 27.66mm\r\nCharging: Requires Power Bank for recharging.', NULL, NULL, NULL, 1, 'products/gDnAo1c0DhpkbM81oOVObqHDcw79pNhurHvo7Aiq.png', NULL, NULL, NULL, NULL, NULL, '2026-03-10 06:14:49', '2026-03-10 06:14:49');

-- --------------------------------------------------------

--
-- Table structure for table `product_comments`
--

CREATE TABLE `product_comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `comment` text NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `promo_features_sections`
--

CREATE TABLE `promo_features_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `badge` varchar(255) DEFAULT NULL,
  `heading` varchar(255) NOT NULL,
  `paragraph` text NOT NULL,
  `button_text` varchar(255) NOT NULL,
  `feature_one_heading` varchar(255) NOT NULL,
  `feature_one_paragraph` text NOT NULL,
  `feature_two_heading` varchar(255) NOT NULL,
  `feature_two_paragraph` text NOT NULL,
  `feature_three_heading` varchar(255) NOT NULL,
  `feature_three_paragraph` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `promo_features_sections`
--

INSERT INTO `promo_features_sections` (`id`, `image`, `badge`, `heading`, `paragraph`, `button_text`, `feature_one_heading`, `feature_one_paragraph`, `feature_two_heading`, `feature_two_paragraph`, `feature_three_heading`, `feature_three_paragraph`, `created_at`, `updated_at`) VALUES
(1, 'promo-features/Gl2JmtxY1qO4mZGTxmqelhIqSlG994vKp9p5o5xa.png', 'New', 'Try our new taste', 'Our vape shop is not only a variety of vaping products, but also an operational support service.', 'Shop Now', 'No dangerous toxins', 'We offer a wide range of quality vaping products', 'Feel of menthol', 'We offer a wide range of quality vaping products', 'Safer than smoking', 'We offer a wide range of quality vaping products', '2026-03-09 05:40:33', '2026-03-09 06:19:57');

-- --------------------------------------------------------

--
-- Table structure for table `promo_product_sections`
--

CREATE TABLE `promo_product_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `badge` varchar(255) DEFAULT NULL,
  `heading` varchar(255) NOT NULL,
  `paragraph` text NOT NULL,
  `price` varchar(255) NOT NULL,
  `feature_one` varchar(255) DEFAULT NULL,
  `feature_two` varchar(255) DEFAULT NULL,
  `feature_three` varchar(255) DEFAULT NULL,
  `button_text` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `promo_product_sections`
--

INSERT INTO `promo_product_sections` (`id`, `image`, `badge`, `heading`, `paragraph`, `price`, `feature_one`, `feature_two`, `feature_three`, `button_text`, `created_at`, `updated_at`) VALUES
(1, 'promo-products/Ll7iTRcQ6fGBlV5rqj0RqG3p6l2YQij1OypKTkHT.png', 'Best Seller', 'Organic Menthol Balm', 'Experience instant cooling relief with our 100% natural menthol balm made from premium organic ingredients.', '19.99', '100% Natural', 'Fresh Menthol', '30 Day Refund', 'Shop Now', '2026-03-09 05:40:33', '2026-03-09 06:16:57');

-- --------------------------------------------------------

--
-- Table structure for table `promo_sections`
--

CREATE TABLE `promo_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `badge` varchar(255) DEFAULT NULL,
  `heading` varchar(255) NOT NULL,
  `paragraph` text NOT NULL,
  `feature_one` varchar(255) NOT NULL,
  `feature_two` varchar(255) NOT NULL,
  `customers` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `promo_sections`
--

INSERT INTO `promo_sections` (`id`, `badge`, `heading`, `paragraph`, `feature_one`, `feature_two`, `customers`, `image`, `created_at`, `updated_at`) VALUES
(1, 'PROMO', 'Limited Offer\r\nnow and get 10% off', 'Our vape shop is not only a variety of vaping products, but also an operational support service that ensures quality, reliability, and customer satisfaction.', 'Premium Quality', 'Limited Time', 'Join 5k+ happy customers', 'promo/ak6h8wmsK5FtjEFPVezgLDt79AxO8AnNUNZM6Zhj.png', '2026-03-09 05:40:33', '2026-03-09 06:18:12');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `btn_text` text NOT NULL,
  `link` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sliders`
--

INSERT INTO `sliders` (`id`, `btn_text`, `link`, `image`, `created_at`, `updated_at`) VALUES
(2, 'Shop Now', 'http://localhost:5174/product/geek-bar-15k-meta-moon', 'sliders/XZ7s3n9JACQahTxRYPoXG0g1QYCliljalzEbnPaQ.png', '2026-03-16 03:22:36', '2026-03-16 07:39:02'),
(3, 'Shop Now', 'http://localhost:5174/product/geek-bar-15k-meta-moon', 'sliders/Wphen3qK5Kest83Bm0l2Wv9eQ9hiKey0ruqyde4N.png', '2026-03-16 07:39:45', '2026-03-16 07:39:45'),
(4, 'Shop Now', 'http://localhost:5174/product/geek-bar-15k-meta-moon', 'sliders/3JGqN48sYnJG4yJ99ykKpaSMqLamoZVXJvVu2NBC.png', '2026-03-16 07:40:04', '2026-03-16 07:40:04');

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `category_id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 1, 'Geek bar', 'geek-bar', '2026-03-09 05:40:33', '2026-03-10 02:38:13'),
(2, 1, 'Foger pods', 'foger-pods', '2026-03-09 05:40:33', '2026-03-10 02:38:34'),
(3, 1, 'Foger Kits', 'foger-kits', '2026-03-09 05:40:33', '2026-03-10 02:38:45'),
(4, 1, 'Rock me', 'rock-me', '2026-03-09 05:40:33', '2026-03-10 02:38:57'),
(5, 1, 'Mega bar pro kit (rock me', 'mega-bar-pro-kit-rock-me', '2026-03-09 05:40:33', '2026-03-10 02:44:10'),
(6, 1, 'Mega bar pro pod', 'mega-bar-pro-pod', '2026-03-09 05:40:33', '2026-03-10 02:44:29'),
(9, 3, 'Game', 'game', '2026-03-09 05:40:33', '2026-03-10 04:57:25'),
(10, 2, 'Headphones', 'headphones', '2026-03-09 05:40:33', '2026-03-10 05:03:03'),
(11, 2, 'Speaker', 'speaker', '2026-03-09 05:40:33', '2026-03-10 05:20:34'),
(12, 2, 'Drone', 'drone', '2026-03-09 05:40:33', '2026-03-10 05:25:20'),
(13, 2, 'House Hold', 'house-hold', '2026-03-09 05:40:33', '2026-03-10 05:42:31'),
(14, 2, 'Car Mobile Holders', 'car-mobile-holders', '2026-03-09 05:40:33', '2026-03-09 05:40:33'),
(15, 3, 'FIFA', 'fifa', '2026-03-10 04:45:42', '2026-03-10 04:45:42');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `google_id`, `email_verified_at`, `password`, `remember_token`, `avatar`, `created_at`, `updated_at`, `role`) VALUES
(1, 'Hamza', 'hamza98.dev@gmail.com', '113288060580140063178', NULL, '$2y$12$WA/bptQWgc/WCm0p79.bS.0oK4V6h2dz.Xa.y7t2KBNF1LqL308xe', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocL-MixVqlgiGgZUGBCwlHflEYtJBDShAHuYlH-h_M_Y3mFGhPA=s96-c', '2026-03-09 05:42:08', '2026-03-09 05:42:08', 'user'),
(2, 'admin', 'admin@gmail.com', NULL, NULL, '$2y$12$prVoQo7AL43ayvDXazCe4.k2GwxAv4f1qhljvu2d7JNgEcAflPZOS', NULL, NULL, '2026-03-10 02:28:53', '2026-03-10 02:28:53', 'admin'),
(3, 'hamza', 'hamza@gmail.com', NULL, NULL, '$2y$12$XWKyO66MYYWXI0Jzb7pSxucpllDtf.logX3z7/5Cgnw6Iaf88j8BK', NULL, NULL, '2026-03-10 06:28:40', '2026-03-10 06:28:40', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_sections`
--
ALTER TABLE `about_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`);

--
-- Indexes for table `checkout_orders`
--
ALTER TABLE `checkout_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `checkout_orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_sections`
--
ALTER TABLE `contact_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `faq_sections`
--
ALTER TABLE `faq_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `flavours`
--
ALTER TABLE `flavours`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `flavours_slug_unique` (`slug`),
  ADD KEY `flavours_category_id_foreign` (`category_id`),
  ADD KEY `flavours_subcategory_id_foreign` (`subcategory_id`),
  ADD KEY `flavours_product_id_foreign` (`product_id`);

--
-- Indexes for table `footer_settings`
--
ALTER TABLE `footer_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `interactive_promos`
--
ALTER TABLE `interactive_promos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `navbar_settings`
--
ALTER TABLE `navbar_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_checkout_order_id_foreign` (`checkout_order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payment_sections`
--
ALTER TABLE `payment_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`),
  ADD KEY `products_category_id_foreign` (`category_id`),
  ADD KEY `products_sub_category_id_foreign` (`sub_category_id`);

--
-- Indexes for table `product_comments`
--
ALTER TABLE `product_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_comments_user_id_foreign` (`user_id`),
  ADD KEY `product_comments_product_id_foreign` (`product_id`);

--
-- Indexes for table `promo_features_sections`
--
ALTER TABLE `promo_features_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `promo_product_sections`
--
ALTER TABLE `promo_product_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `promo_sections`
--
ALTER TABLE `promo_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sub_categories_slug_unique` (`slug`),
  ADD KEY `sub_categories_category_id_foreign` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_google_id_unique` (`google_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_sections`
--
ALTER TABLE `about_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `checkout_orders`
--
ALTER TABLE `checkout_orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact_sections`
--
ALTER TABLE `contact_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faq_sections`
--
ALTER TABLE `faq_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `flavours`
--
ALTER TABLE `flavours`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `footer_settings`
--
ALTER TABLE `footer_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `interactive_promos`
--
ALTER TABLE `interactive_promos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `navbar_settings`
--
ALTER TABLE `navbar_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `payment_sections`
--
ALTER TABLE `payment_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `product_comments`
--
ALTER TABLE `product_comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promo_features_sections`
--
ALTER TABLE `promo_features_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `promo_product_sections`
--
ALTER TABLE `promo_product_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `promo_sections`
--
ALTER TABLE `promo_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `checkout_orders`
--
ALTER TABLE `checkout_orders`
  ADD CONSTRAINT `checkout_orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `flavours`
--
ALTER TABLE `flavours`
  ADD CONSTRAINT `flavours_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `flavours_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `flavours_subcategory_id_foreign` FOREIGN KEY (`subcategory_id`) REFERENCES `sub_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_checkout_order_id_foreign` FOREIGN KEY (`checkout_order_id`) REFERENCES `checkout_orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_sub_category_id_foreign` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_comments`
--
ALTER TABLE `product_comments`
  ADD CONSTRAINT `product_comments_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD CONSTRAINT `sub_categories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
