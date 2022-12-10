const modeEasy = document.getElementById("easy");
const modeMedium = document.getElementById("medium");
const modeHard = document.getElementById("hard");
const modeCustom = document.getElementById("custom");
const custom2 = document.getElementById("custom-2");
const inpot = document.getElementById("input");
const customForm = document.getElementById("custom-form");
modeEasy.onclick = () => {
  sessionStorage.setItem("size", 5);
}
modeMedium.onclick = () => {
  sessionStorage.setItem("size", 10);
}
modeHard.onclick = () => {
  sessionStorage.setItem("size", 20);
}

modeCustom.onclick = () => {
  modeCustom.style.display = "none";
  customForm.style.display = "flex";
  setTimeout(() => {
  inpot.style.display = "block";
  inpot.style.width = "0%";
  setTimeout(() => {
    inpot.style.width = "50%";
    custom2.style.width = "50%";
  }, 40);
  }, 200);
  
}

custom2.onclick = () => {
  if (inpot.value && inpot.value > 1) {
    sessionStorage.setItem("size", inpot.value);
    window.location.href = "main.html";
  }
}