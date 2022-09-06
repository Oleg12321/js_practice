let fruits = [
    {id: 1, title: 'Apple', price: 20, img: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    {id: 2, title: 'Orange', price: 30, img: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    {id: 3, title: 'Mango', price: 40, img: 'https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
]

const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img class="card-img-top" style="height: 300px;" src="${fruit.img}" alt="${fruit.title}">
            <div class="card-body">
              <h5 class="card-title">${fruit.title}</h5>
              <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Price</a>
              <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
            </div>
          </div>
    </div>
`

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html;
}

render()

const priceModal = $.modal({
    title: 'Price',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
            priceModal.close()
        }},
    ]
})


document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit =fruits.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
          <p>Price ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
      } else if (btnType === 'remove') {
        $.confirm({
          title: 'Are you sure?',
          content: `<p>You remove the fruit: <strong>${fruit.title}</strong></p>`
        }).then(() => {
          fruits = fruits.filter(f => f.id !== id)
          render()
        }).catch(() => {
          console.log('Cancel')
        })
      }
})
