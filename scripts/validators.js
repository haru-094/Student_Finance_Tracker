// main regex rule
const name_regex = /^\S(?:.*\S)?$/;
const amount_regex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
const date_regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const category_regex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
const duplicate_regex = /\b(\w+)\s+\1\b/;

function check_validation_regex(field_name, val) {
  if (field_name === "name") {
    if (!name_regex.test(val)) {
      return "There is error on the Name. contain some leading";
    }
    if (duplicate_regex.test(val)) {
      return "There is duplicate word";
    }
  }

  if (field_name === "amount") {
    if (!amount_regex.test(val)) {
      return "Enter vaild Number";
    }
  }

  if (field_name === "date") {
    if (!date_regex.test(val)) {
      return "Enter vaild date";
    }
  }

  if (field_name === "category") {
    if (!category_regex.test(val)) {
      return "Choose correct category";
    }
  }

  // if everything go right
  return "";
}
