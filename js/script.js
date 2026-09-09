// glass tabs
let glassTabs = document.querySelectorAll('.glass-tab')

glassTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        glassTabs.forEach((t) => t.classList.remove('active'))
        tab.classList.add('active')
    })
})

// trending destinations
function openSeason(season) {
    let targetTab = document.getElementById(season + '-tab')
    if (targetTab) targetTab.click()
}

// Owl Carousel Setup
$(document).ready(function () {
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

// hearts 
let hearts = document.querySelectorAll('.wishlist-btn')
let savedHearts = JSON.parse(localStorage.getItem('wishlist')) || []

hearts.forEach((btn, i) => {
    let icon = btn.querySelector('i')
    
    if (savedHearts.includes(i)) {
        btn.classList.add('saved')
        if (icon) {
            icon.classList.remove('fa-regular')
            icon.classList.add('fa-solid')
        }
    }

    btn.addEventListener('click', () => {
        btn.classList.toggle('saved')
        if (icon) {
            icon.classList.toggle('fa-regular')
            icon.classList.toggle('fa-solid')
        }

        let place = savedHearts.indexOf(i)
        if (place === -1) savedHearts.push(i)
        else savedHearts.splice(place, 1)

        localStorage.setItem('wishlist', JSON.stringify(savedHearts))
    })
})

// search box 
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
    if (locationBox) locationBox.style.display = 'none'
    if (guestsBox) guestsBox.style.display = 'none'
    if (locationBtn) locationBtn.classList.remove('active')
    if (guestsBtn) guestsBtn.classList.remove('active')
}

if (locationBtn) {
    locationBtn.addEventListener('click', (e) => {
        e.stopPropagation() 
        let isOpen = locationBox.style.display === 'block'
        closeBoxes()
        if (!isOpen) {
            locationBox.style.display = 'block'
            locationBtn.classList.add('active')
        }
    })
}

if (guestsBtn) {
    guestsBtn.addEventListener('click', (e) => {
        e.stopPropagation() 
        let isOpen = guestsBox.style.display === 'block'
        closeBoxes()
        if (!isOpen) {
            guestsBox.style.display = 'block'
            guestsBtn.classList.add('active')
        }
    })
}

if (locationBox) locationBox.addEventListener('click', (e) => e.stopPropagation())
if (guestsBox) guestsBox.addEventListener('click', (e) => e.stopPropagation())

document.addEventListener('click', () => closeBoxes())
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBoxes()
})

function pickCity(element) {
    if (locationInput) locationInput.value = element.querySelector('strong').innerText
    if (clearBtn) clearBtn.classList.remove('d-none')
    if (searchFeedback) searchFeedback.classList.add('d-none')
    closeBoxes()
}

if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
        e.stopPropagation() 
        if (locationInput) locationInput.value = ''
        clearBtn.classList.add('d-none')
    })
}

function changeCount(type, step) {
    let lowest = type === 'children' ? 0 : 1
    let next = counts[type] + step
    if (next < lowest || next > 20) return

    counts[type] = next
    let countElem = document.getElementById(type + 'Count')
    if (countElem) countElem.innerText = next
    updateGuestsSummary()
}

function updateGuestsSummary() {
    if (!guestsSummary) return
    let roomText = `${counts.rooms} ${counts.rooms === 1 ? 'room' : 'rooms'}`
    let adultText = `${counts.adults} ${counts.adults === 1 ? 'adult' : 'adults'}`
    let childText = `${counts.children} ${counts.children === 1 ? 'child' : 'children'}`

    guestsSummary.innerText = `${roomText}, ${adultText}, ${childText}`
}

// Date Pickers Validation
let checkIn = document.getElementById('checkInInput')
let checkOut = document.getElementById('checkOutInput')

if (checkIn && checkOut) {
    let today = new Date()
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let dd = String(today.getDate()).padStart(2, '0')
    let todayValue = `${today.getFullYear()}-${mm}-${dd}`

    checkIn.min = todayValue
    checkOut.min = todayValue

    checkIn.addEventListener('input', () => {
        checkOut.min = checkIn.value
        if (checkOut.value !== '' && checkOut.value < checkIn.value) checkOut.value = ''
    })
}

