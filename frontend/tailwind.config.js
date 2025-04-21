/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        primaryColor: '#1A1A1A', //nagłówek, tło nawigacji, przyciski Głęboki fioletowy/granatowy
        secondaryColor: '#FFD300', //tło główne, elementy przyciągające uwagę Jaskrawy żółty
        backgroundColor: '#FCE96A', //sekcje tła, kontrastowa przestrzeń Jasna żółć/pastelowy żółty
        accentColor: '#E4572E', //linki, aktywne przyciski, "call to action" Pomarańczowo-czerwony
        textColor: '#222222', //tekst główny Ciemny szary lub czarny
        navTextColor: '#F9FAFB', //tekst nawigacji
      }
    },
  },
  plugins: [],
};
