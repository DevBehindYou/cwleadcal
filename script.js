function validateAndCalculate() {
    const website = document.getElementById("website").value;
    const websiteError = document.getElementById("websiteError");
    const urlPattern = /^(https:\/\/|www\.)/;

    if (!urlPattern.test(website)) {
        showPopup('Please enter a valid URL starting with "www." or "https://".<br>Examples: www.example.com, https://example.com.');
        return;
    } else {
        calculateImprovements();
    }
}

async function calculateImprovements() {
    toggleLoader(true);
    const website = document.getElementById("website").value;
    const traffic = parseInt(document.getElementById("traffic").value);
    const leads = parseInt(document.getElementById("leads").value);

    if (!website || isNaN(traffic) || isNaN(leads) || leads <= 0 || leads > traffic) {
        toggleLoader(false);
        showPopup("Please fill in all fields, ensure leads and traffic are valid numbers, and leads do not exceed traffic.");
        return;
    }

    const est = leads !== 0 ? leads / traffic : 0;
    let score = est >= 0.06 ? 49 : est >= 0.05 ? 36 : est >= 0.04 ? 29 : est >= 0.03 ? 23 : est >= 0.02 ? 19 : est >= 0.01 ? 13 : est >= 0.005 ? 9 : est > 0 ? 5 : 1;

    await new Promise(resolve => setTimeout(resolve, 2000));

    toggleLoader(false);
    document.querySelector(".form-container").style.display = "none";
    document.getElementById("report-container").style.display = "block";

    setTimeout(() => {
        document.querySelector(".report-box").classList.add("fade-in");
        document.querySelector(".report-box-2").classList.add("fade-in");
        document.querySelector(".description-cta").classList.add("fade-in");
    }, 300);

    updateGauge(score);
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
    if (event.target.id === "popupOverlay" || event.target.tagName === "BUTTON") {
        document.getElementById("popupOverlay").style.display = "none";
    }
}

function updateGauge(score) {
    const overlayNumber = document.getElementById("overlayNumber");
    const overlayText = document.getElementById("overlayText");
    overlayNumber.textContent = score;

    const description = score >= 49 ? "Your SEO Score is Outstanding" : score >= 36 ? "Your SEO Score is Excellent" : score >= 29 ? "Your SEO Score is Very Good" : score >= 23 ? "Your SEO Score is Good" : score >= 19 ? "Your SEO Score is Average" : score >= 13 ? "Your SEO Score is below Average" : "Your SEO Score is Poor";
    overlayText.textContent = description;
}

function goBack() {
    document.querySelector(".form-container").style.display = "block";
    document.getElementById("report-container").style.display = "none";
}
