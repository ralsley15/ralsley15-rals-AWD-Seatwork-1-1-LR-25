// Wait for the entire document to load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select all bus elements
    const buses = document.querySelectorAll('.bus');
     // Select buttons and input elements
    const reserveButton = document.getElementById('reserveButton');
    const resetButton = document.getElementById('resetButton');
    const message = document.getElementById('message');
    const dateInput = document.getElementById('date');
    const locationSelect = document.getElementById('location');

   // Object to store selected seats for each bus
    let selectedSeats = {};

   // Loop through each bus and generate seat elements dynamically
    buses.forEach(bus => {
        const busId = bus.id;
        selectedSeats[busId] = [];

        // Create 5 seats for each bus
        for (let i = 1; i <= 5; i++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.id = `${busId}-seat${i}`;
            seat.textContent = i;

            // Add click event listener to toggle seat selection
            seat.addEventListener('click', () => {
                seat.classList.toggle('selected');
                if (seat.classList.contains('selected')) {
                    // If selected, add seat number to selectedSeats array
                    selectedSeats[busId].push(i);
                } else {
                     // If deselected, remove seat number from selectedSeats array
                    selectedSeats[busId] = selectedSeats[busId].filter(seatNumber => seatNumber !== i);
                }
            });
            bus.appendChild(seat);
        }
    });

    // Event listener for reserve button
    reserveButton.addEventListener('click', () => {
        const selectedDate = dateInput.value;
        const selectedLocation = locationSelect.value;

        // Validate if both date and location are selected
        if (!selectedDate || !selectedLocation) {
            message.textContent = "Please select a date and location.";
            return;
        }

        // Construct reservation details message
        let reservationDetails = "";
        for (const busId in selectedSeats) {
            if (selectedSeats[busId].length > 0) {
                reservationDetails += `${busId}: Seats ${selectedSeats[busId].join(', ')}\n`;
            }
        }
        // Display reservation details if seats are selected
        if (reservationDetails) {
            message.textContent = `Reservation confirmed for ${selectedLocation} on ${selectedDate}!\n${reservationDetails}`;
            // You would likely send this data to a server here.
        } else {
            message.textContent = "No seats selected.";
        }
    });

    // Event listener for reset button to clear selections
    resetButton.addEventListener('click', () => {
        buses.forEach(bus => {
            const busId = bus.id;
            selectedSeats[busId] = [];
            bus.querySelectorAll('.seat').forEach(seat => {
                seat.classList.remove('selected');
            });
        });

        // Clear message and reset input fields
        message.textContent = "";
        dateInput.value = "";
        locationSelect.selectedIndex = 0;
    });
});
