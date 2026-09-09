document.addEventListener("DOMContentLoaded", function () {


    /* ================= LANGUAGE & CURRENCY ================= */

    window.showLanguages = function () {

        document.getElementById("languagesContent").style.display = "block";
        document.getElementById("currencyContent").style.display = "none";

    };


    window.showCurrency = function () {

        document.getElementById("languagesContent").style.display = "none";
        document.getElementById("currencyContent").style.display = "block";

    };


    /* ================= EDIT DATES ================= */

    let editDate = document.getElementById("editDate");

    let dateText = document.getElementById("dateText");

    let dateEditor = document.getElementById("dateEditor");

    let checkInInput = document.getElementById("checkInInput");

    let checkOutInput = document.getElementById("checkOutInput");

    let checkInText = document.getElementById("checkInText");

    let checkOutText = document.getElementById("checkOutText");


    if (
        editDate &&
        dateText &&
        dateEditor &&
        checkInInput &&
        checkOutInput
    ) {

        editDate.addEventListener("click", function (e) {

            e.preventDefault();

            dateText.classList.add("d-none");

            dateEditor.classList.remove("d-none");

        });


        checkInInput.addEventListener("change", updateDates);

        checkOutInput.addEventListener("change", updateDates);


        function updateDates() {

            if (
                checkInInput.value !== "" &&
                checkOutInput.value !== ""
            ) {

                let checkIn = new Date(checkInInput.value);

                let checkOut = new Date(checkOutInput.value);


                if (checkOut <= checkIn) {

                    alert("Check-out date must be after check-in date.");

                    return;

                }


                let options = {
                    month: "short",
                    day: "numeric"
                };


                let checkInFormatted =
                    checkIn.toLocaleDateString("en-US", options);

                let checkOutFormatted =
                    checkOut.toLocaleDateString("en-US", options);


                /* Display dates */

                dateText.innerHTML =
                    checkInFormatted + " - " + checkOutFormatted;


                if (checkInText) {

                    checkInText.innerHTML =
                        checkIn.toLocaleDateString("en-US");

                }


                if (checkOutText) {

                    checkOutText.innerHTML =
                        checkOut.toLocaleDateString("en-US");

                }


                /* Save dates */

                localStorage.setItem(
                    "checkInDate",
                    checkInInput.value
                );


                localStorage.setItem(
                    "checkOutDate",
                    checkOutInput.value
                );


                /* Hide editor */

                dateText.classList.remove("d-none");

                dateEditor.classList.add("d-none");


                /* Update price */

                updatePrice();

            }

        }


        /* ================= PRICE CALCULATION ================= */

        function updatePrice() {

            if (
                checkInInput.value !== "" &&
                checkOutInput.value !== ""
            ) {

                let checkIn =
                    new Date(checkInInput.value);

                let checkOut =
                    new Date(checkOutInput.value);


                let difference =
                    checkOut - checkIn;


                let nights =
                    Math.ceil(
                        difference /
                        (1000 * 60 * 60 * 24)
                    );


                let pricePerNight = 300;

                let taxes = 24.70;

                let roomPrice =
                 pricePerNight * nights;

               let total =
                 roomPrice + taxes;

               localStorage.setItem("bookingNights", nights);
               localStorage.setItem("bookingRoomPrice", roomPrice);
               localStorage.setItem("bookingTotalPrice", total);

                let priceCalculation =
                    document.getElementById("priceCalculation");

                let roomTotal =
                    document.getElementById("roomTotal");

                let totalPrice =
                    document.getElementById("totalPrice");


                if (priceCalculation) {

                    priceCalculation.innerHTML =
                        "$" +
                        pricePerNight +
                        " x " +
                        nights +
                        " nights";

                }


                if (roomTotal) {

                    roomTotal.innerHTML =
                        "$" + roomPrice;

                }


                if (totalPrice) {

                    totalPrice.innerHTML =
                        "$" + total.toFixed(2);

                }

            }

        }

    }


    /* ================= INSURANCE ================= */

    let insuranceBtn =
        document.getElementById("insuranceBtn");


    if (insuranceBtn) {

        insuranceBtn.addEventListener("click", function () {

            insuranceBtn.innerHTML = "Added";

            insuranceBtn.classList.remove(
                "btn-outline-secondary"
            );

            insuranceBtn.classList.add(
                "btn-success"
            );

        });

    }


    /* ================= REQUIRED ================= */

    let requiredBtn =
        document.getElementById("requiredBtn");


    if (requiredBtn) {

        requiredBtn.addEventListener("click", function () {

            requiredBtn.innerHTML = "Added";

            requiredBtn.classList.remove(
                "btn-outline-secondary"
            );

            requiredBtn.classList.add(
                "btn-success"
            );

        });

    }


    /* ================= ADD NEW GUEST ================= */

    let addGuest =
        document.getElementById("addGuest");

    let guest2Section =
        document.getElementById("guest2Section");

    let deleteGuest2 =
        document.getElementById("deleteGuest2");


    if (addGuest && guest2Section) {

        addGuest.addEventListener("click", function () {

            guest2Section.classList.remove("d-none");

            addGuest.style.display = "none";

        });

    }


    /* ================= DELETE GUEST 2 ================= */

    if (
        deleteGuest2 &&
        guest2Section &&
        addGuest
    ) {

        deleteGuest2.addEventListener("click", function () {

            guest2Section.classList.add("d-none");

            addGuest.style.display = "inline";

        });

    }


    /* ================= EDIT GUESTS ================= */

    let editGuests =
        document.getElementById("editGuests");

    let guestEditor =
        document.getElementById("guestEditor");

    let guestNumber =
        document.getElementById("guestNumber");

    let guestCount =
        document.getElementById("guestCount");


    if (
        editGuests &&
        guestEditor
    ) {

        editGuests.addEventListener("click", function (e) {

            e.preventDefault();

            guestEditor.classList.toggle("d-none");

        });

    }


    if (
        guestNumber &&
        guestEditor &&
        guest2Section
    ) {

        guestNumber.addEventListener("change", function () {

            if (guestNumber.value === "1") {

                if (guestCount) {
                    guestCount.innerHTML = "1 guest";
                }

                guest2Section.classList.add("d-none");

            }

            else {

                if (guestCount) {
                    guestCount.innerHTML = "2 guests";
                }

                guest2Section.classList.remove("d-none");

            }
            localStorage.setItem(
    "guestCount",
    guestNumber.value
);


            guestEditor.classList.add("d-none");

        });

    }
// ================= SAVE GUEST DATA =================

let guestEmail =
    document.querySelector('input[placeholder="email@gmail.com"]');


if (guestEmail) {

    guestEmail.addEventListener("change", function () {

        localStorage.setItem(
            "guestEmail",
            guestEmail.value
        );

    });

}

});
