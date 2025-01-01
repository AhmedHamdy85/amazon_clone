const inputs = document.querySelectorAll("input");
const btnLogIn = document.getElementById("btnLogIn");
const formData = document.querySelector("form");
const msg = document.getElementById("msg");

let userData = [];

if (JSON.parse(localStorage.getItem('userInfo')) != null) {
    userData = JSON.parse(localStorage.getItem('userInfo'));
}

// EVENT
formData.addEventListener('submit', (event) => {
    event.preventDefault();

    if (isValid) {
        logInUser(inputs[0].value, inputs[1].value);
    }
})

//sign IN
formData.addEventListener("input", function () {
    if (validationEmail() && validationPassword()) {
        isValid = true;
    } else {
        isValid = false;
    }
})

function logInUser(email, password) {
    const user = userData.find(user => user.email === email && user.password === password);
    if(user) {
        location.replace("index.html");
    }
     else {
        msg.textContent = "Invalid email or password.";
    }
}

function validationEmail() {
    let regEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (regEmail.test(inputs[0].value)) {
        inputs[0].classList.add("is-valid");
        inputs[0].classList.remove("is-invalid");
        return true;
    } else {
        inputs[0].classList.add("is-invalid");
        inputs[0].classList.remove("is-valid");
        return false;
    }
}

function validationPassword() {
    let regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (regPassword.test(inputs[1].value)) {
        inputs[1].classList.add("is-valid");
        inputs[1].classList.remove("is-invalid");
        return true;
    } else {
        inputs[1].classList.add("is-invalid");
        inputs[1].classList.remove("is-valid");
        return false;
    }
}