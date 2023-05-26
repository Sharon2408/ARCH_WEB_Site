// Empty Fields
function validate() {
  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;
  const confirmpasswordInput = document.getElementById("confirmpassword").value;
  if (!nameInput || !emailInput || !passwordInput || !confirmpasswordInput) {
    document.getElementById("nameError").innerHTML =
      "Name cannot be empty";
    document.getElementById("emailError").innerHTML =
      "Email-ID cannot be empty";
    document.getElementById("passwordError").innerHTML =
      "Password cannot be empty";
    document.getElementById("confirmpasswordError").innerHTML =
      "Confirm Password cannot be empty";
  }
  else if (passwordInput != confirmpasswordInput) {
    document.getElementById("confirmpasswordError").innerHTML = "Password should match Confirm Password";
  }
  else
    Signup();

}

// Name Validation
function validate_name() {
  const nameInput = document.getElementById("name").value;
  const nameregex = /^[a-zA-Z\- ]{3,50}$/;

  if (!nameInput) {
    document.getElementById("nameError").innerHTML = "Name cannot be empty";
  } else if (!nameregex.test(nameInput)) {
    document.getElementById("nameError").innerHTML =
      "Name Should be atleast 3 charachters long";
  } else document.getElementById("nameError").innerHTML = "";
}

// Email Validation
function validate_email() {
  // SignUp email validate on input
  const emailInput = document.getElementById("email").value;
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput) {
    document.getElementById("emailError").innerHTML =
      "Email-ID cannot be empty";
  } else if (!emailregex.test(emailInput)) {
    document.getElementById("emailError").innerHTML =
      "Please enter a valid email-id";
  } else document.getElementById("emailError").innerHTML = "";
}
// PasswordValidation
function validate_password() {
  const passwordInput = document.getElementById("password").value;
  const passwordregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{8,}$/;
  if (!passwordInput) {
    document.getElementById("passwordError").innerHTML =
      "Password cannot be empty";
  } else if (!passwordregex.test(passwordInput)) {
    document.getElementById("passwordError").innerHTML =
      "Password must contain 1 uppercase 1 lowercase and special symbols";
  } else document.getElementById("passwordError").innerHTML = "";
}
// Confirm Password Validation
function validate_confirmpassword() {
  const confirmpasswordInput = document.getElementById("confirmpassword").value;
  const passwordInput = document.getElementById("password").value;
  if (!confirmpasswordInput) {
    document.getElementById("confirmpasswordError").innerHTML =
      "Confirm Password cannot be empty";
  } else if (confirmpasswordInput !== passwordInput) {
    document.getElementById("confirmpasswordError").innerHTML =
      "Passwords not matched";
  } else document.getElementById("confirmpasswordError").innerHTML = "";
}

// SignUp informations json
function Signup(event) {
  const user_name = document.getElementById("name").value;
  const user_email = document.getElementById("email").value;
  const user_password = document.getElementById("password").value;
  const user_confirmpassword = document.getElementById("confirmpassword").value;
  var log = 0;
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/Signup");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      name: user_name,
      email: user_email,
      password: user_password,
      confirm_password: user_confirmpassword,
      Logged: log,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var alertHTML = "";
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      alertHTML +=
        '<span class="alert alert-success" role="alert"> This is a success alert—check it out! </span>';
      document.getElementById("alert").innerHTML = alertHTML;
    }
  };
}



function load_cards() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/Cards");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(this.responseText);
      var card = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        card += '<div  class="col-md-4">';
        card += '<div  class="card mb-4 glowing-border">';
        card +=
          '<img src="' +
          object["Photo"] +
          '" class="card-img-top" alt="Architecture 1">';
        card += '<div class="card-body">';
        card += "<h5 class='card-title'>" + object["Price"] + "</h5>";
        card += '<p class="card-text">' + object["Description"] + "</p>";
        card +=
          '<a href="#" class="btn btn-primary glowing-button darkButton smallButton" onclick="Add_to_Cart(' + object["id"] + ');" >Buy Now</a>' + '&nbsp&nbsp';
        card += '<a href="#" class="btn btn-primary glowing-button darkButton smallButton" onclick="addto_favourites(' + object["id"] + ');">favorite +</a>'
        card +=
          '<address class="card-foot"><br><i class="fa-solid fa-location-dot "></i>' +
          object["Location"] +
          "</address>";
        card += "</div>";
        card += "</div>";
        card += "</div>";
      }
      $("#dynamic_card").html(card);
    }
  };
};
load_cards();

