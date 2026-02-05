<script>
  import { sha256 } from '../lib/hash.js';
  import GlossaryTooltip from './GlossaryTooltip.svelte';

  let {
    blockNumber = 1,
    data = $bindable(''),
    nonce = $bindable(0),
    previousHash = '0'.repeat(64),
    isValid = true,
    showPreviousHash = true,
    editable = true,
    onHashChange = null
  } = $props();

  let currentHash = $state('');

  // Compute hash from block contents
  $effect(() => {
    const blockContent = `${data}${nonce}${previousHash}`;
    sha256(blockContent).then(hash => {
      currentHash = hash;
      if (onHashChange) {
        onHashChange(hash);
      }
    });
  });

  function incrementNonce() {
    nonce = nonce + 1;
  }

  function decrementNonce() {
    if (nonce > 0) {
      nonce = nonce - 1;
    }
  }
</script>

<div
  class="block-card card transition-all duration-200 {isValid ? 'border-emerald bg-emerald/5' : 'border-rose bg-rose/5'}"
>
  <!-- Block Header -->
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-ink flex items-center gap-2">
      <span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
        class:bg-emerald={isValid}
        class:bg-rose={!isValid}
        class:text-white={true}
      >
        {blockNumber}
      </span>
      Block {blockNumber}
    </h3>
    <span
      class="text-xs font-medium px-2 py-1 rounded"
      class:badge-valid={isValid}
      class:badge-invalid={!isValid}
    >
      {isValid ? 'Valid' : 'Invalid'}
    </span>
  </div>

  <!-- Data Field -->
  <div class="mb-4">
    <label for="data-{blockNumber}" class="block text-sm font-medium text-ink mb-1">
      <GlossaryTooltip term="block">Data</GlossaryTooltip>
    </label>
    {#if editable}
      <textarea
        id="data-{blockNumber}"
        bind:value={data}
        placeholder="Enter block data..."
        rows="2"
        class="input-field resize-none text-sm"
      ></textarea>
    {:else}
      <div class="input-field text-sm bg-mist/30 cursor-not-allowed">{data || '(empty)'}</div>
    {/if}
  </div>

  <!-- Nonce Field -->
  <div class="mb-4">
    <label for="nonce-{blockNumber}" class="block text-sm font-medium text-ink mb-1">
      <GlossaryTooltip term="nonce">Nonce</GlossaryTooltip>
    </label>
    {#if editable}
      <div class="flex items-center gap-2">
        <input
          id="nonce-{blockNumber}"
          type="number"
          bind:value={nonce}
          min="0"
          class="input-field text-sm font-mono flex-1"
        />
        <button
          type="button"
          onclick={decrementNonce}
          class="w-10 h-10 rounded-lg bg-mist hover:bg-slate/20 text-ink font-bold transition-colors"
          disabled={nonce <= 0}
        >
          -
        </button>
        <button
          type="button"
          onclick={incrementNonce}
          class="w-10 h-10 rounded-lg bg-mist hover:bg-slate/20 text-ink font-bold transition-colors"
        >
          +
        </button>
      </div>
    {:else}
      <div class="input-field text-sm font-mono bg-mist/30 cursor-not-allowed">{nonce}</div>
    {/if}
  </div>

  <!-- Previous Hash Field -->
  {#if showPreviousHash}
    <div class="mb-4">
      <label class="block text-sm font-medium text-ink mb-1">
        <GlossaryTooltip term="previous hash">Previous Hash</GlossaryTooltip>
      </label>
      <div class="hash-output text-xs font-mono break-all"
        class:text-emerald={isValid}
        class:text-rose={!isValid}
      >
        {previousHash}
      </div>
    </div>
  {/if}

  <!-- Current Hash Field -->
  <div>
    <label class="block text-sm font-medium text-ink mb-1">
      <GlossaryTooltip term="hash">Current Hash</GlossaryTooltip>
    </label>
    <div class="hash-output text-xs font-mono break-all">
      {currentHash || 'Computing...'}
    </div>
  </div>
</div>
