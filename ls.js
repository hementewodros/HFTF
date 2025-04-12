const symbols = [
  "wine.jpg",   // Replace with image URL for Cherry
  "gursha.jpg",    // Replace with image URL for Lemon
  "game.jpg",     // Replace with image URL for Star
  "room.jpg",  // Replace with image URL for Diamond
  "seven.png"     // Replace with image URL for Seven
];

let coins = 0;
let loyaltyPoints = 40000; // Set initial loyalty points to 40,000

function spin() {
  // Check if there are enough loyalty points
  if (loyaltyPoints < 500) {
    document.getElementById("result").textContent = "You've run out of loyalty points!";
    return;
  }

  const slot1 = document.getElementById("slot1");
  const slot2 = document.getElementById("slot2");
  const slot3 = document.getElementById("slot3");
  const result = document.getElementById("result");
  const coinCount = document.getElementById("coinCount");
  const loyaltyPointsDisplay = document.getElementById("loyaltyPoints"); // Update this to show loyalty points
  const spinsLeftDisplay = document.getElementById("spinsLeft"); // Display the loyalty points in this span

  // Add spin animation
  slot1.classList.add("spin-animation");
  slot2.classList.add("spin-animation");
  slot3.classList.add("spin-animation");

  // Randomize symbols for slots
  setTimeout(() => {
    const s1 = symbols[Math.floor(Math.random() * symbols.length)];
    const s2 = symbols[Math.floor(Math.random() * symbols.length)];
    const s3 = symbols[Math.floor(Math.random() * symbols.length)];

    // Replace the slot text with image for each slot
    slot1.innerHTML = `<img src="${s1}" alt="slot1" class="slot-image">`;
    slot2.innerHTML = `<img src="${s2}" alt="slot2" class="slot-image">`;
    slot3.innerHTML = `<img src="${s3}" alt="slot3" class="slot-image">`;

    // Remove the spin animation class after animation is complete
    slot1.classList.remove("spin-animation");
    slot2.classList.remove("spin-animation");
    slot3.classList.remove("spin-animation");

    // Check if all three symbols are the same for scoring
    if (s1 === s2 && s2 === s3) {
      result.textContent = "Jackpot! You win!";
      coins += 10; // Add coins for jackpot
    } else {
      result.textContent = "Try again!";
    }

    // Update coin count and loyalty points
    coinCount.textContent = coins;
    loyaltyPoints -= 500; // Deduct 500 loyalty points per spin
    loyaltyPointsDisplay.textContent = loyaltyPoints; // Update the loyalty points on the display
    spinsLeftDisplay.textContent = loyaltyPoints; // Display remaining loyalty points in the span

  }, 600); // Set timeout duration to match the animation time
}
