(()=>{document.getElementById("main-body");const t=document.getElementById("insta_notify_btn"),e=document.getElementById("yt_notify_btn");t.addEventListener("click",(()=>{"Enable"===t.innerText?(t.innerText="Disable",localStorage.setItem("insta_notify_btn","Disable"),t.innerText=localStorage.getItem("insta_notify_btn")):(t.innerText="Enable",localStorage.setItem("insta_notify_btn","Enable"),t.innerText=localStorage.getItem("insta_notify_btn"))})),e.addEventListener("click",(()=>{"Enable"===e.innerText?(e.innerText="Disable",localStorage.setItem("yt_notify_btn","Disable"),e.innerText=localStorage.getItem("yt_notify_btn")):(e.innerText="Enable",localStorage.setItem("yt_notify_btn","Enable"),e.innerText=localStorage.getItem("yt_notify_btn"))}))})();