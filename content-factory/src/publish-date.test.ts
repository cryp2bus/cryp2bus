import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { generateMockArticle } from './mock-generator';
import { buildArticlePrompt } from './prompts/article-de';
import type { ArticleRequest } from './prompts/types';
import { readPublishedDate, resolvePublishDate, stampPublishDates, utcPublishDate } from './publish-date';

const REQUEST: ArticleRequest = {
  id: 1,
  cluster: 'Invoice Settlement',
  slug: 'converting-fiat-to-crypto-for-supplier-payouts',
  titleDe: 'Converting fiat to crypto for supplier payouts',
  titleEn: 'Converting fiat to crypto for supplier payouts',
  keywordDe: 'fiat to crypto supplier payouts',
  searchVolDe: 2400,
  kd: 28,
  keywordEn: 'fiat to crypto supplier payouts',
  searchVolEn: 2400,
  lsiKeywords: ['supplier payout quotes'],
  format: 'Howto',
  targetLength: 1500,
  taSegments: ['finance'],
  priority: 'high',
  plannedDate: '2026-09-30',
  language: 'EN',
  category: 'Invoice Settlement',
  status: 'pending',
  unsplashQuery: 'business payment desk',
};

const STALE = `---
title: "Example"
datePublished: "2026-09-30"
dateModified: '2026-09-30'
featured: false
---

As-of date for this briefing: 2026-09-30.
`;

test('utcPublishDate uses the UTC calendar day', () => {
  assert.equal(utcPublishDate(new Date('2026-09-21T23:30:00Z')), '2026-09-21');
  assert.equal(utcPublishDate(new Date('2026-09-22T01:30:00+02:00')), '2026-09-21');
});

test('resolvePublishDate never returns a day after today', () => {
  const now = new Date('2026-09-28T12:00:00Z');
  assert.equal(resolvePublishDate(undefined, now), '2026-09-28');
  assert.equal(resolvePublishDate('2026-10-12', now), '2026-09-28');
  assert.equal(resolvePublishDate('not-a-date', now), '2026-09-28');
  assert.equal(resolvePublishDate('2026-09-20', now), '2026-09-20');
  assert.equal(resolvePublishDate('2026-09-28', now), '2026-09-28');
});

test('stampPublishDates overwrites a content-plan date and leaves the body alone', () => {
  const stamped = stampPublishDates(STALE, '2026-09-21');

  assert.equal(readPublishedDate(stamped), '2026-09-21');
  assert.match(stamped, /^dateModified: "2026-09-21"$/m);
  assert.doesNotMatch(stamped, /datePublished: "2026-09-30"/);
  assert.match(stamped, /As-of date for this briefing: 2026-09-30/);
  assert.match(stamped, /featured: false/);
});

test('stampPublishDates inserts missing publish dates', () => {
  const stamped = stampPublishDates('---\ntitle: "Example"\n---\n\nBody.\n', '2026-09-21');
  assert.equal(readPublishedDate(stamped), '2026-09-21');
  assert.match(stamped, /^dateModified: "2026-09-21"$/m);
  assert.match(stamped, /Body\./);
});

test('Claude prompt and mock article use the generation date, not plannedDate', () => {
  const image = {
    url: 'https://images.unsplash.com/photo-test?w=800',
    altText: 'Documents',
    photographer: 'Unsplash',
    photographerUrl: 'https://unsplash.com',
  };
  const prompt = buildArticlePrompt(REQUEST, [], [], '2026-09-21');
  const mock = generateMockArticle(REQUEST, [image], '2026-09-21');

  assert.match(prompt, /datePublished: "2026-09-21"/);
  assert.match(prompt, /dateModified: "2026-09-21"/);
  assert.doesNotMatch(prompt, /datePublished: "2026-09-30"/);
  assert.match(prompt, /Publish date \(UTC\):\*\* 2026-09-21/);
  assert.equal(readPublishedDate(mock), '2026-09-21');
  assert.match(mock, /^dateModified: "2026-09-21"$/m);
});

test('published articles do not have datePublished after today', () => {
  const contentDir = path.resolve(__dirname, '../../content/blog');
  const today = utcPublishDate();
  const offenders: string[] = [];

  for (const file of fs.readdirSync(contentDir)) {
    if (!file.endsWith('.mdx')) continue;
    const published = readPublishedDate(fs.readFileSync(path.join(contentDir, file), 'utf-8'));
    if (!published || published > today) {
      offenders.push(`${file}: ${published ?? 'missing'}`);
    }
  }

  assert.deepEqual(offenders, []);
});

test('sitemap lastmod values are not after today', () => {
  const sitemap = fs.readFileSync(path.resolve(__dirname, '../../public/sitemap.xml'), 'utf-8');
  const today = utcPublishDate();
  const future = [...sitemap.matchAll(/<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/g)]
    .map((match) => match[1])
    .filter((day) => day > today);

  assert.deepEqual(future, []);
});
