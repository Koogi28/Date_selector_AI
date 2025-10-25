document.getElementById("startButton").addEventListener("click", () => {
    const container = document.getElementById("buttonContainer");
    container.innerHTML = ""; // Clear previous buttons

    const input = document.getElementById("birthdayInput").value;
    if (!input) {
        alert("Please enter a valid birthday.");
        return;
    }

    const targetDate = input; // Format: YYYY-MM-DD
    const today = new Date();

    // Step 1: Create 1000 past dates
    const dates = [];
    for (let i = 0; i < 43000; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(date.toISOString().split("T")[0]);
    }

    // Step 2: Ensure birthday is included
    if (!dates.includes(targetDate)) {
        dates[Math.floor(Math.random() * dates.length)] = targetDate;
    }

    // Step 3: Shuffle the dates
    for (let i = dates.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dates[i], dates[j]] = [dates[j], dates[i]];
    }

    // Step 4: Create buttons with obfuscated text
    dates.forEach(dateStr => {
        const button = document.createElement("button");
        button.setAttribute("data-date", dateStr); // Store actual date for comparison

        // Build visual date from spans
        dateStr.split("").forEach(char => {
            const span = document.createElement("span");
            span.textContent = char;
            span.setAttribute("aria-hidden", "true"); // Hide from screen readers
            button.appendChild(span);
        });

        button.addEventListener("click", () => {
            if (button.getAttribute("data-date") === targetDate) {
                alert("🎉 You found your birthday!");
            } else {
                button.disabled = true;
            }
        });

        container.appendChild(button);
    });
});