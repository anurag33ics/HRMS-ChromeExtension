document.addEventListener("DOMContentLoaded", function () {
  getTaskData();

  function getTaskData() {
    document.getElementById("description").value =
      localStorage.getItem("taskDetails");

    // get project list
    fetch(
      "https://test-hrmsapi.bugendaitech.de/api-org/get-projects-by-emid.php?em_id=" +
        localStorage.getItem("em_id"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        // body: JSON.stringify(queryObj)
      }
    )
      .then(function (response) {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then(function (data) {
        document.getElementById("project_id").innerHTML = data.product_data;
      })
      .catch(function (error) {
        console.log("Error: " + error.message);
      });
  }

  // get sections
  const projectChange = document.getElementById("project_id");
  // Add a click event listener to the <a> element
  projectChange.addEventListener("change", function (event) {
    event.preventDefault();
    let project_id = document.getElementById("project_id").value;

    if (project_id != "0") {
      fetch(
        "https://test-hrmsapi.bugendaitech.de/api-org/get-sections-by-projectid.php?project_id=" +
          project_id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          // body: JSON.stringify(queryObj)
        }
      )
        .then(function (response) {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Network response was not ok.");
          }
        })
        .then(function (data) {
          document.getElementById("sectionId").innerHTML = data.section_data;
        })
        .catch(function (error) {
          console.log("Error: " + error.message);
        });
    }
  });
  // end section

  // add task
  const addtaskbtn = document.getElementById("addtaskbtn");
  // Add a click event listener to the <a> element
  addtaskbtn.addEventListener("click", function (event) {
    event.preventDefault();
    let title = document.getElementById("description").value;
    let project_id = document.getElementById("project_id").value;
    let section_id = document.getElementById("sectionId").value;
    let last_date = document.getElementById("last_date").value;

    if (project_id == 0) {
      document.getElementById("erro_msg").innerHTML = "Please Select Project";
      document.getElementById("project_id").style.borderColor ='red';
      document.getElementById("erro_msg").style.color="red";
    } else if (section_id == 0) {
      document.getElementById("erro_msg").innerHTML = "Please Select Section";
      
      document.getElementById("project_id").style.borderColor ='black';

      document.getElementById("sectionId").style.borderColor ='red';
      document.getElementById("erro_msg").style.color="red";
    } else if (title == "") {
      document.getElementById("erro_msg").innerHTML =
        "Please enter task title";
        document.getElementById("project_id").style.borderColor ='black';

        document.getElementById("sectionId").style.borderColor ='black';
        document.getElementById("description").style.borderColor ='red';
      document.getElementById("erro_msg").style.color="red";
    } else if (title != "" && project_id != 0 && section_id != 0) {
      let queryObj = {
        to_assign_emp: localStorage.getItem("em_id"),
        from_assign: localStorage.getItem("em_id"),
        last_date: last_date,
        task_title: title,
        task_desc: "",
        task_status: "InProgress",
        has_subtask: false,
        project_id: project_id,
        section_id: section_id,
      };
      fetch(
        "https://test-hrmsapi.bugendaitech.de/api-org/add-task-extension.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(queryObj),
        }
      )
        .then(function (response) {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Network response was not ok.");
          }
        })
        .then(function (data) {
          document.getElementById("sectionId").innerHTML = data.section_data;
          let tID = setTimeout(function () {
            document.getElementById("erro_msg").innerHTML = "Task added successfully";
            document.getElementById("erro_msg").style.color="green";
            window.location.href = "dashboard.html";
            window.clearTimeout(tID);		// clear time out.
        }, 3000);
        })
        .catch(function (error) {
          console.log("Error: " + error.message);
        });
    }
  });
});
