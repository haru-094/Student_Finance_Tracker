// import the function from diffrenet files
import { new_transaction } from "./state.js";
import { show_transaction } from "./ui.js";
import { check_validation_regex } from "./validators.js";

// main var to handle the app
let nav_items = document.querySelectorAll(".nav-links a");
let section_part = document.querySelectorAll("main > section");
const adding_form = document.querySelector("#adding-form");

// for loop that go through the link (a) then change the section based on the click
for (let i = 0; i < nav_items.length; i++) {
  nav_items[i].addEventListener("click", function (e) {
    e.preventDefault();
    nav_items.forEach((nav) => nav.classList.remove("active"));
    section_part.forEach((section) => section.classList.remove("active"));

    this.classList.add("active");
    let target_nav = this.getAttribute("href").substring(1);
    document.getElementById(target_nav).classList.add("active");

    // for (let j = 0; j < nav_items.length; j++) {
    //   nav_items[j].classList.remove("active");
    // }
    // this.classList.add("active");

    // for (let k = 0; k < section_part.length; k++) {
    //   section_part[k].classList.remove("active");
    // }
    // let targetId = this.getAttribute("href").substring(1);
    // document.getElementById(targetId).classList.add("active");
  });
}

// handle the record
show_transaction();

adding_form.addEventListener("submit", function (e) {
  e.preventDefault();

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

  console.log("vaild res: ", { check_name, check_amount, check_date });
  if (check_name == "" && check_amount == "" && check_date == "") {
    new_transaction(Data);
    adding_form.reset();
    show_transaction();

    document.querySelector("a[href='#show-record']").click();
  }
});
