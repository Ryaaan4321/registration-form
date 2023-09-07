document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const response = await fetch('/register', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        alert('Registration successful');
        window.location.href = '/'; // Redirect to the homepage or login page
    } else {
        alert('Registration failed');
    }
});
