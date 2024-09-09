export { RecintosZoo };

class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = {
            'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(especie, quantidade) {
        if (!this.animais[especie]) {
            return { erro: "Animal invalido" };
        }

        if (quantidade <= 0 || isNaN(quantidade)) {
            return { erro: "Quantidade invalida" };
        }

        const animal = this.animais[especie];
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            const espacoRestante = this.calcularEspacoRestante(recinto, animal, quantidade);

            if (espacoRestante >= 0 && this.verificarBioma(recinto, animal)) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaco livre: ${espacoRestante} total: ${recinto.tamanho})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Nao ha recinto viavel" };
        }

        return { recintosViaveis };
    }

    calcularEspacoRestante(recinto, animal, quantidade) {
        let espacoOcupado = 0;

        for (const a of recinto.animais) {
            espacoOcupado += this.animais[a.especie].tamanho * a.quantidade;
        }

        const espacoTotalNecessario = animal.tamanho * quantidade;
        return recinto.tamanho - espacoOcupado - espacoTotalNecessario;
    }

    verificarBioma(recinto, animal) {
        return animal.biomas.includes(recinto.bioma) ||
            (recinto.bioma === 'savana e rio' &&
                animal.biomas.includes('savana') &&
                animal.biomas.includes('rio'));
    }
}
