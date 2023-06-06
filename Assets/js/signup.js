// Empty Fields
function validate() {
  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;
  const confirmpasswordInput = document.getElementById("confirmpassword").value;
  if (!nameInput || !emailInput || !passwordInput || !confirmpasswordInput) {
    document.getElementById("nameError").innerHTML = "Name cannot be empty";
    document.getElementById("emailError").innerHTML =
      "Email-ID cannot be empty";
    document.getElementById("passwordError").innerHTML =
      "Password cannot be empty";
    document.getElementById("confirmpasswordError").innerHTML =
      "Confirm Password cannot be empty";
  } else if (passwordInput != confirmpasswordInput) {
    document.getElementById("confirmpasswordError").innerHTML =
      "Password should match Confirm Password";
  } else Signup();
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

// SignUp informations to store in json
function Signup() {
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
    }
  };
}

// To load the cards and display in the main page
function load_cards(Description = '') {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/Cards?Description_like=${Description}`);
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
          '<a href="#" class="btn btn-primary glowing-button darkButton smallButton ms-2" onclick="Add_to_Cart(' +
          object["id"] +
          ');" >Add to Cart</a>' +
          "&nbsp&nbsp";
        card +=
          '<a href="#" class="btn btn-primary glowing-button darkButton smallButton mt-3" onclick="addto_favourites(' +
          object["id"] +
          ');">Add toFavorite +</a>';
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
}
load_cards();

// Search implementation
function search() {
  const card_name = document.getElementById("search1").value;
  load_cards(card_name);
}

// To add the Cards to the Cart json object

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
      console.log("hello123");
      xhttpAdd.onload = function () {
        if (xhttpAdd.status == 200 && xhttpAdd.readystate == 4) {
          const response = JSON.parse(xhttpAdd.responseText);
          Cart.push(itemDetails);
          alert("Item added to Cart")
          load_cards();
        }
      };
      xhttpAdd.send(JSON.stringify(itemDetails));
    }
  };
}
// To display the cards in the cart (buynow.html)
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
      // variable declaration for total quantity and total Amount
      var totalQuantity = 0;
      var totalAmount = 0;
      card +=
        '<h1 class="container-fluid">My Cart<br><a href="favourites.html" class="btn btn-success glowing-button darkButton smallButton" >Go to Favourites</a>&nbsp<a href="user.html" class="btn btn-success glowing-button darkButton smallButton" >Back to Shopping</a></h1>';
      // To fetch the cards from the Json Cart
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
          '<a href="index.html" class="btn btn-success glowing-button darkButton smallButton" >Favourites+</a>' +
          "&nbsp&nbsp";
        card +=
          '<a href="#" class="btn btn-warning glowing-button darkButton smallButton"   onclick="remove_from_Cart(' +
          object["id"] +
          ');">Remove</a>';
        card +=
          '<address class="card-foot"><br><i class="fa-solid fa-location-dot"></i>' +
          object["Location"] +
          "</address>";
        card += "</div>";
        card += "</div>";
        card += "</div>";
        totalQuantity += 1;
        totalAmount += parseFloat(object["Price"]) * 1000;
      }
      // To display the image if the cart is empty
      if (card == "") {
        card += '<div class="container">';
        card += '<div class="row" id="hidefavourite">';
        card += '   <div class="col">';
        card += " <h1>My Cart</h1>";
        card +=
          ' <p class="empty-message">You havent added anything to your Cart.</p>';
        card +=
          '  <a href="index.html#cards" class="btn btn-primary glowing-button">Buy Now</a>';
        card += " </div>";
        card += " </div>";
        card += " </div> ";
        document.getElementById("disable").disabled = true;
      }

      // To display totalAmount and Quantity
      var totalCard = "";
      totalCard =
        '<div class="total-summary">' +
        '<p class="total-quantity">Total Designs: <span id="totalQuantity">' +
        totalQuantity +
        "</span></p>" +
        '<p class="total-amount">Total Amount:  ₹ <span id="totalQuantity">' +
        totalAmount.toFixed(2) +
        "</span></p>" +
        '<a type="button" id="disable" onclick="ordernow()" class="glowing-button btn btn-primary" style="color:white;">Get Quote</a>' +
        "</div>";
      console.log(totalQuantity, totalAmount);
      $("#Buycards").html(card);
      $("#total").html(totalCard);
    }
  };
}
Buy_Now();

// To remove items from the cart
function remove_from_Cart(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open(`DELETE`, `http://localhost:3000/Cart/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ id: id }));
  xhttp.onreadystatechange = () => {
    console.log(id);
    if (xhttp.readyState == 4) {
      const objects = JSON.parse(xhttp.responseText);
    }
  };
  load_cards();
}

// To create cards to Display only for admin login
create_cards = () => {
  const price = document.getElementById("price").value;
  const desc = document.getElementById("desc").value;
  const location = document.getElementById("location").value;
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
};

