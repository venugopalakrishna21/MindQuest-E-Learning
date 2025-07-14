function signUp() {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Signup successful!");
            window.location.href = "/courses"; // 🚀 Go to courses
        })
        .catch((error) => {
            alert(error.message);
        });
}

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("Login successful!");
            window.location.href = "/courses"; // 🚀 Go to courses
        })
        .catch((error) => {
            alert(error.message);
        });
}
firebase.auth().onAuthStateChanged((user) => {
  // These may only exist on the homepage
  const logoutBtn = document.getElementById('logoutBtn');
  const startBtn = document.getElementById('startLearning');
  const userEmailSpan = document.getElementById('user-email');
  const authContainer = document.getElementById('authContainer');

  // If any are missing, you're not on the homepage — skip
  if (!logoutBtn || !startBtn || !userEmailSpan || !authContainer) {
    return;
  }

  if (user) {
    logoutBtn.style.display = 'inline-block';
    startBtn.style.display = 'inline-block';
    userEmailSpan.textContent = user.email;
    authContainer.style.display = 'none';
  } else {
    logoutBtn.style.display = 'none';
    startBtn.style.display = 'none';
    userEmailSpan.textContent = '';
    authContainer.style.display = 'block';
  }
});
function logout() {
  firebase.auth().signOut()
    .then(() => {
      alert("You have been logged out.");
      window.location.href = "/"; // Redirect back to homepage
    })
    .catch((error) => {
      alert("Logout failed: " + error.message);
    });
}
