-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `session`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `session` ;

CREATE TABLE IF NOT EXISTS `session` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `buy_in` DECIMAL NULL,
  `cash_out` DECIMAL NULL,
  `start_time` DATETIME NULL,
  `end_time` DATETIME NULL,
  `game` VARCHAR(45) NULL,
  `location` VARCHAR(45) NULL,
  `notes` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tournament`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tournament` ;

CREATE TABLE IF NOT EXISTS `tournament` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `number_players` INT NULL,
  `in_money` TINYINT(1) NULL,
  `place_finished` INT NULL,
  `session_id` INT NOT NULL,
  PRIMARY KEY (`id`, `session_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_tournament_session_idx` (`session_id` ASC),
  CONSTRAINT `fk_tournament_session`
    FOREIGN KEY (`session_id`)
    REFERENCES `session` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO student@localhost;
 DROP USER student@localhost;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'student'@'localhost' IDENTIFIED BY '@AvGm3X6.mE7Wx?e';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'student'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `session`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `session` (`id`, `buy_in`, `cash_out`, `start_time`, `end_time`, `game`, `location`, `notes`) VALUES (1, 200, 303, '\'2017-01-09 13:23:01\'', '\'2017-01-09 20:11:01\'', 'Texas Hold\'em', 'The Mirage', 'bink');
INSERT INTO `session` (`id`, `buy_in`, `cash_out`, `start_time`, `end_time`, `game`, `location`, `notes`) VALUES (2, 525, 0, '\'2017-01-13 08:03:01\'', '\'2017-01-13 15:23:01\'', 'Texas Hold\'em', 'Caeser\'s Palace', 'donkey cracked AA to bust me');

COMMIT;


-- -----------------------------------------------------
-- Data for table `tournament`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `tournament` (`id`, `number_players`, `in_money`, `place_finished`, `session_id`) VALUES (1, 93, false, 28, 2);

COMMIT;
