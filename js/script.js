// tabs on the hero 
let glassTabs = document.querySelectorAll('.glass-tab')

glassTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        glassTabs.forEach((t) => t.classList.remove('active'))
        tab.classList.add('active')
    })
})

//trending destinations 
function openSeason(season) {
    document.getElementById(season + '-tab').click()
}

//owl carousels 
$(document).ready(function () {
    $.camelCase = function (text) {
        return text.replace(/-([a-z])/g, function (all, letter) {
            return letter.toUpperCase()
        })
    }

    $.type = function (value) {
        return typeof value
    }

    let options = {
        margin: 24,
        nav: true,
        dots: false,
        navText: [
            '<i class="fa-solid fa-chevron-left"></i>',
            '<i class="fa-solid fa-chevron-right"></i>'
        ],
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            768: { items: 3 },
            1200: { items: 4 }
        }
    }

    $(".deals-carousel").owlCarousel(options)
    $(".homes-carousel").owlCarousel(options)
})

//hearts 
let hearts = document.querySelectorAll('.wishlist-btn')
let savedHearts = JSON.parse(localStorage.getItem('wishlist'))

if (savedHearts == null) savedHearts = []

hearts.forEach((btn, i) => {
    let icon = btn.querySelector('i')
  
    if (savedHearts.includes(i)) {
        btn.classList.add('saved')
        icon.classList.remove('fa-regular')
        icon.classList.add('fa-solid')
    }

    btn.addEventListener('click', () => {
        btn.classList.toggle('saved')
        icon.classList.toggle('fa-regular')
        icon.classList.toggle('fa-solid')

        let place = savedHearts.indexOf(i)
        if (place == -1) savedHearts.push(i)
        else savedHearts.splice(place, 1)

        localStorage.setItem('wishlist', JSON.stringify(savedHearts))
    })
})

//top things to do 
function filterThings(category, btn) {
    let filterBtns = document.querySelectorAll('.city-filter-btn')

    filterBtns.forEach((b) => {
        b.classList.remove('btn-dark', 'active')
        b.classList.add('btn-outline-secondary')
    })

    btn.classList.remove('btn-outline-secondary')
    btn.classList.add('btn-dark', 'active')

    let items = document.querySelectorAll('.thing-item')
    items.forEach((item) => item.classList.add('d-none'))

    if (category == 'all') category = 'explore'

    let picked = document.getElementsByClassName('cat-' + category)

    for (let i = 0; i < picked.length; i++) {
        picked[i].classList.remove('d-none')
    }
}
//search box 
let locationBtn = document.getElementById('locationSelectBtn')
let locationBox = document.getElementById('locationDropdown')
let locationInput = document.getElementById('locationInput')
let clearBtn = document.getElementById('clearLocationBtn')
let guestsBtn = document.getElementById('guestsSelectBtn')
let guestsBox = document.getElementById('guestsDropdown')
let guestsSummary = document.getElementById('guestsSummary')
let searchForm = document.getElementById('searchForm')
let searchFeedback = document.getElementById('searchFeedback')

let counts = { rooms: 1, adults: 1, children: 0 }

let closeBoxes = () => {
    locationBox.style.display = 'none'
    guestsBox.style.display = 'none'
    locationBtn.classList.remove('active')
    guestsBtn.classList.remove('active')
}

locationBtn.addEventListener('click', () => {
    let isOpen = locationBox.style.display == 'block'
    closeBoxes()
    if (!isOpen) {
        locationBox.style.display = 'block'
        locationBtn.classList.add('active')
    }
})

guestsBtn.addEventListener('click', () => {
    let isOpen = guestsBox.style.display == 'block'
    closeBoxes()
    if (!isOpen) {
        guestsBox.style.display = 'block'
        guestsBtn.classList.add('active')
    }
})

document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') closeBoxes()
})

function pickCity(element) {
    locationInput.value = element.querySelector('strong').innerText
    clearBtn.classList.remove('d-none')
    searchFeedback.classList.add('d-none')
    closeBoxes()
}

clearBtn.addEventListener('click', () => {
    locationInput.value = ''
    clearBtn.classList.add('d-none')
})