// To add the cards to  Favourite json object
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
      console.log("hello123");
      xhttpAdd.onload = function () {
        if (xhttpAdd.status == 200 && xhttpAdd.readystate == 4) {

          const response = JSON.parse(xhttpAdd.responseText);
          Favourites.push(itemDetails);
          load_cards();

        }
      };
      xhttpAdd.send(JSON.stringify(itemDetails));
    }
  };
}

// To display the Cards in the favourites page (favourites.html)
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
      card += '<a  onclick="logout()" class="btn btn-outline-dark ms-2 buttonhide"type="button" id="signupbutton">Logout</a>'
      card +=
        '<h1 class="container-fluid">My Favourites<br><a href="buynow.html" class="btn btn-success glowing-button darkButton smallButton" >Go to Cart</a>&nbsp<a href="user.html" class="btn btn-success glowing-button darkButton smallButton" >Back to Shopping</a></h1>';
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
          '<a href="#" class="btn btn-success glowing-button darkButton smallButton ms-3" onclick=Add_to_Cart(' +
          object["id"] +
          ") >Add to Cart</a>" +
          "&nbsp&nbsp";
        card +=
          '<a href="#" class="btn btn-warning glowing-button darkButton smallButton mt-3" onclick="remove_favourites(' +
          object["id"] +
          ');">Remove from Favourites</a>';
        card +=
          '<address class="card-foot"><br><i class="fa-solid fa-location-dot"></i>' +
          object["Location"] +
          "</address>";
        card += "</div>";
        card += "</div>";
        card += "</div>";
      }
      if (card == "") {
        card += '<div class="container">';
        card += '<div class="row" id="hidefavourite">';
        card += '   <div class="col">';
        card += " <h1>My Favorites</h1>";
        card +=
          ' <p class="empty-message">You havent added anything to favorites yet.</p>';
        card +=
          '  <a href="index.html#cards" class="btn btn-primary glowing-button">Add Now</a>';
        card += " </div>";
        card += " </div>";
        card += " </div> ";
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
  xhttp.send(JSON.stringify({ id: id }));
  xhttp.onreadystatechange = () => {
    console.log(id);
    if (xhttp.readyState == 4) {
      const objects = JSON.parse(xhttp.responseText);
    }
  };
  load_cards();
};

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
  } else if (!emailregex.test(emailInput_login)) {
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
          object["password"] == passwordInput_login &&
          object["Logged"] == 0
        ) {
          const updateRequest = new XMLHttpRequest();
          updateRequest.open(
            "PUT",
            `http://localhost:3000/Signup/${object["id"]}`
          );
          updateRequest.setRequestHeader(
            "Content-Type",
            "application/json;charset=UTF-8"
          );
          updateRequest.send(
            JSON.stringify({
              name: object["name"],
              email: object["email"],
              password: object["password"],
              confirm_password: object["confirm_password"],
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
              var card = "";
              for (let object of objects) {
                if ((object["Logged"] = 1)) {
                  console.log(object["Logged"]);
                  // Redirect to the target page
                  window.location.href = "user.html";

                }
              }
            }
          };
          break;
        } else if (
          object["email"] !== emailInput_login &&
          object["password"] !== passwordInput_login &&
          object["Logged"] == 1
        ) {
          window.alert("Please Logout First");
        }
      }
    }
  };
}

admin_login = () => {
  const admin_email = document.getElementById("adminemail").value;
  const admin_password = document.getElementById("adminpassword").value;
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/Admin`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      const objects = JSON.parse(this.responseText);
      var show_user = "";
      for (let object of objects) {
        console.log(admin_email);
        if (
          object["admin_email"] == admin_email &&
          object["admin_password"] == admin_password
        ) {
          console.log(admin_email);
          window.open("http://127.0.0.1:5500/Assets/admin.html");
          show_user +=
            `<p>${object["admin_email"]}</p>` +
            `<a class="btn btn-outline-dark ms-2 buttonhide"  type="button"
       id="signupbutton">Logout</a>`;
          $("#signupbutton").html(show_user);
          break;
        } else {
          alert("Unauthorized Access");
        }
      }
    }
  };
};

logout = () => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/Signup/`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      const objects = JSON.parse(this.responseText);

      var logbutton = "";
      let loggedStatusFound = false;
      for (let object of objects) {
        if (object["Logged"] == 1) {
          const updateRequest = new XMLHttpRequest();
          updateRequest.open(
            "PUT",
            `http://localhost:3000/Signup/${object["id"]}`
          );
          updateRequest.setRequestHeader(
            "Content-Type",
            "application/json;charset=UTF-8"
          );
          updateRequest.send(
            JSON.stringify({
              name: object["name"],
              email: object["email"],
              password: object["password"],
              confirm_password: object["confirm_password"],
              Logged: 0,
            })
          );
        }

        if (object["Logged"] == 0 && !loggedStatusFound) {
          loggedStatusFound = true;
          logbutton += `<button class="btn btn-outline-dark ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal"
          type="button">LOGIN</button>`;
          logbutton += `<button class="btn btn-outline-dark ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal1"
          type="button">SIGNUP</button>`;
          $("#log").html(logbutton);
        }

      }
    }
  };
};

