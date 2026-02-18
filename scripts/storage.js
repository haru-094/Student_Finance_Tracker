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

  export_json_btn.addEventListener("click", function () {
    const data = get_transaction();
    const converting_data = JSON.stringify(data, null, 2);
    const json_url = new Blob([converting_data], { type: "application/json" });
    const url = URL.createObjectURL(json_url);
    const a_tag = document.createElement("a");
    a_tag.href = url;
    a_tag.download = `finance_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.append(a_tag);
    a_tag.click();
    document.body.removeChild(a);
  });

  import_json_input.addEventListener("change", function (e) {
    const upload_file = e.target.file[0];
    if (!upload_file) {
      return;
    }

    const file_read = new FileReader();
    file_read.onload = function (e) {
      try {
        const import_data = JSON.parse(e.target.result);
        if (Array.isArray(import_data)) {
          if (
            confirm("This will make overwrite on your data, will continue?")
          ) {
            localStorage.setItem(
              "finance_data_local",
              JSON.stringify(import_data),
            );
            location.reload();
          }
        } else {
          alert("invaild json file");
        }
      } catch (error) {
        alert("error on reading the file");
      }
    };
    file_read.readAsText(upload_file);
  });
}
