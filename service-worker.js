// This is the service worker script, which executes in its own context
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.

console.log("This prints to the console of the service worker (background script)\n The background script is the middle man.\n The background script receives messages from the popup.js and sends messages to the gptScript.js");

// Importing and using functionality from external files is also possible.
importScripts('service-worker-utils.js')

// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.


// chrome.runtime.onMessage.addListener(
//     function(message, sender, sendResponse) {
//         console.log('Message: ' + message.prompt);

//         (async function() {
//             const tab = await chrome.tabs.create({ url: "https://chat.openai.com/" });
//             console.log('OpenAI tab: ', tab);
//             const gptResponse = await chrome.tabs.sendMessage(tab.id, message);
//             sendResponse(gptResponse);
//         })();

//         return true;
//     }
// )

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log('Message: ' + message.prompt);

    chrome.tabs.create({ url: "https://chat.openai.com/" }, function(tab) {
        console.log('OpenAI tab: ', tab);

        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, tab) {
            if (tabId === tab.id && changeInfo.status === 'complete') {
                chrome.tabs.sendMessage(tab.id, message);
                chrome.tabs.onUpdated.removeListener(listener);
            }
        });
    });

    return true;
});
