const itemName = document.querySelector('.item__name')
const itemPrice = document.querySelector('.item__price')
const shoppingList = document.querySelector('.shopping__list')
const addButton = document.querySelector('.add__button')
const itemInput = document.querySelector('.item__name')
const priceInput = document.querySelector('.item__price')


console.log(shoppingList)
console.log(addButton)

function createItem(name, price) {
  const li = document.createElement("li")

  const shoppingNameDiv = document.createElement("div")
  shoppingNameDiv.setAttribute('class', 'shopping__name')

  const shoppingPriceDiv = document.createElement("div")
  shoppingPriceDiv.setAttribute('class', 'shopping__price')

  shoppingNameDiv.textContent = name
  shoppingPriceDiv.innerHTML = `${price} ￦`

  const deleteItemBtn = document.createElement('button')
  deleteItemBtn.setAttribute('class', 'item__delete')
  deleteItemBtn.innerHTML = '<i class="fa-solid fa-trash-can delete__btn"></i>'
  deleteItemBtn.addEventListener('click', () => {
    shoppingList.removeChild(li)
  })
  
  li.appendChild(shoppingNameDiv)
  li.appendChild(shoppingPriceDiv)
  li.appendChild(deleteItemBtn)

  return li
}

function onAdd() {
  const name = itemName.value
  const price = itemPrice.value
  if(name === '' || price === '') {
    alert('품목과 가격을 정확히 입력해주세요.')
  } else {
    const item = createItem(name, price)
    shoppingList.appendChild(item)
    itemInput.value = ''
    priceInput.value = ''
    itemInput.focus()
  }
}

addButton.addEventListener('click', () => {
  onAdd()
})