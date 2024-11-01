document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.getElementById('nextButton');
    const calculateButton = document.getElementById('calculateButton');
    const calculateContainer = document.getElementById('calculateContainer');
    const resultDiv = document.getElementById('result');
    const gasolinaInput = document.getElementById("box2");
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

        // Soma correta das emissões
        const totalCO2 = totalGasolina + totalAlcool;

        resultDiv.innerHTML = `
            <strong>Emissões totais de CO₂:</strong> ${totalCO2.toFixed(2)} kg CO₂.<br>
            <strong>Emissões totais de CO₂ com gasolina: </strong> ${totalGasolina.toFixed(2)} kg CO₂.<br>
            <strong>Custo para compensar gasolina:</strong> R$ ${custoGasolina.toFixed(2)}.<br>
            <strong>Emissões totais se fosse utilizado etanol:</strong> ${totalAlcool.toFixed(2)} kg CO₂.<br>
            <strong>Custo para compensar etanol:</strong> R$ ${custoAlcool.toFixed(2)}.
        `;

        // Definir a cor da classe com base nas emissões de gasolina
        let colorClass = '';
        if (totalGasolina <= 50) {
            colorClass = 'green'; 
        } else if (totalGasolina <= 150) {
            colorClass = 'yellow'; 
        } else if (totalGasolina <= 300) {
            colorClass = 'orange'; 
        } else {
            colorClass = 'red'; 
        }
        resultDiv.className = colorClass; 
    });

    function calcularImpactoAmbiental(tipo) {
        const coefCarros = 120;    
        const coefGasolina = 440.64; 
        const coefAlcool = 2.3; 
        const coefEnergia = 0.233; 

        const eficienciaVeiculo = parseFloat(document.getElementById("eficienciaVeiculo").value) || 10;
        const carros = parseFloat(document.getElementById("box1").value) || 0; 
        const gasolina = parseFloat(gasolinaInput.value) || 0;
        const energia = parseFloat(document.getElementById("box3").value) || 0; 

        const transCarros = (carros / eficienciaVeiculo) * coefCarros / 1000; 

        let transGasolina = gasolina * coefGasolina; 
        if (tipo === 'alcool') {
            transGasolina = gasolina * coefAlcool; 
        }

        const eficienciaEnergia = parseFloat(document.getElementById("eficienciaEnergia").value) || 1;
        const transEnergia = energia / eficienciaEnergia * coefEnergia; 

        const totalCO2 = transCarros + transGasolina + transEnergia;
        return totalCO2;
    }
});