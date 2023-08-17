import $ from 'jquery';
import {Journal} from './js/journal.js';
import {Entry} from './js/journal.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import Logo from './assets/img/download.png';


// User Interface Logic ---------

//------- Logo -----
$("link").attr("href", Logo);
//--------------------

let journal = new Journal();

function displayEntryDetails(journalToDisplay) {
    let entriesList = $("ul#entry-list");
    let htmlForEntryInfo = "";
    Object.keys(journalToDisplay.entries).forEach(function (key) {
        const entry = journalToDisplay.findEntry(key);
        entry.getTeaser();
        htmlForEntryInfo += "<li id=" + entry.id + "> <h4>" + entry.title + "</h4> <br> <p><b>Teaser: </b>" + entry.teaser + "</p> </li> ";
    });
    entriesList.html(htmlForEntryInfo);
}

function showEntry(entryId) {
    const entry = journal.findEntry(entryId);
    entry.numberOfWords();
    entry.numberOfVowels();
    entry.numberOfConsonants();
    $("#list-details").fadeIn(1000);
    $(".entry-title").html(entry.title);
    $(".entry-date").html(entry.date);
    $(".number-of-words").html(entry.words);
    $(".number-of-vowels").html(entry.vowels);
    $(".number-of-consonants").html(entry.consonants);
    let buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton' id=" + entry.id + ">Delete</button>");
}

//Event Listener
function attachEntryListeners() {
    $("ul#entry-list").on("click", "li", function () {
        showEntry(this.id);
    });


    $("#buttons").on("click", ".deleteButton", function () {
        journal.deleteEntry(this.id);
        $("#list-details").hide();
        displayEntryDetails(journal);
    });
}




$(document).ready(function () {
    attachEntryListeners();
    $("form#formOne").submit(function (event) {
        event.preventDefault();
        const inputtedName = $("input#title").val();
        const inputtedBody = $("textarea#entry-body").val();
        const inputtedDate = $("input#dateTime").val();

        // $("input#title").val("");
        // $("textarea#entry-body").val("");
        // $("input#dateTime").val("");

        let newEntry = new Entry(inputtedName, inputtedBody, inputtedDate);
        journal.addEntries(newEntry);
        displayEntryDetails(journal);
    });
});
