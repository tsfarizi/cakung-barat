const chatToggle = document.getElementById("chat-toggle");
const chatWindow = document.getElementById("chat-window");
const chatClose = document.getElementById("chat-close");
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input");
const chatBody = document.getElementById("chat-body");

chatToggle.addEventListener("click", () => {
  chatWindow.style.display = "flex";
});

chatClose.addEventListener("click", () => {
  chatWindow.style.display = "none";
});

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  const userMsg = document.createElement("div");
  userMsg.classList.add("user-message");
  userMsg.textContent = text;
  chatBody.appendChild(userMsg);
  chatInput.value = "";

  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.classList.add("bot-message");
    botMsg.textContent = "Terima kasih atas pesan Anda!";
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 800);

  chatBody.scrollTop = chatBody.scrollHeight;
}

const searchBtn = document.getElementById("search-btn");
const searchBox = document.querySelector(".search-box");
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchBox.classList.toggle("active");
  const input = document.getElementById("search-input");
  if (searchBox.classList.contains("active")) {
    input.focus();
  } else {
    input.value = "";
  }
});

const translateBtn = document.getElementById("translate-btn");
const langSelect = document.getElementById("language-select");

translateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  langSelect.classList.toggle("active");
});


