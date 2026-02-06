<script>
  import { sha256, compareHashes, countDifferingBits, hexToBinary, compareBinaryStrings } from '../lib/hash.js';
  import HashDisplay from '../components/HashDisplay.svelte';
  import GlossaryTooltip from '../components/GlossaryTooltip.svelte';
  import { language, translate } from '../lib/i18n.js';

  let input = $state('');
  let hash = $state('');

  // Avalanche comparison state
  let comparisonMode = $state(false);
  let input1 = $state('Hello');
  let input2 = $state('Hello!');
  let hash1 = $state('');
  let hash2 = $state('');
  let differences = $state([]);
  let binaryDifferences = $state([]);
  let differingBitCount = $state(0);
  let showBinary = $state(false);

  const t = (key, vars) => translate($language, key, vars);

  // Reactive hash computation for single input
  $effect(() => {
    if (input) {
      sha256(input).then(h => hash = h);
    } else {
      hash = '';
    }
  });

  // Reactive hash computation for comparison mode
  $effect(() => {
    if (comparisonMode) {
      Promise.all([
        input1 ? sha256(input1) : Promise.resolve(''),
        input2 ? sha256(input2) : Promise.resolve('')
      ]).then(([h1, h2]) => {
        hash1 = h1;
        hash2 = h2;
        if (h1 && h2) {
          differences = compareHashes(h1, h2);
          differingBitCount = countDifferingBits(h1, h2);
          binaryDifferences = compareBinaryStrings(hexToBinary(h1), hexToBinary(h2));
        } else {
          differences = [];
          binaryDifferences = [];
          differingBitCount = 0;
        }
      });
    }
  });
</script>

