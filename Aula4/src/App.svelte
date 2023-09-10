<script>
    import { parse } from "svelte/compiler";
    import { pokemonByIMC } from "./pokemonList";
    import axios from "axios";

    // Variáveis de estado
    let peso = 0; // Peso do usuário
    let altura = 0; // Altura do usuário
    let imc = 0; // Índice de Massa Corporal

    let categoria = "";
    let categoria_cor = "";

    let pesoIdeal = [0, 0];
    let pokemon = null;

    let c = null; // for timeout

    // Função para calcular o IMC
    function calcularIMC() {
        if (c) clearTimeout(c);
        if (peso > 0 && altura > 0) {
            imc = parseFloat((peso / Math.pow((altura/100), 2)).toFixed(2));
            pesoIdeal = [
                parseFloat((18.6 * (altura/100) * (altura/100)).toFixed(2)),
                parseFloat((24.9 * (altura/100) * (altura/100)).toFixed(2)),
            ];

            c = setTimeout(() => {
                setPokemon(imc);
            }, 1000);

            if (imc < 18.5) {
                categoria = "Abaixo do peso";
                categoria_cor = "#DD0";
                return;
            }
            if (imc < 24.9) {
                categoria = "no Peso ideal";
                categoria_cor = "#3F3";
                return;
            }
            if (imc < 29.9) {
                categoria = "Levemente acima do peso";
                categoria_cor = "#DD0";
                return;
            }
            if (imc < 34.9) {
                categoria = "com Obesidade grau I";
                categoria_cor = "#F70";
                return;
            }
            if (imc < 39.9) {
                categoria = "com Obesidade grau II";
                categoria_cor = "#F00";
                return;
            }
            categoria = "com Obesidade grau III";
            categoria_cor = "#900";
        } else {
            imc = 0;
        }
    }

    async function setPokemon(imc) {
        const pokemonEqual = pokemonByIMC.reduce(
            (closest, curr) =>
                Math.abs(parseFloat(closest.imc) - imc) >
                Math.abs(parseFloat(curr.imc) - imc)
                    ? curr
                    : closest,
            pokemonByIMC[0]
        );

        const response = await axios.get(
            "https://pokeapi.co/api/v2/pokemon/" + pokemonEqual.id
        );
        pokemon = response.data
    }
</script>

<main>
    <h1>Calculadora de IMC</h1>
    <label>
        Peso (kg): <input
            type="number"
            bind:value={peso}
            on:input={calcularIMC}
        />
    </label>
    <label>
        Altura (cm): <input
            type="number"
            bind:value={altura}
            on:input={calcularIMC}
        />
    </label>
    {#if imc > 0}
        <div style={"color:" + categoria_cor}>
            <p>Seu IMC é {imc}</p>
            <p>Você está {categoria}</p>
            <p>Seu peso ideal está entre {pesoIdeal[0]}~{pesoIdeal[1]}</p>
            {#if pokemon != null}
                <p>Você seria um {pokemon.name}</p>
                <img src={pokemon.sprites.front_default} alt={pokemon.name+" front sprite"}/>
                <p>Tipos {pokemon.types.map(el=>el.type.name).join(",")}</p>
            {/if}
        </div>
    {/if}
</main>

<style>
    main {
        font-family: sans-serif;
        text-align: center;
        padding: 2rem;
    }

    h1 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
    }

    input {
        padding: 0.25rem;
    }
</style>
