// id'si number-input olan elementi bütün attribute'ları ile alır ve numberInput sabitine atar.
const numberInput = document.getElementById("number-input");

// id'si convert-btn-input olan elementi bütün attribute'ları ile alır ve convertBtn sabitine atar.
const convertBtn = document.getElementById('convert-btn');

// id'si result olan elementi bütün attribute'ları ile alır ve result sabitine atar.
const result = document.getElementById('result');

const animationContainer = document.getElementById('animation-container');

const animationData = [
  {
    inputVal: 5,
    marginTop: 300,
    addElDelay: 1000,
    msg: "decimalToBinary(5) returns '10' + 1 (5 % 2). Then it pops off the stack.",
    showMsgDelay: 15000,
    removeElDelay: 20000
  },
  {
    inputVal: 2,
    marginTop: -200,
    addElDelay: 1500,
    msg: "decimalToBinary(2) returns '1' + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.",
    showMsgDelay: 10000,
    removeElDelay: 15000
  },
  {
    inputVal: 1,
    marginTop: -200,
    addElDelay: 2000,
    msg: "decimalToBinary(1) returns '1' (base case) and gives that value to the stack below. Then it pops off the stack.",
    showMsgDelay: 5000,
    removeElDelay: 10000
  },
];

/*
function countDown (n) {
  nums = [];
  for (let i = 0; i<n; i++){
    nums.unshift(i);
  }
  return nums;
}
console.log(countDown(8));
*/

const decimalToBinary = (input) => {
  if(input === 0 || input === 1) {
      return String(input);
    } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

const showAnimation = () => {
  result.innerText = "Call Stack Animation";
  animationData.forEach((obj) => {
    setTimeout(() => {
      animationContainer.innerHTML += 
      `
        <p id="${obj.inputVal}" style="margin-top: ${obj.marginTop}px;" class="animation-frame">
        decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);
    setTimeout(() =>{
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);
    setTimeout(() =>{
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });
  setTimeout(() => {
    result.textContent = decimalToBinary(5);
  }, 20000);
}

//Number input kısmına girilen değeri konsola yazdırmak için bir fonksiyon

  //numberInput.value === '' yerine !numberInput.value kullandık, çünkü falsy olup olmadığını kontrol edeceğiz. ! -> tek bir işlenen alır ve doğruluk değerini ters çevirir. num = 0 falsy iken !num true döndürecektir.

  const checkUserInput = () => {

    const inputInt = parseInt(numberInput.value);

    if (!numberInput.value || isNaN(inputInt)) {
      alert("Please provide a decimal number");
      return;
    }
  
    if (inputInt === 5) {
      showAnimation();
      return;
    }
  
    result.textContent = decimalToBinary(inputInt);
    numberInput.value = "";
  };

//Convert butonuna click eventi tanımlayan ve click edilince checkUserInput fonksiyonunu çağıran
convertBtn.addEventListener("click", checkUserInput);

//enter'a basıldığında da konsola sayıyı yazdıran
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});