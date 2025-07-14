document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      firebase.auth().signOut().then(() => {
        alert("You have been logged out.");
        window.location.href = "index.html";
      });
    });
  }

  const user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged((user) => {
    const courseList = document.getElementById("course-list");
    if (user && courseList) {
      fetch("/courses")
        .then((res) => res.json())
        .then((data) => {
          courseList.innerHTML = ""; // Clear before loading
          Object.entries(data).forEach(([id, course]) => {
            const courseItem = document.createElement("div");
            courseItem.className = "course-card";
            courseItem.innerHTML = `
              <h3>${course.title}</h3>
              <p>${course.description}</p>
              <button class="view-btn" data-id="${id}">View Course</button>
            `;
            courseList.appendChild(courseItem);
          });

          document.querySelectorAll(".view-btn").forEach(btn => {
            btn.addEventListener("click", function () {
              const courseId = this.getAttribute("data-id");
              localStorage.setItem("selectedCourseId", courseId);
              window.location.href = "course.html";
            });
          });
        })
        .catch((err) => console.error("Error loading courses:", err));
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  fetch("/courses")
    .then((res) => res.json())
    .then((data) => {
      const courseList = document.getElementById("course-list");
      if (data && courseList) {
        Object.values(data).forEach((course) => {
          const courseItem = document.createElement("div");
          courseItem.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <hr/>
          `;
          courseList.appendChild(courseItem);
        });
      }
    })
    .catch((err) => console.error("Error loading courses:", err));
});
