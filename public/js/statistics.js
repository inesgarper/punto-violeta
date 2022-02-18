// ---- FIRST CHART
const labels = [
    'Red',
    'Blue',
    'Yellow',
];

const data = {
    datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
            'rgb(218, 219, 255)',
            'rgb(243, 128, 140)',
            'rgb(123, 142, 215)'
        ],
        hoverOffset: 4
    }]
};

const config = {
    type: 'doughnut',
    data: data,
    options: {}
};


const myChart = new Chart(
    document.getElementById('myChart-1'),
    config
);