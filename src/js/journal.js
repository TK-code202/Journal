// Business Logic for Journal ---------
export function Journal() {
    this.entries = {};
    this.currentId = 0;
}

Journal.prototype.assignId = function () {
    this.currentId += 1;
    return this.currentId;
};

Journal.prototype.addEntries = function (entry) {
    entry.id = this.assignId();
    this.entries[entry.id] = entry;
};


Journal.prototype.findEntry = function (id) {
    if (this.entries[id] != undefined) {
        return this.entries[id];
    }
    return false;
};

Journal.prototype.deleteEntry = function (id) {
    if (this.entries[id] === undefined) {
        return false;
    }
    delete this.entries[id];
    return true;
};


// Business Logic for Entries ---------
export function Entry(title, body, date) {
    this.title = title;
    this.body = body;
    this.date = date;
    this.teaser = "";
    this.words = 0;
    this.vowels = 0;
    this.consonants = 0;
}


function noInputtedWord(word) {
    if (word.trim().length === 0) {
        return true;
    }
    return false;
}


function textCleaner(text) {
    const wordArray = text.trim().split(" ");
    const characters = [];
    wordArray.forEach(function (element) {
        if (element.length >= 1 && ![",", ".", "?", "!", "-", "'", ";", ":"].includes(element)) {
            characters.push(element);
        }
    })
    return characters.join(" ");
}

Entry.prototype.getTeaser = function () {
    if (noInputtedWord(this.body)) {
        return "";
    }
    let firstSentence = this.body.split(".", 1)[0].concat(".");
    let sentence = firstSentence.trim().split(" ");
    let teaserWords = "";
    for (let j = 0; (j <= 7 && j <= sentence.length - 1); j++) {
        teaserWords += sentence[j];
        if (j !== (sentence.length - 1)) {
            teaserWords = teaserWords.concat(" ");
        }
    }
    this.teaser = teaserWords.trim().concat(" ....");
};

Entry.prototype.numberOfWords = function () {
    if (noInputtedWord(this.body)) {
        return 0;
    }
    let wordCount = 0;
    const cleanedWords = textCleaner(this.body);
    const wordArray = cleanedWords.split(" ");
    wordArray.forEach(function (element) {
        if (!Number(element)) {
            wordCount++;
        }
    });
    this.words = wordCount;
};

Entry.prototype.numberOfVowels = function () {
    let sentence = this.body.trim().toLowerCase().split("");
    const vowels = ["a", "e", "i", "o", "u"];
    let vowelCount = 0;
    for (let i = 0; i < sentence.length; i++) {
        if (vowels.includes(sentence[i])) {
            vowelCount++;
        }
    }
    this.vowels = vowelCount;
};

Entry.prototype.numberOfConsonants = function () {
    let sentence = this.body.trim().toLowerCase().split("");
    const consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
    let consonantCount = 0;

    for (let i = 0; i < sentence.length; i++) {
        if (consonants.includes(sentence[i])) {
            consonantCount++;
        }
    }
    this.consonants = consonantCount;
};
