"use strict";

//variables
var Alexa = require("alexa-sdk");
const APP_ID = "SUJAN_540_1";

const alphabets = require('alphabets.json');
const rhymes = require('rhymes.json');

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
}

var targetWord = '';

var handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'Welcome to Kids Learning Alexa app, please say: learn words: play quiz: or: play A B C song', 'Sorry! I didn\'t hear you, Can you say: learn words: or: play quiz: or: play A B C song?');
    },
    'MainMenu': function () {
        this.emit(':ask', 'Please say: learn words: play quiz: or: play A B C song: or: stop: to close this app', 'Sorry! I didn\'t hear you, Can you say: learn words: or: play quiz: or: play A B C song: or: stop: to close this app');
    },
    'ABCDRhymes': function () {
        var song = rhymes['abcRhymes'][Math.floor(Math.random() * rhymes['abcRhymes'].length)];
        this.emit(':ask', '<audio src=\'' + song + '\'/>' + ' if you want to listen more rhymes: say: next song: or: main menu', 'Sorry! I didn\'t hear you, Can you say: next song: or: main menu: or: stop: to close this app');
    },
    "Rhymes": function () {
        var song = rhymes['rhymes'][Math.floor(Math.random() * rhymes['rhymes'].length)];
        this.emit(':ask', '<audio src=\'' + song + '\'/>' + ' if you want to listen more rhymes: say: next song: or: main menu', 'Sorry! I didn\'t hear you, Can you say: next song: or: main menu: or: stop: to close this app');
    },
    'LearnWords': function () {
        this.emit(':ask', 'Learn alphabet and word, please say: A for', 'Sorry! I didn\'t hear you, Can you say: A for: or: B for: or: main menu: or: stop: to close this app');
    },
    'PlayQuiz': function () {
        targetWord = getRandomChildWord();
        this.emit(':ask', 'Spell the alphabets of word: ' + targetWord, 'Sorry! I didn\'t hear you, Can you spell word: ' + targetWord + '?');
    },
    'Unhandled': function () {
        if (this.handler.state) {
            this.emitWithState('Unhandled');
        } else {
            this.emit(':ask', 'Sorry! I didn\'t understand you. What did you say?', 'Sorry! I didn\'t hear you, Can you say: main menu: or: stop to close this app');
        }
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'This is kids learning app to learn alphabets and words: please say: learn words: or: play quiz: or: play A B C song: or: pronounce alphabet', 'Sorry! I didn\'t hear you, please say: main menu: or: stop to close this app');
    },
    'AMAZON.StopIntent': function () {
        this.emit('Stop');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('Stop');
    },
    'Stop': function () {
        this.emit(":tell", "Will see you soon! Goodbye!");
    },
    'PronounceAlphabet': function () {
        this.emit(':ask', parseWordToSpell('ABCDEFGHIJKLMNOPQRSTUVWXYZ') + ',: please say: main menu: or: stop to close this app', 'Sorry! I didn\'t hear you, please say: main menu: or: stop to close this app');
    },
    //B,G,K,M,O,T
    'CheckThreeAlphabetWord': function () {
        var slots = [
            this.event.request.intent.slots.alphabetOne.value,
            this.event.request.intent.slots.alphabetTwo.value,
            this.event.request.intent.slots.alphabetThree.value
        ];
        var emit = getEmit(slots);
        targetWord = '';
        this.emit(':ask', emit[0], emit[1]);
    },
    'CheckFourAlphabetWord': function () {
        var slots = [
            this.event.request.intent.slots.alphabetOne.value,
            this.event.request.intent.slots.alphabetTwo.value,
            this.event.request.intent.slots.alphabetThree.value,
            this.event.request.intent.slots.alphabetFour.value
        ];
        var emit = getEmit(slots);
        targetWord = '';
        this.emit(':ask', emit[0], emit[1]);
    },
    'CheckFiveAlphabetWord': function () {
        var slots = [
            this.event.request.intent.slots.alphabetOne.value,
            this.event.request.intent.slots.alphabetTwo.value,
            this.event.request.intent.slots.alphabetThree.value,
            this.event.request.intent.slots.alphabetFour.value,
            this.event.request.intent.slots.alphabetFive.value
        ];
        var emit = getEmit(slots);
        targetWord = '';
        this.emit(':ask', emit[0], emit[1]);
    },
    'CheckSixAlphabetWord': function () {
        var slots = [
            this.event.request.intent.slots.alphabetOne.value,
            this.event.request.intent.slots.alphabetTwo.value,
            this.event.request.intent.slots.alphabetThree.value,
            this.event.request.intent.slots.alphabetFour.value,
            this.event.request.intent.slots.alphabetFive.value,
            this.event.request.intent.slots.alphabetSix.value
        ];
        var emit = getEmit(slots);
        targetWord = '';
        this.emit(':ask', emit[0], emit[1]);
    },
    'CheckSevenAlphabetWord': function () {
        var slots = [
            this.event.request.intent.slots.alphabetOne.value,
            this.event.request.intent.slots.alphabetTwo.value,
            this.event.request.intent.slots.alphabetThree.value,
            this.event.request.intent.slots.alphabetFour.value,
            this.event.request.intent.slots.alphabetFive.value,
            this.event.request.intent.slots.alphabetSix.value,
            this.event.request.intent.slots.alphabetSeven.value
        ];
        var emit = getEmit(slots);
        targetWord = '';
        this.emit(':ask', emit[0], emit[1]);
    },
    'CheckEightAlphabetWord': function () {
        var slots = [
            this.event.request.intent.slots.alphabetOne.value,
            this.event.request.intent.slots.alphabetTwo.value,
            this.event.request.intent.slots.alphabetThree.value,
            this.event.request.intent.slots.alphabetFour.value,
            this.event.request.intent.slots.alphabetFive.value,
            this.event.request.intent.slots.alphabetSix.value,
            this.event.request.intent.slots.alphabetSeven.value,
            this.event.request.intent.slots.alphabetEight.value
        ];
        var emit = getEmit(slots);
        targetWord = '';
        this.emit(':ask', emit[0], emit[1]);
    },
    'CheckNineAlphabetWord': function () {
        var slots = [
            this.event.request.intent.slots.alphabetOne.value,
            this.event.request.intent.slots.alphabetTwo.value,
            this.event.request.intent.slots.alphabetThree.value,
            this.event.request.intent.slots.alphabetFour.value,
            this.event.request.intent.slots.alphabetFive.value,
            this.event.request.intent.slots.alphabetSix.value,
            this.event.request.intent.slots.alphabetSeven.value,
            this.event.request.intent.slots.alphabetEight.value,
            this.event.request.intent.slots.alphabetNine.value
        ];
        var emit = getEmit(slots);
        targetWord = '';
        this.emit(':ask', emit[0], emit[1]);
    },
    'CheckTenAlphabetWord': function () {
        var slots = [
            this.event.request.intent.slots.alphabetOne.value,
            this.event.request.intent.slots.alphabetTwo.value,
            this.event.request.intent.slots.alphabetThree.value,
            this.event.request.intent.slots.alphabetFour.value,
            this.event.request.intent.slots.alphabetFive.value,
            this.event.request.intent.slots.alphabetSix.value,
            this.event.request.intent.slots.alphabetSeven.value,
            this.event.request.intent.slots.alphabetEight.value,
            this.event.request.intent.slots.alphabetNine.value,
            this.event.request.intent.slots.alphabetTen.value
        ];
        var emit = getEmit(slots);
        targetWord = '';
        this.emit(':ask', emit[0], emit[1]);
    },
    'CheckElevenAlphabetWord': function () {
        var slots = [
            this.event.request.intent.slots.alphabetOne.value,
            this.event.request.intent.slots.alphabetTwo.value,
            this.event.request.intent.slots.alphabetThree.value,
            this.event.request.intent.slots.alphabetFour.value,
            this.event.request.intent.slots.alphabetFive.value,
            this.event.request.intent.slots.alphabetSix.value,
            this.event.request.intent.slots.alphabetSeven.value,
            this.event.request.intent.slots.alphabetEight.value,
            this.event.request.intent.slots.alphabetNine.value,
            this.event.request.intent.slots.alphabetTen.value,
            this.event.request.intent.slots.alphabetEleven.value
        ];
        var emit = getEmit(slots);
        targetWord = '';
        this.emit(':ask', emit[0], emit[1]);
    },
    'GetWord': function () {
        var alphabet = getAlphabet(this.event.request.intent.slots.alphabet.value.toUpperCase());

        if (alphabet.length > 2) {
            this.emit(':ask', 'Sorry! I didn\'t find skill for that, please say it again,', 'Sorry! I didn\'t hear you, please say: main menu: or: stop to close this app');
        }

        var value = alphabets[alphabet[0]];
        if (value) {
            var word = value.words[Math.floor(Math.random() * value.words.length)];
            this.emit(':ask', alphabet + ': for: ' + word + ': ' + parseWordToSpell(word) + ': ' + word + ": Next?", ': if you are having trouble pronouncing alphabets, say: pronounce alphabet: or: next: or: main menu: or: stop to close this app');
        } else {
            this.emit(':ask', 'Sorry! I didn\'t get that,', 'Sorry! I didn\'t hear you, please say: main menu: or: stop to close this app');
        }
    }
}

