document.addEventListener('DOMContentLoaded', () => {
    // 1. Elements selection
    const expenseForm = document.getElementById('expense-form');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    const amountInput = document.getElementById('amount');
    const categorySelect = document.getElementById('category');
    const expenseChartCanvas = document.getElementById('expense-chart');

    let selectedMonth;
    let selectedYear;
    let myChart;

    // 2. Initial Data Structure
    let expenses = {
        January: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        February: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        March: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        April: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        May: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        June: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        July: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        August: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        September: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        October: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        November: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
        December: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 }
    };

    // 3. Get selected month & year
    function getSelectedMonthYear() {
        selectedMonth = monthSelect.value;
        selectedYear = yearSelect.value;
    }

    // 4. Update Chart
    function updatechart() {
        getSelectedMonthYear();

        if (!selectedMonth) return;

        const ctx = expenseChartCanvas.getContext('2d');

        // Destroy old chart
        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(expenses[selectedMonth]),
                datasets: [{
                    data: Object.values(expenses[selectedMonth]),
                    backgroundColor: [
                        '#FF6384',
                        '#4CAF50',
                        '#FFCE56',
                        '#36A2EB',
                        '#FF9F40'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }

    // 5. Form Submit
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const category = categorySelect.value;
        const amount = parseFloat(amountInput.value);

        getSelectedMonthYear();

        // Validation
        if (!selectedMonth || !category || isNaN(amount) || amount <= 0) {
            alert("Please enter valid data");
            return;
        }

        // Add expense
        expenses[selectedMonth][category] += amount;

        // Reset input
        amountInput.value = "";

        // Update chart
        updatechart();
    });

    // 6. Update chart when month changes
    monthSelect.addEventListener('change', updatechart);

    // 7. Initial chart load
    updatechart();
});