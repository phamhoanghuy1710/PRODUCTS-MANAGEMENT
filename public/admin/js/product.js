// change status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonsChangeStatus.forEach((button)=>{
        button.addEventListener("click",()=>{
            const statusCurrent = button.getAttribute("data-status");
            const statusId = button.getAttribute("data-id")
            let statusChange = statusCurrent == "active" ? "inactive" : "active";
            const action = path + `/${statusChange}/${statusId}?_method=PATCH`;
            formChangeStatus.action = action;

            formChangeStatus.submit();
        })
    })
}
// end change status


//deleteButton
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length > 0){
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    buttonsDelete.forEach((button)=>{
        button.addEventListener("click",()=>{
            const isConfirm = confirm("Ban co chac chan muon xoa san pham nay");
            if(isConfirm){
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        })
    })
}
//end deleteButton