var courseName = document.querySelector("#courseName");
var courseCategory = document.querySelector("#courseCategory");
var coursePrice = document.querySelector("#coursePrice");
var courseDescription = document.querySelector("#courseDescription");
var courseCapacity = document.querySelector("#courseCapacity");
var addBtn = document.querySelector("#click");
var inputs=document.querySelectorAll(".inputs")
var search=document.querySelector("#search");
var nameError=document.querySelector(".nameError");
var isNameTrue=false
var courses=[]
addBtn.addEventListener("click", function (e) {
  e.preventDefault()
  addCourse()
  clearInputs()
  displayData()
});

function addCourse(){
    var course = {
        name: courseName.value,
        category: courseCategory.value,
        price: coursePrice.value, 
        description: courseDescription.value,
        capacity: courseCapacity.value,
      }
      courses.push(course)
      console.log(courses)
}
function  clearInputs(){
    
  for(var i=0;i<inputs.length;i++){
    inputs[i].value=""
  }
}
function displayData(){
  var result=``;
  for(var i=0;i<courses.length;i++){
    result+= `
    <tr>
    <td>${i}</td>
    <td>${courses[i].name}</td>
    <td>${courses[i].category}</td>
    <td>${courses[i].price}</td>
    <td>${courses[i].description}</td>
    <td>${courses[i].capacity}</td>
    <td><button class='btn btn-outline-info'>update</button></td>
    <td><button class="btn btn-outline-danger" onclick="deleteCourse(${i})">delete</button></td>
    </tr>
    `;
  }
  document.getElementById("data").innerHTML=result
}

function deleteCourse(i){
courses.splice(i, 1)
displayData();
}

search.addEventListener("keyup",function(e){
  var result=``;
  for(var i=0;i<courses.length;i++){
    if(courses[i].name.toLowerCase().includes(e.target.value.toLowerCase()))
    result+= `
    <tr>
    <td>${i}</td>
    <td>${courses[i].name}</td>
    <td>${courses[i].category}</td>
    <td>${courses[i].price}</td>
    <td>${courses[i].description}</td>
    <td>${courses[i].capacity}</td>
    <td><button class='btn btn-outline-info'>update</button></td>
    <td><button class="btn btn-outline-danger" onclick="deleteCourse(${i})">delete</button></td>
    </tr>
    `;
  }
  document.getElementById("data").innerHTML=result

})

courseName.addEventListener("keyup",function(){
  var pattern = /^[A-Z][a-z]{2,9}$/;
if(pattern.test(courseName.value))
{
  if(courseName.classList.contains("is-invalid"))
  courseName.classList.remove("is-invalid")
  courseName.classList.add("is-valid")
  nameError.style.cssText="display:none"
  isNameTrue=true
}else{
  if(courseName.classList.contains("is-valid"))
  courseName.classList.remove("is-valid")
  courseName.classList.add("is-invalid")
  nameError.style.cssText="display:block"
 isNameTrue=false
}
if(isNameTrue){
  addBtn.removeAttribute("disabled")
}else{
  addBtn.setAttribute("disabled","disabled")
}
})

