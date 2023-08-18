import { loadSection } from "./loadSection";

let userDataList = {};
let personalDataList = {};

// regex patterns
let firstNameRegex = /^[A-Za-z]{3,29}$/;
let lastNameRegex = /^[A-Za-z]{1,29}$/;
let addressRegex = /^[#.0-9a-zA-Z\s,-]+$/;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// verifying variable
let verifiedFirstName = false;
let verifiedLastName = false;
let verifiedEmail = false;
let verifiedAddress = false;
let verifiedDate = false;
let catergoryVerified = false;
let verfiedSelect = false;
// user detail form
const getFirstName = document.getElementById('firstname');
const getFirstNameErr = document.getElementById('firstNameErr');
const getLastName = document.getElementById('lastname');
const getLastNameErr = document.getElementById('lastNameErr');

// get Personal details
const getAddress = document.getElementById('address');
const getAddressErr = document.getElementById('addressErr');
const getEmail = document.getElementById('email');
const getEmailErr = document.getElementById('emailErr');
const getDate = document.getElementById('datepicker');
const getDateErr = document.getElementById('dateErr');
const getSelectMenuErr = document.getElementById('selectMenuErr');
const getRentCheckbox = document.getElementById('rent');
const getHouseCheckbox = document.getElementById('house');
const getSaleCheckbox = document.getElementById('sale');
const getCategoryErr = document.getElementById('categoryErr');

let getOptionText = document.getElementById('option_text');
const getDocumentNav = document.getElementById('documents');
const userSubmitButton = document.getElementById('user_det_submit');
const personalSubmitButton = document.getElementById('personal_submit');
const userSection = document.getElementById('user_detail');
const personalSection = document.getElementById('personal');
const getDocumentSection = document.getElementById('document');
const volunteerName = document.getElementById('volunteer_name');

// user details validate inputs 
export const validate = () => {
    // validate first name
    if (getFirstName.value) {
        if (getFirstName.value.match(firstNameRegex)) {
            getFirstNameErr.innerText = "";
            verifiedFirstName = true;

        } else {
            getFirstNameErr.innerText = "FirstName is Invalid!";
        }
    } else {
        getFirstNameErr.innerText = "FirstName is Required";
    }

    // validate last name
    if (getLastName.value) {
        if (getLastName.value.match(lastNameRegex)) {
            getLastNameErr.innerText = "";
            verifiedLastName = true;
        } else {
            getLastNameErr.innerText = "LastName is Invalid!";
        }
    } else {
        getLastNameErr.innerText = "LastName is Required";
    }
}
// personal data validate
export const personalValidate = () => {
    // address validate
    if (getAddress.value) {
        if (getAddress.value.match(addressRegex)) {
            getAddressErr.innerText = "";
            verifiedAddress = true;
        } else {
            getAddressErr.innerText = "Address is Invalid!";
        }
    } else {
        getAddressErr.innerText = "Address is Required";
    }
    // email validate
    if (getEmail.value) {
        if (getEmail.value.match(emailRegex)) {
            getEmailErr.innerText = "";
            verifiedEmail = true;
        } else {
            getEmailErr.innerText = "Email is Invalid!";
        }
    } else {
        getEmailErr.innerText = "Email is Required";
    }

    // date validate
    if (getDate.value) {
        getDateErr.innerText = "";
        verifiedDate = true;
    } else {
        getDateErr.innerText = "Date is Required";
    }

    if (getRentCheckbox.checked || getHouseCheckbox.checked || getSaleCheckbox.checked) {
        catergoryVerified = true;
        getCategoryErr.innerText = "";
    } else {
        catergoryVerified = false;
        getCategoryErr.innerText = "Please select any one of the Category";
    }

    if (getOptionText.innerText == "Select Option") {
        getSelectMenuErr.innerText = "Apply Status is Mandatory";
        verfiedSelect = false;
    } else {
        getSelectMenuErr.innerText = "";
        verfiedSelect = true;
    }
}

getDocumentNav.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem("currentPage", 3);
        loadSection();
});

// click event for submit
userSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    validate();
    if (verifiedFirstName && verifiedLastName) {
        const userform = new FormData(userSection);
        const userformData = Object.fromEntries(userform);
        // update the values
        userDataList.firstname = userformData.firstname;
        userDataList.lastname = userformData.lastname;
        volunteerName.innerText = userformData.firstname + " " + userformData.lastname;

        localStorage.setItem("userDetails", JSON.stringify(userDataList));
        localStorage.setItem("currentPage", 2);
        // hide current page
        userSection.classList.add('hide');
        // set to second page status
        personalSection.classList.remove('hide');
        verifiedFirstName = false;
        verifiedLastName = false;
    } else {
        verifiedFirstName = false;
        verifiedLastName = false;
    }
})
personalSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    personalValidate();
    if (verifiedAddress && verifiedEmail && verifiedDate && catergoryVerified && verfiedSelect) {
        let personalForm = new FormData(personalSection);
        personalForm.append('apply', getOptionText.innerText);
        const personalFormData = Object.fromEntries(personalForm);
        // update the values
        personalDataList.address = personalFormData.address;
        personalDataList.apply = personalFormData.apply;
        personalDataList.email = personalFormData.email;
        personalDataList.dob = personalFormData.dob;
        personalDataList.rent = personalFormData.rent;
        personalDataList.sale = personalFormData.sale;
        personalDataList.house = personalFormData.house;
        personalDataList.burgeralarm = personalFormData.burgeralarm;
        personalDataList.firealarm = personalFormData.firealarm;
        // send the current data to local storage
        localStorage.setItem("personalDetails", JSON.stringify(personalDataList));
        //   set the current to next
        localStorage.setItem("currentPage", 3);
        // hide current page
        personalSection.classList.add('hide');
        // set to second page status
        getDocumentSection.classList.remove('hide');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        verifiedAddress = false;
        verifiedEmail = false;
        verifiedDate = false;
        catergoryVerified = false;
    } else {
        verifiedAddress = false;
        verifiedEmail = false;
        verifiedDate = false;
        catergoryVerified = false;
    }
})

