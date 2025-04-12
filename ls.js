const symbols = ["🍒", "🍋", "⭐️", "💎", "7"];

let coins = 0;
let loyaltyPoints = 40000; // Set initial loyalty points to 40,000

function spin() {
  const slot1 = document.getElementById("slot1");
  const slot2 = document.getElementById("slot2");
  const slot3 = document.getElementById("slot3");
  const result = document.getElementById("result");
  const coinCount = document.getElementById("coinCount");
  const loyaltyPointsDisplay = document.getElementById("loyaltyPoints");
  const spinsLeftDisplay = document.getElementById("spinsLeft");

  // Check if there are enough loyalty points
  if (loyaltyPoints < 500) {
    result.textContent = "You've run out of loyalty points!";
    return;
  }

  // Deduct loyalty points per spin
  loyaltyPoints -= 500;

  // Add spin animation
  slot1.classList.add("spin-animation");
  slot2.classList.add("spin-animation");
  slot3.classList.add("spin-animation");

  setTimeout(() => {
    const s1 = symbols[Math.floor(Math.random() * symbols.length)];
    const s2 = symbols[Math.floor(Math.random() * symbols.length)];
    const s3 = symbols[Math.floor(Math.random() * symbols.length)];

    // If you're using emojis, just use textContent
    slot1.textContent = s1;
    slot2.textContent = s2;
    slot3.textContent = s3;

    slot1.classList.remove("spin-animation");
    slot2.classList.remove("spin-animation");
    slot3.classList.remove("spin-animation");

    // Winning logic
    if (s1 === s2 && s2 === s3) {
      result.textContent = "Jackpot! You win!";
      coins += 10;
    } else {
      result.textContent = "Try again!";
    }

    // Update UI
    coinCount.textContent = coins;
    loyaltyPointsDisplay.textContent = loyaltyPoints;
    spinsLeftDisplay.textContent = Math.floor(loyaltyPoints / 500);
  }, 600);
}
