import sqlite3

def init_db():
    conn = sqlite3.connect('memory.db')
    cursor = conn.cursor()
    
    # Create memory table if it does not exist
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS memory (
        question TEXT PRIMARY KEY,
        answer TEXT NOT NULL
    )
    ''')
    
    # Create conversations table if it does not exist
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS conversations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        user_input TEXT NOT NULL,
        ai_response TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Database initialized successfully.")