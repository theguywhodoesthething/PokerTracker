-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema pokertracker
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `pokertracker` ;

-- -----------------------------------------------------
-- Schema pokertracker
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pokertracker` DEFAULT CHARACTER SET utf8 ;
USE `pokertracker` ;

-- -----------------------------------------------------
-- Table `location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `location` ;

CREATE TABLE IF NOT EXISTS `location` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(2) NULL,
  `zip` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `session`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `session` ;

CREATE TABLE IF NOT EXISTS `session` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `buy_in` DECIMAL NULL,
  `cash_out` DECIMAL NULL,
  `start_time` VARCHAR(45) NULL,
  `end_time` VARCHAR(45) NULL,
  `game` VARCHAR(45) NULL,
  `location_id` INT NULL,
  PRIMARY KEY (`id`, `location_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_session_location1_idx` (`location_id` ASC),
  CONSTRAINT `fk_session_location1`
    FOREIGN KEY (`location_id`)
    REFERENCES `location` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  `starting_stack` INT NULL,
  PRIMARY KEY (`id`, `session_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_tournament_session_idx` (`session_id` ASC),
  CONSTRAINT `fk_tournament_session`
    FOREIGN KEY (`session_id`)
    REFERENCES `session` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `note`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `note` ;

CREATE TABLE IF NOT EXISTS `note` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(255) NULL,
  `timestamp` VARCHAR(45) NULL,
  `current_stack` DECIMAL NULL,
  `session_id` INT NOT NULL,
  PRIMARY KEY (`id`, `session_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_note_session1_idx` (`session_id` ASC),
  CONSTRAINT `fk_note_session1`
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
-- Data for table `location`
-- -----------------------------------------------------
START TRANSACTION;
USE `pokertracker`;
INSERT INTO `location` (`id`, `name`, `address`, `city`, `state`, `zip`) VALUES (1, 'The Mirage', '3400 S Las Vegas Blvd', 'Las Vegas', 'NV', 89109);
INSERT INTO `location` (`id`, `name`, `address`, `city`, `state`, `zip`) VALUES (2, 'Bellagio', '3600 S Las Vegas Blvd', 'Las Vegas', 'NV', 89109);

COMMIT;


-- -----------------------------------------------------
-- Data for table `session`
-- -----------------------------------------------------
START TRANSACTION;
USE `pokertracker`;
INSERT INTO `session` (`id`, `buy_in`, `cash_out`, `start_time`, `end_time`, `game`, `location_id`) VALUES (1, 200, 303, '2017-01-09 13:23:01', '2017-01-09 20:11:01', 'Texas Hold\'em', 1);
INSERT INTO `session` (`id`, `buy_in`, `cash_out`, `start_time`, `end_time`, `game`, `location_id`) VALUES (2, 525, 0, '2017-01-13 08:03:01', '2017-01-13 15:23:01', 'Texas Hold\'em', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `tournament`
-- -----------------------------------------------------
START TRANSACTION;
USE `pokertracker`;
INSERT INTO `tournament` (`id`, `number_players`, `in_money`, `place_finished`, `session_id`, `starting_stack`) VALUES (1, 93, false, 28, 2, 11000);

COMMIT;


-- -----------------------------------------------------
-- Data for table `note`
-- -----------------------------------------------------
START TRANSACTION;
USE `pokertracker`;
INSERT INTO `note` (`id`, `text`, `timestamp`, `current_stack`, `session_id`) VALUES (1, 'Guy, bald, asian wearing a UT sweatshirt, if 3bet will 4bet any hand ', '2017-01-09 19:41:01', 350, 1);
INSERT INTO `note` (`id`, `text`, `timestamp`, `current_stack`, `session_id`) VALUES (2, 'Found a chicken bone in my pad thai. Next time order the rueben.', '2017-01-09 17:47:01', 307, 1);
INSERT INTO `note` (`id`, `text`, `timestamp`, `current_stack`, `session_id`) VALUES (3, 'Standard PFR is 5x BB.', '2017-01-13 11:07:01', 1500, 2);

COMMIT;
