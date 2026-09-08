function showDescription(btn) {
  let contentDiv = document.getElementById("more-content")
  let paragraph = "Staff members were consistently helpful, courteous, and willing to assist with any request to ensure a pleasant stay."
  
  contentDiv.innerText = paragraph
  btn.style.display = "none"
}


function showAmenities(btn) {
  let extraAmenities = document.getElementsByClassName("extra-amenity")
  
  for (let i = 0; i < extraAmenities.length; i++) {
    extraAmenities[i].classList.remove("d-none")
  }
  btn.style.display = "none"
}







function showMoreReviews(btn) {
  document.getElementById("extra-reviews").classList.remove("d-none")
  btn.style.display = "none"
}



function goToRoomsTab() {
  const roomsTab = document.getElementById("nav-rooms-tab")
  bootstrap.Tab.getOrCreateInstance(roomsTab).show()
}







let roomCards = document.getElementsByClassName("room-card")
let bed1Cards = document.getElementsByClassName("bed-1")
let bed2Cards = document.getElementsByClassName("bed-2")
let bed3Cards = document.getElementsByClassName("bed-3")

let handleFilter = (flag) => {
    for (let i = 0; i < roomCards.length; i++) {
        roomCards[i].classList.add("d-none")
    }

    if (flag == "all") {
        for (let i = 0; i < roomCards.length; i++) {
            roomCards[i].classList.remove("d-none")
        }
    }
     else if (flag == "1") {
        for (let i = 0; i < bed1Cards.length; i++) {
            bed1Cards[i].classList.remove("d-none")
        }
    }
     else if (flag == "2") {
        for (let i = 0; i < bed2Cards.length; i++) {
            bed2Cards[i].classList.remove("d-none")
        }
    }
     else if (flag == "3") {
        for (let i = 0; i < bed3Cards.length; i++) {
            bed3Cards[i].classList.remove("d-none")
        }
    }
}





function toggleHeart(btn) {
  let icon = btn.querySelector("i")
  icon.classList.toggle("fa-solid")

  icon.classList.toggle("text-danger")
}





$(document).ready(function () {
  $('.custom-carousel').owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    navContainer: '#custom-owl-nav',
    navText: [
      '<span class="custom-nav-btn"><i class="fa-solid fa-chevron-right"></i></span>',
      '<span class="custom-nav-btn"><i class="fa-solid fa-chevron-left"></i></span>'
    ],
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      992: { items: 4 }
    }
  }
)
}
)