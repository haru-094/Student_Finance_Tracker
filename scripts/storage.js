import { get_transaction } from "./state.js";
import { show_transaction, update_dashboard } from "./ui.js";

export function config_base_setting() {
  const budget_input = document.querySelector("#budget-cap");
  const save_budget_btn = document.querySelector("#save-budget-cap");
  const export_json_btn = document.querySelector("#export-json");
  const import_json_input = document.querySelector("#import-json");

  const currencySelect = document.querySelector("#currency-select");
  const rwfInput = document.querySelector("#rwf-rate");
  const sarInput = document.querySelector("#sar-rate");

  const savedBudget = localStorage.getItem("budget_cap");
  if (savedBudget) budget_input.value = savedBudget;

  const savedCurrency = localStorage.getItem("app_currency");
  if (savedCurrency) currencySelect.value = savedCurrency;

  const savedRwf = localStorage.getItem("rate_rwf");
  if (savedRwf) rwfInput.value = savedRwf;

  const savedSar = localStorage.getItem("rate_sar");
  if (savedSar) sarInput.value = savedSar;

  update_dashboard();
  show_transaction();

  save_budget_btn.addEventListener("click", () => {
    if (budget_input.value) {
      localStorage.setItem("budget_cap", budget_input.value);
      alert("Settings Saved!");
      update_dashboard();
    }
  });

  function updateCurrencySettings() {
    localStorage.setItem("app_currency", currencySelect.value);
    localStorage.setItem("rate_rwf", rwfInput.value);
    localStorage.setItem("rate_sar", sarInput.value);

    update_dashboard();
    show_transaction();
  }

  currencySelect.addEventListener("change", updateCurrencySettings);
  rwfInput.addEventListener("input", updateCurrencySettings);
  sarInput.addEventListener("input", updateCurrencySettings);

  export_json_btn.addEventListener("click", () => {
    const data = get_transaction();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `finance_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  importInput.addEventListener("change", (e) => {
    const file_reader = e.target.files[0];
    if (!file_reader) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const importedData = JSON.parse(e.target.result);
        if (Array.isArray(importedData)) {
          if (confirm("Overwrite data?")) {
            localStorage.setItem(
              "finance_data_local",
              JSON.stringify(importedData),
            );
            location.reload();
          }
        } else {
          alert("Invalid JSON");
        }
      } catch (err) {
        alert("Error reading file");
      }
    };
    reader.readAsText(file_reader);
  });
}
