var stdId = document.getElementById("stdId");
var stdName = document.getElementById("stdName");
var stdEmail = document.getElementById("stdEmail");
var stdPhone = document.getElementById("stdPhone");
var stdCollege = document.getElementById("stdCollege");
var stdStudy = document.getElementById("stdStudy");
var submitBtn = document.getElementById("submitBtn");
var clrBtn = document.getElementById("clrBtn");
var tBody = document.getElementById("table-body");
var deleteBtn = document.getElementById("deleteBtn");
var search = document.getElementById("search");
var tempStudentId = -1;
var students;

// To Fill Tabel With Values From Local Storage .
if (JSON.parse(localStorage.getItem("stds")) != null) {
  students = JSON.parse(localStorage.getItem("stds"));
  fillTable();
} else {
  students = [];
}
// Create Table Data.
submitBtn.onclick = function (event) {
  event.preventDefault();
  if (submitBtn.value == "Add Student") {
    addStudent();
  } else {
    updateStudent();
  }
  clearFields();
  fillTable();
  clearClass();
};
// Add Student
function addStudent() {
  var student = {
    stdId: stdId.value,
    stdName: stdName.value,
    stdEmail: stdEmail.value,
    stdPhone: stdPhone.value,
    stdCollege: stdCollege.value,
    stdStudy: stdStudy.value,
  };
  students.push(student);
  localStorage.setItem("stds", JSON.stringify(students));
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Student Has Been Added Successfully..",
    showConfirmButton: false,
    timer: 1500,
  });
}
//Clear Input Fields.
function clearFields() {
  stdId.value = "";
  stdName.value = "";
  stdEmail.value = "";
  stdPhone.value = "";
  stdCollege.value = "";
  stdStudy.value = "";
}

// Fill Table With Created Data.
function fillTable() {
  var records = "";
  for (var i = 0; i < students.length; i++) {
    records += `
    <tr>
        <td>${i + 1}</td>
        <td>${students[i].stdId}</td>
        <td>${students[i].stdName}</td>
        <td>${students[i].stdEmail}</td>
        <td>${students[i].stdPhone}</td>
        <td>${students[i].stdCollege}</td>
        <td>${students[i].stdStudy}</td>
        <td><button type="button" class="btn btn-info" onclick="getStudent(${
          students[i].stdId
        })">Update</button></td>
        <td><button onclick="deleteRecord(${
          students[i].stdId
        })" type="button" class="btn btn-danger">Delete</button></td>
    </tr>
`;
  }
  tBody.innerHTML = records;
}

// Delete Record Using Delete Button Inside The Table By Id .
function deleteRecord(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      for (var i = 0; i < students.length; i++) {
        if (students[i].stdId == id) {
          students.splice(i, 1);
          localStorage.setItem("stds", JSON.stringify(students));
        }
      }
      fillTable();
      Swal.fire("Deleted!", "Student has been deleted.", "success");
    }
  });
}

// Delete All Records Button .
deleteBtn.onclick = function () {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      students = [];
      localStorage.setItem("stds", JSON.stringify(students));
      fillTable();
      Swal.fire("Deleted!", "All Students has been deleted.", "success");
    }
  });
};

search.onkeyup = function () {
  var records = "";
  for (var i = 0; i < students.length; i++) {
    if (
      students[i].stdName.toLowerCase().includes(search.value.toLowerCase())
    ) {
      records += `
        <tr>
            <td>${i + 1}</td>
            <td>${students[i].stdId}</td>
            <td>${students[i].stdName}</td>
            <td>${students[i].stdEmail}</td>
            <td>${students[i].stdPhone}</td>
            <td>${students[i].stdCollege}</td>
            <td>${students[i].stdStudy}</td>
            <td><button type="button" class="btn btn-info">Update</button></td>
            <td><button onclick="deleteRecord(${
              students[i].stdId
            })" type="button" class="btn btn-danger">Delete</button></td>
        </tr>
        `;
    }
  }
  tBody.innerHTML = records;
};

