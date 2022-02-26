const itemInput = document.querySelector('.add__list')
const itemName = document.querySelector('.item__name')
const itemPrice = document.querySelector('.item__price')
const shoppingList = document.querySelector('.shopping__list')
const addButton = document.querySelector('.add__button')
let checkedPrice = new Number(0)
let uncheckedPrice = new Number(0)

// 쇼핑리스트에 아이템 추가
let id = 0
function createItem(name, price) {
  const li = document.createElement("li")
  li.setAttribute('class', 'shopping__list__item')
  li.setAttribute('data-id', id)
  li.setAttribute('data-price', price)
  li.innerHTML = `
    <div class="shopping__name">${name}</div>
    <div class="shopping__price">
      <span>${price} ￦</span>
      <button>
        <i data-id="${id}" class="fa-solid fa-trash-can delete__btn"></i>
      </button>
    </div>
  `

  id++
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

// 아이템누르면 체크처리, 휴지통 누르면 삭제처리
shoppingList.addEventListener('click', (event) => {
  const id = event.target.dataset.id
  if(id && event.target.nodeName === 'I') {
    const toBeDeleted = document.querySelector(`.shopping__list__item[data-id="${id}"]`)
    toBeDeleted.remove()
  }
  onCheck(event)
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

// 품목과 가격 넣고 추가버튼 누르거나 엔터키 누르면 아이템 추가
addButton.addEventListener('click', () => {
  onAdd()
})

function enterAdd(event) {
  if(event.key === 'Enter') {
    onAdd()
  } else {
    return
  }
}

itemInput.addEventListener('keydown', (event) => {
  enterAdd(event)
})