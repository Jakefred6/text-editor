// Get the install button element
const installButton = document.getElementById("buttonInstall");

// Event listener for beforeinstallprompt event, triggered when the app is ready to be installed
window.addEventListener("beforeinstallprompt", (event) => {
  // Store the event for later use
  window.deferredPrompt = event;
  // Make the install button visible
  installButton.classList.toggle("hidden", false);
});

// Event listener for button click to install the app
installButton.addEventListener("click", async () => {
  // Get the stored install prompt event
  const promptEvent = window.deferredPrompt;

  // If there's no prompt event, return
  if (!promptEvent) {
    return;
  }

  // Trigger the installation prompt
  promptEvent.prompt();
  // Reset the deferred prompt
  window.deferredPrompt = null;

  // Hide the install button
  installButton.classList.toggle("hidden", true);
});

// Event listener for appinstalled event, triggered after the app is successfully installed
window.addEventListener("appinstalled", (event) => {
  // Reset the deferred prompt
  window.deferredPrompt = null;
});
