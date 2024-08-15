function converterTemperatura() {
    const temperaturaInput = document.getElementById('temperatura').value;
    const de = document.getElementById('de').value;
    const para = document.getElementById('para').value;
    const temperatura = parseFloat(temperaturaInput);

    if (isNaN(temperatura)) {
        document.getElementById('resultado-texto').textContent = 'Por favor, insira um valor de temperatura válido.';
        return;
    }

    let resultado;

    if (de === para) {
        resultado = temperatura;
    } else {
        
        let celsius;
        if (de === 'fahrenheit') {
            celsius = (temperatura - 32) * 5 / 9;
        } else if (de === 'kelvin') {
            celsius = temperatura - 273.15;
        } else {
            celsius = temperatura;
        }

       
        if (para === 'fahrenheit') {
            resultado = celsius * 9 / 5 + 32;
        } else if (para === 'kelvin') {
            resultado = celsius + 273.15;
        } else {
            resultado = celsius;
        }
    }

    document.getElementById('resultado-texto').textContent = `Resultado: ${resultado.toFixed(2)} ${getUnidade(para)}`;
}

function getUnidade(unidade) {
    switch (unidade) {
        case 'celsius':
            return '°C';
        case 'fahrenheit':
            return '°F';
        case 'kelvin':
            return 'K';
        default:
            return '';
    }
}
