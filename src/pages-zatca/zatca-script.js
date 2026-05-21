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
  const data = {
    name:  form.querySelector('[name="name"]').value.trim(),
    email: form.querySelector('[name="email"]').value.trim(),
    phone: form.querySelector('[name="phone"]').value.trim(),
    source: 'zatca-phase-2-checklist-landing',
    timestamp: new Date().toISOString()
  };

  if (!data.name || !data.email) {
    alert('Please enter your full name and email so we can send the checklist.');
    return;
  }

  /* ---- WIRE YOUR BACKEND HERE ----
  await fetch('https://your-webhook-url.com/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  -------------------------------- */

  console.log('Lead captured (replace with backend call):', data);

  /* Redirect to thank-you / book-a-call page (step 3 in your funnel). */
  window.location.href = '/thank-you';
}

document.getElementById('leadForm').addEventListener('submit', function (e) {
  e.preventDefault();
  submitForm(this);
});

