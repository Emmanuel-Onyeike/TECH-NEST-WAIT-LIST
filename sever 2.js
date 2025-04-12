<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

  emailjs.init("0GB1YfKXLcprzMNlh"); // Replace with your actual Public Key

  document.getElementById('waitlist-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const waitlistNumber = getNextWaitlistNumber(); // You create this logic
  
    const templateParams = {
      user_email: email,
      waitlist_number: waitlistNumber
    };
  
    emailjs.send('service_8to2h6g', 'template_nadde43', templateParams)
      .then(function(response) {
        document.getElementById('success-message').classList.remove('d-none');
        document.getElementById('email').value = '';
        console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
        alert('Failed to send email');
        console.log('FAILED...', error);
      });
  });
  function getNextWaitlistNumber() {
    let users = JSON.parse(localStorage.getItem('waitlist')) || [];
    const newEntry = {
      email: document.getElementById('email').value,
      waitlistNumber: users.length + 1
    };
    users.push(newEntry);
    localStorage.setItem('waitlist', JSON.stringify(users));
    return newEntry.waitlistNumber;
  }
  