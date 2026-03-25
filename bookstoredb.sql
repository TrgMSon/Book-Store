-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: book_store
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `author` varchar(45) NOT NULL,
  `publish` datetime NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `quantity` int NOT NULL,
  `url_img` text,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'Clean Code','Clean Code: A Handbook of Agile Software Craftsmanship của Robert C. Martin (Uncle Bob) là sách kinh điển về lập trình, hướng dẫn cách viết mã nguồn dễ đọc, dễ hiểu và bảo trì. Sách tập trung vào các quy tắc đặt tên, cấu trúc hàm/lớp, comment, và tái cấu trúc (refactoring) để chuyển đổi mã xấu thành mã tốt. \n\nCác điểm chính trong \"Clean Code\":\n- Đặt tên ý nghĩa: Biến, hàm, lớp cần tên rõ ràng, mô tả đúng chức năng.\n- Hàm nhỏ gọn: Hàm chỉ nên thực hiện một việc duy nhất (Single Responsibility Principle) và tốt nhất là không có tham số.\n- Comment đúng cách: Ưu tiên code tự giải thích thay vì comment. Comment chỉ nên dùng khi cần giải thích ý định hoặc cảnh báo hậu quả.\n- Tái cấu trúc (Refactoring): Liên tục làm sạch code trong quá trình phát triển, thay vì để đến cuối dự án.\n- Xử lý ngoại lệ: Sử dụng Exception thay vì trả về mã lỗi, giữ cho luồng chính sạch sẽ. ','Robert Martin','2010-01-01 00:00:00',450000,20,'/uploads/CleanCodeImg.jpg','IT'),(2,'Design Patterns','Thu thập kinh nghiệm phong phú về thiết kế phần mềm hướng đối tượng, bốn nhà thiết kế hàng đầu trình bày một danh mục các giải pháp đơn giản và ngắn gọn cho các vấn đề thiết kế thường gặp. Chưa từng được ghi chép trước đây, 23 mẫu thiết kế này cho phép các nhà thiết kế tạo ra các thiết kế linh hoạt hơn, thanh lịch hơn và cuối cùng là có thể tái sử dụng mà không cần phải tự mình tìm ra các giải pháp thiết kế.','Erich Gamma','2005-01-01 00:00:00',500000,15,'/uploads/DesignPatterns.jpg','IT'),(3,'Effective Java','Kể từ lần cập nhật cuối cùng của cuốn sách kinh điển từng đoạt giải Jolt này vào năm 2008, môi trường lập trình Java đã thay đổi đáng kể. Java 7 và Java 8 đã giới thiệu các tính năng và chức năng mới, bao gồm phương thức forEach() trong giao diện Iterable, các phương thức mặc định và tĩnh trong giao diện, giao diện chức năng và biểu thức Lambda, API Java Stream cho các thao tác dữ liệu hàng loạt trên các tập hợp, API Java Time, cải tiến API Collection, cải tiến API Concurrency và cải tiến Java IO.','Joshua Bloch','2018-01-01 00:00:00',480000,18,'/uploads/EffectiveJava.jpg','IT'),(4,'The Pragmatic Programmer','Programming philosophy','Andrew Hunt','1999-01-01 00:00:00',420000,25,'/uploads/PragmaticProgrammer.jpg','IT'),(5,'Refactoring','Improving existing code','Martin Fowler','2019-01-01 00:00:00',530000,12,'/uploads/Refactoring.jpg','IT'),(6,'Java Concurrency','Multithreading in Java','Brian Goetz','2006-01-01 00:00:00',470000,17,'/uploads/JavaConcurrency.jpg','IT'),(7,'Head First Java','Beginner Java guide','Kathy Sierra','2003-01-01 00:00:00',390000,30,'/uploads/HeadFirstJava.webp','IT'),(8,'Spring in Action','Spring framework guide','Craig Walls','2020-01-01 00:00:00',460000,14,'/uploads/SpringInAction.webp','IT'),(9,'Algorithms','Algorithms fundamentals','Robert Sedgewick','2011-01-01 00:00:00',550000,11,'/uploads/Algorithms.jpg','IT'),(10,'Database System Concepts','Database theory','Abraham Silberschatz','2013-01-01 00:00:00',600000,9,'/uploads/DatabaseSystemConcepts.jpg','IT'),(11,'Artificial Intelligence','AI fundamentals','Stuart Russell','2016-01-01 00:00:00',580000,13,'/uploads/ArtificialIntelligence.jpg','IT'),(12,'Computer Networks','Networking basics','Andrew Tanenbaum','2012-01-01 00:00:00',520000,16,'/uploads/ComputerNetworks.jpg','IT'),(13,'Operating Systems','OS concepts','Abraham Silberschatz','2018-01-01 00:00:00',540000,10,'/uploads/OperatingSystems.webp','IT'),(14,'Deep Learning','Deep learning techniques','Ian Goodfellow','2017-01-01 00:00:00',620000,8,'/uploads/DeepLearning.jpg','IT'),(15,'Machine Learning','ML introduction','Tom Mitchell','1997-01-01 00:00:00',510000,15,'/uploads/MachineLearning.jpg','IT'),(16,'Data Mining','Knowledge discovery','Jiawei Han','2011-01-01 00:00:00',495000,14,'/uploads/DataMining.jpg','IT'),(17,'Computer Graphics','Graphics fundamentals','Donald Hearn','2010-01-01 00:00:00',480000,12,'/uploads/ComputerGraphics.jpg','IT'),(18,'Software Engineering','Engineering practices','Ian Sommerville','2015-01-01 00:00:00',470000,20,'/uploads/SoftwareEngineering.jpg','IT'),(19,'Distributed Systems','Distributed computing','Andrew Tanenbaum','2017-01-01 00:00:00',530000,13,'/uploads/DistributedSystems.jpg','IT');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `fk1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (55,1,'2026-03-25 21:09:28');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_detail`
