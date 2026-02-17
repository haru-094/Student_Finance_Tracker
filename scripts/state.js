let transaction = JSON.parse(localStorage.getItem("finance_data_local")) || [];

export function new_transaction(data) {
  let record_new = {
    id: `record_${Date.now()}`,
    description: data.name,
    amount: parseFloat(data.amount),
    category: data.category,
    date: data.date,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  transaction.push(record_new);
  localStorage.setItem("finance_data_local", JSON.stringify(transaction));
  return record_new;
}

export function delete_transaction(id) {
  transaction = transaction.filter((item) => item.id !== id);
  localStorage.setItem("finance_data_local", JSON.stringify(transaction));
}

export function update_transaction(id, updatedData) {
  const index = transaction.findIndex((t) => t.id === id);
  if (index !== -1) {
    transaction[index] = {
      ...transaction[index],
      description: updatedData.name,
      amount: parseFloat(updatedData.amount),
      date: updatedData.date,
      category: updatedData.category,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("finance_data_local", JSON.stringify(transaction));
  }
}

export function get_transaction() {
  return transaction;
}
