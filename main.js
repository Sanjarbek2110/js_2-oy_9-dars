if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  document.getElementById("toggleBtn").textContent = "Light mode";
} else {
  document.documentElement.classList.remove("dark");
  document.getElementById("toggleBtn").textContent = "Dark mode";
}

function toggleTheme() {
  const html = document.documentElement;
  const button = document.getElementById("toggleBtn");

  html.classList.toggle("dark");

  if (html.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    button.textContent = "Light mode";
  } else {
    localStorage.setItem("theme", "light");
    button.textContent = "Dark mode";
  }
}
const productForm = document.querySelector("#form");
const productInput = document.querySelector("#input");
const wrapper = document.getElementById("wrapper");

let allProducts = [];

function renderProduct(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        allProducts = data.products;
        displayProducts(allProducts)
    })
}

function displayProducts(product){
    wrapper.innerHTML = "";
    product.forEach(element => {
        wrapper.innerHTML += `
    
            <li class="flex flex-col p-5 items-center border border-slate-950 rounded-[10px] dark:text-white shadow-2xl dark:bg-slate-700">
            
                <h2 class="mb-3 text-[20px] font-bold">${element.id}</h2>

                <img src="${element.thumbnail}" class="w-[100px] mb-3">

                <p class="mb-3 text-[20px] font-bold">${element.title.slice(0, 20)}</p>

                <p class="mb-3 text-[20px] font-bold">Narxi: ${element.price}</p>

                <p class="mb-3 text-[20px] font-bold">Reytingi: ${element.rating}</p>

                <p class="mb-3 text-[20px] font-bold">Brend: ${element.brand}</p>
            </li>

        `
    });
}

function search(e){
    e.preventDefault();

    const inputningQiymati = Number(productInput.value.trim());
    // const searchResult = allProducts.filter(product => 
    //     product.id.toLowercase().includes(inputningQiymati)
    // );
     const searchResult = allProducts.filter(product =>
        product.id === inputningQiymati
    );

    displayProducts(searchResult)
}

productForm.addEventListener("submit", search)

renderProduct("https://dummyjson.com/products");


function sortirofka(arr, qiymat){
    if(qiymat === "Balanddan"){
        return arr.sort((a, b) => b.rating - a.rating);
    } else if (qiymat === "Pastdan") {
        return arr.sort((a, b) => a.rating - b.rating);
    }
    return arr;
}

const select = document.querySelector(".select");

select.addEventListener("change", () => {
    const val = select.value;
    let sortId;
    
    if(val === "Balanddan" || val === "Pastdan"){
        sortId = sortirofka(allProducts, val);
    }else{
        sortId = allProducts;
    }

displayProducts(sortId);

});