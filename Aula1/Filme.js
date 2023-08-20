class Filme {
    constructor({ titulo, ano, genero, duracao, assistido = false, avaliacao = 0 }) {
        this.titulo = titulo;
        this.ano = ano;
        this.genero = genero;
        this.duracao = duracao;
        this.assistido = assistido;
        this.avaliacao = avaliacao;
    }

    mostrarDetalhes() {
        console.log(`Título: ${this.titulo}`);
        console.log(`Ano: ${this.ano}`);
        console.log(`Gênero: ${this.genero}`);
        console.log(`Duraçãoo: ${this.duracao}`);
        console.log(`Assistido: ${this.assistido ? 'Sim' : 'Não'}`);
        console.log(`Nota: ${this.avaliacao}`);
    }

    assistir() {
        this.assistido = true;
    }

    avaliar(nota) {
        this.avaliacao = nota;
    }
}

const filme1 = new Filme({
    titulo: 'As Aventuras de Sharkboy e Lavagirl em 3-D',
    ano: 2005,
    genero: "Aventura/Infantil",
    duracao: 95,
    assistido: false,
})
const filme2 = new Filme({
    titulo: 'Interestelar',
    ano: 2014,
    genero: "Ficção científica/Aventura",
    duracao: 169,
    assistido: true,
    avaliacao: 10,
})
const filme3 = new Filme({
    titulo: 'O VelociPastor',
    ano: 2017,
    genero: "Terror/Comédia",
    duracao: 75,
    assistido: false,
    avaliacao: 2,
})

filme1.mostrarDetalhes();
filme2.mostrarDetalhes();
filme3.mostrarDetalhes();

