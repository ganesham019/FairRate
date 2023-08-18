import { loadFileList } from "./fileUpload";
import { loadSection } from "./loadSection";

// parent chekcbox
const adjustableCheck = document.getElementById('adjustable');
const fixedCheck = document.getElementById('fixed');
// filter checkbox 
const adjustableCheckBoxes = document.querySelectorAll('.adjustable');
const fixedCheckBoxes = document.querySelectorAll('.fixed');
const fifteenYearCheckbox = document.getElementById('fifteenyear');
const twentyYearCheckbox = document.getElementById('twentyyear');
const thirtyYearCheckbox = document.getElementById('thirtyyear');
const rateTenCheckbox = document.getElementById('rateten');
const rateSevenCheckbox = document.getElementById('rateseven');
const rateFiveCheckbox = document.getElementById('ratefive');
const minYear = document.getElementById('minyear');
const mediumYear = document.getElementById('mediumyear');
const thirtyYear = document.getElementById('longyear');
const tenPercent = document.getElementById('tenpercent');
const sevenPercent = document.getElementById('sevenpercent');
const fivePercent = document.getElementById('fivepercent');

// range slider 
const monthRange = document.getElementById('months');
const pointsRange = document.getElementById('points');
const fairMonthRange = document.getElementById('fair_range_month');
const fairPointRange = document.getElementById('fair_calc_points');

// get data from dom tree
const personalBackButton = document.getElementById('personal_back');
const getDocumentBackBtn = document.getElementById('document_back');
const getDocumentButtonSet = document.getElementById('document_btn_set');
const getDocumentPhotoBtn = document.getElementById('doc_photo_sec');
const getDocumentAddressBtn = document.getElementById('doc_address_sec');
const getDocumentPhotoWrap = document.getElementById('document_wrap_photo');
const getDocumentAddressWrap = document.getElementById('document_wrap_address');

const getRateNextBtn = document.getElementById('rate_next');
const getProfileStepBtn = document.getElementById('profile_step_btn');
const getBrandsBackBtn = document.getElementById('brands_sec_back');
const getFairBackBtn = document.getElementById('fair_sec_back');
const getApplySecBackBtn = document.getElementById('application_sec_back');

const getFileErr = document.getElementById('fileErr');
const getHomeNav = document.getElementById('home');
const getLogoHomeNav = document.getElementById('logo_home');

const getStepsSecBackBtn = document.getElementById('steps_sec_back');

pointsRange.oninput = () => {
    fairPointRange.innerText = pointsRange.value;
}
monthRange.oninput = () => {
    fairMonthRange.innerText = monthRange.value;
}

