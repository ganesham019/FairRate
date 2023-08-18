import { loadSection } from "./loadSection";

let files = [];
let markupElement = "";
let LocalStorageFiles;

// file sections
const getFileErr = document.getElementById('fileErr');
const fileTableContainer = document.getElementById('file_table');
const getDocumentSubmitBtn = document.getElementById('document_submit');

const fairMonthRange = document.getElementById('fair_range_month');
const fairPointRange = document.getElementById('fair_calc_points');

// load local file to display
export const loadFileList = () => {
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
export const uploadFile = (e) => {
    const inputFile = e.target;
    convertBase64(inputFile.files[0]);
}
// if window is reload pass local storage files to file array
window.onload = () => {
    //  get from localStorage
    LocalStorageFiles = JSON.parse(localStorage.getItem('uploadedFiles'));
    if (LocalStorageFiles !== null) {
        files = LocalStorageFiles
    }
    fairMonthRange.innerText = 2000;
    fairPointRange.innerText = 2200;
}

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
});

getDocumentSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (files.length) {
        getFileErr.classList.remove('active');
        getFileErr.innerText = '';
        localStorage.setItem("currentPage", 4);
        loadSection();
    } else {
        getFileErr.classList.add('active');
        getFileErr.innerText = 'File Upload is Mandatory *';
    }
});