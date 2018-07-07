/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 5.5.53 : Database - books_books
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`zsl_books` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `zsl_books`;

/*Table structure for table `books_customer_debts` */

DROP TABLE IF EXISTS `books_customer_debts`;

CREATE TABLE `books_customer_debts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cid` int(10) unsigned NOT NULL COMMENT '欠款人id',
  `goods_id` int(10) unsigned NOT NULL COMMENT '货物id',
  `debts_money` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '欠款金额',
  `payback_money` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '还款金额',
  `happen_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '交易时间',
  `comment` varchar(250) DEFAULT NULL COMMENT '备注',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `books_customer_info` */

DROP TABLE IF EXISTS `books_customer_info`;

CREATE TABLE `books_customer_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL COMMENT '姓名',
  `phone` varchar(11) NOT NULL COMMENT '电话',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `books_goods` */

DROP TABLE IF EXISTS `books_goods`;

CREATE TABLE `books_goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `goods_name` varchar(50) NOT NULL,
  `create_time` int(11) unsigned NOT NULL,
  `update_time` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
