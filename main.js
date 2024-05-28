const estado = document.getElementById('uf')
const textCep = document.getElementById('text_cep')
const inputCep = document.getElementById('cep')
const ibge = document.getElementById('ibge')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('localidade')
const logradouro = document.getElementById('logradouro')
const complemento = document.getElementById('complemento')

let listaInfo = []

function consultaCep() {
   const cep = inputCep.value
   fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(resposta => resposta.json())
      .then(json => {
         textCep.value = json.cep
         estado.value = json.uf
         ibge.value = json.ibge
         bairro.value = json.bairro
         cidade.value = json.localidade
         logradouro.value = json.logradouro
         complemento.value = json.complemento
      })
      .catch(error => console.log(error))
}

function salvarInfo() {
   listaInfo.push({
      cep: textCep.value,
      estado: estado.value,
      ibge: ibge.value,
      bairro: bairro.value,
      cidade: cidade.value,
      logradouro: logradouro.value,
      complemento: complemento.value
   })
   criarTabela()
}

function criarTabela() {

   // excluindo tabela
   if (document.getElementById('tabela')) {
      document.getElementById('tabela').remove()
   }

   // criando a tabela
   const tabela = document.createElement('table')
   tabela.setAttribute('id', 'tabela')
   document.body.appendChild(tabela)
   
   // criando a linha do cabeçalho
   const cabecalho = document.createElement('tr')
   tabela.appendChild(cabecalho)
   
   // criando celula do cabeçalho para as informaçoes
   const tdCep = document.createElement('td')
   tdCep.innerText = 'Cep'
   cabecalho.appendChild(tdCep)
   tdCep.setAttribute("class", "cabecalho")

   const tdEstado = document.createElement('td')
   tdEstado.innerText = 'UF'
   cabecalho.appendChild(tdEstado)
   tdEstado.setAttribute("class", "cabecalho")

   const tdIbge = document.createElement('td')
   tdIbge.innerText = 'IBGE'
   cabecalho.appendChild(tdIbge)
   tdIbge.setAttribute("class", "cabecalho")

   const tdBairro = document.createElement('td')
   tdBairro.innerText = 'BAIRRO'
   cabecalho.appendChild(tdBairro)
   tdBairro.setAttribute("class", "cabecalho")

   const tdLocalidade = document.createElement('td')
   tdLocalidade.innerText = 'LOCALIDADE'
   cabecalho.appendChild(tdLocalidade)
   tdLocalidade.setAttribute("class", "cabecalho")

   const tdLogradouro = document.createElement('td')
   tdLogradouro.innerText = 'LOGRADOURO'
   cabecalho.appendChild(tdLogradouro)
   tdLogradouro.setAttribute("class", "cabecalho")

   const tdComplemento = document.createElement('td')
   tdComplemento.innerText = 'COMPLEMENTO'
   cabecalho.appendChild(tdComplemento)
   tdComplemento.setAttribute("class", "cabecalho")

   // criar celulas para as demais informações

   listaInfo.forEach((item, posicao) => {
      // criando nova linha
      const linha = document.createElement('tr')
      tabela.appendChild(linha)

      const cep = document.createElement('td')
      cep.innerText = item.cep
      linha.appendChild(cep)
      
      const estado = document.createElement('td')
      estado.innerText = item.estado
      linha.appendChild(estado)

      const ibge = document.createElement('td')
      ibge.innerText = item.ibge
      linha.appendChild(ibge)

      const bairro = document.createElement('td')
      bairro.innerText = item.bairro
      linha.appendChild(bairro)

      const cidade = document.createElement('td')
      cidade.innerText = item.cidade
      linha.appendChild(cidade)

      const logradouro = document.createElement('td')
      logradouro.innerText = item.logradouro
      linha.appendChild(logradouro)

      const complemento = document.createElement('td')
      complemento.innerText = item.complemento
      linha.appendChild(complemento)
      
      // criar botão para delatar linha
      const botaoExcluir = document.createElement('button');
      botaoExcluir.innerText = 'excluir';
      botaoExcluir.addEventListener('click', () => {
        tabela.removeChild(linha); // Remove a linha quando o botão for clicado
    });

    const colunaBotao = document.createElement('td');
    colunaBotao.appendChild(botaoExcluir);
    linha.appendChild(colunaBotao);

   })

   // limpando o campo de cep
   textCep.value = ''

   // limpar os demais campos

   localStorage.setItem('info', JSON.stringify(listaInfo))
}

function recarregarInfo() {
   const infoLocalStorage = localStorage.getItem('info')
   if (infoLocalStorage) {
      listaInfo = JSON.parse(infoLocalStorage)
   }
   criarTabela()
}

recarregarInfo()