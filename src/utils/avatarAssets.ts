import { publicAsset } from './publicAsset';

const svgDataUrl = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

export const avatarAssets = {
  ellie: publicAsset('avatars/ellie.svg'),
  eddie: svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150" role="img" aria-label="Eddie profile photo">
  <defs>
    <linearGradient id="bg" x1="20" y1="12" x2="132" y2="142" gradientUnits="userSpaceOnUse">
      <stop stop-color="#d8eef5"/>
      <stop offset="1" stop-color="#eef5dc"/>
    </linearGradient>
    <linearGradient id="hair" x1="42" y1="28" x2="106" y2="82" gradientUnits="userSpaceOnUse">
      <stop stop-color="#5a3a2e"/>
      <stop offset="1" stop-color="#2a1a16"/>
    </linearGradient>
  </defs>
  <rect width="150" height="150" rx="75" fill="url(#bg)"/>
  <path d="M35 142c5-24 21-38 40-38s35 14 40 38H35Z" fill="#1d6f8f"/>
  <path d="M52 99c7 8 15 12 23 12s16-4 23-12v22c-6 6-14 9-23 9s-17-3-23-9V99Z" fill="#c98d72"/>
  <path d="M48 64c0-22 11-37 28-37s28 15 28 37c0 24-12 44-28 44S48 88 48 64Z" fill="#d99b7e"/>
  <path d="M44 65c-2-25 11-43 33-43 20 0 33 15 34 38-8-6-14-12-18-21-12 12-29 19-49 26Z" fill="url(#hair)"/>
  <path d="M60 73c3-2 7-2 10 0m14 0c3-2 7-2 10 0" fill="none" stroke="#2d201c" stroke-width="4" stroke-linecap="round"/>
  <path d="M74 80c-1 5-3 9-6 13 6 4 14 4 20 0" fill="none" stroke="#9f604f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M63 96c8 9 18 9 26 0" fill="none" stroke="#4a2f2a" stroke-width="4" stroke-linecap="round"/>
</svg>`),
  me: svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150" role="img" aria-label="Profile avatar">
  <defs>
    <linearGradient id="bg" x1="18" y1="12" x2="132" y2="140" gradientUnits="userSpaceOnUse">
      <stop stop-color="#e7f7ef"/>
      <stop offset="1" stop-color="#dbeafe"/>
    </linearGradient>
    <linearGradient id="shirt" x1="40" y1="105" x2="110" y2="145" gradientUnits="userSpaceOnUse">
      <stop stop-color="#00a884"/>
      <stop offset="1" stop-color="#005c4b"/>
    </linearGradient>
  </defs>
  <rect width="150" height="150" rx="75" fill="url(#bg)"/>
  <path d="M33 142c6-25 22-39 42-39s36 14 42 39H33Z" fill="url(#shirt)"/>
  <path d="M53 98c7 8 14 12 22 12s15-4 22-12v23c-5 6-13 9-22 9s-17-3-22-9V98Z" fill="#c98868"/>
  <path d="M47 65c0-22 11-37 28-37s28 15 28 37c0 24-12 44-28 44S47 89 47 65Z" fill="#d89a76"/>
  <path d="M44 62c-1-24 12-40 33-40 18 0 31 14 32 37-10-3-18-10-23-20-10 12-24 19-42 23Z" fill="#2f211d"/>
  <path d="M60 74c3-2 7-2 10 0m14 0c3-2 7-2 10 0" fill="none" stroke="#2f211d" stroke-width="4" stroke-linecap="round"/>
  <path d="M72 80c-1 5-3 10-6 14 6 4 14 4 20 0" fill="none" stroke="#9f604f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M64 96c7 8 18 8 25 0" fill="none" stroke="#6f332d" stroke-width="4" stroke-linecap="round"/>
</svg>`),
};
