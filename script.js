document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================
     1. HERO INTRO VIDEO (60fps requestAnimationFrame for instant text reveal)
     =================================================== */
  const videoSection = document.getElementById('hero-video-section');
  const heroVideo = document.getElementById('hero-video');
  const heroTextOverlay = document.getElementById('hero-text-overlay');
  let videoStarted = false;
  let overlayRevealed = false;

  function showOverlayInstantly() {
    if (overlayRevealed) return;
    overlayRevealed = true;

    if (heroTextOverlay) {
      heroTextOverlay.classList.remove('hidden-overlay');
      heroTextOverlay.classList.add('visible-overlay');
    }
    document.body.classList.remove('intro-active');
  }

  if (videoSection && heroVideo) {
    videoSection.addEventListener('click', () => {
      if (!videoStarted) {
        videoStarted = true;
        
        heroVideo.play().then(() => {
          // 60fps precise frame checker loop to eliminate browser event delay
          function checkFrame() {
            if (heroVideo.duration && (heroVideo.currentTime >= heroVideo.duration - 0.35)) {
              heroVideo.pause();
              showOverlayInstantly();
              return;
            }
            if (!overlayRevealed && !heroVideo.ended) {
              requestAnimationFrame(checkFrame);
            }
          }
          requestAnimationFrame(checkFrame);

        }).catch(err => {
          console.error('Video play error:', err);
          showOverlayInstantly();
        });
      }
    });

    // Backup event listeners for safety
    heroVideo.addEventListener('ended', () => {
      heroVideo.pause();
      showOverlayInstantly();
    });

    heroVideo.addEventListener('pause', () => {
      if (videoStarted && heroVideo.currentTime > 0.5) {
        showOverlayInstantly();
      }
    });
  }

  /* ===================================================
     2. LIVE COUNTDOWN TIMER
     =================================================== */
  const weddingDate = new Date('November 21, 2026 00:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const dEl = document.getElementById('cd-days');
      const hEl = document.getElementById('cd-hours');
      const mEl = document.getElementById('cd-mins');
      const sEl = document.getElementById('cd-secs');

      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(mins).padStart(2, '0');
      if (sEl) sEl.textContent = String(secs).padStart(2, '0');
    }
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

});
