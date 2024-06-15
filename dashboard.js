document.addEventListener("DOMContentLoaded", function() {
  displayCurrDateAndName();

function displayCurrDateAndName(){
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
      const storedName = localStorage.getItem("name");
      document.getElementById("dashboarddateToday").innerHTML=today;
      document.getElementById("dashboardYourname").innerHTML=storedName;
      document.getElementById("btn2").setAttribute("data-id",localStorage.getItem("em_id"));
// get task list 
fetch("https://test-hrmsapi.bugendaitech.de/api-org/get-pending-task.php?em_id="+localStorage.getItem("em_id"), {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization" : `Bearer ${localStorage.getItem('token')}`
  },
  // body: JSON.stringify(queryObj) 
})
  .then(function (response) {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Network response was not ok.");
    }
  })
  .then(function (data) {
    document.getElementById("homeTaskTodayListing").innerHTML=data.task_list;
    document.getElementById("btn2").innerHTML=data.msg;
    document.getElementById("btn2").setAttribute("data-type",data.msgval);
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

    // for swipe in and swipe out
    const btn2 = document.getElementById("btn2");
    btn2.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default behavior of the link
        const em_id=  document.getElementById("btn2").getAttribute("data-id");
        const attendancetype=  document.getElementById("btn2").getAttribute("data-type");
      // post swipe 
      const queryObj ={
        em_id,attendancetype
      }
fetch("https://test-hrmsapi.bugendaitech.de/api-org/post-loghours-extension.php", {
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
    if(attendancetype === "Signout"){
     document.getElementById("btn2").setAttribute("data-type","SignIn");
     document.getElementById("btn2").innerHTML = "Sign In";
    }else{
    document.getElementById("btn2").setAttribute("data-type","Signout");
    document.getElementById("btn2").innerHTML = "Sign Out";
    }
  })
  .catch(function (error) {
    console.log("Error: " + error.message);
  });
    });

// for add task completed
    // for log out function
    const addTask = document.getElementById("addTask");
    // Add a click event listener to the <a> element
    addTask.addEventListener("click", function (event) {
      event.preventDefault(); 
      let taskDetails = document.getElementById("taskDesc").value;

      if(taskDetails!=''){
      localStorage.setItem("taskDetails",taskDetails);
      window.location.href="task-assignee.html";
      }
    });


});