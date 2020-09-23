

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
let recognition = new window.SpeechRecognition();
recognition.interimResults = true;
recognition.maxAlternatives = 10;
recognition.continuous = true;
recognition.lang = "de-DE";
recognition.onresult = (event) => {
    for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            transcript = transcript.trim();
            transcript = transcript.toLowerCase();
            target.dispatchEvent(new CustomEvent('onSpeech', { detail: { recognized: transcript }  }));
        }
    }
}

recognition.start();

