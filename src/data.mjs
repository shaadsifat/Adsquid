// Content data for generated pages. Copy rule: short lines, one idea each,
// no long dashes (use - or :). Items marked CONFIRM need agency approval.

export const groups = [
  { id: 'marketing', name: 'Marketing' },
  { id: 'creative', name: 'Creative' },
  { id: 'technology', name: 'Technology' },
];

// The eight services, in the order of the services brief (Adsquid Website Work 2026).
// key = image family (obj-*, hero-*, cover-*); obj/hero/cover override it where a service has its own art.
// subs = the sub-services from the brief; every sub has its own page at /services/<service>/<sub slug>/ (copy in src/content/services/).
export const services = [
  {
    slug: 'ads-campaign',
    key: 'digital-ads',
    group: 'marketing',
    name: 'Ads Campaign',
    short: 'Ads Campaign',
    icon: 'megaphone',
    pitch: 'Ads that pay back, not just get likes.',
    h1: 'Ads campaign management in Bangladesh',
    display: 'Ads that pay back.',
    sentence: 'Meta, Google, TikTok, YouTube and LinkedIn campaigns tuned for sales, not likes.',
    title: 'Ads Campaign Management in Bangladesh | Meta, Google, TikTok | Adsquid',
    desc: 'Meta, Google, TikTok, YouTube and LinkedIn ads managed for sales. Full tracking setup, weekly tests and clear monthly reports.',
    intro:
      'Our ads campaign management in Bangladesh is judged on one thing: what each campaign brings back. Every taka is tracked from click to order.',
    problems: [
      { title: 'Boosting, not selling', text: 'Boosted posts collect likes. The inbox stays quiet and sales stay flat.' },
      { title: 'Tracking is broken', text: 'No Pixel, no Conversions API, no GA4 goals. Nobody knows which ad sold.' },
      { title: 'One ad, forever', text: 'The same creative runs for months. Costs climb as people stop seeing it.' },
    ],
    subs: [
      { brand: 'meta', slug: 'meta-ads', title: 'Meta Ads', text: 'Facebook, Instagram, Messenger and WhatsApp ads.' },
      { brand: 'googleads', slug: 'google-ads', title: 'Google Ads', text: 'Search, Display, Shopping and Performance Max.' },
      { brand: 'tiktok', slug: 'tiktok-ads', title: 'TikTok Ads', text: 'In-feed and Spark ads with native creatives.' },
      { brand: 'youtube', slug: 'youtube-ads', title: 'YouTube Ads', text: 'In-stream, Shorts and bumper ads that stop the skip.' },
      { brand: 'linkedin', slug: 'linkedin-ads', title: 'LinkedIn Ads', text: 'B2B lead campaigns for decision makers.' },
    ],
    steps: [
      { title: 'Audit', text: 'We check your account, tracking and past results.' },
      { title: 'Plan', text: 'Platforms, budget split, audiences and offers.' },
      { title: 'Launch', text: 'Creatives, campaigns and tracking go live together.' },
      { title: 'Optimize', text: 'Weekly tests. Cut what loses, scale what wins.' },
    ],
    tools: ['meta', 'googleads', 'tiktok', 'youtube', 'linkedin', 'googleanalytics'],
    faq: [
      { q: 'What is the minimum ad budget?', a: 'Most clients start between ৳30,000 and ৳1,00,000 per month in ad spend. We will tell you honestly if your budget is too small for a platform.' },
      { q: 'Is the ad budget included in your fee?', a: 'No. Ad spend is paid directly to Meta, Google, TikTok or LinkedIn from your own account. Our management fee is separate.' },
      { q: 'How soon will I see results?', a: 'Most accounts show clear signals in 2-4 weeks. Stable, profitable results usually take 6-8 weeks of testing.' },
      { q: 'Do I keep my ad accounts?', a: 'Yes. Everything runs in your own Business Manager and ad accounts. You always own the data.' },
      { q: 'What reports do I get?', a: 'A short weekly update and a monthly report: spend, sales or leads, cost per result and what we test next.' },
    ],
  },
  {
    slug: 'social-media-marketing',
    key: 'social-media',
    group: 'marketing',
    name: 'Social Media',
    short: 'Social Media',
    icon: 'share-2',
    pitch: 'Daily presence that builds buyers.',
    h1: 'Social media marketing agency in Bangladesh',
    display: 'Be there. Every day.',
    sentence: 'Planning, posting and community care on every platform your buyers use.',
    title: 'Social Media Marketing Agency in Bangladesh | Adsquid',
    desc: 'Social media management for Facebook, Instagram, Threads, TikTok, YouTube, LinkedIn, X and Pinterest: calendars, posting and community care.',
    intro:
      'We are a social media marketing agency in Bangladesh that keeps your pages active, on brand and answering fast, on every platform your buyers use.',
    problems: [
      { title: 'Posting when there is time', text: 'Weeks of silence, then five posts in one day. The algorithm forgets you.' },
      { title: 'Slow replies', text: 'Messages wait for hours. The buyer orders from the page that replied first.' },
      { title: 'No plan behind posts', text: 'Random posts, random results. Nothing builds on the last one.' },
    ],
    subs: [
      { brand: 'facebook', slug: 'facebook-marketing', title: 'Facebook', text: 'Page management, posts, groups and inbox.' },
      { brand: 'instagram', slug: 'instagram-marketing', title: 'Instagram', text: 'Feed, Reels, Stories and highlights.' },
      { brand: 'threads', slug: 'threads-marketing', title: 'Threads', text: 'Short daily posts that start conversations.' },
      { brand: 'tiktok', slug: 'tiktok-marketing', title: 'TikTok', text: 'Trend-led short videos made for the For You page.' },
      { brand: 'youtube', slug: 'youtube-marketing', title: 'YouTube', text: 'Channel setup, videos, Shorts and SEO.' },
      { brand: 'linkedin', slug: 'linkedin-marketing', title: 'LinkedIn', text: 'Company page and founder content for B2B.' },
      { brand: 'x', slug: 'x-twitter-marketing', title: 'Twitter (X)', text: 'Timely posts, threads and replies.' },
      { brand: 'pinterest', slug: 'pinterest-marketing', title: 'Pinterest', text: 'Pins and boards that send buyers to your site.' },
    ],
    steps: [
      { title: 'Audit', text: 'We review your pages and your competitors.' },
      { title: 'Plan', text: 'Pillars, formats and a monthly calendar.' },
      { title: 'Publish', text: 'Designs, captions and posting on schedule.' },
      { title: 'Report', text: 'Reach, engagement and messages, every month.' },
    ],
    tools: ['facebook', 'instagram', 'threads', 'tiktok', 'youtube', 'linkedin', 'x', 'pinterest'],
    faq: [
      { q: 'Which platforms do you manage?', a: 'Facebook, Instagram, Threads, TikTok, YouTube, LinkedIn, X and Pinterest. We pick the ones where your buyers actually spend time.' },
      { q: 'How many posts per month?', a: 'Most packages include 12 to 30 posts a month, mixed between images, carousels and reels.' },
      { q: 'Do you reply to messages?', a: 'Yes, if you choose community management. We agree on answers to common questions and hand over sales leads to your team.' },
      { q: 'Do I approve posts first?', a: 'Always. You see the full calendar before the month starts and can change anything.' },
    ],
  },
  {
    slug: 'brand-identity-design',
    key: 'graphic-design',
    hero: 'services/hero-brand-content',
    group: 'creative',
    name: 'Brand Content',
    short: 'Brand Content',
    icon: 'gem',
    pitch: 'A brand people remember at first sight.',
    h1: 'Brand identity design agency in Dhaka',
    display: 'Brands people remember.',
    sentence: 'Logo, identity and brand guidelines that make every touchpoint look like you.',
    title: 'Brand Identity Design Agency in Dhaka | Logo & Guidelines | Adsquid',
    desc: 'Logo design, brand identity and brand guidelines for businesses in Bangladesh. One clear look across ads, social, web and print.',
    intro:
      'As a brand identity design agency in Dhaka, we build the logo, the identity system and the guidelines that keep every post, ad and package on brand.',
    problems: [
      { title: 'A logo, but no brand', text: 'Colours and fonts change from post to post. People do not recognise you.' },
      { title: 'Looks smaller than it is', text: 'A home-made logo makes a serious business look like a side project.' },
      { title: 'No rules to follow', text: 'Every designer guesses. The brand drifts a little more each month.' },
    ],
    subs: [
      { icon: 'pen-tool', slug: 'logo-design', title: 'Logo', text: 'A distinctive mark and wordmark in every format you need.' },
      { icon: 'palette', slug: 'brand-identity', title: 'Identity', text: 'Colours, typography, patterns and stationery as one system.' },
      { icon: 'book-marked', slug: 'brand-guidelines', title: 'Guideline', text: 'A brand book that keeps every designer and agency consistent.' },
    ],
    steps: [
      { title: 'Discover', text: 'Your story, audience and competitors.' },
      { title: 'Concept', text: 'Two or three directions to choose from.' },
      { title: 'Refine', text: 'We polish the chosen direction with you.' },
      { title: 'Deliver', text: 'Logo files, identity kit and guideline book.' },
    ],
    tools: ['adobeillustrator', 'adobephotoshop', 'figma', 'adobeindesign'],
    faq: [
      { q: 'How long does a brand identity take?', a: 'A logo takes about 1-2 weeks. A full identity with guidelines usually takes 3-5 weeks.' },
      { q: 'How many logo options do I get?', a: 'Two or three distinct concepts, then refinements on the one you choose.' },
      { q: 'What files do I receive?', a: 'Vector and web files (AI, SVG, PDF, PNG) in colour, black and white, plus the brand guideline book.' },
      { q: 'Can you refresh my existing logo?', a: 'Yes. Often a careful refresh keeps the recognition you have built and fixes what is not working.' },
    ],
  },
  {
    slug: 'graphic-design',
    key: 'visual-content',
    hero: 'services/hero-graphic-design',
    cover: 'blog/cover-graphic-design',
    group: 'creative',
    name: 'Visual Content',
    short: 'Visual Content',
    icon: 'image',
    pitch: 'Designs that stop the scroll and sell.',
    h1: 'Graphic design agency in Dhaka',
    display: 'Designs that stop the scroll.',
    sentence: 'Social posts, banners, web content, packaging and print made to sell.',
    title: 'Graphic Design Agency in Dhaka | Social, Packaging & Print | Adsquid',
    desc: 'Social media posts, banners, web content, packaging and print design that stop the scroll and drive sales, from a graphic design agency in Dhaka.',
    intro:
      'We are a graphic design agency in Dhaka focused on visuals that sell: social posts, banners, web content, packaging and print built around one clear message.',
    problems: [
      { title: 'Pretty but quiet', text: 'Designs look nice but say nothing. Nobody knows what to do next.' },
      { title: 'No consistent look', text: 'Every post looks different. People do not recognise your brand.' },
      { title: 'Slow turnaround', text: 'Campaigns wait days for a banner. Opportunities pass.' },
    ],
    subs: [
      { icon: 'images', slug: 'social-media-post-design', title: 'Social Media Post', text: 'Posts, carousels and stories for every platform.' },
      { icon: 'layout-template', slug: 'banner-design', title: 'Banner', text: 'Web banners, ad creatives and cover designs.' },
      { icon: 'monitor', slug: 'web-content-design', title: 'Web Content', text: 'Website graphics, landing visuals and product images.' },
      { icon: 'package', slug: 'packaging-design', title: 'Packaging Design', text: 'Boxes, labels and bags that sell on the shelf.' },
      { icon: 'printer', slug: 'print-design', title: 'Printing Design', text: 'Flyers, brochures, stationery and standees.' },
    ],
    steps: [
      { title: 'Brief', text: 'Goal, audience, message and format.' },
      { title: 'Concept', text: 'Direction and first drafts.' },
      { title: 'Refine', text: 'Two rounds of changes included.' },
      { title: 'Deliver', text: 'Every size and file you need.' },
    ],
    tools: ['figma', 'adobephotoshop', 'adobeillustrator', 'canva', 'blender'],
    faq: [
      { q: 'How fast do you deliver?', a: 'Most social and banner designs are ready in 24-48 hours. Packaging and print are scheduled with you.' },
      { q: 'How many revisions are included?', a: 'Two rounds of changes per design. More rounds are fine, we just agree on it first.' },
      { q: 'Do I get the source files?', a: 'Yes. You receive final files in every size, plus source files on request.' },
      { q: 'Do you prepare print-ready files?', a: 'Yes: correct size, bleed and colour mode, ready for your printer.' },
    ],
  },
  {
    slug: 'video-production',
    key: 'content',
    group: 'creative',
    name: 'Video Content',
    short: 'Video Content',
    icon: 'clapperboard',
    pitch: 'Video people actually watch.',
    h1: 'Video production agency in Bangladesh',
    display: 'Video people watch.',
    sentence: 'Reels, motion graphics, promo videos, animation and 3D that tell your story fast.',
    title: 'Video Production Agency in Bangladesh | Reels, Motion & 3D | Adsquid',
    desc: 'Reels, motion graphics, promo videos, 2D animation and 3D product videos that hook in the first second, from a video production agency in Bangladesh.',
    intro:
      'As a video production agency in Bangladesh, we make reels, motion graphics, promo videos, animation and 3D that hook in the first second and sell by the last.',
    problems: [
      { title: 'Skipped in a second', text: 'Slow intros lose viewers before the message even starts.' },
      { title: 'Phone videos only', text: 'Shaky clips make a good product look cheap.' },
      { title: 'One video, one size', text: 'A wide video squeezed into Reels loses half the frame.' },
    ],
    subs: [
      { icon: 'video', slug: 'reels-video', title: 'Reels Video', text: 'Hook-first vertical videos for Reels, TikTok and Shorts.' },
      { icon: 'sparkles', slug: 'motion-graphics', title: 'Motion Video', text: 'Motion graphics for ads, explainers and logos.' },
      { icon: 'clapperboard', slug: 'promo-video', title: 'Promo Video', text: 'Product and brand promos shot and edited in-house.' },
      { icon: 'film', slug: 'animation', title: 'Animation', text: '2D animated explainers and character stories.' },
      { icon: 'rotate-3d', slug: '3d-animation', title: '3D', text: '3D product videos and CGI ads, no studio needed.' },
    ],
    steps: [
      { title: 'Idea', text: 'Hooks, angles and a simple script.' },
      { title: 'Produce', text: 'Shoot, animate or render, in-house.' },
      { title: 'Edit', text: 'Fast cuts, captions, sound and colour.' },
      { title: 'Deliver', text: 'Every ratio, ready to post or run as ads.' },
    ],
    tools: ['adobepremierepro', 'adobeaftereffects', 'blender', 'adobephotoshop'],
    faq: [
      { q: 'Do you shoot on location?', a: 'Yes, in Dhaka. For many products we can also shoot in our space or create 3D with no shoot at all.' },
      { q: 'What is a 3D product video?', a: 'A 3D animated video of your product. It looks premium, needs no studio and is easy to update.' },
      { q: 'How long are your reels?', a: 'Usually 15-45 seconds. The first second carries the hook; the rest earns the click.' },
      { q: 'Can the videos be used as ads?', a: 'Yes. We deliver 9:16, 1:1 and 16:9 versions so every placement is covered.' },
    ],
  },
  {
    slug: 'website-development',
    key: 'website',
    group: 'technology',
    name: 'Website',
    short: 'Website',
    icon: 'monitor-smartphone',
    pitch: 'Websites that sell while you sleep.',
    h1: 'Website development company in Bangladesh',
    display: 'Websites that sell.',
    sentence: 'Fast, SEO-ready websites for every kind of business, from portfolio to custom.',
    title: 'Website Development Company in Bangladesh | Adsquid',
    desc: 'Portfolio, e-commerce, business, blog, news, education, non-profit and custom websites: fast, SEO-ready and built in Bangladesh.',
    intro:
      'We are a website development company in Bangladesh building fast, SEO-ready websites, from a simple portfolio to a custom platform with local payments built in.',
    problems: [
      { title: 'Slow to load', text: 'Every extra second loses visitors, especially on mobile data.' },
      { title: 'Hard to use', text: 'Confusing menus and checkout. Visitors leave without calling or buying.' },
      { title: 'Built, then forgotten', text: 'No updates, no backups, no security. Until something breaks.' },
    ],
    subs: [
      { icon: 'briefcase', slug: 'portfolio-website', title: 'Portfolio', text: 'Show your work beautifully and win clients.' },
      { icon: 'shopping-cart', slug: 'ecommerce-website', title: 'E-commerce', text: 'Online stores with bKash, cards and courier.' },
      { icon: 'building-2', slug: 'business-website', title: 'Business', text: 'Clear company websites that turn visits into calls.' },
      { icon: 'pen-line', slug: 'blog-website', title: 'Blog', text: 'Content sites built to rank and grow.' },
      { icon: 'newspaper', slug: 'news-portal', title: 'News Media', text: 'Fast news portals with categories and ads.' },
      { icon: 'graduation-cap', slug: 'education-website', title: 'Education', text: 'Schools, courses and coaching websites.' },
      { icon: 'hand-heart', slug: 'nonprofit-website', title: 'Non-profit', text: 'Websites for causes, with donations built in.' },
      { icon: 'code', slug: 'custom-website', title: 'Custom', text: 'Custom builds on Laravel, Python or React.' },
    ],
    steps: [
      { title: 'Plan', text: 'Pages, features and content map.' },
      { title: 'Design', text: 'Mobile-first layouts you approve.' },
      { title: 'Build', text: 'Clean code, SEO and tracking built in.' },
      { title: 'Launch', text: 'Testing, go-live and handover training.' },
    ],
    tools: ['wordpress', 'woocommerce', 'shopify', 'laravel', 'react', 'figma'],
    faq: [
      { q: 'How much does a website cost?', a: 'It depends on pages and features. A portfolio and an e-commerce store are very different. Ask for a free quote with a clear scope.' },
      { q: 'How long does it take?', a: 'A business or portfolio site takes about 2-4 weeks. E-commerce and custom builds take 4-10 weeks.' },
      { q: 'Can you add bKash payments?', a: 'Yes. We integrate bKash, SSLCommerz and other local gateways.' },
      { q: 'Will I be able to edit the site?', a: 'Yes. We build on platforms you can manage, and we train your team at handover.' },
      { q: 'Do you offer maintenance?', a: 'Yes: updates, backups, security checks and small changes on a monthly plan.' },
    ],
  },
  {
    slug: 'seo',
    key: 'seo',
    group: 'marketing',
    name: 'SEO',
    short: 'SEO',
    icon: 'search',
    pitch: 'Get found on Google, month after month.',
    h1: 'SEO services in Bangladesh',
    display: 'Get found on Google.',
    sentence: 'On-page, off-page, technical and local SEO that grows month after month.',
    title: 'SEO Services in Bangladesh | On-Page, Technical & Local SEO | Adsquid',
    desc: 'Rank higher on Google with on-page, off-page, technical and local SEO. Monthly reports you can actually read, from an SEO team in Dhaka.',
    intro:
      'Our SEO services in Bangladesh fix what holds your site back, then build pages and links that bring buyers from Google every month, without paying per click.',
    problems: [
      { title: 'Invisible on Google', text: 'Your competitors show up. You are on page three, where nobody looks.' },
      { title: 'Slow, broken site', text: 'Slow pages and errors stop Google from ranking you, however good the content.' },
      { title: 'No local presence', text: 'Your Google Business Profile is empty or missing. Map searches go elsewhere.' },
    ],
    subs: [
      { icon: 'file-text', slug: 'on-page-seo', title: 'On-Page', text: 'Titles, content, headings and internal links per keyword.' },
      { icon: 'link', slug: 'off-page-seo', title: 'Off-Page', text: 'Clean, relevant links and mentions from real sites.' },
      { icon: 'wrench', slug: 'technical-seo', title: 'Technical', text: 'Speed, indexing, schema and site structure.' },
      { icon: 'map-pin', slug: 'local-seo', title: 'Local', text: 'Google Business Profile, reviews and local listings.' },
    ],
    steps: [
      { title: 'Audit', text: 'Technical scan, keyword gaps and competitors.' },
      { title: 'Fix', text: 'Speed, errors, structure and schema.' },
      { title: 'Build', text: 'Optimised pages and new content.' },
      { title: 'Grow', text: 'Links, local signals and monthly reports.' },
    ],
    tools: ['googlesearchconsole', 'googleanalytics', 'semrush', 'google', 'wordpress'],
    faq: [
      { q: 'How long does SEO take?', a: 'Expect first movement in 2-3 months and solid results in 4-6 months. SEO compounds: the gains keep growing.' },
      { q: 'Can you guarantee first position?', a: 'No honest agency can. We commit to the work, the reporting and clear progress on the keywords that matter.' },
      { q: 'Do you work on Bangla keywords?', a: 'Yes. Many local searches happen in Bangla, and we plan pages for both languages where it makes sense.' },
      { q: 'What do monthly reports show?', a: 'Rankings, organic traffic, leads from search and the work done that month, in plain language.' },
    ],
  },
  {
    slug: 'software-development',
    key: 'software',
    group: 'technology',
    name: 'Software',
    short: 'Software',
    icon: 'cpu',
    pitch: 'Software built around your workflow.',
    h1: 'Custom software development in Bangladesh',
    display: 'Software that fits you.',
    sentence: 'POS, ERP, CRM, HR, accounting and custom software built around how you work.',
    title: 'Custom Software Development in Bangladesh | POS, ERP, CRM | Adsquid',
    desc: 'POS, ERP, CRM, HR, accounting and custom business software built around your workflow, with API integrations, from Dhaka.',
    intro:
      'Our custom software development in Bangladesh replaces spreadsheets and copy-paste with POS, ERP, CRM, HR and accounting tools shaped around how your team works.',
    problems: [
      { title: 'Spreadsheet chaos', text: 'Orders, stock and staff live in ten sheets. Mistakes are daily.' },
      { title: 'Tools that do not talk', text: 'Shop, accounts and courier are separate. Staff copy data by hand.' },
      { title: 'Off-the-shelf misfit', text: 'Generic software forces your team to work its way, not yours.' },
    ],
    subs: [
      { icon: 'store', slug: 'pos-software', title: 'POS', text: 'Point of sale for shops and restaurants, online and offline.' },
      { icon: 'layers', slug: 'erp-software', title: 'ERP', text: 'Stock, purchase, sales and production in one system.' },
      { icon: 'contact', slug: 'crm-software', title: 'CRM', text: 'Leads, customers and follow-ups in one place.' },
      { icon: 'users', slug: 'hr-software', title: 'HR', text: 'Staff, attendance, leave and payroll.' },
      { icon: 'calculator', slug: 'accounting-software', title: 'Accounting', text: 'Invoices, expenses and reports that add up.' },
      { icon: 'code', slug: 'custom-software', title: 'Custom', text: 'Web apps and dashboards for your exact process.' },
    ],
    steps: [
      { title: 'Discover', text: 'We map your workflow and pain points.' },
      { title: 'Design', text: 'Screens and flows you can click through.' },
      { title: 'Build', text: 'Short sprints with demos every week.' },
      { title: 'Support', text: 'Launch, training and ongoing care.' },
    ],
    tools: ['laravel', 'python', 'react', 'nodedotjs', 'mysql', 'flutter'],
    faq: [
      { q: 'Custom software or a ready-made tool?', a: 'If a ready tool fits 90 percent of your needs, use it. Custom makes sense when your process is your advantage.' },
      { q: 'How long does a project take?', a: 'A focused first version usually takes 6-12 weeks. We ship in small steps so you see progress early.' },
      { q: 'Who owns the code?', a: 'You do. Full source code and documentation are handed over on final payment.' },
      { q: 'Do you provide support after launch?', a: 'Yes. We offer monthly support plans for fixes, updates and new features.' },
    ],
  },
];

