/* Tabzzz profile chatbot: runs fully in the browser (no API key, no network). Edit KB below to update answers. */
(function(){
const KB=[
{k:['hello','hi','hey','hola','namaste','good morning','good evening'],a:"Hi! 👋 I'm Tabish's portfolio assistant. Ask me about his skills, projects, experience, education, certifications or how to contact him."},
{k:['who','introduce','yourself','profile','summary','background','about tabish','about him'],a:"Tabish Syed is an AI & Data Science Engineering student from Mumbai. He builds machine learning, computer vision and chatbot projects, and works with Python, TensorFlow, OpenCV and SQL. He's open to remote opportunities."},
{k:['skill','tech','stack','language','tools','python','tensorflow','keras','opencv','sql','flask','matlab','git','firebase','pandas','numpy','know'],a:"Skills:\n• Languages & tools: Python, SQL, MATLAB, Git/GitHub, Firebase\n• ML/AI: Pandas, NumPy, TensorFlow, Keras, OpenCV, Machine Learning, Deep Learning, Prompt Engineering\n• Other: Flask, web development, chatbot development, data analysis & visualization"},
{k:['project','built','portfolio','work','made'],a:"Main projects:\n1. Sea Route AI (2026) — autonomous ship navigation simulation\n2. Plant Disease Classification (2025) — CNN, ~85% accuracy\n3. Rental Tracker (2026) — rent & tenant management app\n4. Bug-Fixing AI Agent (Python)\n5. Network Intrusion Detection and Phishing URL Classifier (in progress)\nAsk me about any of them by name."},
{k:['sea','ship','route','colreg','maritime','navigation','ijert','paper','research','publication','published'],a:"Sea Route AI is a predictive telemetry and guidance simulation for autonomous ship dynamics that accounts for collision regulations (COLREGs). It does real-time path planning using live weather, and uses Matplotlib for trajectory visualizations. A research paper, \"Sea Route AI: Intelligent Maritime Route Optimization Framework\", has been submitted to IJERT (Paper ID: IJERTV15IS042311)."},
{k:['plant','disease','leaf','crop','cnn','agriculture','computer vision','vision'],a:"The Plant Disease Classification project (2025) is an end-to-end computer vision model that detects and classifies crop and plant diseases from leaf images. It uses OpenCV for preprocessing (noise reduction, colour conversion, thresholding) and a CNN built in TensorFlow, reaching about 85% accuracy under varying lighting."},
{k:['rental','rent','tenant','landlord'],a:"Rental Tracker (2026) is a digital rental management system for tenant details, rent payments and due dates. Tabish used AI agents, including Claude, to speed up coding, debugging and feature polish."},
{k:['bug','agent','fixing'],a:"The Bug-Fixing AI Agent is a Python AI agent project. Open it from the Portfolio section for the full write-up."},
{k:['experience','job','intern','annotat','adzzat','encord','robot','employ','career','working'],a:"Tabish works as a Data Annotator at Adzzat (Jul 2026 – present). He has annotated 5,000+ minutes of US-based robotics video on the Encord platform, wrote task and segment-level captions for robot manipulation actions, and reviewed edge cases to keep dataset quality high."},
{k:['education','study','college','degree','university','student','school','hsc','ssc','rizvi','graduat','be '],a:"BE in Artificial Intelligence and Data Science at Rizvi College of Engineering (2023–2027). Earlier: HSC 75% and SSC 79%."},
{k:['certif','course','learn','training','certificate'],a:"Certifications:\n• Career Essentials in Generative AI — Microsoft & LinkedIn\n• Gen AI — Indiana University (May 2026)\n• No-Code Machine Learning and Generative AI — AWS Training Online (Feb 2025)\n• Neural Networks and Deep Learning — Great Learning (Jul 2024)\n• Learning Microsoft 365 Copilot (Mar 2024)"},
{k:['service','offer','hire','freelance','do you do','help with','can you build','chatbot development'],a:"Services: Artificial Intelligence, Chatbot Development, Machine Learning, Data Science and Prompt Engineering. For a project, reach out via the contact details I can share."},
{k:['contact','email','mail','phone','call','number','reach','whatsapp','address','location','where','mumbai','linkedin','connect','resume','cv'],a:"📧 tabishsyed05@gmail.com\n📞 +91 7875012501\n📍 Andheri West, Mumbai 400053\n🔗 linkedin.com/in/tabish-syed-52970325b\nYou can also download the CV from the About section. He's open to remote opportunities."},
{k:['journal','blog','article','post','write'],a:"The AI Journal covers: how chatbots understand meaning, data annotation, prompt engineering, ML vs deep learning, and why clean data beats a bigger model. Scroll to the Journal section to read them."},
{k:['thank','thanks','bye','great','awesome','cool'],a:"You're welcome! 😊 Ask anything else about Tabish, or reach him at tabishsyed05@gmail.com."}];
const CHIPS=['Who is Tabish?','Skills','Projects','Experience','Education','Contact'];
const FALL="I'm built to answer questions about Tabish's profile, so I may not know that one. Try asking about his skills, projects, experience, education, certifications or contact details.";
const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const link=s=>esc(s).replace(/(tabishsyed05@gmail\.com)/g,'<a href="mailto:$1">$1</a>').replace(/(\+91 7875012501)/g,'<a href="tel:+917875012501">$1</a>').replace(/(linkedin\.com\/in\/[\w-]+)/g,'<a href="https://www.$1" target="_blank" rel="noopener">$1</a>');
function answer(q){q=' '+q.toLowerCase().replace(/[^a-z0-9+ ]/g,' ')+' ';let best=null,top=0;
 for(const e of KB){let s=0;for(const k of e.k)if(q.includes(k.length<4?' '+k+' ':k))s+=k.length;if(s>top){top=s;best=e}}
 return best?best.a:FALL}
const root=document.createElement('div');
root.innerHTML=`<button id="tz-fab" aria-label="Open chat assistant" aria-expanded="false">💬</button>
<section id="tz-chat" role="dialog" aria-label="Profile chat assistant"><div class="tz-head"><div class="tz-av">T</div><div><b>Tabish's Assistant</b><small>Ask about my profile</small></div><button aria-label="Close chat">✕</button></div>
<div id="tz-log" aria-live="polite"></div><div class="tz-chips"></div>
<form class="tz-form"><input id="tz-in" placeholder="Type your question…" maxlength="300" autocomplete="off" aria-label="Your question"><button>Send</button></form>
<div class="tz-note">Answers come from Tabish's profile details, not a live AI.</div></section>`;
document.body.appendChild(root);
const $=s=>root.querySelector(s),box=$('#tz-chat'),log=$('#tz-log'),fab=$('#tz-fab'),inp=$('#tz-in');
const add=(t,c)=>{const d=document.createElement('div');d.className='tz-m '+c;c==='tz-b'?d.innerHTML=link(t):d.textContent=t;log.appendChild(d);log.scrollTop=log.scrollHeight};
function ask(q){q=q.trim();if(!q)return;add(q,'tz-u');const t=document.createElement('div');t.className='tz-m tz-b tz-typing';t.innerHTML='<i></i><i></i><i></i>';log.appendChild(t);log.scrollTop=log.scrollHeight;
 setTimeout(()=>{t.remove();add(answer(q),'tz-b')},450+Math.min(q.length*8,500))}
$('.tz-chips').innerHTML=CHIPS.map(c=>`<button type="button">${c}</button>`).join('');
$('.tz-chips').onclick=e=>{if(e.target.tagName==='BUTTON')ask(e.target.textContent)};
$('.tz-form').onsubmit=e=>{e.preventDefault();ask(inp.value);inp.value=''};
const toggle=o=>{box.classList.toggle('open',o);fab.setAttribute('aria-expanded',o);fab.textContent=o?'✕':'💬';if(o){if(!log.children.length)add("Hi! 👋 I'm Tabish's assistant. Ask me about his skills, projects, experience, education or contact details.",'tz-b');setTimeout(()=>inp.focus(),300)}else fab.focus()};
const heroButton=document.getElementById('portfolio-chat-hero-open');
if(heroButton)heroButton.addEventListener('click',()=>toggle(true));
fab.onclick=()=>toggle(!box.classList.contains('open'));$('.tz-head button').onclick=()=>toggle(false);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&box.classList.contains('open'))toggle(false)});
})();
