import sqlite3
import logging

def create(cursor):  
    
    cursor.execute("""

        CREATE TABLE IF NOT EXISTS Result (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            user VARCHAR(6),
            device VARCHAR(30),
            instance VARCHAR(30),
            label VARCHAR(30),
            confidence REAL,
            path TEXT,
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

    cursor.execute("""

        CREATE TABLE IF NOT EXISTS Instance (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(30),
            description VARCHAR(50),        
            type INTEGER,
            identifier_mode INTEGER,
            save INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            server_model INTEGER,
            client_model INTEGER
        );

    """)

    cursor.execute("""

        CREATE TABLE IF NOT EXISTS Device (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(20),
            user VARCHAR(6),
            ip VARCHAR(15),
            model INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            instance_id INTEGER,
            FOREIGN KEY(instance_id) REFERENCES Instance(id)
        );

    """)

    logging.info('Tables Created')
    

def insert_default(connection):
    cursor = connection.cursor()
    cursor.execute("""
        INSERT INTO INSTANCE (id,name,description,type,identifier_mode,save,server_model,client_model)
        VALUES (1, 'default', 'default instance', 0, 0, 1, 1, 1)
    """)
    
    logging.info('Default Instance created')    

if __name__ == '__main__':
    database = '_cv_service.db'
    connection = sqlite3.connect(database)
    create(connection)
    insert_default(connection)
    connection.commit()
    connection.close()