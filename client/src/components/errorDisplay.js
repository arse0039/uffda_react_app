
const showError = (field) => {
    if (field==="description-add") {
        document.getElementById('description-error-add').style.visibility="visible"
    }  else if (field==="description-update") {
        document.getElementById('description-error-update').style.visibility="visible"
    } else if (field==="clear") {
        document.getElementById("description-error-update").style.visibility="hidden"
        document.getElementById("description-error-add").style.visibility="hidden"
    }
}

export default showError;