
const showError = (field) => {
    // validation error messages for name input fields
    if (field==="name-add") {
        document.getElementById("name-error-add").style.visibility="visible"
    } else if (field==="name-update") {
        document.getElementById('name-error-update').style.visibility="visible"
    } else if (field==="clear-name-add") {
        document.getElementById("name-error-add").style.visibility="hidden"
    } else if (field==="clear-name-update"){
        document.getElementById('name-error-update').style.visibility="hidden"
    }
    
    // validation error messages for address input fields
    else if (field==="address-add") {
        document.getElementById("address-error-add").style.visibility="visible"
    } else if (field==="address-update") {
        document.getElementById("address-error-update").style.visibility="visible"
    } else if (field==="clear-address-add") {
        document.getElementById("address-error-add").style.visibility="hidden"
    } else if (field==="clear-address-update"){
        document.getElementById('address-error-update').style.visibility="hidden"
    }
    
    // validation error message for age group dropdown
    else if (field==="age-add") {
        document.getElementById("age-error-add").style.visibility="visible"
    } else if (field==="clear-age-add") {
        document.getElementById("age-error-add").style.visibility="hidden"
    }

    // validation error messages for description input fields
    else if (field==="description-add") {
        document.getElementById('description-error-add').style.visibility="visible"
    } else if (field==="description-update") {
        document.getElementById('description-error-update').style.visibility="visible"
    } else if (field==="clear-description-add") {
        document.getElementById("description-error-add").style.visibility="hidden"
    } else if (field==="clear-description-update"){
        document.getElementById('description-error-update').style.visibility="hidden"
    }
    
    // else if (field==="clear") {
    //     document.getElementById("name-error-add").style.visibility="hidden"
    //     document.getElementById("name-error-update").style.visibility="hidden"
    //     document.getElementById("address-error-add").style.visibility="hidden"
    //     document.getElementById("address-error-update").style.visibility="hidden"
    //     document.getElementById("age-error-add").style.visibility="hidden"
    //     document.getElementById("description-error-update").style.visibility="hidden"
    //     document.getElementById("description-error-add").style.visibility="hidden"
    // }
}

export default showError;