// const transactionsUL         = document.querySelector('#transactions')
const xSaladaDisplay        = document.querySelector('#xsalada')
const refrigeranteDisplay   = document.querySelector('#refrigerante')
const valorComboDisplay     = document.querySelector('#pagaCombo')
const valorSimplesDisplay   = document.querySelector('#pagaSimples')
const totalBalanceDisplay   = document.querySelector('#balance')
const form                  = document.querySelector('#form')
const buttonRecalcular      = document.querySelector('#recalcular')
const divResult             = document.querySelector('#result')
const divQRCode             = document.querySelector('.qrcode')
const btnqrcodeDisplay      = document.querySelector('#btnqrcode')
const up                    = document.querySelector('.up')
const audioIupi             = document.querySelector('audio')

let inputQRCode             = document.querySelector('#codePix')
let imgQRCodeDisplay        = document.querySelector("#qrcode")
let inputValorXSalada       = document.querySelector('#valorXsalada')
let inputQtdXSalada         = document.querySelector('#qtdXsalada')
let inputValorRefrigerante  = document.querySelector('#valorRefrigerante')
let inputQtdRefrigerante    = document.querySelector('#qtdRefrigerante')
let inputQtdTomaRefri       = document.querySelector('#qtdTomaRefri')


// let dummyTransactions = [
//     { id: 1, name: 'Bolo de Brigadeiro', amount: -20 },
//     { id: 2, name: 'Salario', amount: 300 },
//     { id: 3, name: 'Torta', amount: -10 },
//     { id: 4, name: 'Violão', amount: 150 }
// ]

// const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
// let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const validInput = text => {
    if(isNaN(text.value)){
        console.log('isNaN: ' + text.value);
        return 
    }else{
        console.log('isNumber: '+ text.value);
        return text
    }    
}

const handleFormSubmit = e => {
    e.preventDefault()
    const valorXsalada      = inputValorXSalada.value.trim()
    const qtdXsalada        = inputQtdXSalada.value.trim()
    const valorRefrigerante = inputValorRefrigerante.value.trim()
    const qtdRefrigerante   = inputQtdRefrigerante.value.trim()
    const qtdTomaRefri      = inputQtdTomaRefri.value.trim()


    const someEmpty = valorXsalada === '' || qtdXsalada === '' || valorRefrigerante === '' || qtdRefrigerante === '' || qtdTomaRefri === ''
    // const validQtdTomaRefri =  

    if(someEmpty){
        alert('Favor preencher todos os campos.')
        return
    }

    if( Number(qtdTomaRefri) > Number(qtdXsalada) ){
        alert('A quantidade de pessoas que tomarão refrigerante deve ser igual ou inferior à quantidade de x-saladas.')
        return
    }

    calculate(valorXsalada, qtdXsalada, valorRefrigerante, qtdRefrigerante, qtdTomaRefri)
}

const handleShowForm = e => {
    e.preventDefault()
    form.classList.remove('none')
    divResult.classList.add('none')
}

form.addEventListener('submit', handleFormSubmit)

buttonRecalcular.addEventListener('click', handleShowForm)

const calculate = (valorXsalada, qtdXsalada, valorRefrigerante, qtdRefrigerante, qtdTomaRefri) => {
    const valorTotalXSalada = qtdXsalada * valorXsalada
    const valorTotalRefri = qtdRefrigerante * valorRefrigerante
    const valorSimples = Number(valorXsalada)
    const valorCombo = (((valorRefrigerante *  qtdRefrigerante) / qtdTomaRefri) + Number(valorXsalada))

    
    updateDisplay(valorTotalXSalada, valorTotalRefri, valorSimples, valorCombo, qtdTomaRefri, qtdXsalada, qtdRefrigerante)
}

const updateDisplay = (valorTotalXSalada, valorTotalRefri, valorSimples, valorCombo, qtdTomaRefri, qtdXsalada, qtdRefrigerante) => {
    xSaladaDisplay.textContent      = `R$ ${valorTotalXSalada.toFixed(2)}`
    refrigeranteDisplay.textContent = `R$ ${valorTotalRefri.toFixed(2)}`
    valorComboDisplay.textContent   = `${qtdTomaRefri} x R$ ${valorCombo.toFixed(2)}`
    valorSimplesDisplay.textContent = `${qtdXsalada - qtdTomaRefri} x R$ ${valorSimples.toFixed(2)}`
    totalBalanceDisplay.textContent = `R$ ${(valorTotalXSalada + valorTotalRefri).toFixed(2)}`
    form.classList.add('none')
    divResult.classList.remove('none')
}

const cleanInputsTransaction = () => {
    inputValorXSalada.value         = ''
    inputQtdXSalada.value           = ''
    inputValorRefrigerante.value    = ''
    inputQtdRefrigerante.value      = ''
    qtdTomaRefri                    = ''
}

const handleGenerateQRCode = e => {
    e.preventDefault()

    const key = inputQRCode.value.trim()

    btnqrcodeDisplay.classList.add('bg-gray')
    
    btnqrcodeDisplay.classList.remove('active')

    imgQRCodeDisplay.setAttribute('src', 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=nuapp://cpf/'+key)
    
    divQRCode.classList.remove('none')

    setTimeout(() => {up.classList.remove('none')},2000)
    setTimeout(() => {audioIupi.play()},1600)
    setTimeout(() => {up.classList.add('none')},3000)
    
}

const handleChangeInputQRCode = e => {
    e.preventDefault()

    btnqrcodeDisplay.classList.add('active')

    divQRCode.classList.add('none')

}

formCode.addEventListener('submit', handleGenerateQRCode)

inputQRCode.addEventListener('focus', handleChangeInputQRCode)
