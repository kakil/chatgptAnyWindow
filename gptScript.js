console.log('Hi, I am the GPT Script');

chrome.runtime.onMessage.addListener(

    function(message, sender, sendResponse) {

        console.log('Message from backend: ', message.prompt);
        const textArea = document.querySelector('textarea');
        textArea.value = message.prompt;
        const button = textArea.nextElementSibling;
        button.disabled = false;
        button.click();
        
        return true;
    }
);