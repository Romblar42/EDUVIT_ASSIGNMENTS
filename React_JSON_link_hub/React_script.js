document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users").then(res => {
      if (!res.ok) throw new Error("Failed to upload users.json");
      return res.json();
    }),
    fetch("https://jsonplaceholder.typicode.com/posts").then(res => {
      if (!res.ok) throw new Error("Failed to upload posts.json");
      return res.json();
    })
  ])
    .then(([users, posts]) => {
      const userList = document.getElementById("user-list");
      const userPosts = document.getElementById("user-posts");

      users.forEach(user => {
        const userDiv = document.createElement("div");
        userDiv.textContent = user.name;
        userDiv.className = "user-item";

        userDiv.addEventListener("click", () => {
          userPosts.innerHTML = `<h2>Посты пользователя: ${user.name}</h2>`;
          const filteredPosts = posts.filter(post => post.userId === user.id);

          if (filteredPosts.length === 0) {
            userPosts.innerHTML += "<p>Нет постов.</p>";
          }

          filteredPosts.forEach(post => {
            const postCard = document.createElement("div");
            postCard.className = "post-card";
            postCard.innerHTML = `
              <h3>${post.title}</h3>
              <p>${post.body}</p>
            `;
            userPosts.appendChild(postCard);
          });
        });

        userList.appendChild(userDiv);
      });
    })
    .catch(err => {
      console.error("Error:", err);
      document.getElementById("user-posts").innerHTML =
        "<p style='color: red;'>Error: " + err.message + "</p>";
    });
});
