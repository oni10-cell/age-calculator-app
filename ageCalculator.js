
// day
const dayLabel = document.getElementById("day-label")
const dayInput = document.getElementById("day-input")
const dayErrorMessage = document.getElementById("day-error-message")

// month
const monthLabel = document.getElementById("month-label")
const monthInput = document.getElementById("month-input")
const monthErrorMessage = document.getElementById("month-error-message")

// year
const yearLabel = document.getElementById("year-label")
const yearInput = document.getElementById("year-input")
const yearErrorMessage = document.getElementById("year-error-message")

// button
const subButton = document.getElementById("icon-arrow")

// age
const yearAge = document.getElementById("age-number-years");
const monthAge = document.getElementById("age-number-months");
const dayAge = document.getElementById("age-number-days");


// updateErrorStyle() This function is used for changing the style of the input-field when there is an error in the user entry
function updateErrorStyle(input, label, status){
    if(status == "invalid"){
        input.style.borderColor = "hsl(0, 100%, 67%)";
        label.style.color = "hsl(0, 100%, 67%)";
        return
    }
    if(status == "valid"){
    input.style.borderColor = "hsl(0, 0%, 86%)";
    label.style.color = "hsl(0, 1%, 44%)";
    return
    }
}

// validateInputFields(): This function ensures that the user fills every input field and it does not exceed the maximum number
function validateInputFields(inputField, label, errorMessage, maxNum, ifExceedMaxNum){
    if(inputField.value == ""){
        updateErrorStyle(inputField, label, "invalid");
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "This field is required";
        return false
    }
    if(inputField.value > maxNum){
        updateErrorStyle(inputField, label, "invalid");
        errorMessage.style.display = "block";
        errorMessage.innerHTML = ifExceedMaxNum;
        return false
    }
    updateErrorStyle(inputField, label, "valid");
    errorMessage.style.display = "none";
    userInputHoverCorrect();
    return true
}

// setNoOfDays(): This function sets the maximum number of days in a month
let maxDay = 31;
function setNoOfDays(){
    if (monthInput.value == 2){
        maxDay = 28;
        return;
    }
    if(monthInput.value == 4 || monthInput.value == 6 || monthInput.value == 9 || monthInput.value == 11){
        maxDay = 30;
        return;
    }
    maxDay = 31;
    return;
}

// validateDate(): This function checks if the day is a valid day for that month
function validateDate(){
    if(dayInput.value > maxDay){
        updateErrorStyle(dayInput, dayLabel, "invalid");
        dayErrorMessage.style.display = "block";
        dayErrorMessage.innerHTML = "Must be a valid date";
        return
    }
    updateErrorStyle(dayInput, dayLabel, "valid");
    dayErrorMessage.style.display = "none";
}


// events
dayInput.addEventListener("keyup", e=>{
    e.preventDefault;
    validateInputFields(dayInput, dayLabel, dayErrorMessage, maxDay, "Must be a valid day");
})
monthInput.addEventListener("keyup", e=>{
    e.preventDefault;
    setNoOfDays();
    validateInputFields(monthInput, monthLabel, monthErrorMessage, 12, "Must be a valid month");
    validateDate();
})
yearInput.addEventListener("keyup", e=>{
    e.preventDefault;
    validateInputFields(yearInput, yearLabel, yearErrorMessage, currentYear, "Must be in the past");
})

subButton.addEventListener("click", e =>{
    e.preventDefault;
    validateInputFields(dayInput, dayLabel, dayErrorMessage, maxDay, "Must be a valid date");
    validateInputFields(monthInput, monthLabel, monthErrorMessage, 12, "Must be a valid month");
    validateInputFields(yearInput, yearLabel, yearErrorMessage, currentYear, "Must be in the past");

    executeSolution();
})


// CALCULATIONS

// dates
const date = new Date()
const currentYear = date.getFullYear()
const currentMonth = date.getMonth() + 1
const currentDay = date.getDate()

// This function checks if all the fields are validated before calculation the age
function executeSolution(){
    if (
        validateInputFields(dayInput, dayLabel, dayErrorMessage, maxDay, "Must be a valid date") == false ||
        validateInputFields(monthInput, monthLabel, monthErrorMessage, 12, "Must be a valid month") == false ||
        validateInputFields(yearInput, yearLabel, yearErrorMessage, currentYear, "Must be in the past") == false
    ){
        userInputHoverError();
        return
    }
    calculateAge();
    return
}

// This function calculates the age of the user is years, months and days
function calculateAge(){
    const userYear = Number(yearInput.value);
    const userMonth = Number(monthInput.value);
    const userDay = Number(dayInput.value);

    let ageInYears = currentYear - userYear;
    let ageInMonths = currentMonth - userMonth;
    let ageInDays = currentDay - userDay;

    if(ageInDays < 0){
        ageInMonths -= 1;
        if(currentMonth == 2){
            ageInDays += 28;
        }else if(currentMonth == 4 ||currentMonth == 6 || currentMonth == 9 ||currentMonth == 11){
            ageInDays += 30;
        }else{
            ageInDays += 31;
        }
    }
    if(ageInMonths < 0){
        ageInYears -= 1;
        ageInMonths += 12;
    }
    
    yearAge.innerHTML = ageInYears;
    monthAge.innerHTML = ageInMonths;
    dayAge.innerHTML = ageInDays;
}

// .user-input hover
const dotUserInput = [dayInput, monthInput, yearInput]

 function userInputHoverError(){
    dotUserInput.forEach(data=>{
        data.onmouseenter= e =>{
            data.style.borderColor = "hsl(259, 100%, 65%)";
        }
        data.onmouseleave= e =>{
            data.style.borderColor = "hsl(0, 100%, 67%)";
        }
    })
 }
 function userInputHoverCorrect(){
    dotUserInput.forEach(data=>{
        data.onmouseenter= e =>{
            data.style.borderColor = "hsl(259, 100%, 65%)";
        }
        data.onmouseleave= e =>{
            data.style.borderColor = "hsl(0, 0%, 86%)";
        }
    })
 }