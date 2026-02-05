// Floating hearts animation
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['💕', '💖', '💗', '💝', '❤️', '🌹'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        container.appendChild(heart);
    }
}

createFloatingHearts();

// Page navigation
function goToPage(pageNum) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page' + pageNum).classList.add('active');
    
    if (pageNum === 2) {
        generateCalendar();
    }
}

// Handle "No" button
function handleNo() {
    alert("Oh no! 💔 But I'll keep trying to win your heart! 😊");
}

// Calendar generation
let selectedDate = null;

function generateCalendar() {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    
    // Day labels
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const label = document.createElement('div');
        label.className = 'calendar-day-label';
        label.textContent = day;
        grid.appendChild(label);
    });
    
    // February 2025 starts on Saturday (day 6)
    const daysInMonth = 28;
    const startDay = 6; // Saturday
    const today = 5; // Assuming today is Feb 5
    
    // Empty cells before the 1st
    for (let i = 0; i < startDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day empty';
        grid.appendChild(empty);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
        
        if (day < today) {
            dayCell.classList.add('past');
        } else {
            dayCell.onclick = () => selectDate(dayCell, day);
        }
        
        grid.appendChild(dayCell);
    }
}

function selectDate(cell, day) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
    
    // Select new date
    cell.classList.add('selected');
    selectedDate = day;
    
    // Enable continue button
    document.getElementById('continueBtn').disabled = false;
}

// Gift selection
let selectedGift = null;
let otherGiftText = '';

function selectGift(card, gift) {
    // Remove previous selection
    document.querySelectorAll('.gift-card').forEach(c => c.classList.remove('selected'));
    
    // Select new gift
    card.classList.add('selected');
    selectedGift = gift;
    
    // Show or hide "Other" input field
    const otherInputContainer = document.getElementById('otherInputContainer');
    const otherInput = document.getElementById('otherInput');
    
    if (gift === 'Other') {
        otherInputContainer.style.display = 'block';
        otherInput.focus();
        
        // Enable continue button only if there's text in the input
        otherInput.addEventListener('input', function() {
            otherGiftText = this.value.trim();
            document.getElementById('giftContinueBtn').disabled = otherGiftText === '';
        });
        
        // Initially disable continue button until text is entered
        document.getElementById('giftContinueBtn').disabled = true;
    } else {
        otherInputContainer.style.display = 'none';
        otherInput.value = '';
        otherGiftText = '';
        
        // Enable continue button for predefined gifts
        document.getElementById('giftContinueBtn').disabled = false;
    }
}

// Show final page
function showFinal() {
    const details = document.getElementById('finalDetails');
    
    // Determine what gift to display
    let giftDisplay = selectedGift;
    if (selectedGift === 'Other' && otherGiftText) {
        giftDisplay = otherGiftText;
    }
    
    details.innerHTML = `
        <p><strong>Date:</strong> February ${selectedDate}, 2025</p>
        <p><strong>Gift:</strong> ${giftDisplay}</p>
        <p style="margin-top: 30px; font-size: 1.1rem;">I can't wait to spend this special day with you! 💕</p>
    `;
    
    goToPage(4);
}