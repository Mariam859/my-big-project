

// ================= PAYMENT METHOD SELECTION =================

let paymentMethods = document.querySelectorAll(".payment-method");

paymentMethods.forEach(function(button) {

    button.addEventListener("click", function() {

        paymentMethods.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");


        // Save selected payment method

        let paymentImage =
            button.querySelector("img");

        if (paymentImage) {

            localStorage.setItem(
                "paymentMethod",
                paymentImage.alt
            );

        }

    });

});


// ================= CONFIRM PAYMENT =================

let confirmBtn = document.getElementById("confirmBtn");
if (confirmBtn) {

    confirmBtn.addEventListener("click", function() {

        window.location.href = "confirmation.html";

    });

}

// ================= LANGUAGE & CURRENCY =================

let languagesTab = document.getElementById("languagesTab");
let currencyTab = document.getElementById("currencyTab");

let languagesContent = document.getElementById("languagesContent");
let currencyContent = document.getElementById("currencyContent");


if (
    languagesTab &&
    currencyTab &&
    languagesContent &&
    currencyContent
) {

    languagesTab.addEventListener("click", function() {

        languagesContent.classList.remove("d-none");
        currencyContent.classList.add("d-none");

        languagesTab.classList.add(
            "fw-bold",
            "border-bottom",
            "border-3",
            "border-primary"
        );

        currencyTab.classList.remove(
            "fw-bold",
            "border-bottom",
            "border-3",
            "border-primary"
        );

    });


    currencyTab.addEventListener("click", function() {

        languagesContent.classList.add("d-none");
        currencyContent.classList.remove("d-none");

        currencyTab.classList.add(
            "fw-bold",
            "border-bottom",
            "border-3",
            "border-primary"
        );

        languagesTab.classList.remove(
            "fw-bold",
            "border-bottom",
            "border-3",
            "border-primary"
        );

    });

}


// ================= BOOKING DATES =================

let savedCheckIn =
    localStorage.getItem("checkInDate");

let savedCheckOut =
    localStorage.getItem("checkOutDate");


let checkInDate =
    document.getElementById("checkInDate");

let checkOutDate =
    document.getElementById("checkOutDate");


if (savedCheckIn && checkInDate) {

    let date = new Date(savedCheckIn);

    checkInDate.innerHTML =
        date.toLocaleDateString("en-US");

}


if (savedCheckOut && checkOutDate) {

    let date = new Date(savedCheckOut);

    checkOutDate.innerHTML =
        date.toLocaleDateString("en-US");

}


// ================= BOOKING PRICE =================

let bookingNights =
    localStorage.getItem("bookingNights");

let bookingRoomPrice =
    localStorage.getItem("bookingRoomPrice");

let bookingTotalPrice =
    localStorage.getItem("bookingTotalPrice");


let paymentPriceCalculation =
    document.getElementById("paymentPriceCalculation");

let paymentRoomTotal =
    document.getElementById("paymentRoomTotal");

let paymentTotalPrice =
    document.getElementById("paymentTotalPrice");


if (
    bookingNights &&
    bookingRoomPrice &&
    bookingTotalPrice
) {

    paymentPriceCalculation.innerHTML =
        "$300 x " + bookingNights + " nights";

    paymentRoomTotal.innerHTML =
        "$" + Number(bookingRoomPrice).toLocaleString();

    paymentTotalPrice.innerHTML =
        "$" + Number(bookingTotalPrice).toFixed(2);

}