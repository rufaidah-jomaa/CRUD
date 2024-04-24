var courseName = document.querySelector("#courseName");
var courseCategory = document.querySelector("#courseCategory");
var coursePrice = document.querySelector("#coursePrice");
var courseDescription = document.querySelector("#courseDescription");
var courseCapacity = document.querySelector("#courseCapacity");
var addBtn = document.querySelector("#click");
var inputs=document.querySelectorAll(".inputs")
var search=document.querySelector("#search");
var nameError=document.querySelector(".nameError");
var catError=document.querySelector(".catError");
var priceError=document.querySelector(".priceError")
var capError=document.querySelector(".capError")

var isNameTrue=false
var isCategoryTrue=false
var isPriceTrue=false
var isCapTrue=false

if(JSON.parse(localStorage.getItem("courses"))== null){
           var courses=[];
}else{
  courses = JSON.parse(localStorage.getItem("courses"))
  displayData()
}


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
      localStorage.setItem("courses",JSON.stringify(courses))
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "course added successfully",
        showConfirmButton: false,
        timer: 3000
      });
      
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
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      courses.splice(i,1)
      localStorage.setItem("courses",JSON.stringify(courses))
      displayData();
      swalWithBootstrapButtons.fire({
       
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });

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



})

courseCategory.addEventListener("keyup",function(){
  var pattern = /^[A-Z][a-z]{2,9}$/;
if(pattern.test(courseCategory.value))
{
  if(courseCategory.classList.contains("is-invalid"))
  courseCategory.classList.remove("is-invalid")
  courseCategory.classList.add("is-valid")
  catError.style.cssText="display:none"
  isCategoryTrue=true
 
}else{
  if(courseCategory.classList.contains("is-valid"))
  courseCategory.classList.remove("is-valid")
  courseCategory.classList.add("is-invalid")
  catError.style.cssText="display:block"
  isCategoryTrue=false
 
}

})

coursePrice.addEventListener("keyup",function(){
  var pattern = /^([1-8][0-9][0-9]|900)$/gm
if(pattern.test(coursePrice.value))
{
  if(coursePrice.classList.contains("is-invalid"))
  coursePrice.classList.remove("is-invalid")
  coursePrice.classList.add("is-valid")
 priceError.style.cssText="display:none"
  isPriceTrue=true
 
}else{
  if(coursePrice.classList.contains("is-valid"))
  coursePrice.classList.remove("is-valid")
  coursePrice.classList.add("is-invalid")
  priceError.style.cssText="display:block"
  isPriceTrue=false
}
})

courseCapacity.addEventListener("keyup",function(){
  var pattern = /^([1-2][0-9][0-9]|300)$/gm
if(pattern.test(courseCapacity.value))
{
  if(courseCapacity.classList.contains("is-invalid"))
  courseCapacity.classList.remove("is-invalid")
  courseCapacity.classList.add("is-valid")
 capError.style.cssText="display:none"
  isCapTrue=true
 
}else{
  if(courseCapacity.classList.contains("is-valid"))
  courseCapacity.classList.remove("is-valid")
  courseCapacity.classList.add("is-invalid")
  capError.style.cssText="display:block"
  isCapTrue=false
}
if(isNameTrue && isCategoryTrue && isPriceTrue && isCapTrue){
  addBtn.removeAttribute("disabled")
}else{
  addBtn.setAttribute("disabled", "disabled")
}
})
