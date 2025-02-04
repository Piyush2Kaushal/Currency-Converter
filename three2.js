const BASE_URL =
  "https://v6.exchangerate-api.com/v6/a558a240a0ff2f08c7cf6a96/latest"; // Aapki provided API URL

let select = document.querySelectorAll(".select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns with currency codes from countryList
for (const mychoice of select) {
  for (const myoption in countryList) {
    let options = document.createElement("option");
    options.value = myoption;
    options.innerText = myoption;
    mychoice.appendChild(options);
  }

  mychoice.addEventListener("change", (evt) => {
    UpdateEvent(evt.target);
  });
}

// Function to update exchange rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".box2 input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value}`; // Build URL with selected "From" currency

  try {
    let response = await fetch(URL);
    let data = await response.json();

    if (data.result === "success") {
      let rate = data.conversion_rates[toCurr.value]; // Get conversion rate for "To" currency

      if (rate) {
        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(
          2
        )} ${toCurr.value}`;
      } else {
        msg.innerText = "Currency not supported.";
      }
    } else {
      msg.innerText = "Error fetching exchange rates.";
    }
  } catch (error) {
    msg.innerText = "Error fetching data. Please try again later.";
  }
};

// Function to update flag images based on selected currency
function UpdateEvent(element) {
  let currency = element.value;
  let currencycode = countryList[currency];
  let newsr = `https://flagsapi.com/${currencycode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsr;
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
