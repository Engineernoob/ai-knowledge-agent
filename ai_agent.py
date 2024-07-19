from transformers import pipeline
import requests
from bs4 import BeautifulSoup
import sqlite3

# Initialize the Hugging Face question-answering pipeline
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad", tokenizer="distilbert-base-cased-distilled-squad")

DATABASE = 'memory.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    return conn

def load_memory(question):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT answer FROM memory WHERE question = ?", (question,))
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else None

def save_memory(question, answer):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT OR IGNORE INTO memory (question, answer) VALUES (?, ?)", (question, answer))
    conn.commit()
    conn.close()

def search_web(query):
    url = f"https://www.google.com/search?q={query}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    result = soup.find('div', class_='BNeawe').text
    return result

def ask_agent(question):
    answer = load_memory(question)
    if answer:
        return f"Recalling...\n\n{answer}"
    else:
        print("Insufficient memory. Now learning...")
        try:
            context = search_web(question)
            answer = qa_pipeline(question=question, context=context)['answer']
            save_memory(question, answer)
            return f"Learned and saved: {answer}"
        except Exception as e:
            return f"Failed to learn: {e}"