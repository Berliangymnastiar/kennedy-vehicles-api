-- Adminer 4.8.1 MySQL 5.7.33 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

INSERT INTO `categories` (`id`, `name`) VALUES
(1,	'Cars'),
(2,	'Bikes'),
(3,	'Motorbike');

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vehicle_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `date` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

INSERT INTO `transactions` (`id`, `vehicle_id`, `user_id`, `rating`, `date`) VALUES
(4,	9,	3,	9,	'2021-08-07 06:36:23'),
(5,	3,	2,	7,	'2021-08-07 06:57:06'),
(6,	11,	4,	8,	'2021-08-07 07:28:33'),
(7,	12,	5,	6,	'2021-08-07 07:28:51');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phonenumber`, `address`, `gender`, `picture`) VALUES
(2,	'Ardhi Muhammad',	'ardhi@gmail.com',	'$2b$10$nq/1qRyS7zNFbriYJLvydejXVY8TCm0irAKfE0NJV2LRTZxvmSUk2',	'02193849203',	'Bandung',	'male',	'http://localhost:8000/images/1628749965922-picture.png'),
(3,	'Salma',	'salma@gmail.com',	'$2b$10$UFGwwinGjoghPJqofTcOlOxP42XFLnlgawXvmNSClvtERmiT/PxPa',	'08392039201',	'DIY',	'female',	'http://localhost:8000/images/1628385807646-picture.jpg'),
(4,	'Rahmat',	'rahmat@gmail.com',	'$2b$10$sdrlyXPi/1W10QXoQYCiGez7YPKcCWItvemK7ZXx1FPSteoBOk13q',	'08923849021102',	'Medan',	'male',	'https://i1.wp.com/kinvoapp.com/wp-content/uploads/2019/10/PeopleImages.com-ID1329069.jpg?ssl=1'),
(5,	'Adit',	'adit@gmail.com',	'$2b$10$VOTi4e/8kO359PitQpVTG.VER44exThdDjNKVaNIfazC764dLdmt.',	'089238490111',	'NTT',	'male',	'adit.jpg'),
(6,	'Ridho',	'ridho@gmail.com',	'$2b$10$iEv3R8NlOc5f4QQ.Bwd5iu.xF7IJQVhumVETpwxMNnBFROsksHW12',	'021938492031',	'Palembang',	'male',	'ridho.jpg'),
(7,	'Risa',	'risa@gmail.com',	'$2b$10$3WpzkQSY0Qg7GlZAaktBo.TEqba4ZUojBN6x.ZTMVvnRo.SubGqwa',	'08923849078',	'Jakarta',	'female',	'risa.jpg'),
(9,	'Berlian',	'berlian@gmail.com',	'$2b$10$qopNgQRVBmS5dI1HVKAH1OyuQAANBtHRu.NcB4SWqhr4xEiS6iLfa',	'085819023',	'DKI Jakarta',	'male',	NULL),
(10,	'Arya',	'arya@gmail.com',	'$2b$10$JQsPVJsaWMD8Jyv69UUVeexTLbFE8FaLGFNAccjM8aMgyvesAlTX6',	NULL,	NULL,	NULL,	NULL),
(11,	'Budi',	'budi@gmail.com',	'$2b$10$UeGqhsCUWdyMrdRJaBe8buMD448B5mHnmsFHBMWovRXtw1RfzqDK.',	NULL,	NULL,	NULL,	NULL);

DROP TABLE IF EXISTS `vehicles`;
CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

INSERT INTO `vehicles` (`id`, `name`, `price`, `picture`, `location`, `category_id`) VALUES
(3,	'Harley-davidson',	1000000,	'http://localhost:8000/images/1628305308178-picture.png',	'DIY',	3),
(9,	'vespa',	700000,	'http://localhost:8000/images/1628750760718-picture.png',	'Toba',	3),
(11,	'Mountain Bike',	150000,	'https://images.singletracks.com/blog/wp-content/uploads/2017/04/Outerbike-Moab-18.jpg',	'Bekasi',	2),
(12,	'fixie',	70000,	'fixie.jpg',	'Jakarta',	2);

-- 2021-08-12 15:42:45
