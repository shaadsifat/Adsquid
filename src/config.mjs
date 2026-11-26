// Site-wide settings. Change values here, then run `node src/build.mjs`.
// Anything marked CONFIRM still needs a yes/no from the agency.

export const site = {
  name: 'Adsquid',
  url: 'https://adsquidbd.com', // canonical domain, no trailing slash
  tagline: 'All-in-one digital marketing agency in Dhaka.',
  phone: '+880 1888 055 999',
  phoneHref: '+8801888055999',
  whatsapp: '8801888055999', // wa.me number, digits only
  email: 'info@adsquidbd.com',
  // Head office (used in schema, footer, contact page)
  address: {
    street: 'Section-15, Mirpur',
    locality: 'Dhaka',
    postalCode: '1216',
    region: 'Dhaka Division',
    country: 'BD',
  },
  geo: { lat: 23.8103594, lng: 90.3623558 },
  hours: 'Mon-Fri, 9am-5pm',
  hoursSpec: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
  founded: '2015', // CONFIRM
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.3821601089103!2d90.38075289999999!3d23.805005899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x823f6c1515e2f32f%3A0xb99d37bbb55b7a8c!2sAdsquid!5e0!3m2!1sen!2sbd!4v1795630355529!5m2!1sen!2sbd',
  mapLink: 'https://maps.app.goo.gl/1NK4moJoSQ3sFSZi9',

  // Offices page (/offices/). To add a city, copy one entry and change it; the page, globe and schema update.
  offices: [
    {
      id: 'dhaka',
      nation: 'Bangladesh',
      head: true,
      code: 'BD',
      city: 'Dhaka',
      country: 'Bangladesh',
      lines: ['Section-15, Mirpur', 'Dhaka-1216, Bangladesh'],
      tz: 'Asia/Dhaka',
      tzName: 'GMT+6',
      hours: 'Mon-Fri, 9am-5pm',
      openDays: [1, 2, 3, 4, 5], // Monday to Friday (0 = Sunday)
      opens: 9,
      closes: 17,
      mapLink: 'https://maps.app.goo.gl/1NK4moJoSQ3sFSZi9',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.3821601089103!2d90.38075289999999!3d23.805005899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x823f6c1515e2f32f%3A0xb99d37bbb55b7a8c!2sAdsquid!5e0!3m2!1sen!2sbd!4v1795630355529!5m2!1sen!2sbd',
      pin: [70, 30], // position on the Offices page globe (% of the picture)
      region: 'asia',
      mapPos: { lat: 23.81, lng: 90.36 },
      schema: { streetAddress: 'Section-15, Mirpur', addressLocality: 'Dhaka', postalCode: '1216', addressRegion: 'Dhaka Division', addressCountry: 'BD' },
      geo: { lat: 23.8103594, lng: 90.3623558 }, // the Adsquid pin on Google Maps
    },
    {
      id: 'usa',
      nation: 'USA',
      code: 'US',
      label: 'USA Office',
      city: 'Kissimmee',
      country: 'Florida, United States',
      lines: ['2780 Club Cortile Cir', 'Kissimmee, FL 34746, USA'],
      tz: 'America/New_York',
      tzName: 'Eastern Time',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=2780+Club+Cortile+Cir%2C+Kissimmee%2C+FL+34746%2C+USA',
      pin: [32, 50], // position on the Offices page globe (% of the picture)
      region: 'north-america',
      mapPos: { lat: 28.3, lng: -81.5 }, // world map drawing only
      schema: { streetAddress: '2780 Club Cortile Cir', addressLocality: 'Kissimmee', postalCode: '34746', addressRegion: 'FL', addressCountry: 'US' },
    },
    {
      id: 'canada',
      nation: 'Canada',
      code: 'CA',
      label: 'Canada Office',
      city: 'Saskatoon',
      country: 'Saskatchewan, Canada',
      lines: ['1875 7th Street East', 'Saskatoon, SK S7H 0Z5, Canada'],
      tz: 'America/Regina',
      tzName: 'Central Time (CST)',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=1875+7th+Street+East%2C+Saskatoon%2C+SK+S7H+0Z5%2C+Canada',
      pin: [30, 24], // position on the Offices page globe (% of the picture)
      region: 'north-america',
      mapPos: { lat: 52.12, lng: -106.63 },
      schema: { streetAddress: '1875 7th Street East', addressLocality: 'Saskatoon', postalCode: 'S7H 0Z5', addressRegion: 'SK', addressCountry: 'CA' },
    },
    {
      id: 'australia',
      nation: 'Australia',
      code: 'AU',
      label: 'Australia Office',
      city: 'Cranbourne North',
      country: 'Victoria, Australia',
      lines: ['2 Dalziell Crescent', 'Cranbourne North, VIC 3977, Australia'],
      tz: 'Australia/Melbourne',
      tzName: 'Melbourne Time',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=2+Dalziell+Crescent%2C+Cranbourne+North%2C+VIC+3977%2C+Australia',
      pin: [76, 74], // position on the Offices page globe (% of the picture)
      region: 'oceania',
      mapPos: { lat: -38.08, lng: 145.29 },
      schema: { streetAddress: '2 Dalziell Crescent', addressLocality: 'Cranbourne North', postalCode: '3977', addressRegion: 'VIC', addressCountry: 'AU' },
    },
    {
      id: 'malaysia',
      nation: 'Malaysia',
      code: 'MY',
      label: 'Malaysia Office',
      city: 'Nilai',
      country: 'Negeri Sembilan, Malaysia',
      lines: ['Mesahill Block E.32.03, Persiaran Ilmu', 'Bandar Baru Nilai, 71800 Nilai', 'Negeri Sembilan, Malaysia'],
      tz: 'Asia/Kuala_Lumpur',
      tzName: 'Malaysia Time (GMT+8)',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=Mesahill%2C+Persiaran+Ilmu%2C+Bandar+Baru+Nilai%2C+71800+Nilai%2C+Negeri+Sembilan%2C+Malaysia',
      pin: [64, 56], // position on the Offices page globe (% of the picture)
      region: 'asia',
      mapPos: { lat: 2.82, lng: 101.79 },
      schema: { streetAddress: 'Mesahill Block E.32.03, Persiaran Ilmu, Bandar Baru Nilai', addressLocality: 'Nilai', postalCode: '71800', addressRegion: 'Negeri Sembilan', addressCountry: 'MY' },
    },
  ],
  social: {
    facebook: 'https://www.facebook.com/adsquidbd',
    linkedin: 'https://www.linkedin.com/company/adsquid/',
    // instagram: '', youtube: '', tiktok: '',   // add when they exist
  },

  // Forms: create a free Formspree (or Web3Forms) form and paste its endpoint.
  // While it is empty, forms open WhatsApp with the filled-in details instead.
  formEndpoint: '/api/send.php',

  // Analytics IDs. Empty = not loaded. All load after the window "load" event.
  analytics: { gtm: '', ga4: '', metaPixel: '' },
};

// Copyright year: taken from the build date, and refreshed in the browser by main.js (.js-year).
export const year = new Date().getFullYear();
export const legalUpdated = '27 November 2026';
