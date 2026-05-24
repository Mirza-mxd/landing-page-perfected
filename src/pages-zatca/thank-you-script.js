(function () {
  const btn = document.getElementById('bookCallBtn');
  const confirmBox = document.getElementById('bookCallConfirm');
  if (!btn || !confirmBox) return;

  /* Read email from URL query parameter */
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email') || '';

  btn.addEventListener('click', function () {
    /* Disable button immediately to prevent double-click */
    btn.disabled = true;
    btn.style.opacity = '0.5';
    btn.style.cursor = 'not-allowed';

    /* Fire-and-forget POST to Apps Script.
       Mark this lead as booked, matched by email. */
    if (email) {
      try {
        fetch('https://script.google.com/macros/s/AKfycbwx3omHS0jEwO5dwkYhD8Pw4a_1m0PZHLdwkOE0GIByyoaOX2bGjxqqLkk-QA1ZCzkaCw/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: 'mark_booked',
            email: email,
            timestamp: new Date().toISOString()
          })
        }).catch(function (err) {
          console.error('Mark-booked POST failed:', err);
        });
      } catch (err) {
        console.error('Mark-booked threw synchronously:', err);
      }
    } else {
      console.warn('No email in URL, lead cannot be matched to a row.');
    }

    /* Reveal the confirmation message and scroll to it smoothly */
    confirmBox.style.display = 'block';
    setTimeout(function () {
      confirmBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  });
})();
