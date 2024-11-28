const totalSlots = 10;
const slots = Array(totalSlots).fill(null);

function updateSlotsDisplay() {
    const slotsContainer = document.getElementById('slots');
    slotsContainer.innerHTML = '';
    slots.forEach((car, index) => {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.classList.add(car ? 'booked' : 'available');
        slot.innerText = car ? `Slot ${index + 1}\nCar: ${car}` : `Slot ${index + 1}\nAvailable`;
        slotsContainer.appendChild(slot);
    });
}

function showAlert(message) {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = message;
    alertBox.classList.add('show');
}

function closeAlert() {
    const alertBox = document.getElementById('customAlert');
    alertBox.classList.remove('show');
}

function enterCar() {
    const carNumber = document.getElementById('entryCarNumber').value.trim();
    const slotNumber = parseInt(document.getElementById('entrySlotNumber').value.trim(), 10);

    if (!carNumber) {
        showAlert('Please enter a car number!');
        return;
    }

    if (!slotNumber || slotNumber < 1 || slotNumber > totalSlots) {
        showAlert(`Please enter a valid slot number between 1 and ${totalSlots}!`);
        return;
    }

    if (slots[slotNumber - 1]) {
        showAlert(`Slot ${slotNumber} is already booked!`);
        return;
    }

    slots[slotNumber - 1] = carNumber;
    showAlert(`Car ${carNumber} is parked in Slot ${slotNumber}`);
    document.getElementById('entryCarNumber').value = ''; 
    document.getElementById('entrySlotNumber').value = ''; 
    updateSlotsDisplay();
}

function exitCar() {
    const carNumber = document.getElementById('exitCarNumber').value.trim();

    if (!carNumber) {
        showAlert('Please enter a car number!');
        return;
    }

    const slotIndex = slots.indexOf(carNumber);
    if (slotIndex === -1) {
        showAlert(`Car ${carNumber} is not found in any slot!`);
        return;
    }

    slots[slotIndex] = null;
    showAlert(`Car ${carNumber} has exited from Slot ${slotIndex + 1}`);
    document.getElementById('exitCarNumber').value = ''; 
    updateSlotsDisplay();
}


