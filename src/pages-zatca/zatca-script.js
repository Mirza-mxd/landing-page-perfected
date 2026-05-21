/* ============================================================
   1. LIVE COUNTDOWN TO WAVE 24 DEADLINE
   30 June 2026, 00:00 KSA (UTC+3) = 29 June 2026, 21:00 UTC
   ============================================================ */
(function () {
  const deadline = new Date(Date.UTC(2026, 5, 29, 21, 0, 0));
  const elDays  = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMins  = document.getElementById('cd-mins');
  const elSecs  = document.getElementById('cd-secs');

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tick() {
    const now = new Date();
    let diff = Math.max(0, deadline.getTime() - now.getTime());

    const days  = Math.floor(diff / 86400000); diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);  diff -= hours * 3600000;
    const mins  = Math.floor(diff / 60000);    diff -= mins * 60000;
    const secs  = Math.floor(diff / 1000);

    elDays.textContent  = days;
    elHours.textContent = pad(hours);
    elMins.textContent  = pad(mins);
    elSecs.textContent  = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();

/* ============================================================
   2. FORM HANDLING. PLACEHOLDER, WIRE TO YOUR BACKEND HERE.
   Replace the submitForm body with your preferred integration:
   - Webflow form: remove this script, use Webflow's native form
   - Mailchimp / Brevo / ConvertKit: POST to their endpoint
   - n8n / Make / Zapier webhook: POST JSON to the webhook URL
   - Custom backend: POST to your endpoint

   After successful submission, redirect to the thank-you page
   (step 3 in your funnel) for the call-booking flow.
   ============================================================ */
async function submitForm(form) {
  const countryCode = form.querySelector('[name="country_code"]').value;
  const phoneDigits = form.querySelector('[name="phone"]').value.replace(/\D/g, '');
  const data = {
    name:  form.querySelector('[name="name"]').value.trim(),
    email: form.querySelector('[name="email"]').value.trim(),
    phone: countryCode + phoneDigits,
    source: 'zatca-phase-2-checklist-landing',
    timestamp: new Date().toISOString()
  };

  /* ---- WIRE YOUR BACKEND HERE ----
  await fetch('https://your-webhook-url.com/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  -------------------------------- */

  console.log('Lead captured (replace with backend call):', data);

  /* Trigger download of both PDF checklists */
  triggerDownload('/zatca-checklist-en.pdf', 'zatca-checklist-en.pdf');
  setTimeout(function () {
    triggerDownload('/zatca-checklist-ar.pdf', 'zatca-checklist-ar.pdf');
  }, 300);

  /* Redirect to thank-you page ~1s after downloads start */
  setTimeout(function () {
    window.location.href = '/thank-you';
  }, 1000);
}

function triggerDownload(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

document.getElementById('leadForm').addEventListener('submit', function (e) {
  e.preventDefault();
  if (!validateAll(true)) return;
  submitForm(this);
});

/* ============================================================
   2b. LIVE VALIDATION
   ============================================================ */
const nameInput  = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const submitBtn  = document.getElementById('submitBtn');
const nameError  = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNameValid()  { return nameInput.value.trim().length >= 2; }
function isEmailValid() { return EMAIL_RE.test(emailInput.value.trim()); }
function isPhoneValid() {
  const d = phoneInput.value.replace(/\D/g, '');
  return d.length >= 7 && d.length <= 12;
}

function setError(input, errEl, show, message) {
  if (show) {
    errEl.hidden = false;
    if (message) errEl.textContent = message;
    input.setAttribute('aria-invalid', 'true');
  } else {
    errEl.hidden = true;
    input.removeAttribute('aria-invalid');
  }
}

function updateSubmitState() {
  submitBtn.disabled = !(isNameValid() && isEmailValid() && isPhoneValid());
}

function validateAll(force) {
  const nOk = isNameValid(), eOk = isEmailValid(), pOk = isPhoneValid();
  if (force || nameInput.dataset.touched)  setError(nameInput,  nameError,  !nOk);
  if (force || emailInput.dataset.touched) setError(emailInput, emailError, !eOk);
  if (force || phoneInput.dataset.touched) setError(phoneInput, phoneError, !pOk);
  updateSubmitState();
  return nOk && eOk && pOk;
}

// Strip non-digits from phone as user types
phoneInput.addEventListener('input', function () {
  const cleaned = this.value.replace(/\D/g, '');
  if (cleaned !== this.value) this.value = cleaned;
});

[nameInput, emailInput, phoneInput].forEach(function (inp) {
  inp.addEventListener('input', function () {
    if (inp.dataset.touched) validateAll(false);
    updateSubmitState();
  });
  inp.addEventListener('blur', function () {
    inp.dataset.touched = '1';
    validateAll(false);
  });
});

updateSubmitState();


/* ============================================================
   3. SMOOTH SCROLL TO FORM FOR ALL CTAs
   ============================================================ */
(function () {
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function smoothScrollToCenter(target, duration) {
    const rect = target.getBoundingClientRect();
    const targetCenter = rect.top + window.pageYOffset + rect.height / 2;
    const destination = targetCenter - window.innerHeight / 2;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const end = Math.max(0, Math.min(destination, maxScroll));
    const start = window.pageYOffset;
    const distance = end - start;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      window.scrollTo(0, start + distance * easeInOutCubic(t));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  document.querySelectorAll('a[href="#download-form"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const nameField = document.getElementById('name');
      const target = nameField || document.getElementById('download-form');
      if (!target) return;
      e.preventDefault();
      smoothScrollToCenter(target, 700);
      history.replaceState(null, '', '#download-form');
    });
  });
})();


