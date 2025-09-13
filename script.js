// Utility: get data from LocalStorage
function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Register new user
function register() {
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;

  let users = getData("users");
  if (users.find(u => u.username === username)) {
    alert("Username already exists!");
    return;
  }

  users.push({ username, password });
  saveData("users", users);
  alert("Registration successful! Please login.");
  window.location.href = "login.html";
}

// Login user
function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  let users = getData("users");
  let user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials!");
  }
}

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// Add a post
function addPost() {
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const username = localStorage.getItem("loggedInUser");

  if (!username) {
    alert("You must be logged in!");
    return;
  }

  let posts = getData("posts");
  posts.unshift({ title, body, author: username });
  saveData("posts", posts);

  document.getElementById("title").value = "";
  document.getElementById("body").value = "";
  showPosts();
}

// Show posts
function showPosts() {
  if (!document.getElementById("posts")) return;

  const posts = getData("posts");
  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "";

  posts.forEach(p => {
    postsDiv.innerHTML += `
      <div class="post">
        <h3>${p.title}</h3>
        <p>${p.body}</p>
        <small>by ${p.author}</small>
      </div>
    `;
  });
}

// Show nav links based on login state
function setupNav() {
  if (!document.getElementById("nav-links")) return;

  const nav = document.getElementById("nav-links");
  const user = localStorage.getItem("loggedInUser");

  if (user) {
    nav.innerHTML = `
      <span>Hello, ${user}</span>
      <button onclick="logout()">Logout</button>
    `;
    document.getElementById("post-form").classList.remove("hidden");
  } else {
    nav.innerHTML = `
      <a href="login.html">Login</a>
      <a href="register.html">Register</a>
    `;
  }
}

// Initialize homepage
window.onload = function () {
  setupNav();
  showPosts();
};
