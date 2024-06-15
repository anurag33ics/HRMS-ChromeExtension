
document.addEventListener('DOMContentLoaded', function () {
  const storedName = localStorage.getItem("name");

  if (storedName !== '' && storedName !== null) {
    window.location.href = chrome.runtime.getURL('dashboard.html');
  } else {
    window.location.href = chrome.runtime.getURL('popup.html');
  }
});


document.querySelector("#loginButton").addEventListener("click", function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('pwd').value;
  let queryObj = {
    username: email,
    password: password
  };

  fetch("https://test-hrmsapi.bugendaitech.de/api-org/login_extension.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(queryObj)
  })
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then(function (data) {
      localStorage.setItem('name', data.employee.first_name + " " + data.employee.middle_name + " " + data.employee.last_name);
      localStorage.setItem('em_id', data.employee.em_id);
      localStorage.setItem('em_role', data.employee.em_role);
      localStorage.setItem('em_username', data.employee.em_username);
      localStorage.setItem('department', data.employee.department);
      localStorage.setItem('dep_id', data.employee.dep_id);
      localStorage.setItem('profile_photo', data.employee.profile_photo);
      localStorage.setItem('em_phone', data.employee.em_phone);
      localStorage.setItem('em_phone', data.employee.em_phone);
      localStorage.setItem('token', data.token);
      // Open the dashboard.html page after login
      window.location.href = chrome.runtime.getURL('dashboard.html');
    })
    .catch(function (error) {
      console.log("Error: " + error.message);
    });
});
