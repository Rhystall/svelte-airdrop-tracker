export const airdrop = [];


export function findAirdropBySlug(slug) {
    return airdrop.find(airdrop => airdrop.slug === slug);
}
