// localStorage.removeItem('notesCollection');
// localStorage.removeItem('users');
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
var indexLocation = null, elementId =null, oldNotes =null, dateAndNotes = null;
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
var note = document.getElementById('note');

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

// filling current and next week notes-------
let getWeeklyNotes=(d)=>{
    d = new Date(d);
    let thisWeekNotes = document.getElementById('thisWeekNotes');
    let nxtWeek = document.getElementById('nxtWeekNotes');
    thisWeekNotes.innerHTML='';
    nxtWeek.innerHTML='';
    var day = d.getDay(),
    firstDay = d.getDate() - day + (day == 0 ? -6:1);
    let currentWeekArr = [];
    let nxtWeekArr = [];
    let currentWeekNotes = [];
    let nxtWeekNotes = [];
    nxt = firstDay;
    for (let i=0;i<7;i++){
        nxtDay = new Date(d.setDate(nxt));
        currentWeekArr.push(nxtDay.getDate()+'-'+nxtDay.getMonth()+'-'+nxtDay.getFullYear());
        nxt++;
    }
    for (let i=0;i<7;i++){
        nxtWeekDay = new Date(d.setDate(nxt));
        nxtWeekArr.push(nxtWeekDay.getDate()+'-'+nxtWeekDay.getMonth()+'-'+nxtWeekDay.getFullYear());
        nxt++;
    }
    for ( day in currentWeekArr){
        for ( item in details ) {
            if(details[item].date==currentWeekArr[day])
            currentWeekNotes.push(details[item]);
        }
    }
    for ( day in nxtWeekArr){
        for ( item in details ) {
            if(details[item].date==nxtWeekArr[day])
            nxtWeekNotes.push(details[item]);
        }
    }
    // filling out current week notes dynamically---
    currentWeekNotes.forEach(function(notesObj){
        let div = document.createElement('div');
        div.addEventListener('click',function(){
           notesOfTheDay(notesObj.date);
           $('#weeklyNotesModal').modal('hide');
        });
        div.style.cursor='pointer';
        let b = document.createElement('b');
        let date = document.createTextNode(notesObj.date);
        b.appendChild(date);
        div.appendChild(b);
        thisWeekNotes.appendChild(div);
        let ul = document.createElement('ul');
        notesObj.notes.forEach(function(noteElement){
            let li = document.createElement('li');
            let note = document.createTextNode(noteElement);
            li.appendChild(note);
            ul.appendChild(li);
        });
        thisWeekNotes.appendChild(ul);
    });
    // filling out next week notes dynamically---
    nxtWeekNotes.forEach(function(notesObj){
        let div = document.createElement('div');
        div.addEventListener('click',function(){
            notesOfTheDay(notesObj.date);
            $('#weeklyNotesModal').modal('hide');
         });
        div.style.cursor='pointer';
        let b = document.createElement('b');
        let date = document.createTextNode(notesObj.date);
        b.appendChild(date);
        div.appendChild(b);
        nxtWeek.appendChild(div);
        let ul = document.createElement('ul');
        notesObj.notes.forEach(function(noteElement){
            let li = document.createElement('li');
            let note = document.createTextNode(noteElement);
            li.appendChild(note);
            ul.appendChild(li);
        });
        nxtWeek.appendChild(ul);
    });
}
getWeeklyNotes(new Date());

// calendar operations--------------------------
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
                cell.classList.add('font-weight-bold');
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

// show notes------------------------------------
let notesOfTheDay=(id)=>{
    elementId = id;
    dateAndNotes = null;
    indexOfselectedItem = null;
    document.getElementById('eventTitle').innerHTML='Notes of '+elementId;
    document.getElementById('existedNotes').innerHTML = '';
    delAll = document.createElement('span');
    delAll.classList.add('far', 'fa-trash-alt','text-primary','pl-3');
    delAll.setAttribute('onclick','editNote(this,indexOfselectedItem,this.id,elementId)');
    if (indexLocation!=null){
        for(let i=0;i<details.length;i++){
            if ( elementId == details[i].date ){
                indexOfselectedItem = i;
                dateAndNotes = details[i];
                break;
            }
        }
        if (dateAndNotes){
            let ul = document.createElement('ul');
            ul.classList.add('list-group','list-group-flush')
            for ( let i=0; i<dateAndNotes.notes.length; i++ ){
                let li = document.createElement('li');
                li.classList.add('list-group-item');
                // Edit button---------------
                edit = document.createElement('span');
                edit.classList.add('far', 'fa-edit','text-primary','pl-3');
                edit.setAttribute('id',i);
                edit.setAttribute('onclick','editNote(this,indexOfselectedItem,this.id,elementId)');
                // Delete button---------------
                del = document.createElement('span');
                del.classList.add('fas', 'fa-trash-alt','text-primary','pl-3');
                del.setAttribute('id',i);
                del.setAttribute('onclick','deleteNote(indexOfselectedItem,this.id,elementId)');

                let txtNode = document.createTextNode(dateAndNotes.notes[i]);
                li.appendChild(txtNode);
                li.appendChild(edit);
                li.appendChild(del);
                ul.appendChild(li);
                document.getElementById('existedNotes').appendChild(ul);
            }
        }   else {
            document.getElementById('existedNotes').innerHTML = '';
        }
    }
    $('#addEvent').modal('show');
};

