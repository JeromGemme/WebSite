// Initial State
let currentCount = 5;
let autoInterval = null;

// DOM Elements
const maxInput = document.getElementById('max-input');
const autoAmountInput = document.getElementById('auto-amount');
const autoTimeInput = document.getElementById('auto-time');
const toggleAutoBtn = document.getElementById('toggle-auto');

const actualNumber = document.getElementById('actual-number');
const tallyMarks = document.getElementById('tally-marks');

const btnMinus = document.getElementById('btn-minus');
const btnPlus = document.getElementById('btn-plus');
const stepInput = document.getElementById('step-input');

// Generates groups of 5 for the visual tally: ( X X X X X )
function generateTallyString(count) {
    if (count <= 0) return "( )";
    
    let result = "";
    const fullGroups = Math.floor(count / 5);
    const remainder = count % 5;

    for (let i = 0; i < fullGroups; i++) {
        result += "( X X X X X ) ";
    }
    
    if (remainder > 0) {
        result += "( ";
        for (let i = 0; i < remainder; i++) {
            result += "X ";
        }
        result += ") ";
    }
    
    return result.trim();
}

// Update the UI
function updateDisplay() {
    actualNumber.textContent = currentCount;
    tallyMarks.textContent = generateTallyString(currentCount);
}

// Modify count and handle maximum limit reset
function modifyCount(amount) {
    currentCount += amount;

    // Prevent negative numbers (optional, but standard for tallies)
    if (currentCount < 0) {
        currentCount = 0;
    }

    // Check Maximum Limit
    const maxVal = parseInt(maxInput.value);
    if (!isNaN(maxVal) && currentCount >= maxVal) {
        currentCount = 0; // Restart count
    }

    updateDisplay();
}

// Event Listeners for Manual Controls
btnPlus.addEventListener('click', () => {
    const step = parseInt(stepInput.value) || 1;
    modifyCount(step);
});

btnMinus.addEventListener('click', () => {
    const step = parseInt(stepInput.value) || 1;
    modifyCount(-step);
});

// Event Listener for Auto-Increment Loop
toggleAutoBtn.addEventListener('click', () => {
    if (autoInterval) {
        // Stop the loop
        clearInterval(autoInterval);
        autoInterval = null;
        toggleAutoBtn.textContent = "Start Auto-Loop";
        toggleAutoBtn.classList.remove('active');
    } else {
        // Start the loop
        const amount = parseInt(autoAmountInput.value) || 1;
        const timeSeconds = parseFloat(autoTimeInput.value) || 1;
        
        // Convert seconds to milliseconds for setInterval
        const timeMs = timeSeconds * 1000;

        autoInterval = setInterval(() => {
            modifyCount(amount);
        }, timeMs);

        toggleAutoBtn.textContent = "Stop Auto-Loop";
        toggleAutoBtn.classList.add('active');
    }
});

// Initialize Display on load
updateDisplay();