function changeCount(type, step) {
    let lowest = 0
    if (type != 'children') lowest = 1

    let next = counts[type] + step
    if (next < lowest || next > 20) return

    counts[type] = next
    document.getElementById(type + 'Count').innerText = next

    let word = (n, w) => n + ' ' + w + (n == 1 ? '' : 's')

    guestsSummary.innerText =
        word(counts.rooms, 'room') + ', ' +
        word(counts.adults, 'adult') + ', ' +
        word(counts.children, 'child').replace('childs', 'children')
}

//  pick a date 
let checkIn = document.getElementById('checkInInput')
let checkOut = document.getElementById('checkOutInput')

let today = new Date()
let mm = today.getMonth() + 1
let dd = today.getDate()

if (mm < 10) mm = '0' + mm
if (dd < 10) dd = '0' + dd

let todayValue = today.getFullYear() + '-' + mm + '-' + dd

checkIn.min = todayValue
checkOut.min = todayValue

// check out can never be before check in
checkIn.addEventListener('input', () => {
    checkOut.min = checkIn.value
    if (checkOut.value != '' && checkOut.value < checkIn.value) checkOut.value = ''
})

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (locationInput.value == '') {
        searchFeedback.innerText = 'Please choose a destination first.'
        searchFeedback.classList.remove('d-none', 'text-success')
        searchFeedback.classList.add('text-danger')
        locationBox.style.display = 'block'
        locationBtn.classList.add('active')
        return
    }

    let guests = counts.adults + counts.children
    let from = checkIn.value == '' ? 'any date' : checkIn.value
    let to = checkOut.value == '' ? 'any date' : checkOut.value

    searchFeedback.innerText =
        'Searching stays in ' + locationInput.value + ' - ' +
        from + ' to ' + to + ' - ' +
        counts.rooms + ' room(s), ' + guests + ' guest(s)'

    searchFeedback.classList.remove('d-none', 'text-danger')
    searchFeedback.classList.add('text-success')
})

// login modal
let emailInput = document.getElementById('userEmail')
let continueBtn = document.getElementById('continueBtn')
let emailForm = document.getElementById('emailForm')
let emailStep = document.getElementById('emailStep')
let verifyStep = document.getElementById('verifyStep')
let displayEmail = document.getElementById('displayEmail')
let backBtn = document.getElementById('backToEmailBtn')
let editEmailBtn = document.getElementById('editEmailBtn')
let verifyForm = document.getElementById('verifyForm')
let verifyBtn = document.getElementById('verifyBtn')
let verifySpinner = document.getElementById('verifySpinner')
let timerText = document.getElementById('timer')
let resendBtn = document.getElementById('resendBtn')
let resendWrap = document.getElementById('resendWrap')
let codeInputs = document.querySelectorAll('.code-input')
let codeError = document.getElementById('codeError')

//verify code
let rightCode = '1236'
let timerId = null

// same email check used 
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

emailInput.addEventListener('input', () => {
    continueBtn.disabled = !emailRegex.test(emailInput.value)
})

let startCountdown = () => {
    let left = 30
    timerText.innerText = left
    resendWrap.classList.remove('d-none')
    resendBtn.classList.add('d-none')

    if (timerId != null) clearInterval(timerId)

    timerId = setInterval(() => {
        left--
        timerText.innerText = left

        if (left == 0) {
            clearInterval(timerId)
            resendWrap.classList.add('d-none')
            resendBtn.classList.remove('d-none')
        }
    }, 1000)
}

let showEmailStep = () => {
    emailStep.classList.remove('d-none')
    verifyStep.classList.add('d-none')
    backBtn.classList.add('d-none')
    if (timerId != null) clearInterval(timerId)
}

emailForm.addEventListener('submit', (e) => {
    e.preventDefault()

    emailStep.classList.add('d-none')
    verifyStep.classList.remove('d-none')
    backBtn.classList.remove('d-none')
    displayEmail.innerText = emailInput.value

    startCountdown()
    codeInputs[0].focus()
})

backBtn.addEventListener('click', showEmailStep)
editEmailBtn.addEventListener('click', showEmailStep)
resendBtn.addEventListener('click', startCountdown)

