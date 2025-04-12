
  document.getElementById('waitlist-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    if (!email) return;

  
    const users = JSON.parse(localStorage.getItem('waitlist')) || [];

    
    if (users.find(u => u.email === email)) {
      alert("You're already on the waitlist!");
      return;
    }

    const newUser = {
      email: email,
      waitlistNumber: users.length + 1
    };

    users.push(newUser);
    localStorage.setItem('waitlist', JSON.stringify(users));

    document.getElementById('success-message').classList.remove('d-none');
    document.getElementById('email').value = '';
  });

  document.getElementById('waitlist-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
  
    try {
      const response = await fetch('http://localhost:3000/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
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
  