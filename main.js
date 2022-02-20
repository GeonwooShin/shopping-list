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
  shoppingPriceDiv.innerHTML = `${price} ￦ <i class="fa-solid fa-trash-can delete__btn"></i>`
  const deleteItemBtn = document.querySelector('.delete__btn')
  deleteItemBtn.addEventListener('click', (event) => {
    console.log(event.target.parentNode.parentNode)
    shoppingList.removeChild(event.target.parentNode.parentNode)
  })
  
  li.appendChild(shoppingNameDiv)
  li.appendChild(shoppingPriceDiv)

  return li
}

function onAdd() {
  const name = itemName.value
  const price = itemPrice.value
  const item = createItem(name, price)
  shoppingList.appendChild(item)
  itemInput.value = ''
  priceInput.value = ''
  itemInput.focus()
}

addButton.addEventListener('click', () => {
  onAdd()
})