// BUY NOW

function Add_to_Cart(id) {
  const Cart = [];
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/Cards/${id}`);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log(id);
      const itemDetails = JSON.parse(this.responseText);
      console.log(itemDetails);

      const xhttpAdd = new XMLHttpRequest();

      xhttpAdd.open("POST", "http://localhost:3000/Cart");
      xhttpAdd.setRequestHeader("Content-Type", "application/json");
      console.log("hello123")
      xhttpAdd.onload = function () {


        if (xhttpAdd.status == 200 && xhttpAdd.readystate == 4) {
          console.log("hello");
          console.log("hello555")
          const response = JSON.parse(xhttpAdd.responseText);
          Cart.push(itemDetails);
          load_cards();

        }
      };
      xhttpAdd.send(JSON.stringify(itemDetails));


    }
  }

}

function Buy_Now() {
  var Cart = [];
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/Cart");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(this.responseText);
      var card = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        card += '<div  class="col-md-4">';
        card += '<div  class="card mb-4 glowing-border">';
        card +=
          '<img src="' +
          object["Photo"] +
          '" class="card-img-top" alt="Architecture 1">';
        card += '<div class="card-body">';
        card += "<h5 class='card-title'>" + object["Price"] + "</h5>";
        card += '<p class="card-text"><b>' + object["Description"] + "</b></p>";
        card +=
          '<a href="index.html" class="btn btn-primary glowing-button darkButton smallButton" >Buy Now</a>' + '&nbsp&nbsp';
        card += '<a href="#" class="btn btn-primary glowing-button darkButton smallButton" onclick="remove_from_Cart(' + object["id"] + ');">Remove</a>'
        card +=
          '<address class="card-foot"><br><i class="fa-solid fa-location-dot"></i>' +
          object["Location"] +
          "</address>";
        card += "</div>";
        card += "</div>";
        card += "</div>";
      }
      if (card == '') {
        card += '<div class="container">'
        card += '<div class="row" id="hidefavourite">'
        card += '   <div class="col">'
        card += ' <h1>My Cart</h1>'
        card += ' <p class="empty-message">You havent added anything to your Cart.</p>'
        card += '  <a href="index.html#cards" class="btn btn-primary glowing-button">Buy Now</a>'
        card += ' </div>'
        card += ' </div>'
        card += ' </div> '
      }
      $("#Buycards").html(card);
    }
  };
};
Buy_Now();

function remove_from_Cart(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open(`DELETE`, `http://localhost:3000/Cart/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({ id: id }));
  xhttp.onreadystatechange = () => {
    console.log(id);
    if (xhttp.readyState == 4) {
      const objects = JSON.parse(xhttp.responseText);


    }

  };
  load_cards();
}

create_cards = () => {
  const price = document.getElementById('price').value;
  const desc = document.getElementById('desc').value;
  const location = document.getElementById('location').value;
  const input = document.getElementById('photo');
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/Cards/");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      // >>json string
      Price: price,
      Description: desc,
      Location: location,
      Photo: "/Assets/images/house2.jpeg",
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      load_cards();
    }
  };
}



