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
  address: {
    street: 'Mirpur-6',
    locality: 'Dhaka',
    postalCode: '1216',
    region: 'Dhaka Division',
    country: 'BD',
  },
  geo: { lat: 23.8126, lng: 90.362 },
  hours: 'Sat-Thu, 10am-7pm', // CONFIRM
  hoursSpec: { days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '10:00', closes: '19:00' },
  founded: '2015', // CONFIRM
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14600.673126009686!2d90.3620146290997!3d23.812614297446135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1493cf44a53%3A0xa06065bc1576c3bd!2sDhaka%201216%20Section%206!5e0!3m2!1sen!2sbd!4v1667590412284!5m2!1sen!2sbd',
  social: {
    facebook: 'https://www.facebook.com/adsquidbd',
    linkedin: 'https://www.linkedin.com/company/adsquid/',
    // instagram: '', youtube: '', tiktok: '',   // add when they exist
  },

  // Forms: create a free Formspree (or Web3Forms) form and paste its endpoint.
  // While it is empty, forms open WhatsApp with the filled-in details instead.
  formEndpoint: '',

  // Analytics IDs. Empty = not loaded. All load after the window "load" event.
  analytics: { gtm: '', ga4: '', metaPixel: '' },
};

// Copyright year: taken from the build date, and refreshed in the browser by main.js (.js-year).
export const year = new Date().getFullYear();
export const legalUpdated = '23 November 2026';
