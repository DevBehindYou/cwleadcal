// JavaScript for SEO Improvement Calculator
function validateAndCalculate() {
    const website = document.getElementById("website").value;
    const websiteError = document.getElementById("websiteError");
    const urlPattern = /^(https:\/\/|www\.)/;
    const traffic = parseInt(document.getElementById("traffic").value);
    const leads = parseInt(document.getElementById("leads").value);

    if (!website || isNaN(traffic) || isNaN(leads) || leads <= 0 || leads > traffic){
        showPopup("Please fill in all fields, ensure leads and traffic are valid numbers, and leads do not exceed traffic.");
        return; // Stop further execution if validation fails
    } else  if (!urlPattern.test(website)) {
        showPopup('Please enter a valid URL starting with "www." or "https://. Examples: www.example.com, https://example.com.');
        return; // Stop further execution if validation fails
    } else {
        calculateImprovements(website, traffic, leads); // Proceed with calculation if URL is valid
    }       
}
async function calculateImprovements(website, traffic, leads) {
    // Show the loading overlay
    toggleLoader(true);
    
// Calculate the estimated traffic-to-lead ratio
const est = leads !== 0 ? leads / traffic : 0;

// Log values to check what's happening
console.log("Traffic:", traffic);
console.log("Leads:", leads);
console.log("Estimated Ratio (traffic/leads):", est);

let score = 0; // Score scaled to 1-100

// Calculate score based on traffic-to-lead ratio(overwriting the est var)
if (est >= 0.06) {
    score = (Math.ceil(est*2*100)+80) >= 100 ? 99: Math.ceil(est*2*100)+80;
} else if (est >= 0.05 && est < 0.06) {
    score = Math.ceil(est*2*100)+70;
} else if (est >= 0.04 && est < 0.05) {
    score = Math.ceil(est*2*100)+60;
} else if (est >= 0.03 && est < 0.04) {
    score = Math.ceil(est*2*100)+47;
} else if (est >= 0.02 && est < 0.03) {
    score = Math.ceil(est*2*100)+33;
} else if (est >= 0.01 && est < 0.02) {
    score = Math.ceil(est*2*100)+20;
} else if (est >= 0.005 && est < 0.01) {
    score =  Math.ceil(est*2*100)+10;
} else if (est > 0) {
    score = Math.ceil(est*2*100)+3;
} else {
    score = 1;
}


console.log("Calculated Score:", score);
// Store data in Supabase
try {
    await fetch(`https://oqwydkxpxvcoljunaejk.supabase.co/rest/v1/links`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xd3lka3hweHZjb2xqdW5hZWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NjU3NzYsImV4cCI6MjA0NTI0MTc3Nn0.HMO5VGmqsqyhQUUMeu0WDEWnOswcwbdtqoTXj9qHXR0',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xd3lka3hweHZjb2xqdW5hZWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NjU3NzYsImV4cCI6MjA0NTI0MTc3Nn0.HMO5VGmqsqyhQUUMeu0WDEWnOswcwbdtqoTXj9qHXR0`
        },
        body: JSON.stringify({
            website_link: website,
            site_traffic: traffic,
            leads: leads,
            score: score,
        })
    });
} catch (error) {
    console.error("An error. Acquiring information for you:", error);
}
await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay

// Hide the loading overlay
toggleLoader(false);
// Hide the form and show the report
document.querySelector(".form-container").style.display = "none";
document.getElementById("report-container").style.display = "block";

    // Apply animation to the report boxes
    setTimeout(() => {
    document.querySelector(".report-box").classList.add("fade-in");
    document.querySelector(".report-box-2").classList.add("fade-in");
    document.querySelector(".description-cta").classList.add("fade-in");
    }, 300);

    // Update the gauge with the calculated score
    updateGauge(score);
    run_guage(score);
}

function toggleLoader(show) {
    const loaderOverlay = document.getElementById("loadingOverlay");
    loaderOverlay.style.display = show ? 'flex' : 'none';
}

function showPopup(message) {
const popupMessage = document.getElementById("popupMessage");
popupMessage.innerHTML = message; 
document.getElementById("popupOverlay").style.display = "flex";
}

function closePopup(event) {
// Close popup only if the click is outside the popup-content
if (event.target.id === "popupOverlay" || event.target.tagName === "BUTTON") {
    document.getElementById("popupOverlay").style.display = "none";
}
}

