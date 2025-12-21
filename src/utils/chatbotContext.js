const C3_KEYWORDS = [
  'c3',
  'cthree',
  'coffee code',
  'pengurus',
  'struktur',
  'divisi',
  'founder',
  'co founder',
  'visi',
  'misi',
  'event',
  'kegiatan',
  'riset',
  'sub riset',
];

export function needsC3Context(text) {
  const lower = text.toLowerCase();
  return C3_KEYWORDS.some(k => lower.includes(k));
}
