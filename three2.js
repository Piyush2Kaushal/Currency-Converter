const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let select = document.querySelectorAll(".select");

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(const mychoice of select){
    for(const myoption in countryList){
       let options = document.createElement("option");
       options.value = myoption;
       options.innerText = myoption;
       mychoice.appendChild(options);
    }


    mychoice.addEventListener("change",(evt)=>{
        UpdateEvent(evt.target);
    });
}
const updateExchangeRate = async () => {
    let amount = document.querySelector(".box2 input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
  
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  };

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
