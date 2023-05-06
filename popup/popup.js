console.log('This is the initial script.\n This script sends messages to the background script ( service-worker.js )' );

document.addEventListener("DOMContentLoaded", function () {
  var promptInput = document.getElementById("prompt");
  var submitButton = document.getElementById("submit");

  console.log('Document eventlistener');
  submitButton.addEventListener("click", function () {
      console.log("PromptInput Value: " + promptInput.value);
      var promptValue = promptInput.value;
      if (promptValue) {
          console.log('Prompt Value: ' + promptValue);
          chrome.runtime.sendMessage({ action: "sendPrompt", prompt: promptValue });
      }
      console.log("Button click");
  });
});