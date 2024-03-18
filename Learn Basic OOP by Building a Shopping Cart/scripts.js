// HTML'den gerekli elementleri al
const cartContainer = document.getElementById("cart-container"); // Sepetin bulunduğu konteynır
const productsContainer = document.getElementById("products-container"); // Ürünlerin listelendiği konteynır
const dessertCards = document.getElementById("dessert-card-container"); // Tatlı kartlarının bulunduğu konteynır
const cartBtn = document.getElementById("cart-btn"); // Sepet düğmesi
const clearCartBtn = document.getElementById("clear-cart-btn"); // Sepeti temizle düğmesi
const totalNumberOfItems = document.getElementById("total-items"); // Toplam öğe sayısı
const cartSubTotal = document.getElementById("subtotal"); // Sepetin alt toplamı
const cartTaxes = document.getElementById("taxes"); // Sepetin vergisi
const cartTotal = document.getElementById("total"); // Sepetin toplamı
const showHideCartSpan = document.getElementById("show-hide-cart"); // Sepeti göster/gizle düğmesi

// Sepetin gösterilip gizlenmesi için bir değişken
let isCartShowing = false;

// Ürünler listesi
const products = [
  {
    id: 1,
    name: "Vanilla Cupcakes (6 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
  {
    id: 2,
    name: "French Macaron",
    price: 3.99,
    category: "Macaron",
  },
  {
    id: 3,
    name: "Pumpkin Cupcake",
    price: 3.99,
    category: "Cupcake",
  },
  {
    id: 4,
    name: "Chocolate Cupcake",
    price: 5.99,
    category: "Cupcake",
  },
  {
    id: 5,
    name: "Chocolate Pretzels (4 Pack)",
    price: 10.99,
    category: "Pretzel",
  },
  {
    id: 6,
    name: "Strawberry Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 7,
    name: "Chocolate Macarons (4 Pack)",
    price: 9.99,
    category: "Macaron",
  },
  {
    id: 8,
    name: "Strawberry Pretzel",
    price: 4.99,
    category: "Pretzel",
  },
  {
    id: 9,
    name: "Butter Pecan Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 10,
    name: "Rocky Road Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 11,
    name: "Vanilla Macarons (5 Pack)",
    price: 11.99,
    category: "Macaron",
  },
  {
    id: 12,
    name: "Lemon Cupcakes (4 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
];

// Ürünler listesindeki her ürün için bir kart oluştur
products.forEach(
  ({ name, id, price, category }) => {
    dessertCards.innerHTML += `
      <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">$${price}</p>
        <p class="product-category">Kategori: ${category}</p>
        <button 
          id="${id}" 
          class="btn add-to-cart-btn">Sepete Ekle
        </button>
      </div>
    `;
  }
);

// Alışveriş Sepeti sınıfı tanımı
class ShoppingCart {
  constructor() {
    this.items = []; // Sepet öğeleri
    this.total = 0; // Sepetin toplamı
    this.taxRate = 8.25; // Vergi oranı
  }

  // Ürünü sepete ekle
  addItem(id, products) {
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    this.items.push(product);

    // Her ürünün sepette kaç adet olduğunu hesapla
    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
    })

    // Şu anki ürünün sepette kaç adet olduğunu al
    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

    // Eğer üründen sepette birden fazla varsa, adet sayısını göster
    // Yoksa, ürünü sepete ekleyerek HTML'e ekle
    currentProductCount > 1 
      ? currentProductCountSpan.textContent = `${currentProductCount}x`
      : productsContainer.innerHTML += `
      <div id=dessert${id} class="product">
        <p>
          <span class="product-count" id=product-count-for-id${id}></span>${name}
        </p>
        <p>${price}</p>
      </div>
      `;
  }

  // Sepetteki öğe sayısını al
  getCounts() {
    return this.items.length;
  }

  // Sepeti temizle
  clearCart() {
    if (!this.items.length) {
      alert("Sepetiniz zaten boş");
      return;
    }

    // Kullanıcıdan sepetin temizlenmesini onaylayıp onaylamadığını sor
    const isCartCleared = confirm(
      "Sepetinizdeki tüm ürünleri silmek istediğinizden emin misiniz?"
    );

    // Kullanıcı onay verirse, sepeti temizle
    if (isCartCleared) {
      this.items = []; // Sepet öğelerini temizle
      this.total = 0; // Sepet toplamını sıfırla
      productsContainer.innerHTML = ""; // Sepet içeriğini temizle
      totalNumberOfItems.textContent = 0; // Toplam öğe sayısını sıfırla
      cartSubTotal.textContent = 0; // Sepetin alt toplamını sıfırla
      cartTaxes.textContent = 0; // Sepetin vergisini sıfırla
      cartTotal.textContent = 0; // Sepetin toplamını sıfırla
    }
  }

  // Vergiyi hesapla
  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  // Toplamı hesapla ve HTML'i güncelle
  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax;
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;
    return this.total;
  }
};

// Yeni bir alışveriş sepeti oluştur
const cart = new ShoppingCart();

// Her ekleme düğmesine tıklandığında ürünü sepete ekle
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

[...addToCartBtns].forEach(
  (btn) => {
    btn.addEventListener("click", (event) => {
      cart.addItem(Number(event.target.id), products);
      totalNumberOfItems.textContent = cart.getCounts();
      cart.calculateTotal();
    })
  }
);

// Sepeti göster/gizle düğmesine tıklama olayı ekle
cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "Gizle" : "Göster";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

// Sepeti temizle düğmesine tıklama olayı ekle
clearCartBtn.addEventListener('click', cart.clearCart.bind(cart));