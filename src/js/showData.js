import brandsData from './branddata';
import { loadSection } from './loadSection';

// brand variable
let firstIndex = 0;
let lastIndex = 10;

// dummy Array;
let pageData = brandsData;
let slicedData = [];
let filterSlicedData = [];
// markup for brand list
let brandMarkup = "";

const getBrandListBox = document.getElementById('brand_list_container');
const getNextBtn = document.getElementById('next');
const getPrevBtn = document.getElementById('prev');

getPrevBtn.classList.add('disable');

 // brand filter 
 const filterResBtn = document.getElementById('filter_btn');
 const getFilterMenuBtn = document.getElementById('select_filter_btn');
 const filterOptions = document.querySelectorAll('.filter_option');
 let getFilterText = document.getElementById('filter_text');

 // if outside click , dropdown will deactive
 document.addEventListener('click', (e) => {
     e.stopPropagation();
     if (e.target.classList.contains('filter_menu_btn') || e.target.classList.contains('select_option')) {
         getFilterMenuBtn.classList.toggle('active');
     } else if (e.target.classList.contains('filter_options')) {
         getFilterMenuBtn.setAttribute('class', "filter_menu_btn active");
     } else {
         getFilterMenuBtn.setAttribute('class', "filter_menu_btn");
     }
 });

 // get the selecting option in dropwdown
 filterOptions.forEach((option) => {
     option.addEventListener('click', () => {
         let selectedOption = option.innerText;
         filterResBtn.classList.remove('disabled');
         getFilterText.innerText = selectedOption;
         getFilterMenuBtn.classList.remove('active');
     })
 });

export const displayData = (data) => {
    filterSlicedData = data.slice(firstIndex, lastIndex);
    data.forEach((item, index) => {
        brandMarkup += `<ul class="brands_container_list_item" data-year="${item.year}">
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
// showing brand data function
export const showData = () => {
    slicedData = pageData.slice(firstIndex, lastIndex);
    slicedData.forEach((item, index) => {
        brandMarkup += `<ul class="brands_container_list_item" data-year="${item.year}">
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

// button diable/enable function
export const updateButtonState = () => {
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

// filter result
filterResBtn.addEventListener('click', () => {
    slicedData = [];
    brandMarkup = "";
    let filterData = pageData.filter((item) => item.year == getFilterText.innerText);
    displayData(filterData);
})

// brands next button 
getBrandListBox.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.target.closest('.btn_gray') !== null) {
        localStorage.setItem("currentPage", 5);
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
    slicedData = [];
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
    slicedData = [];
    brandMarkup = '';
    updateButtonState();
    showData();
})