// Portfolio: real work samples (images/work/<slug>.webp). service = main service; also = other service pages that show it.
export const works = [
  { slug: 'logo-design-branding', title: 'Logo Design & Branding', service: 'brand-identity-design', filter: 'brand' },
  { slug: 'fashion-branding-design', title: 'Fashion Branding Design', service: 'brand-identity-design', filter: 'brand' },
  { slug: 'social-media-post-design', title: 'Social Media Post Design', service: 'graphic-design', filter: 'visual', also: ['social-media-marketing', 'ads-campaign'] },
  { slug: 'food-social-media-design', title: 'Food Social Media Design', service: 'graphic-design', filter: 'visual', also: ['social-media-marketing', 'ads-campaign'] },
  { slug: 'burger-social-media', title: 'Burger Social Media', service: 'graphic-design', filter: 'visual', also: ['social-media-marketing', 'ads-campaign'] },
  { slug: 'fitness-social-media', title: 'Fitness Social Media', service: 'graphic-design', filter: 'visual', also: ['social-media-marketing', 'ads-campaign'] },
  { slug: 'pet-care-social-media-post', title: 'Pet Care Social Media Post', service: 'graphic-design', filter: 'visual', also: ['social-media-marketing', 'ads-campaign'] },
  { slug: 'printing-design', title: 'Printing Design', service: 'graphic-design', filter: 'visual' },
  { slug: 'custom-website-design', title: 'Custom Website Design', service: 'website-development', filter: 'website' },
  { slug: 'website-ui-ux-design', title: 'Website UI/UX Design', service: 'website-development', filter: 'website' },
  { slug: 'website-theme-design', title: 'Website Theme Design', service: 'website-development', filter: 'website' },
  { slug: 'software-dashboard', title: 'Software Dashboard', service: 'software-development', filter: 'software' },
  { slug: 'app-development', title: 'App Development', service: 'software-development', filter: 'software' },
];

