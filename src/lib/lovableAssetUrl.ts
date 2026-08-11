// Lovable's .asset.json imports point to a root-relative path (e.g. "/__l5e/assets-v1/...")
// that only resolves on Lovable's own hosting. Prefix with the Lovable project origin so
// these images also load when the site is deployed elsewhere (e.g. GitHub Pages).
const LOVABLE_ASSET_ORIGIN = "https://pmkarandalal.lovable.app";

export const lovableAssetUrl = (asset: { url: string }) => `${LOVABLE_ASSET_ORIGIN}${asset.url}`;
