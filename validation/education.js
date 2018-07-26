// This file contains validation logic for experience
// Validate email and password
const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  // Store errors as object
  let errors = {};

  // Use custom validation from ./is-empty
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if(Validator.isEmpty(data.school)) {
    errors.school = "School field is required."
  }

  if(Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required."
  }

  if(Validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Field of study field is required."
  }

  if(Validator.isEmpty(data.from)) {
    errors.from = "From date field is required."
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
}