export const workFilters = [
  { id: 'all', name: 'All' },
  { id: 'brand', name: 'Brand Content' },
  { id: 'visual', name: 'Visual Content' },
  { id: 'website', name: 'Website' },
  { id: 'software', name: 'Software' },
];

// Team, in the order of the numbered portraits (01-08). Photos: images/team/<photo>.webp
export const team = [
  { name: 'Nirjhar Khan', role: 'Creative Director', photo: 'nirjhar-khan', linkedin: 'https://www.linkedin.com/in/nirjharkhan' },
  { name: 'Sakib Malik', role: 'Creative Advisor', photo: 'sakib-malik', linkedin: 'https://www.linkedin.com/in/sakibmalik/' },
  { name: 'Kazi Asif', role: 'Brand Strategist', photo: 'kazi-asif', linkedin: 'https://www.linkedin.com/in/kaziasifuzzaman/' },
  { name: 'Zaeid Sikder Tomal', role: 'Content Specialist', photo: 'zaeid-sikder-tomal', linkedin: 'https://www.linkedin.com/in/tomal-sikder-856464257' },
  { name: 'Fuad Al Hassan', role: 'Creative Designer', photo: 'fuad-al-hassan', linkedin: 'https://www.linkedin.com/in/fuad-al-hassan-6091a1219/' },
  { name: 'Md Shaad Uddin Sifat', role: 'Tech Specialist', photo: 'shaad-sifat', linkedin: 'https://www.linkedin.com/in/shaad-sifat/' },
  { name: 'Mezbahul Alam Rafi', role: 'Marketing Specialist', photo: 'mezbahul-rafi', linkedin: 'https://www.linkedin.com/in/mezbahul-alam-rafi/' },
  { name: 'Mubin Siddique', role: 'Market Analyst', photo: 'mubin-siddique', linkedin: 'https://www.linkedin.com/in/mubin-siddique-00002/' },
];

