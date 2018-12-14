const message = document.querySelector('#message'); // Defining message span

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

// Function that runs when sppech recognition gets a result
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

    // if(command.toLowerCase().includes('tell me something')) {
    //     var info = WIKIPEDIA.getData('http://en.wikipedia.org/wiki/Invasion_of_Normandy');
    //     alert(info.summary.title);
    //     // console.log(info);
    // }
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

let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let userInput;

// Event listener for start listening button
document.querySelector('#search-wiki').addEventListener('click', () => {
    console.log('Click!!');
    this.userInput = document.querySelector('#wiki-search-input');
    // this.userInput.changed(goWiki);
    this.goWiki();
});

function goWiki() {
    let term = this.userInput.value;
    let url = searchUrl + term;
    JSON.parse(url);
    console.log(JSON.parse(url););
}

function gotData(data) {
    console.log(data);
}