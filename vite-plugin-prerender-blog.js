import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { marked } from 'marked';
import { parseBlogMdx } from './src/lib/blog-parse.js';
import {
  buildArticleJsonLd,
  canonicalBlogIndexUrl,
  canonicalBlogUrl,
  SITE_ORIGIN,
} from './src/lib/blog-seo.js';
import { COMPANY, OPERATOR_STATEMENT } from './src/lib/company.js';
import { ABOUT_PAGE } from './src/lib/about-page.js';
import { FAQS } from './src/lib/faq.js';
import { LEGAL_DOCS, LEGAL_SLUGS } from './src/lib/legal-docs.js';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function replaceAttr(html, pattern, replacement) {
  return html.replace(pattern, replacement);
}

function applyMeta(indexHtml, { title, description, canonical, image, jsonLd, bodyHtml }) {
  let html = indexHtml;
  html = replaceAttr(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = replaceAttr(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  );
  html = replaceAttr(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
  );
  html = replaceAttr(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  );
  html = replaceAttr(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  );
  html = replaceAttr(
    html,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
  );
  html = replaceAttr(
    html,
    /<meta property="og:type" content="[^"]*" \/>/,
    `<meta property="og:type" content="${image ? 'article' : 'website'}" />`,
  );
  if (image) {
    html = replaceAttr(
      html,
      /<meta property="og:image" content="[^"]*" \/>/,
      `<meta property="og:image" content="${escapeHtml(image)}" />`,
    );
  }
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
  if (jsonLd) {
    html = html.replace(
      '</head>',
      `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`,
    );
  }
  return html;
}

export function prerenderBlog() {
  return {
    name: 'prerender-blog',
    apply: 'build',
    closeBundle() {
      const dist = resolve('dist');
      const indexPath = join(dist, 'index.html');
      if (!existsSync(indexPath)) return;

      const indexHtml = readFileSync(indexPath, 'utf8');
      const blogDir = resolve('content/blog');
      const files = existsSync(blogDir)
        ? readdirSync(blogDir).filter((file) => file.endsWith('.mdx'))
        : [];
      const posts = files.map((file) => {
        const slug = file.replace(/\.mdx$/, '');
        return parseBlogMdx(slug, readFileSync(join(blogDir, file), 'utf8'));
      });

      mkdirSync(join(dist, 'blog'), { recursive: true });

      const listingHtml = applyMeta(indexHtml, {
        title: 'Business crypto settlements blog · Cryptobus',
        description:
          'English guides on paying invoices with crypto, corporate treasury, cross-border settlement, compliance, and ops playbooks for businesses.',
        canonical: canonicalBlogIndexUrl(),
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Cryp2bus blog',
          url: canonicalBlogIndexUrl(),
          inLanguage: 'en',
        },
        bodyHtml: `<main><h1>Cryp2bus blog</h1><ul>${posts
          .map(
            (post) =>
              `<li><a href="/blog/${post.slug}/">${escapeHtml(post.title)}</a></li>`,
          )
          .join('')}</ul></main>`,
      });
      writeFileSync(join(dist, 'blog/index.html'), listingHtml);

      for (const post of posts) {
        const dir = join(dist, 'blog', post.slug);
        mkdirSync(dir, { recursive: true });
        const body = marked.parse(post.body || '', { gfm: true, breaks: false });
        const page = applyMeta(indexHtml, {
          title: `${post.title} · Cryptobus`,
          description: post.description,
          canonical: canonicalBlogUrl(post.slug),
          image: post.coverImage,
          jsonLd: buildArticleJsonLd(post),
          bodyHtml: `<article><h1>${escapeHtml(post.title)}</h1>${body}</article>`,
        });
        writeFileSync(join(dir, 'index.html'), page);
      }

      prerenderMarketingPages(indexHtml, dist);
    },
  };
}

function pageUrl(pathname) {
  return `${SITE_ORIGIN}${pathname}`;
}

function writeStaticPage(dist, pathname, indexHtml, meta) {
  const relative = pathname.replace(/^\//, '').replace(/\/$/, '');
  const dir = join(dist, relative);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), applyMeta(indexHtml, meta));
}

function sectionsHtml(sections) {
  return sections
    .map(
      (section) =>
        `<section><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.text || section.body || '')}</p></section>`,
    )
    .join('');
}

function prerenderMarketingPages(indexHtml, dist) {
  writeStaticPage(dist, '/about/', indexHtml, {
    title: `${ABOUT_PAGE.title} · Cryptobus`,
    description: ABOUT_PAGE.description,
    canonical: pageUrl('/about/'),
    bodyHtml: `<main><h1>${escapeHtml(ABOUT_PAGE.title)}</h1><p>${escapeHtml(ABOUT_PAGE.subtitle)}</p><h2>${escapeHtml(ABOUT_PAGE.problemTitle)}</h2>${ABOUT_PAGE.problem
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join('')}<h2>${escapeHtml(ABOUT_PAGE.licensingTitle)}</h2><p>${escapeHtml(ABOUT_PAGE.licensingIntro)}</p><dl><dt>Legal name</dt><dd>${escapeHtml(COMPANY.legalName)}</dd><dt>Legal form</dt><dd>${escapeHtml(COMPANY.legalForm)}</dd><dt>Registration number (IČO)</dt><dd>${escapeHtml(COMPANY.ico)}</dd><dt>License</dt><dd>${escapeHtml(COMPANY.license)}</dd><dt>Country</dt><dd>${escapeHtml(COMPANY.country)}</dd><dt>Court registry</dt><dd>${escapeHtml(COMPANY.courtRegistry)}</dd><dt>Registered address</dt><dd>${escapeHtml(COMPANY.address)}</dd><dt>Email</dt><dd>${escapeHtml(COMPANY.email)}</dd><dt>Phone</dt><dd>${escapeHtml(COMPANY.phoneDisplay)}</dd></dl>${sectionsHtml(ABOUT_PAGE.sections)}<h2>${escapeHtml(ABOUT_PAGE.leadershipTitle)}</h2><p>${escapeHtml(ABOUT_PAGE.leadership)}</p></main>`,
  });

  writeStaticPage(dist, '/faq/', indexHtml, {
    title: 'Frequently Asked Questions · Cryptobus',
    description:
      `Answers about Cryp2bus, including fees and onboarding. ${OPERATOR_STATEMENT}`,
    canonical: pageUrl('/faq/'),
    bodyHtml: `<main><h1>Frequently Asked Questions</h1>${FAQS.map(
      (item) =>
        `<section><h2>${escapeHtml(item.q)}</h2><p>${escapeHtml(item.a)}</p></section>`,
    ).join('')}</main>`,
  });

  for (const slug of LEGAL_SLUGS) {
    const doc = LEGAL_DOCS[slug];
    writeStaticPage(dist, `/legal/${slug}/`, indexHtml, {
      title: `${doc.title} · Cryptobus`,
      description: doc.description,
      canonical: pageUrl(`/legal/${slug}/`),
      bodyHtml: `<main><h1>${escapeHtml(doc.title)}</h1><p>${escapeHtml(OPERATOR_STATEMENT)}</p><p>Last updated: ${escapeHtml(doc.updated)}</p>${sectionsHtml(doc.sections)}</main>`,
    });
  }
}
