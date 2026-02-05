<script>
  import { sha256 } from '../lib/hash.js';
  import GlossaryTooltip from '../components/GlossaryTooltip.svelte';

  // Genesis block has all zeros as previous hash
  const GENESIS_PREVIOUS_HASH = '0'.repeat(64);

  // Initial block data
  const initialBlocks = [
    { data: 'Genesis Block', nonce: 0 },
    { data: 'Transaction: Alice sends 10 coins to Bob', nonce: 0 },
    { data: 'Transaction: Bob sends 5 coins to Charlie', nonce: 0 },
    { data: 'Transaction: Charlie sends 2 coins to Alice', nonce: 0 }
  ];

  // Reactive state for blocks
  let blocks = $state(initialBlocks.map((b, i) => ({
    id: i,
    data: b.data,
    nonce: b.nonce,
    previousHash: '',
    currentHash: '',
    isValid: true,
    originalData: b.data,
    originalNonce: b.nonce
  })));

  // Track which block is being edited (for highlighting)
  let editingBlockId = $state(null);

  // Compute hashes and validity for all blocks
  $effect(() => {
    computeChain();
  });

  async function computeChain() {
    let prevHash = GENESIS_PREVIOUS_HASH;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const expectedPrevHash = i === 0 ? GENESIS_PREVIOUS_HASH : blocks[i - 1].currentHash;

      // Set previous hash
      block.previousHash = expectedPrevHash;

      // Compute current hash
      const blockContent = `${block.data}${block.nonce}${block.previousHash}`;
      block.currentHash = await sha256(blockContent);

      // Determine validity - block is valid if its stored previousHash matches what it should be
      // For simplicity in this demo, validity cascades: if a previous block is invalid, this one is too
      if (i === 0) {
        block.isValid = true; // Genesis block is always valid
      } else {
        // Check if the previous block's current hash matches what we expect
        const prevBlock = blocks[i - 1];
        // If any block before this has been tampered, mark invalid
        block.isValid = prevBlock.isValid && (prevBlock.currentHash === block.previousHash);
      }

      prevHash = block.currentHash;
    }
  }

  function resetChain() {
    blocks = initialBlocks.map((b, i) => ({
      id: i,
      data: b.data,
      nonce: b.nonce,
      previousHash: '',
      currentHash: '',
      isValid: true,
      originalData: b.data,
      originalNonce: b.nonce
    }));
    editingBlockId = null;
  }

  function resetBlock(index) {
    blocks[index].data = blocks[index].originalData;
    blocks[index].nonce = blocks[index].originalNonce;
  }

  // Count valid and invalid blocks
  let validCount = $derived(blocks.filter(b => b.isValid).length);
  let invalidCount = $derived(blocks.filter(b => !b.isValid).length);
  let hasModifiedBlocks = $derived(blocks.some(b => b.data !== b.originalData || b.nonce !== b.originalNonce));
</script>