// add a note--------------------------------------
document.getElementById('addNote').addEventListener('click',function(){
    var newEntry = false;
    for(let i=0; i<details.length;i++){
        if (elementId == details[i].date){
            oldNotes = i;
            break;
        }
    }
    if(oldNotes === null){
        newEntry = true;
        var newDetails = {
            date: elementId,
            notes: [ note.value ]
        };
        details.push(newDetails);
    } 
    if (!newEntry) details[oldNotes].notes.push(note.value);
    localStorage.setItem('notesCollection',JSON.stringify(notesCollection));
    notesCollection = JSON.parse(localStorage.getItem('notesCollection'));
    details = notesCollection[indexLocation].details;
    oldNotes=null;
    note.value='';
    notesOfTheDay(elementId);
    showCalendar(currentMonth, currentYear);
    document.getElementById('addNote').classList.add('fa-disabled');
    getWeeklyNotes(new Date());
    tooltipInit();
    document.getElementById('successMsg').innerHTML='Note added successfully.';
    $('#addNoteSuccessModal').modal('show');
    setTimeout(() => {
        $('#addNoteSuccessModal').modal('hide');        
    }, 2000);
});

// delete a note----------------------------------
let deleteNote=(indexOfselectedItem,id,elementId)=>{
    notesCollection[indexLocation].details[indexOfselectedItem].notes.splice(id,1);
    if ( !notesCollection[indexLocation].details[indexOfselectedItem].notes.length ){
        notesCollection[indexLocation].details.splice(indexOfselectedItem,1)
    }
    localStorage.setItem('notesCollection',JSON.stringify(notesCollection));
    notesCollection = JSON.parse(localStorage.getItem('notesCollection'));
    details = notesCollection[indexLocation].details;
    notesOfTheDay(elementId);
    showCalendar(currentMonth,currentYear);
    getWeeklyNotes(new Date());
    tooltipInit();
    $('#delNoteSuccessModal').modal('show');
    setTimeout(() => {
        $('#delNoteSuccessModal').modal('hide');        
    }, 2000);
}

// edit a note -----------------------------------
let editNote=(ele,indexOfselectedItem,id,elementId)=>{
    let parentTag =  ele.parentNode;
    let containerDiv = document.createElement('div');
    containerDiv.classList.add('form-inline','row');
    let div = document.createElement('div');
    div.classList.add('md-form','form-group','col-6');
    let input = document.createElement('input');
    input.classList.add('form-control','p-0');
    input.setAttribute('id','editNoteField');
    input.classList.add('col-12');
    input.type = 'text';
    input.focus();
    input.value = ele.parentNode.textContent;    
    div.appendChild(input);
    containerDiv.appendChild(div);
    save = document.createElement('span');
    save.classList.add('fas', 'fa-check','fa-2x','text-primary','form-group');
    save.setAttribute('id','saveEditBtn')
    save.addEventListener('click',()=>{
        notesCollection[indexLocation].details[indexOfselectedItem].notes.splice(id,1,document.getElementById('editNoteField').value);
        localStorage.setItem('notesCollection',JSON.stringify(notesCollection));
        notesCollection = JSON.parse(localStorage.getItem('notesCollection'));
        details = notesCollection[indexLocation].details;
        notesOfTheDay(elementId);
        showCalendar(currentMonth,currentYear);
        getWeeklyNotes(new Date());
        tooltipInit();
        document.getElementById('successMsg').innerHTML='Note updated successfully.';
        $('#addNoteSuccessModal').modal('show');
        setTimeout(() => {
            $('#addNoteSuccessModal').modal('hide');        
        }, 2000);
    });
    containerDiv.appendChild(save);
    ele.parentNode.innerHTML='';
    parentTag.appendChild(containerDiv);
};

// disable add note button when empty-------------
note.addEventListener('keyup',function(){
    if ( note.value.length>0 ){
        document.getElementById('addNote').classList.remove('fa-disabled');      
    } else if (note.value.length<=0){
        document.getElementById('addNote').classList.add('fa-disabled');      
    }
});

// weekly tasks button-----------------------------
document.getElementById('weeklyNotesBtn').addEventListener('click',function(){
    $('#addEvent').modal('hide');
    $('#weeklyNotesModal').modal('show');
});
// shortcuts butoon---------------------------------
document.getElementById('shortcutsBtn').addEventListener('click',function(){
    $('#weeklyNotesModal').modal('hide');
    $('#addEvent').modal('hide');
    $('#shortcutsModal').modal('show');
});

// keyboard handling--------------------------------
let modal = false;
let shortcut = false;
document.addEventListener ("keydown", function (zEvent) {
    if (zEvent.altKey &&  zEvent.key === "w") {
        if( modal==false ) {
            $('#addEvent').modal('hide');
            $('#weeklyNotesModal').modal('show');  
            modal = true;  
        } else {
            $('#weeklyNotesModal').modal('hide');
            modal = false;
        }       
    } else if (zEvent.altKey &&  zEvent.key === "n") {
        next();
    } else if (zEvent.altKey &&  zEvent.key === "p") {
        previous();
    } else if (zEvent.altKey &&  zEvent.key === "s") {
        if ( shortcut == false ){
            $('#weeklyNotesModal').modal('hide');
            $('#addEvent').modal('hide');
            $('#shortcutsModal').modal('show');
            shortcut = true;
        }   else {
            $('#shortcutsModal').modal('hide');
            shortcut = false;
        }
    }
} ); 