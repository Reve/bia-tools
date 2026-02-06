<script>
  import { sha256 } from '../lib/hash.js';
  import GlossaryTooltip from './GlossaryTooltip.svelte';
  import { language, translate } from '../lib/i18n.js';

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

  const t = (key, vars) => translate($language, key, vars);

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
  role="region"
  aria-label={t('blockCard.blockStatusAria', {
    number: blockNumber,
    status: isValid ? t('blockCard.valid') : t('blockCard.invalid')
  })}
>
  <!-- Block Header -->
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-ink flex items-center gap-2">
      <span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors duration-200"
        class:bg-emerald={isValid}
        class:bg-rose={!isValid}
        class:text-white={true}
        aria-hidden="true"
      >
        {blockNumber}
      </span>
      {t('blockCard.blockLabel', { number: blockNumber })}
    </h3>
    <span
      class="text-xs font-medium px-2 py-1 rounded transition-colors duration-200"
      class:badge-valid={isValid}
      class:badge-invalid={!isValid}
      role="status"
      aria-label={t('blockCard.statusAria', {
        status: isValid ? t('blockCard.valid') : t('blockCard.invalid')
      })}
    >
      {isValid ? t('blockCard.valid') : t('blockCard.invalid')}
    </span>
  </div>

  <!-- Data Field -->
  <div class="mb-4">
    <label for="data-{blockNumber}" class="block text-sm font-medium text-ink mb-1">
      <GlossaryTooltip term="block">{t('blockCard.dataLabel')}</GlossaryTooltip>
    </label>
    {#if editable}
      <textarea
        id="data-{blockNumber}"
        bind:value={data}
        placeholder={t('blockCard.dataPlaceholder')}
        rows="2"
        class="input-field resize-none text-sm"
      ></textarea>
    {:else}
      <div
        class="input-field text-sm bg-mist/30 cursor-not-allowed"
        aria-label={`${t('blockCard.dataLabel')}: ${data || t('blockCard.emptyData')}`}
      >
        {data || t('blockCard.emptyData')}
      </div>
    {/if}
  </div>

  <!-- Nonce Field -->
  <div class="mb-4">
    <label for="nonce-{blockNumber}" class="block text-sm font-medium text-ink mb-1">
      <GlossaryTooltip term="nonce">{t('blockCard.nonceLabel')}</GlossaryTooltip>
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
          class="w-10 h-10 rounded-lg bg-mist hover:bg-slate/20 text-ink font-bold transition-colors duration-150
                 focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-1"
          disabled={nonce <= 0}
          aria-label={t('blockCard.decreaseNonce')}
        >
          -
        </button>
        <button
          type="button"
          onclick={incrementNonce}
          class="w-10 h-10 rounded-lg bg-mist hover:bg-slate/20 text-ink font-bold transition-colors duration-150
                 focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-1"
          aria-label={t('blockCard.increaseNonce')}
        >
          +
        </button>
      </div>
    {:else}
      <div
        class="input-field text-sm font-mono bg-mist/30 cursor-not-allowed"
        aria-label={`${t('blockCard.nonceLabel')}: ${nonce}`}
      >
        {nonce}
      </div>
    {/if}
  </div>

  <!-- Previous Hash Field -->
  {#if showPreviousHash}
    <div class="mb-4">
      <label class="block text-sm font-medium text-ink mb-1">
        <GlossaryTooltip term="previous hash">{t('blockCard.previousHashLabel')}</GlossaryTooltip>
      </label>
      <div class="hash-output text-xs font-mono break-all transition-colors duration-200"
        class:text-emerald={isValid}
        class:text-rose={!isValid}
        aria-label={t('blockCard.previousHashAria')}
      >
        {previousHash}
      </div>
    </div>
  {/if}

  <!-- Current Hash Field -->
  <div>
    <label class="block text-sm font-medium text-ink mb-1">
      <GlossaryTooltip term="hash">{t('blockCard.currentHashLabel')}</GlossaryTooltip>
    </label>
    <div class="hash-output text-xs font-mono break-all" aria-live="polite" aria-label={t('blockCard.currentHashAria')}>
      {currentHash || t('blockCard.computing')}
    </div>
  </div>
</div>
