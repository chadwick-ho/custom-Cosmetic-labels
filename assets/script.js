(function () {
  const mobileMenu = document.querySelector(".mobile-menu");
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => mobileMenu.removeAttribute("open"));
    });
  }

  document.querySelectorAll("form[data-quote-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const button = form.querySelector("button[type='submit']");
      const success = form.querySelector(".success");
      if (button) button.textContent = "Requirements Sent";
      if (success) success.hidden = false;
    });
  });
})();
