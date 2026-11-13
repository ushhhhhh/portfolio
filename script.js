/* ===================================================================
   USHA PRAKASH - INTERACTIVE SCRIPT & AI ASSISTANT
   Responsive Navigation, Theme Switcher & AI Resume Agent
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. THEME TOGGLER (Dark / Light)
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // 2. MOBILE HAMBURGER MENU
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });

    // Close when tapping outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
  }

  // 3. SCROLL SPY - ACTIVE NAVIGATION STATE
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navItem) navItem.classList.add('active');
      }
    });
  });

  // 4. AI ASSISTANT MODAL LOGIC
  const openAiBtn = document.getElementById('open-ai-chat-btn');
  const aiOverlay = document.getElementById('ai-modal-overlay');
  const aiCloseBtn = document.getElementById('ai-close-btn');

  if (openAiBtn && aiOverlay) {
    openAiBtn.addEventListener('click', () => {
      aiOverlay.classList.add('active');
      setTimeout(() => {
        const input = document.getElementById('ai-user-input');
        if (input) input.focus();
      }, 200);
    });
  }

  if (aiCloseBtn && aiOverlay) {
    aiCloseBtn.addEventListener('click', () => {
      aiOverlay.classList.remove('active');
    });
  }

  if (aiOverlay) {
    aiOverlay.addEventListener('click', (e) => {
      if (e.target === aiOverlay) {
        aiOverlay.classList.remove('active');
      }
    });
  }

  // TRACE Architecture Demo Modal Close
  const traceModalOverlay = document.getElementById('trace-modal-overlay');
  const traceCloseBtn = document.getElementById('trace-close-btn');
  if (traceCloseBtn && traceModalOverlay) {
    traceCloseBtn.addEventListener('click', () => {
      traceModalOverlay.classList.remove('active');
    });
  }
  if (traceModalOverlay) {
    traceModalOverlay.addEventListener('click', (e) => {
      if (e.target === traceModalOverlay) {
        traceModalOverlay.classList.remove('active');
      }
    });
  }

});

// Open TRACE Project Architecture Demo Modal
function openTraceModal(e) {
  if (e) e.preventDefault();
  const traceModalOverlay = document.getElementById('trace-modal-overlay');
  if (traceModalOverlay) {
    traceModalOverlay.classList.add('active');
  }
}

// 5. COPY CONTACT DETAILS
function copyContactInfo() {
  const info = "Name: Usha Prakash\nEmail: prakashusha291@gmail.com\nPhone: +91 91483 54201\nLocation: Bengaluru, Karnataka";
  navigator.clipboard.writeText(info).then(() => {
    const copyText = document.getElementById('copy-text');
    if (copyText) {
      const original = copyText.textContent;
      copyText.textContent = "Copied to Clipboard!";
      setTimeout(() => {
        copyText.textContent = original;
      }, 2500);
    }
  }).catch(err => {
    alert("Copied: prakashusha291@gmail.com | +91 91483 54201");
  });
}

// 6. CONTACT FORM SUBMISSION
function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const toast = document.getElementById('form-toast');

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-regular fa-paper-plane"></i> Send Message';

    toast.className = 'form-toast success';
    toast.innerHTML = `<strong>Thank you, ${name}!</strong> Your message has been prepared. You can also directly email Usha at <a href="mailto:prakashusha291@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}" style="text-decoration:underline; font-weight:600;">prakashusha291@gmail.com</a>.`;
    
    // Also trigger mailto in background
    window.location.href = `mailto:prakashusha291@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
    form.reset();
  }, 900);
}

// 7. AI ASSISTANT KNOWLEDGE BASE & REPLIES
const RESUME_KNOWLEDGE = {
  skills: `Usha's core technical toolkit includes:
• <strong>Languages:</strong> Python, JavaScript (ES6+), SQL, HTML5, CSS3, C.
• <strong>AI, Machine Learning & Systems:</strong> Scikit-learn, Streamlit, Cosine Similarity, TF-IDF Vectorization, Gemini 2.5 Flash, Vertex AI, OpenAI APIs, Prompt Engineering.
• <strong>Data Science & Verification:</strong> SQLite, Pytest, Evidence Parsing, OCR (Vision/PDF), Pandas, NumPy, Data Preprocessing, Feature Engineering.
• <strong>Web & Backend:</strong> React.js, Vite, Node.js, Express.js, MySQL, RESTful APIs.
• <strong>Core Fundamentals:</strong> DSA, DBMS, OOP, Operating Systems, Computer Networks, Linear Algebra & Probability.`,

  projects: `Usha has developed two major featured projects:
1. <strong>TRACE – Customer Data Deletion Audit System:</strong>
   • Automated compliance and deletion verification system for distributed data evidence.
   • Processed 94 evidence files into 2,929 normalized observations across 386 snapshot scopes in 0.52s (JSON, SQL, LOG, TXT, PDF, PNG/OCR).
   • Evaluated 518 customer deletion requests across 3,117 audit steps with identity resolution and absence proofs.
   • Stack: Python, SQLite, Pytest, Evidence Parsing, OCR, Git.
   • GitHub: <a href="https://github.com/ushhhhhh" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">github.com/ushhhhhh</a>

2. <strong>CineMatch – AI-Powered Movie Recommendation System:</strong>
   • Content-based recommendation engine built on IMDb datasets using TF-IDF vectorization and Cosine Similarity.
   • Features interactive Streamlit web app with movie search, personalized similarity-based recommendations, and genre-wise movie exploration with IMDb ratings.
   • Implemented cached data loading and similarity computation using Streamlit and Scikit-learn to optimize efficiency.
   • Stack: Python, Pandas, NumPy, Scikit-learn, Streamlit.
   • GitHub: <a href="https://github.com/ushhhhhh/movie" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">github.com/ushhhhhh/movie</a>`,

  education: `<strong>Education Details:</strong>
• <strong>Degree:</strong> Bachelor of Engineering (B.E.) in Artificial Intelligence and Machine Learning
• <strong>Institution:</strong> BMS Institute of Technology and Management, Bengaluru
• <strong>Graduation:</strong> Expected in 2028
• <strong>Academic CGPA:</strong> <strong>8.50 / 10.00</strong>
• <strong>Key Coursework:</strong> Data Structures and Algorithms, Machine Learning, Artificial Intelligence, Database Management Systems, Probability & Statistics, Linear Algebra.`,

  certifications: `<strong>Internships & Certifications:</strong>
1. <strong>Web Development Internship</strong> – InAmigos Foundation (10 Oct 2026 – 26 Oct 2026)
2. <strong>Workato Foundations Level 1</strong> – Workato Automation Institute (2025)
3. <strong>Cyber Security & Applied Ethical Hacking</strong> – Infosys Springboard (2025)
4. <strong>Programming in C</strong> – Infosys Springboard (2024)`,

  contact: `<strong>Contact Usha Prakash:</strong>
• <strong>Email:</strong> <a href="mailto:prakashusha291@gmail.com" style="color:var(--accent-cyan);">prakashusha291@gmail.com</a>
• <strong>Phone:</strong> <a href="tel:+919148354201" style="color:var(--accent-cyan);">+91 91483 54201</a>
• <strong>Location:</strong> Bengaluru, Karnataka, India
• <strong>GitHub:</strong> <a href="https://github.com/ushhhhhh" target="_blank" style="color:var(--accent-cyan);">github.com/ushhhhhh</a>
• <strong>Status:</strong> Open to AI/ML & Software Internships!`
};

function generateAiResponse(input) {
  const query = input.toLowerCase();

  if (query.includes('skill') || query.includes('tech') || query.includes('language') || query.includes('python') || query.includes('sqlite') || query.includes('pytest') || query.includes('ocr')) {
    return RESUME_KNOWLEDGE.skills;
  }
  if (query.includes('trace') || query.includes('audit') || query.includes('deletion') || query.includes('evidence')) {
    return RESUME_KNOWLEDGE.projects;
  }
  if (query.includes('cinematch') || query.includes('movie') || query.includes('recommend') || query.includes('imdb')) {
    return RESUME_KNOWLEDGE.projects;
  }
  if (query.includes('project') || query.includes('work') || query.includes('system')) {
    return RESUME_KNOWLEDGE.projects;
  }
  if (query.includes('education') || query.includes('college') || query.includes('bms') || query.includes('cgpa') || query.includes('degree') || query.includes('gpa')) {
    return RESUME_KNOWLEDGE.education;
  }
  if (query.includes('certif') || query.includes('intern') || query.includes('inamigos') || query.includes('workato') || query.includes('infosys') || query.includes('course')) {
    return RESUME_KNOWLEDGE.certifications;
  }
  if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('reach') || query.includes('hire')) {
    return RESUME_KNOWLEDGE.contact;
  }
  if (query.includes('who') || query.includes('about') || query.includes('summary') || query.includes('intro')) {
    return `<strong>Usha Prakash</strong> is an Artificial Intelligence & Machine Learning undergraduate at BMS Institute of Technology and Management (CGPA: 8.5/10). She specializes in building intelligent applications and high-performance verification systems using Python, Scikit-learn, React, Streamlit, and modern AI/LLMs. Her recent work includes the TRACE Customer Data Deletion Audit System and CineMatch – AI-Powered Movie Recommendation System.`;
  }

  return `I can help you with details about Usha Prakash! Try asking about:
• <em>Technical skills & tools (Python, SQLite, Pytest, Scikit-learn)</em>
• <em>TRACE Customer Data Deletion Audit System</em>
• <em>CineMatch – AI-Powered Movie Recommendation System</em>
• <em>InAmigos Internship & Certifications</em>
• <em>Education at BMSITM & CGPA</em>
• <em>Contact info & internship inquiries</em>`;
}

function sendAiMessage() {
  const inputEl = document.getElementById('ai-user-input');
  const chatBody = document.getElementById('ai-chat-body');
  const text = inputEl.value.trim();

  if (!text) return;

  // Append user message
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'chat-message user-message';
  userMsgDiv.innerHTML = `
    <div class="message-avatar"><i class="fa-solid fa-user"></i></div>
    <div class="message-content">${escapeHtml(text)}</div>
  `;
  chatBody.appendChild(userMsgDiv);
  inputEl.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  // Typing effect / bot response
  setTimeout(() => {
    const botResponse = generateAiResponse(text);
    const botMsgDiv = document.createElement('div');
    botMsgDiv.className = 'chat-message bot-message';
    botMsgDiv.innerHTML = `
      <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="message-content">${botResponse}</div>
    `;
    chatBody.appendChild(botMsgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 450);
}

function handleAiKeyPress(e) {
  if (e.key === 'Enter') {
    sendAiMessage();
  }
}

function askQuickPrompt(promptText) {
  const inputEl = document.getElementById('ai-user-input');
  if (inputEl) {
    inputEl.value = promptText;
    sendAiMessage();
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}
