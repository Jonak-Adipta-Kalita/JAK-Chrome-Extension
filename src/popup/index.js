const insta_notify_btn = document.getElementById("insta_notify_btn");
const yt_notify_btn = document.getElementById("yt_notify_btn");

insta_notify_btn.addEventListener("click", () => {
    if (insta_notify_btn.innerText === "Enable") {
        insta_notify_btn.innerText = "Disable";
        localStorage.setItem("insta_notify_btn", "Disable");
        insta_notify_btn.innerText = localStorage.getItem("insta_notify_btn");
    } else {
        insta_notify_btn.innerText = "Enable";
        localStorage.setItem("insta_notify_btn", "Enable");
        insta_notify_btn.innerText = localStorage.getItem("insta_notify_btn");
    }
});

yt_notify_btn.addEventListener("click", () => {
    if (yt_notify_btn.innerText === "Enable") {
        yt_notify_btn.innerText = "Disable";
        localStorage.setItem("yt_notify_btn", "Disable");
        yt_notify_btn.innerText = localStorage.getItem("yt_notify_btn");
    } else {
        yt_notify_btn.innerText = "Enable";
        localStorage.setItem("yt_notify_btn", "Enable");
        yt_notify_btn.innerText = localStorage.getItem("yt_notify_btn");
    }
});
