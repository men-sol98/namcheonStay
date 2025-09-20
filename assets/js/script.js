// document.addEventListener("DOMContentLoaded", function () {
//   // Smooth scroll for internal navigation links
//   const navLinks = document.querySelectorAll(".nav-links a, .book-now-btn");

//   navLinks.forEach((link) => {
//     link.addEventListener("click", function (e) {
//       const href = this.getAttribute("href");

//       // Check if the link is an internal anchor link (e.g., #features, #location)
//       if (href.startsWith("#")) {
//         e.preventDefault();
//         const targetId = href.substring(1);
//         const targetSection = document.getElementById(targetId);

//         if (targetSection) {
//           window.scrollTo({
//             top: targetSection.offsetTop, // Adjust offset for fixed header
//             behavior: "smooth",
//           });
//         }
//       }
//     });
//   });

//   // Handle "Book Now" and "View on Map" button clicks
//   const ctaButtons = document.querySelectorAll(
//     ".book-now-btn, .view-on-map-btn"
//   );

//   ctaButtons.forEach((button) => {
//     button.addEventListener("click", function (e) {
//       // Prevent default link behavior if not an anchor link
//       if (this.getAttribute("href") === "#") {
//         e.preventDefault();
//       }

//       // You can add an action here, like opening a booking form or a map modal
//       console.log("Button clicked:", this.textContent.trim());

//       // Example: Show a simple alert
//       // alert('Booking functionality is under development!');
//     });
//   });

//   // Add more interactive features here as needed
//   // Example: Animate elements on scroll
//   // function animateOnScroll() {
//   //     const sections = document.querySelectorAll('section');
//   //     sections.forEach(section => {
//   //         const sectionTop = section.getBoundingClientRect().top;
//   //         const windowHeight = window.innerHeight;
//   //
//   //         if (sectionTop < windowHeight * 0.75) {
//   //             section.classList.add('visible');
//   //         }
//   //     });
//   // }
//   // window.addEventListener('scroll', animateOnScroll);
//   // window.addEventListener('load', animateOnScroll);
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const navLinks = document.querySelectorAll(".nav-links a, .book-now-btn");
//   const navBar = document.querySelector(".nav");
//   const heroSection = document.querySelector(".hero-section");
//   const navBarHeight = 80;

//   // --- 스크롤 이벤트 리스너 추가 ---
//   function handleScroll() {
//     // hero-section의 높이 (스크롤 기준점)
//     const heroSectionHeight = heroSection.offsetHeight;

//     // 현재 스크롤 위치
//     const scrollPosition = window.scrollY;

//     if (scrollPosition > heroSectionHeight - navBarHeight) {
//       navBar.classList.add("nav-scrolled");
//     } else {
//       navBar.classList.remove("nav-scrolled");
//     }
//   }

//   // 초기 로드 시 한 번 호출
//   handleScroll();

//   // 스크롤 이벤트에 리스너 연결
//   window.addEventListener("scroll", handleScroll);
//   // --- 스크롤 이벤트 리스너 추가 끝 ---

//   navLinks.forEach((link) => {
//     link.addEventListener("click", function (e) {
//       const href = this.getAttribute("href");

//       if (href.startsWith("#")) {
//         e.preventDefault();
//         const targetId = href.substring(1);
//         const targetSection = document.getElementById(targetId);

//         if (targetSection) {
//           window.scrollTo({
//             top: targetSection.offsetTop - navBarHeight,
//             behavior: "smooth",
//           });
//         }
//       }
//     });
//   });

//   const ctaButtons = document.querySelectorAll(
//     ".book-now-btn, .view-on-map-btn"
//   );

//   ctaButtons.forEach((button) => {
//     button.addEventListener("click", function (e) {
//       if (this.getAttribute("href") === "#") {
//         e.preventDefault();
//       }
//       console.log("Button clicked:", this.textContent.trim());
//     });
//   });
// });

// function animateOnScroll() {
//   const sections = document.querySelectorAll("section");
//   sections.forEach((section) => {
//     const sectionTop = section.getBoundingClientRect().top;
//     const windowHeight = window.innerHeight;

//     if (sectionTop < windowHeight * 0.75) {
//       section.classList.add("visible");
//     }
//   });
// }
// window.addEventListener("scroll", animateOnScroll);
// window.addEventListener("load", animateOnScroll);

// document.addEventListener('DOMContentLoaded', function() {
//     // 여기에 'properties' 섹션으로 이동하는 링크를 추가합니다.
//     const navLinks = document.querySelectorAll('.nav-links a, .book-now-btn, .book-property-btn');
//     const navBar = document.querySelector('.nav');
//     const heroSection = document.querySelector('.hero-section');
//     const navBarHeight = 80;

//     function handleScroll() {
//         const heroSectionHeight = heroSection.offsetHeight;
//         const scrollPosition = window.scrollY;

//         if (scrollPosition > heroSectionHeight - navBarHeight) {
//             navBar.classList.add('nav-scrolled');
//         } else {
//             navBar.classList.remove('nav-scrolled');
//         }
//     }

//     handleScroll();
//     window.addEventListener('scroll', handleScroll);

//     navLinks.forEach(link => {
//         link.addEventListener('click', function(e) {
//             const href = this.getAttribute('href');

//             if (href.startsWith('#')) {
//                 e.preventDefault();
//                 const targetId = href.substring(1);
//                 const targetSection = document.getElementById(targetId);

//                 if (targetSection) {
//                     window.scrollTo({
//                         top: targetSection.offsetTop - navBarHeight,
//                         behavior: 'smooth'
//                     });
//                 }
//             }
//         });
//     });

//     const ctaButtons = document.querySelectorAll('.book-now-btn, .view-on-map-btn');

//     ctaButtons.forEach(button => {
//         button.addEventListener('click', function(e) {
//             if (this.getAttribute('href') === '#') {
//                 e.preventDefault();
//             }
//             console.log('Button clicked:', this.textContent.trim());
//         });
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
  // 모든 변수를 한 번만 선언
  const navBar = document.querySelector(".nav");
  const heroSection = document.querySelector(".hero-section");
  const navBarHeight = 80;

  // 모든 관련 링크와 버튼을 한 번에 선택
  const allLinksAndButtons = document.querySelectorAll(
    ".nav-links a, .book-now-btn, .book-property-btn, .view-on-map-btn"
  );

  // 스크롤 이벤트 핸들러
  function handleScroll() {
    const heroSectionHeight = heroSection.offsetHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition > heroSectionHeight - navBarHeight) {
      navBar.classList.add("nav-scrolled");
    } else {
      navBar.classList.remove("nav-scrolled");
    }
  }

  // 초기 로드 시 한 번 호출하고 스크롤 이벤트에 연결
  handleScroll();
  window.addEventListener("scroll", handleScroll);

  // 모든 링크와 버튼에 대해 이벤트 리스너를 한 번만 적용
  allLinksAndButtons.forEach((element) => {
    element.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // '#'으로 시작하는 내부 링크인 경우 스무스 스크롤 적용
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - navBarHeight,
            behavior: "smooth",
          });
        }
      }

      // '#'으로만 된 링크에 대한 콘솔 로그
      if (href === "#") {
        console.log("Button clicked:", this.textContent.trim());
      }
    });
  });

  // 애니메이션 스크롤 기능은 별도의 함수로 관리
  function animateOnScroll() {
    const sections = document.querySelectorAll("section");
    const windowHeight = window.innerHeight;

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("visible");
      }
    });
  }

  // 애니메이션 스크롤 이벤트 연결
  window.addEventListener("scroll", animateOnScroll);
  window.addEventListener("load", animateOnScroll);
});
