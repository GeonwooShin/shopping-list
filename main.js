const itemName = document.querySelector('.item__name')
const itemPrice = document.querySelector('.item__price')
const shoppingList = document.querySelector('.shopping__list')
const addButton = document.querySelector('.add__button')
let checkedPrice = new Number(0)
let uncheckedPrice = new Number(0)

// 쇼핑리스트에 아이템 추가
function createItem(name, price) {
  const li = document.createElement("li")

  const shoppingNameDiv = document.createElement("div")
  shoppingNameDiv.setAttribute('class', 'shopping__name')

  const shoppingPriceDiv = document.createElement("div")
  shoppingPriceDiv.setAttribute('class', 'shopping__price')

  const shoppingPrice = document.createElement("span")
  shoppingPrice.innerHTML = `${price} ￦`

  shoppingNameDiv.textContent = name

  const deleteItemBtn = document.createElement('button')
  deleteItemBtn.setAttribute('class', 'item__delete')
  deleteItemBtn.innerHTML = '<i class="fa-solid fa-trash-can delete__btn"></i>'
  deleteItemBtn.addEventListener('click', () => {
    shoppingList.removeChild(li)
    const price = parseInt(li.dataset.price)
    if(li.classList.contains('checked')) {
      checkedPrice -= price
    } else {
      uncheckedPrice -= price
    }
    updateSum()
  })

  shoppingPriceDiv.appendChild(shoppingPrice)
  shoppingPriceDiv.appendChild(deleteItemBtn)
  
  li.setAttribute('data-price', `${price}`)
  li.appendChild(shoppingNameDiv)
  li.appendChild(shoppingPriceDiv)

  li.setAttribute('class', 'shopping__list__item')

  // 리스트에 있는 품목 클릭하면 줄 긋기
  li.addEventListener('click', (event) => {
    onCheck(event)
  })

  return li
}

function onAdd() {
  const name = itemName.value
  let price = parseInt(itemPrice.value)
  if(name === '' || isNaN(price)) {
    alert('품목과 가격을 정확히 입력해주세요.')
    itemName.value = ''
    itemPrice.value = ''
    itemName.focus()
    return
  }
  const item = createItem(name, price)
  shoppingList.appendChild(item)
  uncheckedPrice += price
  updateSum()
  itemName.value = ''
  itemPrice.value = ''
  itemName.focus()
  
}

function onCheck(event) {
  if(event.target.nodeName === 'LI') {
    const target = event.target
    const curPrice = parseInt(target.dataset.price)
    if(target.classList.contains('checked')) {
      target.classList.remove('checked')
      uncheckedPrice += curPrice
      checkedPrice -= curPrice
    } else {
      target.classList.add('checked')
      uncheckedPrice -= curPrice
      checkedPrice += curPrice
    }
  } else if(event.target.nodeName === 'DIV') {
    const target = event.target.parentNode
    const curPrice = parseInt(target.dataset.price)
    if(target.classList.contains('checked')) {
      target.classList.remove('checked')
      uncheckedPrice += curPrice
      checkedPrice -= curPrice
    } else {
      target.classList.add('checked')
      uncheckedPrice -= curPrice
      checkedPrice += curPrice
    }
  } else if(event.target.nodeName === 'SPAN') {
    const target = event.target.parentNode.parentNode
    const curPrice = parseInt(target.dataset.price)
    if(target.classList.contains('checked')) {
      target.classList.remove('checked')
      uncheckedPrice += curPrice
      checkedPrice -= curPrice
    } else {
      target.classList.add('checked')
      uncheckedPrice -= curPrice
      checkedPrice += curPrice
    }
  } else {
    return
  }
  updateSum()
}

addButton.addEventListener('click', () => {
  onAdd()
})

// 가격 계산
const checkedSum = document.querySelector('.sum__checked_price')
const uncheckedSum = document.querySelector('.sum__unchecked_price')
const totalSum = document.querySelector('.sum__total_price')

function updateSum() {
  checkedSum.textContent = `${checkedPrice} ￦`
  uncheckedSum.textContent = `${uncheckedPrice} ￦`
  totalSum.textContent = `${checkedPrice + uncheckedPrice} ￦`
}

// 품목과 가격 넣고 엔터키 누르면 아이템 추가
function enterAdd(event) {
  if(event.key === 'Enter') {
    onAdd()
  } else {
    return
  }
}

itemName.addEventListener('keypress', (event) => {
  enterAdd(event)
})

itemPrice.addEventListener('keypress', (event) => {
  enterAdd(event)
})