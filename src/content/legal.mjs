// Privacy Policy and Terms and Conditions content.
// Block types: 'text' -> paragraph, ['ul', [...]] -> bullet list, ['h3', 'text'] -> sub-heading.
// Have both documents reviewed by a lawyer before launch, and keep the retention periods and
// notice periods in line with how the business really works (README > Before launch).
import { site } from '../config.mjs';

const mail = `<a href="mailto:${site.email}">${site.email}</a>`;
const head = site.offices.find((o) => o.head);
const others = site.offices.filter((o) => !o.head);
const addr = (o) => o.lines.join(', ');
const officeList = others.map((o) => `${o.label}: ${addr(o)}`).join('<br>');

export const privacy = {
  summary: [
    'We collect only what you choose to send us (for example through a form or WhatsApp) and basic website statistics.',
    'We use it to reply to you, prepare your free audit or proposal, and deliver the work you hire us for.',
    'We never sell your personal information.',
    'You can ask us at any time to see, correct or delete the information we hold about you.',
  ],
  sections: [
    ['Who we are', [
      `This website, adsquidbd.com, is run by Adsquid, a digital marketing agency. Our head office is at ${addr(head)}, and we also have offices in ${others.map((o) => o.country.split(', ').pop()).join(', ').replace(/, ([^,]*)$/, ' and $1')}.`,
      `Adsquid is responsible for the personal information described in this policy (in data protection terms, we are the "controller"). For any privacy question, email ${mail} or call <a href="tel:${site.phoneHref}">${site.phone}</a>.`,
      'This policy covers our website, our forms, and conversations with us by WhatsApp, phone, email or social media. When we handle data inside a client\'s own accounts while doing their work (for example their ad accounts or customer lists), we do so on that client\'s behalf and under their instructions, as explained in section 12.',
    ]],
    ['Information we collect', [
      ['h3', 'Information you give us'],
      ['ul', [
        '<strong>Free audit forms:</strong> your name, business name, WhatsApp number, website or page link, monthly ad budget range, your main goal and the service you are interested in.',
        '<strong>Contact form:</strong> your name, email address, phone number, the service you are asking about and your message.',
        '<strong>Messages and calls:</strong> what you share with us on WhatsApp, by phone, by email or through our social media pages, including any files you send.',
        '<strong>Job applications:</strong> your CV, portfolio, contact details and anything else you choose to send when applying.',
        '<strong>Clients:</strong> billing and contact details, and the logins or account access you give us to do the work.',
      ]],
      ['h3', 'Information collected automatically'],
      ['ul', [
        '<strong>Server logs:</strong> like every website, our hosting server records technical data for each visit, such as your IP address, browser type, the page requested, the time and the page that linked you here. We use this to keep the site secure and working.',
        '<strong>Website statistics:</strong> if we turn on analytics tools (see section 4), they record pages visited, time on page, device and browser type, approximate location (country or city) and how you found us.',
        '<strong>Spam protection:</strong> our forms include hidden checks that look at how quickly a form is sent and whether a hidden field was filled, and we count how many messages come from one IP address in a short time. This only helps us block automated spam.',
      ]],
      ['h3', 'Information we do not want'],
      'Please do not send us sensitive information (such as health details, government ID numbers, passwords or card numbers) through our forms or chats. If we need access to an account to do our work, we will ask for partner or admin access instead of your password wherever the platform allows it.',
    ]],
    ['How we use your information', [
      'We use your information only for the purposes below, and we rely on the legal grounds shown in brackets where data protection laws such as the GDPR apply:',
      ['ul', [
        'To reply to your message or call, and to follow up on it (our legitimate interest in answering enquiries, or steps you asked us to take before a contract).',
        'To prepare the free audit, quote or proposal you asked for (steps before a contract).',
        'To deliver, manage and invoice the services you hire us for (performance of a contract).',
        'To keep business, tax and accounting records (legal obligation).',
        'To understand how visitors use the website and to improve it, and to measure our own advertising (your consent where the law requires it, otherwise our legitimate interest).',
        'To protect the website, our team and our clients from spam, fraud and misuse (legitimate interest).',
        'To review job applications and contact candidates (steps before a contract, or legitimate interest).',
        'To send you updates or offers, but only if you are a client or have agreed to receive them. You can stop these at any time (consent or legitimate interest).',
      ]],
      'We do not use your information for automated decisions that have legal or similarly significant effects on you.',
    ]],
    ['Cookies and similar technologies', [
      'Cookies are small files a website stores in your browser. Here is what this website uses:',
      ['ul', [
        '<strong>No cookies of our own for basic use.</strong> The site works without setting any cookies. It only uses your browser\'s session storage to remember a display setting for animations while the tab is open.',
        '<strong>Analytics and advertising (only when switched on):</strong> we may use Google Analytics and Google Tag Manager (cookies such as <code>_ga</code>) to count visits, and the Meta Pixel (cookie <code>_fbp</code>) to measure and improve our own Facebook and Instagram ads. These load after the page has finished loading. Where the law requires your consent (for example in the EU and UK), we will ask for it before these cookies are set.',
        '<strong>Google Maps:</strong> the map on our Contact page is provided by Google. When it loads, Google may set its own cookies and receives your IP address.',
        '<strong>Google Fonts:</strong> our typeface (Montserrat) is delivered by Google Fonts. Your browser connects to Google to download it, so Google receives your IP address. Google Fonts does not set cookies.',
        '<strong>WhatsApp, Facebook and LinkedIn links:</strong> these only send information to those companies when you click them.',
      ]],
      'You can block or delete cookies in your browser settings, use private browsing, or install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics opt-out add-on</a>. You can manage Meta ads in your <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener">Facebook ad preferences</a>.',
    ]],
    ['Who we share it with', [
      'We share personal information only when we need to, and only with:',
      ['ul', [
        '<strong>Our own team</strong> at our head office in Dhaka and at our other offices, who see only what they need for their work.',
        '<strong>Service providers that help us run the business:</strong> our website hosting and email provider (which stores form messages and emails), Google (Analytics, Maps, Fonts and Workspace tools), Meta (WhatsApp and the Meta Pixel), and the project, file storage and accounting tools we use. They may only use the data to provide their service to us.',
        '<strong>Advertising and social media platforms,</strong> when you are a client and we run campaigns or manage pages on your behalf, as agreed with you.',
        '<strong>Professional advisers</strong> such as accountants, auditors and lawyers, under a duty of confidentiality.',
        '<strong>Authorities,</strong> when the law requires it, or to protect our rights, our clients or the public.',
        '<strong>A new owner,</strong> if Adsquid or part of it is ever merged or sold, in which case this policy will continue to protect your information.',
      ]],
      'We do not sell your personal information for money. If we switch on advertising tools such as the Meta Pixel, some US state laws may treat this as "sharing" for targeted advertising. You can opt out of that at any time by emailing us (see section 9).',
    ]],
    ['International transfers', [
      'We work from offices in Bangladesh, the United States, Canada, Australia and Malaysia, and some of our service providers store data in other countries. When your information moves between countries, we take reasonable steps to keep it protected, for example by using well-known providers with strong security and, where the GDPR applies, standard contractual clauses or similar safeguards.',
    ]],
    ['How long we keep it', [
      ['ul', [
        '<strong>Enquiries and free audit requests</strong> that do not lead to a project: up to 24 months after our last contact, so we have the history if you come back.',
        '<strong>Client records:</strong> for as long as we work together, then for as long as tax, accounting and other laws require.',
        '<strong>Job applications:</strong> up to 12 months, unless you agree to a longer period for future openings.',
        '<strong>Server logs:</strong> for the short period set by our hosting provider, usually a few weeks to a few months.',
        '<strong>Analytics data:</strong> no longer than 14 months.',
      ]],
      'When we no longer need information, we delete it or make it anonymous.',
    ]],
    ['How we protect it', [
      'The whole website runs over an encrypted HTTPS connection. Form messages are emailed to our team, and a private backup copy is stored on our server in a folder that cannot be opened from the web. Access to client data is limited to the team members working on that account, and we use strong passwords and two-step verification on our business accounts.',
      'No system is completely secure. If a data breach is likely to put you at risk, we will tell you and the relevant authorities as the law requires.',
    ]],
    ['Your rights', [
      'Depending on where you live, you may have the right to:',
      ['ul', [
        'ask for a copy of the personal information we hold about you;',
        'ask us to correct information that is wrong or incomplete;',
        'ask us to delete your information;',
        'object to, or ask us to limit, how we use it;',
        'receive your information in a portable format;',
        'withdraw your consent at any time, where we rely on consent (this does not affect what we did before);',
        'opt out of the sale or sharing of personal information and of targeted advertising (for residents of California and other US states with privacy laws), without being treated differently for doing so.',
      ]],
      `To use any of these rights, email ${mail}. We may ask you to confirm your identity first, and we will reply within one month (or within the time your local law sets). You can also ask someone to act for you, with your written permission.`,
      'If you are in the EU or UK and are not happy with our answer, you can complain to your local data protection authority.',
    ]],
    ['Marketing messages', [
      'We only send marketing emails or WhatsApp messages to clients and to people who agreed to receive them. Every message tells you how to stop them: reply "STOP" or use the unsubscribe link, and we will remove you.',
    ]],
    ['Children', [
      'Our website and services are meant for businesses and adults. We do not knowingly collect information from children under 16. If you believe a child has sent us personal information, email us and we will delete it.',
    ]],
    ['Data we handle for our clients', [
      'When a client hires us to run ads, manage social media, build a website or set up software, we may handle personal information that belongs to the client\'s own customers (for example audience lists, leads or orders). We use that information only to do the client\'s work and only as they instruct us. The client\'s own privacy policy applies to it, and we sign a data processing agreement on request.',
    ]],
    ['Other websites', [
      'Our site links to other websites and apps, such as Facebook, Instagram, LinkedIn, WhatsApp and Google Maps. They have their own privacy policies, and we are not responsible for how they handle your information.',
    ]],
    ['Changes to this policy', [
      'We may update this policy when our services, tools or the law change. The date at the top shows when it was last updated. If we make an important change, we will say so clearly on this page.',
    ]],
    ['Contact us', [
      `Email: ${mail}<br>Phone and WhatsApp: <a href="tel:${site.phoneHref}">${site.phone}</a><br>Head office: ${addr(head)}<br>${officeList}`,
    ]],
  ],
};

