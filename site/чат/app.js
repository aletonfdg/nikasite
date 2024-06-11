const currentDate = new Date();
const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
];
const daysOfWeek = [
    "Воскресенье", "Понедельник", "Вторник", "Среда",
    "Четверг", "Пятница", "Суббота"
];
const monthIndex = currentDate.getMonth();
const monthName = months[monthIndex];
const dayOfWeekIndex = currentDate.getDay();
const dayOfWeekName = daysOfWeek[dayOfWeekIndex];
const dateDisplay = document.getElementById("dateDisplay");
dateDisplay.textContent = ` ${currentDate.getDate()} ${monthName}, ${dayOfWeekName}`;
const code_to_smile = {
    "Clear": "☀️",
    "Clouds": "☁️",
    "Rain": "🌧️",
    "Drizzle": "🌧️",
    "Thunderstorm": "⛈️",
    "Snow": "🌨️",
    "Mist": "🌫️"
};



function capitalizeFirstLetter(sentence) {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

function capitalizeFirstLetter() {
    const inputElement = document.getElementById("cityInput");
    let inputValue = inputElement.value;
    inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
    inputElement.value = inputValue;
    if (inputElement.value == 'Пинск')
        alert('соболезную');
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputElement.value + '&units=metric&lang=ru&appid=79d1ca96933b0328e1c7e3e7a26cb347';


    fetch(url)
        .then(response => response.json()) // Преобразуем ответ в JSON
        .then(data => {
            document.getElementById('wind').innerHTML = Math.round(data.wind.speed) + " м/c";
            if (document.getElementById('wind').innerHTML!=0)
                document.getElementById("wi").src="3.svg";
                document.getElementById("wi").style.clientWidth="87px";
            document.getElementById('description').innerHTML = data.weather[0].description;
            if (data.main.temp > 0)
                document.getElementById('temper').innerHTML = "+" + Math.round(data.main.temp) + '&deg;';
            else document.getElementById('temper').innerHTML = Math.round(data.main.temp) + '&deg;';
            document.getElementById('temper_f').innerHTML = 'Ощущается как ' + Math.round(data.main.feels_like) + '&deg;';
            const icona = data.weather[0].main;
            document.getElementById('icon').innerHTML = code_to_smile[icona];
        })
    localStorage.setItem("savedCity", inputElement.value);
}

// Restore the previously entered city when the page loads

if (localStorage.getItem("savedCity")) {
    document.getElementById("cityInput").value = localStorage.getItem("savedCity");
    border = "none";
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + localStorage.getItem("savedCity") + '&units=metric&lang=ru&appid=79d1ca96933b0328e1c7e3e7a26cb347';

    fetch(url)
        .then(response => response.json()) // Преобразуем ответ в JSON
        .then(data => {     
            document.getElementById('wind').innerHTML = Math.round(data.wind.speed) + " м/c";
            if (document.getElementById('wind').innerHTML!=0)
                document.getElementById("wi").src="3.svg";
                document.getElementById("wi").style.clientWidth="87px";
            document.getElementById('description').innerHTML = data.weather[0].description;
            if (data.main.temp > 0)
                document.getElementById('temper').innerHTML = "+" + Math.round(data.main.temp) + '&deg;';
            else document.getElementById('temper').innerHTML = Math.round(data.main.temp) + '&deg;';
            document.getElementById('temper_f').innerHTML = 'Ощущается как ' + Math.round(data.main.feels_like) + '&deg;';
            const icona = data.weather[0].main;

            document.getElementById('icon').innerHTML = code_to_smile[icona];
        })


}

let wind = 0;


function sendMessage() {
    
    if (wind == 1)
        {   
            document.getElementById('keybord').value = '';
            return 0;
        }
        
    else wind=1;
    function scrollToBottom() {
        const elements = document.getElementsByClassName('chat-history');
        if (elements.length > 0) {
          const element = elements[0];
          const lastChild = element.lastElementChild;
          if (lastChild) {
            lastChild.scrollIntoView({ behavior: 'smooth' });
          } else {
            console.warn('No child elements found in chat-history.');
          }
        } else {
          console.error('Element with class "chat-history" not found.');
        }
    }

    var userMessage = document.getElementById('keybord').value;
    document.getElementById('keybord').value = '';
    var chatHistory = document.getElementById('chat-history');

    function removeExtraSpaces(string) {
        let newStr = '';
        for (const char of string) {
            if (char !== ' ') {
                newStr += char;
            }
        }
        return newStr;
    }

    userMessage2 = removeExtraSpaces(userMessage);
    console.log(userMessage);
    if (userMessage2 != "") {


        var userChatBubble = document.createElement('div');
        userChatBubble.className = 'rmfn';
        userChatBubble.innerHTML = '<div class="rmfn"><div id="cap">ВЫ</div><div id="messe">' + userMessage + '</div><img src="101.svg" alt="user" width="57px" height="57px" id="mika"></div>';
        chatHistory.appendChild(userChatBubble);
        const socket = new WebSocket('ws://192.168.1.203:452');

        var nikaChatBubble = document.createElement('div');
        nikaChatBubble.innerHTML = '<div class="rmfn" ><div id="cap">НИКА</div><div id="messe"><div class="loading">Ника печатает...</div></div><img src="icon.svg" alt="nika" width="60px" height="60px" id="mika"></div>';
        nikaChatBubble.style.marginLeft = "8px";
        nikaChatBubble.style.color = "#808080";
        chatHistory.appendChild(nikaChatBubble);
        scrollToBottom();
        console.log('1');
        console.log('2');
        socket.addEventListener('open', event => {
            console.log('WebSocket connection established.');
            socket.send(userMessage);

        });
        console.log('3');


        socket.addEventListener('message', event => {
            nikaChatBubble.remove();
            console.log(`Received message: ${event.data}`);
            if (event.data != '[object Blob]' && event.data != '[object ArrayBuffer]') {
                if (event.data[0] == '$') {

                    var nikaChatBubble2 = document.createElement('div');
                    nikaChatBubble2.innerHTML = '<div class="rmfn"><div id="cap">НИКА</div><div id="messe">Включаю</div><img src="icon.svg" alt="nika" width="60px" height="60px" id="mika"><button onmousedown="changeSize()" onmouseup="resetSize()"><img src="10.svg" width="35.36px" height="35.36px" id="copy" onmouseout="resetSize()"></button></div>';
                    chatHistory.appendChild(nikaChatBubble2);
                    var str;
                    str = event.data;
                    wind = 0;
                    setTimeout(() => { window.open('https://music.yandex.by/search?text=' + str); }, 2000);

                } else {
                    var nikaChatBubble2 = document.createElement('div');
                    nikaChatBubble2.innerHTML = '<div class="rmfn"><div id="cap">НИКА</div><div id="messe">' + event.data + '</div><img src="icon.svg" alt="nika" width="60px" height="60px" id="mika"></div>';
                    chatHistory.appendChild(nikaChatBubble2);
                    scrollToBottom();
                    wind = 0;
                }
            }
            
        });

        

        const audioPromises = [];

// Обработчик сообщения WebSocket
socket.onmessage = async function(event) {
    const blob = new Blob([event.data], { type: 'audio/wav' });
    const audioURL = URL.createObjectURL(blob);

    // Создаём и добавляем новый промис в очередь
    const newAudioPromise = async () => {
        await playAudio(audioURL);
    };

    audioPromises.push(newAudioPromise);

    // Если это первый элемент в очереди, начинаем воспроизведение
    if (audioPromises.length === 1) {
        await processQueue();
    }
};

// Функция для воспроизведения аудио
async function playAudio(audioURL) {
    try {
        const audio = new Audio();
        audio.src = audioURL;
        await audio.play();
        await new Promise(resolve => audio.onended = resolve); // Ждём окончания воспроизведения
    } catch (error) {
        console.error("Error playing audio:", error);
    }
}

// Функция для обработки очереди
async function processQueue() {
    while (audioPromises.length > 0) {
        const currentAudioPromise = audioPromises.shift();
        await currentAudioPromise();
    }
}
          
          
        
          

        socket.addEventListener('close', event => {
            console.log('WebSocket connection closed.');
        });

        socket.binaryType = 'arraybuffer';

    }
}

  const recognizeButton = document.getElementById('micro');
  const resultsDiv = document.getElementById('keybord');
  const microphoneButton =  recognizeButton;
  let recognition;
  let isRecognizing = false;
  let finalTranscript = '';
  
  if (!('webkitSpeechRecognition' in window)) {
      alert('Нету поддержки в данном браузере :(');
  } else {
      document.getElementById('keybord').value = '';
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
          recognizeButton.src = "6.svg";
          recognizeButton.style.clientHeight = '60px';
          recognizeButton.style.clientWidth = '60px';
          isRecognizing = true;
      };
  
      recognition.onerror = (event) => {
          console.error(event.error);
      };
  
      recognition.onend = () => {
          
          recognizeButton.src = "icon.svg";
          recognizeButton.style.clientHeight = '57px';
          recognizeButton.style.clientWidth = '60px';
          isRecognizing = false;
      };
  
      recognition.onresult = (event) => {
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                  finalTranscript += event.results[i][0].transcript;
              } else {
                  interimTranscript += event.results[i][0].transcript;
                  console.log(interimTranscript);
                  document.getElementById('keybord').value=interimTranscript;
              }
          }
          document.getElementById('keybord').value = finalTranscript;
          finalTranscript = '';
      };
  }
  
  recognizeButton.addEventListener('click', () => {
      if (isRecognizing) {
          recognition.stop();
      } else {
          recognition.start();
      }
  });
let  cop = ['Здравствуйте, я Ника, голосовой помощник, слушаю вас.']

function copy(i) {
    
    navigator.clipboard.writeText(cop[i])
}

function copyed() {

    const copyButton = document.getElementById(messe);

    copy(i)
}

/* <button title="a" onmousedown="changeSize()" onmouseup="resetSize()" data-id="rmfn" onclick="copyed()"> 
                        <img title="a"  src="10.svg" width="35.36px" height="35.36px" id="copy">
                    </button> */
