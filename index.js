
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

