(() => {
  "use strict";
  const menu = document.querySelector(".mobile-menu");
  if (menu) menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.removeAttribute("open")));
  const form = document.querySelector("form[data-quote-form]");
  if (!form) return;
  const draft = document.getElementById("quote-draft");
  const message = document.getElementById("quote-message");
  const email = document.getElementById("quote-email");
  const status = document.getElementById("quote-status");
  const params = new URLSearchParams(location.search);
  ["labelSize","quantity","message"].forEach((name) => {
    if (params.has(name)) form.elements.namedItem(name).value = params.get(name).slice(0,1500);
  });
  const fields = [
    ["productType","Product type"], ["bottleType","Package type"], ["labelSize","Label size"],
    ["quantity","Quantity"], ["material","Material"], ["finish","Finish"], ["application","Application"],
    ["artworkStatus","Artwork status"], ["artwork","Artwork files (attach separately)"],
    ["whatsapp","WhatsApp"], ["email","Email"], ["country","Country"], ["message","Project notes"]
  ];
  form.addEventListener("input", () => { draft.hidden = true; status.textContent = ""; });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    message.value = "Hello YT Labels,\nPlease review my custom label requirements.\n\n" +
      fields.map(([name,label]) => label + ": " + (String(data.get(name) || "").trim() || "Not specified")).join("\n");
    email.href = "mailto:ruishengmao05@gmail.com?subject=" + encodeURIComponent("Custom label quote request") + "&body=" + encodeURIComponent(message.value);
    draft.hidden = false;
    status.textContent = "Draft ready. Nothing has been sent. Send it using your email app or WhatsApp.";
    draft.scrollIntoView({behavior:"smooth",block:"center"});
  });
  form.querySelector('button[type="submit"]').disabled = false;
  document.getElementById("quote-copy").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(message.value);
      status.textContent = "Message copied. Paste it into WhatsApp or email, add any artwork, then send.";
    } catch (_) {
      message.focus();
      message.select();
      status.textContent = "Select and copy the highlighted message manually, then paste it into WhatsApp or email.";
    }
  });
})();