--

DROP TABLE IF EXISTS `cart_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_detail` (
  `cart_id` int NOT NULL,
  `book_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`cart_id`,`book_id`),
  KEY `book_id_idx` (`book_id`),
  CONSTRAINT `book_id` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_detail`
--

LOCK TABLES `cart_detail` WRITE;
/*!40000 ALTER TABLE `cart_detail` DISABLE KEYS */;
INSERT INTO `cart_detail` VALUES (55,1,100);
/*!40000 ALTER TABLE `cart_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `invoice_id` int NOT NULL AUTO_INCREMENT,
  `total_amount` decimal(10,0) NOT NULL,
  `created_at` datetime NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`invoice_id`),
  KEY `invoice_fk3_idx` (`user_id`),
  KEY `invoice_fk1_idx` (`user_id`),
  KEY `fk_invoice_idx` (`user_id`),
  CONSTRAINT `invoice_fk1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (21,500000,'2026-03-25 08:36:41',1),(30,1500000,'2026-03-25 09:13:47',1),(31,1450000,'2026-03-25 09:22:14',1),(32,1005000,'2026-03-25 09:23:28',1),(33,1480000,'2026-03-25 09:23:55',1),(34,900000,'2026-03-25 09:24:02',1),(36,450000,'2026-03-25 21:08:06',1);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_detail`
--

DROP TABLE IF EXISTS `invoice_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_detail` (
  `invoice_id` int NOT NULL,
  `book_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,0) NOT NULL,
  PRIMARY KEY (`invoice_id`,`book_id`),
  KEY `invoice_fk2_idx` (`book_id`),
  CONSTRAINT `invoicedetail_fk1` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`invoice_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `invoicedetail_fk2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_detail`
--

LOCK TABLES `invoice_detail` WRITE;
/*!40000 ALTER TABLE `invoice_detail` DISABLE KEYS */;
INSERT INTO `invoice_detail` VALUES (21,2,1,500000),(30,2,3,500000),(31,2,1,500000),(31,3,1,480000),(31,18,1,470000),(32,15,1,510000),(32,16,1,495000),(33,4,1,420000),(33,5,2,530000),(34,3,1,480000),(34,4,1,420000),(36,1,1,450000);
/*!40000 ALTER TABLE `invoice_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'john.smith@gmail.com','John Smith','pass123'),(2,'emma.wilson@gmail.com','Emma Wilson','pass123'),(3,'liam.johnson@gmail.com','Liam Johnson','pass123'),(4,'olivia.brown@gmail.com','Olivia Brown','pass123'),(5,'noah.jones@gmail.com','Noah Jones','pass123'),(6,'ava.garcia@gmail.com','Ava Garcia','pass123'),(7,'william.miller@gmail.com','William Miller','pass123'),(8,'sophia.davis@gmail.com','Sophia Davis','pass123'),(9,'james.rodriguez@gmail.com','James Rodriguez','pass123'),(10,'isabella.martinez@gmail.com','Isabella Martinez','pass123'),(11,'benjamin.hernandez@gmail.com','Benjamin Hernandez','pass123'),(12,'mia.lopez@gmail.com','Mia Lopez','pass123'),(13,'lucas.gonzalez@gmail.com','Lucas Gonzalez','pass123'),(14,'amelia.wilson@gmail.com','Amelia Wilson','pass123'),(15,'henry.anderson@gmail.com','Henry Anderson','pass123'),(16,'charlotte.thomas@gmail.com','Charlotte Thomas','pass123'),(17,'alexander.taylor@gmail.com','Alexander Taylor','pass123'),(18,'harper.moore@gmail.com','Harper Moore','pass123'),(19,'daniel.jackson@gmail.com','Daniel Jackson','pass123'),(20,'evelyn.martin@gmail.com','Evelyn Martin','pass123'),(21,'tms@mail.com','Trương Minh Sơn','12345');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-25 21:14:31
