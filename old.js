//The basis for the compound interest calculation

function compoundInterest(initialInvestment, monthlyInvestment, annualRate, years) {
    compoundInterest2(initialInvestment, monthlyInvestment, annualRate, years);
    var monthlyRate = annualRate / 100 / 12; // In 0.45 format so is missing the 1 if used in calcs
    var months = years*12;

    const loppusumma = (initialInvestment * Math.pow(1 + monthlyRate, months) +
        (monthlyInvestment * (Math.pow(1 + monthlyRate, months) - 1)) / 
        (monthlyRate)).toFixed(2);

        return loppusumma;
}