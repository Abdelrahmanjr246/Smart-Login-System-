const signUpName = document.getElementById("signUpName");
const signUpEmail = document.getElementById("signUpEmail");
const signUpPassword = document.getElementById("signUpPassword");
const nameRule = document.getElementById("nameRule");
const emailRule = document.getElementById("emailRule");
const passRule = document.getElementById("passRule");
const errorMessage = document.getElementById("incorrect");
const nameRegex = /^[a-zA-ZÀ-ÿ'’\- ]{3,}$/;
const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const passRegex = /^.{3,15}$/;
let users = [];
if (localStorage.getItem('users') !== null) {
    users = JSON.parse(localStorage.getItem('users'));
}

function signUp() {
    const alreadyExists = isExist();
    if (
        signUpName.classList.contains("is-valid") &&
        signUpEmail.classList.contains("is-valid") &&
        signUpPassword.classList.contains("is-valid") &&
        !alreadyExists)
    {
        let user = {
            name: signUpName.value,
            email:signUpEmail.value,
            password: signUpPassword.value
        };
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users))
        const successMessage = document.getElementById("correct");
        successMessage.classList.replace("d-none", "d-block");
        clearInput()
    }else if(alreadyExists){
        document.getElementById("correct").classList.replace("d-block", "d-none");
    }else{
            errorMessage.innerHTML = "All inputs are required";
            errorMessage.classList.replace("d-none", "d-block");
    }
};

if (document.getElementById("signUpName")) {
    signUpName.addEventListener("input", function() {
        validateInputs(signUpName, nameRegex, nameRule);
    });
}

if (document.getElementById("signUpEmail")) {
    signUpEmail.addEventListener("input", function() {    
        validateInputs(signUpEmail, emailRegex , emailRule);
    });
}
if (document.getElementById("signUpPassword")) {
    signUpPassword.addEventListener("input", function(){
    validateInputs(signUpPassword, passRegex , passRule);
    });
}

function validateInputs(element, regex, rule){
    let testRegex = regex;
    if(testRegex.test(element.value) && element.value !==""){
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        rule.classList.replace("visible", "invisible");
        return true;
    }else{
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        rule.classList.replace("invisible", "visible");
        return false;
    }
};
function isExist() {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === signUpEmail.value) {
            errorMessage.innerHTML = "Email already exists";
            errorMessage.classList.replace("d-none", "d-block");
            return true;
        }
    }
    return false;
}
function clearInput(){
    signUpName.value = "";
    signUpEmail.value = "";
    signUpPassword.value = "";
    signUpName.classList.remove("is-valid");
    signUpEmail.classList.remove("is-valid");
    signUpPassword.classList.remove("is-valid");
    errorMessage.classList.replace("d-block","d-none");

}   

let currentUser = localStorage.getItem("currentUser");

function login(){
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const loginBtn = document.getElementById("loginBtn");
    if(loginEmail.value ==="" || loginPassword.value ===""){
        errorMessage.innerHTML = "All inputs are required";
        errorMessage.classList.replace("d-none", "d-block");
        return false
    }
    for (let i = 0; i < users.length; i++) {
        if(users[i].email == loginEmail.value && users[i].password == loginPassword.value){
            localStorage.setItem("currentUser",users[i].name)
            // loginBtn.setAttribute("href", "welcome.html");
            window.location.href = "welcome.html";
        }else{
            errorMessage.innerHTML = "Email or password is incorrect";
            errorMessage.classList.replace("d-none", "d-block");
        }
    }
}
function displayWelcome(){
    document.getElementById("username").innerHTML=`Welcome ${currentUser}`;
}
function logout(){
    localStorage.removeItem("currentUser");
    // window.location.href = "index.html";
}