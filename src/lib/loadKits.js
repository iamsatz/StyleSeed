/**
 * Fetches all kit data from the public/kits directory.
 * Reads the index.json manifest to discover kit IDs, then loads each kit.
 * @returns {Promise<import('../types/kit').Kit[]>}
 */
export async function loadKits() {
  const indexRes = await fetch('/kits/index.json');
  if (!indexRes.ok) throw new Error('Failed to load kit index');
  const kitIds = await indexRes.json();

  const kits = await Promise.all(
    kitIds.map(async (id) => {
      const res = await fetch(`/kits/${id}.json`);
      if (!res.ok) throw new Error(`Failed to load kit: ${id}`);
      return res.json();
    })
  );

  return kits;
}

/**
 * Returns the first 5 colors from a kit's light palette as an array of hex strings.
 * @param {import('../types/kit').Kit} kit
 * @returns {string[]}
 */
export function getSwatchColors(kit) {
  const { background, surface, primary, secondary, accent } = kit.palette.light;
  return [primary, secondary, accent, surface, background];
}