function addto_favourites(id) {
  const Favourites = [];
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/Cards/${id}`);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log(id);
      const itemDetails = JSON.parse(this.responseText);
      console.log(itemDetails);

      const xhttpAdd = new XMLHttpRequest();

      xhttpAdd.open("POST", "http://localhost:3000/Favourites");
      xhttpAdd.setRequestHeader("Content-Type", "application/json");
      console.log("hello123")
      xhttpAdd.onload = function () {


        if (xhttpAdd.status == 200 && xhttpAdd.readystate == 4) {
          console.log("hello");
          console.log("hello555")
          const response = JSON.parse(xhttpAdd.responseText);
          Favourites.push(itemDetails);
          load_cards();

        }
      };
      xhttpAdd.send(JSON.stringify(itemDetails));


    }
  }
}

favourite_cards = () => {
  var Favourites = [];
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/Favourites");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(this.responseText);
      var card = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        card += '<div  class="col-md-4">';
        card += '<div  class="card mb-4 glowing-border">';
        card +=
          '<img src="' +
          object["Photo"] +
          '" class="card-img-top" alt="Architecture 1">';
        card += '<div class="card-body">';
        card += "<h5 class='card-title'>" + object["Price"] + "</h5>";
        card += '<p class="card-text"><b>' + object["Description"] + "</b></p>";
        card +=
          '<a href="#" class="btn btn-primary glowing-button darkButton smallButton" onclick=Add_to_Cart(' + object["id"] + ') >Buy Now</a>' + '&nbsp&nbsp';
        card += '<a href="#" class="btn btn-primary glowing-button darkButton smallButton" onclick="remove_favourites(' + object["id"] + ');">Remove</a>'
        card +=
          '<address class="card-foot"><br><i class="fa-solid fa-location-dot"></i>' +
          object["Location"] +
          "</address>";
        card += "</div>";
        card += "</div>";
        card += "</div>";
      }
      if (card == '') {
        card += '<div class="container">'
        card += '<div class="row" id="hidefavourite">'
        card += '   <div class="col">'
        card += ' <h1>My Favorites</h1>'
        card += ' <p class="empty-message">You havent added anything to favorites yet.</p>'
        card += '  <a href="index.html#cards" class="btn btn-primary glowing-button">Add Now</a>'
        card += ' </div>'
        card += ' </div>'
        card += ' </div> '
      }
      $("#favoritecards").html(card);
    }
  };
};
favourite_cards();

remove_favourites = (id) => {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open(`DELETE`, `http://localhost:3000/Favourites/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({ id: id }));
  xhttp.onreadystatechange = () => {
    console.log(id);
    if (xhttp.readyState == 4) {
      const objects = JSON.parse(xhttp.responseText);


    }

  };
  load_cards();
}

//LOGIN
function validate_login() {
  const emailInput_login = document.getElementById("email1").value;
  const passwordInput_login = document.getElementById("password1").value;
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{8,}$/;
  if (!emailInput_login || !passwordInput_login) {
    document.getElementById("emailError1").innerHTML = "Email cannot be empty";
    document.getElementById("passwordError1").innerHTML =
      "Password cannot be empty";
  }
  else if (!emailregex.test(emailInput_login)) {
    document.getElementById("emailError1").innerHTML =
      "Please enter a valid email-id";
  } else if (!passwordregex.test(passwordInput_login)) {
    document.getElementById("passwordError1").innerHTML =
      "Password must contain 1 uppercase, 1 lowercase, and special symbols";
  } else {
    document.getElementById("emailError1").innerHTML = "";
    document.getElementById("passwordError1").innerHTML = "";
  }
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/Signup`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      const objects = JSON.parse(this.responseText);
      var log = 1;
      for (let object of objects) {
        if (
          object["email"] == emailInput_login &&
          object["password"] == passwordInput_login
        ) {
          const updateRequest = new XMLHttpRequest();
          updateRequest.open("PUT", `http://localhost:3000/Signup/${object['id']}`);
          updateRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          updateRequest.send(
            JSON.stringify({

              name: object['name'],
              email: object['email'],
              password: object['password'],
              confirm_password: object['confirm_password'],
              Logged: log,
            })
          );
          const xhttpValid = new XMLHttpRequest();
          xhttpValid.open("GET", `http://localhost:3000/Signup`);
          xhttpValid.send();
          xhttpValid.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText);
              const objects = JSON.parse(this.responseText);
              var card = '';
              for (let object of objects) {
                if (object['Logged'] = 1) {

                   window.open("http://127.0.0.1:5500/Assets/index.html#")
                   $("#loginbutton").hide();
                    
                  break;
                }

                else {
                  document.getElementById("alert").innerHTML = card;
                  $(document).ready(function () {
                    $("#loginbutton").empty();
                  });
                }
              }
            }
          };
          break;
          
        }
        else{

        }
      }
    }
  }
}

function hide_buttton(){
  
}