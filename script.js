const words = [
  { image: “father.png”, chinese: “爸爸”, pinyin: “Bàba”, thai: “พ่อ” },
  { image: “mother.png”, chinese: “妈妈”, pinyin: “Māmā”, thai: “แม่” },
  { image: “brother.png”, chinese: “哥哥”, pinyin: “Gēge”, thai: “พี่ชาย” },
  { image: “sister.png”, chinese: “妹妹”, pinyin: “Mèimei”, thai: “น้องสาว” },
  { image: “grandfather.png”, chinese: “爷爷”, pinyin: “Yéye”, thai: “คุณปู่” },
  { image: “grandmother.png”, chinese: “奶奶”, pinyin: “Nǎinai”, thai: “คุณย่า” },
  { image: “uncle.png”, chinese: “叔叔”, pinyin: “Shūshu”, thai: “ลุง” },
  { image: “aunt.png”, chinese: “阿姨”, pinyin: “Āyí”, thai: “ป้า” },
  { image: “cousin.png”, chinese: “表哥”, pinyin: “Biǎogē”, thai: “ลูกพี่ลูกน้องชาย” },
  { image: “child.png”, chinese: “孩子”, pinyin: “Háizi”, thai: “เด็ก” },
];

let currentWord = {};
let shuffledPinyin = [];
let userAnswer = [];

const homeContainer = document.getElementById("home");
const gameContainer = document.getElementById("game");
const wordListContainer = document.getElementById("word-list");
const pinyinLettersContainer = document.getElementById("pinyin-letters");
const checkAnswerButton = document.getElementById("check-answer");
const resultText = document.getElementById("result");

// โหลดคำศัพท์บนหน้าแรก
function loadWords() {
  words.forEach((word) => {
    const card = document.createElement("div");
    card.classList.add("word-card");
    card.innerHTML = `
      <img src="${word.image}" alt="${word.thai}">
      <p>${word.chinese}</p>
      <p>${word.pinyin}</p>
      <p>${word.thai}</p>
    `;
    wordListContainer.appendChild(card);
  });
}

function startGame() {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  shuffledPinyin = shufflePinyin(currentWord.pinyin.split(""));
  userAnswer = [];

  // แสดงหน้าเกม
  homeContainer.style.display = "none";
  gameContainer.style.display = "block";

  displayPinyin();
}

function shufflePinyin(pinyin) {
  return pinyin.sort(() => Math.random() - 0.5);
}

function displayPinyin() {
  pinyinLettersContainer.innerHTML = "";
  shuffledPinyin.forEach((letter, index) => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.onclick = () => selectLetter(index);
    pinyinLettersContainer.appendChild(button);
  });
}

function selectLetter(index) {
  userAnswer.push(shuffledPinyin[index]);
  shuffledPinyin[index] = "";
  displayPinyin();
  checkAnswerButton.disabled = userAnswer.length !== currentWord.pinyin.length;
}

function checkAnswer() {
  if (userAnswer.join("") === currentWord.pinyin) {
    resultText.textContent = `คำตอบถูกต้อง! คำศัพท์: ${currentWord.chinese} (${currentWord.pinyin}) แปลว่า ${currentWord.thai}`;
    resultText.style.color = "green";
  } else {
    resultText.textContent = "คำตอบผิด! ลองใหม่";
    resultText.style.color = "red";
  }
}

document.getElementById("start-button").onclick = startGame;
checkAnswerButton.onclick = checkAnswer;

function selectLetter(index) {
  userAnswer.push(shuffledPinyin[index]);
  shuffledPinyin[index] = "";
  displayPinyin();
  displayAnswer();
  checkAnswerButton.disabled = userAnswer.length !== currentWord.pinyin.length;
  document.getElementById("back-button").style.display = "inline-block";
}
function backLetter() {
  if (userAnswer.length > 0) {
    const lastLetter = userAnswer.pop();
    shuffledPinyin[shuffledPinyin.indexOf("")] = lastLetter;
    displayPinyin();
    displayAnswer();
  }

  // ซ่อนปุ่มย้อนกลับหากไม่มีตัวอักษรเหลือ
  if (userAnswer.length === 0) {
    document.getElementById("back-button").style.display = "none";
  }
}
function restartGame() {
  userAnswer = [];
  shuffledPinyin = shufflePinyin(currentWord.pinyin.split(""));
  resultText.textContent = ""; // ลบข้อความผลลัพธ์
  displayPinyin();
  displayAnswer();
  document.getElementById("back-button").style.display = "none"; // ซ่อนปุ่มย้อนกลับ
  checkAnswerButton.disabled = true; // ปิดปุ่มตรวจคำตอบ
}
document.getElementById("back-button").onclick = backLetter;
document.getElementById("restart-button").onclick = restartGame;


function displayAnswer() {
  resultText.textContent = userAnswer.join(""); // แสดงคำตอบที่ผู้เล่นเลือก
}

function checkAnswer() {
  // ตรวจสอบว่าใส่คำศัพท์ครบหรือยัง
  if (userAnswer.length < currentWord.pinyin.length) {
    resultText.textContent = "ยังใส่คำศัพท์ไม่ครบ! กรุณาใส่พินอินให้ครบก่อนตรวจคำตอบ";
    resultText.style.color = "orange"; // ใช้สีเตือน
  } else if (userAnswer.join("") === currentWord.pinyin) {
    resultText.textContent = `คำตอบถูกต้อง! คำศัพท์: ${currentWord.chinese} (${currentWord.pinyin}) แปลว่า ${currentWord.thai}`;
    resultText.style.color = "green";
    document.getElementById("next-word").style.display = "inline-block"; // แสดงปุ่มถัดไป
    document.getElementById("restart-button").style.display = "none"; // ซ่อนปุ่มเริ่มใหม่
    document.getElementById("check-answer").disabled = true; // ปิดปุ่มตรวจคำตอบ
  } else {
    resultText.textContent = "คำตอบผิด! ลองใหม่";
    resultText.style.color = "red";
    document.getElementById("restart-button").style.display = "inline-block"; // แสดงปุ่มเริ่มใหม่
  }
}
function nextWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  shuffledPinyin = shufflePinyin(currentWord.pinyin.split(""));
  userAnswer = [];

  // รีเซ็ต UI
  resultText.textContent = "";
  document.getElementById("next-word").style.display = "none";
  document.getElementById("restart-button").style.display = "none";
  document.getElementById("check-answer").disabled = true;

  displayPinyin();
}

document.getElementById("next-word").onclick = nextWord;

// โหลดคำศัพท์เริ่มต้น
loadWords();

///BlackMarcos
