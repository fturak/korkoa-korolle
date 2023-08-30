const currency = "€"; // Could make this an input in future but may hinder UX with complexity
const resultMessage = "Loppusumma: ";
let compoundInterestArray = []; //Data types are defined by pushes

function validateForm() {
  const monthlyValue = document.forms["values"]["monthly"];
  const durationValue = document.forms["values"]["duration"];
  const returnValue = document.forms["values"]["return"];

  if (durationValue.valueAsNumber > 99) {
    alert("Maksimaalinen sijoitusaika on 99 vuotta");
    return false;
  }
  if(returnValue.valueAsNumber > 100) {
    alert("Maksimaalinen vuosituotto on 100%");
    return false;
  }
  if(monthlyValue.value === "") monthlyValue.value = 0;
  calculateFV();
}

function calculateFV(){
    let initialInvestment = document.getElementById("initialInvestment").valueAsNumber;
    let monthlyInvestment = document.getElementById("monthlyInvestment").valueAsNumber;
    let annualRate = document.getElementById("annualRate").valueAsNumber;
    let years = document.getElementById("years").valueAsNumber;

    const result = document.getElementById("result");

    if(monthlyInvestment === "0") return resultMessage + 
      (result.innerHTML = resultMessage + simpleRate(initialInvestment, annualRate, years).toFixed(2) + currency); //Make the input field always 0 if it is emptied
    else return (result.innerHTML = resultMessage + 
      compoundInterest(initialInvestment, monthlyInvestment, annualRate, years).toFixed(2) + currency);
}

function simpleRate (investment, annualRate, years) {
    return investment * (1 + annualRate / 100 * years);
}

function compoundInterest (initialInvestment, monthlyInvestment, annualRate, years) {
    var monthlyRate = annualRate / 100 / 12; // In 0.45 format so is missing the 1 if used in calcs
    var months = 12;
    var accumulatedValue = 0;

    for (let i = 1; i <= years; i++) {

        //End value of each year
        accumulatedValue = (initialInvestment * Math.pow(1 + monthlyRate, months * i) +
        (monthlyInvestment * (Math.pow(1 + monthlyRate, months * i) - 1)) / 
        (monthlyRate));    

        //How much user has invested in total by years
        invested = monthlyInvestment * months * i + initialInvestment;


        //How much interest in total by years
        interest = accumulatedValue - invested;

        compoundInterestArray.push({years: "vuosi " + i, accumulatedValue: accumulatedValue, invested: invested, interest: interest}); //accumulatedValue currently unused by array but remains for easy access if future needs
    }
    
    doChart();
    return accumulatedValue;
}

 function doChart() { 
  const yearValues = compoundInterestArray.map(year => year.years)
  const interestValues = compoundInterestArray.map(year => year.interest.toFixed(2));
  const investedValues = compoundInterestArray.map(year => year.invested.toFixed(2));
  const accumulationValues = compoundInterestArray.map(year => year.accumulatedValue.toFixed(2));
  
  const chart = new Chart("chart", {
    type: "bar",
    data: {
      labels: yearValues,
      datasets: [
        {
            label: "Sijoitettu pääoma",
            backgroundColor: "#00A45E",
            data: investedValues
        },    
        {
            label: "Tuotto",
            backgroundColor: "#00B625",
            data: interestValues
        },
        {
            label: "Kokonaisarvo",
            backgroundColor: "#009CA9",
            borderColor: "#009CA9",
            data: accumulationValues,
            type: "line",
        }
      ]
    },
    options: {
        responsive: true,
        maintainAspectRatio:false,
        plugins: {
            legend: {
              position: 'top',
            }
        },
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false
            }
          },
          y: {
            stacked: true,
          }
        }
      }
  });
}