<script>
  import BlockCard from '../components/BlockCard.svelte';
  import { language, translate } from '../lib/i18n.js';

  const t = (key, vars) => translate($language, key, vars);

  const getDefaultData = () => t('initialContent.helloBlockchain');

  let data = $state(getDefaultData());
  let nonce = $state(0);
  let previousHash = '0000000000000000000000000000000000000000000000000000000000000000';
  let currentHash = $state('');

  // Store original values for reset
  const originalNonce = 0;

  function resetBlock() {
    data = getDefaultData();
    nonce = originalNonce;
  }

  function handleHashChange(hash) {
    currentHash = hash;
  }
</script>

<section class="block-anatomy" aria-label={t('blockAnatomy.title')}>
  <!-- Header -->
  <div class="mb-8">
    <h2 class="text-2xl font-semibold text-ink mb-3">{t('blockAnatomy.title')}</h2>
    <p class="text-slate leading-relaxed max-w-2xl">
      {t('blockAnatomy.description')}
    </p>
  </div>

  <!-- Field Explanations -->
  <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" role="list" aria-label={t('blockAnatomy.fieldsLabel')}>
    <div class="card text-center" role="listitem">
      <div class="w-10 h-10 mx-auto mb-2 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
        <svg class="w-5 h-5 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h4 class="font-semibold text-ink text-sm mb-1">{t('blockAnatomy.dataTitle')}</h4>
      <p class="text-xs text-slate">{t('blockAnatomy.dataDescription')}</p>
    </div>

    <div class="card text-center" role="listitem">
      <div class="w-10 h-10 mx-auto mb-2 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
        <svg class="w-5 h-5 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      </div>
      <h4 class="font-semibold text-ink text-sm mb-1">{t('blockAnatomy.nonceTitle')}</h4>
      <p class="text-xs text-slate">{t('blockAnatomy.nonceDescription')}</p>
    </div>

    <div class="card text-center" role="listitem">
      <div class="w-10 h-10 mx-auto mb-2 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
        <svg class="w-5 h-5 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </div>
      <h4 class="font-semibold text-ink text-sm mb-1">{t('blockAnatomy.previousHashTitle')}</h4>
      <p class="text-xs text-slate">{t('blockAnatomy.previousHashDescription')}</p>
    </div>

    <div class="card text-center" role="listitem">
      <div class="w-10 h-10 mx-auto mb-2 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
        <svg class="w-5 h-5 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <h4 class="font-semibold text-ink text-sm mb-1">{t('blockAnatomy.currentHashTitle')}</h4>
      <p class="text-xs text-slate">{t('blockAnatomy.currentHashDescription')}</p>
    </div>
  </div>

  <!-- Interactive Block -->
  <div class="mb-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-ink">{t('blockAnatomy.interactiveTitle')}</h3>
      <button class="btn-secondary text-sm" onclick={resetBlock} aria-label={t('blockAnatomy.resetBlockAria')}>
        {t('blockAnatomy.resetBlock')}
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
    <h3 class="text-lg font-semibold text-ink mb-3">{t('blockAnatomy.hashComputedTitle')}</h3>
    <p class="text-sm text-slate mb-4">
      {t('blockAnatomy.hashComputedDescription')}
    </p>
    <div
      class="bg-ink/5 rounded-lg p-4 font-mono text-sm overflow-x-auto"
      role="figure"
      aria-label={t('blockAnatomy.hashFormulaLabel')}
    >
      <div class="text-slate mb-2">SHA-256( data + nonce + previousHash )</div>
      <div class="text-xs text-slate/70">
        = SHA-256( "{data}" + {nonce} + "{previousHash.slice(0, 8)}..." )
      </div>
    </div>
  </div>

  <!-- Learning Prompts -->
  <aside class="p-4 bg-cobalt/5 rounded-lg border border-cobalt/20 mb-6" aria-label={t('common.promptsLabel')}>
    <h3 class="text-sm font-semibold text-cobalt mb-2">{t('common.tryItYourself')}</h3>
    <ul class="text-sm text-slate space-y-2">
      {#each t('blockAnatomy.prompts') as prompt, index}
        <li class="flex items-start gap-2">
          <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">{index + 1}</span>
          <span>{prompt}</span>
        </li>
      {/each}
    </ul>
  </aside>

  <!-- Key Insight -->
  <aside class="p-4 bg-emerald/5 rounded-lg border border-emerald/20" aria-label={t('blockAnatomy.keyInsightTitle')}>
    <h3 class="text-sm font-semibold text-emerald mb-2">{t('blockAnatomy.keyInsightTitle')}</h3>
    <p class="text-sm text-slate leading-relaxed">
      {t('blockAnatomy.keyInsightDescription')}
    </p>
  </aside>
</section>
