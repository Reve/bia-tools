/**
 * Glossary terms for blockchain and cryptography concepts
 * Used by GlossaryTooltip component for inline definitions
 */

export const glossaryTerms = {
  en: {
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
    'mining': {
      term: 'Mining',
      definition: 'The process of searching for a nonce that produces a hash meeting the proof-of-work difficulty requirement.'
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
  },
  ro: {
    'avalanche effect': {
      term: 'Efect de avalanșă',
      definition: 'O proprietate a hash-urilor criptografice prin care o schimbare foarte mică a intrării produce o schimbare mare și imprevizibilă a ieșirii.'
    },
    'block': {
      term: 'Bloc',
      definition: 'Un container care grupează date cu metadate (precum un nonce) și se leagă de blocul anterior stocând hash-ul lui.'
    },
    'blockchain': {
      term: 'Blockchain',
      definition: 'O succesiune de blocuri în care fiecare bloc face referire la hash-ul blocului anterior, creând un lanț evident la manipulare.'
    },
    'cryptographic hash': {
      term: 'Hash criptografic',
      definition: 'O funcție care transformă datele de intrare într-o ieșire cu lungime fixă, deterministă și greu de inversat.'
    },
    'deterministic': {
      term: 'Determinist',
      definition: 'Aceeași intrare produce întotdeauna aceeași ieșire.'
    },
    'difficulty': {
      term: 'Dificultate',
      definition: 'Cerința ca un hash de dovadă de lucru să aibă un anumit tipar (adesea zerouri la început), ceea ce îl face mai greu de găsit.'
    },
    'fixed length': {
      term: 'Lungime fixă',
      definition: 'Un hash are întotdeauna aceeași dimensiune, indiferent de lungimea intrării.'
    },
    'hash': {
      term: 'Hash',
      definition: 'Ieșirea produsă de o funcție hash, reprezentată adesea ca text hexazecimal.'
    },
    'immutability': {
      term: 'Imutabilitate',
      definition: 'Dificultatea practică de a schimba datele trecute odată ce sunt înregistrate într-un blockchain.'
    },
    'mining': {
      term: 'Minerit',
      definition: 'Procesul de căutare a unui nonce care produce un hash ce îndeplinește cerința de dificultate a dovezii de lucru.'
    },
    'nonce': {
      term: 'Nonce',
      definition: 'Un număr folosit o singură dată, ajustat de obicei pentru a găsi un hash care îndeplinește cerințele dovezii de lucru.'
    },
    'proof of work': {
      term: 'Dovadă de lucru',
      definition: 'Un mecanism care necesită efort computațional pentru a găsi un hash valid, contribuind la securizarea unui blockchain.'
    },
    'previous hash': {
      term: 'Hash anterior',
      definition: 'Hash-ul blocului anterior, stocat în blocul următor pentru a crea o legătură între ele.'
    },
    'sha-256': {
      term: 'SHA-256',
      definition: 'O funcție hash criptografică utilizată pe scară largă care produce o ieșire de 256 de biți.'
    },
    'tamper-evident': {
      term: 'Evident la manipulare',
      definition: 'O proprietate a unui sistem în care modificările sunt vizibile deoarece rup legăturile sau verificările așteptate.'
    }
  }
};

/**
 * Get a glossary term definition
 * @param {string} term - The term to look up (case-insensitive)
 * @returns {object|null} - The glossary entry or null if not found
 */
export function getGlossaryTerm(term, languageCode = 'en') {
  return glossaryTerms[languageCode]?.[term.toLowerCase()] || glossaryTerms.en[term.toLowerCase()] || null;
}
