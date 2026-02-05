<script>
  import BlockCard from '../components/BlockCard.svelte';
  import GlossaryTooltip from '../components/GlossaryTooltip.svelte';

  let data = $state('Hello, blockchain!');
  let nonce = $state(0);
  let previousHash = '0000000000000000000000000000000000000000000000000000000000000000';
  let currentHash = $state('');

  // Store original values for reset
  const originalData = 'Hello, blockchain!';
  const originalNonce = 0;

  function resetBlock() {
    data = originalData;
    nonce = originalNonce;
  }

  function handleHashChange(hash) {
    currentHash = hash;
  }
</script>

<section class="block-anatomy" aria-label="Block Anatomy Explorer">
  <!-- Header -->
  <div class="mb-8">
    <h2 class="text-2xl font-semibold text-ink mb-3">Block Anatomy</h2>
    <p class="text-slate leading-relaxed max-w-2xl">
      A <GlossaryTooltip term="block">block</GlossaryTooltip> bundles data with metadata
      and links to the previous block. Every field contributes to the block's unique fingerprint.
    </p>
  </div>

  <!-- Field Explanations -->
  <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" role="list" aria-label="Block fields">
    <div class="card text-center" role="listitem">
      <div class="w-10 h-10 mx-auto mb-2 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
        <svg class="w-5 h-5 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h4 class="font-semibold text-ink text-sm mb-1">Data</h4>
      <p class="text-xs text-slate">The actual content stored in the block.</p>
    </div>

    <div class="card text-center" role="listitem">
      <div class="w-10 h-10 mx-auto mb-2 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
        <svg class="w-5 h-5 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      </div>
      <h4 class="font-semibold text-ink text-sm mb-1">Nonce</h4>
      <p class="text-xs text-slate">A number used once, adjustable for mining.</p>
    </div>

    <div class="card text-center" role="listitem">
      <div class="w-10 h-10 mx-auto mb-2 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
        <svg class="w-5 h-5 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </div>
      <h4 class="font-semibold text-ink text-sm mb-1">Previous Hash</h4>
      <p class="text-xs text-slate">Links this block to the one before it.</p>
    </div>

    <div class="card text-center" role="listitem">
      <div class="w-10 h-10 mx-auto mb-2 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
        <svg class="w-5 h-5 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <h4 class="font-semibold text-ink text-sm mb-1">Current Hash</h4>
      <p class="text-xs text-slate">Computed from all fields combined.</p>
    </div>
  </div>

  <!-- Interactive Block -->
  <div class="mb-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-ink">Interactive Block</h3>
      <button class="btn-secondary text-sm" onclick={resetBlock} aria-label="Reset block to original values">
        Reset Block
      </button>
    </div>

    <div class="max-w-xl">
      <BlockCard
        blockNumber={1}
        bind:data={data}
        bind:nonce={nonce}
        previousHash={previousHash}
        isValid={true}
        showPreviousHash={true}
        editable={true}
        onHashChange={handleHashChange}
      />
    </div>
  </div>

  <!-- How Hash is Computed -->
  <div class="card mb-6">
    <h3 class="text-lg font-semibold text-ink mb-3">How the Hash is Computed</h3>
    <p class="text-sm text-slate mb-4">
      The current hash is calculated by combining all block fields and passing them through
      <GlossaryTooltip term="sha-256">SHA-256</GlossaryTooltip>:
    </p>
    <div class="bg-ink/5 rounded-lg p-4 font-mono text-sm overflow-x-auto" role="figure" aria-label="Hash computation formula">
      <div class="text-slate mb-2">SHA-256( data + nonce + previousHash )</div>
      <div class="text-xs text-slate/70">
        = SHA-256( "{data}" + {nonce} + "{previousHash.slice(0, 8)}..." )
      </div>
    </div>
  </div>

  <!-- Learning Prompts -->
  <aside class="p-4 bg-cobalt/5 rounded-lg border border-cobalt/20 mb-6" aria-label="Learning prompts">
    <h3 class="text-sm font-semibold text-cobalt mb-2">Try it yourself</h3>
    <ul class="text-sm text-slate space-y-2">
      <li class="flex items-start gap-2">
        <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">1</span>
        <span>Edit the data field and note the new hash. How many characters changed?</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">2</span>
        <span>Increment the nonce by 1. Does the hash change completely?</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">3</span>
        <span>Which field links this block to the one before it?</span>
      </li>
    </ul>
  </aside>

  <!-- Key Insight -->
  <aside class="p-4 bg-emerald/5 rounded-lg border border-emerald/20" aria-label="Key insight">
    <h3 class="text-sm font-semibold text-emerald mb-2">Key Insight</h3>
    <p class="text-sm text-slate leading-relaxed">
      Every field in a block contributes to its hash. If any field changes, the entire hash changes.
      This is why the previous hash field is so important: it creates an unbreakable link to the
      block before it. Change the previous block, and this block's link becomes invalid.
    </p>
  </aside>
</section>
