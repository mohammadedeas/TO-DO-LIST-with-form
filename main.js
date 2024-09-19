let arrayoftasks = [];
const Status = {
  TO_DO: 'TO_DO',
  IN_WORK: 'IN_WORK',
  DONE: 'DONE',
};
let currentStatus = '';

function openTaskModal(status) {
  currentStatus = status;
  document.getElementById("taskModal").style.display = "block";
}

function closeTaskModal() {
  document.getElementById("taskModal").style.display = "none";
  document.getElementById("taskFormModal").reset();
}

function submitTask(event) {
  event.preventDefault();

  let person = document.getElementById("personNameModal").value;
  let taskName = document.getElementById("taskNameModal").value;
  let imageFile = document.getElementById("personImageModal").files[0];


  if (!person || !taskName || !imageFile) {
    alert("Please fill out all fields.");
    return;
  }
  if (imageFile.size > 10000000) {
    alert("image is to big");
    return;
  }

  let reader = new FileReader();
  reader.readAsDataURL(imageFile);
  reader.onloadend = function () {
    let base64String = reader.result;


    arrayoftasks.push({
      name: person,
      taskName: taskName,
      img: base64String,
      status: currentStatus,
      id: Date.now(),
      publishedDate: new Date()
    });


    window.localStorage.setItem("tasks", JSON.stringify(arrayoftasks));


    closeTaskModal();


    addelementstopagefrom(arrayoftasks);
  };
}


if (localStorage.getItem("tasks")) {
  arrayoftasks = JSON.parse(localStorage.getItem("tasks"));
  addelementstopagefrom(arrayoftasks);
}

function addelementstopagefrom(arrayoftasks) {
  // Clearing the task containers to prevent duplication
  document.getElementById("To_Do").innerHTML = '';
  document.getElementById("inWork").innerHTML = '';
  document.getElementById("Done").innerHTML = '';

  arrayoftasks.forEach(task => {
    let card = document.createElement("div");
    card.classList.add("card");

    let p = document.createElement("p");
    card.appendChild(p);

    let dflex = document.createElement("div");
    dflex.classList.add("d-flex");

    let userinf = document.createElement("div");
    userinf.classList.add("userinfo");

    let picture = document.createElement("img");
    let username = document.createElement("p");

    userinf.appendChild(picture);
    userinf.appendChild(username);

    let dateinfo = document.createElement("div");
    dateinfo.classList.add("dateinfo");

    let clockicon = document.createElement("i");
    clockicon.classList.add("fa-regular", "fa-clock");

    let dateOFtask = document.createElement("date");

    dateinfo.appendChild(clockicon);
    dateinfo.appendChild(dateOFtask);

    dflex.appendChild(userinf);
    dflex.appendChild(dateinfo);
    card.appendChild(dflex);

    p.innerHTML = task.taskName;
    picture.src = task.img;
    username.innerHTML = task.name;
    dateOFtask.innerHTML = new Date(task.publishedDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    if (task.status == Status.TO_DO) {
      document.getElementById("To_Do").appendChild(card);
    } else if (task.status == Status.IN_WORK) {
      document.getElementById("inWork").appendChild(card);
    } else if (task.status == Status.DONE) {
      document.getElementById("Done").appendChild(card);
    }
  });
}
