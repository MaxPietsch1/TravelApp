// Store countdown data in server with the route "/countdownData"
const postCountdown = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log("Data from postCountdown", newData);
    return newData;
  } catch (error) {
    console.log("Error postCountdown", error);
  }
};

function countdown() {
  // get year, month, day value from class="countdown-departure" in index.html
  const year = document.getElementById("year");
  const month = document.getElementById("month");
  const day = document.getElementById("day");
  const departure = [year.value, month.value, day.value];

  // calculate how many days until departure
  //stackoverflow.com/questions/11112497/javascript-countdown-with-year-month-day
  const today = new Date();
  const BigDay = new Date(departure);
  const msPerDay = 24 * 60 * 60 * 1000;
  const timeLeft = BigDay.getTime() - today.getTime();
  const e_daysLeft = timeLeft / msPerDay;
  let daysLeft = Math.floor(e_daysLeft);
  let yearsLeft = 0;
  if (daysLeft > 365) {
    yearsLeft = Math.floor(daysLeft / 365);
    daysLeft = daysLeft % 365;
  }
  const addedDaysLeft = daysLeft + 1;

  // Display the countdown on the DOM
  const daysLeftDisplay = document.getElementById("days-left");

  if (yearsLeft == 0 && addedDaysLeft == 0) {
    daysLeftDisplay.innerHTML = "Your flight is today";
  } else if (yearsLeft <= 0 && addedDaysLeft <= 0) {
    daysLeftDisplay.innerHTML = "all the flights has passed";
  } else if (yearsLeft == 0 && addedDaysLeft == 1) {
    daysLeftDisplay.innerHTML = "Your flight is tomorrow";
  } else if (yearsLeft == 0 && addedDaysLeft <= 366) {
    daysLeftDisplay.innerHTML = `Your flight is in ${addedDaysLeft} days`;
  } else if (yearsLeft == 1) {
    daysLeftDisplay.innerHTML = `${yearsLeft} year and 
        ${addedDaysLeft} days until departure`;
  } else {
    daysLeftDisplay.innerHTML = `${yearsLeft} years and 
        ${addedDaysLeft} days until departure`;
  }

  postCountdown("http://localhost:8000/countdownData", {
    // departureDate: departure,
    yearsLeft: yearsLeft,
    daysLeft: addedDaysLeft,
  });
}

export { countdown };

export function msPerDay() {
  return 24 * 60 * 60 * 1000;
}

const msPerDayy = 24 * 60 * 60 * 1000;

console.log(msPerDayy);
