/**
 * SHA-256 hashing utility using Web Crypto API
 * Runs entirely in the browser without external dependencies
 */

/**
 * Compute SHA-256 hash of a string
 * @param {string} message - The input string to hash
 * @returns {Promise<string>} - The hexadecimal hash string
 */
export async function sha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Convert a hex string to binary string
 * @param {string} hex - The hexadecimal string
 * @returns {string} - The binary string representation
 */
export function hexToBinary(hex) {
  return hex
    .split('')
    .map(char => parseInt(char, 16).toString(2).padStart(4, '0'))
    .join('');
}

/**
 * Compare two hex hashes and return an array indicating which characters differ
 * @param {string} hash1 - First hash
 * @param {string} hash2 - Second hash
 * @returns {boolean[]} - Array of booleans, true where characters differ
 */
export function compareHashes(hash1, hash2) {
  const maxLength = Math.max(hash1.length, hash2.length);
  const differences = [];

  for (let i = 0; i < maxLength; i++) {
    differences.push(hash1[i] !== hash2[i]);
  }

  return differences;
}

/**
 * Compare two binary strings and return an array indicating which bits differ
 * @param {string} binary1 - First binary string
 * @param {string} binary2 - Second binary string
 * @returns {boolean[]} - Array of booleans, true where bits differ
 */
export function compareBinaryStrings(binary1, binary2) {
  const maxLength = Math.max(binary1.length, binary2.length);
  const differences = [];

  for (let i = 0; i < maxLength; i++) {
    differences.push(binary1[i] !== binary2[i]);
  }

  return differences;
}

/**
 * Count the number of differing bits between two hashes (Hamming distance)
 * @param {string} hash1 - First hex hash
 * @param {string} hash2 - Second hex hash
 * @returns {number} - Number of bits that differ
 */
export function countDifferingBits(hash1, hash2) {
  const binary1 = hexToBinary(hash1);
  const binary2 = hexToBinary(hash2);
  let count = 0;

  const maxLength = Math.max(binary1.length, binary2.length);
  for (let i = 0; i < maxLength; i++) {
    if (binary1[i] !== binary2[i]) {
      count++;
    }
  }

  return count;
}

/**
 * Format a hash for display with optional grouping
 * @param {string} hash - The hash string to format
 * @param {number} groupSize - Characters per group (default 8)
 * @returns {string[]} - Array of hash segments
 */
export function formatHashGroups(hash, groupSize = 8) {
  const groups = [];
  for (let i = 0; i < hash.length; i += groupSize) {
    groups.push(hash.slice(i, i + groupSize));
  }
  return groups;
}