// Fill Fields With Selected Record To Update.
function getStudent(id) {
  for (var i = 0; i < students.length; i++) {
    if (students[i].stdId == id) {
      stdId.value = students[i].stdId;
      stdName.value = students[i].stdName;
      stdEmail.value = students[i].stdEmail;
      stdPhone.value = students[i].stdPhone;
      stdCollege.value = students[i].stdCollege;
      stdStudy.value = students[i].stdStudy;
      tempStudentId = id;
      submitBtn.value = "Update Student";
    }
  }
}

// Update Record By Id .
function updateStudent() {
  for (var i = 0; i < students.length; i++) {
    if (students[i].stdId == tempStudentId) {
      students[i].stdId = stdId.value;
      students[i].stdName = stdName.value;
      students[i].stdEmail = stdEmail.value;
      students[i].stdPhone = stdPhone.value;
      students[i].stdCollege = stdCollege.value;
      students[i].stdStudy = stdStudy.value;
    }
  }
  localStorage.setItem("stds", JSON.stringify(students));
  submitBtn.value = "Add Student";
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Student Has Been Updated Successfully..",
    showConfirmButton: false,
    timer: 1500,
  });
}

// Validation Part

// student ID 
stdId.onkeyup = function () {
  var pattern = /^[0-9]{1,9}$/;
  if (pattern.test(stdId.value)) {
    if (stdId.classList.contains("is-invalid") && document.getElementById('stdIdDetails').classList.contains('d-block')) {
      stdId.classList.replace("is-invalid", "is-valid");
      document.getElementById('stdIdDetails').classList.replace('d-block','d-none');
    } else {
      stdId.classList.add("is-valid");
    }
    submitBtn.removeAttribute("disabled");
  } else {
    if (stdId.classList.contains("is-valid") && document.getElementById('stdIdDetails').classList.contains('d-none')) {
      stdId.classList.replace("is-valid", "is-invalid");
      document.getElementById('stdIdDetails').classList.replace('d-none','d-block');
    } else {
      stdId.classList.add("is-invalid");
      document.getElementById('stdIdDetails').classList.replace('d-none','d-block');
    }
    submitBtn.setAttribute('disabled','disabled');
  }
};

// Student Name .
stdName.onkeyup=function(){
  var pattern = /^[A-Z\sa-z]{3,30}$/;
  if (pattern.test(stdName.value)) {
    if (stdName.classList.contains("is-invalid") && document.getElementById('stdNameDetails').classList.contains('d-block')) {
      document.getElementById('stdNameDetails').classList.replace('d-block','d-none');
      stdName.classList.replace("is-invalid", "is-valid");
    } else {
      stdName.classList.add("is-valid");
    }
    submitBtn.removeAttribute("disabled");
  } else {
    if (stdName.classList.contains("is-valid") && document.getElementById('stdNameDetails').classList.contains('d-none')) {
      stdName.classList.replace("is-valid", "is-invalid");
      document.getElementById('stdNameDetails').classList.replace('d-none','d-block');
    } else {
      document.getElementById('stdNameDetails').classList.replace('d-none','d-block');
      stdName.classList.add("is-invalid");
    }
    submitBtn.setAttribute('disabled','disabled');
  }
}

// Student Email .
stdEmail.onkeyup=function(){
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (pattern.test(stdEmail.value)) {
    if (stdEmail.classList.contains("is-invalid") && document.getElementById('stdEmailDetails').classList.contains('d-block')) {
      stdEmail.classList.replace("is-invalid", "is-valid");
      document.getElementById('stdEmailDetails').classList.replace('d-block','d-none');
    } else {
      stdEmail.classList.add("is-valid");
    }
    submitBtn.removeAttribute("disabled");
  } else {
    if (stdEmail.classList.contains("is-valid") && document.getElementById('stdEmailDetails').classList.contains('d-none')) {
      stdEmail.classList.replace("is-valid", "is-invalid");
      document.getElementById('stdEmailDetails').classList.replace('d-none','d-block');
    } else {
      stdEmail.classList.add("is-invalid");
      document.getElementById('stdEmailDetails').classList.replace('d-none','d-block');
    }
    submitBtn.setAttribute('disabled','disabled');
  }
}

