/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50562
Source Host           : localhost:3306
Source Database       : track

Target Server Type    : MYSQL
Target Server Version : 50562
File Encoding         : 65001

Date: 2020-10-27 11:02:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for track
-- ----------------------------
DROP TABLE IF EXISTS `track`;
CREATE TABLE `track` (
  `trackId` int(11) NOT NULL AUTO_INCREMENT,
  `appId` int(11) NOT NULL,
  `userId` varchar(11) NOT NULL,
  `apiVersion` int(11) NOT NULL,
  `appVersion` int(11) NOT NULL,
  `currentUrl` varchar(50) DEFAULT NULL,
  `ua` varchar(50) DEFAULT NULL,
  `type` varchar(11) DEFAULT NULL,
  `os` varchar(11) DEFAULT NULL,
  `mainType` varchar(11) DEFAULT NULL,
  `pageHeight` int(11) DEFAULT NULL,
  `pageWidth` int(11) DEFAULT NULL,
  `screenHeight` int(11) DEFAULT NULL,
  `screenWidth` int(11) DEFAULT NULL,
  `refererUrl` varchar(50) DEFAULT NULL,
  `timeStamp` varchar(50) DEFAULT NULL,
  `trackType` varchar(11) DEFAULT NULL,
  `trackTarget` varchar(50) DEFAULT NULL,
  `trackContent` varchar(255) DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `method` varchar(11) DEFAULT NULL,
  `init` varchar(255) DEFAULT NULL,
  `input` varchar(255) DEFAULT NULL,
  `requestType` varchar(255) DEFAULT NULL,
  `routeData` varchar(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `routeType` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`trackId`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;
