var proudctName = document.getElementById("proudctName");
var proudctPrice = document.getElementById("proudctPrice");
var proudctCategory = document.getElementById("proudctCategory");
var proudctDesc = document.getElementById("proudctDesc");
var addButoom = document.getElementById("addButtom");
var inputs = document.getElementsByClassName("form-control");
var serchInput = document.getElementById("serchInput");
var alerName=document.getElementById("alerName");
var proudcts = [];
var curentIndex;
var rejexName
// validation proudact Name
proudctName.onkeyup=function() {
  rejexName=/^[A-Z][a-z]{3,15}$/
  if (!rejexName.test(proudctName.value)) {
    addButoom.disabled="true"
    proudctName.classList.add("is-invalid")
    proudctName.classList.remove("is-valid")
    alerName.classList.remove("d-none")
  
  }else{
    addButoom.removeAttribute("disabled")
    proudctName.classList.add("is-valid")
    proudctName.classList.remove("is-invalid")
    alerName.classList.add("d-none")
  

  }
}

if (JSON.parse(localStorage.getItem("proudctlist")) != null) {
  proudcts = JSON.parse(localStorage.getItem("proudctlist"));
  displyProuct();
}
// this for update proudact

addButoom.onclick = function () {
  
  if (addButoom.innerHTML == "update") {
    update();
    document.getElementById("addButtom").innerHTML = "add"
  } else {
    addProudct();
  }

  displyProuct();
  clerForm();
};

function addProudct() {
  if (proudctName.value==""||rejexName.test(proudctName.value)==false) {
    swal({
      title: "Please enter your product information!",
    });
  }else{

    var proudct = {
      name: proudctName.value,
      price: proudctPrice.value,
      Category: proudctCategory.value,
      Desc: proudctDesc.value,
    };
    proudcts.push(proudct);
    localStorage.setItem("proudctlist", JSON.stringify(proudcts));
  }
  }

function displyProuct() {
  var trs = "";
  for (var i = 0; i < proudcts.length; i++) {
    trs += `<tr >
              <td>${i + 1}</td>
              <td>${proudcts[i].name}</td>
              <td>${proudcts[i].price}</td>
              <td>${proudcts[i].Category}</td> 
              <td>${proudcts[i].Desc}</td>
              <td><button onclick="updateProudact(${i})" class="btn btn-outline-info">update</button></td>
              <td> <button onclick="deleteProudct(${i})" class="btn btn-outline-danger">delete</button></td>
              
          </tr>`;
  }
  document.getElementById("tboddy").innerHTML = trs;
}

function clerForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function deleteProudct(index) {
  proudcts.splice(index, 1);
  displyProuct();
  localStorage.setItem("proudctlist", JSON.stringify(proudcts));
}

// this for serch in proudact by name 
serchInput.onkeyup=function () {
  var trs = "";
  var val=serchInput.value
  for (var i = 0; i < proudcts.length; i++) {
    if (proudcts[i].name.toLowerCase().includes(val.toLowerCase())) {
      trs += `<tr>
            <td>${i + 1}</td>
            <td>${proudcts[i].name}</td>
            <td>${proudcts[i].price}</td>
            <td>${proudcts[i].Category}</td> 
            <td>${proudcts[i].Desc}</td>
            <td><button onclick="updateProudact(${i})" class="btn btn-outline-info">update</button></td>
            <td> <button onclick="deleteProudct(${i})" class="btn btn-outline-danger">delete</button></td>
            
        </tr>`;
    }
  }
  document.getElementById("tboddy").innerHTML = trs;
}



function updateProudact(index) {
  proudctName.value = proudcts[index].name;
  proudctPrice.value = proudcts[index].price;
  proudctCategory.value = proudcts[index].Category;
  proudctDesc.value = proudcts[index].Desc;
  curentIndex = index;

  document.getElementById("addButtom").innerHTML = "update";
}


function update() {
  var proudct = {
    name: proudctName.value,
    price: proudctPrice.value,
    Category: proudctCategory.value,
    Desc: proudctDesc.value,
  };

  proudcts[curentIndex] = proudct;
  localStorage.setItem("proudctlist", JSON.stringify(proudcts));
}
