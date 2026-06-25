// Analyst personas for The Dugout
const ANALYSTS = {
  en: {
    code: 'en', language: 'English', flag: 'gb',
    name: 'Nathan', role: 'Tactical Analyst',
  },
  es: {
    code: 'es', language: 'Español', flag: 'es',
    name: 'Valeria', role: 'Analista Táctica',
  },
  fr: {
    code: 'fr', language: 'Français', flag: 'fr',
    name: 'Claire', role: 'Analyste Tactique',
  },
  de: {
    code: 'de', language: 'Deutsch', flag: 'de',
    name: 'Lukas', role: 'Taktikanalyst',
  },
}

const DEFAULT_LANG = 'en'

function getAnalyst(code) {
  return ANALYSTS[code] || ANALYSTS[DEFAULT_LANG]
}

function flagUrl(code) {
  const f = (ANALYSTS[code] || ANALYSTS[DEFAULT_LANG]).flag
  return `https://flagcdn.com/24x18/${f}.png`
}
