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
    const textColorLabel = document.getElementById("textColorLabel");
    const gradientToggle = document.getElementById("gradientToggle");
    const textGradColor = document.getElementById("textGradColor");
    const gradColorWrapper = document.getElementById("gradColorWrapper");
    const gradAngleRange = document.getElementById("gradAngleRange");
    const gradAngleRow = document.getElementById("gradAngleRow");
    const gradAngleVal = document.getElementById("gradAngleVal");
    const previewArena = document.getElementById("previewArena");
    
    // Kod Eksport & Tabs
    const codeOutput = document.getElementById("codeOutput");
    const copyBtn = document.getElementById("copyBtn");
    const shareBtn = document.getElementById("shareBtn");
    const codepenBtn = document.getElementById("codepenBtn");
    const tabBtns = document.querySelectorAll(".tab-btn");
    const arenaBtns = document.querySelectorAll(".arena-btn");
    const toastMsg = document.getElementById("toastMsg");
    const alignBtns = document.querySelectorAll(".align-btn");
    const presetsGrid = document.getElementById("presetsGrid");
    const splitSelect = document.getElementById("splitSelect");
    const particleCanvas = document.getElementById("particleCanvas");

    // Hozirgi holat (State)
    let currentEffect = "bounce";
    let activeTab = "html";
    let arenaBackground = "dark";
    let currentAlign = "center";

    // Zarrachalar foni holati
    let ctx = null;
    let particles = [];
    let particleAnimId = null;
    let isParticleActive = false;

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
.text-display .text-line:last-child::after {
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
        const splitMode = splitSelect.value;

        const lines = text.split("\n");
        let animIndex = 0;

        lines.forEach((lineText) => {
            const lineDiv = document.createElement("div");
            lineDiv.className = "text-line";
            
            if (lineText.length === 0) {
                lineDiv.innerHTML = "&nbsp;";
            } else {
                if (splitMode === "word") {
                    const words = lineText.split(" ");
                    words.forEach((wordText, wordIdx) => {
                        if (wordText.length === 0 && wordIdx < words.length - 1) {
                            const spaceSpan = document.createElement("span");
                            spaceSpan.innerHTML = "&nbsp;";
                            lineDiv.appendChild(spaceSpan);
                            return;
                        }

                        const span = document.createElement("span");
                        span.innerText = wordText;
                        
                        if (currentEffect === "glitch") {
                            span.setAttribute("data-char", wordText);
                        }
                        
                        const delayValue = (animIndex * delayOffset).toFixed(3);
                        span.style.setProperty("--delay", `${delayValue}s`);

                        const speedFactor = [0, 0.05, 0.1, 0.15, 0.1, 0.05][animIndex % 6];
                        const durationValue = (baseSpeed + speedFactor).toFixed(3);
                        span.style.setProperty("--duration", `${durationValue}s`);
                        
                        lineDiv.appendChild(span);
                        animIndex++;
                        
                        if (wordIdx < words.length - 1) {
                            const spaceSpan = document.createElement("span");
                            spaceSpan.innerHTML = "&nbsp;";
                            lineDiv.appendChild(spaceSpan);
                        }
                    });
                } else {
                    lineText.split("").forEach((char) => {
                        const span = document.createElement("span");
                        
                        if (char === " ") {
                            span.innerHTML = "&nbsp;";
                        } else {
                            span.innerText = char;
                        }
                        
                        if (currentEffect === "glitch") {
                            span.setAttribute("data-char", char === " " ? " " : char);
                        }
                        
                        const delayValue = (animIndex * delayOffset).toFixed(3);
                        span.style.setProperty("--delay", `${delayValue}s`);

                        const speedFactor = [0, 0.05, 0.1, 0.15, 0.1, 0.05][animIndex % 6];
                        const durationValue = (baseSpeed + speedFactor).toFixed(3);
                        span.style.setProperty("--duration", `${durationValue}s`);
                        
                        lineDiv.appendChild(span);
                        animIndex++;
                    });
                }
            }
            textDisplay.appendChild(lineDiv);
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

        // Gradient matn ranglari boshqaruvi
        if (gradientToggle.checked) {
            root.style.setProperty("--text-background", `linear-gradient(${gradAngleRange.value}deg, ${textColor.value}, ${textGradColor.value})`);
            root.style.setProperty("--text-clip", "text");
            root.style.setProperty("--text-fill", "transparent");
            
            gradColorWrapper.style.display = "flex";
            gradAngleRow.style.display = "flex";
            textColorLabel.innerText = "Gradient 1-Rangi";
            gradAngleVal.innerText = `${gradAngleRange.value}°`;
        } else {
            root.style.setProperty("--text-background", "none");
            root.style.setProperty("--text-clip", "unset");
            root.style.setProperty("--text-fill", "inherit");
            
            gradColorWrapper.style.display = "none";
            gradAngleRow.style.display = "none";
            textColorLabel.innerText = "Matn Rangi";
        }

        // UI text val-larni yangilash
        fontSizeVal.innerText = `${fontSizeRange.value}rem`;
        letterSpacingVal.innerText = `${letterSpacingRange.value}px`;
        speedVal.innerText = `${speedRange.value}s`;
        delayVal.innerText = `${delayRange.value}s`;

        updateCodeOutput();
        serializeState();
    }

    // Preset shablonlar konfiguratsiyasi
    const presetConfigs = {
        cyberpunk: {
            effect: "glitch",
            font: "'Space Grotesk', sans-serif",
            size: "4.5",
            spacing: "2",
            speed: "0.5",
            delay: "0.05",
            textColor: "#ffff00",
            primary: "#ff0055",
            secondary: "#00ffff",
            gradient: false,
            split: "char"
        },
        neoncyber: {
            effect: "neon",
            font: "'Space Grotesk', sans-serif",
            size: "4.5",
            spacing: "0",
            speed: "0.8",
            delay: "0.08",
            textColor: "#ffffff",
            primary: "#ff007f",
            secondary: "#00ffff",
            gradient: false,
            split: "char"
        },
        goldluxury: {
            effect: "shimmer",
            font: "'Playfair Display', serif",
            size: "5.0",
            spacing: "1",
            speed: "0.8",
            delay: "0.06",
            textColor: "#ffe066",
            primary: "#d4af37",
            secondary: "#aa7c11",
            gradient: true,
            textGradColor: "#aa7c11",
            gradAngle: "45",
            split: "char"
        },
        sunsetwave: {
            effect: "wave",
            font: "'Outfit', sans-serif",
            size: "4.5",
            spacing: "0",
            speed: "1.0",
            delay: "0.15",
            textColor: "#ff3e00",
            primary: "#ff007f",
            secondary: "#ff9900",
            gradient: true,
            textGradColor: "#ff007f",
            gradAngle: "90",
            split: "word"
        },
        matrixcode: {
            effect: "matrix",
            font: "'Ubuntu Mono', monospace",
            size: "4.0",
            spacing: "0",
            speed: "0.4",
            delay: "0.04",
            textColor: "#ffffff",
            primary: "#00ff00",
            secondary: "#008000",
            gradient: false,
            split: "char"
        }
    };

    function applyPreset(name) {
        const config = presetConfigs[name];
        if (!config) return;

        // Apply config to state & UI inputs
        currentEffect = config.effect;
        fontSelect.value = config.font;
        fontSizeRange.value = config.size;
        letterSpacingRange.value = config.spacing;
        speedRange.value = config.speed;
        delayRange.value = config.delay;
        textColor.value = config.textColor;
        primaryColor.value = config.primary;
        secondaryColor.value = config.secondary;
        splitSelect.value = config.split || "char";

        if (config.gradient) {
            gradientToggle.checked = true;
            textGradColor.value = config.textGradColor;
            gradAngleRange.value = config.gradAngle;
        } else {
            gradientToggle.checked = false;
        }

        // Update active classes in effectsGrid
        document.querySelectorAll(".effect-card").forEach(card => {
            if (card.dataset.effect === currentEffect) {
                card.classList.add("active");
            } else {
                card.classList.remove("active");
            }
        });

        // Update preview class
        textDisplay.className = `text-display effect-${currentEffect} text-${currentAlign}`;

        // Trigger updates
        updateCSSVariables();
        updateTextDisplay();
    }

    function clearActivePresets() {
        document.querySelectorAll(".preset-card").forEach(c => c.classList.remove("active"));
    }

    function serializeState() {
        const state = {
            t: textInput.value,
            e: currentEffect,
            f: fontSelect.value,
            s: fontSizeRange.value,
            ls: letterSpacingRange.value,
            sp: speedRange.value,
            d: delayRange.value,
            tc: textColor.value,
            p: primaryColor.value,
            sec: secondaryColor.value,
            g: gradientToggle.checked,
            tgc: textGradColor.value,
            ga: gradAngleRange.value,
            a: currentAlign,
            sm: splitSelect.value
        };
        try {
            const jsonStr = JSON.stringify(state);
            const base64 = btoa(unescape(encodeURIComponent(jsonStr)));
            history.replaceState(null, null, `#${base64}`);
        } catch (e) {
            console.error("State serialization failed", e);
        }
    }

    function deserializeState() {
        const hash = window.location.hash.substring(1);
        if (!hash) return;
        try {
            const jsonStr = decodeURIComponent(escape(atob(hash)));
            const state = JSON.parse(jsonStr);

            if (state.t !== undefined) textInput.value = state.t;
            if (state.e !== undefined) currentEffect = state.e;
            if (state.f !== undefined) fontSelect.value = state.f;
            if (state.s !== undefined) fontSizeRange.value = state.s;
            if (state.ls !== undefined) letterSpacingRange.value = state.ls;
            if (state.sp !== undefined) speedRange.value = state.sp;
            if (state.d !== undefined) delayRange.value = state.d;
            if (state.tc !== undefined) textColor.value = state.tc;
            if (state.p !== undefined) primaryColor.value = state.p;
            if (state.sec !== undefined) secondaryColor.value = state.sec;
            if (state.g !== undefined) gradientToggle.checked = state.g;
            if (state.tgc !== undefined) textGradColor.value = state.tgc;
            if (state.ga !== undefined) gradAngleRange.value = state.ga;
            if (state.a !== undefined) currentAlign = state.a;
            if (state.sm !== undefined) splitSelect.value = state.sm;

            // Update alignment active buttons
            document.querySelectorAll(".align-btn").forEach(btn => {
                if (btn.dataset.align === currentAlign) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });

            // Update effect active cards
            document.querySelectorAll(".effect-card").forEach(card => {
                if (card.dataset.effect === currentEffect) {
                    card.classList.add("active");
                } else {
                    card.classList.remove("active");
                }
            });

            // Preview alignment & effect update
            textDisplay.className = `text-display effect-${currentEffect} text-${currentAlign}`;
        } catch (e) {
            console.error("State deserialization failed", e);
        }
    }

    // Zarrachalar animatsiya tizimi
    class Particle {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.reset();
        }

        reset() {
            this.x = Math.random() * this.width;
            this.y = Math.random() * this.height;
            this.vx = (Math.random() - 0.5) * 1.2;
            this.vy = (Math.random() - 0.5) * 1.2;
            this.size = Math.random() * 2.5 + 1;
            this.alpha = Math.random() * 0.4 + 0.2;
            this.color = Math.random() > 0.5 ? primaryColor.value : secondaryColor.value;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > this.width || this.y < 0 || this.y > this.height) {
                this.reset();
            }
        }

        draw(c) {
            c.save();
            c.globalAlpha = this.alpha;
            c.fillStyle = this.color;
            c.beginPath();
            c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            c.fill();
            c.restore();
        }
    }

    function initParticles() {
        ctx = particleCanvas.getContext("2d");
        resizeCanvas();
        particles = [];
        for (let i = 0; i < 70; i++) {
            particles.push(new Particle(particleCanvas.width, particleCanvas.height));
        }
        isParticleActive = true;
        particleCanvas.style.display = "block";
        animateParticles();
    }

    function resizeCanvas() {
        if (!particleCanvas) return;
        const rect = previewArena.getBoundingClientRect();
        particleCanvas.width = rect.width;
        particleCanvas.height = rect.height;
    }

    function animateParticles() {
        if (!isParticleActive) return;
        
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        // Zarrachalarni o'zaro bog'lash chiziqlari (Constellation)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw(ctx);
            
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        particleAnimId = requestAnimationFrame(animateParticles);
    }

    function stopParticles() {
        isParticleActive = false;
        if (particleAnimId) {
            cancelAnimationFrame(particleAnimId);
            particleAnimId = null;
        }
        if (particleCanvas) {
            particleCanvas.style.display = "none";
        }
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
            let htmlCode = `<!-- Animatsion Matn -->\n<div class="text-display effect-${currentEffect} text-${currentAlign}">\n`;
            const lines = text.split("\n");
            const splitMode = splitSelect.value;
            let animIndex = 0;

            lines.forEach((lineText) => {
                htmlCode += `    <div class="text-line">\n`;
                if (lineText.length === 0) {
                    htmlCode += `        &nbsp;\n`;
                } else {
                    if (splitMode === "word") {
                        const words = lineText.split(" ");
                        words.forEach((wordText, wordIdx) => {
                            if (wordText.length === 0 && wordIdx < words.length - 1) {
                                htmlCode += `        <span>&nbsp;</span>\n`;
                                return;
                            }

                            const delayValue = (animIndex * delayOffset).toFixed(3);
                            const speedFactor = [0, 0.05, 0.1, 0.15, 0.1, 0.05][animIndex % 6];
                            const durationValue = (speedValue + speedFactor).toFixed(3);
                            
                            let styleStr = `--delay: ${delayValue}s;`;
                            if (currentEffect === "bounce") {
                                styleStr += ` --duration: ${durationValue}s;`;
                            }

                            if (currentEffect === "glitch") {
                                htmlCode += `        <span style="${styleStr}" data-char="${wordText}">${wordText}</span>\n`;
                            } else {
                                htmlCode += `        <span style="${styleStr}">${wordText}</span>\n`;
                            }
                            animIndex++;

                            if (wordIdx < words.length - 1) {
                                htmlCode += `        <span>&nbsp;</span>\n`;
                            }
                        });
                    } else {
                        lineText.split("").forEach((char) => {
                            const delayValue = (animIndex * delayOffset).toFixed(3);
                            const speedFactor = [0, 0.05, 0.1, 0.15, 0.1, 0.05][animIndex % 6];
                            const durationValue = (speedValue + speedFactor).toFixed(3);
                            const safeChar = char === " " ? "&nbsp;" : char;
                            
                            let styleStr = `--delay: ${delayValue}s;`;
                            if (currentEffect === "bounce") {
                                styleStr += ` --duration: ${durationValue}s;`;
                            }

                            if (currentEffect === "glitch") {
                                const attrChar = char === " " ? " " : char;
                                htmlCode += `        <span style="${styleStr}" data-char="${attrChar}">${safeChar}</span>\n`;
                            } else {
                                htmlCode += `        <span style="${styleStr}">${safeChar}</span>\n`;
                            }
                            animIndex++;
                        });
                    }
                }
                htmlCode += `    </div>\n`;
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
            cssCode += `    line-height: 1.4;\n`;
            cssCode += `    display: inline-block;\n`;
            cssCode += `    width: 100%;\n`;
            cssCode += `}\n\n`;
            cssCode += `.text-line {\n`;
            cssCode += `    display: block;\n`;
            cssCode += `    text-align: inherit;\n`;
            cssCode += `    width: 100%;\n`;
            cssCode += `}\n\n`;
            cssCode += `.text-display.text-left { text-align: left; }\n`;
            cssCode += `.text-display.text-center { text-align: center; }\n`;
            cssCode += `.text-display.text-right { text-align: right; }\n\n`;

            cssCode += `/* Har bir harf */\n`;
            cssCode += `.text-display span {\n`;
            cssCode += `    display: inline-block;\n`;
            cssCode += `    position: relative;\n`;
            cssCode += `    white-space: pre;\n`;
            cssCode += `    animation-delay: var(--delay);\n`;
            if (gradientToggle.checked) {
                cssCode += `    background: linear-gradient(${gradAngleRange.value}deg, ${textCol}, ${textGradColor.value});\n`;
                cssCode += `    -webkit-background-clip: text;\n`;
                cssCode += `    background-clip: text;\n`;
                cssCode += `    -webkit-text-fill-color: transparent;\n`;
            }
            cssCode += `}\n\n`;

            // Animatsiya turiga qarab CSS keyframes va qo'shimcha elementlarni qo'shish
            cssCode += animationTemplates[currentEffect](primary, secondary, speedValue, textCol);
            
            codeOutput.innerText = cssCode;
        }
    }

    // EVENT LISTENERS

    // Matn o'zgarganda
    textInput.addEventListener("input", () => {
        clearActivePresets();
        updateTextDisplay();
    });

    // Sozlamalar (slayder, select, rang) o'zgarganda
    fontSelect.addEventListener("change", () => {
        clearActivePresets();
        updateCSSVariables();
    });
    splitSelect.addEventListener("change", () => {
        clearActivePresets();
        updateCSSVariables();
        updateTextDisplay();
    });
    fontSizeRange.addEventListener("input", () => {
        clearActivePresets();
        updateCSSVariables();
    });
    letterSpacingRange.addEventListener("input", () => {
        clearActivePresets();
        updateCSSVariables();
    });
    speedRange.addEventListener("input", () => {
        clearActivePresets();
        updateCSSVariables();
    });
    delayRange.addEventListener("input", () => {
        clearActivePresets();
        updateCSSVariables();
        updateTextDisplay(); // Delay gap o'zgarganda spans-larni qayta qurish kerak
    });
    textColor.addEventListener("input", () => {
        clearActivePresets();
        updateCSSVariables();
    });
    primaryColor.addEventListener("input", () => {
        clearActivePresets();
        updateCSSVariables();
    });
    secondaryColor.addEventListener("input", () => {
        clearActivePresets();
        updateCSSVariables();
    });
    gradientToggle.addEventListener("change", () => {
        clearActivePresets();
        updateCSSVariables();
    });
    textGradColor.addEventListener("input", () => {
        clearActivePresets();
        updateCSSVariables();
    });
    gradAngleRange.addEventListener("input", () => {
        clearActivePresets();
        updateCSSVariables();
    });

    // Animatsiya kartasini tanlash
    effectsGrid.addEventListener("click", (e) => {
        const card = e.target.closest(".effect-card");
        if (!card) return;

        clearActivePresets();

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

    // Matn tekislash hodisalari
    alignBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            clearActivePresets();
            document.querySelector(".align-btn.active").classList.remove("active");
            btn.classList.add("active");
            currentAlign = btn.dataset.align;

            // Preview alignment
            textDisplay.classList.remove("text-left", "text-center", "text-right");
            textDisplay.classList.add(`text-${currentAlign}`);

            updateCodeOutput();
        });
    });

    // Preset tanlash hodisasi
    presetsGrid.addEventListener("click", (e) => {
        const card = e.target.closest(".preset-card");
        if (!card) return;

        clearActivePresets();
        card.classList.add("active");
        const presetName = card.dataset.preset;
        applyPreset(presetName);
    });

    // Fonni o'zgartirish
    arenaBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".arena-btn.active").classList.remove("active");
            btn.classList.add("active");
            arenaBackground = btn.dataset.bg;

            // Preview orqasi rangini o'zgartirish
            stopParticles();

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
            } else if (arenaBackground === "particles") {
                previewArena.style.backgroundColor = "#080b11";
                previewArena.style.backgroundImage = "none";
                initParticles();
            }
        });
    });

    // Oyna o'lchami o'zgarganda canvasni moslashtirish
    window.addEventListener("resize", () => {
        if (isParticleActive) {
            resizeCanvas();
        }
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

    // Loyihani ulashish (Loyiha havolasini olish)
    shareBtn.addEventListener("click", () => {
        serializeState();
        const shareUrl = window.location.href;
        navigator.clipboard.writeText(shareUrl).then(() => {
            shareBtn.classList.add("shared");
            shareBtn.innerHTML = "<span>✅</span> Havola olindi!";
            
            toastMsg.innerHTML = "<span>✅</span> Loyiha havolasi clipboardga nusxalandi!";
            toastMsg.classList.add("show");

            setTimeout(() => {
                shareBtn.classList.remove("shared");
                shareBtn.innerHTML = "<span>🔗</span> Ulashish";
                toastMsg.classList.remove("show");
            }, 2000);
        }).catch(err => {
            console.error("Nusxalashda xatolik: ", err);
        });
    });

    // CodePen-ga eksport qilish
    codepenBtn.addEventListener("click", () => {
        const text = textInput.value || " ";
        const delayOffset = parseFloat(delayRange.value);
        const speedValue = parseFloat(speedRange.value);
        const splitMode = splitSelect.value;
        
        let htmlCode = `<!-- Google Fonts Import (HTML) -->\n`;
        htmlCode += `<link rel="preconnect" href="https://fonts.googleapis.com">\n`;
        htmlCode += `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n`;
        htmlCode += `<link href="https://fonts.googleapis.com/css2?family=Bungee&family=Cinzel+Decorative:wght@700&family=Outfit:wght@400;700&family=Playfair+Display:ital,wght@0,700;1,700&family=Rubik+Glitch&family=Space+Grotesk:wght@500;700&family=Ubuntu+Mono&display=swap" rel="stylesheet">\n\n`;
        htmlCode += `<div class="text-display effect-${currentEffect} text-${currentAlign}">\n`;
        
        const lines = text.split("\n");
        let animIndex = 0;
        lines.forEach((lineText) => {
            htmlCode += `    <div class="text-line">\n`;
            if (lineText.length === 0) {
                htmlCode += `        &nbsp;\n`;
            } else {
                if (splitMode === "word") {
                    const words = lineText.split(" ");
                    words.forEach((wordText, wordIdx) => {
                        if (wordText.length === 0 && wordIdx < words.length - 1) {
                            htmlCode += `        <span>&nbsp;</span>\n`;
                            return;
                        }
                        const delayVal = (animIndex * delayOffset).toFixed(3);
                        const speedFactor = [0, 0.05, 0.1, 0.15, 0.1, 0.05][animIndex % 6];
                        const durationValue = (speedValue + speedFactor).toFixed(3);
                        
                        let styleStr = `--delay: ${delayVal}s;`;
                        if (currentEffect === "bounce") {
                            styleStr += ` --duration: ${durationValue}s;`;
                        }

                        if (currentEffect === "glitch") {
                            htmlCode += `        <span style="${styleStr}" data-char="${wordText}">${wordText}</span>\n`;
                        } else {
                            htmlCode += `        <span style="${styleStr}">${wordText}</span>\n`;
                        }
                        animIndex++;

                        if (wordIdx < words.length - 1) {
                            htmlCode += `        <span>&nbsp;</span>\n`;
                        }
                    });
                } else {
                    lineText.split("").forEach((char) => {
                        const delayVal = (animIndex * delayOffset).toFixed(3);
                        const speedFactor = [0, 0.05, 0.1, 0.15, 0.1, 0.05][animIndex % 6];
                        const durationValue = (speedValue + speedFactor).toFixed(3);
                        const safeChar = char === " " ? "&nbsp;" : char;
                        
                        let styleStr = `--delay: ${delayVal}s;`;
                        if (currentEffect === "bounce") {
                            styleStr += ` --duration: ${durationValue}s;`;
                        }

                        if (currentEffect === "glitch") {
                            const attrChar = char === " " ? " " : char;
                            htmlCode += `        <span style="${styleStr}" data-char="${attrChar}">${safeChar}</span>\n`;
                        } else {
                            htmlCode += `        <span style="${styleStr}">${safeChar}</span>\n`;
                        }
                        animIndex++;
                    });
                }
            }
            htmlCode += `    </div>\n`;
        });
        htmlCode += `</div>`;

        const fontValue = fontSelect.value;
        const sizeValue = fontSizeRange.value;
        const spacingValue = letterSpacingRange.value;
        const textCol = textColor.value;
        const primary = primaryColor.value;
        const secondary = secondaryColor.value;
        
        let cssCode = `/* Google Fonts Import in CSS */\n`;
        cssCode += `@import url('https://fonts.googleapis.com/css2?family=Bungee&family=Cinzel+Decorative:wght@700&family=Outfit:wght@400;700&family=Playfair+Display:ital,wght@0,700;1,700&family=Rubik+Glitch&family=Space+Grotesk:wght@500;700&family=Ubuntu+Mono&display=swap');\n\n`;
        
        cssCode += `body {\n`;
        cssCode += `    background-color: #090d16;\n`;
        cssCode += `    display: flex;\n`;
        cssCode += `    justify-content: center;\n`;
        cssCode += `    align-items: center;\n`;
        cssCode += `    min-height: 100vh;\n`;
        cssCode += `    margin: 0;\n`;
        cssCode += `    overflow: hidden;\n`;
        cssCode += `}\n\n`;
        
        cssCode += `.text-display {\n`;
        cssCode += `    font-family: ${fontValue};\n`;
        cssCode += `    font-size: ${sizeValue}rem;\n`;
        cssCode += `    letter-spacing: ${spacingValue}px;\n`;
        cssCode += `    line-height: 1.4;\n`;
        cssCode += `    display: inline-block;\n`;
        cssCode += `    width: 100%;\n`;
        cssCode += `}\n\n`;
        cssCode += `.text-line {\n`;
        cssCode += `    display: block;\n`;
        cssCode += `    text-align: inherit;\n`;
        cssCode += `    width: 100%;\n`;
        cssCode += `}\n\n`;
        cssCode += `.text-display.text-left { text-align: left; }\n`;
        cssCode += `.text-display.text-center { text-align: center; }\n`;
        cssCode += `.text-display.text-right { text-align: right; }\n\n`;

        cssCode += `.text-display span {\n`;
        cssCode += `    display: inline-block;\n`;
        cssCode += `    position: relative;\n`;
        cssCode += `    white-space: pre;\n`;
        cssCode += `    animation-delay: var(--delay);\n`;
        if (gradientToggle.checked) {
            cssCode += `    background: linear-gradient(${gradAngleRange.value}deg, ${textCol}, ${textGradColor.value});\n`;
            cssCode += `    -webkit-background-clip: text;\n`;
            cssCode += `    background-clip: text;\n`;
            cssCode += `    -webkit-text-fill-color: transparent;\n`;
        }
        cssCode += `}\n\n`;

        cssCode += animationTemplates[currentEffect](primary, secondary, speedValue, textCol);

        const data = {
            title: "Premium Text Animation - OgabekHub",
            description: "Generated using Premium Text Animation Studio",
            html: htmlCode,
            css: cssCode,
            js: ""
        };

        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://codepen.io/pen/define";
        form.target = "_blank";

        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "data";
        input.value = JSON.stringify(data);

        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    });

    // Dastlabki yuklash
    deserializeState();
    textDisplay.classList.add(`text-${currentAlign}`);
    updateCSSVariables();
    updateTextDisplay();
});
