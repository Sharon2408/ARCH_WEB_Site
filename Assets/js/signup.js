document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    validateForm();
  });
  
  function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    
    var errorMessages = [];
    
    if (name === "") {
      errorMessages.push("Name is required.");
    }
    
    if (email === "") {
      errorMessages.push("Email is required.");
    } else if (!isValidEmail(email)) {
      errorMessages.push("Email is invalid.");
    }
    
    if (password === "") {
      errorMessages.push("Password is required.");
    }
    
    if (confirmPassword === "") {
      errorMessages.push("Confirm Password is required.");
    } else if (confirmPassword !== password) {
      errorMessages.push("Passwords do not match.");
    }
    
    var errorContainer = document.getElementById("error-container");
    errorContainer.innerHTML = "";
    
    if (errorMessages.length > 0) {
      for (var i = 0; i < errorMessages.length; i++) {
        var errorElement = document.createElement("p");
        errorElement.innerText = errorMessages[i];
        errorContainer.appendChild(errorElement);
      }
    } else {
      // Form is valid, you can perform further actions here
      alert("Sign up successful!");
      document.getElementById("signup-form").reset();
    }
  }
  
  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  