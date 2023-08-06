const languageMap: { [key: string]: string } = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  pt: 'Portuguese',
  hi: 'Hindi',
  ja: 'Japanese',
  ko: 'Korean',
  tr: 'Turkish',
  it: 'Italian',
  zh: 'Chinese',
}

export function convertLanguageCodeToName(code: string): string {
  const languageName = languageMap[code]
  if (languageName) {
    return languageName
  } else {
    return '-'
  }
}
