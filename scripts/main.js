import {
  new_transaction,
  delete_transaction,
  update_transaction,
  get_transaction,
} from "./state.js";
import { show_transaction, update_dashboard } from "./ui.js";
import { check_validation_regex } from "./validators.js";
import { search_regex_checker } from "./search.js";
import { config_base_setting } from "./storage.js";

let nav_items = document.querySelectorAll(".nav-links a");
let section_part = document.querySelectorAll("main > section");
const adding_form = document.querySelector("#adding-form");
const table_body = document.querySelector("#transaction-table");

for (let i = 0; i < nav_items.length; i++) {
  nav_items[i].addEventListener("click", function (e) {
    e.preventDefault();
    nav_items.forEach((nav) => nav.classList.remove("active"));
    section_part.forEach((section) => section.classList.remove("active"));
    this.classList.add("active");
    let target_nav = this.getAttribute("href").substring(1);
    document.getElementById(target_nav).classList.add("active");
  });
}

show_transaction();
update_dashboard();
search_regex_checker();
config_base_setting();

table_body.addEventListener("click", (e) => {
  const id = e.target.getAttribute("data-id");

  if (e.target.classList.contains("delete-btn")) {
    if (confirm("Delete this record?")) {
      delete_transaction(id);
      show_transaction();
      update_dashboard();
      document.querySelector("#search-input").dispatchEvent(new Event("keyup"));
    }
  }

  if (e.target.classList.contains("edit-btn")) {
    const allData = get_transaction();
    const item = allData.find((t) => t.id === id);

    document.getElementById("name").value = item.description;
    document.getElementById("amount").value = item.amount;
    document.getElementById("date").value = item.date;
    document.getElementById("category").value = item.category;
    document.getElementById("base-id").value = id;

    document.querySelector("a[href='#show-add-edit']").textContent =
      "Update Transaction";
    document.querySelector("a[href='#show-add-edit']").click();
  }
});

adding_form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("base-id").value;

  const Data = {
    name: document.getElementById("name").value,
    amount: document.getElementById("amount").value,
    date: document.getElementById("date").value,
    category: document.getElementById("category").value,
  };

  const check_name = check_validation_regex("name", Data.name);
  const check_amount = check_validation_regex("amount", Data.amount);
  const check_date = check_validation_regex("date", Data.date);

  document.getElementById("error-name-msg").textContent = check_name;
  document.getElementById("error-amount-msg").textContent = check_amount;

  if (check_name == "" && check_amount == "" && check_date == "") {
    if (id) {
      update_transaction(id, Data);
      document.getElementById("base-id").value = "";
      document.querySelector("a[href='#show-add-edit']").textContent =
        "Adding Transactions";
    } else {
      new_transaction(Data);
    }

    adding_form.reset();

    document.getElementById("search-input").value = "";

    show_transaction();
    update_dashboard();

    document.querySelector("a[href='#show-record']").click();
  }
});
