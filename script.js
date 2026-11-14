// Terminal simülasyonu ve dinamik yıl güncellemesi (Saf JavaScript)

const COMMANDS = ["help", "whoami", "skills", "quests", "certs", "contact", "sudo", "clear"];

const STATIC_OUTPUTS = {
  help: [
    { kind: "out", text: "Kullanılabilir komutlar:" },
    { kind: "out", text: "  " + COMMANDS.join("  ") },
  ],
  whoami: [
    { kind: "out", text: "YUSUF KURŞUN — SİBER GÜVENLİK UZMANI" },
    { kind: "out", text: "Sınıf: Beyaz Şapkalı Hacker | LVL 99" },
  ],
  skills: [
    { kind: "out", text: "Sızma Testi............... █████████░" },
    { kind: "out", text: "Ağ Güvenliği.............. █████████░" },
    { kind: "out", text: "Web Uyg. Güvenliği........ ████████░░" },
    { kind: "out", text: "Zararlı Yazılım Analizi... ███████░░░" },
    { kind: "out", text: "Olay Müdahalesi / DFIR.... ████████░░" },
    { kind: "out", text: "Bulut Güvenliği........... ███████░░░" },
    { kind: "out", text: "OSINT..................... ████████░░" },
    { kind: "out", text: "Tersine Mühendislik....... ██████░░░░" },
  ],
  quests: [
    { kind: "out", text: "[✓] Kurumsal Ağ Sızma Testi ★★★★★" },
    { kind: "out", text: "[✓] SOC & SIEM Kurulumu ★★★★" },
    { kind: "out", text: "[✓] Fidye Yazılımı Analizi ★★★★" },
    { kind: "out", text: "[✓] Bug Bounty: Kritik IDOR ★★★" },
  ],
  certs: [
    { kind: "out", text: "🏆 OSCP — Offensive Security Certified Professional" },
    { kind: "out", text: "🏆 CEH — Certified Ethical Hacker" },
    { kind: "out", text: "🏆 SEC+ — CompTIA Security+" },
    { kind: "out", text: "🏆 CTF — Ulusal CTF Yarışması — 1.lik" },
  ],
  contact: [
    { kind: "out", text: "E-posta: yusuf77krsn@gmail.com" },
    { kind: "out", text: "GITHUB: https://github.com/Yusufkursun" },
    { kind: "out", text: "LINKEDIN: https://www.linkedin.com/in/yusuf-kur%C5%9Fun-ba00401a3/" },
  ],
  sudo: [{ kind: "err", text: "Güzel deneme. Bu olay raporlanacak. 👀" }],
};

function runCommand(raw) {
  const cmd = raw.trim().toLowerCase().split(/\s+/)[0];
  if (!cmd) return [];
  if (cmd === "clear") return null;
  return (
    STATIC_OUTPUTS[cmd] || [
      { kind: "err", text: `komut bulunamadı: ${cmd}. 'help' yazmayı dene.` },
    ]
  );
}

const COLOR_CLASS = {
  in: "text-foreground",
  out: "text-primary",
  err: "text-destructive",
};

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const terminalBox = document.getElementById("terminal-box");
  const terminalOutput = document.getElementById("terminal-output");
  const terminalScroll = document.getElementById("terminal-scroll");
  const terminalForm = document.getElementById("terminal-form");
  const terminalInput = document.getElementById("terminal-input");

  if (!terminalBox || !terminalOutput || !terminalScroll || !terminalForm || !terminalInput) return;

  const appendLine = ({ kind, text }) => {
    const p = document.createElement("p");
    p.className = `terminal-line ${COLOR_CLASS[kind] || "text-primary"}`;
    if (kind === "in") {
      const prompt = document.createElement("span");
      prompt.className = "text-accent";
      prompt.textContent = "$ ";
      p.appendChild(prompt);
    }
    const span = document.createElement("span");
    span.textContent = text;
    p.appendChild(span);
    terminalOutput.appendChild(p);
  };

  terminalBox.addEventListener("click", () => {
    if (!window.getSelection()?.toString()) {
      terminalInput.focus();
    }
  });

  terminalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = terminalInput.value;
    const result = runCommand(value);

    if (result === null) {
      terminalOutput.innerHTML = "";
    } else {
      appendLine({ kind: "in", text: value });
      result.forEach(appendLine);
    }

    terminalInput.value = "";
    terminalScroll.scrollTop = terminalScroll.scrollHeight;
  });
});
