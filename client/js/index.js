document.addEventListener('DOMContentLoaded', () => {
  console.log('index.js loaded');
  document.getElementById('waitlist-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();

    if (!email) {
      alert('Please enter an email');
      return;
    }

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        document.getElementById('success-message').classList.remove('d-none');
        document.getElementById('email').value = '';
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('Server error. Please try again.');
    }
  });
});