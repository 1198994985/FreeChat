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


-- CREATE TABLE `group_user_relation`
-- (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `to_group_id` char(100) NOT NULL DEFAULT '',
--   `user_id` int(11) NOT NULL,
--   PRIMARY KEY(`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- CREATE TABLE `friend_relation` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `user_id` int(11) NOT NULL,
--   `from_user` int(11) NOT NULL,
--   `remark` varchar(10) DEFAULT '', -- 备注
--   `shield` tinyint(1) NOT NULL DEFAULT '0', -- 是否屏蔽
--   `time` int(11) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- CREATE TABLE `group_msg` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `from_user` int(11) NOT NULL,
--   `to_group_id` char(100) NOT NULL DEFAULT '',
--   `message` text NOT NULL,
--   `time` int(11) NOT NULL,
--   `attachments` varchar(250) DEFAULT '''[]''',
--   PRIMARY KEY (`id`),
--   KEY `to_group` (`to_group_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- CREATE TABLE `group_info` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `to_group_id` char(100) NOT NULL DEFAULT '',
--   `name` varchar(20) NOT NULL DEFAULT '',
--   `group_notice` varchar(100) NOT NULL DEFAULT '',
--   `creator_id` int(11) NOT NULL,
--   `create_time` int(11) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- CREATE TABLE `mvAndSong_info` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `theId` varchar(20) NOT NULL UNIQUE,
--   `type` char(2) NOT NULL,
--   `desc` text,
--   `authorId` varchar(30),
--   `pubilshTime` varchar(15),
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- CREATE TABLE `mvAndSong_mark_msgs` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `theId` varchar(20) NOT NULL,
--   `from_id` char(2) NOT NULL,
--   `msg` text,
--   `time` varchar(20),
--   `type` char(2) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

