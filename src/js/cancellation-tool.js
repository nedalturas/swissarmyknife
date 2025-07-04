// Cancellation/Rescheduling Tool Module
const CancellationTool = {
  init() {
    console.log('Cancellation Tool initialized');
  },

  toggleActionFields() {
    const action = document.getElementById('action').value;
    const rescheduleFields = document.getElementById('rescheduleFields');
    const cancellationFields = document.getElementById('cancellationFields');

    if (action === 'rescheduled') {
      rescheduleFields.style.display = 'block';
      cancellationFields.style.display = 'none';
    } else if (action === 'cancelled') {
      rescheduleFields.style.display = 'none';
      cancellationFields.style.display = 'block';
    } else {
      rescheduleFields.style.display = 'none';
      cancellationFields.style.display = 'none';
    }
  },

  calculate() {
    const segment = document.getElementById('segment').value;
    const action = document.getElementById('action').value;

    if (!segment || !action) {
      Utils.showMessage('Please select both segment and action', 'error');
      return;
    }

    let result = '';

    if (action === 'rescheduled') {
      const withinOneHour = document.getElementById('withinOneHour').checked;

      if (withinOneHour) {
        result = `Rescheduling Fee:
Segment: ${segment}
Action: Rescheduled (Within 1 hour)
Fee: ₱30 (Non-compulsory)
`;f
      } else {
        result = `Rescheduling Fee:

Segment: ${segment}
Action: Rescheduled (More than 1 hour)
Fee: ₱30 (Compulsory)
`;
      }
    } else if (action === 'cancelled') {
      const totalAmount = parseFloat(
        document.getElementById('totalAmount').value
      );

      if (!totalAmount || totalAmount <= 0) {
        Utils.showMessage('Please enter a valid total amount', 'error');
        return;
      }

      let cancellationFee = 0;
      let maxFee = 0;

      switch (segment) {
        case 'Low Value':
          cancellationFee = totalAmount * 0.5;
          maxFee = 100;
          break;
        case 'Mid Value':
          cancellationFee = totalAmount * 0.5;
          maxFee = 150;
          break;
        case 'High Value':
          cancellationFee = totalAmount * 1.0;
          maxFee = 150;
          break;
      }

      const finalFee = Math.min(cancellationFee, maxFee);

      result = `Cancellation Fee:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Segment: ${segment}
Action: Cancelled
Total Amount: ₱${totalAmount.toFixed(2)}
Calculation: ${
        segment === 'High Value' ? '100%' : '50%'
      } of total amount (Max ₱${maxFee})
Cancellation Fee: ₱${finalFee.toFixed(2)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    }

    document.getElementById('cancellationOutput').textContent = result;
    document.getElementById('cancellationOutput').style.display = 'block';
    document.getElementById('cancellationPlaceholder').style.display = 'none';
    document.getElementById('copyCancellationBtn').style.display =
      'inline-block';
  },

  clear() {
    document.getElementById('cancellationForm').reset();
    $('#segment').dropdown('clear');
    $('#action').dropdown('clear');
    document.getElementById('rescheduleFields').style.display = 'none';
    document.getElementById('cancellationFields').style.display = 'none';
    document.getElementById('cancellationOutput').style.display = 'none';
    document.getElementById('cancellationPlaceholder').style.display = 'block';
    document.getElementById('copyCancellationBtn').style.display = 'none';
  },
};
