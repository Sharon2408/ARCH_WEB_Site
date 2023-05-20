// Empty Fields
function validate(){
  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById('password').value;
  const confirmpasswordInput = document.getElementById('confirmpassword').value;
if(!nameInput || !emailInput ||!passwordInput || !confirmpasswordInput){
  document.getElementById("nameError").innerHTML =
      "Name cannot be empty";
      document.getElementById("emailError").innerHTML =
      "Email-ID cannot be empty";
      document.getElementById("passwordError").innerHTML =
      "Password cannot be empty";
      document.getElementById("confirmpasswordError").innerHTML =
      "Confirm Password cannot be empty";
}
}


// Name Validation
function validate_name() {
  const nameInput = document.getElementById("name").value;
  const nameregex = /^[a-zA-Z\- ]{3,50}$/;
 
  if (!nameInput) {
    document.getElementById("nameError").innerHTML =
      "Name cannot be empty";
  
  } else if (!nameregex.test(nameInput)) {
    document.getElementById("nameError").innerHTML =
      "Name Should be atleast 3 charachters long";
  }
  else document.getElementById("nameError").innerHTML = "";
}

// Email Validation
function validate_email() {
  const emailInput = document.getElementById("email").value;
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput) {
    document.getElementById("emailError").innerHTML =
      "Email-ID cannot be empty";
  } 
  else if (!emailregex.test(emailInput)) {
    document.getElementById("emailError").innerHTML =
      "Please enter a valid email-id";
  }
  else document.getElementById("emailError").innerHTML = "";
}
// PasswordValidation
function validate_password(){
  const passwordInput = document.getElementById('password').value;
  const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{8,}$/;
  if (!passwordInput) {
    document.getElementById("passwordError").innerHTML =
      "Password cannot be empty";
  }
      else if(!passwordregex.test(passwordInput)){
          document.getElementById('passwordError').innerHTML = "Password must contain 1 uppercase 1 lowercase and special symbols";
      }
        else document.getElementById("passwordError").innerHTML = "";
}
// Confirm Password Validation
function validate_confirmpassword(){
  const confirmpasswordInput = document.getElementById('confirmpassword').value;
  const passwordInput = document.getElementById('password').value;
  if (!confirmpasswordInput ) {
    document.getElementById("confirmpasswordError").innerHTML =
      "Confirm Password cannot be empty";
  }
      else if(confirmpasswordInput !== passwordInput){
          document.getElementById('confirmpasswordError').innerHTML = "Passwords not matched";
      }
        else document.getElementById("confirmpasswordError").innerHTML = "";
}