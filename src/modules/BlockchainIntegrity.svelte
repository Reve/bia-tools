<script>
  import { sha256 } from '../lib/hash.js';
  import { language, translate } from '../lib/i18n.js';

  // Genesis block has all zeros as previous hash
  const GENESIS_PREVIOUS_HASH = '0'.repeat(64);

  const t = (key, vars) => translate($language, key, vars);

  // Initial block data
  const getInitialBlocks = () => ([
    { data: t('initialContent.genesisBlock'), nonce: 0 },
    { data: t('initialContent.transactionAliceBob'), nonce: 0 },
    { data: t('initialContent.transactionBobCharlie'), nonce: 0 },
    { data: t('initialContent.transactionCharlieAlice'), nonce: 0 }
  ]);

  // Reactive state for blocks
  let blocks = $state(getInitialBlocks().map((b, i) => ({
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

  // Track if initial chain has been computed (to lock in previousHash values)
  let chainInitialized = $state(false);

  // Version counter to handle concurrent async calls
  let computeVersion = 0;

  // Compute hashes and validity for all blocks
  $effect(() => {
    // Explicitly read all block data to ensure reactivity tracking
    const blockData = blocks.map(b => ({ data: b.data, nonce: b.nonce }));
    computeChain(blockData);
  });

  async function computeChain(blockData) {
    const currentVersion = ++computeVersion;

    // First pass: compute what the hashes WOULD be if chain was valid
    // This is needed to set initial previousHash values
    const computedHashes = [];
    for (let i = 0; i < blocks.length; i++) {
      const prevHash = i === 0 ? GENESIS_PREVIOUS_HASH : computedHashes[i - 1];
      const blockContent = `${blockData[i].data}${blockData[i].nonce}${prevHash}`;
      computedHashes[i] = await sha256(blockContent);

      // Check if a newer computation started
      if (currentVersion !== computeVersion) return;
    }

    // Second pass: set previousHash (only on first run) and compute actual currentHash
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      // Only set previousHash on initial computation
      // This locks in the chain links so we can detect tampering
      if (!chainInitialized) {
        block.previousHash = i === 0 ? GENESIS_PREVIOUS_HASH : computedHashes[i - 1];
      }

      // Compute current hash using the STORED previousHash
      // (which may differ from what it "should" be if chain was tampered)
      const blockContent = `${block.data}${block.nonce}${block.previousHash}`;
      block.currentHash = await sha256(blockContent);

      // Check if a newer computation started
      if (currentVersion !== computeVersion) return;

      // Determine validity
      if (i === 0) {
        block.isValid = true; // Genesis block is always valid
      } else {
        const prevBlock = blocks[i - 1];
        // Block is valid if:
        // 1. Previous block is valid, AND
        // 2. Previous block's current hash matches this block's stored previousHash
        block.isValid = prevBlock.isValid && (prevBlock.currentHash === block.previousHash);
      }
    }

    // Mark chain as initialized after first computation
    if (!chainInitialized) {
      chainInitialized = true;
    }
  }

  function resetChain() {
    blocks = getInitialBlocks().map((b, i) => ({
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
    chainInitialized = false; // Allow previousHash to be recomputed
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

<section class="blockchain-integrity" aria-label={t('blockchainIntegrity.title')}>
  <!-- Header -->
  <div class="mb-8">
    <h2 class="text-2xl font-semibold text-ink mb-3">{t('blockchainIntegrity.title')}</h2>
    <p class="text-slate leading-relaxed max-w-2xl">
      {t('blockchainIntegrity.description')}
    </p>
  </div>

  <!-- Chain Status Bar -->
  <div class="card mb-6" aria-live="polite">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div
        class="flex items-center gap-6"
        role="status"
        aria-label={t('blockchainIntegrity.chainStatusAria', {
          valid: validCount,
          invalid: invalidCount
        })}
      >
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-emerald" aria-hidden="true"></span>
          <span class="text-sm text-slate">{t('blockchainIntegrity.validLabel')}: {validCount}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-rose" aria-hidden="true"></span>
          <span class="text-sm text-slate">{t('blockchainIntegrity.invalidLabel')}: {invalidCount}</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        {#if hasModifiedBlocks}
          <span class="text-xs text-amber font-medium px-2 py-1 bg-amber/10 rounded animate-fade-in" role="alert">
            {t('blockchainIntegrity.chainModified')}
          </span>
        {/if}
        <button class="btn-secondary text-sm" onclick={resetChain} aria-label={t('blockchainIntegrity.resetChainAria')}>
          {t('blockchainIntegrity.resetChain')}
        </button>
      </div>
    </div>
  </div>

  <!-- Blockchain Visualization -->
  <div class="mb-8 overflow-x-auto" role="region" aria-label={t('blockchainIntegrity.visualizationLabel')} tabindex="0">
    <div class="flex items-stretch gap-2 min-w-max pb-4">
      {#each blocks as block, index}
        <!-- Block Card -->
        <div class="flex items-stretch">
          <div
            class="block-card w-64 sm:w-72 flex-shrink-0 card transition-all duration-200 {block.isValid ? 'border-emerald bg-emerald/5' : 'border-rose bg-rose/5'} {editingBlockId === block.id ? 'ring-2 ring-cobalt' : ''}"
            role="article"
            aria-label={`${index === 0 ? t('blockchainIntegrity.genesisLabel') : t('blockchainIntegrity.blockLabel', { index: index + 1 })}: ${block.isValid ? t('blockchainIntegrity.validLabel') : t('blockchainIntegrity.invalidLabel')}`}
          >
            <!-- Block Header -->
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-base font-semibold text-ink flex items-center gap-2">
                <span
                  class="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold text-white transition-colors duration-200"
                  class:bg-emerald={block.isValid}
                  class:bg-rose={!block.isValid}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                {index === 0 ? t('blockchainIntegrity.genesisLabel') : t('blockchainIntegrity.blockLabel', { index: index + 1 })}
              </h3>
              <span
                class="text-xs font-medium px-2 py-0.5 rounded transition-colors duration-200"
                class:badge-valid={block.isValid}
                class:badge-invalid={!block.isValid}
              >
                {block.isValid ? t('blockchainIntegrity.validLabel') : t('blockchainIntegrity.invalidLabel')}
              </span>
            </div>

            <!-- Data Field -->
            <div class="mb-3">
              <label for="block-data-{block.id}" class="block text-xs font-medium text-slate mb-1">
                {t('blockchainIntegrity.dataLabel')}
              </label>
              <textarea
                id="block-data-{block.id}"
                bind:value={block.data}
                onfocus={() => editingBlockId = block.id}
                onblur={() => editingBlockId = null}
                placeholder={t('blockchainIntegrity.dataPlaceholder')}
                rows="2"
                class="input-field resize-none text-xs"
                aria-describedby="block-status-{block.id}"
              ></textarea>
            </div>

            <!-- Nonce Field -->
            <div class="mb-3">
              <label for="block-nonce-{block.id}" class="block text-xs font-medium text-slate mb-1">
                {t('blockchainIntegrity.nonceLabel')}
              </label>
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
                  class="w-8 h-8 rounded bg-mist hover:bg-slate/20 text-ink font-bold text-sm transition-colors duration-150
                         focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-1"
                  aria-label={t('blockchainIntegrity.decreaseNonceAria', {
                    blockName: index === 0 ? t('blockchainIntegrity.genesisLabel') : t('blockchainIntegrity.blockLabel', { index: index + 1 })
                  })}
                >
                  -
                </button>
                <button
                  type="button"
                  onclick={() => block.nonce++}
                  class="w-8 h-8 rounded bg-mist hover:bg-slate/20 text-ink font-bold text-sm transition-colors duration-150
                         focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-1"
                  aria-label={t('blockchainIntegrity.increaseNonceAria', {
                    blockName: index === 0 ? t('blockchainIntegrity.genesisLabel') : t('blockchainIntegrity.blockLabel', { index: index + 1 })
                  })}
                >
                  +
                </button>
              </div>
            </div>

            <!-- Previous Hash -->
            <div class="mb-3">
              <div class="block text-xs font-medium text-slate mb-1">
                {t('blockchainIntegrity.previousHashLabel')}
              </div>
              <div
                class="hash-output text-[10px] font-mono break-all py-2 px-2 transition-colors duration-200"
                class:text-emerald={block.isValid}
                class:text-rose={!block.isValid}
                aria-label={t('blockchainIntegrity.previousHashAria', { hash: block.previousHash.slice(0, 32) })}
              >
                {block.previousHash.slice(0, 32)}...
              </div>
            </div>

            <!-- Current Hash -->
            <div class="mb-3">
              <div class="block text-xs font-medium text-slate mb-1">
                {t('blockchainIntegrity.currentHashLabel')}
              </div>
              <div
                class="hash-output text-[10px] font-mono break-all py-2 px-2"
                aria-label={t('blockchainIntegrity.currentHashAria', { hash: block.currentHash.slice(0, 32) })}
              >
                {block.currentHash.slice(0, 32)}...
              </div>
            </div>

            <!-- Hidden status for screen readers -->
            <span id="block-status-{block.id}" class="sr-only">
              {t('blockchainIntegrity.blockStatusSr', {
                status: block.isValid ? t('blockchainIntegrity.validLabel') : t('blockchainIntegrity.invalidLabel')
              })}
            </span>

            <!-- Reset button for modified blocks -->
            {#if block.data !== block.originalData || block.nonce !== block.originalNonce}
              <button
                class="w-full text-xs text-cobalt hover:text-cobalt/80 font-medium mt-1 py-1
                       focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-1 rounded transition-colors duration-150"
                onclick={() => resetBlock(index)}
                aria-label={t('blockchainIntegrity.resetBlockAria', {
                  blockName: index === 0 ? t('blockchainIntegrity.genesisLabel') : t('blockchainIntegrity.blockLabel', { index: index + 1 })
                })}
              >
                {t('blockchainIntegrity.resetBlock')}
              </button>
            {/if}
          </div>

          <!-- Chain Link Arrow -->
          {#if index < blocks.length - 1}
            <div class="flex items-center px-1 sm:px-2" aria-hidden="true">
              <div class="flex flex-col items-center">
                <svg
                  class="w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-200"
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
                  {blocks[index + 1].isValid ? t('blockchainIntegrity.linked') : t('blockchainIntegrity.broken')}
                </span>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Learning Prompts -->
  <aside class="p-4 bg-cobalt/5 rounded-lg border border-cobalt/20 mb-6" aria-label={t('common.promptsLabel')}>
    <h3 class="text-sm font-semibold text-cobalt mb-2">{t('common.tryItYourself')}</h3>
    <ul class="text-sm text-slate space-y-2">
      {#each t('blockchainIntegrity.prompts') as prompt, index}
        <li class="flex items-start gap-2">
          <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">{index + 1}</span>
          <span>{prompt}</span>
        </li>
      {/each}
    </ul>
  </aside>

  <!-- Explanation -->
  <div class="grid sm:grid-cols-2 gap-4">
    <aside class="p-4 bg-emerald/5 rounded-lg border border-emerald/20" aria-label={t('blockchainIntegrity.tamperEvidentTitle')}>
      <h3 class="text-sm font-semibold text-emerald mb-2">{t('blockchainIntegrity.tamperEvidentTitle')}</h3>
      <p class="text-sm text-slate leading-relaxed">
        {t('blockchainIntegrity.tamperEvidentDescription')}
      </p>
    </aside>

    <aside class="p-4 bg-amber/5 rounded-lg border border-amber/20" aria-label={t('blockchainIntegrity.cascadeTitle')}>
      <h3 class="text-sm font-semibold text-amber mb-2">{t('blockchainIntegrity.cascadeTitle')}</h3>
      <p class="text-sm text-slate leading-relaxed">
        {t('blockchainIntegrity.cascadeDescription')}
      </p>
    </aside>
  </div>
</section>
