CREATE DATABASE notes_app
USE notes_app

CREATE TABLE notes {
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    created TIMESTAMP NOT NUL DEFAULT NOW(),
};

INSERT INTO notes (title, content) VALUES ('First Note', 'This is the content of the first note'), ('Second Note', 'This is the content of the second note');
```