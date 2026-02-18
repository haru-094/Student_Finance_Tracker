import { get_transaction } from "./state.js";

export function update_dashboard() {
  const data = get_transaction();
  const budget =
    parseFloat(document.getElementById("budget-cap").value) ||
    parseFloat(localStorage.getItem("budget-cap")) ||
    0;

  const totalSpent = data.reduce((sum, item) => sum + Number(item.amount), 0);

  const counts = {};
  let topCat = "None";
  let maxCount = 0;
  data.forEach((item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    if (counts[item.category] > maxCount) {
      maxCount = counts[item.category];
      topCat = item.category;
    }
  });

  document.getElementById("show-spent").textContent =
    `$${totalSpent.toFixed(2)}`;
  document.getElementById("show-remaining").textContent =
    `$${(budget - totalSpent).toFixed(2)}`;
  document.getElementById("show-category").textContent = topCat;
  document.getElementById("show-total-record").textContent = data.length;

  const alertBox = document.getElementById("alert-budget");
  if (budget > 0 && totalSpent > budget) {
    alertBox.textContent = "Warning: Budget Exceeded!";
    alertBox.className = "alert-danger";
    alertBox.style.display = "block";
  } else {
    alertBox.style.display = "none";
  }
}

export function show_transaction(data = null, search_regex = null) {
  const table_body = document.querySelector("#transaction-table");
  const transaction_data = data || get_transaction();

  table_body.innerHTML = "";

  if (transaction_data.length === 0) {
    table_body.innerHTML = "<tr><td colspan='5'>No Transaction</td></tr>";
    return;
  }

  transaction_data.forEach((td) => {
    let show_name = td.description;

    if (search_regex && search_regex.test(td.description)) {
      const regex_flag = new RegExp(
        search_regex.source,
        search_regex.flags + "g",
      );
      show_name = td.description.replace(
        regex_flag,
        (match) => `<mark>${match}</mark>`,
      );
    }

    const row = document.createElement("tr");
    row.innerHTML = `
        <td data-label='Name'>${show_name}</td>
        <td data-label='Date'>${td.date}</td>
        <td data-label='Amount'>$${Number(td.amount).toFixed(2)}</td>
        <td data-label='Category'>${td.category}</td>
        <td data-label='Action'>
            <button class="edit-btn" data-id="${td.id}">Edit</button>
            <button class="delete-btn" data-id="${td.id}">Delete</button>
        </td>
    `;
    table_body.appendChild(row);
  });
}
