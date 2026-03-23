
(function(){
  const clicks = JSON.parse(localStorage.getItem('affiliateClicksV5') || '{}');
  document.querySelectorAll('[data-aff-link]').forEach(btn=>{
    btn.addEventListener('click', function(){
      const key = this.getAttribute('data-aff-link');
      clicks[key] = (clicks[key] || 0) + 1;
      localStorage.setItem('affiliateClicksV5', JSON.stringify(clicks));
      const stamp = new Date().toLocaleString();
      localStorage.setItem('affiliateClicksV5_last', stamp);
    });
  });

  const total = Object.values(clicks).reduce((a,b)=>a+b,0);
  document.querySelectorAll('[data-click-total]').forEach(el=>el.textContent = total);
  document.querySelectorAll('[data-last-click]').forEach(el=>el.textContent = localStorage.getItem('affiliateClicksV5_last') || 'No clicks tracked yet');

  const form = document.querySelector('#emailCapture');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value.trim();
      if(!email) return;
      const emails = JSON.parse(localStorage.getItem('affiliateEmailsV5') || '[]');
      emails.push({email, createdAt:new Date().toISOString()});
      localStorage.setItem('affiliateEmailsV5', JSON.stringify(emails));
      const msg = document.querySelector('#emailCaptureMsg');
      if(msg) msg.textContent = 'Saved locally as a demo lead. Replace this with your real email service later.';
      form.reset();
      const countTarget = document.querySelector('[data-lead-total]');
      if(countTarget) countTarget.textContent = emails.length;
    });
  }

  const leadCount = JSON.parse(localStorage.getItem('affiliateEmailsV5') || '[]').length;
  document.querySelectorAll('[data-lead-total]').forEach(el=>el.textContent = leadCount);
})();
