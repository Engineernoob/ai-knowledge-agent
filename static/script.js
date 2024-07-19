async function askQuestion() {
    const questionInput = document.getElementById('question-input').value.trim();
    if (questionInput === '') return;  // Don't send empty questions

    const response = await fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: questionInput })
    });

    const data = await response.json();
    document.getElementById('qa-response').textContent = data.answer;
}

async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput === '') return;  // Don't send empty messages
    document.getElementById('user-input').value = '';  // Clear input field

    displayMessage(userInput, 'user-message');

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        displayMessage(data.response, 'bot-message');
    } catch (error) {
        displayMessage('Error: Could not get a response', 'bot-message');
    }
}

function displayMessage(message, messageType) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.classList.add('message', messageType);
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function clearChat() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}