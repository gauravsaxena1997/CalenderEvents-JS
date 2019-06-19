// Declarations --------------------------------------------------
var userList = JSON.parse(localStorage.getItem('users')) || [] ;
var names = document.getElementById('signup-name');
var email = document.getElementById('signup-email');
var password = document.getElementById('signup-password');
var num = document.getElementById('num');
var alpha = document.getElementById('alpha');
var specialChar = document.getElementById('specialChar');
var len = document.getElementById('len');
var tick1 = document.getElementById('tick1');
var tick2 = document.getElementById('tick2');
var tick3 = document.getElementById('tick3');
var tick4 = document.getElementById('tick4');
var signinEmail = document.getElementById('email');
var signinPassword = document.getElementById('password');
var credentials = false;
var userDetails = {
    name: '',
    email: ''
};

// validation of password ------------------------------------------
password.addEventListener('keyup',function(){
    // validate number
    var numPattern = /[0-9]/g;
    if(password.value.match(numPattern)){
        num.classList.add("valid");
        tick1.style.display="inline";
        
    } else {
        num.classList.remove("valid");
        tick1.style.display="none";

    }
    // validate alphabets
    var letterPattern = /[a-zA-Z]/g;
    if(password.value.match(letterPattern)){
        alpha.classList.add('valid');
        tick2.style.display="inline";

    } else {
        alpha.classList.remove('valid');
        tick2.style.display="none";
    }
    // validate special characters
    var specialPattern = /[^0-9a-zA-Z]/g;
    if(password.value.match(specialPattern)){
        specialChar.classList.add('valid');
        tick3.style.display="inline";
    } else {
        specialChar.classList.remove('valid');
        tick3.style.display="none";
    }
    // validate length
    if(password.value.length>=8){
        len.classList.add('valid');
        tick4.style.display="inline";
    } else {
        len.classList.remove('valid');
        tick4.style.display="none";
    }
    
});

// validation of email ---------------------------------------------
email.addEventListener('blur',function(){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var emailError;

    if (email.value=='') {
        emailError = '';
        document.getElementById('emailError').innerHTML=emailError;
    } else if (!email.value.match(mailformat)){
        emailError = 'Please enter a valid email id.';
        document.getElementById('emailError').innerHTML=emailError;
    } else {
        emailError = '';
        document.getElementById('emailError').innerHTML=emailError;
    }
});
email.addEventListener('keyup',function(){
    
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value=='' || email.value.match(mailformat)){
        emailError = '';
        document.getElementById('emailError').innerHTML=emailError;
    }    
});

// validation of name ----------------------------------------------
names.addEventListener('blur',function(){
    var nameformat = /^[a-zA-Z\s]*$/;
    var nameError;
    if (names.value=='') {
        nameError = '';
        document.getElementById('nameError').innerHTML=nameError;
    } else if (!names.value.match(nameformat)){
        nameError = 'Please enter a valid name.';
        document.getElementById('nameError').innerHTML=nameError;
    } else {
        nameError = '';
        document.getElementById('nameError').innerHTML=nameError;
    }
});
names.addEventListener('keyup',function(){
    var nameformat = /^[a-zA-Z\s]*$/;
    var nameError;
    if (names.value == '' || names.value.match(nameformat)) {
        nameError = '';
        document.getElementById('nameError').innerHTML = nameError;
    }
});

// Store credentials ----------------------------------------------
function storeCredentials(){
    let userList = JSON.parse(localStorage.getItem('users')) || [];
    for (let i=0;i<userList.length;i++){
        if (email.value == userList[i].email){
            $('#modalRegisterForm').modal('hide');
            $('#userExisted').modal('show');
            return;
        }
    }
    var userObj = {
        name: names.value,
        email: email.value,
        password: password.value
    }
    userList.push(userObj);
    localStorage.setItem('users',JSON.stringify(userList));
    singupSuccessfull = true;
    this.userList = JSON.parse(localStorage.getItem('users'));
    $('#modalRegisterForm').modal('hide');
    $('#signupSuccess').modal('show');
};

// Sign in --------------------------------------------------------
signinPassword.addEventListener('keyup',function(){
    userList.forEach(function(user){
        if (signinEmail.value == user.email && signinPassword.value == user.password){
            credentials = true;
            this.userDetails.name = user.name;
            this.userDetails.email = user.email;
            console.log('Credentials are matched.'+this.userDetails);
            localStorage.setItem("currentUser", JSON.stringify(userDetails));  
            window.location.href = 'events.html';
        }
    })
});
signinEmail.addEventListener('keyup',function(){
    userList.forEach(function(user){        
        if (signinEmail.value == user.email && signinPassword.value == user.password){
            credentials = true;
            this.userDetails.name = user.name;
            this.userDetails.email = user.email;
            console.log('Credentials are matched.'+this.userDetails);
            localStorage.setItem("currentUser", JSON.stringify(userDetails));  
            window.location.href = 'events.html';
        }
    })
});
function signin() {
    if (credentials == true){
        window.location.href = 'events.html';
    } else {
        $('#invalidModal').modal('show');
    }
}

let visible = false;
let visible2 = false;
// password visibility toggle
var visibilityToggle = document.getElementById('visibilityToggle1');
var visibilityToggle2 = document.getElementById('visibilityToggle2');
visibilityToggle.addEventListener('click', ()=>{
    if (visible == false){
        visible = true;
        signinPassword.type='text';
        visibilityToggle.classList.remove('fa-eye');
        visibilityToggle.classList.add('fa-eye-slash','text-primary');
    } else {
        visible = false;
        signinPassword.type='password';
        visibilityToggle.classList.remove('fa-eye-slash');
        visibilityToggle.classList.add('fa-eye');
    }
    
});
visibilityToggle2.addEventListener('click', ()=>{
    if (visible2 == false){
        visible2 = true;
        password.type='text';
        visibilityToggle2.classList.remove('fa-eye');
        visibilityToggle2.classList.add('fa-eye-slash','text-primary');
    } else {
        visible2 = false;
        password.type='password';
        visibilityToggle2.classList.remove('fa-eye-slash');
        visibilityToggle2.classList.add('fa-eye');
    }
});

// signup button
document.getElementById('signupBtn').addEventListener('click',()=>{
    document.getElementById('signupForm').reset();
    document.getElementById('signupForm').reset();
})