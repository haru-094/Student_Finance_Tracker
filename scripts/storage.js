import { get_transaction } from "./state";
import { show_transaction, update_dashboard } from "./ui";

export function config_base_setting() {
  const budget_input = document.querySelector("#budget-cap");
  const save_budget_btn = document.querySelector("#save-budget-cap");
  const export_json_btn = document.querySelector("export-json");
  const import_json_input = document.querySelector("import-json");

  const get_budget_local = localStorage.getItem("budget-cap");
  if (get_budget_local) {
    budget_input.value = get_budget_local;
    update_dashboard();
  }

  save_budget_btn.addEventListener("click", function () {
    const value = budget_input.value;
    if (value) {
      localStorage.setItem("budget-cap", value);
      alert("Budget saved successful");
      update_dashboard();
    }
  });
}
