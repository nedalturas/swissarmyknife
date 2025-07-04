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

        // Initially hide date/time picker if today is checked
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

            const dateObj = new Date(date);
            const formattedDate = dateObj.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Convert 24-hour time to 12-hour format
            const timeObj = new Date(`1970-01-01T${time}:00`);
            const formattedTime = timeObj.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            dateTime = `possible on ${formattedDate} at ${formattedTime}`;
        }

        // Create clean formatted text without extra whitespace
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
        const now = new Date();
        const timeString = now.toTimeString().slice(0, 5);
        document.getElementById('requestTime').value = timeString;
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('requestDate').value = today;

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