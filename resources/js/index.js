const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`;

  if (myNameInput === message.sender) {
    return `
      <div class="mine messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${formattedTime}
        </div>
      </div>
    `;
  } else {
    return `
      <div class="yours messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${message.sender} ${formattedTime}
        </div>
      </div>
    `;
  }
}

const serverURL = `https://it3049c-chat.fly.dev/messages`;

function fetchMessages() {
    return fetch(serverURL)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching messages:', error);
            return [];
        });
}

async function updateMessages() {
    try {
        const messages = await fetchMessages();
        messages.forEach(message => {
            const formattedMessage = formatMessage(message, nameInput.value);
            chatBox.insertAdjacentHTML('beforeend', formattedMessage);
        });
    } catch (error) {
        console.error('Error updating messages:', error);
    }
}

updateMessages();

const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);

function sendMessages(username, text) {
    const newMessage = {
        sender: username,
        text: text,
        timestamp: new Date().toISOString()
    };

    fetch(serverURL, {
        method: `POST`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMessage)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send message');
        }
        console.log('Message sent successfully');
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });
}

sendButton.addEventListener("click", function(sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const messageText = myMessage.value;

  const newMessage = {
    id: Math.floor(Math.random() * 1000),
    text: messageText,
    sender: sender,
    timestamp: Date.now()
  };

  chatBox.innerHTML += formatMessage(newMessage, sender);
  myMessage.value = "";
});
