const currency = "€";
let compoundInterestArray = []; //Data types are defined by the pushes post calc

const initialInvestment = document.forms["values"]["initial"];
const monthlyInvestment = document.forms["values"]["monthly"];
const years = document.forms["values"]["duration"];
const annualRate = document.forms["values"]["return"];

function inputFormat () {

}

function validateForm() {
  if(years.valueAsNumber > 99) years.value = 99;
  if(annualRate.valueAsNumber > 100) annualRate.value = 100;

  if(initialInvestment.value === "") initialInvestment.value = 0;
  if(monthlyInvestment.value === "") monthlyInvestment.value = 0;
  if(years.value === "") years.value = 1;
  if(annualRate.value === "") annualRate.value = 0;
  calculateFV();
}

function calculateFV(){
    compoundInterestArray = []; //Make sure it is reset

    const totalResult = document.getElementById("total-result");
    const interestResult = document.getElementById("interest-result");
    const investedResult = document.getElementById("invested-result");

    const totalResultMessage = "Kokonaissumma: "
    const interestResultMessage = "Kokonaistuotto: "
    const investedResultMessage = "Kokonaissijoitus: "

    if(monthlyInvestment === "0")
      totalResult.innerHTML = totalResultMessage + simpleRate(initialInvestment.valueAsNumber, annualRate.valueAsNumber, years.valueAsNumber).toLocaleString("fi-FI") + currency;
    else
        totalResult.innerHTML = totalResultMessage + 
        compoundInterest(initialInvestment.valueAsNumber, monthlyInvestment.valueAsNumber, annualRate.valueAsNumber, years.valueAsNumber).toLocaleString("fi-FI") + currency;

    interestResult.innerHTML = interestResultMessage + compoundInterestArray[compoundInterestArray.length-1].interest.toLocaleString("fi-FI") + currency;
    investedResult.innerHTML = investedResultMessage + compoundInterestArray[compoundInterestArray.length-1].invested.toLocaleString("fi-FI") + currency;
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

let chart;

 function doChart() { 
  const yearValues = compoundInterestArray.map(year => year.years)
  const interestValues = compoundInterestArray.map(year => year.interest.toFixed(2));
  const investedValues = compoundInterestArray.map(year => year.invested.toFixed(2));
  const accumulationValues = compoundInterestArray.map(year => year.accumulatedValue.toFixed(2));
  
  if(chart != null) chart.destroy(); //need to destroy in chart js before redrawing or will cause exception

  chart = new Chart("chart", {
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
            label: "Loppusumma",
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
            ticks: {
              callback: (val) => {
                return val.toLocaleString("fi-FI") + currency;
              }
            }
          }
        }
      }
  });
}