PRAGMA foreign_keys = OFF;

BEGIN;

INSERT INTO user VALUES 
    (1, 'alex'),
    (2, 'abby'),
    (3, 'manoela'),
    (4, 'suraj')
ON CONFLICT DO NOTHING;

INSERT INTO music VALUES
    -- Alex
    (1, 1, 'Electronic', 'disclosure', 'Latch', 5),

    -- Abby
    (2, 2, 'Rock', 'Nirvana', 'Come as you are', 5),

    -- Manoela
    (3, 3, 'RnB', 'John Legend', 'All of me', 5),

    -- Suraj
    (4, 4, 'Indie', 'Bon Iver', 'Stacks', 5)
ON CONFLICT DO NOTHING;

COMMIT;

PRAGMA foreign_keys = ON;
