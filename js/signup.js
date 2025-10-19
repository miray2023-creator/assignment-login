// Get form inputs
var nameInput = document.getElementById("signinName");
var emailInput = document.getElementById("signinEmail");
var passInput = document.getElementById("signinPassword");
var signUpBtn = document.getElementById("signupBtn");

// Get stored users or start an empty list
var users = JSON.parse(localStorage.getItem("users")) || [];

// Function runs when user clicks "Sign Up"
function signUp() {
  event.preventDefault(); // prevent form reload

  var name = nameInput.value.trim();
  var email = emailInput.value.trim().toLowerCase();
  var password = passInput.value.trim();

  // Basic validation
  if (name === "" || email === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }

  // Check if user already exists
  var exists = users.some(function (u) {
    return u.email === email;
  });

  if (exists) {
    alert("This email is already registered");
    return;
  }

  // Create and save new user
  var newUser = {
    name: name,
    email: email,
    password: password
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully! You can now sign in.");
  clearForm();

  // Redirect to login page (index.html)
  window.location.href = "index.html";
}

// Helper function to check valid email
function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Clear form after success
function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
  passInput.value = "";
}
