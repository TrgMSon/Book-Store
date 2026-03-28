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
-- Vietnamese literature book
INSERT INTO `book` VALUES
(20,'Chiếc thuyền ngoài xa','Chiếc thuyền ngoài xa là truyện ngắn tiêu biểu của Nguyễn Minh Châu, sáng tác năm 1983. Tác phẩm kể về chuyến đi thực tế của nghệ sĩ nhiếp ảnh Phùng và từ đó phát hiện mối quan hệ phức tạp giữa nghệ thuật, cuộc sống và số phận con người. Tác phẩm thể hiện chiều sâu nhân đạo và tinh thần đổi mới trong văn học Việt Nam sau 1975.','Nguyễn Minh Châu','1983-01-01 00:00:00',115000,20,'/uploads/chiecthuyenngoaxa.jpg','Vietnamese literature'),

(21,'Chinh phụ ngâm khúc','Chinh phụ ngâm khúc là tác phẩm ngâm khúc nổi tiếng của Đặng Trần Côn, ra đời khoảng năm 1741. Tác phẩm diễn tả nỗi cô đơn, sầu muộn và khát vọng đoàn tụ của người chinh phụ khi chồng ra trận. Đây là một trong những đỉnh cao của văn học trung đại Việt Nam với giá trị nhân văn và nghệ thuật sâu sắc.','Đặng Trần Côn','1741-01-01 00:00:00',125000,18,'/uploads/chinhphungamkhuc.jpg','Vietnamese literature'),

(22,'Chí Phèo','Chí Phèo là truyện ngắn nổi tiếng của Nam Cao, viết vào năm 1941. Tác phẩm khắc họa bi kịch của người nông dân lương thiện bị xã hội thực dân phong kiến đẩy vào con đường tha hóa. Qua nhân vật Chí Phèo, nhà văn tố cáo xã hội tàn bạo và khẳng định khát vọng được làm người lương thiện của con người.','Nam Cao','1941-01-01 00:00:00',98000,25,'/uploads/chipheo.jpg','Vietnamese literature'),

(23,'Lão Hạc','Lão Hạc là truyện ngắn xuất sắc của Nam Cao, sáng tác năm 1943. Tác phẩm kể về số phận đau khổ của một lão nông nghèo, giàu lòng tự trọng và thương con. Qua đó, nhà văn thể hiện giá trị hiện thực sâu sắc và lòng cảm thương chân thành đối với người nông dân trước Cách mạng tháng Tám.','Nam Cao','1943-01-01 00:00:00',95000,22,'/uploads/laohac.jpg','Vietnamese literature'),

(24,'Lục Vân Tiên','Lục Vân Tiên là truyện thơ Nôm nổi tiếng của Nguyễn Đình Chiểu, được sáng tác vào đầu những năm 1850. Tác phẩm ca ngợi đạo lý làm người, tinh thần nghĩa hiệp, trung hiếu tiết nghĩa và lòng yêu công lý. Đây là một tác phẩm có ảnh hưởng lớn trong đời sống văn hóa Nam Bộ và văn học dân tộc.','Nguyễn Đình Chiểu','1850-01-01 00:00:00',135000,16,'/uploads/lucvantien.jpg','Vietnamese literature'),

(25,'Rừng xà nu','Rừng xà nu là truyện ngắn tiêu biểu của Nguyễn Trung Thành (Nguyên Ngọc), được viết năm 1965. Tác phẩm khắc họa cuộc sống và tinh thần đấu tranh bất khuất của dân làng Xô Man trong kháng chiến chống Mỹ. Hình tượng rừng xà nu trở thành biểu tượng cho sức sống mãnh liệt và tinh thần cách mạng của con người Tây Nguyên.','Nguyễn Trung Thành','1965-01-01 00:00:00',110000,19,'/uploads/rungxanu.jpg','Vietnamese literature'),

(26,'Số đỏ','Số đỏ là tiểu thuyết trào phúng nổi tiếng của Vũ Trọng Phụng, đăng báo năm 1936 và in sách lần đầu năm 1938. Tác phẩm xây dựng hình tượng Xuân Tóc Đỏ để châm biếm sâu cay xã hội thị dân nửa Tây nửa ta đương thời. Đây là kiệt tác của văn học hiện thực phê phán Việt Nam trước 1945.','Vũ Trọng Phụng','1938-01-01 00:00:00',128000,21,'/uploads/sodo.webp','Vietnamese literature'),

(27,'Tắt đèn','Tắt đèn là tiểu thuyết nổi bật của Ngô Tất Tố, in trên báo năm 1937. Tác phẩm phản ánh chân thực cuộc sống cơ cực, bế tắc của người nông dân Việt Nam dưới ách sưu thuế và áp bức của chế độ thực dân phong kiến. Nhân vật chị Dậu trở thành hình tượng tiêu biểu cho sức sống và sự phản kháng của người phụ nữ nông dân.','Ngô Tất Tố','1937-01-01 00:00:00',120000,20,'/uploads/tatden.jpg','Vietnamese literature'),

(28,'Truyện Kiều','Truyện Kiều, tên gốc là Đoạn trường tân thanh, là kiệt tác của Nguyễn Du, được sáng tác vào khoảng đầu thế kỷ XIX. Tác phẩm gồm 3254 câu thơ lục bát, kể về cuộc đời truân chuyên của Thúy Kiều và phản ánh sâu sắc hiện thực xã hội cùng giá trị nhân đạo lớn lao. Đây là đỉnh cao của văn học cổ điển Việt Nam.','Nguyễn Du','1805-01-01 00:00:00',150000,15,'/uploads/truyenkieu.jpg','Vietnamese literature'),

(29,'Vợ chồng A Phủ','Vợ chồng A Phủ là truyện ngắn nổi tiếng của Tô Hoài, sáng tác năm 1952 và in trong tập Truyện Tây Bắc. Tác phẩm phản ánh số phận đau khổ của người lao động miền núi dưới ách thống trị phong kiến, đồng thời ca ngợi sức sống tiềm tàng và khát vọng tự do của con người. Nhân vật Mị và A Phủ là những hình tượng tiêu biểu của văn học cách mạng Việt Nam.','Tô Hoài','1952-01-01 00:00:00',118000,18,'/uploads/vochongaphu.jpeg','Vietnamese literature'),

(30,'Vợ nhặt','Vợ nhặt là truyện ngắn đặc sắc của Kim Lân, in trong tập Con chó xấu xí năm 1962, phát triển từ cốt truyện Xóm ngụ cư viết sau Cách mạng tháng Tám. Tác phẩm lấy bối cảnh nạn đói năm 1945 để làm nổi bật tình người, khát vọng sống và niềm tin của những con người nghèo khổ giữa hoàn cảnh thê thảm. Đây là một trong những truyện ngắn xuất sắc nhất của văn học Việt Nam hiện đại.','Kim Lân','1962-01-01 00:00:00',105000,24,'/uploads/vonhat.webp','Vietnamese literature'),

(31,'Những ngày thơ ấu','Những ngày thơ ấu là tập hồi ký nổi tiếng của Nguyên Hồng, được giới thiệu từ năm 1938. Tác phẩm ghi lại tuổi thơ cay đắng, thiếu thốn tình thương nhưng giàu cảm xúc của nhân vật bé Hồng. Với giọng văn chân thật, xúc động và giàu chất trữ tình, đây là một tác phẩm tiêu biểu của văn xuôi tự truyện Việt Nam hiện đại.','Nguyên Hồng','1938-01-01 00:00:00',108000,17,'/uploads/nhungngaythoau.jpg','Vietnamese literature');
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
