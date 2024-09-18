
let arrayoftasks = [];
const Status = {
  TO_DO: 'todo',
  IN_WORK: 'inwork',
  DONE: 'done',
}
// recieve you form and save as object
function addTask(event) {
  event.preventDefault();
  let person = document.getElementById("personName").value;
  let taskName = document.getElementById("taskName").value;
  let imageFile = document.getElementById("personImage").files[0];
  let status = document.getElementById("status").value;


  arrayoftasks.push({ name: person, taskName: taskName, img: imageFile, status: Status[status], id: Date.now(), publishedDate: new Date() });
  //STORE in local storage
  window.localStorage.setItem("tasks", JSON.stringify(arrayoftasks));
  //add the new task to the page
  addelementstopagefrom(arrayoftasks);
}

//add to local storage
if (localStorage.getItem("tasks")) {
  arrayoftasks = JSON.parse(localStorage.getItem("tasks"));
  addelementstopagefrom(arrayoftasks);
}
function addelementstopagefrom(arrayoftasks) {
  //clearing the array of tasks to prevent duplication
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
    let dateOFtask = document.createElement("date");
    dateinfo.appendChild(clockicon);
    dateinfo.appendChild(dateOFtask);
    dflex.appendChild(userinf);
    dflex.appendChild(dateinfo);
    card.appendChild(dflex);
    p.innerHTML = task.taskName;
    // picture.src = task.img;
    username.innerHTML = task.name;
    dateOFtask.innerHTML = new Date(task.publishedDate).toLocaleString();

    if (task.status == Status.TO_DO) {
      document.getElementById("To_Do").appendChild(card);
    }
    else if (task.status == Status.IN_WORK) {
      document.getElementById("inWork").appendChild(card);
    }
    else if (task.status == Status.DONE) {

      document.getElementById("Done").appendChild(card);
    }
    console.log(task);

  })

}
