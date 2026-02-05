/**
 * Glossary terms for blockchain and cryptography concepts
 * Used by GlossaryTooltip component for inline definitions
 */

export const glossaryTerms = {
  'avalanche effect': {
    term: 'Avalanche Effect',
    definition: 'A property of cryptographic hashes where a tiny change in input causes a large, unpredictable change in the output.'
  },
  'block': {
    term: 'Block',
    definition: 'A container that bundles data with metadata (like a nonce) and links to the previous block by storing its hash.'
  },
  'blockchain': {
    term: 'Blockchain',
    definition: 'A sequence of blocks where each block references the hash of the previous block, creating a tamper-evident chain.'
  },
  'cryptographic hash': {
    term: 'Cryptographic Hash',
    definition: 'A function that converts input data into a fixed-length output designed to be deterministic and hard to reverse.'
  },
  'deterministic': {
    term: 'Deterministic',
    definition: 'The same input always produces the same output.'
  },
  'difficulty': {
    term: 'Difficulty',
    definition: 'The requirement for a proof-of-work hash to have a specific pattern (often leading zeros), making it harder to find.'
  },
  'fixed length': {
    term: 'Fixed Length',
    definition: 'A hash output always has the same size, regardless of input length.'
  },
  'hash': {
    term: 'Hash',
    definition: 'The output produced by a hash function, often represented as hexadecimal text.'
  },
  'immutability': {
    term: 'Immutability',
    definition: 'The practical difficulty of changing past data once it is recorded in a blockchain.'
  },
  'nonce': {
    term: 'Nonce',
    definition: 'A number used once, typically adjusted to find a hash that meets proof-of-work requirements.'
  },
  'proof of work': {
    term: 'Proof of Work',
    definition: 'A mechanism that requires computational effort to find a valid hash, helping secure a blockchain.'
  },
  'previous hash': {
    term: 'Previous Hash',
    definition: 'The hash of the prior block, stored in the next block to create a link between them.'
  },
  'sha-256': {
    term: 'SHA-256',
    definition: 'A widely used cryptographic hash function that produces a 256-bit output.'
  },
  'tamper-evident': {
    term: 'Tamper-Evident',
    definition: 'A system property where changes are visible because they break expected links or checks.'
  }
};

/**
 * Get a glossary term definition
 * @param {string} term - The term to look up (case-insensitive)
 * @returns {object|null} - The glossary entry or null if not found
 */
export function getGlossaryTerm(term) {
  return glossaryTerms[term.toLowerCase()] || null;
}