export const terms = {
  summary: [
    'These terms cover your use of this website, our free audit, and the services we provide.',
    'Each project has a proposal or quote that sets its scope, price, timeline and revisions. If it says something different from these terms, the proposal wins.',
    'Ad budgets and third-party costs are separate from our fee, and no one can guarantee specific results from ad platforms or search engines.',
    'Once you have paid in full, the final work we made for you is yours.',
  ],
  sections: [
    ['About these terms', [
      `These terms are an agreement between you and Adsquid (head office: ${addr(head)}). They apply when you use adsquidbd.com, request a free audit, or hire us for any service.`,
      'For paid work, we also send a proposal, quote or contract that describes exactly what we will do. That document and these terms together make up our agreement. If the two disagree, the signed or accepted proposal applies.',
      'By using this website or accepting a proposal, you agree to these terms. If you do not agree, please do not use the site or our services.',
    ]],
    ['Using this website', [
      'You may browse and share our website for your own information. You must not:',
      ['ul', [
        'use the site for anything unlawful, misleading or harmful;',
        'try to break into, overload, damage or disrupt the site or our server;',
        'send spam, malware or automated messages through our forms;',
        'copy large parts of the site or collect data from it with automated tools without our written permission.',
      ]],
      'We work hard to keep the site accurate and online, but we may change, pause or remove any part of it at any time.',
    ]],
    ['Our content and trademarks', [
      'The text, design, graphics, illustrations, the Adsquid name, logo and mascot, and the code of this website belong to Adsquid. Please do not copy or reuse them without our written consent.',
      'Portfolio pieces belong to our clients and are shown with their permission. Names and logos of platforms such as Meta, Facebook, Instagram, Google, YouTube, TikTok and LinkedIn belong to their owners. Showing them does not mean those companies endorse us.',
    ]],
    ['Free audit and advice', [
      'Our free audit is a no-obligation review of your ads, pages or website. It is free, and you do not have to hire us afterwards. Its recommendations are general advice based on the information you share and what we can see publicly, so they are not a guarantee of results. You stay responsible for the decisions you make. We may decline an audit request, for example if the business falls in a category we do not work with.',
      'Articles, guides and price ranges on our blog are general information. Prices, platform rules and costs change, so please confirm the details for your own situation.',
    ]],
    ['Proposals, scope and changes', [
      'Every project starts with a proposal or quote that sets out the deliverables, timeline, price and number of revision rounds. Unless it says otherwise, a quote is valid for 30 days.',
      'Work outside the agreed scope (new pages, extra designs, more videos, new features) is a change. We will confirm the cost and timing of any change in writing before we start it.',
      'All work is done by our in-house team.',
    ]],
    ['Fees and payment', [
      ['ul', [
        'Prices are in Bangladeshi Taka (BDT) for clients in Bangladesh and in US dollars (USD) for international clients, unless the proposal says otherwise. Applicable VAT and taxes are added where the law requires.',
        'Unless the proposal says otherwise, projects need an advance payment before work starts, with the balance due on delivery or at the milestones listed. Monthly services are billed in advance each month.',
        'Invoices are due within 7 days unless the invoice shows another date. Bank, mobile banking and transfer charges are paid by the sender.',
        'If a payment is late, we may pause the work, campaigns or support until it is paid. We will tell you before doing so.',
      ]],
    ]],
    ['Ad budgets and third-party costs', [
      'Our fee covers our work. It does not include money paid to other companies, such as:',
      ['ul', [
        'advertising spend on Meta, Google, YouTube, TikTok, LinkedIn or any other platform;',
        'domain names, hosting, email, paid themes, plugins and software licences;',
        'stock photos, music, fonts, printing, models, locations and similar production costs.',
      ]],
      'Ad spend is paid directly by you to the platform from your own ad account, or paid to us in advance if we agree to manage it for you. Third-party prices are set by those companies and may change.',
    ]],
    ['What we need from you', [
      ['ul', [
        'accurate information about your business, products and goals;',
        'your content, logos, product details and feedback, on time;',
        'access to the accounts we need (ad accounts, pages, website, hosting), preferably as a partner or admin user;',
        'clear approval of each stage before we move on.',
      ]],
      'You confirm that you own, or have permission to use, everything you give us, and that your products, offers and claims follow the law and the rules of the platforms we advertise on. Delays in feedback or access will move the timeline.',
    ]],
    ['Approvals and revisions', [
      'Each deliverable includes the number of revision rounds stated in the proposal. When you approve a piece of work, it is final. Changes requested after approval, or beyond the included revision rounds, are charged as extra work.',
    ]],
    ['Results and platform rules', [
      'We plan and run every project to get you the best possible results, but marketing results depend on many things we do not control: your product, price, budget, market, competitors, timing and the decisions of the platforms. So we cannot guarantee specific sales, leads, followers, rankings or returns, and past results shown on this site are not a promise of future results.',
      'Ad platforms and search engines decide how ads are approved and delivered and how pages rank. They can reject ads, limit reach, change their algorithms, or restrict or disable accounts. We are not responsible for these decisions, but we will help you appeal and fix the problem.',
    ]],
    ['Who owns the work', [
      ['ul', [
        'When you have paid in full, you own the final deliverables we created specifically for you: for example your logo, designs, videos, written content and the website or software code written for your project.',
        'Until full payment, we keep ownership, and you may not use unfinished or unpaid work.',
        'We keep ownership of our own tools, templates, methods and know-how that existed before your project or that we use across clients.',
        'Third-party parts (fonts, stock media, plugins, open-source code) stay under their own licences, which we will tell you about.',
        'Working source files (such as .ai, .psd, .fig or .aep files) are included only if the proposal says so.',
      ]],
      'Unless you ask us not to in writing, we may show finished work in our portfolio and on our social media. We never share confidential information such as your results or data without your permission.',
    ]],
    ['Your accounts and access', [
      'You keep ownership of your ad accounts, pages, domains, hosting and other accounts. When our work together ends, we hand over everything we set up for you and remove our own access.',
    ]],
    ['Websites, software and support', [
      'Each website or software project includes the support period stated in the proposal, during which we fix bugs in the work we delivered free of charge. After that, updates, hosting and maintenance are available as a separate plan. We are not responsible for problems caused by changes made by others, or by updates to third-party hosting, plugins or services outside a maintenance plan.',
    ]],
    ['Confidentiality and data', [
      'We keep your business information confidential and use it only to do your work, and we expect the same from you about our pricing and methods. We are happy to sign a separate non-disclosure agreement.',
      'How we handle personal information is explained in our <a href="/privacy-policy/">Privacy Policy</a>. When you give us your customers\' data (for example audience lists), you confirm you are allowed to share it, and we use it only on your instructions.',
    ]],
    ['Cancelling and refunds', [
      ['ul', [
        'Either side can end monthly services with the written notice stated in the proposal, or 30 days\' written notice if none is stated.',
        'You pay for the work done and costs committed up to the end date.',
        'Advance payments for work that has already started are not refundable, except where the law says otherwise.',
        'Any unspent ad budget that we hold for you is returned.',
        'We may end the work straight away if invoices remain unpaid after a reminder, or if we are asked to do something unlawful or against platform rules.',
      ]],
    ]],
    ['Limits of our liability', [
      'Nothing in these terms limits liability that cannot be limited by law. Apart from that, and to the extent the law allows:',
      ['ul', [
        'we are not liable for indirect or consequential losses, such as lost profit, revenue, data, goodwill or business opportunities;',
        'we are not liable for losses caused by platforms, hosting companies or other third parties, or by information you gave us;',
        'our total liability for any claim is limited to the fees you paid us for the service in question during the 3 months before the claim.',
      ]],
      'This website is provided "as is", without promises that it will always be available or free of errors.',
    ]],
    ['Your responsibility to us', [
      'If a claim is made against Adsquid because of material you gave us, your products or services, or your breach of the law or of these terms, you agree to cover the reasonable costs and losses that result.',
    ]],
    ['Events outside our control', [
      'Neither side is responsible for delays or failures caused by events beyond reasonable control, such as power or internet outages, natural disasters, unrest, government action, or outages of major platforms. We will tell you quickly and do our best to limit the impact.',
    ]],
    ['Law and disputes', [
      'If a problem comes up, please tell us first. Most issues are solved with a conversation, and we will try in good faith to resolve it within 30 days.',
      'These terms are governed by the laws of Bangladesh, and the courts of Dhaka have jurisdiction, unless your signed agreement with us (for example with one of our offices outside Bangladesh) names a different law or place.',
    ]],
    ['General', [
      'We may update these terms from time to time. The date at the top shows the latest version, and the version in force when you accepted a proposal applies to that project. If any part of these terms cannot be enforced, the rest still applies. If we do not enforce a right straight away, we can still enforce it later. You may not transfer your agreement with us to someone else without our written consent.',
    ]],
    ['Contact us', [
      `Email: ${mail}<br>Phone and WhatsApp: <a href="tel:${site.phoneHref}">${site.phone}</a><br>Head office: ${addr(head)}<br>${officeList}`,
    ]],
  ],
};
