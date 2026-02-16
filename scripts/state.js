let transaction = JSON.parse(localStorage.getItem("finance_data_local")) || [];

export function new_transaction(data) {
  let record_new = {
    id: `record_${Date.now()}`,
    description: data.name,
    amount: data.amount,
    category: data.category,
    date: data.date,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  transaction.push(record_new);
  localStorage.setItem("finance_data_local", JSON.stringify(transaction));
  return record_new;
}

export function get_transaction() {
  return transaction;
}
