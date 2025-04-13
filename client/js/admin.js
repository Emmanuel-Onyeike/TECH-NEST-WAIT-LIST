fetch('/api/waitlist')
    .then(res => res.json())
    .then(data => {
        const table = document.getElementById('waitlist-table');
        data.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${user.waitlistNumber}</td><td>${user.email}</td>`;
            table.appendChild(row);
        });
    })
    .catch(err => {
        console.error('Error fetching waitlist:', err);
        alert('Failed to load waitlist');
    });