const generateBtn = document.getElementById('generate');
const passwordField = document.getElementById('password');
const copyBtn = document.getElementById('copy');
const strengthBar = document.getElementById('strength-bar');

function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function calculateStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  return strength;
}

function updateStrengthBar(password) {
  const strength = calculateStrength(password);
  const bar = strengthBar;
  const colors = ["red", "orange", "yellowgreen", "green"];
  bar.style.setProperty('--width', `${(strength / 4) * 100}%`);
  bar.style.background = colors[strength - 1] || "transparent";
  bar.style.width = `${(strength / 4) * 100}%`;
}

function generatePassword() {
  const length = parseInt(document.getElementById('length').value);
  const useUpper = document.getElementById('uppercase').checked;
  const useLower = document.getElementById('lowercase').checked;
  const useNumbers = document.getElementById('numbers').checked;
  const useSymbols = document.getElementById('symbols').checked;

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let charPool = "";
  if (useUpper) charPool += upperChars;
  if (useLower) charPool += lowerChars;
  if (useNumbers) charPool += numberChars;
  if (useSymbols) charPool += symbolChars;

  if (charPool === "") return "";

  let password = "";
  for (let i = 0; i < length; i++) {
    password += getRandomChar(charPool);
  }

  return password;
}

generateBtn.addEventListener('click', () => {
  const pwd = generatePassword();
  passwordField.value = pwd;
  updateStrengthBar(pwd);
});

copyBtn.addEventListener('click', () => {
  if (!passwordField.value) return;
  navigator.clipboard.writeText(passwordField.value)
    .then(() => alert("Password copied to clipboard!"))
    .catch(() => alert("Failed to copy password."));
});
