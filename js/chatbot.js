// Simple Chatbot for Elna Construction
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeChatbot = document.querySelector('.close-chatbot');
    const chatbotBody = document.getElementById('chatbotBody');
    const quickOptions = document.querySelectorAll('.btn-option');
    
    // Toggle chatbot visibility
    if (chatbotToggle && chatbotContainer) {
        chatbotToggle.addEventListener('click', function() {
            chatbotContainer.style.display = chatbotContainer.style.display === 'block' ? 'none' : 'block';
        });
        
        closeChatbot.addEventListener('click', function() {
            chatbotContainer.style.display = 'none';
        });
        
        // Close chatbot when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.chatbot-widget') && chatbotContainer.style.display === 'block') {
                chatbotContainer.style.display = 'none';
            }
        });
    }
    
    // Add message to chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = text;
        chatbotBody.appendChild(messageDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
    
    // Handle quick option clicks
    quickOptions.forEach(option => {
        option.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const action = this.getAttribute('data-action');
            
            // Add user message
            addMessage(this.textContent, true);
            
            // Handle based on selection
            setTimeout(() => {
                if (product) {
                    handleProductSelection(product);
                } else if (action === 'quote') {
                    handleQuoteRequest();
                }
            }, 500);
        });
    });
    
    // Handle product selection
    function handleProductSelection(product) {
        let response = '';
        let redirectUrl = '';
        
        switch(product) {
            case 'steel':
                response = 'Great choice! We have a wide range of steel products including rebar, beams, and hollow sections. Would you like to view our steel products or request a quote?';
                redirectUrl = 'products/steel.html';
                break;
            case 'ceramic':
                response = 'Excellent! We offer premium ceramic and porcelain tiles in various sizes and finishes. Would you like to see our tile collection or get a quote?';
                redirectUrl = 'products/ceramic.html';
                break;
            case 'tabs':
                response = 'Perfect! We supply industrial hygiene products including antibacterial handwash tabs. Would you like to see our products or request pricing?';
                redirectUrl = 'products/tabs.html';
                break;
        }
        
        addMessage(response);
        
        // Add action buttons
        setTimeout(() => {
            const actionDiv = document.createElement('div');
            actionDiv.className = 'quick-options mt-2';
            actionDiv.innerHTML = `
                <button class="btn-option action-btn" data-action="view" data-url="${redirectUrl}">View Products</button>
                <button class="btn-option action-btn" data-action="quote" data-product="${product}">Request Quote</button>
            `;
            chatbotBody.appendChild(actionDiv);
            
            // Add event listeners to new buttons
            document.querySelectorAll('.action-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const action = this.getAttribute('data-action');
                    const url = this.getAttribute('data-url');
                    const product = this.getAttribute('data-product');
                    
                    addMessage(this.textContent, true);
                    
                    setTimeout(() => {
                        if (action === 'view') {
                            window.location.href = url;
                        } else if (action === 'quote') {
                            redirectToQuoteForm(product);
                        }
                    }, 500);
                });
            });
        }, 500);
    }
    
    // Handle quote request
    function handleQuoteRequest() {
        addMessage('I can help you request a quote. Which product are you interested in?');
        
        setTimeout(() => {
            const productOptions = document.createElement('div');
            productOptions.className = 'quick-options mt-2';
            productOptions.innerHTML = `
                <button class="btn-option quote-option" data-product="steel">Steel</button>
                <button class="btn-option quote-option" data-product="ceramic">Ceramic Tiles</button>
                <button class="btn-option quote-option" data-product="tabs">Handwash Tabs</button>
                <button class="btn-option quote-option" data-product="other">Other Products</button>
            `;
            chatbotBody.appendChild(productOptions);
            
            document.querySelectorAll('.quote-option').forEach(btn => {
                btn.addEventListener('click', function() {
                    const product = this.getAttribute('data-product');
                    addMessage(this.textContent, true);
                    setTimeout(() => {
                        redirectToQuoteForm(product);
                    }, 500);
                });
            });
        }, 500);
    }
    
    // Redirect to appropriate quote form
    function redirectToQuoteForm(product) {
        let formUrl = '';
        
        switch(product) {
            case 'steel':
                formUrl = 'products/steel.html#quoteForm';
                break;
            case 'ceramic':
                formUrl = 'products/ceramic.html#quoteForm';
                break;
            case 'tabs':
                formUrl = 'products/tabs.html#quoteForm';
                break;
            default:
                formUrl = 'contact.html';
        }
        
        addMessage(`Redirecting you to the ${product} quote form...`);
        
        setTimeout(() => {
            window.location.href = formUrl;
            chatbotContainer.style.display = 'none';
        }, 1500);
    }
    
    // Initialize with welcome message
    setTimeout(() => {
        addMessage('Welcome to Elna Construction! How can I assist you today?');
    }, 1000);
});