   const Enterypoint = document.getElementById("Enterypoint");
    const slider = document.getElementById("slider");
    const slides = slider.querySelectorAll("img");
    const dotsContainer = document.getElementById("dots");
    let currentSlide = 0;

    function updateDots() {
      dotsContainer.innerHTML = "";
      slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.className = "dot-btn" + (i === currentSlide ? " active" : "");
        dot.onclick = () => {
          currentSlide = i;
          slider.scrollTo({ left: slider.clientWidth * currentSlide, behavior: "smooth" });
          updateDots();
        };
        dotsContainer.appendChild(dot);
      });
    }

    function autoSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      slider.scrollTo({ left: slider.clientWidth * currentSlide, behavior: "smooth" });
      updateDots();
    }

    setInterval(autoSlide, 3000); // auto-slide every 4 seconds

    window.onload = () => {
      updateDots();
      setTimeout(() => {
        Enterypoint.style.opacity = "0";
        setTimeout(() => {
          Enterypoint.style.display = "none";
        }, 500);
      }, 2500);
    };

    function hreflink(no) {
      const links = [
        "https://www.facebook.com/share/1DqfG8wyaS/",
        "https://www.instagram.com/global_online_classes",
        "https://www.youtube.com/@globalonlineclasses"
      ];
      if (links[no - 1]) location.href = links[no - 1];
    }
