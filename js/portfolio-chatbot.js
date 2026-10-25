(function () {
  'use strict';

  var launcher = document.createElement('button');
  launcher.className = 'portfolio-chat-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-haspopup', 'dialog');
  launcher.setAttribute('aria-expanded', 'false');
  launcher.setAttribute('aria-controls', 'portfolio-chat-panel');
  launcher.innerHTML = '<span class="portfolio-chat-launcher__icon" aria-hidden="true">✦</span><span>Ask about my work</span>';

  var panel = document.createElement('section');
  panel.className = 'portfolio-chat-panel';
  panel.id = 'portfolio-chat-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'false');
  panel.setAttribute('aria-labelledby', 'portfolio-chat-title');
  panel.hidden = true;
  panel.innerHTML = [
    '<div class="portfolio-chat-header">',
      '<div class="portfolio-chat-brand"><span class="portfolio-chat-avatar" aria-hidden="true">T</span>',
        '<div><h2 class="portfolio-chat-title" id="portfolio-chat-title">Portfolio assistant</h2><span class="portfolio-chat-status">Quick answers about Tabish’s work</span></div>',
      '</div>',
      '<button class="portfolio-chat-close" type="button" aria-label="Close chat">×</button>',
    '</div>',
    '<div class="portfolio-chat-messages" id="portfolio-chat-messages" aria-live="polite" aria-relevant="additions"></div>',
    '<form class="portfolio-chat-form" id="portfolio-chat-form">',
      '<label class="sr-only" for="portfolio-chat-input">Ask a question about the portfolio</label>',
      '<input class="portfolio-chat-input" id="portfolio-chat-input" type="text" maxlength="240" placeholder="Ask about projects, skills…" autocomplete="off" required>',
      '<button class="portfolio-chat-send" type="submit" aria-label="Send message">↑</button>',
    '</form>',
    '<p class="portfolio-chat-note">Preset answers only · No messages are sent or stored.</p>'
  ].join('');

  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  var messages = panel.querySelector('#portfolio-chat-messages');
  var input = panel.querySelector('#portfolio-chat-input');
  var suggestions = [
    { label: 'Show me the projects', query: 'What projects has Tabish built?' },
    { label: 'What skills does he have?', query: 'What skills does Tabish have?' },
    { label: 'How can I contact him?', query: 'How can I contact Tabish?' }
  ];

  function addMessage(text, kind) {
    var item = document.createElement('p');
    item.className = 'portfolio-chat-message' + (kind === 'user' ? ' portfolio-chat-message--user' : '');
    item.textContent = text;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
  }

  function addLinks(links) {
    var wrap = document.createElement('div');
    wrap.className = 'portfolio-chat-links';
    links.forEach(function (link) {
      var anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.label;
      if (link.href.indexOf('http') === 0) {
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
      }
      wrap.appendChild(anchor);
    });
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function addSuggestions() {
    var wrap = document.createElement('div');
    wrap.className = 'portfolio-chat-suggestions';
    suggestions.forEach(function (suggestion) {
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = suggestion.label;
      button.addEventListener('click', function () { answer(suggestion.query); });
      wrap.appendChild(button);
    });
    messages.appendChild(wrap);
  }

  function answerQuestion(raw) {
    var question = raw.toLowerCase();
    if (/\b(project|portfolio|work|built|build|sea route|plant|rental|bug.fix|phish|intrusion)\b/.test(question)) {
      return {
        text: 'The portfolio features Sea Route AI, Plant Disease Classification, Rental Tracker, and a Bug-Fixing AI Agent. It also includes in-progress cybersecurity projects on intrusion detection and phishing URL classification.',
        links: [
          { label: 'Sea Route AI', href: 'project-sea-route-ai.html' },
          { label: 'Plant Disease Classification', href: 'project-plant-disease-classification.html' },
          { label: 'Rental Tracker', href: 'project-rental-tracker.html' },
          { label: 'Bug-Fixing AI Agent', href: 'project-bug-fixing-agent.html' }
        ]
      };
    }
    if (/\b(skill|technology|technologies|expertise|speciali[sz])\b/.test(question)) {
      return {
        text: 'The site highlights AI, machine learning, chatbot development, data science, prompt engineering, and mobile applications. Visit the Services section for details.',
        links: [{ label: 'View services', href: '#services-section' }]
      };
    }
    if (/\b(contact|email|reach|hire|message|phone)\b/.test(question)) {
      return {
        text: 'You can reach Tabish by email at tabishsyed05@gmail.com, or use the contact section on this page.',
        links: [
          { label: 'Email Tabish', href: 'mailto:tabishsyed05@gmail.com' },
          { label: 'Contact section', href: '#contact-section' }
        ]
      };
    }
    if (/\b(about|who|experience|background|annotation|minutes)\b/.test(question)) {
      return {
        text: 'Tabish describes his work as blending AI experimentation, data precision, and practical systems. The portfolio also notes 5,000+ minutes of data annotation experience.',
        links: [{ label: 'About Tabish', href: '#about-section' }]
      };
    }
    if (/\b(resume|résumé|cv|curriculum)\b/.test(question)) {
      return { text: 'The portfolio has a CV download in the About section.', links: [{ label: 'Open About section', href: '#about-section' }] };
    }
    if (/\b(journal|article|blog|writing)\b/.test(question)) {
      return { text: 'The AI Journal covers chatbots, clean data, data annotation, machine learning, and prompt engineering.', links: [{ label: 'Visit the AI Journal', href: '#journal-section' }] };
    }
    return {
      text: 'I can answer preset questions about Tabish’s projects, skills, experience, CV, and contact details. Try one of the suggestions below.',
      suggestions: true
    };
  }

  function answer(raw) {
    var question = raw.trim();
    if (!question) return;
    addMessage(question, 'user');
    input.value = '';
    var result = answerQuestion(question);
    addMessage(result.text, 'bot');
    if (result.links) addLinks(result.links);
    if (result.suggestions) addSuggestions();
  }

  function openChat() {
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    input.focus();
    if (!messages.children.length) {
      addMessage('Hi! I can help you explore Tabish’s portfolio. What would you like to know?', 'bot');
      addSuggestions();
    }
  }

  function closeChat() {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  }

  launcher.addEventListener('click', function () { panel.hidden ? openChat() : closeChat(); });
  panel.querySelector('.portfolio-chat-close').addEventListener('click', closeChat);
  panel.querySelector('#portfolio-chat-form').addEventListener('submit', function (event) {
    event.preventDefault();
    answer(input.value);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !panel.hidden) closeChat();
  });
}());