codeInputs.forEach((box, i) => {

    box.addEventListener('input', () => {
        box.value = box.value.replace(/[^0-9]/g, '')

        codeError.classList.add('d-none')
        codeInputs.forEach((b) => b.classList.remove('border-danger'))

        if (box.value != '' && i < codeInputs.length - 1) codeInputs[i + 1].focus()
        // the button only works once all six boxes are filled
        let filled = 0
        codeInputs.forEach((b) => {
            if (b.value != '') filled++
        })
        verifyBtn.disabled = filled < codeInputs.length
    })

    box.addEventListener('keydown', (e) => {
        if (e.key == 'Backspace' && box.value == '' && i > 0) codeInputs[i - 1].focus()
    })
})

let readCode = () => {
    let code = ''
    codeInputs.forEach((b) => {
        code += b.value
    })
    return code
}

verifyForm.addEventListener('submit', (e) => {
    e.preventDefault()

    verifySpinner.classList.remove('d-none')
    verifyBtn.disabled = true
    codeError.classList.add('d-none')

    setTimeout(() => {
        verifySpinner.classList.add('d-none')

        if (readCode() != rightCode) {
            codeError.classList.remove('d-none')
          
            codeInputs.forEach((b) => {
                b.value = ''
                b.classList.add('border-danger')
            })
            codeInputs[0].focus()
            return
        }

        if (timerId != null) clearInterval(timerId)

        document.getElementById('modalCloseBtn').click()
        document.getElementById('loginBtn').classList.add('d-none')
        document.getElementById('accountMenu').classList.remove('d-none')
        document.getElementById('accountEmail').innerText = emailInput.value
    }, 1500)
})

// Log out 
function logout() {
    document.getElementById('accountMenu').classList.add('d-none')
    document.getElementById('loginBtn').classList.remove('d-none')
    document.getElementById('accountEmail').innerText = 'you@example.com'
}

document.getElementById('loginModal').addEventListener('hidden.bs.modal', () => {
    showEmailStep()
    emailForm.reset()
    continueBtn.disabled = true
    codeInputs.forEach((b) => {
        b.value = ''
        b.classList.remove('border-danger')
    })
    codeError.classList.add('d-none')
    verifyBtn.disabled = true
})

//TriptoBot 
let chatDrawer = document.getElementById('aiChatDrawer')
let chatOverlay = document.getElementById('chatOverlay')
let chatBox = document.getElementById('chatMessages')
let chatForm = document.getElementById('aiChatForm')
let chatInput = document.getElementById('aiInput')
let welcome = document.getElementById('welcomeHeader')

function openChat() {
    chatDrawer.classList.add('open')
    chatOverlay.classList.add('open')
}

function closeChat() {
    chatDrawer.classList.remove('open')
    chatOverlay.classList.remove('open')
}

