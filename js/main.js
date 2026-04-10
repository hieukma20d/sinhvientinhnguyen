document.addEventListener("DOMContentLoaded", function() {
  // ==========================================
  // 1. COUNTDOWN TIMER (19/04/2026)
  // ==========================================
  const targetDate = new Date("2026-04-19T19:00:00+10:00").getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minutesEl = document.getElementById("cd-minutes");
    const secondsEl = document.getElementById("cd-seconds");

    if (distance < 0) {
      if(daysEl) daysEl.innerText = "00";
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

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ==========================================
  // 2. SCROLL ANIMATION (HIỆN PHẦN MAIN)
  // ==========================================
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  fadeElements.forEach(el => {
    appearOnScroll.observe(el);
  });

  // ==========================================
  // 3. NHẠC TỰ PHÁT KHI CUỘN TRANG (LOOP)
  // ==========================================
  const bgMusic = document.getElementById("bg-music");
  const welcomeBtn = document.getElementById("guest-welcome");

  if (bgMusic) {
    bgMusic.loop = true; // Phát đi phát lại
  }

  function startMusic() {
    if (bgMusic && bgMusic.paused) {
      bgMusic.play().then(() => {
        if (welcomeBtn) welcomeBtn.innerHTML = "✦ Âm nhạc đang phát ✦";
        // Gỡ bỏ sự kiện sau khi phát thành công
        window.removeEventListener("scroll", startMusic);
        document.removeEventListener("click", startMusic);
        document.removeEventListener("touchstart", startMusic);
      }).catch(err => {
        console.log("Đợi tương tác...");
      });
    }
  }

  // Kích hoạt ngay khi người dùng cuộn trang hoặc chạm vào web
  window.addEventListener("scroll", startMusic);
  document.addEventListener("click", startMusic);
  document.addEventListener("touchstart", startMusic);

  // Cuộn xuống khi nhấn nút Welcome
  if (welcomeBtn) {
    welcomeBtn.addEventListener("click", function() {
      const mainContent = document.getElementById('main-content');
      if (mainContent) mainContent.scrollIntoView({ behavior: 'smooth' });
    });
  }
});

// Các hàm phụ (Lịch, Toast) để ngoài DOMContentLoaded
function addToCalendar() {
  const title = encodeURIComponent("CCV Birthday Party");
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260419T120000Z/20260419T150000Z`;
  window.open(url, '_blank');
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if(toast) {
    toast.innerText = msg;
    toast.className = "toast show";
    setTimeout(() => { toast.className = "toast"; }, 3000);
  }
}