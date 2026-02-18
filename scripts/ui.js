import { get_transaction } from "./state.js";

function formatMoney(amount) {
  const currency = document.querySelector("#currency-select").value || "USD";
  const rwf_rate =
    parseFloat(document.querySelector("#rwf-rate").value) || 1450;
  const sar_rate =
    parseFloat(document.querySelector("#sar-rate").value) || 3.75;

  let finalAmount = parseFloat(amount);
  let symbol = "$";

  if (currency === "RWF") {
    finalAmount = amount * rwf_rate;
    symbol = "RWF";
  } else if (currency === "SAR") {
    finalAmount = amount * sar_rate;
    symbol = "SAR";
  }

  return `${finalAmount.toFixed(2)} ${symbol}`;
}

function render_chart(data) {
  const chartContainer = document.querySelector("#trends-chart");
  if (!chartContainer) return;

  chartContainer.innerHTML = "<div class='chart-container'></div>";
  const wrapper = chartContainer.querySelector(".chart-container");

  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last7Days.push(d.toISOString().split("T")[0]);
  }

  let dailyTotals = [];
  for (let j = 0; j < last7Days.length; j++) {
    let date = last7Days[j];
    let daySum = 0;
    for (let k = 0; k < data.length; k++) {
      if (data[k].date === date) {
        daySum = daySum + Number(data[k].amount);
      }
    }
    dailyTotals.push({ date: date, amount: daySum });
  }

  let maxAmount = 1;
  for (let m = 0; m < dailyTotals.length; m++) {
    if (dailyTotals[m].amount > maxAmount) {
      maxAmount = dailyTotals[m].amount;
    }
  }

  for (let n = 0; n < dailyTotals.length; n++) {
    let day = dailyTotals[n];
    let heightPct = (day.amount / maxAmount) * 100;
    let dateLabel = new Date(day.date).toLocaleDateString("en-US", {
      weekday: "short",
    });

    const displayAmount = formatMoney(day.amount);

    const barHtml = `
      <div class="chart-bar-wrapper">
        <div class="chart-bar" style="height: ${heightPct}%;" title="${displayAmount}"></div>
        <span class="chart-label">${dateLabel}</span>
      </div>
    `;
    wrapper.insertAdjacentHTML("beforeend", barHtml);
  }
}

export function update_dashboard() {
  const data = get_transaction();
  const budgetInput =
    parseFloat(document.querySelector("#budget-cap").value) || 0;

  let totalSpentUSD = 0;
  for (let i = 0; i < data.length; i++) {
    totalSpentUSD = totalSpentUSD + Number(data[i].amount);
  }
  let remainingUSD = budgetInput - totalSpentUSD;

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

  document.querySelector("#show-spent").textContent =
    formatMoney(totalSpentUSD);
  document.querySelector("#show-remaining").textContent =
    formatMoney(remainingUSD);
  document.querySelector("#show-budget").textContent = formatMoney(budgetInput);
  document.querySelector("#show-category").textContent = topCat;
  document.querySelector("#show-total-record").textContent = data.length;

  render_chart(data);

  const alertBox = document.querySelector("#alert-budget");
  if (budgetInput > 0 && totalSpentUSD > budgetInput) {
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
        <td data-label='Amount'>${formatMoney(td.amount)}</td>
        <td data-label='Category'>${td.category}</td>
        <td data-label='Action'>
            <button class="edit-btn" data-id="${td.id}">Edit</button>
            <button class="delete-btn" data-id="${td.id}">Delete</button>
        </td>
    `;
    table_body.appendChild(row);
  });
}