function parseWordToSpell(word) {
    var wordReturn = '';
    for (var i = 0; i < word.length; i++) {
        wordReturn = wordReturn + word[i] + ': ';
    }
    return wordReturn;
}

function getAlphabet(captured) {
    if (captured == 'YES') {
        return 'S';
    } else if (captured == 'YOU') {
        return 'U';
    } else if (captured == 'WHITE' || captured == 'WHY') {
        return 'Y';
    } else if (captured.indexOf('B') > -1) {
        return 'B';
    } else if (captured.indexOf('G') > -1) {
        return 'G';
    } else if (captured.indexOf('K') > -1) {
        return 'K';
    } else if (captured.indexOf('M') > -1) {
        return 'M';
    } else if (captured.indexOf('O') > -1) {
        return 'O';
    } else if (captured.indexOf('T') > -1) {
        return 'T';
    }
    var trimmed = captured.trim();
    return trimmed;
}

function getRandomChildWord() {
    var obj_keys = Object.keys(alphabets);
    var ran_key = obj_keys[Math.floor(Math.random() * obj_keys.length)];
    return alphabets[ran_key].words[Math.floor(Math.random() * alphabets[ran_key].words.length)].toUpperCase();
}

function getEmit(slots) {

    if (targetWord.length == 0) {
        return ['Sorry! I didn\'t find skill for that, please say it again,', 'Sorry! I didn\'t hear you, can you say: main menu: or: stop to close this app'];
    }
    var userWord = '';
    for (var i = 0; i < slots.length; i++) {
        userWord = userWord + getAlphabet(slots[i].toUpperCase());
    }
    if (userWord.includes(targetWord) || userWord == targetWord) {
        return ['Correct: say: next word', 'Sorry! I didn\'t hear you: Can you say: next word?'];
    } else {
        return ['Wrong! you said: ' + parseWordToSpell(userWord) + 'expected spelling was: ' + parseWordToSpell(targetWord) + ': if you are having trouble pronouncing alphabets, say: pronounce alphabet: or say: next word?', 'Sorry! I didn\'t hear you: Can you say: next word: or: main menu: or: stop to close this app'];
    }
}