ordernow = () => {
  cuteAlert({
    type: "success",
    title: "Right Choice",
    message: "We'll contact you soon",
    buttonText: "Feeling Woah!",
  });
};





// home_office cards
function home_office_load_cards() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/home_office");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(this.responseText);
      var card = "";
      const objects = JSON.parse(this.responseText);
      for (let home_office of objects) {
        card += '<div  class="col-md-4">';
        card += '<div  class="card mb-4 ">';
        card +=
          '<img src="' +
          home_office["Photo"] +
          '" class="card-img-top"  alt="Architecture 1">';
        card += '<div class="card-body">';
        card += "<h5 class='card-title'>" + home_office["Price"] + "</h5>";
        card += '<p class="card-text">' + home_office["Description"] + "</p>";
        card +=
          '<a href="#" class="btn btn-primary glowing-button darkButton smallButton ms-2" onclick="Add_to_Cart(' +
          home_office["id"] +
          ');" >Add to Cart</a>' +
          "&nbsp&nbsp";
        card +=
          '<a href="#" class="btn btn-primary glowing-button darkButton smallButton mt-3" onclick="addto_favourites(' +
          home_office["id"] +
          ');">Add toFavorite +</a>';
        card +=
          '<address class="card-foot"><br><i class="fa-solid fa-location-dot "></i>' +
          home_office["Location"] +
          "</address>";
        card += "</div>";
        card += "</div>";
        card += "</div>";
      }
      $("#home_office").html(card);
    }
  };
}
home_office_load_cards();




// Admin Page Cards
function admin_load_cards() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/Cards`);
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
          '<a href="#" class="btn btn-primary glowing-button darkButton smallButton ms-2" onclick="admin_edit_show(' +
          object["id"] +
          ');" >Edit</a>' +
          "&nbsp&nbsp";
        card +=
          '<a href="#" class="btn btn-primary glowing-button darkButton smallButton " onclick="admin_delete(' +
          object["id"] +
          ');">Delete+</a>';
        card +=
          '<address class="card-foot"><br><i class="fa-solid fa-location-dot "></i>' +
          object["Location"] +
          "</address>";
        card += "</div>";
        card += "</div>";
        card += "</div>";
      }
      $("#admin_card").html(card);
    }
  };
}
admin_load_cards();




// Admin page delete cards
function admin_delete(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open(`DELETE`, `http://localhost:3000/Cards/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ id: id }));
  xhttp.onreadystatechange = () => {
    console.log(id);
    if (xhttp.readyState == 4) {
      const objects = JSON.parse(xhttp.responseText);
    }
  };
  admin_load_cards();
}



// Admin Edit Option Modal
function admin_edit_show(id) {
  console.log(id);
  const edit_req = new XMLHttpRequest();
  edit_req.open("GET", `http://localhost:3000/Cards/${id}`)
  edit_req.send();
  edit_req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      Swal.fire({
        title: "Edit Cards",
        html:
          '<input id="id" type="hidden" value="' +
          objects[`${id}`] +
          '">' +
          '<input id="Price" class="swal2-input" placeholder="Price" value="' +
          objects.Price +
          '">' +
          '<input id="Description" class="swal2-input" placeholder="Description" value="' +
          objects.Description +
          '">' +
          '<input id="Location" class="swal2-input" placeholder="Location" value="' +
          objects.Location +
          '">' +
          '<input id="Photo" type="file" class="swal2-input" placeholder="Photo" value="' +
          objects.Photo +
          '">',
        preConfirm: () => {
          admin_edit(id);
        },
      });
    }
    else {
      console.log("hello");
    }

  }
}


// Admin Edit Function
function admin_edit(id) {
  const edit_price = document.getElementById('Price').value;
  const edit_description = document.getElementById('Description').value;
  const edit_location = document.getElementById('Location').value;
  const edit_photo = document.getElementById('Photo').value;
  //  const file = "./images/" +  edit_photo.files[0].name;
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", `http://localhost:3000/Cards/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      // id: id,
      Price: edit_price,
      Description: edit_description,
      Location: edit_location,
      Photo: "images/hall5.jpg",
    })
  );
  // If the change is Done in the server
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      admin_load_cards();
    }
  };
}


function get_quote(){
  var name_quote = document.getElementById('name_quote').value;
  var email_quote = document.getElementById('email_quote').value;
  var phone_quote = document.getElementById('phone_quote').value;

  const xhttpreq = new XMLHttpRequest();
  xhttpreq.open("POST", "http://localhost:3000/Get_Quote");
  xhttpreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttpreq.send(
    JSON.stringify({
      Name:name_quote,
      Email:email_quote,
      Phone:phone_quote,
    })
  );
  xhttpreq.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      console.log(objects);
    }
  };
}