export const counters = [
  { value: 50, suffix: '+', label: 'Clients worldwide' },
  { value: 2015, suffix: '', label: 'Growing brands since', plain: true },
  { value: 8, suffix: '', label: 'Services, one team' },
  { value: 5, suffix: '', label: 'Countries' },
];

export const whyUs = [
  { icon: 'users', title: 'In-house team', text: 'No outsourcing. Marketers, designers, video editors and developers work in one office, so ideas move from plan to live in days.' },
  { icon: 'file-text', title: 'Clear monthly reports', text: 'Plain numbers every month: what we spent, what it brought back and what we will test next. No jargon, no vanity metrics.' },
  { icon: 'headphones', title: 'One point of contact', text: 'One account manager who knows your business and answers on WhatsApp. No ticket queues, no passing you around.' },
  { icon: 'globe', title: 'Local roots, global reach', text: 'Born in Bangladesh and serving brands in five countries. We know bKash and courier as well as global ad platforms.' },
];

// Home "Why Adsquid": what a client gets.
export const whyPromises = ['Free audit before any contract', 'Tracking set up before we spend', 'You own every account and file', 'Same-day replies on working days'];
export const processSteps = [
  { title: 'Audit', text: 'Find the leaks.' },
  { title: 'Strategy', text: 'Pick the channels.' },
  { title: 'Create', text: 'Make what stops the scroll.' },
  { title: 'Launch', text: 'Go live, fast.' },
  { title: 'Optimize', text: 'Test, cut, scale.' },
];

