// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Remove alert after 5 seconds
    setTimeout(() => {
        const alert = document.getElementById('alert');
        if (alert) {
            alert.style.display = 'none';
        }
    }, 5000);

    // Form submission handling
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const messages = document.getElementById('messages');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (input.value) {
                socket.emit('chat message', input.value);
                input.value = '';
            }
        });
    }

    // Scroll to bottom when new message arrives
    socket.on('chat message', function(data) {
        if (messages) {
            messages.scrollTop = messages.scrollHeight;
        }
    });
}); 