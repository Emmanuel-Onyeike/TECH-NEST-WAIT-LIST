document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('waitlist-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    console.log('Raw email value:', document.getElementById('email').value);
    console.log('Email input value:', document.getElementById('email').value);
    console.log('Input value after submit:', document.getElementById('email').value);
    console.log(email)

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