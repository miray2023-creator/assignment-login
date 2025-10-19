// ---------- SIGNUP ----------
function signup(event) {
  // avoid form submit reload if button inside a form
  if (event && event.preventDefault) event.preventDefault();

  var name = document.getElementById("signupName").value.trim();
  var email = document.getElementById("signupEmail").value.trim().toLowerCase();
  var password = document.getElementById("signupPassword").value.trim();

  // simple validation
  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  // basic email check
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  // load users from localStorage or empty array
  var users = JSON.parse(localStorage.getItem("users")) || [];

  // check duplicate email
  var exists = users.some(function(u) { return u.email === email; });
  if (exists) {
    alert("This email is already registered");
    return;
  }

  // push new user and save
  var newUser = { name: name, email: email, password: password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully! Please login.");
  // redirect to login page
  window.location.href = "index.html";
}

// Expose to global in case script executes in module-like env
window.signup = signup;


// ---------- LOGIN ----------
function login(event) {
  if (event && event.preventDefault) event.preventDefault();

  var email = document.getElementById("signinEmail").value.trim().toLowerCase();
  var password = document.getElementById("signinPassword").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  var users = JSON.parse(localStorage.getItem("users")) || [];

  var found = users.find(function(u) {
    return u.email === email && u.password === password;
  });

  if (found) {
    localStorage.setItem("currentUser", JSON.stringify(found));
    // go to welcome page
    window.location.href = "home.html";
  } else {
    alert("Invalid email or password");
  }
}
window.login = login;
