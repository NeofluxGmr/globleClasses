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



    function BCE(no) {
    const clicked = document.getElementById(no);

    if (no == 0) {
        mobmenu(0);
    }
    else if (no == 1){
            window.location.reload()  
    } 
    else if (no == 2){
       window.location.href = "pages/About.html"
    }
      else if (no == 3){
       window.location.href = "pages/contact.html"
    }

    // Apply pressed effect
    clicked.style.boxShadow = "5px 5px 5px rgba(255, 255, 255, 0)";
    clicked.style.transform = "translateX(5px) translateY(5px)";

    setTimeout(() => {
        // Revert effect
        clicked.style.transform = "translateX(0px) translateY(0px)";
        clicked.style.boxShadow = "5px 5px 5px rgba(0, 0, 0, 0.829)";
    }, 300);
}

function mobmenu(callby) {
    const menu = document.getElementById("mobmenu");

    if (callby == 0) {
        menu.style.left = "-500px";
    } else if (callby == 1) {
        menu.style.left = "0px";
    }
}