// search submit 
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()

        if (!locationInput || locationInput.value.trim() === '') {
            if (searchFeedback) {
                searchFeedback.innerText = 'Please choose a destination first.'
                searchFeedback.classList.remove('d-none', 'text-success')
                searchFeedback.classList.add('text-danger')
            }
            if (locationBox) locationBox.style.display = 'block'
            if (locationBtn) locationBtn.classList.add('active')
            return
        }

        if (!checkIn || checkIn.value === '') {
            if (searchFeedback) {
                searchFeedback.innerText = 'Please select a check-in date before searching.'
                searchFeedback.classList.remove('d-none', 'text-success')
                searchFeedback.classList.add('text-danger')
            }
            if (checkIn) checkIn.focus()
            return
        }

        if (!checkOut || checkOut.value === '') {
            if (searchFeedback) {
                searchFeedback.innerText = 'Please select a check-out date before searching.'
                searchFeedback.classList.remove('d-none', 'text-success')
                searchFeedback.classList.add('text-danger')
            }
            if (checkOut) checkOut.focus()
            return
        }
        let guests = counts.adults + counts.children

        if (searchFeedback) {
            searchFeedback.innerText =
                'Searching stays in ' + locationInput.value + ' - From ' +
                checkIn.value + ' to ' + checkOut.value + ' - ' +
                counts.rooms + ' room(s), ' + guests + ' guest(s)'

            searchFeedback.classList.remove('d-none', 'text-danger')
            searchFeedback.classList.add('text-success')
        }
    })
}

// Login Modal Controls
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

let rightCode = '1236'
let timerId = null
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if (emailInput) {
    emailInput.addEventListener('input', () => {
        if (continueBtn) continueBtn.disabled = !emailRegex.test(emailInput.value)
    })
}

let startCountdown = () => {
    let left = 30
    if (timerText) timerText.innerText = left
    if (resendWrap) resendWrap.classList.remove('d-none')
    if (resendBtn) resendBtn.classList.add('d-none')
    if (timerId !== null) clearInterval(timerId)

    timerId = setInterval(() => {
        left--
        if (timerText) timerText.innerText = left

        if (left === 0) {
            clearInterval(timerId)
            if (resendWrap) resendWrap.classList.add('d-none')
            if (resendBtn) resendBtn.classList.remove('d-none')
        }
    }, 1000)
}

let showEmailStep = () => {
    if (emailStep) emailStep.classList.remove('d-none')
    if (verifyStep) verifyStep.classList.add('d-none')
    if (backBtn) backBtn.classList.add('d-none')
    if (timerId !== null) clearInterval(timerId)
}

if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault()

        if (emailStep) emailStep.classList.add('d-none')
        if (verifyStep) verifyStep.classList.remove('d-none')
        if (backBtn) backBtn.classList.remove('d-none')
        if (displayEmail) displayEmail.innerText = emailInput.value

        startCountdown()
        if (codeInputs.length > 0) codeInputs[0].focus()
    })
}

if (backBtn) backBtn.addEventListener('click', showEmailStep)
if (editEmailBtn) editEmailBtn.addEventListener('click', showEmailStep)
if (resendBtn) resendBtn.addEventListener('click', startCountdown)

codeInputs.forEach((box, i) => {
    box.addEventListener('input', () => {
        box.value = box.value.replace(/[^0-9]/g, '')

        if (codeError) codeError.classList.add('d-none')
        codeInputs.forEach((b) => b.classList.remove('border-danger'))

        if (box.value !== '' && i < codeInputs.length - 1) codeInputs[i + 1].focus()
        let filled = 0
        codeInputs.forEach((b) => {
            if (b.value !== '') filled++
        })
        if (verifyBtn) verifyBtn.disabled = filled < codeInputs.length
    })

    box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && box.value === '' && i > 0) codeInputs[i - 1].focus()
    })
})

let readCode = () => {
    let code = ''
    codeInputs.forEach((b) => { code += b.value })
    return code
}

if (verifyForm) {
    verifyForm.addEventListener('submit', (e) => {
        e.preventDefault()

        if (verifySpinner) verifySpinner.classList.remove('d-none')
        if (verifyBtn) verifyBtn.disabled = true
        if (codeError) codeError.classList.add('d-none')

        setTimeout(() => {
            if (verifySpinner) verifySpinner.classList.add('d-none')

            if (readCode() !== rightCode) {
                if (codeError) codeError.classList.remove('d-none')

                codeInputs.forEach((b) => {
                    b.value = ''
                    b.classList.add('border-danger')
                })
                if (codeInputs.length > 0) codeInputs[0].focus()
                return
            }

            if (timerId !== null) clearInterval(timerId)
            let modalClose = document.getElementById('modalCloseBtn')
            if (modalClose) modalClose.click()

            let loginBtn = document.getElementById('loginBtn')
            let accountMenu = document.getElementById('accountMenu')
            let accountEmail = document.getElementById('accountEmail')

            if (loginBtn) loginBtn.classList.add('d-none')
            if (accountMenu) accountMenu.classList.remove('d-none')
            if (accountEmail) accountEmail.innerText = emailInput.value
        }, 1500)
    })
}

function logout() {
    let accountMenu = document.getElementById('accountMenu')
    let loginBtn = document.getElementById('loginBtn')
    let accountEmail = document.getElementById('accountEmail')

    if (accountMenu) accountMenu.classList.add('d-none')
    if (loginBtn) loginBtn.classList.remove('d-none')
    if (accountEmail) accountEmail.innerText = 'you@example.com'
}

