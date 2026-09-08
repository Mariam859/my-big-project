let searchForm = document.querySelector("#searchForm")
let searchInput = document.querySelector("#searchInput")

let searchValidation = (element) => {
  let inputValue = element.value.trim()

  if (inputValue.length < 5) 
    handleError(element, "please enter at least 5 character")
  
   else 
    handleError(element, "")
  
}

let handleError = (element, msg) => {
  element.nextElementSibling.innerText = msg
}

searchForm.addEventListener("input", (e) => {
  if (e.target.id == "searchInput") searchValidation(e.target)
}
)

  
