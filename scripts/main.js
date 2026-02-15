let nav_items = document.querySelectorAll(".nav-links a");
let section_part = document.querySelectorAll("main > section");

// for loop that go through the link (a) then change the section based on the click
for (let i = 0; i < nav_items.length; i++) {
  nav_items[i].addEventListener("click", function (event) {
    event.preventDefault();

    for (let j = 0; j < nav_items.length; j++) {
      nav_items[j].classList.remove("active");
    }
    this.classList.add("active");

    for (let k = 0; k < section_part.length; k++) {
      section_part[k].classList.remove("active");
    }
    let targetId = this.getAttribute("href").substring(1);
    document.getElementById(targetId).classList.add("active");
  });
}
