const inputs = document.querySelectorAll('.input');
const day_El = document.querySelector('#date');
const month_El = document.querySelector('#month');
const year_El = document.querySelector('#year');
const daysOutput_El = document.querySelector('#days-output');
const monthsOutput_El = document.querySelector('#months-output');
const yearsOutput_El = document.querySelector('#years-output');
const calculate_Btn = document.querySelector('#calculate-btn');

// Add input validation
const validateInput = (input, id) => {
  const value = input.value.trim();
  if (value === '') {
    document.querySelector(`.err-${id}`).textContent = `${id} is required`;
    return false;
  }
  if (id === 'date') {
    const day = parseInt(value);
    if (isNaN(day) || day < 1 || day > 31) {
      document.querySelector(`.err-${id}`).textContent = 'Invalid day';
      return false;
    }
    const maxDays = new Date(year_El.value, month_El.value, 0).getDate();
    if (day > maxDays) {
      document.querySelector(`.err-${id}`).textContent = 'Invalid date';
      return false;
    }
  } else if (id === 'month') {
    const month = parseInt(value);
    if (isNaN(month) || month < 1 || month > 12) {
      document.querySelector(`.err-${id}`).textContent = 'Invalid month';
      return false;
    }
  } else if (id === 'year') {
    const year = parseInt(value);
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
      document.querySelector(`.err-${id}`).textContent = 'Invalid year';
      return false;
    }
  }
  return true;
};

// Use stricter comparison operators and add input formatting
inputs.forEach((input) => {
  const id = input.getAttribute('id');
  let parent = input.parentElement;
  let errMsg = document.createElement('p');
  parent.append(errMsg);
  errMsg.classList.add(`err-${id}`);
  errMsg.classList.add(`err`);
  input.addEventListener('blur', () => {
    if (validateInput(input, id)) {
      input.value = input.value.padStart(2, '0');
      document.querySelector(`.err-${id}`).textContent = '';
      parent.classList.remove('err');
    } else {
      parent.classList.add('err');
    }
  });
});

const calcAge = () => {
  let validInputs = true;
  // Check if all inputs are valid
  inputs.forEach((input) => {
    const id = input.getAttribute('id');
    const parent = input.parentElement;
    if (!validateInput(input, id)) {
      validInputs = false;
      parent.classList.add('err');
    } else {
      parent.classList.remove('err');
    }
  });
  if (!validInputs) {
    resetFields();
    return;
  }

  try {
    const now = new Date();
    let day = now.getDate() - parseInt(day_El.value);
    let month = now.getMonth() + 1 - parseInt(month_El.value);
    let year = now.getFullYear() - parseInt(year_El.value);

    if (day < 0) {
      month--;
      const daysInMonth = new Date(year_El.value, month_El.value, 0).getDate();
      day += daysInMonth;
    }

    if (month < 0) {
      year--;
      month += 12;
    }

    if (year < 0) {
      resetFields();
      return;
    }

    daysOutput_El.textContent = day;
    monthsOutput_El.textContent = month;
    yearsOutput_El.textContent = year;
  } catch (err) {
    console.error(err);
    resetFields();
    return;
  }
};

const resetFields = () => {
  daysOutput_El.textContent = '--';
  monthsOutput_El.textContent = '--';
  yearsOutput_El.textContent = '--';
};

calculate_Btn.addEventListener('click', calcAge);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') calcAge();
});
