-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: compras_db
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuarioId` int NOT NULL,
  `produtoId` int NOT NULL,
  `quantidade` int NOT NULL,
  `dataCompra` datetime NOT NULL,
  `precoUnitario` float NOT NULL,
  `desconto` float NOT NULL DEFAULT '0',
  `precoFinal` float NOT NULL,
  `formaPagamento` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  `statusCompra` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarioId` (`usuarioId`),
  KEY `produtoId` (`produtoId`),
  CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `compras_ibfk_2` FOREIGN KEY (`produtoId`) REFERENCES `produtos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) COLLATE utf8mb3_bin NOT NULL,
  `descricao` text COLLATE utf8mb3_bin NOT NULL,
  `categoria` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  `preco` float NOT NULL,
  `desconto` float NOT NULL DEFAULT '0',
  `estoque` int NOT NULL,
  `marca` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  `imagem` varchar(255) COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  `sobrenome` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  `idade` int NOT NULL,
  `email` varchar(100) COLLATE utf8mb3_bin NOT NULL,
  `telefone` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  `endereco` varchar(100) COLLATE utf8mb3_bin NOT NULL,
  `cidade` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  `estado` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  `nascimento` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Abigail','Rivera',28,'abigail.rivera@x.dummyjson.com','+91 228-363-7806','996 Oak Street','Chicago','New Mexico','1996-10-11 00:00:00'),(2,'Michael','Williams',35,'michael.williams@x.dummyjson.com','+49 258-627-6644','385 Fifth Street','Houston','Alabama','1989-08-10 03:00:00'),(3,'Madison','Collins',26,'madison.collins@x.dummyjson.com','+81 259-957-5711','1892 Lincoln Street','Philadelphia','New Jersey','1998-03-07 03:00:00'),(4,'Emily','Johnson',28,'emily.johnson@x.dummyjson.com','+81 965-431-3024','626 Main Street','Phoenix','Mississippi','1996-05-30 03:00:00'),(5,'Jackson','Evans',34,'jackson.evans@x.dummyjson.com','+44 468-628-6686','1873 Main Street','New York','Arkansas','1990-11-30 00:00:00'),(6,'Elijah','Stewart',33,'elijah.stewart@x.dummyjson.com','+44 468-357-7872','1701 Eighth Street','Columbus','Illinois','1991-10-22 00:00:00'),(7,'Chloe','Morales',39,'chloe.morales@x.dummyjson.com','+92 468-541-7133','401 Fourth Street','Dallas','New Jersey','1985-04-21 03:00:00'),(8,'Mateo','Nguyen',30,'mateo.nguyen@x.dummyjson.com','+1 341-597-6694','1578 Fourth Street','Columbus','Missouri','1994-06-02 03:00:00'),(9,'Sophia','Brown',42,'sophia.brown@x.dummyjson.com','+81 210-652-2785','1642 Ninth Street','Washington','Alabama','1982-11-06 03:00:00'),(10,'Harper','Kelly',27,'harper.kelly@x.dummyjson.com','+92 518-863-2863','1591 Adams Street','Philadelphia','New York','1997-03-03 03:00:00'),(11,'Evelyn','Gonzalez',35,'evelyn.gonzalez@x.dummyjson.com','+61 708-508-4638','1065 Lincoln Street','Dallas','Maine','1989-02-05 03:00:00'),(12,'Daniel','Cook',41,'daniel.cook@x.dummyjson.com','+44 254-761-6843','1163 Pine Street','Los Angeles','Nevada','1983-12-25 00:00:00'),(13,'James','Davis',45,'james.davis@x.dummyjson.com','+49 614-958-9364','238 Jefferson Street','Seattle','Pennsylvania','1979-05-04 03:00:00'),(14,'Lily','Lee',29,'lily.lee@x.dummyjson.com','+1 808-757-9867','1946 Oak Street','Phoenix','Massachusetts','1995-12-03 02:00:00'),(15,'Henry','Hill',38,'henry.hill@x.dummyjson.com','+1 240-833-4680','1837 Maple Street','Indianapolis','Delaware','1986-08-19 03:00:00'),(16,'Emma','Miller',30,'emma.miller@x.dummyjson.com','+91 759-776-1614','607 Fourth Street','Jacksonville','Colorado','1994-06-13 03:00:00'),(17,'Addison','Wright',32,'addison.wright@x.dummyjson.com','+1 514-384-3300','568 Tenth Street','San Francisco','Montana','1992-01-03 02:00:00'),(18,'Olivia','Wilson',22,'olivia.wilson@x.dummyjson.com','+91 607-295-6448','547 First Street','Fort Worth','Tennessee','2002-04-20 03:00:00'),(19,'Alexander','Jones',38,'alexander.jones@x.dummyjson.com','+61 260-824-4986','664 Maple Street','Indianapolis','Delaware','1986-10-20 00:00:00'),(20,'Ava','Taylor',27,'ava.taylor@x.dummyjson.com','+1 458-853-7877','1197 First Street','Fort Worth','Rhode Island','1997-08-25 03:00:00'),(21,'Ethan','Martinez',33,'ethan.martinez@x.dummyjson.com','+92 933-608-5081','466 Pine Street','San Antonio','Louisiana','1991-02-12 02:00:00'),(22,'Isabella','Anderson',31,'isabella.anderson@x.dummyjson.com','+49 770-658-4885','1964 Oak Street','New York','Utah','1993-06-10 03:00:00'),(23,'Liam','Garcia',29,'liam.garcia@x.dummyjson.com','+92 870-217-6201','576 Fifth Street','Denver','South Dakota','1995-06-06 03:00:00'),(24,'Mia','Rodriguez',24,'mia.rodriguez@x.dummyjson.com','+49 989-461-8403','1627 Sixth Street','Jacksonville','West Virginia','2000-08-04 03:00:00'),(25,'Noah','Hernandez',40,'noah.hernandez@x.dummyjson.com','+49 393-605-6968','1413 Maple Street','New York','North Dakota','1984-06-05 03:00:00'),(26,'Charlotte','Lopez',36,'charlotte.lopez@x.dummyjson.com','+44 373-953-5028','208 Second Street','Columbus','Ohio','1988-06-08 03:00:00'),(27,'William','Gonzalez',32,'william.gonzalez@x.dummyjson.com','+81 905-252-7319','31 Maple Street','San Jose','Utah','1992-03-27 03:00:00'),(28,'Avery','Perez',25,'avery.perez@x.dummyjson.com','+61 731-431-3457','1125 First Street','Columbus','Iowa','1999-03-10 03:00:00'),(29,'Evelyn','Sanchez',37,'evelyn.sanchez@x.dummyjson.com','+1 623-880-6871','1170 Lincoln Street','San Diego','Wyoming','1987-10-13 00:00:00'),(30,'Logan','Torres',31,'logan.torres@x.dummyjson.com','+81 507-434-8733','907 Seventh Street','Columbus','Arkansas','1993-10-26 00:00:00');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-11  9:53:04
