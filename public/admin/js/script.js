// button status
const buttonStatus = document.querySelectorAll("[button-status]")
if (buttonStatus.length > 0){
    let url = new URL (window.location.href);
    buttonStatus.forEach((button)=>{
        button.addEventListener("click",()=>{
            const status = button.getAttribute("button-status")

            if (status){
                url.searchParams.set("status", status);
            }
            else{
                url.searchParams.delete("status");
            }
            url.searchParams.delete("keyword");
            url.searchParams.delete("page");
            window.location.href = url.href;

        })
    })
}
// end button status


// form search
const formSearch = document.querySelector("#form-search");
if (formSearch){
    let url = new URL (window.location.href);
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (keyword){
            url.searchParams.set("keyword",keyword);
        }
        else{
            url.searchParams.delete("keyword");
        }
        url.searchParams.delete("page");
        window.location.href = url.href;
    })
}
//end form search

//pagination
const buttonPaginations = document.querySelectorAll("[button-pagination]");
if (buttonPaginations){
    let url = new URL (window.location.href);
    buttonPaginations.forEach((button)=>{
        button.addEventListener("click",()=>{
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page",page);
            window.location.href = url.href;
        })
    })
}
//end pagination

//change-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputChecksId = checkboxMulti.querySelectorAll("input[name='id']");
    // xu li cua check all
    inputCheckAll.addEventListener("click",()=>{
        if (inputCheckAll.checked){
            inputChecksId.forEach((input)=>{
                input.checked = true;
            })
        }
        else{
            inputChecksId.forEach((input)=>{
                input.checked = false;
            })
        }
    });

    //xu li cho check id
    inputChecksId.forEach((input)=>{
        input.addEventListener("click",()=>{
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if (countChecked == inputChecksId.length){
                inputCheckAll.checked = true;
            }
            else{
                inputCheckAll.checked = false;
            }
        })
    });
}
//end change-multi


//formChangeMulti
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti){
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault();
        const inputsCheckedId = checkboxMulti.querySelectorAll("input[name='id']:checked");
        const typeChange = e.target.elements.type.value;

        if (typeChange == "delete-all"){
            const isConfirm = confirm ("Ban co chac chan muon xoa khong");
            if (!isConfirm){
                return; // khoong chay nhung doan duoi
            }
        }
        if (inputsCheckedId.length > 0){
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            inputsCheckedId.forEach((input)=>{
                const id = input.value;
                // neu la thay doi vi tri
                if (typeChange=="change-positon"){
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`)
                }
                else{
                    ids.push(id);
                }
            })
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        }
        else{
            alert("Vui long chon vai san pham");
        }
    })
}
// end formChangeMulti



//show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
    },time)
    closeAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden");
    })
}
//end show alert 


//upload img
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener("change",(e)=>{
        const file = e.target.files[0];
        if (file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
}
//end upload img

//sort 
const sort = document.querySelector("[sort]");
if (sort){
    let url = new URL (window.location.href);
    const sortSelect = document.querySelector("[sort-select]");
    const sortClear = document.querySelector("[sort-clear]");
    // su kien cho sortSelect
    sortSelect.addEventListener("change",(e)=>{
        const [sortKey,sortValue] = e.target.value.split("-");
        url.searchParams.set("sortKey",sortKey);
        url.searchParams.set("sortValue",sortValue);
        window.location.href = "facebook.com";
    })

    // su kien cho sortClear
    sortClear.addEventListener("click",(e)=>{
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href;
    })

    //them selected cho cac option
    const sortKeyUrl = url.searchParams.get("sortKey");
    const sortValueUrl = url.searchParams.get("sortValue");
    const stringSort = `${sortKeyUrl}-${sortValueUrl}`;
    const selectedOption = sortSelect.querySelector(`option[value='${stringSort}']`);
    selectedOption.selected = true;

}
// end sort 