// helper 
let followUps = (list) => {
    let html = '<div class="d-flex flex-column gap-1 mb-2">'

    list.forEach((one) => {
        html += '<button type="button" onclick="askBot(\'' + one[1] + '\', \'' + one[0] + '\')" ' +
            'class="btn btn-outline-secondary border text-start rounded-4 p-2 d-flex align-items-center justify-content-between fs-7 bg-white">' +
            '<span>' + one[0] + '</span><i class="fa-solid fa-chevron-right text-muted"></i></button>'
    })
    return html + '</div>'
}
let answers = {

    hotels:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
            '<p class="mb-2 fw-semibold">Based on the latest ratings in Barcelona, we recommend:</p>' +
            '<div class="mb-2"><strong class="text-primary d-block">Hotel Arts Barcelona</strong>' +
            '<small class="text-muted">Rating 5.0 - Luxurious stay with 6-star service.</small></div>' +
            '<div class="mb-0"><strong class="text-primary d-block">SLS Barcelona</strong>' +
            '<small class="text-muted">Rating 4.5 - Rooftop pool and sea view.</small></div>' +
        '</div>' +
        '<div class="d-flex gap-2 overflow-x-auto no-scrollbar py-2 mb-2 pe-1">' +
            '<div class="card border rounded-4 shadow-sm flex-shrink-0 position-relative" style="width: 150px;">' +
                '<span class="badge bg-success position-absolute top-0 start-0 m-1 fs-8">Deal</span>' +
                '<img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80" class="card-img-top rounded-top-4 object-fit-cover" style="height: 85px;" alt="Hotel Arts Barcelona">' +
                '<div class="card-body p-2"><h6 class="fw-bold mb-1 fs-7">Hotel Arts</h6>' +
                '<span class="badge bg-primary rounded-2">5.0</span><div class="fw-bold text-dark fs-7 mt-1">$300 / night</div></div>' +
            '</div>' +
            '<div class="card border rounded-4 shadow-sm flex-shrink-0 position-relative" style="width: 150px;">' +
                '<span class="badge bg-primary position-absolute top-0 start-0 m-1 fs-8">Popular</span>' +
                '<img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80" class="card-img-top rounded-top-4 object-fit-cover" style="height: 85px;" alt="SLS Barcelona">' +
                '<div class="card-body p-2"><h6 class="fw-bold mb-1 fs-7">SLS Barcelona</h6>' +
                '<span class="badge bg-primary rounded-2">4.5</span><div class="fw-bold text-dark fs-7 mt-1">$288 / night</div></div>' +
            '</div>' +
        '</div>' +
        followUps([
            ['Compare these hotels for me.', 'compare'],
            ['Show me cheaper options.', 'budget']
        ]),

    apartments:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
            '<p class="mb-2 fw-semibold">Here are top apartments and homes near downtown Barcelona:</p>' +
            '<div class="mb-2"><strong class="text-primary d-block">Gothic Quarter Modern Loft</strong>' +
            '<small class="text-muted">Fully equipped kitchen, 5 min walk to La Rambla - $132 / night</small></div>' +
            '<div class="mb-0"><strong class="text-primary d-block">Eixample Luxury Apartment</strong>' +
            '<small class="text-muted">Spacious 2-bedroom with private balcony - $178 / night</small></div>' +
        '</div>' +
        followUps([
            ['Show apartments under $150 per night.', 'budget'],
            ['Which ones allow pets?', 'default']
        ]),

    inspiration:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
            '<p class="mb-2 fw-semibold">Tips to prevent motion sickness during travel:</p>' +
            '<ul class="mb-0 ps-3">' +
                '<li>Choose the seat with the least motion - front of the bus, over the wing on a plane.</li>' +
                '<li>Look at the horizon or a fixed point outside, not at a screen.</li>' +
                '<li>Stay hydrated and skip heavy meals before you set off.</li>' +
                '<li>Fresh air and ginger tea both help more than people expect.</li>' +
            '</ul>' +
        '</div>' +
        followUps([['What should I pack for a long trip?', 'default']]),

    attractions:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
            '<p class="mb-2 fw-semibold">Top attractions and activities in Barcelona:</p>' +
            '<div class="mb-2"><strong class="text-primary d-block">1. Sagrada Familia</strong>' +
            '<small class="text-muted">Gaudi unfinished masterpiece - book a timed entry slot.</small></div>' +
            '<div class="mb-2"><strong class="text-primary d-block">2. Park Guell</strong>' +
            '<small class="text-muted">Mosaic terraces and panoramic views over the city.</small></div>' +
            '<div class="mb-0"><strong class="text-primary d-block">3. Gothic Quarter</strong>' +
            '<small class="text-muted">Medieval streets, tapas bars and the cathedral cloister.</small></div>' +
        '</div>' +
        followUps([
            ['Get entry ticket info for Sagrada Familia.', 'tickets'],
            ['What can I do on a rainy day?', 'default']
        ]),

    compare:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
            '<p class="mb-2 fw-semibold">Hotel Arts vs. SLS Barcelona</p>' +
            '<ul class="mb-0 ps-3">' +
                '<li><strong>Price:</strong> $300 vs. $288 per night</li>' +
                '<li><strong>Rating:</strong> 5.0 vs. 4.5</li>' +
                '<li><strong>Location:</strong> both on the beachfront in Port Olimpic</li>' +
                '<li><strong>Best for:</strong> Hotel Arts for service, SLS for the rooftop pool</li>' +
            '</ul>' +
        '</div>',

    budget:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
            '<p class="mb-2 fw-semibold">Good value stays under $150 a night:</p>' +
            '<div class="mb-2"><strong class="text-primary d-block">Casa Gracia Boutique</strong>' +
            '<small class="text-muted">Rating 4.4 - $118 / night</small></div>' +
            '<div class="mb-0"><strong class="text-primary d-block">Poble Sec Garden Flat</strong>' +
            '<small class="text-muted">Rating 4.6 - $139 / night</small></div>' +
        '</div>',

    tickets:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
            '<p class="mb-2 fw-semibold">Sagrada Familia - visitor info</p>' +
            '<ul class="mb-0 ps-3">' +
                '<li>Open daily, roughly 9:00 to 18:00 (longer in summer).</li>' +
                '<li>Entry from about 26 euro, tower access costs extra.</li>' +
                '<li>Timed tickets sell out, so book a few days ahead.</li>' +
            '</ul>' +
        '</div>',

    dates:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
            'Tell me your check-in and check-out dates and I will pull availability for them.' +
        '</div>',

    default:
        '<div class="bg-light p-3 rounded-4 text-dark mb-2 fs-7">' +
            'I can help with stays, apartments, attractions and travel tips. ' +
            'Try asking about hotels in a city, things to do, or your budget.' +
        '</div>' +
        followUps([
            ['Recommend hotels in Barcelona.', 'hotels'],
            ['What is there to do nearby?', 'attractions']
        ])
}

