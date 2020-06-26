let submitHandler = document.getElementById('submitButton');
let categorySelect = document.getElementById('category_id');
let pagetitle = document.getElementById('page_title');
let viewCategories = [];
let baseUrl = window.location.origin;

let docone;
let doctwo;
let docthree;
let docfour;

function fetchCategories() {
  const XHR = new XMLHttpRequest();
  XHR.open('GET', 'https://ghost.cudoapp.com/api/categories');
  XHR.setRequestHeader('Content-Type', 'application/json');
  XHR.send();
  pagetitle.textContent = 'Please wait...';
  XHR.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      pagetitle.textContent = 'All fields are compulsory';
      let response = JSON.parse(this.responseText);
      categories = response.categories.data;
      viewCategories.push('<option value="">Select service category</option>');
      categories.forEach(category => {
        viewCategories.push(`<option value=${category.id}>${category.name}</option>`);
      })
      categorySelect.innerHTML = viewCategories;
    }
  }
  XHR.addEventListener('error', function () {
    console.log('Oops! Something went wrong.')
  })
}

window.addEventListener('load', function () {
  fetchCategories();
});

function ValidateEmail(emailAddress) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAddress.match(mailformat)) {
    return true;
  }
  else {
    alert("You have entered an invalid email address!");
    return false;
  }
}

// onchange = "selectedFile();"

function onFileChange(fileName) {
  if (fileName === 'docone') {
    let eOne = document.getElementById("docone");
    docone = eOne.files[0];
  }
  if (fileName === 'doctwo') {
    let eTwo = document.getElementById("doctwo");
    doctwo = eTwo.files[0];
  }
  if (fileName === 'docthree') {
    let eThree = document.getElementById("docthree");
    docthree = eThree.files[0];
  }
  if (fileName === 'docfour') {
    let eFour = document.getElementById("docfour");
    docfour = eFour.files[0];
  }
}

function submitForm() {
  submitHandler.innerHTML = 'Please wait';
  const http = new XMLHttpRequest();
  let userDetails = {};
  var formData = new FormData();
  userDetails.name = document.getElementById("name").value;
  userDetails.email = document.getElementById("email").value;
  userDetails.phone = document.getElementById("phone").value;
  userDetails.gender = document.getElementById("gender").value;
  userDetails.password = document.getElementById("password").value;
  userDetails.lga = document.getElementById("lga").value;
  userDetails.street = document.getElementById("street").value;
  userDetails.town = document.getElementById("town").value;
  userDetails.country = document.getElementById("country").value;
  userDetails.post_code = document.getElementById("post_code").value;
  userDetails.dob = document.getElementById("dob").value;
  userDetails.category_id = '1';
  let doob = userDetails.dob.split('-');
  let doobTodate = [doob[2], doob[1], doob[0]];
  let validDOB = doobTodate.join('/');
  // userDetails.category_id = document.getElementById("category_id").value;

  // checks
  if (userDetails.name === '') return alert('Full name is compulsory');
  if (!ValidateEmail(userDetails.email)) return;
  if (userDetails.phone === '' || userDetails.phone.length < 13) return alert('The phone must be at least 13 characters.');
  if (userDetails.gender === '') return alert('Gender is compulsory');
  if (userDetails.password === '') return alert('Password is compulsory');
  if (userDetails.lga === '') return alert('LGA is compulsory');
  if (userDetails.street === '') return alert('Street name is compulsory');
  if (userDetails.town === '') return alert('Town is compulsory');
  if (userDetails.country === '') return alert('Country is compulsory');
  if (userDetails.post_code === '') return alert('Post code is compulsory');
  if (userDetails.dob === '') return alert('Date of birth is compulsory');
  if (!docone) return alert('CV is compulsory');
  if (!doctwo) return alert('Professional License of practice is compulsory');
  if (!docthree) return alert('ID CARD (national, voters is compulsory)');
  if (!docfour) return alert('Proof of address is compulsory');

  //create form data
  formData.append('name', userDetails.name);
  formData.append('email', userDetails.email);
  formData.append('gender', userDetails.gender);
  formData.append('password', userDetails.password);
  formData.append('phone', userDetails.phone);
  formData.append('street', userDetails.street);
  formData.append('town', userDetails.town);
  formData.append('country', userDetails.country);
  formData.append('lga', userDetails.lga);
  formData.append('post_code', userDetails.post_code);
  formData.append('category_id', userDetails.category_id);
  formData.append('dob', validDOB);
  if (docone && docone.name) formData.append('docone', docone, docone.name);
  if (doctwo && doctwo.name) formData.append('doctwo', doctwo, doctwo.name);
  if (docthree && docthree.name) formData.append('docthree', docthree, docthree.name);
  if (docfour && docfour.name) formData.append('docfour', docfour, docfour.name);

  // requests
  http.open('POST', 'https://ghost.cudoapp.com/api/stage');
  http.setRequestHeader('Accept', 'application/json');
  http.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      submitHandler.innerHTML = 'Sign up';
      alert('Registration successful...rediecting to homepage');
      window.location.replace(`${baseUrl}`);
    }
  }
  http.send(formData);
  submitHandler.innerHTML = 'Sign up';
}

submitHandler.addEventListener('click', function (e) {
  e.preventDefault();
  submitForm();
})