function updateGauge(score) {
    const overlayNumber = document.getElementById("overlayNumber");
    const overlayText = document.getElementById("overlayText");
    const gaugeImage = document.querySelector(".gauge-image");
    const chartImage = document.querySelector(".chart-image");
    const dot = document.getElementById("indicator-dot");

    overlayNumber.textContent = score;

    // Remove existing score classes
    overlayNumber.classList.remove("score-veryhigh", "score-high", "score-medium", "score-low");

    // Update descriptive text and overlay number class based on score
    let description;
    let borderColor;
    if (score >= 88 && score <= 100) {
        description = "Your SEO Score is Outstanding";
        chartImage.src = "c07.webp";
        overlayNumber.classList.add("score-veryhigh"); // Very high score
        borderColor = "#6a0dad"; // Purple for outstanding
    } else if (score >= 75 && score < 88) {
        description = "Your SEO Score is Excellent";
        chartImage.src = "c06.webp";
        overlayNumber.classList.add("score-high"); // High score
        borderColor = "greenyellow"; // Green-yellow for excellent
    } else if (score >= 60 && score < 75) {
        description = "Your SEO Score is Very Good";
        chartImage.src = "c05.webp";
        overlayNumber.classList.add("score-medium"); // Medium score
        borderColor = "orange"; // Orange for very good
    } else if (score >= 45 && score < 60) {
        description = "Your SEO Score is Good";
        chartImage.src = "c04.webp";
        overlayNumber.classList.add("score-medium"); // Medium score
        borderColor = "orange"; // Orange for good
    } else if (score >= 25 && score < 45) {
        description = "Your SEO Score is Average";
        chartImage.src = "c03.webp";
        overlayNumber.classList.add("score-medium"); // Medium score
        borderColor = "orange"; // Red for average
    } else if (score >= 5 && score < 25) {
        description = "Your SEO Score is below Average";
        chartImage.src = "c02.webp";
        overlayNumber.classList.add("score-low"); // Low score
        borderColor = "red"; // Dark red for below average
    } else {
        description = "Your SEO Score is Poor";
        chartImage.src = "c01.webp";
        overlayNumber.classList.add("score-low"); // Low score
        borderColor = "red"; // Dark red for poor
    }
    overlayText.textContent = description;

    // Update the dot's border color
    dot.style.borderColor = borderColor;
}
    function goBack() {
        // Show the form and hide the report
        document.querySelector(".form-container").style.display = "block";
        document.getElementById("report-container").style.display = "none";
    }

    function openLink() {
        // CTA link
        window.open("https://content-whale.com/contact-customer", "_blank");
    }

    function run_guage(score){
    const targetScore = score/2; 
    const intermediateScores = [40, 20, 35]; // Intermediate scores to go through
    const dot = document.getElementById('indicator-dot');
    const canvas = document.getElementById('gauge-canvas');
    const ctx = canvas.getContext('2d');

    // Draw gauge image onto canvas
    const img = new Image();
    img.src = "01.webp"; // Replace with your image path
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // Constants for the arc
    const centerX = canvas.width / 2; // Center X of the arc
    const centerY = canvas.height - 26; // Adjust center Y (height-based)
    const radius = canvas.width / 2 - 17.5; // Adjust arc radius to match the visual design

    // Function to calculate dot position based on angle
    function calculateDotPosition(angle) {
        const radian = (angle - 90) * (Math.PI / 90); // Convert angle to radian
        const dotX = centerX + radius * Math.cos(radian);
        const dotY = centerY + radius * Math.sin(radian);
        return { x: dotX, y: dotY };
    }

    // Function to animate the dot
    function animateDot(startScore, endScore, duration, callback) {
        const step = (endScore - startScore) / (duration / 15); // Increment step based on duration
        let currentScore = startScore;

        const animation = setInterval(() => {
            if ((step > 0 && currentScore >= endScore) || (step < 0 && currentScore <= endScore)) {
                clearInterval(animation); // Stop animation when the target score is reached
                if (callback) callback(); // Call the callback function
                return;
            }

            currentScore += step; // Increment the score
            const angle = (currentScore / 100) * 180; // Map current score to angle
            const { x, y } = calculateDotPosition(angle);

            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;
        }, 20); // Update every 20ms
    }

    // Multi-stage animation
    let currentStage = 0;
    function runNextStage() {
        if (currentStage < intermediateScores.length) {
            // Animate to the next intermediate score
            animateDot(
                currentStage === 0 ? 0 : intermediateScores[currentStage - 1],
                intermediateScores[currentStage],
                1000,
                runNextStage
            );
            currentStage++;
        } else {
            // Animate to the final target score
            animateDot(intermediateScores[intermediateScores.length - 1], targetScore, 1000);
        }
    }

    // Start the animation
    runNextStage();
}

// Additional JavaScript functions ...
