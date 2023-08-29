let currency = "€"; // Could make this an input in future but may hinder UX with complexity

google.charts.load('current', {packages: ['corechart', 'bar']});

function calculateFV(){
    let initialInvestment = document.getElementById("initialInvestment").valueAsNumber;
    let monthlyInvestment = document.getElementById("monthlyInvestment").valueAsNumber;
    let annualRate = document.getElementById("annualRate").valueAsNumber;
    let years = document.getElementById("years").valueAsNumber;

    const result = document.getElementById("result");

    if(monthlyInvestment === "" || monthlyInvestment === "0") return (result.innerHTML = simpleRate(initialInvestment, annualRate, years).toFixed(2) + currency); //Make the input field always 0 if it is emptied
    else return (result.innerHTML = compoundInterest(initialInvestment, monthlyInvestment, annualRate, years).toFixed(2) + currency);
}

function simpleRate (investment, annualRate, years) {
    return investment * (1 + annualRate / 100 * years);
}

function compoundInterest (initialInvestment, monthlyInvestment, annualRate, years) {
    var monthlyRate = annualRate / 100 / 12; // In 0.45 format so is missing the 1 if used in calcs
    var months = 12;

    var compoundInterestArray = []; //Data types are defined by pushes

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

        compoundInterestArray.push({year: "year " + i, acummulation: accumulatedValue, invested: invested, interest: interest}); //accumulatedValue currently unused but remains for easy access if future needs
    }
    
    console.log(compoundInterestArray)
    drawAxisTickColors(compoundInterestArray);

    return accumulatedValue;
}

function drawAxisTickColors(chartsdata) {
      
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'year');
      data.addColumn('number', 'Sijoitettu pääoma');
      data.addColumn('number', 'Tuotto');
      
      for (let i = 0; i < chartsdata.length; i++) {
          data.addRow([chartsdata[i].year, chartsdata[i].invested, chartsdata[i].interest]);
      }

      var options = {
        width: 800,
        height: 400,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '85%' },
        isStacked: true,
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }