// ===============================
// AI Fake News Detection
// script.js
// ===============================

// Elements
const textarea = document.getElementById("news");
const counter = document.getElementById("count");
const form = document.querySelector("form");
const loading = document.getElementById("loading");
const clearBtn = document.getElementById("clearBtn");

// -----------------------------
// Character Counter
// -----------------------------
if (textarea && counter) {

    counter.textContent = textarea.value.length;

    textarea.addEventListener("input", () => {

        counter.textContent = textarea.value.length;

        // Limit color
        if (textarea.value.length > 4500) {
            counter.style.color = "#ef4444";
        } else {
            counter.style.color = "#ffffff";
        }

    });

}

// -----------------------------
// Clear Button
// -----------------------------
if (clearBtn) {

    clearBtn.addEventListener("click", () => {

        textarea.value = "";

        counter.textContent = "0";

        textarea.focus();

    });

}

// -----------------------------
// Loading Animation
// -----------------------------
if (form && loading) {

    form.addEventListener("submit", function () {

        loading.style.display = "flex";

    });

}

// -----------------------------
// Auto Resize Textarea
// -----------------------------
if (textarea) {

    textarea.addEventListener("input", function () {

        this.style.height = "220px";

        this.style.height = this.scrollHeight + "px";

    });

}

// -----------------------------
// Fade In Result
// -----------------------------
const result = document.querySelector(".result");

if (result) {

    result.style.opacity = "0";

    setTimeout(() => {

        result.style.transition = "0.8s";

        result.style.opacity = "1";

    }, 300);

}

// -----------------------------
// Button Click Effect
// -----------------------------
const predictBtn = document.querySelector(".predict-btn");

if (predictBtn) {

    predictBtn.addEventListener("click", () => {

        predictBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Analyzing...';

    });

}

// -----------------------------
// Smooth Scroll
// -----------------------------
window.scrollTo({

    top: 0,

    behavior: "smooth"

});

// -----------------------------
// Welcome Animation
// -----------------------------
window.addEventListener("load", () => {

    const container = document.querySelector(".container");

    if (container) {

        container.style.opacity = "0";

        container.style.transform = "translateY(30px)";

        setTimeout(() => {

            container.style.transition = "0.8s";

            container.style.opacity = "1";

            container.style.transform = "translateY(0)";

        }, 200);

    }

});

// -----------------------------
// Toast Notification
// -----------------------------
function showToast(message, color = "#22c55e") {

    let toast = document.createElement("div");

    toast.innerHTML = message;

    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.right = "30px";
    toast.style.padding = "15px 25px";
    toast.style.background = color;
    toast.style.color = "#fff";
    toast.style.borderRadius = "10px";
    toast.style.fontWeight = "600";
    toast.style.boxShadow = "0 10px 25px rgba(0,0,0,.3)";
    toast.style.zIndex = "9999";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

// -----------------------------
// Empty Text Validation
// -----------------------------
if (form) {

    form.addEventListener("submit", function (e) {

        if (textarea.value.trim() === "") {

            e.preventDefault();

            loading.style.display = "none";

            showToast("Please enter a news article.", "#ef4444");

        }

    });

}