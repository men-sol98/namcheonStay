// 다국어 지원 시스템
let currentLanguage = "ko";
let translations = {};

// 언어 파일 로드
async function loadLanguage(lang) {
  try {
    console.log(`Loading language file: ${lang}.json`);
    const response = await fetch(`./assets/lang/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load language file: ${lang}`);
    }
    const data = await response.json();
    translations[lang] = data;
    console.log(
      `✓ Successfully loaded ${
        Object.keys(data).length
      } translations for ${lang}`
    );
    return data;
  } catch (error) {
    console.error(`✗ Error loading language ${lang}:`, error);
    // 기본 언어(한국어)로 폴백
    if (lang !== "ko") {
      console.log(`Falling back to Korean...`);
      return await loadLanguage("ko");
    }
    return {};
  }
}

// 언어 변경 함수
async function changeLanguage(lang) {
  try {
    console.log(`Changing language to: ${lang}`);

    // 이미 로드된 번역이 있으면 사용, 없으면 로드
    if (!translations[lang]) {
      console.log(`Language ${lang} not cached, loading...`);
      await loadLanguage(lang);
    } else {
      console.log(`Using cached translations for ${lang}`);
    }

    const langData = translations[lang];
    if (!langData) {
      console.error(`No translations found for language: ${lang}`);
      return;
    }

    // 모든 번역 요소 업데이트
    const elements = document.querySelectorAll("[data-i18n]");
    console.log(
      `Found ${elements.length} elements to translate for language: ${lang}`
    );

    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = langData[key];

      if (translation) {
        // HTML 태그가 포함된 경우 innerHTML 사용, 그렇지 않으면 textContent 사용
        if (translation.includes("<br />") || translation.includes("<br>")) {
          element.innerHTML = translation;
        } else {
          element.textContent = translation;
        }
        // console.log(`✓ Translated: ${key} -> ${translation.substring(0, 50)}...`);
      } else {
        console.warn(
          `✗ Translation missing for key: ${key} in language: ${lang}`
        );
      }
    });

    // 현재 언어 업데이트
    currentLanguage = lang;

    // 선택한 언어를 localStorage에 저장
    localStorage.setItem("preferredLanguage", lang);

    // 언어 버튼 활성화 상태 업데이트
    console.log(`Updating language buttons for: ${lang}`);
    updateLanguageButtons(lang);

    // HTML lang 속성 업데이트
    document.documentElement.lang = lang;

    console.log(`✓ Language successfully changed to: ${lang}`);
  } catch (error) {
    console.error("Error changing language:", error);
  }
}

// 언어 버튼 활성화 상태 업데이트
function updateLanguageButtons(activeLang) {
  const buttons = document.querySelectorAll(".lang-switch button");
  console.log(`Found ${buttons.length} language buttons`);

  buttons.forEach((button, index) => {
    button.classList.remove("active");

    // 버튼의 onclick 속성에서 언어 코드 추출
    const onclickAttr = button.getAttribute("onclick");
    if (onclickAttr) {
      const langCode = onclickAttr.match(/changeLanguage\('(\w+)'\)/);
      if (langCode && langCode[1] === activeLang) {
        button.classList.add("active");
        // console.log(`✓ Button ${index + 1} activated for language: ${activeLang}`);
      } else {
        console.log(
          `- Button ${index + 1} (${
            langCode ? langCode[1] : "unknown"
          }) not active`
        );
      }
    } else {
      console.warn(`Button ${index + 1} has no onclick attribute`);
    }
  });
}

// 언어 코드를 언어 이름으로 변환
function getLanguageName(langCode) {
  const languageNames = {
    ko: "한국어",
    en: "English",
    jp: "日本語",
    tw: "繁體中文",
  };
  return languageNames[langCode] || langCode;
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("🌍 Initializing i18n system...");

    // 저장된 언어 설정 불러오기
    let savedLang = localStorage.getItem("preferredLanguage") || "ko";
    console.log(`Saved language from localStorage: ${savedLang}`);

    // 브라우저 언어 감지 (저장된 설정이 없는 경우)
    if (!localStorage.getItem("preferredLanguage")) {
      const browserLang = navigator.language || navigator.userLanguage;
      console.log(`Browser language detected: ${browserLang}`);

      if (browserLang.startsWith("en")) {
        savedLang = "en";
        console.log("Setting language to English based on browser");
      } else if (browserLang.startsWith("ja")) {
        savedLang = "jp"; // 일본어 코드 수정
        console.log("Setting language to Japanese based on browser");
      } else if (
        browserLang.startsWith("zh-TW") ||
        browserLang.startsWith("zh-Hant")
      ) {
        savedLang = "tw";
        console.log("Setting language to Traditional Chinese based on browser");
      } else {
        console.log("Using default Korean language");
      }
    }

    // 언어 변경
    console.log(`Final language to load: ${savedLang}`);
    await changeLanguage(savedLang);
    console.log("✅ i18n system initialized successfully");
  } catch (error) {
    console.error("❌ Error initializing language:", error);
    // 오류 발생 시 기본 언어로 설정
    await changeLanguage("ko");
  }
});

// 언어 변경 함수를 전역으로 노출
window.changeLanguage = changeLanguage;

// 디버깅을 위한 전역 함수들
window.i18nDebug = {
  // 현재 언어 확인
  getCurrentLanguage: () => currentLanguage,

  // 로드된 번역 확인
  getLoadedTranslations: () => Object.keys(translations),

  // 특정 언어의 번역 확인
  getTranslations: (lang) => translations[lang],

  // 번역 키 확인
  checkTranslationKey: (key) => {
    const result = {};
    Object.keys(translations).forEach((lang) => {
      result[lang] = translations[lang][key];
    });
    return result;
  },

  // 모든 번역 요소 확인
  getAllTranslationElements: () => {
    const elements = document.querySelectorAll("[data-i18n]");
    return Array.from(elements).map((el) => ({
      element: el,
      key: el.getAttribute("data-i18n"),
      text: el.textContent,
      html: el.innerHTML,
    }));
  },

  // 언어 버튼 상태 확인
  getLanguageButtons: () => {
    const buttons = document.querySelectorAll(".lang-switch button");
    return Array.from(buttons).map((btn, index) => ({
      index,
      text: btn.textContent,
      onclick: btn.getAttribute("onclick"),
      hasActive: btn.classList.contains("active"),
    }));
  },

  // 언어 전환 테스트
  testLanguageChange: async (lang) => {
    console.log(`🧪 Testing language change to: ${lang}`);
    try {
      await changeLanguage(lang);
      console.log(`✅ Language change test successful for: ${lang}`);
      return true;
    } catch (error) {
      console.error(`❌ Language change test failed for: ${lang}`, error);
      return false;
    }
  },
};
