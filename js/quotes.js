const adviceID = document.getElementById("advice-id");
const adviceText = document.getElementById("advice-text");
const adviceBtn = document.getElementById("generate-btn");
const url = "https://api.adviceslip.com/advice";

// fectch data using async method
async function getAdvice() {
  // fetch data using fetch method
  const res = await fetch(url);
  const {
    slip: { id, advice },
  } = await res.json();
  adviceID.innerText = id;
  adviceText.innerText = advice;
}

adviceBtn.addEventListener("click", function () {
  getAdvice();
});
