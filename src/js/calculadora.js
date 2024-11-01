document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.getElementById('nextButton');
    const calculateButton = document.getElementById('calculateButton');
    const calculateContainer = document.getElementById('calculateContainer');
    const resultDiv = document.getElementById('resultado'); 
    const gasolinaInput = document.getElementById("box3");
    const boxes = document.querySelectorAll('.box'); 
    let currentBoxIndex = 0;

    nextButton.addEventListener('click', () => {
        if (currentBoxIndex >= boxes.length - 1) {
            nextButton.style.display = 'none';
            calculateContainer.style.display = 'block';
            return;
        }

        const currentBox = boxes[currentBoxIndex];
        const nextBox = boxes[currentBoxIndex + 1];

        currentBox.classList.remove('active');

        setTimeout(() => {
            nextBox.classList.add('active');
            currentBoxIndex++;
        }, 500);
    });

    calculateButton.addEventListener('click', () => {
        const totalGasolina = calcularImpactoAmbiental('gasolina');
        const totalAlcool = calcularImpactoAmbiental('alcool');
        
        const precoPorCredito = 22; // R$ 22,00 por crédito
        const creditosCarbonoGasolina = totalGasolina / 1000; 
        const creditosCarbonoAlcool = totalAlcool / 1000; 

        const custoGasolina = creditosCarbonoGasolina * precoPorCredito;
        const custoAlcool = creditosCarbonoAlcool * precoPorCredito;

        const totalCO2 = totalGasolina + totalAlcool;

        resultDiv.innerHTML = `
            <strong>Emissões totais de CO₂:</strong> ${totalCO2.toFixed(2)} kg CO₂.<br>
            <strong>Emissões totais de CO₂ com gasolina: </strong> ${totalGasolina.toFixed(2)} kg CO₂.<br>
            <strong>Custo para compensar gasolina:</strong> R$ ${custoGasolina.toFixed(2)}.<br>
            <strong>Emissões totais se fosse utilizado etanol:</strong> ${totalAlcool.toFixed(2)} kg CO₂.<br>
            <strong>Custo para compensar etanol:</strong> R$ ${custoAlcool.toFixed(2)}.
        `;
    });

    function calcularImpactoAmbiental(tipo) {
        const coefGasolina = 440.64; 
        const coefAlcool = 2.3; 
     

        const eficienciaVeiculo = parseFloat(document.getElementById("eficienciaVeiculo").value) || 5;
        const carros = parseFloat(document.getElementById("box1").value) || 1; 
        const gasolina = parseFloat(gasolinaInput.value) || 0;

        // Cálculo da distância em função da velocidade e duração
        const velocidade = parseFloat(document.getElementById("velocidade").value) || 60; // velocidade em km/h
        const duracao = parseFloat(document.getElementById("duracao").value) || 1; // duração em horas
        const distancia = velocidade * duracao; // distância em km

        const consumoVeiculo = (gasolina / 100) * (distancia / eficienciaVeiculo); // Consumo do veículo
        const transCarros = (carros / eficienciaVeiculo) * coefGasolina / 1000; 
        const transGasolina = consumoVeiculo * coefGasolina; 

        if (tipo === 'alcool') {
            return transGasolina * coefAlcool; 
        }

        // Total de CO2
        const totalCO2 = transCarros + transGasolina;
        return totalCO2;
    }
});
