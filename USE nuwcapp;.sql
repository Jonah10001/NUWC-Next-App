USE nuwcapp;

-- UPDATE games
-- SET homescore = 4, awayscore = 0
-- WHERE gameid = 1001;
-- INSERT INTO players (playername, teamid) VALUES
-- ("Lionel Messi", 1001);

-- INSERT INTO teams (tournamentid, numplayers, teamname) VALUES (
--     1001, 10, "Jacksonville Jaguars"
-- )

select * from players order by playerid desc;

-- select * from games WHERE tournamentid=1001;

-- DROP USER IF EXISTS 'nuwcapp-read-only';
-- DROP USER IF EXISTS 'nuwcapp-read-write';
-- CREATE USER 'nuwcapp-read-only' IDENTIFIED BY 'abc123!!';
-- CREATE USER 'nuwcapp-read-write' IDENTIFIED BY 'def456!!';
-- GRANT SELECT, SHOW VIEW ON nuwcapp.*
-- TO 'nuwcapp-read-only';
-- GRANT SELECT, SHOW VIEW, INSERT, UPDATE, DELETE ON nuwcapp.*
-- TO 'nuwcapp-read-write';
-- FLUSH PRIVILEGES;

-- select * from tournaments;

INSERT INTO tournaments (tournamentname, tournamentdate, starttime, endtime, inprogress)
VALUES ('Test Tournament 4', '2023-11-13', '11:00:00', '16:00:00', FALSE);


-- CREATE TABLE tournaments (
--     tournamentid int not null AUTO_INCREMENT,
--     tournamentname varchar(128),
--     tournamentdate DATE,
--     starttime TIME,
--     endtime TIME,
--     flierbucketkey varchar(128),
--     inprogress boolean,
--     PRIMARY KEY (tournamentid)
-- );

-- INSERT INTO games (tournamentid, hometeam, awayteam, starttime, round, played)
-- VALUES (1001, "Chicago Bears", "Jacksonville Jaguars", '12:00:00', "Quarterfinals", FALSE);

-- CREATE TABLE games
-- (gameid int not null AUTO_INCREMENT,
-- tournamentid int not null,
-- hometeam varchar(128),
-- awayteam varchar(128),
-- homescore int,
-- awayscore int,
-- starttime time,
-- round varchar(128),
-- played boolean,
-- PRIMARY KEY (gameid),
-- FOREIGN KEY (tournamentid) REFERENCES tournaments(tournamentid)
-- );

CREATE TABLE teams (
    teamid int not null AUTO_INCREMENT,
    tournamentid int not null,
    numplayers int,
    teamname varchar(128),
    PRIMARY KEY (teamid),
    FOREIGN KEY (tournamentid) REFERENCES tournaments(tournamentid)
);

INSERT INTO teams (tournamentid, numplayers, teamname) VALUES (
    1001, 10, "Chicago Bears"
)

-- CREATE TABLE players (
--     playerid int not null AUTO_INCREMENT,
--     playername varchar(128),
--     teamid int not null,
--     PRIMARY KEY (playerid),
--     FOREIGN KEY (teamid) REFERENCES teams(teamid)
-- );

-- ALTER TABLE tournaments AUTO_INCREMENT = 1001;
-- ALTER TABLE games AUTO_INCREMENT = 1001;
-- ALTER TABLE teams AUTO_INCREMENT = 1001;
-- ALTER TABLE players AUTO_INCREMENT = 1001;


-- ALTER TABLE users AUTO_INCREMENT = 80001;
-- --
-- starting value
-- CREATE TABLE assets
-- (
-- assetid int not null AUTO_INCREMENT,
-- userid int not null,

-- Page
-- 23
-- of
-- 2
-- 5
-- assetname varchar(128) not null,
-- --
-- original name from user
-- bucketkey varchar(128) not null,
-- --
-- random, unique name in bucket
-- PRIMARY KEY (assetid),
-- FOREIGN KEY (userid) REFERENCES users(userid),
-- UNIQUE (bucketkey)
-- );
-- ALTER TABLE assets AUTO_INCREMENT = 1001;
-- --
-- starting value