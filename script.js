// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide Results
    document.getElementById('results').style.display = 'none';

    // Display Loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});


// Calculate Results

function calculateResults(){
    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value)*12;

    // Calculate Monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest/(x-1));

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // Show Results
        document.getElementById('results').style.display = 'block';

        // hide Loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers...')
    }
}

function showError(error){
     // Hide Results
     document.getElementById('results').style.display = 'none';

     // Hide Loader
     document.getElementById('loading').style.display = 'none';
     
    // Create a div
    const errorDiv = document.createElement('div');

    // get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add className
    errorDiv.className = 'alert alert-danger';

    // Create textNode and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear Error after 3 seconds
    setTimeout(clearError, 3000);

}


// Clear Error

function clearError(){
    document.querySelector('.alert').remove();
}