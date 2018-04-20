CREATE TABLE Users (
	username VARCHAR(64) NOT NULL PRIMARY KEY,
    fname VARCHAR(32) NOT NULL,
    lname VARCHAR(32) NOT NULL,
    email VARCHAR(64) NOT NULL,
    pass VARCHAR(32) NOT NULL
);

CREATE TABLE Comments (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	message VARCHAR(255) NOT NULL,
	username VARCHAR(64),
	FOREIGN KEY (username) REFERENCES Users(username)
);

INSERT INTO Users
VALUES ("osdagoso","Oscar","Gonzalez","osdagoso@hotmail.com","osgo2030"),
	   ("admin","John","Doe","admin@admin.com","admin"),
	   ("thoom","Thomas","Omaley","thoom1961@jourrapide.com","thoom"),
	   ("saps","Sara","Pattick","saps1963@einrot.com","saps"),
	   ("osts","Oscar","Tunskten","osts1936@fleckens.hu","osts"),
	   ("dinvis","Daniel","Vinck","dinvis1952@teleworm.us","dinvis"),
	   ("turnot","Tobias","Notradame","turnot1972@rhyta.com","turnot");
	   
INSERT INTO Comments(message, username)
VALUES ("The most delicious burger I have ever tasted. Great service!","thoom"),
	   ("It has quality, a good price, a great taste, and it's served as you decide. What else you want?","saps"),
	   ("Excellent burgers, I want more!","osts"),
	   ("As a food taster I can only say one thing 10/10","dinvis"),
	   ("Came all the way from Notradame to taste these deicuous hamburgers. (Im now planning to live over here :) )","turnot");
	   