let keywords = [
    [/(hotel|resort|stay|room)/i, 'hotels'],
    [/(apartment|flat|loft|home|villa)/i, 'apartments'],
    [/(attraction|sight|visit|activit|things to do|museum|tour)/i, 'attractions'],
    [/(tip|advice|sick|pack|inspir)/i, 'inspiration'],
    [/(compare|versus|vs)/i, 'compare'],
    [/(cheap|budget|affordable|price|cost)/i, 'budget'],
    [/(ticket|entry|opening|hours)/i, 'tickets'],
    [/(check.?in|check.?out|availability|date)/i, 'dates']
]

let findTopic = (text) => {
    for (let i = 0; i < keywords.length; i++) {
        if (keywords[i][0].test(text)) return keywords[i][1]
    }
    return 'default'
}

let scrollDown = () => {
    chatBox.scrollTop = chatBox.scrollHeight
}

let addMyMessage = (text) => {
    let row = document.createElement('div')
    row.className = 'd-flex justify-content-end my-2'

    let bubble = document.createElement('div')
    bubble.className = 'bg-dark text-white rounded-4 p-3 shadow-sm fs-7 text-break'
    bubble.style.maxWidth = '80%'
    bubble.innerText = text

    row.appendChild(bubble)
    chatBox.appendChild(row)
    scrollDown()
}

let addBotMessage = (topic) => {
    let wrap = document.createElement('div')
    wrap.className = 'my-2'
    wrap.innerHTML = answers[topic]
    chatBox.appendChild(wrap)
    scrollDown()
}

let sendToBot = (text, topic) => {
    if (text == '') return

    welcome.classList.add('d-none')
    addMyMessage(text)

    let typing = document.createElement('div')
    typing.className = 'my-2'
    typing.innerHTML =
        '<div class="bg-light rounded-4 d-inline-flex align-items-center gap-1 px-3 py-2">' +
        '<span class="spinner-grow spinner-grow-sm text-secondary"></span>' +
        '<span class="spinner-grow spinner-grow-sm text-secondary" style="animation-delay: .15s"></span>' +
        '<span class="spinner-grow spinner-grow-sm text-secondary" style="animation-delay: .3s"></span></div>'

    chatBox.appendChild(typing)
    scrollDown()

    if (topic == undefined || answers[topic] == undefined) topic = findTopic(text)

    setTimeout(() => {
        chatBox.removeChild(typing)
        addBotMessage(topic)
    }, 650)
}

//ai
function askBot(topic, text) {
    if (text == undefined) {
        let cards = document.querySelectorAll('.prompt-card')
        cards.forEach((card) => {
            if (card.getAttribute('onclick').indexOf("'" + topic + "'") > -1) {
                text = card.querySelector('.prompt-text').innerText
            }
        })
    }
    sendToBot(text, topic)
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendToBot(chatInput.value.trim())
    chatInput.value = ''
})

document.getElementById('aiResetBtn').addEventListener('click', () => {
    chatBox.innerHTML = ''
    chatBox.appendChild(welcome)
    welcome.classList.remove('d-none')
    chatInput.value = ''
})
