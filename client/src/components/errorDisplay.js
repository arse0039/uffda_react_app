
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

    // validation error messages for participant dropdown
    else if (field==="participant-add") {
        document.getElementById('participant-error-add').style.visibility="visible"
    } else if (field==="participant-update") {
        document.getElementById('participant-error-update').style.visibility="visible"
    } else if (field==="clear-participant-add") {
        document.getElementById('participant-error-add').style.visibility="hidden"
    } else if (field==="clear-participant-update") {
        document.getElementById('participant-error-update').style.visibility="hidden"
    }

    // validation error messages for activity dropdown
    else if (field==="activity-add") {
        document.getElementById('activity-error-add').style.visibility="visible"
    } else if (field==="activity-update") {
        document.getElementById('activity-error-update').style.visibility="visible"
    } else if (field==="clear-activity-add") {
        document.getElementById('activity-error-add').style.visibility="hidden"
    } else if (field==="clear-activity-update") {
        document.getElementById('activity-error-update').style.visibility="hidden"
    }

    // validation error messages for location dropdown
    else if (field==="location-add") {
        document.getElementById("location-error-add").style.visibility="visible"
    } else if (field==="clear-location-add") {
        document.getElementById("location-error-add").style.visibility="hidden"
    }

    // validation error messages for max participants input
    else if (field==="maxPart-add") {
        document.getElementById("maxPart-error-add").style.visibility="visible"
    } else if (field==="maxPart-update") {
        document.getElementById("maxPart-error-update").style.visibility="visible"
    } else if (field==="clear-maxPart-add") {
        document.getElementById("maxPart-error-add").style.visibility="hidden"
    } else if (field==="clear-maxPart-update"){
        document.getElementById('maxPart-error-update').style.visibility="hidden"
    }

    // validation error messages for email input
    else if (field==="email-add") {
        document.getElementById("email-error-add").style.visibility="visible"
    } else if (field==="email-update") {
        document.getElementById("email-error-update").style.visibility="visible"
    } else if (field==="clear-email-add") {
        document.getElementById("email-error-add").style.visibility="hidden"
    } else if (field==="clear-email-update"){
        document.getElementById('email-error-update').style.visibility="hidden"
    }

    // validation error messages for role dropdown
    else if (field==="role-add") {
        document.getElementById("role-error-add").style.visibility="visible"
    } else if (field==="clear-role-add") {
        document.getElementById("role-error-add").style.visibility="hidden"
    }
}

export default showError;