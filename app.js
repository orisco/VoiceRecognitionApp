// // find location !

// $(() => {
//   window.navigator.geolocation.getCurrentPosition((coords) => {
//     const { latitude, longitude } = coords.coords;
//     console.log(latitude);
//     console.log(longitude);
//     $.get(`https://geocode.xyz/${latitude},${longitude}?json=1`, function (
//       res
//     ) {
//       console.log(res);
//     });
//   });
// });

let recogClass = window.SpeechRecognition || window.webkitSpeechRecognition;

let range = document.querySelector(".pitch");
let btn = document.querySelector("button");
let select = document.querySelector("select");
let recog = new recogClass();
let voices = [];
const speech = new SpeechSynthesisUtterance();

const greeting = [
  "hey you!",
  "hey y'all",
  "what's up?",
  "long time no see, how are you?",
];

const weather = [
  "too hot! stay home",
  "i think you're should turn up the AC",
  "welcome to hell",
];

recog.lang = "en";

range.addEventListener("change", (e) => {
  speech.pitch - e.target.value;
});

btn.addEventListener("click", (e) => {
  recog.start();
});

recog.onstart = function () {
  console.log("i'm listening");
};

window.speechSynthesis.onvoiceschanged = function () {
  voices = window.speechSynthesis.getVoices();
  for (const voice of voices) {
    let option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.value = voice.name;
    select.appendChild(option);
  }
};
select.addEventListener("change", (e) => {
  let voice = voice.find((v) => v.name == e.target.value);
  speech.voice = voice;
});

recog.onresult = async function (e) {
  let txt = e.results[0][0].transcript;
  speech.volume = 1;
  speech.pitch = 1;
  speech.rate = 1;
  speech.text = "I'm sorry, i didn't understand, please try again";

  if (txt.includes("hey") || txt.includes("hello")) {
    speech.text = greeting[Math.floor(Math.random() * greeting.length)];
  } else if (txt.includes("weather")) {
    speech.text = weather[Math.floor(Math.random() * weather.length)];
  } else if (txt.includes("joke")) {
    let data = await fetch("https://api.chucknorris.io/jokes/random");
    let res = await data.json();
    speech.text = res.value;
  } else if (txt.includes("shock")) {
    speech.text = "ani beahelem";
  }
  window.speechSynthesis.speak(speech);
};
