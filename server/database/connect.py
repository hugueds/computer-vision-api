import sqlite3

database = 'cv_service.db'

print('Initializing SQLite database... ' + database)

conn = sqlite3.connect(database)

cursor = conn.cursor()

cursor.execute("""

    CREATE TABLE IF NOT EXISTS Log (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        user VARCHAR(6),
        result VARCHAR(30),
        probability: REAL,
        filePath: TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );

""")

cursor.execute("""

    CREATE TABLE IF NOT EXISTS MLModel (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(30) NOT NULL,
        file VARCHAR(30),
        size INTEGER,
        channels INTEGER,
        labels TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

""")

print('Tables Created')


conn.close()
