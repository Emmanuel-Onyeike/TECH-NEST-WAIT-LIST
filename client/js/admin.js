window.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('waitlist-table');
    if (!tableBody) return;
    fetch('/api/waitlist')
        .then(res => res.json())
        .then(data => {
            const tableBody = document.getElementById('waitlist-table');
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${user.waitlistNumber}</td><td>${user.email}</td>`;
                tableBody.appendChild(row);
            });
        })
        .catch(err => {
            console.error('Error fetching waitlist:', err);
            alert('Failed to load waitlist');
        });
});
