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
  geo: { lat: 23.8050059, lng: 90.3807529 },
  hours: 'Sat-Thu, 10am-7pm', // CONFIRM
  hoursSpec: { days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '10:00', closes: '19:00' },
  founded: '2015', // CONFIRM
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.3821601089103!2d90.38075289999999!3d23.805005899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x823f6c1515e2f32f%3A0xb99d37bbb55b7a8c!2sAdsquid!5e0!3m2!1sen!2sbd!4v1795630355529!5m2!1sen!2sbd',
  mapLink: 'https://maps.app.goo.gl/1NK4moJoSQ3sFSZi9',

  // Offices page (/offices/). To add a city, copy one entry and change it; the page, globe and schema update.
  offices: [
    {
      id: 'dhaka',
      head: true,
      code: 'BD',
      city: 'Dhaka',
      country: 'Bangladesh',
      lines: ['Section-15, Mirpur', 'Dhaka-1216, Bangladesh'],
      tz: 'Asia/Dhaka',
      tzName: 'GMT+6',
      hours: 'Sat-Thu, 10am-7pm',
      openDays: [6, 0, 1, 2, 3, 4], // Saturday to Thursday (0 = Sunday)
      opens: 10,
      closes: 19,
      mapLink: 'https://maps.app.goo.gl/1NK4moJoSQ3sFSZi9',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.3821601089103!2d90.38075289999999!3d23.805005899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x823f6c1515e2f32f%3A0xb99d37bbb55b7a8c!2sAdsquid!5e0!3m2!1sen!2sbd!4v1795630355529!5m2!1sen!2sbd',
      pin: [70, 43],
      region: 'asia',
      mapPos: { lat: 23.81, lng: 90.38 },
      schema: { streetAddress: 'Section-15, Mirpur', addressLocality: 'Dhaka', postalCode: '1216', addressRegion: 'Dhaka Division', addressCountry: 'BD' },
      geo: { lat: 23.8050059, lng: 90.3807529 },
    },
    {
      id: 'usa',
      code: 'US',
      label: 'USA Office',
      city: 'Kissimmee, Florida',
      country: 'United States',
      lines: ['2780 Club Cortile Cir', 'Kissimmee, FL 34746, USA'],
      tz: 'America/New_York',
      tzName: 'Eastern Time',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=2780+Club+Cortile+Cir,+Kissimmee,+FL+34746',
      mapEmbed: 'https://www.google.com/maps?q=2780+Club+Cortile+Cir,+Kissimmee,+FL+34746&output=embed',
      pin: [30, 47],
      region: 'north-america',
      mapPos: { lat: 28.3, lng: -81.5 }, // map drawing only (not used in schema)
      schema: { streetAddress: '2780 Club Cortile Cir', addressLocality: 'Kissimmee', postalCode: '34746', addressRegion: 'FL', addressCountry: 'US' },
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
export const legalUpdated = '26 November 2026';
