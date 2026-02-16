import { get_transaction } from "./state.js";

function show_transaction() {
  const table_body = document.querySelector("#transaction-table");
  const transaction_data = get_transaction();

  table_body.innerHTML = "";

  if (transaction_data.length === 0) {
    table_body.innerHTML = "<tr><td colspan='5'>No Transaction</td></tr>";
    return;
  }
  transaction_data.forEach((td) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td data-label='Name'>${td.description}</td>
        <td data-label='Amount'>${Number(td.amount)}</td>
        <td data-label='Category'>${td.category}</td>
        <td data-label='Date'>${td.date}</td>
        <td data-label='Action'>
            <button class='edit-btn data-id=${td.id}>Edit</button>
            <button class='delete-btn' data-id=${td.id}>Delete</button>
        </td>
    `;
    table_body.appendChild(row);
  });
}
