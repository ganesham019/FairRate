// es modules import
import flatpickr from "flatpickr";
import brandsData from './branddata';

document.addEventListener('DOMContentLoaded', () => {
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

    // get sections 
    const userSection = document.getElementById('user_detail');
    const userSubmitButton = document.getElementById('user_det_submit');
    const volunteer = document.getElementById('volunteer');
    const volunteerName = document.getElementById('volunteer_name');
    const personalSection = document.getElementById('personal');
    const personalSubmitButton = document.getElementById('personal_submit');
    const personalBackButton = document.getElementById('personal_back');
    const getDocumentSection = document.getElementById('document');
    const getDocumentBackBtn = document.getElementById('document_back');
    const getDocumentSubmitBtn = document.getElementById('document_submit');
    const getDocumentButtonSet = document.getElementById('document_btn_set');
    const getDocumentPhotoBtn = document.getElementById('doc_photo_sec');
    const getDocumentAddressBtn = document.getElementById('doc_address_sec');
    const getDocumentPhotoWrap = document.getElementById('document_wrap_photo');
    const getDocumentAddressWrap = document.getElementById('document_wrap_address');
    const getBrandSection = document.getElementById('brands');
    const getBrandListBox = document.getElementById('brand_list_container');
    const getNextBtn = document.getElementById('next');
    const getPrevBtn = document.getElementById('prev');
    const getRateSection = document.getElementById('rates');
    const getStepsSection = document.getElementById('steps');
    const getRateNextBtn = document.getElementById('rate_next');
    const getProfileStepBtn = document.getElementById('profile_step_btn');
    const getApplySection = document.getElementById('application');
    const filterResBtn = document.getElementById('filter_btn');

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
    const getBurgerAlarm = document.getElementById('burgeralarm');
    const getFireAlarm = document.getElementById('firealarm');
    const getCategoryErr = document.getElementById('categoryErr');
    const getFileErr = document.getElementById('fileErr');


    // select menu
    const getSelectMenuBtn = document.getElementById('select_menu_btn');
    let getOptionText = document.getElementById('option_text');
    const options = document.querySelectorAll('.option');
    getSelectMenuBtn.addEventListener('click', () => {
        getSelectMenuBtn.classList.toggle('active');
    });
    options.forEach((option) => {
        option.addEventListener('click', () => {
            let selectedOption = option.innerText;
            console.log(selectedOption);
            getOptionText.innerText = selectedOption;
            getSelectMenuBtn.classList.remove('active');
        })
    })

    // brand filter 
    const getFilterMenuBtn = document.getElementById('select_filter_btn');
    let getFilterText = document.getElementById('filter_text');
    const filterOptions = document.querySelectorAll('.filter_option');
    getFilterMenuBtn.addEventListener('click', () => {
        getFilterMenuBtn.classList.toggle('active');
    });
    filterOptions.forEach((option) => {
        option.addEventListener('click', () => {
            let selectedOption = option.innerText;
            console.log(selectedOption);
            getFilterText.innerText = selectedOption;
            getFilterMenuBtn.classList.remove('active');
        })
    })

    // file sections
    const fileTableContainer = document.getElementById('file_table');
    const getFile = document.getElementById('file');

    let files = [];
    let markupElement = "";
    let LocalStorageFiles;

    // brand variable
    let firstIndex = 0;
    let lastIndex = 10;

    // dummy Array;
    let slicedData;

    // markup for brand list
    let brandMarkup = "";

    // showing brand data function
    const showData = () => {
        slicedData = brandsData.slice(firstIndex, lastIndex);
        slicedData.forEach((item, index) => {
            brandMarkup += `<ul class="brands_container_list_item">
            <li>
             <img src="${item.src}" loading="lazy" width="100" height="45" alt="brand" />
             <span>${item.NMSID}</span>
           </li>
           <li>
             <h3 class="list_heading">${item.aprRate}</h3>
             <span>${item.date}</span>
           </li>
           <li>
             <h5 class="list_small_heading">${item.rate}</h5>
             <span>${item.point}</span>
             <span> ${item.lockRate}</span>
           </li>
           <li>
             <h3 class="list_heading">${item.fees}</h3>
             <span>${item.feespoint} </span>
             <span> ${item.feesLock}</span>
           </li>
           <li>
             <h5 class="list_small_heading">${item.toll}</h5>
             <span>${item.tolldesc}</span>
           </li>
           <li><button class="btn_gray" id="brand_next" data-item="${index}">Next</button></li>
         </ul>`
        });
        getBrandListBox.innerHTML = brandMarkup;
    }

    const updateButtonState = () => {
        // add disable class to next button
        if (lastIndex == 40) {
            getNextBtn.classList.add('disable');
        } else {
            getNextBtn.classList.remove('disable');
        }

        // add disable button to prev button
        if (firstIndex == 0) {
            getPrevBtn.classList.add('disable');
        } else {
            getPrevBtn.classList.remove('disable');
        }
    }

    // brands next button 
    getBrandListBox.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.target.closest('.btn_gray') !== null) {
            localStorage.setItem("currentPage", JSON.stringify(5));
            loadSection();
        }
    })

    // listener for next buttoon
    getNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (firstIndex == 0 && lastIndex == 10) {
            firstIndex = 10;
            lastIndex = 20;

        } else if (firstIndex == 10 && lastIndex == 20) {
            firstIndex = 20;
            lastIndex = 30;

        } else if (firstIndex == 20 && lastIndex == 30) {
            firstIndex = 30;
            lastIndex = 40;
        }
        slicedData = "";
        brandMarkup = '';
        updateButtonState();
        showData();
    })
    // listner for prev button
    getPrevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (firstIndex == 30 && lastIndex == 40) {
            firstIndex = 20;
            lastIndex = 30;
        } else if (firstIndex == 10 && lastIndex == 20) {
            firstIndex = 0;
            lastIndex = 10;
        } else if (firstIndex == 20 && lastIndex == 30) {
            firstIndex = 10;
            lastIndex = 20;
        }
        slicedData = "";
        brandMarkup = '';
        updateButtonState();
        showData();
    })

    filterResBtn.addEventListener('click', () => {
     


    })


    // load local file to display
    const loadFileList = () => {
        //  get from localStorage
        LocalStorageFiles = JSON.parse(localStorage.getItem('uploadedFiles'));
        markupElement = '';
        if (LocalStorageFiles !== null) {
            LocalStorageFiles.forEach((item, index) => {
                markupElement += `<ul class="file_table_list">
                 <li class="file_table_list_image">
                   <img src=${item.src} alt="fileimage" width="20" height="20" />
                 </li>
                 <li class="file_table_list_name">${item.name}</li>
                 <li class="file_table_list_size">${item.size}</li>
                 <li class="file_table_list_status">Uploaded</li>
                 <li class="file_table_list_delete" >
                   <button class="btn_danger" data-id="${index}" >Delete</button>
                 </li>
               </ul>`
            });
        }
        fileTableContainer.innerHTML = markupElement
    };

    // delete file from container
    fileTableContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.target.closest('.btn_danger') !== null) {
            const deleteId = e.target.dataset.id;
            LocalStorageFiles.splice(deleteId, 1);
            localStorage.setItem("uploadedFiles", JSON.stringify(LocalStorageFiles));
            if (LocalStorageFiles.length == "0") {
                files = [];
            }
            loadFileList();
        }
    })

    // if window is reload passlocal storage files to file array
    window.onload = () => {
        //  get from localStorage
        LocalStorageFiles = JSON.parse(localStorage.getItem('uploadedFiles'));
        if (LocalStorageFiles !== null) {
            files = LocalStorageFiles
        }
    }

    const convertBase64 = (file) => {
        let fileType = "";
        let fileName = file.name;
        let fileSize = file.size;
        // create a file reader - inbuild object
        const fileReader = new FileReader();
        // readAsDataURL is allow to read the file and return as data url
        fileReader.readAsDataURL(file);
        // every time upload a image reading the file and push into array
        fileReader.onload = (e) => {
            // size fixture
            const bitsInKb = 1024; //kb
            const bitsInMb = Math.pow(bitsInKb, 2);  //mb

            let convertedSize = '';
            getFileErr.innerText = "";
            getFileErr.classList.remove('active');
            //    convert image size to human readable
            convertBit();
            const fileTypes = [
                {
                    "name": "image/png",
                    "src": "https://i.postimg.cc/ctNp9tLd/File-Format-Png.png"
                },
                {
                    "name": "application/pdf",
                    "src": "https://i.postimg.cc/XGFMkk32/File-Format-Pdf.png"
                },
                {
                    "name": "image/jpeg",
                    "src": "https://i.postimg.cc/WdWPN4X7/File-Format-Jpg.png "
                }
            ]
            // finding correct file format image
            function findFileType() {
                fileTypes.forEach(item => {
                    if (file.type === item.name) {
                        fileType = item.src;
                    }
                })
            }
            // finding file type and adding src for the list
            findFileType();

            function convertBit() {
                if (fileSize <= bitsInKb) {
                    convertedSize = Math.round((fileSize / bitsInKb)) + 'kb';
                } else if (fileSize <= bitsInMb) {
                    convertedSize = Math.round((fileSize / bitsInKb)) + 'kb';
                } else {
                    getFileErr.classList.add('active');
                    getFileErr.innerText = 'Please upload a image/pdf/png within 1 MB';
                }
                return convertedSize;
            }

            if (convertedSize) {
                // create a obj
                let localObject = {
                    name: fileName,
                    src: fileType,
                    type: file.type,
                    size: convertedSize,
                    file: e.target.result,
                    status: "uploaded",
                }
                files.push(localObject);
                // push every time the use upload a file it will push into the array
                localStorage.setItem("uploadedFiles", JSON.stringify(files));
                // load file List table
                loadFileList();
                fileType = ""
            }
        }
    }

    const uploadFile = (e) => {
        const inputFile = e.target;
        convertBase64(inputFile.files[0]);
    }

    getFile.addEventListener('change', (e) => {
        uploadFile(e);
    })

    // load section every refresh
    const loadSection = () => {
        // get from local storage when use is refresh the page and refill the input values
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

        // loadPage();
        if (currentStatus == 1) {
            // userdetails
            userSection.classList.remove('hide');
            personalSection.classList.add('hide');
            getDocumentSection.classList.add('hide');
            getBrandSection.classList.add('hide');
            getStepsSection.classList.add('hide');
            getRateSection.classList.add('hide');
            getApplySection.classList.add('hide');
        } else if (currentStatus == 2) {
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
        } else if (currentStatus == 3) {
            // document upload
            userSection.classList.add('hide');
            personalSection.classList.add('hide');
            getDocumentSection.classList.remove('hide');
            getBrandSection.classList.add('hide');
            getRateSection.classList.add('hide');
            getStepsSection.classList.add('hide');
            getApplySection.classList.add('hide');
        } else if (currentStatus == 4) {
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
        } else if (currentStatus == 5) {
            userSection.classList.add('hide');
            personalSection.classList.add('hide');
            getDocumentSection.classList.add('hide');
            getBrandSection.classList.add('hide');
            getRateSection.classList.remove('hide');
            getStepsSection.classList.add('hide');
            getApplySection.classList.add('hide');
        } else if (currentStatus == 6) {
            userSection.classList.add('hide');
            personalSection.classList.add('hide');
            getDocumentSection.classList.add('hide');
            getBrandSection.classList.add('hide');
            getRateSection.classList.add('hide');
            getStepsSection.classList.remove('hide');
            getApplySection.classList.add('hide');
        }
        else if (currentStatus == 7) {
            volunteer.innerText = "Good Day - " + currentUserDetail.firstname + " " + currentUserDetail.lastname;
            userSection.classList.add('hide');
            personalSection.classList.add('hide');
            getDocumentSection.classList.add('hide');
            getBrandSection.classList.add('hide');
            getRateSection.classList.add('hide');
            getStepsSection.classList.add('hide');
            getApplySection.classList.remove('hide');
        }
        else {
            userSection.classList.remove('hide');
            // personalSection.classList.add('hide');
        }
    }

    // document menus
    getDocumentPhotoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loadFileList();
        getDocumentPhotoWrap.classList.remove('hide');
        getDocumentAddressWrap.style.display = "none";
        getDocumentButtonSet.style.display = "flex";
    })
    getDocumentAddressBtn.addEventListener('click', (e) => {
        e.preventDefault();
        getDocumentPhotoWrap.classList.add('hide');
        getDocumentAddressWrap.style.display = "flex";
        getDocumentAddressWrap.style.alignItems = "center";
        getDocumentAddressWrap.style.justifyContent = "center";
        getDocumentButtonSet.style.display = "none";
    })

    // back load Section refill the datas
    personalBackButton.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem("currentPage", JSON.stringify(1));
        loadSection();
    });

    getDocumentBackBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem("currentPage", JSON.stringify(2));
        loadSection();
    });

    getDocumentSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (files.length) {
            getFileErr.classList.remove('active');
            getFileErr.innerText = '';
            localStorage.setItem("currentPage", JSON.stringify(4));
            loadSection();
        } else {
            getFileErr.classList.add('active');
            getFileErr.innerText = 'File Upload is Mandatory *';
        }
    });

    getRateNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem("currentPage", JSON.stringify(6));
        loadSection();
    });

    getProfileStepBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem("currentPage", JSON.stringify(7));
        loadSection();
    })

    // get all checkbox
    const getAllInputBox = document.querySelectorAll('.checkbox_set input[type="checkbox"]');

    // get all alaram checkbox
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

    // if refresh the page this function will invoke
    //  this function is allow to check the current page and update the section
    loadSection();
    loadFileList();

    // user details validate inputs 
    const validate = () => {
        // validate first name
        if (getFirstName) {
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
        if (getLastName) {
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
    const personalValidate = () => {
        // address validate
        if (getAddress) {
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
        if (getEmail) {
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

            localStorage.setItem("currentPage", JSON.stringify(2));

            // hide current page
            userSection.classList.add('hide');
            // set to second page status
            personalSection.classList.remove('hide');
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
            console.log(personalFormData);
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
            localStorage.setItem("currentPage", JSON.stringify(3));

            // hide current page
            personalSection.classList.add('hide');

            // set to second page status
            getDocumentSection.classList.remove('hide');

        } else {
            verifiedAddress = false;
            verifiedEmail = false;
            verifiedDate = false;
            catergoryVerified = false;
        }
    })

    //datepicker with id
    flatpickr('#datepicker', {
        allowInput: true,
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
    });
});