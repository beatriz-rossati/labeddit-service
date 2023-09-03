CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

INSERT INTO
    users (id, name, email, password, role)
VALUES (
        'u001',
        'Larissa',
        'larissa@email.com',
        '$2a$12$BKoOaLAWZ9Eu2Y5Nna9Nwut3e5cwZSncfF6H6nDY4o.zOBNd5onFy',
        'NORMAL'
    ), (
        'u002',
        'José',
        'jose@email.com',
        '$2a$12$5d0/eznzm/11zxcG.Z9ojuK8/8prkbY5KL3U.kkmoHmg0cZYVzrXG',
        'ADMIN'
    );


CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        upvotes INTEGER DEFAULT (0) NOT NULL,
        downvotes INTEGER DEFAULT (0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

INSERT INTO
    posts (id, creator_id, content)
VALUES ('p001', 'u001', 'Bom dia!'), ('p002', 'u002', 'Boa noite!');

CREATE TABLE
    posts_rating(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        rating INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE
    );


CREATE TABLE
    comments (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        content TEXT NOT NULL,
        upvotes INTEGER DEFAULT (0) NOT NULL,
        downvotes INTEGER DEFAULT (0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
        FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

INSERT INTO comments (id, creator_id, post_id, content)
VALUES ('c001', 'u001', 'p001', 'Bom dia pra você também!');

CREATE TABLE
    comments_rating(
        user_id TEXT NOT NULL,
        comments_id TEXT NOT NULL,
        rating INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (comments_id) REFERENCES comments (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

