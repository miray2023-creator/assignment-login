// ---------- SIGN UP FUNCTION ----------
function signup(event) {
  if (event && event.preventDefault) event.preventDefault();

  var name = document.getElementById("signupName")?.value.trim();
  var email = document.getElementById("signupEmail")?.value.trim().toLowerCase();
  var password = document.getElementById("signupPassword")?.value.trim();

  // Basic validation
  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }

  var users = JSON.parse(localStorage.getItem("users")) || [];

  var exists = users.some(function (u) {
    return u.email === email;
  });

  if (exists) {
    alert("This email is already registered");
    return;
  }

  var newUser = { name: name, email: email, password: password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully! Please log in.");
  window.location.href = "index.html";
}


// ---------- LOGIN FUNCTION ----------
function login() {
  var email = document.getElementById("signinEmail").value.trim().toLowerCase();
  var password = document.getElementById("signinPassword").value.trim();

  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  var users = JSON.parse(localStorage.getItem("users")) || [];

  var found = users.find(function (u) {
    return u.email === email && u.password === password;
  });

  if (found) {
    localStorage.setItem("currentUser", JSON.stringify(found));
    alert("Welcome " + found.name + "!");
    window.location.href = "welcome.html";
  } else {
    alert("Invalid email or password");
  }
}


// ---------- LOGOUT FUNCTION ----------
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
