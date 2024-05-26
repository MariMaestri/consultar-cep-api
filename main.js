const estado = document.getElementById('uf')
const textCep = document.getElementById('text_cep')
const cep = document.getElementById('cep')
const ibge = document.getElementById('ibge')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('localidade')
const logradouro = document.getElementById('logradouro')


function consultaCep() {
   const cep = document.querySelector('#cep').value 
   const retorno = document.querySelector('#retorno') 
   fetch(`https://viacep.com.br/ws/${cep}/json/`)
   .then(resposta => resposta.json())
//    .then(json => console.log(json))
   .then(json => {
     retorno.innerText = JSON.stringify(json)
   })
   .catch(error => console.log(error))
}

// pegar as informacoes e colocar no input 
// json.cep -> para pegar somente a informacao
// botao salvar -> para colocar na tabela e no localstorage 
// criar uma funcao para o localstorage
// fazer a tabela para salvar a consulta -> criar funcao
// fazer um botao para deletar as informacoes -> criar funcao


