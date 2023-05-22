const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// let last_year_months = [];
// let this_year = [];
// let last11months = [...last_year_months, ...this_year];
// let curr_month = new Date().getMonth();
// console.log(curr_month);

// for (let i = curr_month + 1; i < months.length; i++) {
//   let element = months[i];
//   //   console.log(element);
//   last_year_months.push(element);
// }
// console.log(last_year_months);

// for (let i = curr_month - 1; i < months.length; i--) {
//   let element = months[i];
//   console.log(element);
//   this_year.unshift(element);
//   if (i === 0) break;
// }
// console.log(last_year_months);
// console.log(this_year);

// console.log(last11months);

let last_year_months = [];
let curr_year_months = [];

let curr_month = new Date().getMonth();

for (let i = curr_month + 1; i < months.length; i++) {
  let element = months[i];
  last_year_months.push(element);
}
console.log(last_year_months);

for (let i = curr_month; i < months.length; i--) {
  let element = months[i];
  curr_year_months.unshift(element);
  if (i === 0) break;
}

let labels = [...last_year_months, ...curr_year_months];
console.log(curr_year_months);

console.log(labels);
