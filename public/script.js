//read more
document.addEventListener('DOMContentLoaded', function () {
  const viewMapBtn = document.getElementById('view-map-btn');

  viewMapBtn.addEventListener('click', function () {
    document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const viewMapBtn = document.getElementById('highlights-btn');

  viewMapBtn.addEventListener('click', function () {
    document.getElementById('highlights').scrollIntoView({ behavior: 'smooth' });
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const readMoreBtn = document.getElementById('read-more-btn');
  const moreContent = document.getElementById('more-content');

  readMoreBtn.addEventListener('click', function () {
    if (moreContent.classList.contains('expanded')) {
      moreContent.classList.remove('expanded');
      readMoreBtn.textContent = 'Read More';
    } else {
      moreContent.classList.add('expanded');
      readMoreBtn.textContent = 'Read Less';
    }
  });
});



const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});

// about container
ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "left",
});

ScrollReveal().reveal(".about__content .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about__content .section__header", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".about__content .section__description", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".about__btn", {
  ...scrollRevealOption,
  delay: 2000,
});

// event container
ScrollReveal().reveal(".event__card", {
  ...scrollRevealOption,
  interval: 500,
});

// highlight container
ScrollReveal().reveal(".highlight__list li", {
  ...scrollRevealOption,
  interval: 500,
  origin: "right",
});

//form validation

document.getElementById('contact-form').addEventListener('submit', function (event) {
  // Get form elements
  const name = document.getElementById('first-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('description').value.trim();

  // Basic validation
  if (name.length < 3) {
    alert('Name must be at least 3 characters long.');
    event.preventDefault(); // Prevent form submission
    return;
  }

  if (!email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
    alert('Please enter a valid email address.');
    event.preventDefault(); // Prevent form submission
    return;
  }

  if (message.length < 7) {
    alert('Message must be at least 10 characters long.');
    event.preventDefault(); // Prevent form submission
    return;
  }

});



//form handling

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch('https://shree-ramalingeshwara-swamy-temple.onrender.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          alert('Email sent successfully!');
          form.reset();

        } else {
          alert('Failed to send email.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while sending the email.');
      });
  });
});

//chatbot functions