<section class="sha-explorer" aria-label={t('shaExplorer.title')}>
  <!-- Header -->
  <div class="mb-8">
    <h2 class="text-2xl font-semibold text-ink mb-3">{t('shaExplorer.title')}</h2>
    <p class="text-slate leading-relaxed max-w-2xl">
      {t('shaExplorer.descriptionPrefix')}
      <GlossaryTooltip term="hash">{t('shaExplorer.hashWord')}</GlossaryTooltip>
      {t('shaExplorer.descriptionMiddle')}
      <GlossaryTooltip term="sha-256" />
      {t('shaExplorer.descriptionSuffix')}
    </p>
  </div>

  <!-- Mode Toggle -->
  <div class="flex gap-3 mb-6" role="tablist" aria-label={t('shaExplorer.explorerModeLabel')}>
    <button
      class="px-4 py-2 rounded-lg font-medium transition-all duration-200"
      class:bg-cobalt={!comparisonMode}
      class:text-white={!comparisonMode}
      class:shadow-md={!comparisonMode}
      class:bg-mist={comparisonMode}
      class:text-slate={comparisonMode}
      onclick={() => comparisonMode = false}
      role="tab"
      aria-selected={!comparisonMode}
      aria-controls="panel-live-hashing"
      id="tab-live-hashing"
    >
      {t('shaExplorer.liveHashing')}
    </button>
    <button
      class="px-4 py-2 rounded-lg font-medium transition-all duration-200"
      class:bg-cobalt={comparisonMode}
      class:text-white={comparisonMode}
      class:shadow-md={comparisonMode}
      class:bg-mist={!comparisonMode}
      class:text-slate={!comparisonMode}
      onclick={() => comparisonMode = true}
      role="tab"
      aria-selected={comparisonMode}
      aria-controls="panel-avalanche"
      id="tab-avalanche"
    >
      {t('shaExplorer.avalancheEffect')}
    </button>
  </div>

  {#if !comparisonMode}
    <!-- Single Input Mode -->
    <div id="panel-live-hashing" role="tabpanel" aria-labelledby="tab-live-hashing" class="animate-fade-in">
      <div class="card mb-6">
        <label for="hash-input" class="block text-sm font-medium text-ink mb-2">
          {t('shaExplorer.enterAnyText')}
        </label>
        <textarea
          id="hash-input"
          bind:value={input}
          placeholder={t('shaExplorer.inputPlaceholder')}
          rows="3"
          class="input-field resize-none"
          aria-describedby="hash-input-help"
        ></textarea>
        <p id="hash-input-help" class="sr-only">{t('shaExplorer.inputHelp')}</p>
      </div>

      <div class="card" aria-live="polite">
        <HashDisplay {hash} label={t('shaExplorer.hashLabel')} />
      </div>

      <!-- Learning Prompts -->
      <aside class="mt-6 p-4 bg-cobalt/5 rounded-lg border border-cobalt/20" aria-label={t('shaExplorer.promptsLabel')}>
        <h3 class="text-sm font-semibold text-cobalt mb-2">{t('common.tryItYourself')}</h3>
        <ul class="text-sm text-slate space-y-1">
          {#each t('shaExplorer.prompts').live as prompt}
            <li>{prompt}</li>
          {/each}
        </ul>
      </aside>
    </div>

  {:else}
    <!-- Comparison Mode for Avalanche Effect -->
    <div id="panel-avalanche" role="tabpanel" aria-labelledby="tab-avalanche" class="animate-fade-in">
      <div class="mb-4">
        <p class="text-slate text-sm leading-relaxed">
          {t('shaExplorer.comparisonDescription')}
        </p>
      </div>

      <div class="grid sm:grid-cols-2 gap-4 mb-6">
        <!-- Input 1 -->
        <div class="card">
          <label for="input-1" class="block text-sm font-medium text-ink mb-2">
            {t('shaExplorer.inputOneLabel')}
          </label>
          <textarea
            id="input-1"
            bind:value={input1}
            placeholder={t('shaExplorer.inputOnePlaceholder')}
            rows="2"
            class="input-field resize-none"
          ></textarea>
        </div>

        <!-- Input 2 -->
        <div class="card">
          <label for="input-2" class="block text-sm font-medium text-ink mb-2">
            {t('shaExplorer.inputTwoLabel')}
          </label>
          <textarea
            id="input-2"
            bind:value={input2}
            placeholder={t('shaExplorer.inputTwoPlaceholder')}
            rows="2"
            class="input-field resize-none"
          ></textarea>
        </div>
      </div>

      <!-- Hash Comparison -->
      <div class="grid sm:grid-cols-2 gap-4 mb-6">
        <div class="card">
          <HashDisplay hash={hash1} label={t('shaExplorer.hashInputOneLabel')} />
        </div>
        <div class="card">
          <HashDisplay hash={hash2} {differences} label={t('shaExplorer.hashInputTwoLabel')} />
        </div>
      </div>

      <!-- Statistics -->
      {#if hash1 && hash2}
        <div class="card mb-6" aria-live="polite">
          <h3 class="text-sm font-semibold text-ink mb-3">{t('shaExplorer.comparisonStats')}</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center p-3 bg-paper rounded-lg border border-mist transition-all duration-200">
              <div
                class="text-2xl font-bold text-cobalt"
                aria-label={`${differingBitCount} ${t('shaExplorer.bitsChanged').toLowerCase()}`}
              >
                {differingBitCount}
              </div>
              <div class="text-xs text-slate">{t('shaExplorer.bitsChanged')}</div>
            </div>
            <div class="text-center p-3 bg-paper rounded-lg border border-mist">
              <div class="text-2xl font-bold text-cobalt">256</div>
              <div class="text-xs text-slate">{t('shaExplorer.totalBits')}</div>
            </div>
            <div class="text-center p-3 bg-paper rounded-lg border border-mist transition-all duration-200">
              <div
                class="text-2xl font-bold text-cobalt"
                aria-label={`${((differingBitCount / 256) * 100).toFixed(1)}%`}
              >
                {((differingBitCount / 256) * 100).toFixed(1)}%
              </div>
              <div class="text-xs text-slate">{t('shaExplorer.bitsChanged')}</div>
            </div>
            <div class="text-center p-3 bg-paper rounded-lg border border-mist transition-all duration-200">
              <div class="text-2xl font-bold text-cobalt">
                {differences.filter(d => d).length}
              </div>
              <div class="text-xs text-slate">{t('shaExplorer.hexCharsChanged')}</div>
            </div>
          </div>

          <!-- Binary View Toggle -->
          <div class="mt-4">
            <button
              class="btn-secondary text-sm"
              onclick={() => showBinary = !showBinary}
              aria-expanded={showBinary}
              aria-controls="binary-view"
            >
              {showBinary ? t('shaExplorer.hideBinary') : t('shaExplorer.showBinary')}
            </button>
          </div>

          {#if showBinary}
            <div id="binary-view" class="mt-4 grid sm:grid-cols-2 gap-4 animate-fade-in">
              <div>
                <div class="text-xs font-medium text-slate mb-1">{t('shaExplorer.binaryHashOne')}</div>
                <div class="hash-output text-xs overflow-x-auto">
                  {hexToBinary(hash1)}
                </div>
              </div>
              <div>
                <div class="text-xs font-medium text-slate mb-1">{t('shaExplorer.binaryHashTwo')}</div>
                <div class="hash-output text-xs overflow-x-auto" aria-label={t('shaExplorer.binaryDiffAria')}>
                  {#each hexToBinary(hash2).split('') as bit, i}
                    <span
                      class="transition-colors duration-150"
                      class:text-rose={binaryDifferences[i]}
                      class:font-bold={binaryDifferences[i]}
                    >{bit}</span>
                  {/each}
                </div>
              </div>
            </div>
          {/if}
        </div>
      {/if}

      <!-- Learning Prompts -->
      <aside class="p-4 bg-cobalt/5 rounded-lg border border-cobalt/20" aria-label={t('shaExplorer.promptsLabel')}>
        <h3 class="text-sm font-semibold text-cobalt mb-2">{t('common.tryItYourself')}</h3>
        <ul class="text-sm text-slate space-y-1">
          {#each t('shaExplorer.prompts').comparison as prompt}
            <li>{prompt}</li>
          {/each}
        </ul>
      </aside>

      <!-- Explanation -->
      <aside class="mt-6 p-4 bg-emerald/5 rounded-lg border border-emerald/20" aria-label={t('shaExplorer.whyMattersLabel')}>
        <h3 class="text-sm font-semibold text-emerald mb-2">{t('shaExplorer.whyMattersTitle')}</h3>
        <p class="text-sm text-slate leading-relaxed">
          {t('shaExplorer.whyMattersDescription')}
        </p>
      </aside>
    </div>
  {/if}
</section>
