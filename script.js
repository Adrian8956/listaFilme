const frm = document.querySelector("form");
const tbFilmes = document.querySelector("table");

frm.addEventListener("submit", (e) =>{
    e.preventDefault();

    const titulo = frm.inTitulo.value;
    const genero = frm.inGenero.value;

    inserirLinha(titulo, genero); // chama function que insere filmes em tabelas
    gravarFilme(titulo, genero); // chama function que grava dados em localStorage

    frm.reset();
    frm.inTitulo.focus();
});

const inserirLinha = (titulo, genero) =>{
    const linha = tbFilmes.insertRow(-1); // adicionar uma linha na tabela

    const col1 = linha.insertCell(0);
    const col2 = linha.insertCell(1);
    const col3 = linha.insertCell(2);

    col1.innerText = titulo;
    col2.innerText = genero;
    col3.innerHTML = "<i class='exclui' title='Excluir'> &#10008</i>"
};

const gravarFilme = (titulo, genero) =>{
    // se houver dados salvos em localstorage
    if(localStorage.getItem("filmesTitulo")){
        // obtém os dados e acrescenta ";" e o título/gênero informado
        const filmesTitulo = localStorage.getItem("filmesTitulo") + ";" + titulo;
        const filmesGenero = localStorage.getItem("filmesGenero") + ";" + genero;

        localStorage.setItem("filmesTitulo", filmesTitulo);
        localStorage.setItem("filmesGenero", filmesGenero);
    }else{
        localStorage.setItem("filmesTitulo", titulo);
        localStorage.setItem("filmesGenero", genero);
    }
};

window.addEventListener("load", () =>{
    if(localStorage.getItem("filmesTitulo")){
        const titulos = localStorage.getItem("filmesTitulo").split(";");
        const generos = localStorage.getItem("filmesGenero").split(";");

        //percorre os elementos do vetor e os insere na tabela
        for(let i = 0; i < titulos.length; i++){
            inserirLinha(titulos[i], generos[i]);
        }
    }
});

tbFilmes.addEventListener("click", (e) =>{
    // se a classe do elemento alvo clicado contém exclui
    if(e.target.classList.contains("exclui")){
        // acessa o "pai do pai" do elemento alvo, e obtém o texto do 1º filho
        const titulo = e.target.parentElement.parentElement.children[0].innerText;

        if(confirm(`Confirma Exlusão do Filme ${titulo}`)){
            // remove a linha da tabela, corresponde ao símbolo de excluir clicado
            e.target.parentElement.parentElement.remove();

            localStorage.removeItem("filmesTitulo");
            localStorage.removeItem("filmesGenero");

            // salva novamente (se existir), acessando o conteúdo da tabela
            for(let i = 1; i <= tbFilmes.rows.length; i++){
                // obtém o conteúdo da tabela (coluna 0: titulo; coluna 1: gênero)
                const auxTitulo = tbFilmes.rows[i].cells[0].innerText;
                const auxGenero = tbFilmes.rows[i].cells[1].innerText;
                gravarFilme(auxTitulo, auxGenero);
            }
        }
    }
})