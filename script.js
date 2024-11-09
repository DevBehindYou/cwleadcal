// JavaScript for SEO Improvement Calculator
function validateAndCalculate() {
    const website = document.getElementById("website").value;
    const traffic = parseInt(document.getElementById("traffic").value);
    const leads = parseInt(document.getElementById("leads").value);

    if (!website || isNaN(traffic) || isNaN(leads) || leads <= 0 || leads > traffic){
        showPopup("Please fill in all fields, ensure leads and traffic are valid numbers, and leads do not exceed traffic.");
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

let score = 0; // Score scaled to 1-50

// Calculate score based on traffic-to-lead ratio
if (est >= 0.06) {
    score = 49;
} else if (est >= 0.05 && est < 0.06) {
    score = 36;
} else if (est >= 0.04 && est < 0.05) {
    score = 29;
} else if (est >= 0.03 && est < 0.04) {
    score = 23;
} else if (est >= 0.02 && est < 0.03) {
    score = 19;
} else if (est >= 0.01 && est < 0.02) {
    score = 13;
} else if (est >= 0.005 && est < 0.01) {
    score = 9;
} else if (est > 0) {
    score = 5;
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
    document.querySelector(".description-cta").classList.add("fade-in"); // Apply fade-in to description-cta
}, 300); // Add a slight delay if desired

// Update the gauge with the calculated score
updateGauge(score);
}

function toggleLoader(show) {
    const loaderOverlay = document.getElementById("loadingOverlay");
    loaderOverlay.style.display = show ? 'flex' : 'none';
}

function showPopup(message) {
const popupMessage = document.getElementById("popupMessage");
popupMessage.innerHTML = message; // Use innerHTML to allow HTML tags like <br>
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

overlayNumber.textContent = score;

// Update descriptive text based on score
let description;
if (score >= 49 && score <= 100) {
    description = "Your SEO Score is Outstanding";
    gaugeImage.src = "07.webp";
    chartImage.src = "c07.webp";
} else if (score >= 36 && score < 49) {
    description = "Your SEO Score is Excellent";
    gaugeImage.src = "06.webp";
    chartImage.src = "c06.webp";
} else if (score >= 29 && score < 36) {
    description = "Your SEO Score is Very Good";
    gaugeImage.src = "05.webp";
    chartImage.src = "c05.webp";
} else if (score >= 23 && score < 29) {
    description = "Your SEO Score is Good";
    gaugeImage.src = "04.webp";
    chartImage.src = "c04.webp";
} else if (score >= 19 && score < 23) {
    description = "Your SEO Score is Average";
    gaugeImage.src = "03.webp";
    chartImage.src = "c03.webp";
} else if (score >= 13 && score < 19) {
    description = "Your SEO Score is below Average";
    gaugeImage.src = "02.webp";
    chartImage.src = "c02.webp";
} else {
    description = "Your SEO Score is Poor";
    gaugeImage.src = "01.webp";
    chartImage.src = "c01.webp";
}

overlayText.textContent = description;
}
    function goBack() {
        // Show the form and hide the report
        document.querySelector(".form-container").style.display = "block";
        document.getElementById("report-container").style.display = "none";
    }

// Additional JavaScript functions ...
