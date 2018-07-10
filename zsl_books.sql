/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 5.5.53 : Database - zsl_books
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
  `quantity` int(3) unsigned NOT NULL DEFAULT '0' COMMENT '拿货数量',
  `unit_price` decimal(10,2) unsigned NOT NULL COMMENT '单价',
  `debts_money` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '欠款金额',
  `payback_money` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '还款金额',
  `comment` varchar(250) DEFAULT NULL COMMENT '备注',
  `img_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '图片id',
  `happen_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '交易时间',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `books_customer_debts` */

insert  into `books_customer_debts`(`id`,`cid`,`goods_id`,`quantity`,`unit_price`,`debts_money`,`payback_money`,`comment`,`img_id`,`happen_time`,`create_time`,`update_time`) values (1,1,3,0,'0.00','3425.00','0.00','梅春燕付款',0,1530979200,1531041733,1531041733),(2,2,4,0,'0.00','2100.00','0.00','放张梁银处',0,1530979200,1531041941,1531041941),(3,3,6,0,'0.00','185.00','0.00','放张梁银处',0,1530979200,1531042142,1531042142),(4,4,7,0,'0.00','1400.00','0.00','哺乳料己付款160元',0,1530979200,1531042442,1531042442),(5,5,8,0,'0.00','370.00','0.00','家中没人放猪圈',0,1530979200,1531042669,1531042669),(6,6,9,0,'0.00','160.00','0.00','',0,1530979200,1531043898,1531043898),(7,6,0,0,'0.00','0.00','160.00','己付清',0,1530979200,1531043936,1531043936),(8,7,10,0,'0.00','660.00','0.00','陈雪华车代',0,1530979200,1531046596,1531046596),(9,1,0,0,'0.00','0.00','3425.00','梅春燕手机微信转帐',0,1531065600,1531103815,1531103815),(10,8,11,0,'0.00','1500.00','0.00','',0,1531065600,1531130932,1531130932),(11,9,12,0,'0.00','355.00','0.00','给其它人送料代',0,1530979200,1531133981,1531133981),(12,9,13,0,'0.00','2880.00','0.00','',0,1531065600,1531134140,1531134140),(13,9,14,0,'0.00','150.00','0.00','老常打电话临时加料',0,1531065600,1531134288,1531134288),(14,10,15,0,'0.00','3480.00','0.00','下午4点送',0,1531065600,1531134591,1531134591);

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Data for the table `books_customer_info` */

insert  into `books_customer_info`(`id`,`name`,`phone`,`create_time`,`update_time`) values (1,'梅光吕','',1531041733,1531041733),(2,'仲文','13981291870',1531041941,1531041941),(3,'仲毅','13981254805',1531042142,1531042142),(4,'朱成富','',1531042442,1531042442),(5,'贺明富','',1531042669,1531042669),(6,'朱少礼','',1531043898,1531043898),(7,'陈子文','',1531046596,1531046596),(8,'刘永兵','15183996060',1531130932,1531130932),(9,'王俊','',1531133981,1531133981),(10,'张金容','18384554633',1531134591,1531134591);

/*Table structure for table `books_goods` */

DROP TABLE IF EXISTS `books_goods`;

CREATE TABLE `books_goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `goods_name` varchar(50) NOT NULL,
  `create_time` int(11) unsigned NOT NULL,
  `update_time` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Data for the table `books_goods` */

insert  into `books_goods`(`id`,`goods_name`,`create_time`,`update_time`) values (1,'饲料1',1530987552,1530987552),(2,'大北农852仔猪料',1531041634,1531041634),(3,'26件',1531041657,1531041657),(4,'大北农852，15件',1531041873,1531041873),(5,'希望畅能保保壮',1531042095,1531042095),(6,'1件',1531042111,1531042111),(7,'希望畅能仔猪二型10件，畅能哺乳1件',1531042382,1531042382),(8,'安佑311保育料2 ',1531042599,1531042599),(9,'哺乳料1件',1531043867,1531043867),(10,'希望畅能小猪料5件',1531046443,1531046443),(11,'安佑312，10件',1531130913,1531130913),(12,'母猪预混料14*15=210元，玉米1代*145=145',1531133906,1531133906),(13,'玉米16*145=2320元，麸皮2代*90=180元，豆粕2代*190=380元',1531134116,1531134116),(14,'910教槽料1件*150=150元',1531134239,1531134239),(15,'安佑312，10件*150=1500，大北农15件*132=1980元',1531134555,1531134555);

/*Table structure for table `books_images` */

DROP TABLE IF EXISTS `books_images`;

CREATE TABLE `books_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL COMMENT '图片地址',
  `create_time` int(11) unsigned NOT NULL,
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `books_images` */

insert  into `books_images`(`id`,`url`,`create_time`,`update_time`) values (1,'20180710\\b0b3746c5066e3f667e9fdb53321c65d.jpg',1531222769,1531222769),(2,'20180710\\84bf3ef41ebba595a1e3a8f6da4b28c3.jpg',1531222830,1531222830),(3,'20180710\\72719f24169fd6ecc1d6acacd2da3d75.png',1531222935,1531222935),(4,'20180710\\182239b510441446a8708a39345e6f57.jpg',1531223213,1531223213),(5,'20180710\\37ee9df22dd1549aef1cab6a2c8bff77.jpg',1531223302,1531223302),(6,'20180710\\1c715daa9e1ee104d52f5ce53563e48e.jpg',1531223640,1531223640),(7,'20180710\\a2d8d06b78a9edcd65918f5a20047039.jpg',1531223689,1531223689),(8,'20180710\\dc28cd47f4715ee457f3c627e4d4d1c0.jpg',1531223964,1531223964),(9,'20180710\\e0d129f9ca34498511357e226dd9cbf6.jpg',1531224421,1531224421),(10,'20180710\\b276f6937c061c0024eabb61c0c0ee47.jpg',1531224518,1531224518),(11,'20180710\\4871b51e61247a7c130083d6a6cad543.jpg',1531224567,1531224567);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
