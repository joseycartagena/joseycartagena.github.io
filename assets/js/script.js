let estadoChart = null;

const NombreMoneda = (moneda) => {
    if (moneda === 'dolar') {
        return '$';
    } else if (moneda === 'euro') {
        return '€';
    }
    return '';
}

document.getElementById('btn-buscar').addEventListener('click', async () => {
    const valor = document.getElementById('valor').value;
    if (valor <= 0) {
        document.getElementById('resultado').textContent = 'El monto debe ser un número mayor a "0".';
        return;
    }
    const moneda = document.getElementById('moneda').value;

    try {
        const response = await fetch(`https://mindicador.cl/api`);
        const data = await response.json();

        const cambiarValor = data[moneda].valor;
        const convertirValor = (valor / cambiarValor).toFixed(2);
        const nombreDivisa = NombreMoneda(moneda);

        document.getElementById('resultado').textContent = 
            `Resultado: ${convertirValor} ${nombreDivisa}`;

        renderMyChart(moneda);
        
        document.getElementById('graficoHistoricoContenedor').style.display = 'block';
        
    } catch (error) {
        document.getElementById('resultado').textContent = 
            'Error al obtener los datos. Intente nuevamente.';
    }
});

async function renderMyChart(moneda) {
    try {
        const response = await fetch(`https://mindicador.cl/api/${moneda}`);
        const data = await response.json();
        const labels = data.serie.slice(0, 10).map(item => item.fecha.slice(0, 10));
        const values = data.serie.slice(0, 10).map(item => item.valor);

        if (estadoChart !== null) {
            estadoChart.destroy();
        }

        const ctx = document.getElementById('myChart').getContext('2d');
        estadoChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `Historial de ${moneda.toUpperCase()}`,
                    data: values,
                    borderColor: 'rgb(725, 192, 192)',
                    fill: false
                }]
            }
        });
        
    } catch (error) {
        console.error('Error al obtener el historial:', error);
    }
}