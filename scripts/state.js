let transaction = JSON.parse(localStorage.getItem("finance_data_local"));

function new_transaction(data) {
  let record_new = {
    id: `record_${Date.now()}`,
    name: data.name,
    amount: data.amount,
    category: data.category,
    date: Date.date,
  };

  transaction.push(record_new);
  localStorage.setItem("finance_data_local", JSON.stringify(transaction));
  return record_new;
}

function get_transaction() {
  return transaction;
}