// Student Phone
stdPhone.onkeyup=function(){
  var pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if (pattern.test(stdPhone.value)) {
    if (stdPhone.classList.contains("is-invalid") && document.getElementById('stdPhoneDetails').classList.contains('d-block')) {
      stdPhone.classList.replace("is-invalid", "is-valid");
      document.getElementById('stdPhoneDetails').classList.replace('d-block','d-none');
    } else {
      stdPhone.classList.add("is-valid");
    }
    submitBtn.removeAttribute("disabled");
  } else {
    if (stdPhone.classList.contains("is-valid") && document.getElementById('stdPhoneDetails').classList.contains('d-none')) {
      stdPhone.classList.replace("is-valid", "is-invalid");
      document.getElementById('stdPhoneDetails').classList.replace('d-none','d-block');
    } else {
      stdPhone.classList.add("is-invalid");
      document.getElementById('stdPhoneDetails').classList.replace('d-none','d-block');
    }
    submitBtn.setAttribute('disabled','disabled');
  }
}

// Student College
stdCollege.onkeyup=function(){
  var pattern = /^[A-Z\sa-z]{2,20}$/;
  if (pattern.test(stdCollege.value)) {
    if (stdCollege.classList.contains("is-invalid") && document.getElementById('stdCollegeDetails').classList.contains('d-block')) {
      stdCollege.classList.replace("is-invalid", "is-valid");
      document.getElementById('stdCollegeDetails').classList.replace('d-block','d-none');
    } else {
      stdCollege.classList.add("is-valid");
    }
    submitBtn.removeAttribute("disabled");
  } else {
    if (stdCollege.classList.contains("is-valid") && document.getElementById('stdCollegeDetails').classList.contains('d-none')) {
      stdCollege.classList.replace("is-valid", "is-invalid");
      document.getElementById('stdCollegeDetails').classList.replace('d-none','d-block');
    } else {
      stdCollege.classList.add("is-invalid");
      document.getElementById('stdCollegeDetails').classList.replace('d-none','d-block');
    }
    submitBtn.setAttribute('disabled','disabled');
  }
}

// Student Study
stdStudy.onkeyup=function(){
  var pattern = /^[A-Z\sa-z]{2,20}$/;
  if (pattern.test(stdStudy.value)) {
    if (stdStudy.classList.contains("is-invalid") && document.getElementById('stdSpecializeDetails').classList.contains('d-block')) {
      stdStudy.classList.replace("is-invalid", "is-valid");
      document.getElementById('stdSpecializeDetails').classList.replace('d-block','d-none');
    } else {
      stdStudy.classList.add("is-valid");
    }
    submitBtn.removeAttribute("disabled");
  } else {
    if (stdStudy.classList.contains("is-valid") && document.getElementById('stdSpecializeDetails').classList.contains('d-none')) {
      stdStudy.classList.replace("is-valid", "is-invalid");
      document.getElementById('stdSpecializeDetails').classList.replace('d-none','d-block');
    } else {
      stdStudy.classList.add("is-invalid");
      document.getElementById('stdSpecializeDetails').classList.replace('d-none','d-block');
    }
    submitBtn.setAttribute('disabled','disabled');
  }
}


// Clear Validation Classes After Adding Or Ubdating .
function clearClass(){
  stdId.classList.remove('is-valid');
  stdName.classList.remove('is-valid');
  stdEmail.classList.remove('is-valid');
  stdPhone.classList.remove('is-valid');
  stdCollege.classList.remove('is-valid');
  stdStudy.classList.remove('is-valid');
}