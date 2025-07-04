
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    navigator.clipboard.writeText(text).then(() => {
        Utils.showMessage('Copied to clipboard!', 'success');
    });
}

// Requester Tool Module
const RequesterTool = {
    init() {
        // Set default time to current time
        const now = new Date();
        const timeString = now.toTimeString().slice(0, 5);
        document.getElementById('requestTime').value = timeString;

        // Set default date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('requestDate').value = today;

        // Initially setup date/time picker state
        this.toggleDatePicker();

        console.log('Requester Tool initialized');
    },

    format() {
        const location = document.getElementById('location').value.trim();
        const service = document.getElementById('service').value.trim();
        const isToday = document.getElementById('isToday').checked;

        if (!location || !service) {
            Utils.showMessage('Please fill in location and service fields', 'error');
            return;
        }

        let dateTime;
        if (isToday) {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            dateTime = `possible today at ${time}`;
        } else {
            const date = document.getElementById('requestDate').value;
            const time = document.getElementById('requestTime').value;

            if (!date || !time) {
                Utils.showMessage('Please select date and time', 'error');
                return;
            }

            // Create date object properly
            const dateObj = new Date(date);
            const formattedDate = dateObj.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Convert 24-hour time to 12-hour format properly
            const [hours, minutes] = time.split(':');
            const timeObj = new Date();
            timeObj.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            
            const formattedTime = timeObj.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            dateTime = `possible on ${formattedDate} at ${formattedTime}`;
        }

        // Create clean formatted text
        const formattedRequest = `Service Request:

Location: ${location}

Service: ${service}

Date & Time: ${dateTime}`;

        document.getElementById('requesterOutput').textContent = formattedRequest;
        document.getElementById('requesterOutput').style.display = 'block';
        document.getElementById('requesterPlaceholder').style.display = 'none';
        document.getElementById('copyRequesterBtn').style.display = 'inline-block';
    },

    clear() {
        document.getElementById('requesterForm').reset();
        
        // Reset to current time and date
        const now = new Date();
        const timeString = now.toTimeString().slice(0, 5);
        document.getElementById('requestTime').value = timeString;
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('requestDate').value = today;

        // Hide output and show placeholder
        document.getElementById('requesterOutput').style.display = 'none';
        document.getElementById('requesterPlaceholder').style.display = 'block';
        document.getElementById('copyRequesterBtn').style.display = 'none';

        this.toggleDatePicker();
    },

    toggleDatePicker() {
        const isToday = document.getElementById('isToday').checked;
        const dateTimeField = document.getElementById('dateTimeField');

        if (isToday) {
            dateTimeField.classList.add('disabled');
            dateTimeField.style.opacity = '0.5';
            dateTimeField.style.pointerEvents = 'none';
        } else {
            dateTimeField.classList.remove('disabled');
            dateTimeField.style.opacity = '1';
            dateTimeField.style.pointerEvents = 'auto';
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
});