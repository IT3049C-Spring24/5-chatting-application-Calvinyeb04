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

function fetchMessages() {
  return [
    {
      id: 1,
      text: "This is my message",
      sender: "Yahya Gilany",
      timestamp: 1537410673072
    },
    {
      id: 2,
      text: "This is another message",
      sender: "Yahya Gilany",
      timestamp: 1537410673072
    },
    {
      id: 3,
      text: "This is a message from someone else",
      sender: "Someone Else",
      timestamp: 1537410673072
    }
  ];
}

function updateMessages() {
  const messages = fetchMessages();
  let formattedMessages = "";
  messages.forEach(message => {
      formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
}

// Call updateMessages() to initially load messages
updateMessages();

sendButton.addEventListener("click", function(sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const messageText = myMessage.value;

  const newMessage = {
    id: Math.floor(Math.random() * 1000), // Generating a random ID for the new message
    text: messageText,
    sender: sender,
    timestamp: Date.now() // Using current timestamp
  };

  chatBox.innerHTML += formatMessage(newMessage, sender);

  // Clear the message input field
  myMessage.value = "";
});
