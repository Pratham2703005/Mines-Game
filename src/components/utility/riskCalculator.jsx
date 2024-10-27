// utils/riskCalculator.js

// Function to calculate risk percentage based on mines and betting amount
function calculateRiskPercentage(mines, betAmount, maxBet = 1000) {
    const maxMines = 25;        // Maximum number of mines
    const minesWeight = 0.6;    // Weight for mines
    const betWeight = 0.4;      // Weight for betting amount

    // Validate inputs
    if (mines < 0 || mines > maxMines) {
        throw new Error("Mines must be between 0 and 25");
    }
    if (betAmount < 0 || betAmount > maxBet) {
        throw new Error(`Bet amount must be between 0 and ${maxBet}`);
    }

    // Calculate weighted risk
    const minesRisk = (mines / maxMines) * minesWeight;
    const betRisk = (betAmount / maxBet) * betWeight;

    const riskPercentage = (minesRisk + betRisk) * 100;
    return riskPercentage.toFixed(2);  // Return a string with 2 decimal places
}

// Export the function
export default calculateRiskPercentage;
