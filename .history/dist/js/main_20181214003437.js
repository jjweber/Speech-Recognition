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
}

// Stop speech recognition
recognition.onspeechend = () => {
    recognition.stop();
}

// Report error
recognition.onerror = (event) => {
    message.textContent = 'Error occured in recognition: ' + event.error;
}


// Event listener for start listening button
document.querySelector('#btnGiveCommand').addEventListener('click', () => {
    recognition.start();
});

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