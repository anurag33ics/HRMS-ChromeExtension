
// alert(1);

document.addEventListener("DOMContentLoaded", function() {
  viewDailySwipe();
  // getUserDetailsFromStorage();
  //   function getUserDetailsFromStorage() {
  //       const usernameInput = document.getElementById("username");
  //       const storedName = localStorage.getItem("name");
      
  //       if (usernameInput && storedName) {
  //         usernameInput.value = storedName;
  //       }
  //     }
function viewDailySwipe(){
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      today = dd + '-' + mm + '-' + yyyy;
      document.getElementById("viewswipedateToday").innerHTML=today;
      const queryObj ={
        em_id: localStorage.getItem("em_id"),
        start_date: yyyy+ '-' + mm + '-' + dd,
        end_date:  yyyy+ '-' + mm + '-' + dd
      }
// get task list 
fetch("https://test-hrmsapi.bugendaitech.de/api-org/get-daily-swips.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization" : `Bearer ${localStorage.getItem('token')}`
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
    document.getElementById("swipeData").innerHTML=data.loghours;
  })
  .catch(function (error) {
    console.log("Error: " + error.message);
  });
    }

    // for log out function
    const link = document.getElementById("logout");
    // Add a click event listener to the <a> element
    link.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default behavior of the link
        localStorage.clear();
        window.location.href='popup.html';
    });

});