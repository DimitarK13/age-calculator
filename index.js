const day_El = document.querySelector('#date');
const month_El = document.querySelector('#month');
const year_El = document.querySelector('#year');
const daysOutput_El = document.querySelector('#days-output');
const monthsOutput_El = document.querySelector('#months-output');
const yearsOutput_El = document.querySelector('#years-output');
const calculate_Btn = document.querySelector('#calculate-btn');

const calcAge = () => {
  const now = new Date();

  let day = now.getDate() - day_El.value;
  let month = now.getMonth() + 1 - month_El.value;
  let year = now.getFullYear() - year_El.value;

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
    daysOutput_El.textContent = '--';
    monthsOutput_El.textContent = '--';
    yearsOutput_El.textContent = '--';
    return;
  }

  daysOutput_El.textContent = day;
  monthsOutput_El.textContent = month;
  yearsOutput_El.textContent = year;
};

calculate_Btn.addEventListener('click', calcAge);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') calcAge();
});