export const values = [
  { icon: 'trending-up', title: 'Results first', text: 'We measure ourselves by your numbers.' },
  { icon: 'shield-check', title: 'Honest reports', text: 'Good month or bad, you get the truth.' },
  { icon: 'zap', title: 'Fast replies', text: 'Same-day answers, every working day.' },
  { icon: 'book-open', title: 'Always learning', text: 'Platforms change weekly. So do we.' },
];

export const timeline = [
  { year: '2015', title: 'Founded in Bangladesh', text: '360° digital ads management for local brands.' },
  { year: '2018', title: 'Creative team', text: 'Visual and dynamic content, made in-house.' },
  { year: '2020', title: 'Tech team', text: 'Website and software development join the lineup.' },
  { year: '2024', title: '50+ clients', text: 'Brands all over the world.' },
  { year: '2026', title: '5 country operations', text: 'Eight services, one team, five countries.' },
];

export const careers = {
  why: [
    { icon: 'rocket', title: 'Real responsibility', text: 'Own accounts and projects from your first month.' },
    { icon: 'graduation-cap', title: 'Learn every week', text: 'Courses, certifications and weekly knowledge shares.' },
    { icon: 'users', title: 'Small, close team', text: 'Marketers, designers and developers in one room.' },
    { icon: 'coffee', title: 'Fair and friendly', text: 'Clear goals, fair pay, no drama.' },
  ],
  roles: [], // e.g. { title: 'Meta Ads Specialist', type: 'Full-time', location: 'Mirpur, Dhaka' }
};

