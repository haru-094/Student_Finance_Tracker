import { get_transaction } from "./state.js";
import { show_transaction } from "./ui.js";

export function search_regex_checker() {
  const search_input = document.querySelector("#search-input");
  const search_case_toggle = document.querySelector("#search-case-toggle");
  const sort_selection = document.querySelector("#sort-items");

  function refresh_view() {
    const value = search_input.value;
    const sortType = sort_selection.value;
    let data = [...get_transaction()];

    if (sortType === "based-amount") {
      data.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
    } else if (sortType === "based-date") {
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (!value) {
      show_transaction(data);
      return;
    }

    try {
      const flag = search_case_toggle.checked ? "i" : "";
      const regex = new RegExp(value, flag);

      const regex_filter_data = data.filter((item) => {
        return regex.test(item.description) || regex.test(item.category);
      });

      show_transaction(regex_filter_data, regex);
    } catch (error) {
      console.log("Waiting for valid regex");
    }
  }

  search_input.addEventListener("keyup", refresh_view);
  search_case_toggle.addEventListener("change", refresh_view);
  sort_selection.addEventListener("change", refresh_view);
}
