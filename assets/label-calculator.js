(() => {
  "use strict";
  const form = document.getElementById("label-calculator");
  if (!form) return;
  const result = document.getElementById("calculation-result");
  const quote = document.getElementById("calculator-quote");
  form.addEventListener("input", () => { result.hidden = true; quote.hidden = true; });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    quote.hidden = true;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const units = data.get("units");
    const diameter = Number(data.get("diameter"));
    const height = Number(data.get("height"));
    const gap = Number(data.get("gap"));
    const quantity = Number(data.get("quantity"));
    const designs = Number(data.get("designs"));
    const width = Math.PI * diameter - gap;
    const valid = ["mm","in"].includes(units) &&
      [diameter,height,gap,quantity,designs].every(Number.isFinite) &&
      diameter > 0 && height > 0 && gap >= 0 && width > 0 &&
      Number.isInteger(quantity) && quantity > 0 &&
      Number.isInteger(designs) && designs > 0;
    result.hidden = false;
    result.dataset.error = String(!valid);
    if (!valid) {
      result.textContent = "Check your measurements. The seam gap must be smaller than the bottle circumference, and quantities must be positive whole numbers.";
      return;
    }
    const round = (n, digits) => Number(n.toFixed(digits)).toLocaleString("en-US", {maximumFractionDigits:digits});
    const digits = units === "in" ? 3 : 1;
    const dimensions = round(width,digits) + " × " + round(height,digits) + " " + units;
    const metric = units === "in" ? " (" + round(width*25.4,1) + " × " + round(height*25.4,1) + " mm)" : "";
    const quantities = round(quantity,0) + " labels per design × " + round(designs,0) + " designs = " + round(quantity*designs,0) + " labels total";
    result.textContent = "Estimated label width × height: " + dimensions + metric + "\n" + quantities +
      "\nPreliminary geometry only. Confirm fit with a paper mockup and final printer dieline before production. No bleed is included.";
    const params = new URLSearchParams({
      labelSize: dimensions + metric + " (preliminary estimate)",
      quantity: quantities,
      message: "Calculator inputs: diameter " + diameter + " " + units + ", seam gap " + gap + " " + units + ". Please confirm final label fit and dieline."
    });
    quote.href = "contact.html?" + params.toString() + "#quote-form";
    quote.hidden = false;
  });
})();
