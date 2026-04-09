document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. COUNTDOWN TIMER LOGIC (19/04/2026)
  // ==========================================
  const targetDate = new Date("2026-04-19T19:00:00+07:00").getTime();
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minutesEl = document.getElementById("cd-minutes");
  const secondsEl = document.getElementById("cd-seconds");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      if(daysEl) daysEl.innerText = "00";
      if(hoursEl) hoursEl.innerText = "00";
      if(minutesEl) minutesEl.innerText = "00";
      if(secondsEl) secondsEl.innerText = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(daysEl) daysEl.innerText = days.toString().padStart(2, "0");
    if(hoursEl) hoursEl.innerText = hours.toString().padStart(2, "0");
    if(minutesEl) minutesEl.innerText = minutes.toString().padStart(2, "0");
    if(secondsEl) secondsEl.innerText = seconds.toString().padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================
  // 2. SCROLL ANIMATION LOGIC (Hiện phần MAIN khi cuộn)
  // ==========================================
  const fadeElements = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  fadeElements.forEach(el => {
    appearOnScroll.observe(el);
  });

  // ==========================================
  // 3. BACKGROUND MUSIC LOGIC (AUTO-PLAY & LOOP)
  // ==========================================
  const bgMusic = document.getElementById("bg-music");
  const welcomeBtn = document.getElementById("guest-welcome");

  if (bgMusic) {
    bgMusic.loop = true; 
  }

  function playMusic() {
    if (bgMusic && bgMusic.paused) {
      bgMusic.play().then(() => {
        if (welcomeBtn) welcomeBtn.innerHTML = "✦ Âm nhạc đang phát ✦";
        removeMusicTriggers();
      }).catch(err => {
        // Chờ tương tác tiếp theo nếu trình duyệt chặn
      });
    }
  }

  const triggers = ["click", "scroll", "touchstart", "wheel"];
  function removeMusicTriggers() {
    triggers.forEach(evt => document.removeEventListener(evt, playMusic));
  }
  triggers.forEach(evt => document.addEventListener(evt, playMusic, { once: true }));

  // Logic nút Welcome cuộn xuống phần chính
  if (welcomeBtn) {
    welcomeBtn.addEventListener("click", () => {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

// ==========================================
// 4. CÁC HÀM TIỆN ÍCH (Global)
// ==========================================
function addToCalendar() {
  const title = encodeURIComponent("CCV Birthday Party");
  const details = encodeURIComponent("Birthday invitation for the Vinh University Youth Union Media Team");
  const location = encodeURIComponent("Duy Tan Hotel, Vinh City, Vietnam");
  const startDate = "20260419T120000Z"; 
  const endDate = "20260419T150000Z"; 
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  window.open(googleCalendarUrl, '_blank');
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if(toast) {
    toast.innerText = message;
    toast.className = "toast show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
  }
}