<div class="blockchain-integrity">
  <!-- Header -->
  <div class="mb-8">
    <h2 class="text-2xl font-semibold text-ink mb-3">Blockchain Integrity</h2>
    <p class="text-slate leading-relaxed max-w-2xl">
      A <GlossaryTooltip term="blockchain">blockchain</GlossaryTooltip> links blocks through hashes.
      If one block changes, every block after it becomes invalid. This makes blockchains
      <GlossaryTooltip term="tamper-evident">tamper-evident</GlossaryTooltip>.
    </p>
  </div>

  <!-- Chain Status Bar -->
  <div class="card mb-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-emerald"></span>
          <span class="text-sm text-slate">Valid: {validCount}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-rose"></span>
          <span class="text-sm text-slate">Invalid: {invalidCount}</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        {#if hasModifiedBlocks}
          <span class="text-xs text-amber font-medium px-2 py-1 bg-amber/10 rounded">
            Chain Modified
          </span>
        {/if}
        <button class="btn-secondary text-sm" onclick={resetChain}>
          Reset Chain
        </button>
      </div>
    </div>
  </div>

  <!-- Blockchain Visualization -->
  <div class="mb-8 overflow-x-auto">
    <div class="flex items-stretch gap-2 min-w-max pb-4">
      {#each blocks as block, index}
        <!-- Block Card -->
        <div class="flex items-stretch">
          <div
            class="block-card w-72 flex-shrink-0 card transition-all duration-200 {block.isValid ? 'border-emerald bg-emerald/5' : 'border-rose bg-rose/5'} {editingBlockId === block.id ? 'ring-2 ring-cobalt' : ''}"
          >
            <!-- Block Header -->
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-base font-semibold text-ink flex items-center gap-2">
                <span
                  class="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                  class:bg-emerald={block.isValid}
                  class:bg-rose={!block.isValid}
                >
                  {index + 1}
                </span>
                {index === 0 ? 'Genesis' : `Block ${index + 1}`}
              </h3>
              <span
                class="text-xs font-medium px-2 py-0.5 rounded"
                class:badge-valid={block.isValid}
                class:badge-invalid={!block.isValid}
              >
                {block.isValid ? 'Valid' : 'Invalid'}
              </span>
            </div>

            <!-- Data Field -->
            <div class="mb-3">
              <label for="block-data-{block.id}" class="block text-xs font-medium text-slate mb-1">Data</label>
              <textarea
                id="block-data-{block.id}"
                bind:value={block.data}
                onfocus={() => editingBlockId = block.id}
                onblur={() => editingBlockId = null}
                placeholder="Block data..."
                rows="2"
                class="input-field resize-none text-xs"
              ></textarea>
            </div>

            <!-- Nonce Field -->
            <div class="mb-3">
              <label for="block-nonce-{block.id}" class="block text-xs font-medium text-slate mb-1">Nonce</label>
              <div class="flex items-center gap-1">
                <input
                  id="block-nonce-{block.id}"
                  type="number"
                  bind:value={block.nonce}
                  onfocus={() => editingBlockId = block.id}
                  onblur={() => editingBlockId = null}
                  min="0"
                  class="input-field text-xs font-mono flex-1 py-2"
                />
                <button
                  type="button"
                  onclick={() => { if (block.nonce > 0) block.nonce--; }}
                  class="w-8 h-8 rounded bg-mist hover:bg-slate/20 text-ink font-bold text-sm transition-colors"
                >
                  -
                </button>
                <button
                  type="button"
                  onclick={() => block.nonce++}
                  class="w-8 h-8 rounded bg-mist hover:bg-slate/20 text-ink font-bold text-sm transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Previous Hash -->
            <div class="mb-3">
              <div class="block text-xs font-medium text-slate mb-1">Previous Hash</div>
              <div
                class="hash-output text-[10px] font-mono break-all py-2 px-2"
                class:text-emerald={block.isValid}
                class:text-rose={!block.isValid}
              >
                {block.previousHash.slice(0, 32)}...
              </div>
            </div>

            <!-- Current Hash -->
            <div class="mb-3">
              <div class="block text-xs font-medium text-slate mb-1">Current Hash</div>
              <div class="hash-output text-[10px] font-mono break-all py-2 px-2">
                {block.currentHash.slice(0, 32)}...
              </div>
            </div>

            <!-- Reset button for modified blocks -->
            {#if block.data !== block.originalData || block.nonce !== block.originalNonce}
              <button
                class="w-full text-xs text-cobalt hover:text-cobalt/80 font-medium mt-1"
                onclick={() => resetBlock(index)}
              >
                Reset this block
              </button>
            {/if}
          </div>

          <!-- Chain Link Arrow -->
          {#if index < blocks.length - 1}
            <div class="flex items-center px-2">
              <div class="flex flex-col items-center">
                <svg
                  class="w-8 h-8 transition-colors duration-200"
                  class:text-emerald={blocks[index + 1].isValid}
                  class:text-rose={!blocks[index + 1].isValid}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span
                  class="text-[10px] font-medium transition-colors duration-200"
                  class:text-emerald={blocks[index + 1].isValid}
                  class:text-rose={!blocks[index + 1].isValid}
                >
                  {blocks[index + 1].isValid ? 'Linked' : 'Broken'}
                </span>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Learning Prompts -->
  <div class="p-4 bg-cobalt/5 rounded-lg border border-cobalt/20 mb-6">
    <h3 class="text-sm font-semibold text-cobalt mb-2">Try it yourself</h3>
    <ul class="text-sm text-slate space-y-2">
      <li class="flex items-start gap-2">
        <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
        <span>Edit Block 2's data and observe the chain status. Which blocks become invalid?</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
        <span>Now edit Block 3. Does Block 2 become invalid?</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
        <span>Reset the chain and try editing only the Genesis block. What happens to all other blocks?</span>
      </li>
    </ul>
  </div>

  <!-- Explanation -->
  <div class="grid md:grid-cols-2 gap-4">
    <div class="p-4 bg-emerald/5 rounded-lg border border-emerald/20">
      <h3 class="text-sm font-semibold text-emerald mb-2">Why Chains are Tamper-Evident</h3>
      <p class="text-sm text-slate leading-relaxed">
        Each block stores the previous block's hash. If you change any data in an earlier block,
        its hash changes. But the next block still stores the old hash, creating a mismatch.
        This "broken link" proves tampering occurred.
      </p>
    </div>

    <div class="p-4 bg-amber/5 rounded-lg border border-amber/20">
      <h3 class="text-sm font-semibold text-amber mb-2">The Cascade Effect</h3>
      <p class="text-sm text-slate leading-relaxed">
        When one block becomes invalid, every block after it also becomes invalid. To hide tampering,
        an attacker would need to recalculate every subsequent block's hash. With
        <GlossaryTooltip term="proof of work">proof of work</GlossaryTooltip>, this becomes
        computationally impractical.
      </p>
    </div>
  </div>
</div>
