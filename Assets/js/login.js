//LOGIN
function validate_login() {
    const emailInput_login = document.getElementById("email1").value;
    const passwordInput_login = document.getElementById("password1").value;
    if (!emailInput_login || !passwordInput_login) {
      document.getElementById("emailError1").innerHTML = "Email cannot be empty";
      document.getElementById("passwordError1").innerHTML =
        "Password cannot be empty";
    } else {
      login_form();
    }
  }
  
  function login_form() {
    const emailInput_login = document.getElementById("email1").value;
    const passwordInput_login = document.getElementById("password1").value;
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordregex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?])[A-Za-z\d!@#$%^&*()_\-+=<>?]{8,}$/;
    if (!emailregex.test(emailInput_login)) {
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
    xhttp.open("GET", "http://localhost:3000/Signup");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var card = "";
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          if (
            object["email"] == emailInput_login &&
            object["password"] == passwordInput_login
          ) {
            $(document).ready(function () {
              $("#myModalButton").click(function () {
                $("#exampleModal").modal("hide");
              });
            });
  
            card +=
              '<div class="alert alert-warning alert-dismissible fade show" role="alert">';
            card += "<strong>Welcome!" + object["name"] + "</strong>";
            card +=
              ' <button type="button" class="close" data-dismiss="alert" data-bs-dismiss="modal" aria-label="Close">';
            card += '   <span aria-hidden="true">&times;</span>';
            card += "  </button>";
            card += "</div>";
            document.getElementById("alert").innerHTML = card;
            // Hide the alert after 3 seconds
            setTimeout(function () {
              $("#alert").show();
            }, 5000);
          } else {
            card +=
              '<div class="alert alert-warning alert-dismissible fade show" role="alert">';
            card += "<strong>Invalid Credentials</strong>";
            card +=
              ' <button type="button" class="close" data-dismiss="alert" aria-label="Close">';
            card += '   <span aria-hidden="true">&times;</span>';
            card += "  </button>";
            card += "</div>";
            document.getElementById("alert").innerHTML = card;
            setTimeout(function () {
              $("#alert").hide();
            }, 5000);
          }
        }
      }
    };
  }
  