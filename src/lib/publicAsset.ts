/** Prefix public folder paths with basePath (GitHub Pages: /AegisSOC-frontend). */
export function publicAsset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}