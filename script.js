// Sign up validations
var name = document.getElementById('signup-name');
var email = document.getElementById('signup-email');
var password = document.getElementById('signup-password');
var msg = document.getElementById('message');
password.addEventListener('blur',function(){
    msg.style.display='none';
});
password.addEventListener('focus',function(){
    msg.style.display='block';
});
var num = document.getElementById('num');
var alpha = document.getElementById('alpha');
var specialChar = document.getElementById('specialChar');
var len = document.getElementById('len');
var tick1 = document.getElementById('tick1');
var tick2 = document.getElementById('tick2');
var tick3 = document.getElementById('tick3');
var tick4 = document.getElementById('tick4');
password.addEventListener('keyup',function(){
    // validate number
    var numPattern = /[0-9]/g;
    if(password.value.match(numPattern)){
        num.classList.remove("invalid");
        num.classList.add("valid");
        tick1.style.display="inline";
        
    } else {
        num.classList.remove("valid");
        num.classList.add('invalid');
        tick1.style.display="none";

    }
    // validate alphabets
    var letterPattern = /[a-zA-Z]/g;
    if(password.value.match(letterPattern)){
        alpha.classList.remove('invalid');
        alpha.classList.add('valid');
        tick2.style.display="inline";

    } else {
        alpha.classList.remove('valid');
        alpha.classList.add('invalid');
        tick2.style.display="none";
    }
    // validate special characters
    var specialPattern = /[^0-9a-zA-Z]/g;
    if(password.value.match(specialPattern)){
        specialChar.classList.remove('invalid');
        specialChar.classList.add('valid');
        tick3.style.display="inline";
    } else {
        specialChar.classList.remove('valid');
        specialChar.classList.add('invalid');
        tick3.style.display="none";
    }
    // validate length
    if(password.value.length>=8){
        len.classList.remove('invalid');
        len.classList.add('valid');
        tick4.style.display="inline";
    } else {
        len.classList.remove('valid');
        len.classList.add('invalid');
        tick4.style.display="none";
    }
    
})


// -----------------------------------