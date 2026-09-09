// ================= BOOKING DATES =================

let savedCheckIn =
    localStorage.getItem("checkInDate");

let savedCheckOut =
    localStorage.getItem("checkOutDate");

let confirmationDates =
    document.getElementById("confirmationDates");


if (savedCheckIn && savedCheckOut && confirmationDates) {

    let checkIn =
        new Date(savedCheckIn);

    let checkOut =
        new Date(savedCheckOut);

    let options = {
        month: "short",
        day: "numeric",
        year: "numeric"
    };

    let checkInFormatted =
        checkIn.toLocaleDateString("en-US", options);

    let checkOutFormatted =
        checkOut.toLocaleDateString("en-US", options);

    confirmationDates.innerHTML =
        checkInFormatted + " - " + checkOutFormatted;

}



// ================= GUESTS =================

let savedGuests =
    localStorage.getItem("guestCount");

let confirmationGuests =
    document.getElementById("confirmationGuests");


if (savedGuests && confirmationGuests) {

    confirmationGuests.innerHTML =
        savedGuests == "1"
            ? "1 guest"
            : savedGuests + " guests";

}



// ================= TOTAL PRICE =================

let bookingTotalPrice =
    localStorage.getItem("bookingTotalPrice");

let confirmationTotal =
    document.getElementById("confirmationTotal");


if (bookingTotalPrice && confirmationTotal) {

    confirmationTotal.innerHTML =
        "$" + Number(bookingTotalPrice).toFixed(2);

}



// ================= EMAIL =================

let savedEmail =
    localStorage.getItem("guestEmail");

let guestEmail =
    document.getElementById("guestEmail");


if (savedEmail && guestEmail) {

    guestEmail.innerHTML =
        savedEmail;

}



// ================= PAYMENT METHOD =================

let savedPaymentMethod =
    localStorage.getItem("paymentMethod");

let paymentMethod =
    document.getElementById("paymentMethod");


if (savedPaymentMethod && paymentMethod) {

    paymentMethod.innerHTML =
        savedPaymentMethod;

}



// ================= SHARE =================

let shareBtn =
    document.getElementById("shareBtn");


if (shareBtn) {

    shareBtn.addEventListener("click", function () {

        shareBtn.innerHTML = "Shared";

        shareBtn.classList.remove("btn-primary");

        shareBtn.classList.add("btn-success");

    });

}



// ================= INVOICE =================

let invoiceBtn =
    document.getElementById("invoiceBtn");


if (invoiceBtn) {

    invoiceBtn.addEventListener("click", function () {

        alert("Invoice opened");

    });

}