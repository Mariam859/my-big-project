let profileForm = document.querySelector('#profileForm')
let discardBtn = document.querySelector('#discardBtn')

let handleError = (element , msg)=>{
    element.nextElementSibling.innerText = msg
}

let nameValidation = (element)=>{
    let inputValue = element.value.trim()

    if(inputValue.length === 0) handleError(element , "please enter this field")
    else if(inputValue.length < 3) handleError(element , "please enter at least 3 character")
    else handleError(element , "")
}

let emailValidation = (element)=>{
    // https://mailtrap.io/blog/javascript-email-validation/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let inputValue = element.value.trim()

    if(inputValue.length === 0) handleError(element , "please enter your email")
    else if(!emailRegex.test(inputValue)) handleError(element , "invalid Email")
    else handleError(element , "")
}

let phoneValidation = (element)=>{
    // بيقبل أرقام و + و مسافات و اقواس بس
    const phoneRegex = /^[\d\s()+-]{8,}$/
    let inputValue = element.value.trim()

    if(inputValue.length === 0) handleError(element , "please enter your phone number")
    else if(!phoneRegex.test(inputValue)) handleError(element , "invalid phone number")
    else handleError(element , "")
}

let zipValidation = (element)=>{
    let inputValue = element.value.trim()

    if(inputValue.length === 0) handleError(element , "please enter your zip code")
    else if(inputValue.length < 4) handleError(element , "please enter a valid zip code")
    else handleError(element , "")
}

let requiredValidation = (element)=>{
    let inputValue = element.value.trim()

    if(inputValue.length === 0) handleError(element , "please enter this field")
    else handleError(element , "")
}

// بترجع true لو فيه خطأ ظاهر في الفورم، وfalse لو كله تمام
let checkFormHasErrors = ()=>{
    let errorsElements = profileForm.querySelectorAll('.error , .invalid-feedback')
    let hasError = false

    for(let i = 0 ; i < errorsElements.length ; i++){
        if(errorsElements[i].innerText.trim() !== "") hasError = true
    }

    return hasError
}

profileForm.addEventListener("input" , (e)=>{
    if(e.target.id == 'firstName') nameValidation(e.target)
    else if(e.target.id == 'lastName') nameValidation(e.target)
    else if(e.target.id == "userEmail") emailValidation(e.target)
    else if(e.target.id == "phoneNumber") phoneValidation(e.target)
    else if(e.target.id == "zipCode") zipValidation(e.target)
    else if(e.target.id == "address") requiredValidation(e.target)
})

profileForm.addEventListener("submit" , (e)=>{
    e.preventDefault()

    let firstName = document.querySelector('#firstName')
    let lastName = document.querySelector('#lastName')
    let userEmail = document.querySelector('#userEmail')
    let phoneNumber = document.querySelector('#phoneNumber')
    let address = document.querySelector('#address')
    let zipCode = document.querySelector('#zipCode')

    // بنشغل كل الفاليديشن يدوي وقت الضغط ع submit عشان لو المستخدم مسحش حاجة أصلا
    nameValidation(firstName)
    nameValidation(lastName)
    emailValidation(userEmail)
    phoneValidation(phoneNumber)
    requiredValidation(address)
    zipValidation(zipCode)

    if(checkFormHasErrors()){
        console.log("فيه أخطاء في الفورم")
        return
    }

    console.log("البيانات اتحفظت بنجاح")
    // هنا تحط اللي عايز تعمله بعد نجاح الفاليديشن (زي إرسال البيانات لسيرفر)
})

discardBtn.addEventListener("click" , ()=>{
    profileForm.reset()

    let allInputs = profileForm.querySelectorAll('input')
    for(let i = 0 ; i < allInputs.length ; i++){
        handleError(allInputs[i] , "")
    }
})

function toggleHeart(btn) {
  let icon = btn.querySelector("i")
  icon.classList.toggle("fa-solid")
  icon.classList.toggle("text-danger")
}