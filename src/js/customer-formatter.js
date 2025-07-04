// Customer Profile Formatter Module
const CustomerFormatter = {
    init() {
        console.log('Customer Formatter initialized');
    },
    format() {
        const referenceNumber = document.getElementById('referenceNumber').value.trim();
        const fullName = document.getElementById('fullName').value.trim();
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        const concern = document.getElementById('concern').value;
        
        if (!referenceNumber || !fullName || !phoneNumber || !concern) {
            Utils.showMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Fix: Remove indentation from template literal
        const formattedProfile = `Reference Number: ${referenceNumber}
Full Name: ${fullName}
Phone Number: ${phoneNumber}
Concern: ${concern}`;
        
        document.getElementById('customerOutput').textContent = formattedProfile;
        document.getElementById('customerOutput').style.display = 'block';
        document.getElementById('customerPlaceholder').style.display = 'none';
        document.getElementById('copyCustomerBtn').style.display = 'inline-block';
    },
    clear() {
        document.getElementById('customerForm').reset();
        $('#concern').dropdown('clear');
        document.getElementById('customerOutput').style.display = 'none';
        document.getElementById('customerPlaceholder').style.display = 'block';
        document.getElementById('copyCustomerBtn').style.display = 'none';
    }
};