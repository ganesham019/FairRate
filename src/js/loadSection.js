import { showData } from "./showData";

// user detail form
const getFirstName = document.getElementById('firstname');
const getLastName = document.getElementById('lastname');

// get Personal details
const getAddress = document.getElementById('address');
const getEmail = document.getElementById('email');
const getDate = document.getElementById('datepicker');
const getRentCheckbox = document.getElementById('rent');
const getHouseCheckbox = document.getElementById('house');
const getSaleCheckbox = document.getElementById('sale');
const getBurgerAlarm = document.getElementById('burgeralarm');
const getFireAlarm = document.getElementById('firealarm');

const userSection = document.getElementById('user_detail');
const personalSection = document.getElementById('personal');
const getDocumentSection = document.getElementById('document');
const getBrandSection = document.getElementById('brands');
const getRateSection = document.getElementById('rates');
const getStepsSection = document.getElementById('steps');
const getApplySection = document.getElementById('application');

const getFileErr = document.getElementById('fileErr');
const volunteer = document.getElementById('volunteer');
const volunteerName = document.getElementById('volunteer_name');
const currentTime = document.getElementById('current_time');
let getOptionText = document.getElementById('option_text');

// parent chekcbox
const adjustableCheck = document.getElementById('adjustable');
const fixedCheck = document.getElementById('fixed');
// filter checkbox 
const fifteenYearCheckbox = document.getElementById('fifteenyear');
const twentyYearCheckbox = document.getElementById('twentyyear');
const thirtyYearCheckbox = document.getElementById('thirtyyear');
const rateTenCheckbox = document.getElementById('rateten');
const rateSevenCheckbox = document.getElementById('rateseven');
const rateFiveCheckbox = document.getElementById('ratefive');

const loadPage = (currentStatus,currentUserDetail) => {
    switch (currentStatus) {
        case 1:
            // userdetails
            userSection.classList.remove('hide');
            personalSection.classList.add('hide');
            getDocumentSection.classList.add('hide');
            getBrandSection.classList.add('hide');
            getStepsSection.classList.add('hide');
            getRateSection.classList.add('hide');
            getApplySection.classList.add('hide');
            break;
        case 2:
            // personal details
            userSection.classList.add('hide');
            personalSection.classList.remove('hide');
            getDocumentSection.classList.add('hide');
            getBrandSection.classList.add('hide');
            getFileErr.innerText = "";
            getFileErr.classList.remove('active');
            getStepsSection.classList.add('hide');
            getRateSection.classList.add('hide');
            getApplySection.classList.add('hide');
            break;
        case 3:
            // document upload
            userSection.classList.add('hide');
            personalSection.classList.add('hide');
            getDocumentSection.classList.remove('hide');
            getBrandSection.classList.add('hide');
            getRateSection.classList.add('hide');
            getStepsSection.classList.add('hide');
            getApplySection.classList.add('hide');
            break;
        case 4:
            // fetch data from json
            userSection.classList.add('hide');
            personalSection.classList.add('hide');
            getDocumentSection.classList.add('hide');
            getBrandSection.classList.remove('hide');
            getRateSection.classList.add('hide');
            getStepsSection.classList.add('hide');
            getApplySection.classList.add('hide');
            //    show data from array of object
            showData();
            break;
        case 5:
            // load all the checkbox true
            fixedCheck.checked = true;
            adjustableCheck.checked = true;
            fifteenYearCheckbox.checked = true;
            twentyYearCheckbox.checked = true;
            thirtyYearCheckbox.checked = true;
            rateTenCheckbox.checked = true;
            rateSevenCheckbox.checked = true;
            rateFiveCheckbox.checked = true;
            userSection.classList.add('hide');
            personalSection.classList.add('hide');
            getDocumentSection.classList.add('hide');
            getBrandSection.classList.add('hide');
            getRateSection.classList.remove('hide');
            getStepsSection.classList.add('hide');
            getApplySection.classList.add('hide');

            var time = new Date();
            currentTime.innerText = "Rates and fees as of" + " " + time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            break;
        case 6:
            userSection.classList.add('hide');
            personalSection.classList.add('hide');
            getDocumentSection.classList.add('hide');
            getBrandSection.classList.add('hide');
            getRateSection.classList.add('hide');
            getStepsSection.classList.remove('hide');
            getApplySection.classList.add('hide');
            break;
        case 7:
            volunteer.innerText = "Good Day - " + currentUserDetail.firstname + " " + currentUserDetail.lastname;
            userSection.classList.add('hide');
            personalSection.classList.add('hide');
            getDocumentSection.classList.add('hide');
            getBrandSection.classList.add('hide');
            getRateSection.classList.add('hide');
            getStepsSection.classList.add('hide');
            getApplySection.classList.remove('hide');
            break;
        default:
            userSection.classList.remove('hide');
            break;
    }

}

// load section every refresh
export const loadSection = () => {
    // scroll to top
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // get from local storage when user is refresh the page and refill the input values
    let currentUserDetail = JSON.parse(localStorage.getItem("userDetails"));
    let currentPersonalDetail = JSON.parse(localStorage.getItem("personalDetails"));
    // current status
    const currentStatus = JSON.parse(localStorage.getItem("currentPage"));
    if (currentUserDetail !== null) {
        getFirstName.value = currentUserDetail.firstname;
        getLastName.value = currentUserDetail.lastname;
        volunteerName.innerText = currentUserDetail.firstname + " " + currentUserDetail.lastname;
    }
    if (currentPersonalDetail !== null) {
        getAddress.value = currentPersonalDetail.address;
        getEmail.value = currentPersonalDetail.email;
        getDate.value = currentPersonalDetail.dob;
        getOptionText.innerText = currentPersonalDetail.apply;

        if (currentPersonalDetail.rent === 'on') {
            getRentCheckbox.checked = true;
            let rentParentElement = getRentCheckbox.parentElement;
            rentParentElement.classList.add('active');
        }

        if (currentPersonalDetail.house === 'on') {
            getHouseCheckbox.checked = true;
            let houseParentElement = getHouseCheckbox.parentElement;
            houseParentElement.classList.add('active');
        }

        if (currentPersonalDetail.sale === 'on') {
            getSaleCheckbox.checked = true;
            let saleParentElement = getSaleCheckbox.parentElement;
            saleParentElement.classList.add('active');
        }
        if (currentPersonalDetail.burgeralarm === 'on') {
            getBurgerAlarm.checked = true;
            let burgerParentElement = getBurgerAlarm.parentElement.parentElement;
            burgerParentElement.classList.add('active');
        }

        if (currentPersonalDetail.firealarm === 'on') {
            getFireAlarm.checked = true;
            let fireParentElement = getFireAlarm.parentElement.parentElement;
            fireParentElement.classList.add('active');
        }
    }
    loadPage(currentStatus,currentUserDetail);
}