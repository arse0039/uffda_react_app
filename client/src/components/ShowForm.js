

const showform = (formtype) => {
    if (formtype == "edit") {
        document.getElementById("insert-form").style.visibility="hidden"
        document.getElementById("update-form").style.visibility="visible"
        document.getElementById("delete-form").style.visibility="hidden"
        document.getElementById("table-div").style.filter="blur(3px)"
        document.getElementById("header").style.filter="blur(3px)"    
        document.getElementById("search-div").style.filter="blur(3px)"
        document.getElementById("page-header").style.filter="blur(3px)"
        document.getElementById("btn").style.filter="blur(3px)"
    }else if (formtype == "delete") {
        document.getElementById("insert-form").style.visibility="hidden"
        document.getElementById("update-form").style.visibility="hidden"
        document.getElementById("delete-form").style.visibility="visible"
        document.getElementById("table-div").style.filter="blur(3px)"
        document.getElementById("header").style.filter="blur(3px)"
        document.getElementById("search-div").style.filter="blur(3px)"
        document.getElementById("page-header").style.filter="blur(3px)"
        document.getElementById("btn").style.filter="blur(3px)"               
    } else if (formtype == "insert") {
        document.getElementById("insert-form").style.visibility="visible"
        document.getElementById("update-form").style.visibility="hidden"
        document.getElementById("delete-form").style.visibility="hidden"
        document.getElementById("table-div").style.filter="blur(3px)"
        document.getElementById("header").style.filter="blur(3px)" 
        document.getElementById("search-div").style.filter="blur(3px)"
        document.getElementById("page-header").style.filter="blur(3px)"
        document.getElementById("btn").style.filter="blur(3px)"
    } else {
        document.getElementById("insert-form").style.visibility="hidden"
        document.getElementById("update-form").style.visibility="hidden"
        document.getElementById("delete-form").style.visibility="hidden"
        document.getElementById("table-div").style.filter="blur(0px)"
        document.getElementById("header").style.filter="blur(0px)" 
        document.getElementById("search-div").style.filter="blur(0px)"
        document.getElementById("page-header").style.filter="blur(0px)"
        document.getElementById("btn").style.filter="blur(0px)"
    }
}

export default showform;