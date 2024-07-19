from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import sqlite3
from transformers import pipeline, Conversation, AutoModelForCausalLM, AutoTokenizer
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

# Initialize the Hugging Face question-answering pipeline
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad", tokenizer="distilbert-base-cased-distilled-squad")

# Initialize the conversational pipeline with correct pad_token_id
model_name = "microsoft/DialoGPT-small"
model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)
conversational_pipeline = pipeline("conversational", model=model, tokenizer=tokenizer, pad_token_id=tokenizer.eos_token_id)

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
    response = requests.get(url)
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

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    question = request.json.get('question')
    answer = ask_agent(question)
    return jsonify({'answer': answer})

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    conversation = Conversation(user_input)
    response = conversational_pipeline([conversation])
    ai_response = response[0].generated_responses[-1] if response[0].generated_responses else "I'm not sure how to respond to that."
    return jsonify({"response": ai_response})

if __name__ == '__main__':
    app.run(debug=True)