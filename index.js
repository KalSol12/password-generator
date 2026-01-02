const passwordEl = document.getElementById("password");
const lengthEl = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+";

const strengthText = document.getElementById("strength-text");
const bars = document.querySelectorAll(".bars span");

lengthEl.addEventListener("input", () => {
  lengthValue.textContent = lengthEl.value;
});

function generatePassword() {
  let chars = "";
  if (document.getElementById("upper").checked) chars += upper;
  if (document.getElementById("lower").checked) chars += lower;
  if (document.getElementById("numbers").checked) chars += numbers;
  if (document.getElementById("symbols").checked) chars += symbols;

  let password = "";
  for (let i = 0; i < lengthEl.value; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
}

function updateStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  bars.forEach((bar, i) => {
    bar.style.background = i < strength ? "#a4ffaf" : "transparent";
  });

  strengthText.textContent =
    strength <= 1 ? "WEAK" :
    strength === 2 ? "MEDIUM" :
    strength === 3 ? "STRONG" : "VERY STRONG";
}

generateBtn.addEventListener("click", () => {
  const pwd = generatePassword();
  passwordEl.value = pwd;
  updateStrength(pwd);
});

copyBtn.addEventListener("click", () => {
  if (!passwordEl.value) return;
  navigator.clipboard.writeText(passwordEl.value);
  alert("Password copied!");
});
