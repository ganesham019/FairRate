// es modules import
import flatpickr from "flatpickr";
import { personalValidate, validate } from "./validations";
import { uploadFile, loadFileList } from "./fileUpload";
import { loadSection } from "./loadSection";
import './domManipulations';
document.addEventListener('DOMContentLoaded', () => {
    const getProfileMenu = document.getElementById('nav_profile_user');
    // select menu
    const getSelectMenuBtn = document.getElementById('select_menu_btn');
    let getOptionText = document.getElementById('option_text');
    const options = document.querySelectorAll('.option');
   
    // range slider 
    const fairMonthRange = document.getElementById('fair_range_month');
    const fairPointRange = document.getElementById('fair_calc_points');

    // nav dropdown
    document.addEventListener('click', (e) => {
        e.stopPropagation();
        if (e.target.classList.contains('volunteer_name') || e.target.classList.contains('prof_img') || e.target.classList.contains('nav_profile_user') || e.target.classList.contains('down_arrow')) {
            getProfileMenu.classList.toggle('active');
        } else if (e.target.classList.contains('nav_profile_user_option')) {
            getProfileMenu.setAttribute('class', "nav_profile_user active");
        } else {
            getProfileMenu.setAttribute('class', 'nav_profile_user');
        }
    });

    // if outside click , dropdown will deactive
    document.addEventListener('click', (e) => {
        e.stopPropagation();
        if (e.target.classList.contains('select_menu_btn') || e.target.classList.contains('select_option')) {
            getSelectMenuBtn.classList.toggle('active');
        } else if (e.target.classList.contains('options')) {
            getSelectMenuBtn.setAttribute('class', "select_menu_btn active");
        }
        else {
            getSelectMenuBtn.setAttribute('class', 'select_menu_btn');
        }
    });

    // get the selecting option in dropwdown
    options.forEach((option) => {
        option.addEventListener('click', () => {
            let selectedOption = option.innerText;
            getOptionText.innerText = selectedOption;
            getSelectMenuBtn.classList.remove('active');
        })
    })

    // if refresh the page this function will invoke
    //  this function is allow to check the current page and update the section
    loadSection();
    loadFileList();

    // file Upload
    const getFile = document.getElementById('file');

    getFile.addEventListener('change', (e) => {
        uploadFile(e);
    });

    // Add this EventListener for we can upload the same image with multiple time
    getFile.addEventListener("click", function () {
        getFile.value = "";
    });

    // get all checkbox
    const getAllInputBox = document.querySelectorAll('.checkbox_set input[type="checkbox"]');
    // get alaram checkbox
    const getAlarmInputBox = document.querySelectorAll('.alarm_set input[type="checkbox"]');

    // add checkbox set active
    getAllInputBox.forEach((item) => {
        item.addEventListener('click', (e) => {
            let parentElement = item.parentElement;
            if (e.target.checked) {
                parentElement.classList.add('active');
            } else {
                parentElement.classList.remove('active');
            }
        })
    });

    // filter section scripts
    fairMonthRange.innerText = 2000;
    fairPointRange.innerText = 2200;

    // add active for alarm set
    getAlarmInputBox.forEach((item) => {
        item.addEventListener('click', (e) => {
            let parentElement = item.parentElement.parentElement;
            if (e.target.checked) {
                parentElement.classList.add('active');
            } else {
                parentElement.classList.remove('active');
            }
        })
    });

    //datepicker with id
    flatpickr('#datepicker', {
        allowInput: true,
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
    });
});