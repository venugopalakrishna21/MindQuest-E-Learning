firebase.auth().onAuthStateChanged((user) => {
  const list = document.getElementById("courseList");
  if (!list) return;

  if (!user) {
    alert("Please login to access courses.");
    window.location.href = "/";
    return;
  }

  fetch("/api/courses")
    .then(res => res.json())
    .then(data => {
      list.innerHTML = ""; // clear any placeholder

      if (data.length === 0) {
        list.innerHTML = "<p>No courses available.</p>";
        return;
      }

      data.forEach(course => {
        const div = document.createElement("div");
        div.className = "course-card";
        div.innerHTML = `
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <a href="${course.url}" target="_blank">Go to Course</a>
        `;
        list.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Course load failed:", err);
      list.innerHTML = "<p>Could not load courses. Try again later.</p>";
    });
});
