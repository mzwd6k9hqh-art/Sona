document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const sec = btn.getAttribute('data-section');
      document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
      document.getElementById(sec).classList.add('active');
    });
  });

  document.getElementById('analyze-btn').addEventListener('click', ()=> {
    const text = document.getElementById('analyzer-input').value.trim();
    const out = document.getElementById('analyze-output');
    if(!text){ out.textContent = "Please enter a description to analyze."; return; }
    out.textContent = analyzeText(text);
  });
  document.getElementById('clear-analyzer').addEventListener('click', ()=> {
    document.getElementById('analyzer-input').value=''; document.getElementById('analyze-output').textContent='';
  });

  document.getElementById('generate-btn').addEventListener('click', ()=>{
    const type = document.getElementById('gen-type').value;
    const topic = document.getElementById('gen-topic').value.trim();
    const out = document.getElementById('gen-output');
    if(!topic){ out.textContent = "Enter a product name or topic."; return; }
    out.textContent = generateContent(type, topic);
  });
  document.getElementById('copy-gen').addEventListener('click', ()=>{
    const txt = document.getElementById('gen-output').textContent;
    if(txt) navigator.clipboard.writeText(txt);
  });

  document.getElementById('solve-btn').addEventListener('click', ()=>{
    const val = document.getElementById('problem-select').value;
    document.getElementById('solve-output').textContent = getSolution(val);
  });

  document.getElementById('insights-btn').addEventListener('click', ()=>{
    const aud = document.getElementById('audience-input').value.trim();
    const out = document.getElementById('insights-output');
    if(!aud){ out.textContent = "Enter a brief audience description."; return; }
    out.textContent = getInsights(aud);
  });
});

function analyzeText(text){
  const len = text.length;
  let suggestions = [];
  if(len < 80) suggestions.push("- Add more detail: benefits, who it's for, and a key result.");
  if(!/you/gi.test(text)) suggestions.push("- Use direct voice: speak to the customer (use 'you').");
  if(!/free|bonus|limited|new/gi.test(text)) suggestions.push("- Add a clear value or incentive.");
  if(/I will|guarantee|make you/gi.test(text)) suggestions.push("- Avoid absolute promises; make statements realistic.");
  if(suggestions.length===0) suggestions.push("Looks good: clear, benefit-focused, and ready to publish.");
  return "Analysis:\n" + suggestions.join("\n");
}

function generateContent(type, topic){
  const t = topic.trim();
  if(type==='headline') return `Unlock ${t}: Proven tools to level up your work.`;
  if(type==='description') return `${t} — practical, ready-to-use templates and guides designed to save time and boost results.`;
  if(type==='caption') return `Create faster with ${t} — templates, tips, and tools to move you forward. #Sona`;
  return "";
}

function getSolution(key){
  const map = {
    traffic: "1) Review your top channels. 2) Create 3 short promos. 3) Share in communities. 4) Test lightweight ads.",
    conversion: "1) Simplify checkout. 2) Add clear benefits above the fold. 3) Use social proof (testimonials). 4) Offer a low-risk trial.",
    branding: "1) Define your unique voice. 2) Use consistent visuals. 3) Share case studies. 4) Optimize your hero message.",
    product: "1) Collect user feedback. 2) Run small paid test offers. 3) Iterate the offer. 4) Narrow target audience.",
    pricing: "1) Test tiered pricing. 2) Offer entry-level product. 3) Highlight ROI. 4) Use limited-time discounts."
  };
  return map[key] || "Try another option.";
}

function getInsights(aud){
  return `Targeting: ${aud}\n\nTips:\n- Clarify top pain point.\n- Use 1 sentence value message.\n- Offer a small entry product to build trust.\n- Promote where your audience already is.`;
}
