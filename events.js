var userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
document.getElementById('userName').innerHTML = 'Hello '+userDetails.name;
// notesCollection = JSON.parse(localStorage.getItem('notesCollection'));
// var userNotes = null;
// notesCollection.forEach(function(collection){
//     if ( userDetails.email == collection.email ){
//         userNotes = collection;
//     }
// });
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
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let tbl = document.getElementById("calendar-body"); // body of the calendar

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


let addNote=()=>{

};

let notesOfTheDay=(id)=>{
    
    // var newNote = {
    //     date: id,
    //     notes: 'this is note 2.',    
    // };
    // userDetails.details.push(newNote);
    // localStorage.setItem('notesCollection',JSON.stringify(notesCollection));
    // console.log(userNotes);
    // console.log(userNotes.details[0].date);

    $('#addEvent').modal('show');
    document.getElementById('eventTitle').innerHTML='Notes of '+id;
    
};
