
const showError = (field) => {
    if (field==="name") {
        document.getElementById("name-error").style.visibility="visible"
    } else if (field==="address") {
        document.getElementById("address-error").style.visibility="visible"
    } else if (field==="description-add") {
        document.getElementById('description-error-add').style.visibility="visible"
    }  else if (field==="description-update") {
        document.getElementById('description-error-update').style.visibility="visible"
    } else if (field==="clear") {
        // document.getElementById("name-error-add").style.visibility="hidden"
        // document.getElementById("name-error-update").style.visibility="hidden"
        // document.getElementById("address-error-add").style.visibility="hidden"
        // document.getElementById("address-error-update").style.visibility="hidden"
        document.getElementById("description-error-update").style.visibility="hidden"
        document.getElementById("description-error-add").style.visibility="hidden"
    }
}

export default showError;