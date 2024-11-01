const cards = [
    {  
        explicacao_formula: "Para calcular a emissão de combustível, use as seguintes fórmulas: (distância Km/H): D = velocidade (KM/h) * hora (duração da viagem); (consumo de combustível (L)): (Consumo de combustível do veículo (L) / 100 Km)/ D (distância KM); Emissão de CO2 (Kg) = Consumo * fator de emissão.",
        tipo: 'combustivel'
    },
    { 
        explicacao_formula: "Para calcular a emissão de energia: Emissões de CO₂ (kg) = Energia (kWh) * Fator de Emissão (kgCO₂/kWh).",
        tipo: 'energia'
    },
];

function mostrarSelecionados() {
    const resultados = document.getElementById('resultados');
    const cardContainer = document.getElementById('card-container');
    resultados.innerHTML = ''; // Limpa resultados anteriores
    cardContainer.innerHTML = ''; // Limpa resultados anteriores

    const combustivel = document.getElementById('combustivel').checked;
    const energia = document.getElementById('energia').checked;

    // Mostra ou oculta o contêiner com os resultados
    resultados.classList.toggle('hidden', resultados.innerHTML === '');

    // Adiciona apenas os cards correspondentes às opções selecionadas
    cards.forEach(card => {
        if ((combustivel && card.tipo === 'combustivel') || 
            (energia && card.tipo === 'energia')) {
            cardContainer.innerHTML += `
                <div class="card">
                    <p>${card.explicacao_formula}</p>
                </div>
            `;
        }
    });

    // Mostra ou oculta o contêiner com os cards
    cardContainer.classList.toggle('hidden', cardContainer.innerHTML === '');
}