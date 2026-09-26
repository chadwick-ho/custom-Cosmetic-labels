(() => {
  "use strict";
  const buttons = document.querySelectorAll("[data-guide-filter]");
  const cards = document.querySelectorAll("[data-guide-category]");
  const count = document.getElementById("guide-count");
  buttons.forEach((button) => button.addEventListener("click", () => {
    const category = button.dataset.guideFilter;
    let visible = 0;
    buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    cards.forEach((card) => {
      card.hidden = category !== "All" && card.dataset.guideCategory !== category;
      if (!card.hidden) visible++;
    });
    if (count) count.textContent = visible + " guides" + (category === "All" ? "" : " in " + category);
  }));
})();
