const symbols = ["🍒", "🍋", "⭐️", "💎", "7"];

let coins = 0;
let loyaltyPoints = 40000; // Starting loyalty points

function spin() {
  const slot1 = document.getElementById("slot1");
  const slot2 = document.getElementById("slot2");
  const slot3 = document.getElementById("slot3");
  const result = document.getElementById("result");
  const loyaltyPointsDisplay = document.getElementById("loyaltyPoints");
  const spinsLeftDisplay = document.getElementById("spinsLeft");
  const coinCount = document.getElementById("coinCount"); // Added coinCount element

  const spinCost = 200; // Cost per spin

  // Check if user has enough points
  if (loyaltyPoints < spinCost) {
    result.textContent = "You've run out of loyalty points!";
    return;
  }

  // Deduct spin cost
  loyaltyPoints -= spinCost;

  // Add spin animation (ensure CSS class exists)
  slot1.classList.add("spin-animation");
  slot2.classList.add("spin-animation");
  slot3.classList.add("spin-animation");

  // Spin delay
  setTimeout(() => {
    const s1 = symbols[Math.floor(Math.random() * symbols.length)];
    const s2 = symbols[Math.floor(Math.random() * symbols.length)];
    const s3 = symbols[Math.floor(Math.random() * symbols.length)];

    // Set the slot symbols
    slot1.textContent = s1;
    slot2.textContent = s2;
    slot3.textContent = s3;

    // Remove animation
    slot1.classList.remove("spin-animation");
    slot2.classList.remove("spin-animation");
    slot3.classList.remove("spin-animation");

    // Check win condition
    if (s1 === s2 && s2 === s3) {
      result.textContent = `Jackpot! You got ${s1} ${s2} ${s3}`;
      loyaltyPoints += 3000;
      coins += 50; // Optional coin reward
    } else {
      result.textContent = `You got ${s1} ${s2} ${s3} — Try again!`;
    }

    // Update UI with formatted values
    coinCount.textContent = coins.toLocaleString(); // Formatting coins
    loyaltyPointsDisplay.textContent = loyaltyPoints.toLocaleString(); // Formatting loyalty points
    spinsLeftDisplay.textContent = Math.floor(loyaltyPoints / spinCost).toLocaleString(); // Formatting spins left
  }, 600);
}
