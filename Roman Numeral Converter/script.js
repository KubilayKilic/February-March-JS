// HTML'den gerekli elementleri al
const form = document.getElementById('form'); // Form elementi
const convertButton = document.getElementById('convert-btn'); // Dönüştürme düğmesi
const output = document.getElementById('output'); // Çıktı alanı

// Sayıyı Roma rakamına dönüştüren fonksiyon
const convertToRoman = num => {
  // Roma rakamlarının karşılıkları ve değerleri
  const ref = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ];
  const res = []; // Sonuç dizisi

  // Referans dizisini gezerek sayıyı Roma rakamına dönüştür
  ref.forEach(function (arr) {
    while (num >= arr[1]) {
      res.push(arr[0]);
      num -= arr[1];
    }
  });

  console.log(res); // Sonucu konsola yazdır
  return res.join(""); // Diziyi birleştirerek dönüştürülen Roma rakamını döndür
};

// Geçerli bir sayı girişi yapıldığını doğrulayan fonksiyon
const isValid = (str, int) => {
  let errText = ''; // Hata mesajı

  // Boş veya geçersiz bir giriş yapıldıysa
  if (!str || str.match(/[e.]/g)) {
    errText = 'Lütfen geçerli bir sayı giriniz.';
  } else if (int < 1) { // 1'den küçük bir sayı girildiyse
    errText = 'Lütfen 1 veya daha büyük bir sayı giriniz.';
  } else if (int > 3999) { // 3999'dan büyük bir sayı girildiyse
    errText = 'Lütfen 3999 veya daha küçük bir sayı giriniz.';
  } else {
    // Hata yoksa
    return true;
  }

  // Hata mesajını ve çıktı stiline göre işle
  output.innerText = errText;
  output.classList.add('alert');

  return false;
};

// Çıktıyı temizleme fonksiyonu
const clearOutput = () => {
  output.innerText = ''; // Çıktı alanını temizle
  output.classList.remove('alert'); // Hata stili kaldır
};

// Form gönderildiğinde tetiklenecek olay dinleyicisi
form.addEventListener('submit', e => {
  e.preventDefault(); // Sayfanın yenilenmesini engelle
  updateUI(); // UI'yi güncelle
});

// Dönüştürme düğmesine tıklandığında tetiklenecek olay dinleyicisi
convertButton.addEventListener('click', () => {
  updateUI(); // UI'yi güncelle
});

// Arayüzü güncelleyen fonksiyon
const updateUI = () => {
  const numStr = document.getElementById('number').value; // Giriş alanından sayıyı al
  const int = parseInt(numStr, 10); // Sayıyı tamsayıya dönüştür

  output.classList.remove('hidden'); // Çıktı alanını görünür yap

  clearOutput(); // Çıktıyı temizle

  // Girişin geçerli olup olmadığını kontrol et
  if (isValid(numStr, int)) {
    output.innerText = convertToRoman(int); // Roma rakamına dönüştürülen sayıyı ekrana yazdır
  }
};