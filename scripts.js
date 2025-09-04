
const list = document.querySelector('ul');
const buttonShowAll = document.querySelector('.showAll');
const buttonMapAll = document.querySelector('.mapAll');
const buttonReduceAll = document.querySelector('.reduceAll');
const buttonFilterVegan = document.querySelector('.filterVegan');

function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' });
}

function showAll(productsArray) {
    let myLi = '';
    productsArray.forEach((product) => {
        let discountText = '';
        if (product.price < menuOptions.find(p => p.name === product.name).price) {
            discountText = ' <span class="discount">-10%</span>';
        }
        myLi += `
            <li>
                <img src="${product.src}">
                <p>${product.name}</p>
                <p class="price">${formatCurrency(product.price)}${discountText}</p>
            </li>
        `;
    });
    list.innerHTML = myLi;
}

function mapAllItems() {
    const newPrices = menuOptions.map((product) => ({
        ...product,
        price: product.price * 0.9 // applying a 10% discount
    }));
    showAll(newPrices);
}

function reduceAllItems() {
    const totalValue = menuOptions.reduce((acc, curr) => acc + curr.price, 0);
    list.innerHTML = `
        <li class="total-box">
            O total de todos os Produtos é de: <span class="price">
                ${formatCurrency(totalValue)}
            </span>
        </li>
    `;
}

function filterVeganItems() {
    const veganItems = menuOptions.filter((product) => product.vegan);
    showAll(veganItems);
}

buttonShowAll.addEventListener('click', () => showAll(menuOptions));
buttonMapAll.addEventListener('click', mapAllItems);
buttonReduceAll.addEventListener('click', reduceAllItems);
buttonFilterVegan.addEventListener('click', filterVeganItems);
