const message = document.querySelector('#message'); // Defining message span
let localWeatherUrl = 'https://cors.io/?https://api.openweathermap.org/data/2.5/weather?id=4467732&units=imperial&appid=eb065997c35167132aa6797ba588b228'
let searchUrl = 'https://cors.io/?https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let userInput;

//  Chrome currently supports speech recognition with prefixed properties, therefore at the start of our code we include these lines to feed the right objects to Chrome, and non-prefix browsers, like Firefox.
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList

const grammar = '#JSGF V1.0;'; // states the format and version used. This always needs to be included first.

var recognition = new SpeechRecognition(); // Creating new instance of SpeechRecognition
var speechRecognitionList = new SpeechGrammarList(); // Creating new instance of SpeechGrammarList
speechRecognitionList.addFromString(grammar, 1); // Specifies the importance of this grammar in relation of other grammars available in the list

recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US'; // Sets the language of the recognition.
recognition.interimResults = false; // Defines whether the speech recognition system should return interim results, or just final results.

// Function that runs when speech recognition gets a result
recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const command = event.results[last][0].transcript;
    message.textContent = 'Voice Input: ' + command + '.';

    // Select commands to check checkboxes and respond with action
    if(command.toLowerCase() === 'select steve') {
        responsiveVoice.speak('Selecting Steve!');
        document.querySelector('#chkSteve').checked = true;
    }
    if(command.toLowerCase() === 'select tony') {
        responsiveVoice.speak('Selecting Tony!');
        document.querySelector('#chkTony').checked = true;
    }
    if(command.toLowerCase() === 'select bruce') {
        responsiveVoice.speak('Selecting Bruce!');
        document.querySelector('#chkBruce').checked = true;
    }
    if(command.toLowerCase() === 'select nick') {
        responsiveVoice.speak('Selecting Nick!');
        document.querySelector('#chkNick').checked = true;
    }

    // De-select commands to un-select checkboxes and respond with action
    if(command.toLowerCase() === 'deselect steve') {
        responsiveVoice.speak('De-selecting Steve!');
        document.querySelector('#chkSteve').checked = false;
    }
    if(command.toLowerCase() === 'deselect tony') {
        responsiveVoice.speak('De-selecting Tony!');
        document.querySelector('#chkTony').checked = false;
    }
    if(command.toLowerCase() === 'deselect bruce') {
        responsiveVoice.speak('De-selecting Bruce!');
        document.querySelector('#chkBruce').checked = false;
    }
    if(command.toLowerCase() === 'deselect nick') {
        responsiveVoice.speak('De-selecting Nick!');
        document.querySelector('#chkNick').checked = false;
    }

    // Respond to question
    if(command.toLowerCase().includes('how are you')) {
        responsiveVoice.speak('I am doing fine. Thank you!');
    }

    // Greet
    if(command.toLowerCase().includes('hello')) {
        responsiveVoice.speak('Hello! How are you today?');
    }

    // Aknowledge greeting
    if(command.toLowerCase().includes('i am fine')
        || command.toLowerCase().includes('i am doing fine')
        || command.toLowerCase().includes('i am good')
        || command.toLowerCase().includes('i am doing good')) {
        responsiveVoice.speak('Great! I\'m glad to hear that!');
    }

    // Aknowledge greeting
    if(command.toLowerCase().includes('not good')
        || command.toLowerCase().includes('bad day')
        || command.toLowerCase().includes('horrible')
        || command.toLowerCase().includes('could be better')
        || command.toLowerCase().includes('worst day')) {
        responsiveVoice.speak('Sorry to hear that. What can I do to cheer you up?');
    }

    // Aknowledge thank you
    if(command.toLowerCase().includes('thank you')) {
        responsiveVoice.speak('You are very welcome! That is what I\'m for!');
    }

    // Stop taking
    if(command.toLowerCase().includes('stop talking') || command.toLowerCase().includes('shut up')) {
        responsiveVoice.cancel();
    }

    // Retrieve information
    if(command.toLowerCase().includes('hey friday') || command.toLowerCase().includes('a friday')) {
        responsiveVoice.speak('What do you need?');
    }

    // Retrieve information
    if(command.toLowerCase().includes('tell me about')) {
        let searchTerms = command.split("about");
        responsiveVoice.speak('Hold on. I will find you some info on ' + searchTerms[1] + '!');
        setTimeout(function () {
            console.log(searchTerms[1]);
            this.goWiki(searchTerms[1]);
        }, 3000);
    }

    // Retrieve information
    if(command.toLowerCase().includes('local weather') || command.toLowerCase().includes('weather')) {
        responsiveVoice.speak('Hold on. Checking the local weather!');
        setTimeout(function () {
            this.getLocalWeather(localWeatherUrl);
        }, 3000);
    }

    // Stop listening
    if(command.toLowerCase().includes('stop listening')) {
        recognition.stop();
    }

    setTimeout(function () {
        recognition.start();
    }, 3000);

}

// Stop speech recognition
recognition.onspeechend = () => {
    recognition.stop();
}

// Report error
recognition.onerror = (event) => {
    message.textContent = 'Error occured in recognition: ' + event.error;
}

function continueToListen() {
    setTimeout(function () {
        recognition.start();
    }, 1000);
}

// Event listener for start listening button
document.querySelector('#btnGiveCommand').addEventListener('click', () => {
    recognition.start();
});

// Event listener for start listening button
document.querySelector('#search-wiki').addEventListener('click', () => {
    this.userInput = document.querySelector('#wiki-search-input');
    let term = this.userInput.value;
    this.goWiki(term);
});

function getLocalWeather(url) {
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        this.speakTheLocalWeather(data);
        // console.log(data);
    });
}

function speakTheLocalWeather(data) {
    let weatherData = data;
    let description = weatherData.weather[0].description;
    let currentTemp = weatherData.main.temp;
    let highTemp = weatherData.main.temp_max;
    let lowTemp = weatherData.main.temp_min;

    console.log(weatherData);
    console.log(description);
    console.log(currentTemp);
    console.log(highTemp);
    console.log(lowTemp);

    responsiveVoice.speak('Today is ' + description + ' and ' + currentTemp +  ' degrees.' + ' The high will be ' + highTemp + ' degrees. And the low will be ' + lowTemp + ' degrees.' );
}

function goWiki(topic) {
    let url = searchUrl + topic;
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        this.tellMeWhatYouFound(data);
        console.log(data);
    });
}

function tellMeWhatYouFound(data) {
    let wikiData = data[2][0];
    if (wikiData.includes('may refer to')) {
        wikiData = data[2][0] + data[2][1] + ' or ' + data[2][2];
    }
    if (wikiData !== '') {
        responsiveVoice.speak(wikiData);
    } else {
        responsiveVoice.speak('I\'m sorry! Wiki did not return any results on that. Please rephrase that response!');
    }
}