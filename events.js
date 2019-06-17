// Tooltips Initialization
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});
let tooltipInit = () => {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
}

// user details from localstorage-----------
var userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
document.getElementById('userName').innerHTML = 'Hello '+userDetails.name;

// use notes details from localstorage------
var notesCollection = JSON.parse(localStorage.getItem('notesCollection')) || [];
var indexLocation = null, elementId =null, indexOfCurrentId =null, dateAndNotes = null;
notesCollection.forEach(function(collection){
    if ( userDetails.email === collection.email ){
        indexLocation = notesCollection.indexOf(collection);
    }
});
if (indexLocation===null){
    var newUserNotes = {
        email: userDetails.email,
        details: []
    }
    notesCollection.push(newUserNotes);
    localStorage.setItem('notesCollection',JSON.stringify(notesCollection));
    notesCollection = JSON.parse(localStorage.getItem('notesCollection'));
    indexLocation = notesCollection.length-1;
}
var details = notesCollection[indexLocation].details;


// for testing (getting user notes details)--
Object.keys(localStorage).forEach(function(key){
    console.log(localStorage.getItem(key));
 });

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
    tooltipInit();
}


function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
    tooltipInit();
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
    tooltipInit();
}

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let tbl = document.getElementById("calendar-body"); // body of the calendar
    let existedNotesId = []
    for (let i=0;i<details.length;i++){
        existedNotesId.push(details[i].date)
    }

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        
        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }
            else {
                let cell = document.createElement("td");
                cell.setAttribute('id',date+'-'+month+'-'+year);
                cell.setAttribute('onclick','notesOfTheDay(this.id)');
                let cellText = document.createTextNode(date);
                existedNotesId.forEach( function(item) {
                    if (date+'-'+month+'-'+year == item){
                        cell.classList.add("purple-gradient","text-light");
                        cell.setAttribute('data-toggle','tooltip');
                        cell.setAttribute('data-html','true');
                        for(let i=0;i<details.length;i++){
                            if (details[i].date == item) {
                                var tooltip = details[i].notes;       
                            }
                        }
                        var txt = '<ul>';
                        for (let i=0;i<tooltip.length;i++){
                            txt += '<li>'+ tooltip[i] +'</li>';
                        }
                        txt += '</ul>'
                        cell.setAttribute('title',txt);        
                    } 
                })
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("blue-gradient","text-light");
                } // color today's date
                
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row); // appending each row into calendar body.
    }
}


document.getElementById('addNote').addEventListener('click',function(){
    var newEntry = false;
    for(let i=0; i<details.length;i++){
        if (elementId == details[i].date){
            indexOfCurrentId = i;
            break;
        }
    }
    if(indexOfCurrentId === null){
        newEntry = true;
        var pushDetails = {
            date: elementId,
            notes: [ document.getElementById('note').value ]
        };
        details.push(pushDetails);
    } 
    if (!newEntry) details[indexOfCurrentId].notes.push(document.getElementById('note').value);
    localStorage.setItem('notesCollection',JSON.stringify(notesCollection));
    notesCollection = JSON.parse(localStorage.getItem('notesCollection'));
    indexOfCurrentId=null;
    notesOfTheDay(elementId);
    document.getElementById('note').value='';
    showCalendar(currentMonth, currentYear);
    tooltipInit();
});

let notesOfTheDay=(id)=>{
    elementId = id;
    dateAndNotes = null;
    document.getElementById('eventTitle').innerHTML='Notes of '+elementId;
    if (indexLocation!=null){
        for(let i=0;i<details.length;i++){
            if ( elementId == details[i].date ){
                dateAndNotes = details[i];
                break;
            }
        }
        if (dateAndNotes){
            var notes = '<ul>';
            for ( let i =0; i<dateAndNotes.notes.length; i++ ){
                notes+= '<li>'+ dateAndNotes.notes[i]  +'</li>';
            }
            notes+= '</ul>';
            document.getElementById('existedNotes').innerHTML = notes;
        }   else {
            document.getElementById('existedNotes').innerHTML = '';
        }
    }

    $('#addEvent').modal('show');
};