// if all the checkboc will uncheck,  go back and return rest all the checkbox 
getStepsSecBackBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("currentPage", 5);
    minYear.classList.remove('hide');
    mediumYear.classList.remove('hide');
    thirtyYear.classList.remove('hide');
    fivePercent.classList.remove('hide');
    sevenPercent.classList.remove('hide');
    tenPercent.classList.remove('hide');
    loadSection();
});
monthRange.addEventListener('input', () => {
    fairMonthRange.innerText = monthRange.value;
    if (fairMonthRange.innerText >= 3000 && fairMonthRange.innerText <= 3120) {
        mediumYear.classList.remove('hide');
        minYear.classList.remove('hide');
        thirtyYear.classList.remove('hide');
        tenPercent.classList.remove('hide');
        sevenPercent.classList.remove('hide');
        fivePercent.classList.remove('hide');
    } else if (fairMonthRange.innerText >= 3121 && fairMonthRange.innerText <= 3799) {
        mediumYear.classList.remove('hide');
        minYear.classList.remove('hide');
        thirtyYear.classList.remove('hide');
        tenPercent.classList.remove('hide');
        sevenPercent.classList.add('hide');
        fivePercent.classList.remove('hide');
    } else if (fairMonthRange.innerText > 3800 && fairMonthRange.innerText <= 4000) {
        mediumYear.classList.remove('hide');
        minYear.classList.add('hide');
        thirtyYear.classList.remove('hide');
        tenPercent.classList.remove('hide');
        sevenPercent.classList.add('hide');
        fivePercent.classList.add('hide');
    } else if (fairMonthRange.innerText > 4001 && fairMonthRange.innerText <= 4120) {
        mediumYear.classList.remove('hide');
        minYear.classList.add('hide');
        thirtyYear.classList.add('hide');
        tenPercent.classList.add('hide');
        sevenPercent.classList.add('hide');
        fivePercent.classList.add('hide');
    } else {
        mediumYear.classList.add('hide');
        minYear.classList.add('hide');
        thirtyYear.classList.add('hide');
        tenPercent.classList.add('hide');
        sevenPercent.classList.add('hide');
        fivePercent.classList.add('hide');
    }
});
pointsRange.addEventListener('input', () => {
    fairPointRange.innerText = pointsRange.value;
    if (fairPointRange.innerText >= 3000 && fairPointRange.innerText < 3101) {
        tenPercent.classList.remove('hide');
        sevenPercent.classList.remove('hide');
        fivePercent.classList.remove('hide');
        mediumYear.classList.remove('hide');
        minYear.classList.remove('hide');
        thirtyYear.classList.remove('hide');
    } else if (fairPointRange.innerText > 3101 && fairPointRange.innerText < 3899) {
        tenPercent.classList.remove('hide');
        sevenPercent.style.display = "none";
        fivePercent.classList.remove('hide');
        mediumYear.classList.remove('hide');
        minYear.classList.remove('hide');
        thirtyYear.classList.remove('hide');
    } else if (fairPointRange.innerText > 3900 && fairPointRange.innerText < 4120) {
        tenPercent.classList.remove('hide');
        sevenPercent.classList.add('hide');
        fivePercent.classList.add('hide');
        mediumYear.classList.remove('hide');
        minYear.classList.add('hide');
        thirtyYear.classList.add('hide');
    } else {
        tenPercent.classList.add('hide');
        sevenPercent.classList.add('hide');
        fivePercent.classList.add('hide');
        mediumYear.classList.add('hide');
        minYear.classList.add('hide');
        thirtyYear.classList.add('hide');
    }
});
adjustableCheck.addEventListener('change', () => {
    if (adjustableCheck.checked) {
        rateTenCheckbox.checked = true;
        rateSevenCheckbox.checked = true;
        rateFiveCheckbox.checked = true;
        fivePercent.classList.remove('hide');
        sevenPercent.classList.remove('hide');
        tenPercent.classList.remove('hide');
    } else {
        rateTenCheckbox.checked = false;
        rateSevenCheckbox.checked = false;
        rateFiveCheckbox.checked = false;
        fivePercent.classList.add('hide');
        sevenPercent.classList.add('hide');
        tenPercent.classList.add('hide');
    }
});
fixedCheck.addEventListener('change', () => {
    if (fixedCheck.checked) {
        fifteenYearCheckbox.checked = true;
        twentyYearCheckbox.checked = true;
        thirtyYearCheckbox.checked = true;
        minYear.classList.remove('hide');
        mediumYear.classList.remove('hide');
        thirtyYear.classList.remove('hide');
    } else {
        fifteenYearCheckbox.checked = false;
        twentyYearCheckbox.checked = false;
        thirtyYearCheckbox.checked = false;
        minYear.classList.add('hide');
        mediumYear.classList.add('hide');
        thirtyYear.classList.add('hide');
    }
});
fixedCheckBoxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        if (fifteenYearCheckbox.checked && twentyYearCheckbox.checked && thirtyYearCheckbox.checked) {
            fixedCheck.checked = true;
        } else {
            fixedCheck.checked = false;
        }
    })
});
adjustableCheckBoxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        if (rateTenCheckbox.checked && rateSevenCheckbox.checked && rateFiveCheckbox.checked) {
            adjustableCheck.checked = true;
        } else {
            adjustableCheck.checked = false;
        }
    })
});
// thirty
thirtyYearCheckbox.addEventListener('change', () => {
    if (thirtyYearCheckbox.checked) {
        thirtyYear.classList.remove('hide');
    } else {
        thirtyYear.classList.add('hide');
    }
});
// 20 year
twentyYearCheckbox.addEventListener('change', () => {
    if (twentyYearCheckbox.checked) {
        mediumYear.classList.remove('hide');
    } else {
        mediumYear.classList.add('hide');
    }
});
// 15 year
fifteenYearCheckbox.addEventListener('change', () => {
    if (fifteenYearCheckbox.checked) {
        minYear.classList.remove('hide');
    } else {
        minYear.classList.add('hide');
    }
});
// 10/1 points
rateTenCheckbox.addEventListener('change', () => {
    if (rateTenCheckbox.checked) {
        tenPercent.classList.remove('hide');
    } else {
        tenPercent.classList.add('hide');
    }
});
// 7 /1 points
rateSevenCheckbox.addEventListener('change', () => {
    if (rateSevenCheckbox.checked) {
        sevenPercent.classList.remove('hide');
    } else {
        sevenPercent.classList.add('hide');
    }
});
// 5 /1 points
rateFiveCheckbox.addEventListener('change', () => {
    if (rateFiveCheckbox.checked) {
        fivePercent.classList.remove('hide');
    } else {
        fivePercent.classList.add('hide');
    }
});
// document menus
getDocumentPhotoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loadFileList();
    getDocumentPhotoWrap.classList.remove('hide');
    getDocumentAddressWrap.classList.add("hide");
    getDocumentButtonSet.classList.remove("hide");
    getDocumentPhotoBtn.classList.add('active');
    getDocumentAddressBtn.classList.remove('active');
});
getDocumentAddressBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getFileErr.innerText = "";
    getFileErr.classList.remove('active');
    getDocumentPhotoWrap.classList.add('hide');
    getDocumentAddressWrap.classList.remove("hide");
    getDocumentButtonSet.classList.add("hide");
    getDocumentPhotoBtn.classList.remove('active');
    getDocumentAddressBtn.classList.add('active');
});
// back / load Section refill the datas
getLogoHomeNav.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("currentPage", 1);
    loadSection();
});
personalBackButton.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("currentPage", 1);
    loadSection();
});
getDocumentBackBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("currentPage", 2);
    loadSection();
});
getBrandsBackBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("currentPage", 3);
    loadSection();
});
getFairBackBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("currentPage", 4);
    loadSection();
});
getApplySecBackBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("currentPage", 6);
    loadSection();
});
getHomeNav.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("currentPage", 1);
    loadSection();
});
getRateNextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("currentPage", 6);
    loadSection();
});
getProfileStepBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("currentPage", 7);
    loadSection();
})