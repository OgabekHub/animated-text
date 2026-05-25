document.addEventListener("DOMContentLoaded", () => {
    // DOM Elementlari
    const textInput = document.getElementById("textInput");
    const textDisplay = document.getElementById("textDisplay");
    const effectsGrid = document.getElementById("effectsGrid");
    const fontSelect = document.getElementById("fontSelect");
    const fontSizeRange = document.getElementById("fontSizeRange");
    const fontSizeVal = document.getElementById("fontSizeVal");
    const letterSpacingRange = document.getElementById("letterSpacingRange");
    const letterSpacingVal = document.getElementById("letterSpacingVal");
    const speedRange = document.getElementById("speedRange");
    const speedVal = document.getElementById("speedVal");
    const delayRange = document.getElementById("delayRange");
    const delayVal = document.getElementById("delayVal");
    const primaryColor = document.getElementById("primaryColor");
    const secondaryColor = document.getElementById("secondaryColor");
    const textColor = document.getElementById("textColor");
    const previewArena = document.getElementById("previewArena");
    
    // Kod Eksport & Tabs
    const codeOutput = document.getElementById("codeOutput");
    const copyBtn = document.getElementById("copyBtn");
    const tabBtns = document.querySelectorAll(".tab-btn");
    const arenaBtns = document.querySelectorAll(".arena-btn");
    const toastMsg = document.getElementById("toastMsg");

    // Hozirgi holat (State)
    let currentEffect = "bounce";
    let activeTab = "html";
    let arenaBackground = "dark";

    // CSS animatsiyalar shablonlari (Eksport qilish uchun)
    const animationTemplates = {
        bounce: (primary, secondary, speed, textColor) => `/* 3D Bounce Animation Uslubi */
.text-display span {
    display: inline-block;
    position: relative;
    white-space: pre;
    top: 20px;
    color: ${textColor};
    text-shadow: 0 1px 0 #374151, 0 2px 0 #374151, 0 3px 0 #374151,
                 0 4px 0 #1f2937, 0 5px 0 #1f2937, 0 6px 0 transparent, 0 7px 0 transparent, 0 8px 0 transparent, 0 9px 0 transparent, 0 10px 10px rgba(0, 0, 0, 0.4);
    animation-delay: var(--delay);
    animation-duration: var(--duration, ${speed}s);
    animation-name: effectBounce;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease;
    transition: all 0.1s ease;
}

@keyframes effectBounce {
    0% {
        transform: scale(1) rotate(0deg);
        filter: drop-shadow(0 0 0px rgba(255, 200, 100, 0.6));
    }
    50% {
        transform: scale(1.1) rotate(-2deg);
        filter: drop-shadow(0 0 15px rgba(255, 120, 50, 0.8));
    }
    100% {
        top: -20px;
        transform: scale(1) rotate(2deg);
        filter: drop-shadow(0 0 20px rgba(236, 72, 153, 1));
        text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc, 0 5px 0 #ccc, 0 6px 0 #ccc, 0 7px 0 #ccc, 0 8px 0 #ccc, 0 9px 0 #ccc, 60px 30px rgba(0, 0, 0, 0.3);
    }
}`,
        neon: (primary, secondary, speed, textColor) => `/* Neon Cyber Glow Animation Uslubi */
.text-display span {
    display: inline-block;
    position: relative;
    white-space: pre;
    animation-delay: var(--delay);
    color: ${textColor};
    animation: effectNeon ${speed}s ease-in-out infinite alternate;
}

@keyframes effectNeon {
    0% {
        text-shadow: 0 0 4px ${textColor},
                     0 0 10px ${primary},
                     0 0 20px ${primary},
                     0 0 40px ${primary};
        filter: hue-rotate(0deg);
    }
    100% {
        text-shadow: 0 0 2px ${textColor},
                     0 0 6px ${secondary},
                     0 0 15px ${secondary},
                     0 0 30px ${secondary},
                     0 0 50px ${secondary};
        filter: hue-rotate(45deg);
    }
}`,
        glitch: (primary, secondary, speed, textColor) => `/* Cyberpunk RGB Glitch Animation Uslubi */
.text-display span {
    display: inline-block;
    position: relative;
    white-space: pre;
    animation-delay: var(--delay);
    color: ${textColor};
    animation: effectGlitch ${speed}s steps(2, start) infinite;
}

.text-display span::before,
.text-display span::after {
    content: attr(data-char);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
}

.text-display span::before {
    color: ${primary};
    z-index: -1;
    animation: glitchRed ${speed}s infinite;
}

.text-display span::after {
    color: ${secondary};
    z-index: -2;
    animation: glitchBlue ${speed}s infinite;
}

@keyframes effectGlitch {
    0%, 100% { transform: skew(0deg); }
    20% { transform: skew(-5deg); }
    40% { transform: skew(5deg); }
    60% { transform: skew(-3deg); }
    80% { transform: skew(3deg); }
}

@keyframes glitchRed {
    0%, 100% { transform: translate(0); clip-path: inset(10% 0 80% 0); }
    20% { transform: translate(-2px, 2px); clip-path: inset(30% 0 40% 0); }
    40% { transform: translate(1px, -1px); clip-path: inset(50% 0 10% 0); }
    60% { transform: translate(-1px, -2px); clip-path: inset(20% 0 70% 0); }
    80% { transform: translate(2px, 1px); clip-path: inset(80% 0 5% 0); }
}

@keyframes glitchBlue {
    0%, 100% { transform: translate(0); clip-path: inset(85% 0 5% 0); }
    20% { transform: translate(2px, -2px); clip-path: inset(60% 0 15% 0); }
    40% { transform: translate(-2px, 2px); clip-path: inset(10% 0 75% 0); }
    60% { transform: translate(2px, 1px); clip-path: inset(40% 0 40% 0); }
    80% { transform: translate(-1px, -1px); clip-path: inset(70% 0 25% 0); }
}`,
        wave: (primary, secondary, speed, textColor) => `/* Liquid Wave Animation Uslubi */
.text-display span {
    display: inline-block;
    position: relative;
    white-space: pre;
    animation-delay: var(--delay);
    color: transparent;
    background: linear-gradient(135deg, ${primary} 0%, ${secondary} 100%);
    -webkit-background-clip: text;
    background-clip: text;
    animation: effectWave ${speed}s ease-in-out infinite alternate;
}

@keyframes effectWave {
    0% { transform: translateY(10px); }
    100% { transform: translateY(-10px); }
}`,
        typing: (primary, secondary, speed, textColor) => `/* Typewriter Console Uslubi */
.text-display {
    position: relative;
}

.text-display::after {
    content: '_';
    color: ${secondary};
    font-weight: bold;
    display: inline-block;
    animation: blinkCursor 0.8s infinite;
    text-shadow: 0 0 8px ${secondary};
}

.text-display span {
    display: inline-block;
    position: relative;
    white-space: pre;
    animation-delay: var(--delay);
    color: ${textColor};
    opacity: 0;
    transform: scale(0.5);
    filter: blur(4px);
    animation: effectTyping 0.3s forwards;
    text-shadow: 0 0 8px ${secondary};
}

@keyframes effectTyping {
    to {
        opacity: 1;
        transform: scale(1);
        filter: blur(0);
    }
}

@keyframes blinkCursor {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}`,
        fire: (primary, secondary, speed, textColor) => `/* Ember Fire Animation Uslubi */
.text-display span {
    display: inline-block;
    position: relative;
    white-space: pre;
    animation-delay: var(--delay);
    color: transparent;
    background: linear-gradient(to top, ${primary}, ${secondary}, ${textColor});
    -webkit-background-clip: text;
    background-clip: text;
    animation: effectFire ${speed}s ease-in-out infinite alternate;
}

@keyframes effectFire {
    0% {
        transform: translateY(0) rotate(0deg);
        filter: drop-shadow(0 0 2px rgba(255,0,0,0.5)) drop-shadow(0 -2px 4px rgba(255,100,0,0.4));
    }
    50% {
        transform: translateY(-8px) rotate(-2deg);
        filter: drop-shadow(0 -4px 8px rgba(255,100,0,0.8)) drop-shadow(0 -8px 12px rgba(255,200,0,0.6));
    }
    100% {
        transform: translateY(-12px) rotate(2deg);
        filter: drop-shadow(0 -6px 12px rgba(255,50,0,0.9)) drop-shadow(0 -12px 20px rgba(255,220,0,0.8));
    }
}`,
        flip: (primary, secondary, speed, textColor) => `/* Origami 3D Flip Animation Uslubi */
.text-display {
    perspective: 1000px;
}

.text-display span {
    display: inline-block;
    position: relative;
    white-space: pre;
    animation-delay: var(--delay);
    color: ${textColor};
    transform-style: preserve-3d;
    backface-visibility: visible;
    animation: effectFlip ${speed * 3}s ease-in-out infinite;
}

@keyframes effectFlip {
    0% {
        transform: rotateY(0deg);
        color: ${textColor};
    }
    20%, 60% {
        transform: rotateY(180deg);
        color: ${primary};
    }
    80%, 100% {
        transform: rotateY(360deg);
        color: ${secondary};
    }
}`,
        shimmer: (primary, secondary, speed, textColor) => `/* Golden Shimmer Animation Uslubi */
.text-display span {
    display: inline-block;
    position: relative;
    white-space: pre;
    animation-delay: var(--delay);
    background: linear-gradient(to right, ${textColor} 20%, ${primary} 40%, ${secondary} 60%, ${textColor} 80%);
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: effectShimmer ${speed * 2.5}s linear infinite;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

@keyframes effectShimmer {
    to { background-position: 200% center; }
}`,
        smoke: (primary, secondary, speed, textColor) => `/* Mystic Smoke Animation Uslubi */
.text-display span {
    display: inline-block;
    position: relative;
    white-space: pre;
    animation-delay: var(--delay);
    color: ${textColor};
    animation: effectSmoke ${speed * 3}s ease-in-out infinite;
    text-shadow: 0 0 0 ${primary};
}

@keyframes effectSmoke {
    0% {
        transform: translateY(0) scale(1) rotate(0deg);
        filter: blur(0);
        opacity: 1;
    }
    50% {
        transform: translateY(-20px) scale(1.2) rotate(5deg);
        filter: blur(6px);
        opacity: 0.5;
        color: ${primary};
        text-shadow: 0 0 10px ${secondary};
    }
    100% {
        transform: translateY(-40px) scale(0.8) rotate(-10deg);
        filter: blur(15px);
        opacity: 0;
        color: ${secondary};
        text-shadow: 0 0 20px ${secondary};
    }
}`,
        rainbow: (primary, secondary, speed, textColor) => `/* Rainbow Flow Animation Uslubi */
.text-display span {
    display: inline-block;
    position: relative;
    white-space: pre;
    animation-delay: var(--delay);
    color: ${textColor};
    text-shadow: 0 2px 5px rgba(0,0,0,0.3);
    animation: effectRainbow ${speed * 4}s linear infinite;
}

@keyframes effectRainbow {
    0% {
        color: ${textColor};
        filter: hue-rotate(0deg);
    }
    33% {
        color: ${primary};
    }
    66% {
        color: ${secondary};
    }
    100% {
        color: ${textColor};
        filter: hue-rotate(360deg);
    }
}`,
        rotate3d: (primary, secondary, speed, textColor) => `/* Cosmic Rotate 3D Animation Uslubi */
.text-display span {
    display: inline-block;
    position: relative;
    white-space: pre;
    animation-delay: var(--delay);
    color: ${textColor};
    transform-style: preserve-3d;
    backface-visibility: visible;
    text-shadow: 0 1px 0 ${primary}, 0 2px 0 ${secondary};
    animation: effectRotate3D ${speed * 4}s ease-in-out infinite;
}

@keyframes effectRotate3D {
    0% {
        transform: rotateX(0deg) rotateY(0deg) translateZ(0);
    }
    50% {
        transform: rotateX(180deg) rotateY(90deg) translateZ(20px);
        color: ${primary};
    }
    100% {
        transform: rotateX(360deg) rotateY(360deg) translateZ(0);
        color: ${textColor};
    }
}`,
        elastic: (primary, secondary, speed, textColor) => `/* Elastic Pop Animation Uslubi */
.text-display span {
    display: inline-block;
    position: relative;
    white-space: pre;
    animation-delay: var(--delay);
    color: ${textColor};
    text-shadow: 0 4px 10px rgba(0,0,0,0.15);
    animation: effectElastic ${speed * 2}s cubic-bezier(0.68, -0.6, 0.32, 1.6) infinite alternate;
}

@keyframes effectElastic {
    0% {
        transform: scale3d(1, 1, 1);
    }
    30% {
        transform: scale3d(1.25, 0.75, 1);
        color: ${primary};
    }
    50% {
        transform: scale3d(0.75, 1.25, 1);
        color: ${secondary};
    }
    70% {
        transform: scale3d(1.15, 0.85, 1);
    }
    100% {
        transform: scale3d(1, 1, 1);
        color: ${textColor};
    }
}`,
        reveal: (primary, secondary, speed, textColor) => `/* Light Reveal Animation Uslubi */
.text-display span {
    display: inline-block;
    position: relative;
    white-space: pre;
    animation-delay: var(--delay);
    color: ${textColor};
    opacity: 0;
    transform: translateY(25px) rotate(10deg);
    filter: blur(5px);
    animation: effectReveal ${speed * 2}s cubic-bezier(0.19, 1, 0.22, 1) infinite alternate;
}

@keyframes effectReveal {
    0% {
        opacity: 0;
        transform: translateY(25px) rotate(10deg);
        filter: blur(5px);
        text-shadow: none;
    }
    100% {
        opacity: 1;
        transform: translateY(0) rotate(0deg);
        filter: blur(0);
        text-shadow: 0 0 8px ${primary}, 0 0 20px ${secondary};
    }
}`,
        matrix: (primary, secondary, speed, textColor) => `/* Matrix Rain Animation Uslubi */
.text-display span {
    display: inline-block;
    position: relative;
    white-space: pre;
    animation-delay: var(--delay);
    color: ${secondary};
    text-shadow: 0 0 4px ${secondary}, 0 0 10px ${primary};
    animation: effectMatrix ${speed * 3}s steps(4, end) infinite;
}

@keyframes effectMatrix {
    0%, 100% {
        color: ${secondary};
        opacity: 1;
        filter: brightness(1.2);
    }
    25% {
        color: ${textColor};
        opacity: 0.6;
    }
    50% {
        color: ${primary};
        opacity: 0.8;
    }
    75% {
        opacity: 0.3;
        filter: brightness(0.5);
    }
}`
    };

    // Matnni harflarga ajratish va inline delay o'rnatish
    function updateTextDisplay() {
        const text = textInput.value || " ";
        textDisplay.innerHTML = "";

        const delayOffset = parseFloat(delayRange.value);
        const baseSpeed = parseFloat(speedRange.value);

        text.split("").forEach((char, index) => {
            const span = document.createElement("span");
            
            // Bo'sh joylar uchun maxsus belgi (space)
            if (char === " ") {
                span.innerHTML = "&nbsp;";
            } else {
                span.innerText = char;
            }
            
            // CSS Glitch effekti uchun attribute
            if (currentEffect === "glitch") {
                span.setAttribute("data-char", char === " " ? " " : char);
            }
            
            // Har bir harf uchun kechikish vaqti
            const delayValue = (index * delayOffset).toFixed(3);
            span.style.setProperty("--delay", `${delayValue}s`);

            // Har bir harf uchun har xil tezlik (original loyihadagidek)
            const speedFactor = [0, 0.05, 0.1, 0.15, 0.1, 0.05][index % 6];
            const durationValue = (baseSpeed + speedFactor).toFixed(3);
            span.style.setProperty("--duration", `${durationValue}s`);
            
            textDisplay.appendChild(span);
        });

        // Agar Typewriter bo'lsa, animatsiyani to'liq qaytadan ishga tushirish uchun klassni o'chirib yoqamiz
        if (currentEffect === "typing") {
            textDisplay.classList.remove("effect-typing");
            void textDisplay.offsetWidth; // Reflow trigger qilish
            textDisplay.classList.add("effect-typing");
        }

        updateCodeOutput();
    }

    // CSS Custom o'zgaruvchilarni yangilash (Jonli o'zgarishlar uchun)
    function updateCSSVariables() {
        const root = document.documentElement;
        
        root.style.setProperty("--text-font", fontSelect.value);
        root.style.setProperty("--text-size", `${fontSizeRange.value}rem`);
        root.style.setProperty("--text-spacing", `${letterSpacingRange.value}px`);
        root.style.setProperty("--anim-speed", `${speedRange.value}s`);
        root.style.setProperty("--anim-delay-offset", `${delayRange.value}s`);
        root.style.setProperty("--color-text", textColor.value);
        root.style.setProperty("--color-primary", primaryColor.value);
        root.style.setProperty("--color-secondary", secondaryColor.value);

        // UI text val-larni yangilash
        fontSizeVal.innerText = `${fontSizeRange.value}rem`;
        letterSpacingVal.innerText = `${letterSpacingRange.value}px`;
        speedVal.innerText = `${speedRange.value}s`;
        delayVal.innerText = `${delayRange.value}s`;

        updateCodeOutput();
    }
    // HTML/CSS Kodini generatsiya qilish
    function updateCodeOutput() {
        const text = textInput.value || " ";
        const fontValue = fontSelect.value;
        const sizeValue = fontSizeRange.value;
        const spacingValue = letterSpacingRange.value;
        const delayOffset = parseFloat(delayRange.value);
        const speedValue = parseFloat(speedRange.value);
        const textCol = textColor.value;
        const primary = primaryColor.value;
        const secondary = secondaryColor.value;

        if (activeTab === "html") {
            // HTML Eksport generatsiyasi
            let htmlCode = `<!-- Animatsion Matn -->\n<div class="text-display effect-${currentEffect}">\n`;
            
            text.split("").forEach((char, index) => {
                const delayValue = (index * delayOffset).toFixed(3);
                const speedFactor = [0, 0.05, 0.1, 0.15, 0.1, 0.05][index % 6];
                const durationValue = (speedValue + speedFactor).toFixed(3);
                const safeChar = char === " " ? "&nbsp;" : char;
                
                let styleStr = `--delay: ${delayValue}s;`;
                if (currentEffect === "bounce") {
                    styleStr += ` --duration: ${durationValue}s;`;
                }

                if (currentEffect === "glitch") {
                    const attrChar = char === " " ? " " : char;
                    htmlCode += `    <span style="${styleStr}" data-char="${attrChar}">${safeChar}</span>\n`;
                } else {
                    htmlCode += `    <span style="${styleStr}">${safeChar}</span>\n`;
                }
            });
            
            htmlCode += `</div>`;
            codeOutput.innerText = htmlCode;
        } else {
            // CSS Eksport generatsiyasi
            let cssCode = `/* Asosiy Matn Uslubi */\n`;
            cssCode += `.text-display {\n`;
            cssCode += `    font-family: ${fontValue};\n`;
            cssCode += `    font-size: ${sizeValue}rem;\n`;
            cssCode += `    letter-spacing: ${spacingValue}px;\n`;
            cssCode += `    line-height: 1.2;\n`;
            cssCode += `    display: inline-block;\n`;
            cssCode += `}\n\n`;

            // Animatsiya turiga qarab CSS keyframes va qo'shimcha elementlarni qo'shish
            cssCode += animationTemplates[currentEffect](primary, secondary, speedValue, textCol);
            
            codeOutput.innerText = cssCode;
        }
    }

    // EVENT LISTENERS

    // Matn o'zgarganda
    textInput.addEventListener("input", updateTextDisplay);

    // Sozlamalar (slayder, select, rang) o'zgarganda
    fontSelect.addEventListener("change", updateCSSVariables);
    fontSizeRange.addEventListener("input", updateCSSVariables);
    letterSpacingRange.addEventListener("input", updateCSSVariables);
    speedRange.addEventListener("input", updateCSSVariables);
    delayRange.addEventListener("input", () => {
        updateCSSVariables();
        updateTextDisplay(); // Delay gap o'zgarganda spans-larni qayta qurish kerak
    });
    textColor.addEventListener("input", updateCSSVariables);
    primaryColor.addEventListener("input", updateCSSVariables);
    secondaryColor.addEventListener("input", updateCSSVariables);

    // Animatsiya kartasini tanlash
    effectsGrid.addEventListener("click", (e) => {
        const card = e.target.closest(".effect-card");
        if (!card) return;

        // Oldingi faol kartani o'chirish
        document.querySelector(".effect-card.active").classList.remove("active");
        
        // Yangi faol kartani yoqish
        card.classList.add("active");
        currentEffect = card.dataset.effect;

        // Preview klassini yangilash
        textDisplay.className = `text-display effect-${currentEffect}`;

        // UI-da dynamic delay-larni tekshirish va kiritish
        updateTextDisplay();
    });

    // Eksport tablar o'zgarishi
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".tab-btn.active").classList.remove("active");
            btn.classList.add("active");
            activeTab = btn.dataset.tab;
            updateCodeOutput();
        });
    });

    // Fonni o'zgartirish
    arenaBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".arena-btn.active").classList.remove("active");
            btn.classList.add("active");
            arenaBackground = btn.dataset.bg;

            // Preview orqasi rangini o'zgartirish
            if (arenaBackground === "dark") {
                previewArena.style.backgroundColor = "var(--color-bg)";
                previewArena.style.backgroundImage = "none";
            } else if (arenaBackground === "light") {
                previewArena.style.backgroundColor = "#ffffff";
                previewArena.style.backgroundImage = "none";
            } else if (arenaBackground === "grid") {
                previewArena.style.backgroundColor = "#121824";
                previewArena.style.backgroundImage = "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)";
            } else if (arenaBackground === "mesh") {
                previewArena.style.backgroundColor = "#020617";
                previewArena.style.backgroundImage = "radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.3) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(6, 182, 212, 0.3) 0px, transparent 50%)";
            }
        });
    });

    // Kodni clipboard-ga nusxalash
    copyBtn.addEventListener("click", () => {
        const textToCopy = codeOutput.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyBtn.classList.add("copied");
            copyBtn.innerHTML = "<span>✅</span> Nusxalandi!";
            
            // Toast ko'rsatish
            toastMsg.classList.add("show");

            setTimeout(() => {
                copyBtn.classList.remove("copied");
                copyBtn.innerHTML = "<span>📋</span> Nusxalash";
                toastMsg.classList.remove("show");
            }, 2000);
        }).catch(err => {
            console.error("Nusxalashda xatolik yuz berdi: ", err);
        });
    });

    // Dastlabki yuklash
    updateCSSVariables();
    updateTextDisplay();
});
