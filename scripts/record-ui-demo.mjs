import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';

const requireFromTmp = createRequire('/private/tmp/whatsapp-record/');
const { chromium } = requireFromTmp('playwright');

const appUrl = process.env.APP_URL || 'http://localhost:5174/';
const outDir = path.resolve('artifacts');
const videoDir = path.join(outDir, 'raw-video');

await fs.mkdir(videoDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function wait(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

async function desktopSegment() {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: videoDir, size: { width: 1280, height: 720 } },
  });
  const page = await context.newPage();
  await page.goto(appUrl, { waitUntil: 'networkidle' });
  await wait(900);

  await page.getByText('Ellie', { exact: true }).click();
  await wait(1200);

  await page.getByText('Summary of 7 voice notes (18 min)', { exact: true }).click();
  await wait(1200);

  await page.getByText('Play important parts', { exact: true }).click();
  await wait(2500);

  await page.getByText('Can you approve the florist quote tonight?', { exact: true }).click();
  await wait(1200);

  await page.getByText('Warm', { exact: true }).click();
  await wait(900);

  await page.getByText('Insert', { exact: true }).click();
  await wait(900);

  await page.getByLabel('Send message').click();
  await wait(1300);

  await page.getByLabel('Close panel').click();
  await wait(700);

  await context.close();
  return page.video();
}

async function mobileSegment() {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    recordVideo: { dir: videoDir, size: { width: 390, height: 844 } },
  });
  const page = await context.newPage();
  await page.goto(appUrl, { waitUntil: 'networkidle' });
  await wait(900);

  await page.getByText('Ellie', { exact: true }).click();
  await wait(1100);

  await page.getByText('Summary of 7 voice notes (18 min)', { exact: true }).click();
  await wait(1000);

  await page.getByText('Play important parts', { exact: true }).click();
  await wait(1800);

  await page.getByText('Can you approve the florist quote tonight?', { exact: true }).click();
  await wait(1000);

  await page.getByText('Point-by-point', { exact: true }).click();
  await wait(800);

  await page.getByText('Insert', { exact: true }).click();
  await wait(900);

  await page.getByLabel('Back').click();
  await wait(900);

  await page.getByLabel('Back').click();
  await wait(900);

  await page.getByText('Catch Up', { exact: true }).click();
  await wait(1400);

  await context.close();
  return page.video();
}

const desktopVideo = await desktopSegment();
const mobileVideo = await mobileSegment();
await browser.close();

const desktopPath = await desktopVideo.path();
const mobilePath = await mobileVideo.path();

const desktopOut = path.join(outDir, 'whatsapp-catchup-desktop-demo.webm');
const mobileOut = path.join(outDir, 'whatsapp-catchup-mobile-demo.webm');
await fs.copyFile(desktopPath, desktopOut);
await fs.copyFile(mobilePath, mobileOut);

console.log(JSON.stringify({ desktopOut, mobileOut }, null, 2));
