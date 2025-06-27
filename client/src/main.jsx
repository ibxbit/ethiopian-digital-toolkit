import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Improved i18n resources for all tools
// Amharic translations are now more natural and user-friendly

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // Global & Landing
        appTitle: 'Ethiopian Digital Toolkit',
        searchPlaceholder: 'Search for a tool...',
        favorites: 'Favorites',
        // Date Converter
        dateConverter: 'Date Converter',
        today: "Today's Date",
        gregorian: 'Gregorian',
        ethiopian: 'Ethiopian',
        day: 'Day',
        month: 'Month',
        year: 'Year',
        convert: 'Convert',
        ethiopianToGregorian: 'Ethiopian → Gregorian',
        gregorianToEthiopian: 'Gregorian → Ethiopian',
        convertedDate: 'Converted Date:',
        // Exchange Rate
        exchangeRate: 'Exchange Rate',
        amount: 'Amount',
        from: 'From',
        to: 'To',
        convertCurrency: 'Convert Currency',
        rateError: 'Failed to fetch exchange rate.',
        amountError: 'Please enter a valid amount.',
        conversionError: 'Conversion failed.',
        funFact: 'Did you know? The Ethiopian Birr is one of the oldest currencies in Africa!',
        currencyNews: 'Currency News',
        // Time Zone Converter
        timeZoneConverter: 'Time Zone Converter',
        fromZone: 'From time zone',
        toZone: 'To time zone',
        dateTime: 'Date and time',
        convertTime: 'Convert Time',
        convertedTime: 'Converted Time:',
        funFactTime: 'Did you know? Ethiopia uses a 12-hour clock system, starting the day at 6:00 AM! ⏰',
        // Holiday Calendar
        holidayCalendar: 'Holiday Calendar',
        country: 'Country',
        loadingHolidays: 'Loading holidays...',
        noHolidays: 'No holidays found for this year.',
        year: 'Year',
        // QR Code Generator
        qrCodeGenerator: 'QR Code Generator',
        enterText: 'Enter text or URL...',
        generateQR: 'Generate QR Code',
        download: 'Download',
      },
    },
    am: {
      translation: {
        // Global & Landing
        appTitle: 'የኢትዮጵያ ዲጂታል መሳሪያዎች',
        searchPlaceholder: 'መሳሪያ ፈልግ...',
        favorites: 'የተወደዱ',
        // Date Converter
        dateConverter: 'የቀን መቀየሪያ',
        today: 'ዛሬ ቀን',
        gregorian: 'ግሪጎሪያን',
        ethiopian: 'ኢትዮጵያዊ',
        day: 'ቀን',
        month: 'ወር',
        year: 'ዓመት',
        convert: 'ቀይር',
        ethiopianToGregorian: 'ከኢትዮጵያዊ ወደ ግሪጎሪያን',
        gregorianToEthiopian: 'ከግሪጎሪያን ወደ ኢትዮጵያዊ',
        convertedDate: 'የተቀየረው ቀን:',
        // Exchange Rate
        exchangeRate: 'የገንዘብ ምዘና',
        amount: 'መጠን',
        from: 'ከ',
        to: 'ወደ',
        convertCurrency: 'ገንዘብ ቀይር',
        rateError: 'የገንዘብ ምዘና ማግኘት አልተቻለም።',
        amountError: 'እባክዎ ትክክለኛ መጠን ያስገቡ።',
        conversionError: 'መቀየር አልተቻለም።',
        funFact: 'የኢትዮጵያ ብር በአፍሪካ ውስጥ ከቆየው ገንዘብ አንዱ ነው!',
        currencyNews: 'የገንዘብ ዜና',
        // Time Zone Converter
        timeZoneConverter: 'የሰዓት ክልል መቀየሪያ',
        fromZone: 'ከሰዓት ክልል',
        toZone: 'ወደ ሰዓት ክልል',
        dateTime: 'ቀን እና ሰዓት',
        convertTime: 'ሰዓት ቀይር',
        convertedTime: 'የተቀየረው ሰዓት:',
        funFactTime: 'ኢትዮጵያ በ6:00 ጠዋት የሚጀምር 12-ሰዓት ስርዓት ትጠቀማለች! ⏰',
        // Holiday Calendar
        holidayCalendar: 'የበዓል ዝርዝር',
        country: 'አገር',
        loadingHolidays: 'በዓሎችን በመጫን ላይ...',
        noHolidays: 'ለዚህ ዓመት በዓል አልተገኘም።',
        year: 'ዓመት',
        // QR Code Generator
        qrCodeGenerator: 'QR ኮድ ጀነሬተር',
        enterText: 'ጽሁፍ ወይም ዩአርኤል ያስገቡ...',
        generateQR: 'QR ኮድ ፍጠር',
        download: 'አውርድ',
      },
    },
    om: {
      translation: {
        appTitle: 'Qalmaa Dijitaalaa Itoophiyaa',
        searchPlaceholder: 'Meeshaa barbaadi...',
        favorites: 'Kan jaallataman',
        dateConverter: 'Meeshaa Guyyaa Jijjiiruu',
        today: 'Guyyaa har\'aa',
        gregorian: 'Giriigooriyaan',
        ethiopian: 'Itoophiyaa',
        day: 'Guyyaa',
        month: 'Ji\'a',
        year: 'Waggaa',
        convert: 'Jijjiiri',
        ethiopianToGregorian: 'Itoophiyaa → Giriigooriyaan',
        gregorianToEthiopian: 'Giriigooriyaan → Itoophiyaa',
        convertedDate: 'Guyyaa jijjiirame:',
        exchangeRate: 'Gatii Jijjiirraa',
        amount: 'Baay\'ina',
        from: 'Irraa',
        to: 'Gadhi',
        convertCurrency: 'Maallaqa Jijjiiri',
        rateError: 'Gatii jijjiirraa argachuu hin dandeenye.',
        amountError: 'Baay\'ina sirrii galchi.',
        conversionError: 'Jijjiiruun hin milkoofne.',
        funFact: 'Birrii Itoophiyaa maallaqa durii Afrikaa keessaa isa tokko!',
        currencyNews: 'Oduu Maallaqaa',
        timeZoneConverter: 'Meeshaa Yeroo Jijjiiruu',
        fromZone: 'Irraa yeroo',
        toZone: 'Gadhi yeroo',
        dateTime: 'Guyyaa fi yeroo',
        convertTime: 'Yeroo Jijjiiri',
        convertedTime: 'Yeroo jijjiirame:',
        funFactTime: 'Itoophiyaan sa\'aatii 12 fayyadamti, guyyaan sa\'aatii 6:00 AM irraa eegala! ⏰',
        holidayCalendar: 'Kalandara Ayyaanaa',
        country: 'Biyya',
        loadingHolidays: 'Ayyaanaawwan fe\'amaa jiru...',
        noHolidays: 'Waggaa kanaaf ayyaanni hin argamne.',
        year: 'Waggaa',
        qrCodeGenerator: 'QR Koodii Uumuu',
        enterText: 'Barreeffama yookaan URL galchi...',
        generateQR: 'QR Koodii Uumi',
        download: 'Buusi',
      },
    },
    ti: {
      translation: {
        appTitle: 'የኢትዮጵያ ዲጂታል መሳርሒ',
        searchPlaceholder: 'መሳርሒ ድለ ፈልጠ...',
        favorites: 'ዝተፈቱ',
        dateConverter: 'መሳርሒ ዕለት ምቕያር',
        today: 'ሎሚ ዕለት',
        gregorian: 'ግሪጎሪያን',
        ethiopian: 'ኢትዮጵያዊ',
        day: 'መዓልቲ',
        month: 'ወርሒ',
        year: 'ዓመት',
        convert: 'ቀይር',
        ethiopianToGregorian: 'ካብ ኢትዮጵያዊ ናብ ግሪጎሪያን',
        gregorianToEthiopian: 'ካብ ግሪጎሪያን ናብ ኢትዮጵያዊ',
        convertedDate: 'ዕለት ዝተቐየረ:',
        exchangeRate: 'ዋጋ ምቕያር',
        amount: 'መጠን',
        from: 'ካብ',
        to: 'ናብ',
        convertCurrency: 'ገንዘብ ቀይር',
        rateError: 'ዋጋ ምቕያር ምምግባር ኣይተኻእለን።',
        amountError: 'እባክኩም ትኽክለኛ መጠን ኣእቱ።',
        conversionError: 'ምቕያር ኣይተሳናኸን።',
        funFact: 'ብር ኢትዮጵያ ካብ ኣፍሪቃ ናይ ነቲ ድሕሪ ጊዜ ገንዘብ እዩ!',
        currencyNews: 'ዜና ገንዘብ',
        timeZoneConverter: 'መሳርሒ ሰዓት ምቕያር',
        fromZone: 'ካብ ሰዓት ክልል',
        toZone: 'ናብ ሰዓት ክልል',
        dateTime: 'ዕለትን ሰዓትን',
        convertTime: 'ሰዓት ቀይር',
        convertedTime: 'ሰዓት ዝተቐየረ:',
        funFactTime: 'ኢትዮጵያ ሰዓት 12 ትጠቀም፣ መዓልቲ ካብ 6:00 ጸባቒ ይጀምር! ⏰',
        holidayCalendar: 'ዝኾነ በዓል',
        country: 'ሃገር',
        loadingHolidays: 'በዓላት ተጻውዒ ኣሎ...',
        noHolidays: 'ኣብዚ ዓመት በዓል የለን።',
        year: 'ዓመት',
        qrCodeGenerator: 'QR ኮድ ፍጠር',
        enterText: 'ጽሑፍ ወይ ኣድራሻ ኣእቱ...',
        generateQR: 'QR ኮድ ፍጠር',
        download: 'ውሃብ',
      },
    },
  },
  lng: localStorage.getItem('lang') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

// Persist language changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('lang', lng);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </StrictMode>,
)

// Theme persistence (light/dark)
const THEME_KEY = 'theme';
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
