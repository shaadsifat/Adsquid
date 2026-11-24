// Long-form service copy, one file per service. serviceCopy = service page extras (about, why);
// subCopy = one entry per sub-service page, keyed "<service slug>/<sub slug>".
import ads from './ads-campaign.mjs';
import social from './social-media-marketing.mjs';
import brandId from './brand-identity-design.mjs';
import visual from './graphic-design.mjs';
import video from './video-production.mjs';
import web from './website-development.mjs';
import seo from './seo.mjs';
import software from './software-development.mjs';

const all = {
  'ads-campaign': ads,
  'social-media-marketing': social,
  'brand-identity-design': brandId,
  'graphic-design': visual,
  'video-production': video,
  'website-development': web,
  seo,
  'software-development': software,
};

export const serviceCopy = Object.fromEntries(Object.entries(all).map(([k, v]) => [k, { about: v.about, why: v.why }]));
export const subCopy = Object.fromEntries(
  Object.entries(all).flatMap(([k, v]) => Object.entries(v.subs).map(([sk, sv]) => [`${k}/${sk}`, sv]))
);
