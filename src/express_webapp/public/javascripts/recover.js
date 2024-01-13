const password_input = document.querySelector("#password_input");
const password_eye = document.querySelector("#password_eye");

const password_input_confirmation = document.querySelector("#password_input_confirmation");
const password_eye_confirmation = document.querySelector("#password_eye_confirmation");

let loweruppercase = document.querySelector(".loweruppercase i");
let loweruppercasetext = document.querySelector(".loweruppercase span");

let numbercase = document.querySelector(".numbercase i");
let numbercasetext = document.querySelector(".numbercase span");
let specialcase = document.querySelector(".specialcase i");
let specialcasetext = document.querySelector(".specialcase span");

let numcharacter = document.querySelector(".numcharacter i");
let numcharactertext = document.querySelector(".numcharacter span");

let passwordConfirmation = document.querySelector(".passwordconfirmationvalid i");
let passwordConfirmationText = document.querySelector(".passwordconfirmationvalid span");


password_eye.addEventListener('click',()=>{
    
    if(password_input.type=="password"){
        password_input.type="text";
        password_eye.classList.add("fa-eye");
        password_eye.classList.remove("fa-eye-slash");

    }else if(password_input.type=="text"){
        password_input.type="password";
        password_eye.classList.add("fa-eye-slash");
        password_eye.classList.remove("fa-eye");
    }

});

password_input.addEventListener('keyup',function(){
    let pass = document.getElementById("password_input").value;
    let confirmation = document.getElementById("password_input_confirmation").value;
    passStrength(pass,confirmation);
});

password_input_confirmation.addEventListener('keyup',function(){
    let pass = document.getElementById("password_input").value;
    let confirmation = document.getElementById("password_input_confirmation").value;
    passStrength(pass,confirmation);
});

function passStrength(pass,confirmation){
    let count = 0;
    if(pass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){
    
        loweruppercase.classList.remove("fa-circle");
        loweruppercase.classList.add("fa-check");
        loweruppercase.classList.add("green-color");
        loweruppercasetext.classList.add("green-color");
        count += 1;
    }else{
        
        loweruppercase.classList.remove("fa-check");
        loweruppercase.classList.add("fa-circle");
        loweruppercase.classList.remove("green-color");
        loweruppercasetext.classList.remove("green-color");
    }
    
    
    if(pass.match(".*\\d.*")){
        
        numbercase.classList.remove("fa-circle");
        numbercase.classList.add("fa-check");
        numbercase.classList.add("green-color");
        numbercasetext.classList.add("green-color");
        count += 1;
    }else{
        
        numbercase.classList.remove("fa-check");
        numbercase.classList.add("fa-circle");
        numbercase.classList.remove("green-color");
        numbercasetext.classList.remove("green-color");
    }
    
    
    if(pass.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)){
        
        specialcase.classList.remove("fa-circle");
        specialcase.classList.add("fa-check");
        specialcase.classList.add("green-color");
        specialcasetext.classList.add("green-color");
        count += 1;
    }else{
        
        specialcase.classList.remove("fa-check");
        specialcase.classList.add("fa-circle");
        specialcase.classList.remove("green-color");
        specialcasetext.classList.remove("green-color");
    }
    
    if(pass.length>7){
        
        numcharacter.classList.remove("fa-circle");
        numcharacter.classList.add("fa-check");
        numcharacter.classList.add("green-color");
        numcharactertext.classList.add("green-color");
        count += 1;
    }else{
        
        numcharacter.classList.remove("fa-check");
        numcharacter.classList.add("fa-circle");
        numcharacter.classList.remove("green-color");
        numcharactertext.classList.remove("green-color");
    }

    if(count === 4 && pass === confirmation){
        
        passwordConfirmation.classList.remove("fa-circle");
        passwordConfirmation.classList.add("fa-check");
        passwordConfirmation.classList.add("green-color");
        passwordConfirmationText.classList.add("green-color");
    }else{
        passwordConfirmation.classList.remove("fa-check");
        passwordConfirmation.classList.add("fa-circle");
        passwordConfirmation.classList.remove("green-color");
        passwordConfirmationText.classList.remove("green-color");
    }
    
    
    
}
