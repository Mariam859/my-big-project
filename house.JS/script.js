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




function toggleHeart(btn) {
  let icon = btn.querySelector("i")
  icon.classList.toggle("fa-solid")
  icon.classList.toggle("text-danger")
}



$(function() {
  $('input[name="daterange"]').daterangepicker({
    opens: 'left'
  }, function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  })
})




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