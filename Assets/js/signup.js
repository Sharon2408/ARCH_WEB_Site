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
else{
  Signup();
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

function Signup(){
  const user_name = document.getElementById('name').value;
  const user_email = document.getElementById('email').value;
  const user_password = document.getElementById('password').value;
  const user_confirmpassword = document.getElementById('confirmpassword').value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/Signup");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      name: user_name,
      email: user_email,
      password: user_password,
      confirm_password: user_confirmpassword,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var alertHTML = "";
      const objects = JSON.parse(this.responseText);
      console.log(objects)
      alertHTML += '<span class="alert alert-success" role="alert"> This is a success alert—check it out! </span>'
      document.getElementById('alert').innerHTML = alertHTML;
    }
  };
}

function create_cards(){
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/Cards");
  xhttp.send();
xhttp.onreadystatechange = function (){
  console.log(this.responseText)
  var card =
}

}

// const product = [];
// const arr1 = [12, 6, 4];
// const arr2 = [1, 2, 3];

// for (let i = 0; i < arr1.length; i++) {
//   const prod = arr1[i] * arr2[i];
//   product.push(prod);
// }

// console.log(product);
// var res;

// const result = [];
// const arr3 = [12,6,4]
// const arr4 = [1,2,3]
// for(let i = 0; i<=arr3.length;i++)
// {
//   for(let j=0;j<=arr4.length;j++)
//   {
//      res = arr3[i]*arr4[j]
//     result.push(res) 
//   }
// }
// console.log(result)

// const str = ["hari","Ravi","Olive","Harsh"];
// const newname = [];
// const oldname = [];
// var add;
// for(let i = 0; i < str.length; i++)
// {
//   if(str[i].length < 5)
//   {
//     add = str[i]  + "Mr";
//     newname.push(add);
//   }
//   else {
//         oldname.push(str[i]);
//       }
// }

// const str = ["hari", "Ravi", "Olive", "Harsh"];
// const newname = [];
// const oldname = [];
// for (let i = 0; i <= str.length; i++) {
//   if (str[i].length < 5) {
//     add = str[i] + "Mr";
//     newname.push(add);
//   } else {
//     oldname.push(str[i]);
//   }
// }
// console.log(newname); // Output: ["hariMr", "OliveMr"]
// console.log(oldname); // Output: ["Ravi", "Harsh"]

// const str = ["hari", "Ravi", "Olive", "Harsh"];



// const newname = [];
// const oldname = [];

// for (let i = 0; i < str.length; i++) {
//   if (str[i].length < 5) {
//     add = str[i] + "Mr";
//     newname.push(add);
//   } else {
//     oldname.push(str[i]);
//   }
// }
// console.log(newname); // Output: ["hariMr", "RaviMr"]
//console.log(oldname); // Output: ["Olive", "Harsh"]

// const arr_test = [15,13,14,18,12,11];
// var a;
// for (let i = 0; i<=arr_test.length;i++)
// {
//   for(let j = i+1; j<arr_test.length;j++)
//   if(arr_test[i] > arr_test[j])
//   {
//      a = arr_test[i];
//      arr_test[i] = arr_test[j];
//      arr_test[j] = a;
// }

// }
// console.log(arr_test)

// const arr_test1 =[15,13,14,18,12,11];
// var a;
// for (let i = 0; i<=arr_test1.length;i++)
// {
//   for(let j = i+1; j<= arr_test1.length;j++){
//   if(arr_test1[i] > arr_test1[j])
// {
//   a=arr_test1[j];
// }
// else if(arr_test1[i] < arr_test1[j])
// {
//  b = arr_test1[j]
// }
// }
// }
// console.log(a)
// console.log(b)