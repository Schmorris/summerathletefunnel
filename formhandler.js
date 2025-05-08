// formhandler.js – unify quiz & freeworkoutgate form handling

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const email = form.querySelector('input[type="email"]');
  const consent = form.querySelector('input[type="checkbox"]');
  const errorBox = form.querySelector('.consent-error');

  if (consent && !consent.checked) {
    if (errorBox) errorBox.style.display = 'block';
    return false;
  } else {
    if (errorBox) errorBox.style.display = 'none';
  }

  const formData = new FormData(form);

  // Send form data to Zapier in the background
  fetch(form.action, {
    method: "POST",
    body: formData
  }).catch((err) => {
    console.error("Form submission failed:", err);
  });

  // Redirect immediately after a tiny delay to avoid JSON output
  setTimeout(() => {
    window.location.href = "index.html";
  }, 10);

  return false;
}

// Optional: auto-attach to forms with class="js-zapform"
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("form.js-zapform").forEach(form => {
    form.onsubmit = handleFormSubmit;
  });
});
