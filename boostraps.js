
  document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('waitlist-table');
    const users = JSON.parse(localStorage.getItem('waitlist')) || [];

    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${user.waitlistNumber}</td><td>${user.email}</td>`;
      table.appendChild(row);
    });
  });

