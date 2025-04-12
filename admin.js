
document.getElementById('waitlist-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;

    try {
      const response = await fetch('/join', {
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
      alert('Something went wrong');
    }
  });



  fetch('/api/waitlist')
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById('waitlist-table');
      data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${user.waitlistNumber}</td><td>${user.email}</td>`;
        table.appendChild(row);
      });
    });