let loginModal = document.getElementById('loginModal')
if (loginModal) {
    loginModal.addEventListener('hidden.bs.modal', () => {
        showEmailStep()
        if (emailForm) emailForm.reset()
        if (continueBtn) continueBtn.disabled = true
        codeInputs.forEach((b) => {
            b.value = ''
            b.classList.remove('border-danger')
        })
        if (codeError) codeError.classList.add('d-none')
        if (verifyBtn) verifyBtn.disabled = true
    })
}

// bot 
let chatDrawer = document.getElementById('aiChatDrawer')
let chatOverlay = document.getElementById('chatOverlay')
let chatBox = document.getElementById('chatMessages')
let chatForm = document.getElementById('aiChatForm')
let chatInput = document.getElementById('aiInput')
let welcome = document.getElementById('welcomeHeader')

function openChat() {
    if (chatDrawer) chatDrawer.classList.add('open')
    if (chatOverlay) chatOverlay.classList.add('open')
}

function closeChat() {
    if (chatDrawer) chatDrawer.classList.remove('open')
    if (chatOverlay) chatOverlay.classList.remove('open')
}

if (chatOverlay) {
    chatOverlay.addEventListener('click', closeChat)
}

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
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight
}

let addMyMessage = (text) => {
    if (!chatBox) return
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
    if (!chatBox) return
    let wrap = document.createElement('div')
    wrap.className = 'my-2'
    wrap.innerHTML = answers[topic]
    chatBox.appendChild(wrap)
    scrollDown()
}

let sendToBot = (text, topic) => {
    if (!text || text === '') return

    if (welcome) welcome.classList.add('d-none')
    addMyMessage(text)

    let typing = document.createElement('div')
    typing.className = 'my-2'
    typing.innerHTML =
        '<div class="bg-light rounded-4 d-inline-flex align-items-center gap-1 px-3 py-2">' +
        '<span class="spinner-grow spinner-grow-sm text-secondary"></span>' +
        '<span class="spinner-grow spinner-grow-sm text-secondary" style="animation-delay: .15s"></span>' +
        '<span class="spinner-grow spinner-grow-sm text-secondary" style="animation-delay: .3s"></span></div>'

    if (chatBox) {
        chatBox.appendChild(typing)
        scrollDown()
    }

    if (topic === undefined || answers[topic] === undefined) topic = findTopic(text)

    setTimeout(() => {
        if (chatBox && chatBox.contains(typing)) chatBox.removeChild(typing)
        addBotMessage(topic)
    }, 650)
}

function askBot(topic, text) {
    if (text === undefined) {
        let cards = document.querySelectorAll('.prompt-card')
        cards.forEach((card) => {
            let attr = card.getAttribute('onclick')
            if (attr && attr.indexOf("'" + topic + "'") > -1) {
                let txtElem = card.querySelector('.prompt-text')
                if (txtElem) text = txtElem.innerText
            }
        })
    }
    sendToBot(text, topic)
}

if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault()
        if (chatInput) {
            sendToBot(chatInput.value.trim())
            chatInput.value = ''
        }
    })
}

let aiResetBtn = document.getElementById('aiResetBtn')
if (aiResetBtn) {
    aiResetBtn.addEventListener('click', () => {
        if (chatBox) {
            chatBox.innerHTML = ''
            if (welcome) {
                chatBox.appendChild(welcome)
                welcome.classList.remove('d-none')
            }
        }
        if (chatInput) chatInput.value = ''
    })
}

//buttons
document.addEventListener("DOMContentLoaded", function () {
    const seasonBtns = document.querySelectorAll("#trendingTabs .season-btn");

    seasonBtns.forEach((btn) => {
        if (btn.classList.contains("active")) {
            btn.style.setProperty("background-color", "#000000", "important");
            btn.style.setProperty("color", "#ffffff", "important");
            btn.style.setProperty("border-color", "#000000", "important");
        }

        btn.addEventListener("click", function () {
            seasonBtns.forEach((b) => {
                b.classList.remove("active");
                b.style.backgroundColor = "transparent";
                b.style.color = "#000000";
                b.style.borderColor = "#000000";
            });

            this.classList.add("active");
            this.style.setProperty("background-color", "#000000", "important");
            this.style.setProperty("color", "#ffffff", "important");
            this.style.setProperty("border-color", "#000000", "important");
        });
    });
});

function filterThings(category, btn) {
    const filterBtns = document.querySelectorAll("#things-filter-btns .city-filter-btn");

    filterBtns.forEach((b) => {
        b.classList.remove("active", "btn-dark");
        b.classList.add("btn-outline-secondary");
    });

    if (btn) {
        btn.classList.add("active", "btn-dark");
        btn.classList.remove("btn-outline-secondary");
    }

    const items = document.querySelectorAll("#things-grid .thing-item");
    items.forEach((item) => {
        if (category === "all" || item.classList.contains(`cat-${category}`)) {
            item.classList.remove("d-none");
        } else {
            item.classList.add("d-none");
        }
    });
}
