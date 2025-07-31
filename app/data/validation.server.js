function isValidTitle(value) {
  console.log('Validating title:', value);
  return value && value.trim().length >= 3;
}

function isValidAmount(value) {
  const amount = parseFloat(value);
  return !isNaN(amount) && amount > 0;
}

function isValidDate(value) {
  return value && new Date(value).getTime() < new Date().getTime();
}

export function validateExpenseInput(input) {
  let validationErrors = {};
  console.log('Validating expense input:', input);
  if (!isValidTitle(input.title)) {
    validationErrors.title = 'Title must be at least 3 characters long.';
  }

  if (!isValidAmount(input.amount)) {
    validationErrors.amount =
      'Invalid amount. Must be a number greater than zero.';
  }

  if (!isValidDate(input.date)) {
    validationErrors.date = 'Invalid date. Must be a date before today.';
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}
