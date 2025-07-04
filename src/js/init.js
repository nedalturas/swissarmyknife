// UI Initialization
$(document).ready(function() {
    // Initialize Fomantic UI components
    $('.ui.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
    $('.tabular.menu .item').tab();
    
    // Initialize customer formatter
    CustomerFormatter.init();
    
    // Initialize requester tool
    RequesterTool.init();
    
    // Initialize cancellation tool
    CancellationTool.init();
});

// Shared utility functions
const Utils = {
    // Copy to Clipboard Function
    async copyToClipboard(elementId) {
        const element = document.getElementById(elementId);
        const text = element.textContent.trim(); // Trim whitespace from the text
        
        try {
            await navigator.clipboard.writeText(text);
            this.showMessage('Copied to clipboard!', 'success');
            
            // Add animation to copy button
            let copyBtn;
            if (elementId === 'customerOutput') {
                copyBtn = 'copyCustomerBtn';
            } else if (elementId === 'requesterOutput') {
                copyBtn = 'copyRequesterBtn';
            } else if (elementId === 'cancellationOutput') {
                copyBtn = 'copyCancellationBtn';
            }
            
            if (copyBtn) {
                document.getElementById(copyBtn).classList.add('copy-success');
                setTimeout(() => {
                    document.getElementById(copyBtn).classList.remove('copy-success');
                }, 500);
            }
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                this.showMessage('Copied to clipboard!', 'success');
            } catch (err) {
                this.showMessage('Failed to copy to clipboard', 'error');
            }
            document.body.removeChild(textArea);
        }
    },

    // Show Message Function
    showMessage(message, type) {
        // Remove existing messages
        $('.ui.message.floating').remove();
        
        const messageClass = type === 'error' ? 'negative' : 'positive';
        const iconClass = type === 'error' ? 'exclamation triangle' : 'check circle';
        
        const messageHTML = `
            <div class="ui ${messageClass} message floating" style="position: fixed; top: 20px; right: 20px; z-index: 1000; min-width: 250px;">
                <i class="close icon"></i>
                <div class="header">
                    <i class="${iconClass} icon"></i>
                    ${message}
                </div>
            </div>
        `;
        
        $('body').append(messageHTML);
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            $('.ui.message.floating').fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
        
        // Handle close button
        $('.ui.message.floating .close').click(function() {
            $(this).closest('.message').fadeOut(300, function() {
                $(this).remove();
            });
        });
    }
};

// Make functions globally available for onclick handlers
window.copyToClipboard = Utils.copyToClipboard.bind(Utils);
window.formatCustomerProfile = () => CustomerFormatter.format();
window.clearCustomerForm = () => CustomerFormatter.clear();
window.formatRequester = () => RequesterTool.format();
window.clearRequesterForm = () => RequesterTool.clear();
window.toggleDatePicker = () => RequesterTool.toggleDatePicker();
window.calculateCancellation = () => CancellationTool.calculate();
window.clearCancellationForm = () => CancellationTool.clear();
window.toggleActionFields = () => CancellationTool.toggleActionFields();