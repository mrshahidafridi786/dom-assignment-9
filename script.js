const userList = document.getElementById("userList");
const userDetails = document.getElementById("userDetails");
const loadingText = document.getElementById("loading");
const errorText = document.getElementById("error");
const searchInput = document.getElementById("search");
const reloadBtn = document.getElementById("reloadBtn");

let users = [];

// Fetch Users Function
function fetchUsers() {
  loadingText.style.display = "block";
  errorText.textContent = "";
  userList.innerHTML = "";
  userDetails.innerHTML = "";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      users = data;
      displayUsers(users);
      loadingText.style.display = "none";
    })
    .catch((error) => {
      loadingText.style.display = "none";
      errorText.textContent = "Failed to fetch data";
    });
}

// Display Users in List
function displayUsers(userArray) {
  userList.innerHTML = "";

  userArray.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.name;

    li.addEventListener("click", () => {
      showUserDetails(user);
    });

    userList.appendChild(li);
  });
}

// Show User Details
function showUserDetails(user) {
  userDetails.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> ${user.website}</p>
    `;
}

// Search Filter
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchValue),
  );
  displayUsers(filteredUsers);
});

// Reload Button
reloadBtn.addEventListener("click", () => {
  fetchUsers();
});

// Load data when page loads
fetchUsers();
