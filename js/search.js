document.addEventListener("DOMContentLoaded", function () {


    // ================= DATES =================

    let applyDates = document.getElementById("applyDates");
    let checkIn = document.getElementById("searchCheckIn");
    let checkOut = document.getElementById("searchCheckOut");
    let searchDateText = document.getElementById("searchDateText");


    if (applyDates && checkIn && checkOut && searchDateText) {

        applyDates.addEventListener("click", function () {


            if (checkIn.value === "" || checkOut.value === "") {

                alert("Please select check-in and check-out dates.");
                return;

            }


            let checkInDate = new Date(checkIn.value);
            let checkOutDate = new Date(checkOut.value);


            if (checkOutDate <= checkInDate) {

                alert("Check-out date must be after check-in date.");
                return;

            }


            let options = {
                day: "numeric",
                month: "short"
            };


            searchDateText.innerHTML =
                checkInDate.toLocaleDateString("en-US", options)
                +
                " - "
                +
                checkOutDate.toLocaleDateString("en-US", options);



            localStorage.setItem("checkInDate", checkIn.value);
            localStorage.setItem("checkOutDate", checkOut.value);



            let dateModal = document.getElementById("dateModal");


            let modal = bootstrap.Modal.getInstance(dateModal);


            if(modal){

                modal.hide();

            }


        });

    }





    // ================= GUESTS =================


    let adultCount = 2;
    let childCount = 0;
    let roomCount = 1;



    let adultPlus = document.getElementById("adultPlus");
    let adultMinus = document.getElementById("adultMinus");

    let childPlus = document.getElementById("childPlus");
    let childMinus = document.getElementById("childMinus");

    let roomPlus = document.getElementById("roomPlus");
    let roomMinus = document.getElementById("roomMinus");



    let adultCountText = document.getElementById("adultCount");
    let childCountText = document.getElementById("childCount");
    let roomCountText = document.getElementById("roomCount");




    if(adultPlus){

        adultPlus.onclick = function(){

            adultCount++;
            adultCountText.innerHTML = adultCount;

        }

    }



    if(adultMinus){

        adultMinus.onclick = function(){

            if(adultCount > 1){

                adultCount--;
                adultCountText.innerHTML = adultCount;

            }

        }

    }





    if(childPlus){

        childPlus.onclick = function(){

            childCount++;
            childCountText.innerHTML = childCount;

        }

    }



    if(childMinus){

        childMinus.onclick = function(){

            if(childCount > 0){

                childCount--;
                childCountText.innerHTML = childCount;

            }

        }

    }





    if(roomPlus){

        roomPlus.onclick = function(){

            roomCount++;
            roomCountText.innerHTML = roomCount;

        }

    }



    if(roomMinus){

        roomMinus.onclick = function(){

            if(roomCount > 1){

                roomCount--;
                roomCountText.innerHTML = roomCount;

            }

        }

    }






    // ================= APPLY GUESTS =================


    let applyGuests = document.getElementById("applyGuests");
    let searchGuestText = document.getElementById("searchGuestText");


    if(applyGuests && searchGuestText){


        applyGuests.onclick = function(){


            let totalGuests = adultCount + childCount;


            searchGuestText.innerHTML =
                totalGuests +
                (totalGuests == 1 ? " Guest" : " Guests");



            localStorage.setItem("adultCount", adultCount);
            localStorage.setItem("childCount", childCount);
            localStorage.setItem("roomCount", roomCount);
            localStorage.setItem("guestCount", totalGuests);



            let guestModal =
                document.getElementById("guestModal");


            let modal =
                bootstrap.Modal.getInstance(guestModal);



            if(modal){

                modal.hide();

            }


        }


    }







    // ================= LIST / GRID VIEW =================


    let listBtn = document.getElementById("listBtn");
    let gridBtn = document.getElementById("gridBtn");
    let hotelsContainer = document.querySelector(".hotels-container");



    if(listBtn && gridBtn && hotelsContainer){



        gridBtn.onclick = function(){


            hotelsContainer.classList.add("grid-mode");


            gridBtn.classList.add("view-active");
            listBtn.classList.remove("view-active");


        }



        listBtn.onclick = function(){


            hotelsContainer.classList.remove("grid-mode");


            listBtn.classList.add("view-active");
            gridBtn.classList.remove("view-active");


        }


    }







    // ================= FAVORITE HEART =================


    let hearts = document.querySelectorAll(".fa-heart");



    hearts.forEach(function(heart){


        heart.onclick = function(){


            heart.classList.toggle("fa-regular");

            heart.classList.toggle("fa-solid");

            heart.classList.toggle("text-danger");


        }


    });







    // ================= BEDROOMS =================


    let bedroom = 1;


    let bedroomPlus = document.getElementById("bedroomPlus");
    let bedroomMinus = document.getElementById("bedroomMinus");
    let bedroomCount = document.getElementById("bedroomCount");



    if(bedroomPlus && bedroomMinus && bedroomCount){


        bedroomPlus.onclick = function(){

            bedroom++;

            bedroomCount.innerHTML = bedroom;

        }



        bedroomMinus.onclick = function(){


            if(bedroom > 1){

                bedroom--;

                bedroomCount.innerHTML = bedroom;

            }


        }


    }








    // ================= BEDS =================


    let beds = 1;


    let bedPlus = document.getElementById("bedPlus");
    let bedMinus = document.getElementById("bedMinus");
    let bedCount = document.getElementById("bedCount");



    if(bedPlus && bedMinus && bedCount){


        bedPlus.onclick = function(){

            beds++;

            bedCount.innerHTML = beds;

        }



        bedMinus.onclick = function(){


            if(beds > 1){

                beds--;

                bedCount.innerHTML = beds;

            }


        }


    }
// ================= SHOW MAP =================

let showMapBtn = document.getElementById("showMapBtn");


if(showMapBtn){

    showMapBtn.onclick = function(){

        window.open(
            "https://www.openstreetmap.org/#map=14/41.3851/2.1734",
            "_blank"
        );

    }

}


});