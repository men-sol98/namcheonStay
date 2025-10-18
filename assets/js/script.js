document.addEventListener("DOMContentLoaded", function () {
  // 모든 변수를 한 번만 선언
  const navBar = document.querySelector(".nav");
  const heroSection = document.querySelector(".hero");
  const navBarHeight = 80;

  // 모든 관련 링크와 버튼을 한 번에 선택
  const allLinksAndButtons = document.querySelectorAll(
    ".nav-links a, .hero-link, .cta-btn"
  );

  // 햄버거 메뉴와 내비게이션 메뉴 선택
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav");

  // 스크롤 이벤트 핸들러: 스크롤 시 내비게이션 바 스타일 변경
  function handleScroll() {
    if (heroSection) {
      const heroSectionHeight = heroSection.offsetHeight;
      const scrollPosition = window.scrollY;

      if (scrollPosition > heroSectionHeight - navBarHeight) {
        navBar.classList.add("nav-scrolled");
      } else {
        navBar.classList.remove("nav-scrolled");
      }
    }
  }

  // 초기 로드 시 한 번 호출하고 스크롤 이벤트에 연결
  handleScroll();
  window.addEventListener("scroll", handleScroll);

  // 스크롤 스파이: 현재 섹션에 해당하는 내비 링크 활성화
  const sectionIds = [
    "#concept",
    "#experience",
    "#exp-program",
    "#story",
    "#rooms",
    "#cta",
  ]; // 존재하는 섹션만 활성화됨
  const sections = sectionIds
    .map((id) => document.querySelector(id))
    .filter(Boolean);
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

  function updateActiveNav() {
    const scrollPos = window.scrollY + navBarHeight + 20; // 헤더 보정 + 여유
    let currentId = null;
    for (const sec of sections) {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        currentId = `#${sec.id}`;
        break;
      }
    }
    navLinks.forEach((a) => {
      if (!currentId) {
        a.classList.remove("active");
        return;
      }
      if (a.getAttribute("href") === currentId) {
        a.classList.add("active");
      } else {
        a.classList.remove("active");
      }
    });
  }

  updateActiveNav();
  window.addEventListener("scroll", updateActiveNav);

  // 모든 링크와 버튼에 대한 이벤트 리스너를 한 번만 적용
  allLinksAndButtons.forEach((element) => {
    element.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // '#'으로 시작하는 내부 링크인 경우에만 스무스 스크롤 적용
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(href);

        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - navBarHeight,
            behavior: "smooth",
          });
        }

        // 햄버거 메뉴가 열려있을 경우 메뉴 닫기
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
        }
      }
      // 외부 링크(예: 예약 폼)는 기본 동작 유지
    });
  });

  // 햄버거 메뉴 클릭 이벤트
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
});