document.addEventListener('DOMContentLoaded', function () {
  const chatbotBtn = document.getElementById('chatbot-btn');
  const chatboxContainer = document.getElementById('chatbox-container');
  const chatboxClose = document.getElementById('chatbox-close');
  const chatboxContent = document.getElementById('chatbox-content');
  const chatboxInput = document.getElementById('chatbox-input');
  const chatboxSend = document.getElementById('chatbox-send');
  const micBtn = document.getElementById('chatbox-mic');

  const responses = {
    "hello": { display: "🙏 Namaste! What would you like to know about the temple?", speak: "Namaste! What would you like to know about the temple" },
    "temple": { display: "🛕 The name of the temple is Shree Ramalingeswara Swamy Temple. The Ramalingeshwara Swamy Temple is a 300-year-old sanctuary of devotion with rich heritage and a peaceful environment. To know more visit the about section.", speak: "The name of the temple is Shree Ramalingeswara Swamy Temple The Ramalingeshwara Temple is a 300-year-old sanctuary of devotion with rich heritage and a peaceful environment. To know more visit the about section" },

    "location": { display: "📍 The temple is located in Ramalingapuram, Tamil Nadu. View full address and map location in the contact section.", speak: "The temple is located in Ramalingapuram, Tamil Nadu. View full address and map location in the contact section" },
    "timings": { display: "⏰ The temple is open from 6 AM to 12 PM and 4 PM to 7 PM daily.", speak: "The temple is open from 6 AM to 12 PM and 4 PM to 7 PM daily" },
    "dhyana": { display: "🧘 The temple's peaceful atmosphere amidst nature and a pond makes it a perfect place for dhyana and meditation.", speak: "The temple's peaceful atmosphere amidst nature and a pond makes it a perfect place for dhyana and meditation" },
    "meditation": { display: "🧘 The serene environment of the temple is ideal for meditation and finding inner peace.", speak: "The serene environment of the temple is ideal for meditation and finding inner peace" },
    "god": {
      "display": "🌟 Shree Ramalingeshwara Swamy is the revered deity of the temple, embodying divine strength and wisdom.Alongside him, we honor Sri Parvathi Devi, the embodiment of grace and nurturing. Together, they bless our sanctuary with their sacred presence, guiding and uplifting the spiritual journey of all who visit.",
      "speak": "At the heart of our temple's devotion is Shree Ramalingeshwara Swamy, revered for his divine strength and wisdom. Alongside him, we honor Sri Parvathi Devi, the embodiment of grace and nurturing. Together, they bless our sanctuary with their sacred presence, guiding and uplifting the spiritual journey of all who visit."
    },
    "services": { display: "🪔 The temple offers various services including daily poojas, special rituals, and community events.", speak: "The temple offers various services including daily poojas, special rituals, and community events" },
    "events": { display: "🎉 We celebrate special Hindu occasions dedicated to Lord Shiva. Check out our past events section.", speak: "We celebrate special Hindu occasions dedicated to Lord Shiva. Check out our past events section" },
    "bye": { display: "👋 Goodbye! Have a great day!", speak: "Goodbye! Have a great day" },
    "default": { display: "🙏 I'm sorry, I didn't understand that. Please contact our team for further details. You can find the contact details at the contact section.", speak: "I'm sorry, I didn't understand that. Please contact our team for further details. You can find the contact details at the contact section" }
  };

  let fromVoice = false; // Flag to track if the message came from voice input



  chatbotBtn.addEventListener('click', function () {
    chatboxContainer.classList.add('active');
    appendMessage('bot', "🙏 Namaste! What would you like to know about the temple?");
  });



  chatboxClose.addEventListener('click', function () {
    chatboxContainer.classList.remove('active');
  });

  chatboxSend.addEventListener('click', sendMessage);
  chatboxInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  micBtn.addEventListener('click', startVoiceRecognition);
  micButton.addEventListener('touchstart', startVoiceRecognition);

  function sendMessage() {
    const userMessage = chatboxInput.value.trim();
    if (userMessage === '') return;

    appendMessage('user', userMessage);
    chatboxInput.value = '';

    const botResponse = getResponse(userMessage.toLowerCase());
    setTimeout(() => {
      appendMessage('bot', botResponse.display);
      if (fromVoice) {
        speakResponse(botResponse.speak); // Only speak the response if the input was from voice
        fromVoice = false; // Reset the flag after speaking
      }
    }, 500); // Add a slight delay to mimic real response time
  }

  function appendMessage(sender, message) {
    const messageElem = document.createElement('div');
    messageElem.className = sender === 'user' ? 'user-message' : 'bot-message';

    const icon = document.createElement('i');
    icon.className = sender === 'user' ? 'ri-user-line message-icon' : 'ri-robot-line message-icon';

    const text = document.createElement('span');
    text.textContent = message;

    messageElem.appendChild(icon);
    messageElem.appendChild(text);

    chatboxContent.appendChild(messageElem);
    chatboxContent.scrollTop = chatboxContent.scrollHeight;
  }

  function getResponse(message) {

    if (message.includes('location') || message.includes('reach') || message.includes('reaches') || message.includes('where') || message.includes('location of temple') || message.includes('address')) return responses['location'];
    if (message.includes('hours') || message.includes('time') || message.includes('timing')) return responses['timings'];
    if (message.includes('dhyana') || message.includes('spiritual practice') || message.includes('inner peace') || message.includes('mindfulness')) return responses['dhyana'];
    if (message.includes('meditation') || message.includes('meditative state') || message.includes('concentration') || message.includes('mental peace')) return responses['meditation'];
    if (message.includes('main god') || message.includes('main goddess') || message.includes('god') || message.includes('goddess')) return responses['god'];
    if (message.includes('services') || message.includes('poojas') || message.includes('special') || message.includes('daily practices')) return responses['services'];
    if (message.includes('events') || message.includes('functions') || message.includes('past')) return responses['events'];
    if (message.includes('about the temple') || message.includes('temple') || message.includes('name') || message.includes('details') || message.includes('history')) return responses['temple'];
    if (message.includes('hello') || message.includes('hi')) return responses['hello'];
    if (message.includes('bye')) return responses['bye'];
    return responses['default'];
  }

  function startVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
  const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      chatboxInput.value = transcript;
      fromVoice = true; // Set the flag to true when the input is from voice
      sendMessage();
    };

    recognition.onerror = function (event) {
      console.error('Voice recognition error:', event.error);
    };

    recognition.start();
  }

  function speakResponse(response) {
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }
});
