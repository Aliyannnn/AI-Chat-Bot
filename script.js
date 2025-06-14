async function sendMessage() {
const input = document.getElementById('userInput');
const chatArea = document.getElementById('chatArea');
const text = input.value.trim();
if (!text) return;

const userBubble = document.createElement('div');
userBubble.className = 'message user-msg';
userBubble.textContent = text;
chatArea.appendChild(userBubble);
input.value = '';
scrollToBottom();

const loadingBubble = document.createElement('div');
loadingBubble.className = 'message bot-msg';
loadingBubble.textContent = 'Typing...';
chatArea.appendChild(loadingBubble);
scrollToBottom();

try {
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
method: 'POST',
headers: {
Authorization: 'Bearer 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',
'HTTP-Referer': 'https://www.sitename.com',
'X-Title': 'Aliyan-Chat-Bot',
'Content-Type': 'application/json',
},
body: JSON.stringify({
model: 'deepseek/deepseek-r1:free',
messages: [{ role: 'user', content: text }],
}),
});

const data = await response.json();
const reply = data.choices?.[0]?.message?.content || 'No response.';

loadingBubble.innerHTML = marked.parse(reply);
} catch (err) {
loadingBubble.textContent = 'Error: ' + err.message;
}
scrollToBottom();
}

function scrollToBottom() {
const chatArea = document.getElementById('chatArea');
chatArea.scrollTop = chatArea.scrollHeight;
}

document.getElementById('themeToggle').addEventListener('click', () => {
const body = document.body;
body.classList.toggle('dark');
body.classList.toggle('light');
});

document.getElementById('userInput').addEventListener('keypress', (e) => {
if (e.key === 'Enter') {
sendMessage();
}
});