export const freeAudit = {
  get: [
    { icon: 'target', title: 'Ads account check', text: 'Tracking, structure, spend and wasted budget.' },
    { icon: 'message-circle', title: 'Page and content review', text: 'Your social pages, posts and replies.' },
    { icon: 'gauge', title: 'Website speed and SEO scan', text: 'Speed, mobile, Google visibility.' },
    { icon: 'list-checks', title: 'A 1-page action plan', text: 'The top fixes, in order of impact.' },
  ],
  next: [
    { title: 'We review', text: 'Within 24-48 hours.' },
    { title: 'We call you', text: 'A short call to walk through what we found.' },
    { title: 'You get the plan', text: 'Keep it, use it, with or without us.' },
  ],
  faq: [
    { q: 'Is the audit really free?', a: 'Yes. No payment, no contract. If you like the plan, we can talk about working together.' },
    { q: 'What do you need from me?', a: 'Your website or page link. For an ads check, we may ask for view-only access to your ad account.' },
    { q: 'Will you share my data?', a: 'Never. Your information is only used to prepare your audit.' },
  ],
  budgets: ['Not running ads yet', 'Under ৳30,000 / month', '৳30,000 - ৳1,00,000 / month', '৳1,00,000 - ৳5,00,000 / month', 'Over ৳5,00,000 / month'],
  goals: ['More sales', 'More leads or messages', 'Brand awareness', 'A new website', 'Better Google ranking', 'Not sure yet'],
};

export const clients = [
  ['Aloria', 'aloria'], ['Button Box', 'button-box'], ['Car Sync', 'car-sync'], ['DNS BD', 'dns-bd'],
  ['Dazzle Dental Care', 'dazzle-dental-care'], ['Farzanea', 'farzanea'], ['Leather Fly', 'leather-fly'], ['RCKL', 'rckl'],
  ['RCM Mart', 'rcm-mart'], ['Shark', 'shark'], ['Styleva', 'styleva'], ['Watch Korner', 'watch-korner'],
  ['Wiz IT', 'wiz-it'], ['Booshop', 'booshop'], ['Fitpath', 'fitpath'], ['Funnel Vision', 'funnel-vision'],
].map(([name, logo]) => ({ name, logo }));
