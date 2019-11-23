-- /*
--   Datebase:freeChat
-- */

-- DROP TABLE IF EXISTS `user_info`;

-- CREATE TABLE `user_info` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `github_id` int(11) DEFAULT NULL,
--   `account` varchar(40) NOT NULL,
--   `password` varchar(40) NOT NULL,
--   `github` varchar(50) DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   UNIQUE KEY `account` (`account`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;



-- DROP TABLE IF EXISTS `user_relation`;

-- CREATE TABLE `user_relation` (
--   id int(11) NOT NULL AUTO_INCREMENT,
--   user_id int(11) NOT NULL,
--   from_user int(11) NOT NULL,
--   time int(11) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- CREATE TABLE `private_msg` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `from_user` int(11) NOT NULL,
--   `to_user` int(11) NOT NULL,
--   `message` text,
--   `time` varchar(20) NOT NULL DEFAULT '0',
--   PRIMARY KEY (`id`),
--   KEY `from_user` (`from_user`),
--   KEY `to_user` (`to_user`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8;


