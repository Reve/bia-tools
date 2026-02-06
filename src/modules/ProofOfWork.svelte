<script>
  import { sha256 } from '../lib/hash.js';
  import GlossaryTooltip from '../components/GlossaryTooltip.svelte';
  import { getZeroLabel, language, translate } from '../lib/i18n.js';

  // Block data for mining
  const t = (key, vars) => translate($language, key, vars);

  const getDefaultData = () => t('initialContent.helloBlockchain');

  let data = $state(getDefaultData());
  let previousHash = '0000000000000000000000000000000000000000000000000000000000000000';

  // Difficulty: number of leading zeros required
  let difficulty = $state(2);
  const MIN_DIFFICULTY = 1;
  const MAX_DIFFICULTY = 5;

  // Mining state
  let isMining = $state(false);
  let miningResult = $state(null);
  let currentNonce = $state(0);
  let currentHash = $state('');
  let attempts = $state(0);
  let elapsedMs = $state(0);

  // Time limit (adjustable via slider)
  let timeLimitSec = $state(30);
  const MIN_TIME_LIMIT = 5;
  const MAX_TIME_LIMIT = 360;
  let timeLimitMs = $derived(timeLimitSec * 1000);

  // Abort controller for cancellation
  let abortMining = false;

  // The target prefix to match
  let targetPrefix = $derived('0'.repeat(difficulty));

  // Compute a preview hash from current data (not mining, just showing what the hash looks like)
  let previewHash = $state('');
  $effect(() => {
    const content = `${data}${0}${previousHash}`;
    sha256(content).then(h => { previewHash = h; });
  });

  async function startMining() {
    // Reset state
    isMining = true;
    miningResult = null;
    currentNonce = 0;
    currentHash = '';
    attempts = 0;
    elapsedMs = 0;
    abortMining = false;

    const prefix = '0'.repeat(difficulty);
    const startTime = performance.now();

    // Mine in batches to keep UI responsive
    const BATCH_SIZE = 500;
    let nonce = 0;

    while (!abortMining) {
      // Process a batch of nonces
      for (let i = 0; i < BATCH_SIZE; i++) {
        const blockContent = `${data}${nonce}${previousHash}`;
        const hash = await sha256(blockContent);

        if (hash.startsWith(prefix)) {
          // Found a valid hash
          const endTime = performance.now();
          currentNonce = nonce;
          currentHash = hash;
          attempts = nonce + 1;
          elapsedMs = endTime - startTime;
          miningResult = {
            nonce,
            hash,
            attempts: nonce + 1,
            time: endTime - startTime
          };
          isMining = false;
          return;
        }

        nonce++;
      }

      // Update UI between batches
      currentNonce = nonce;
      attempts = nonce;
      elapsedMs = performance.now() - startTime;

      // Check time limit
      if (elapsedMs >= timeLimitMs) {
        miningResult = { timedOut: true, attempts: nonce, time: elapsedMs };
        isMining = false;
        return;
      }

      // Yield to the browser to keep UI responsive
      await new Promise(r => setTimeout(r, 0));
    }

    // Mining was cancelled
    isMining = false;
  }

  function stopMining() {
    abortMining = true;
  }

  function resetMining() {
    stopMining();
    miningResult = null;
    currentNonce = 0;
    currentHash = '';
    attempts = 0;
    elapsedMs = 0;
    data = getDefaultData();
    difficulty = 2;
    timeLimitSec = 30;
  }

  function formatTime(ms) {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  }

  function formatNumber(n) {
    return n.toLocaleString();
  }
</script>

<section class="proof-of-work" aria-label={t('proofOfWork.title')}>
  <!-- Header -->
  <div class="mb-8">
    <h2 class="text-2xl font-semibold text-ink mb-3">{t('proofOfWork.title')}</h2>
    <p class="text-slate leading-relaxed max-w-2xl">
      {t('proofOfWork.description')}
    </p>
  </div>

  <!-- Configuration Card -->
  <div class="card mb-6">
    <h3 class="text-lg font-semibold text-ink mb-4">{t('proofOfWork.miningConfigTitle')}</h3>

    <div class="grid sm:grid-cols-2 gap-6">
      <!-- Data Input -->
      <div>
        <label for="pow-data" class="block text-sm font-medium text-ink mb-1">
          {t('proofOfWork.blockDataLabel')}
        </label>
        <textarea
          id="pow-data"
          bind:value={data}
          placeholder={t('proofOfWork.blockDataPlaceholder')}
          rows="2"
          class="input-field resize-none text-sm"
          disabled={isMining}
        ></textarea>
      </div>

      <!-- Difficulty Slider -->
      <div>
        <label for="pow-difficulty" class="block text-sm font-medium text-ink mb-1">
          <GlossaryTooltip term="difficulty">{t('proofOfWork.difficultyLabel')}</GlossaryTooltip>:
          <span class="font-mono text-cobalt">{difficulty}</span>
          <span class="text-slate font-normal"> {t('proofOfWork.leadingZerosLabel')}</span>
        </label>
        <input
          id="pow-difficulty"
          type="range"
          min={MIN_DIFFICULTY}
          max={MAX_DIFFICULTY}
          bind:value={difficulty}
          disabled={isMining}
          class="w-full h-2 bg-mist rounded-lg appearance-none cursor-pointer accent-cobalt
                 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={t('proofOfWork.difficultyAria', { min: MIN_DIFFICULTY, max: MAX_DIFFICULTY })}
        />
        <div class="flex justify-between text-xs text-slate mt-1">
          <span>{t('proofOfWork.easyLabel', { min: MIN_DIFFICULTY })}</span>
          <span>{t('proofOfWork.hardLabel', { max: MAX_DIFFICULTY })}</span>
        </div>
      </div>

      <!-- Time Limit Slider -->
      <div>
        <label for="pow-time-limit" class="block text-sm font-medium text-ink mb-1">
          {t('proofOfWork.timeLimitLabel')}:
          <span class="font-mono text-cobalt">{timeLimitSec}s</span>
        </label>
        <input
          id="pow-time-limit"
          type="range"
          min={MIN_TIME_LIMIT}
          max={MAX_TIME_LIMIT}
          step="5"
          bind:value={timeLimitSec}
          disabled={isMining}
          class="w-full h-2 bg-mist rounded-lg appearance-none cursor-pointer accent-cobalt
                 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={t('proofOfWork.timeLimitAria', { min: MIN_TIME_LIMIT, max: MAX_TIME_LIMIT })}
        />
        <div class="flex justify-between text-xs text-slate mt-1">
          <span>{MIN_TIME_LIMIT}s</span>
          <span>{MAX_TIME_LIMIT}s</span>
        </div>
      </div>
    </div>

    <!-- Target Pattern Display -->
    <div class="mt-4 p-3 bg-ink/5 rounded-lg">
      <div class="text-xs font-medium text-slate mb-1">{t('proofOfWork.targetLabel')}</div>
      <div class="font-mono text-sm">
        <span class="text-cobalt font-bold">{targetPrefix}</span><span class="text-slate/40">{'x'.repeat(64 - difficulty)}</span>
      </div>
    </div>
  </div>

  <!-- Mining Controls -->
  <div class="flex items-center gap-3 mb-6">
    {#if !isMining}
      <button
        class="btn-primary"
        onclick={startMining}
        aria-label={t('proofOfWork.startMiningAria')}
      >
        {t('proofOfWork.startMining')}
      </button>
    {:else}
      <button
        class="px-4 py-2 rounded-lg font-medium text-sm text-white bg-rose hover:bg-rose/90
               transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-1"
        onclick={stopMining}
        aria-label={t('proofOfWork.stopMiningAria')}
      >
        {t('proofOfWork.stopMining')}
      </button>
    {/if}
    <button
      class="btn-secondary"
      onclick={resetMining}
      disabled={isMining}
      aria-label={t('proofOfWork.resetAria')}
    >
      {t('proofOfWork.reset')}
    </button>
  </div>

  <!-- Mining Progress -->
  {#if isMining || miningResult}
    <div class="card mb-6 transition-all duration-200" aria-live="polite">
      <!-- Progress Header -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-ink flex items-center gap-2">
          {#if isMining}
            <span class="w-3 h-3 rounded-full bg-amber animate-pulse" aria-hidden="true"></span>
            {t('proofOfWork.miningInProgress')}
          {:else if miningResult?.timedOut}
            <span class="w-3 h-3 rounded-full bg-rose" aria-hidden="true"></span>
            {t('proofOfWork.timeLimitReached')}
          {:else}
            <span class="w-3 h-3 rounded-full bg-emerald" aria-hidden="true"></span>
            {t('proofOfWork.nonceFound')}
          {/if}
        </h3>
        {#if isMining}
          <span class="text-xs text-slate">
            {t('proofOfWork.limitLabel', { time: formatTime(timeLimitMs) })}
          </span>
        {/if}
      </div>

      <!-- Statistics Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div class="text-center p-3 bg-ink/5 rounded-lg">
          <div class="text-xs text-slate mb-1">{t('proofOfWork.stats.nonce')}</div>
          <div class="font-mono text-sm font-semibold text-ink">
            {formatNumber(isMining ? currentNonce : (miningResult?.nonce ?? 0))}
          </div>
        </div>
        <div class="text-center p-3 bg-ink/5 rounded-lg">
          <div class="text-xs text-slate mb-1">{t('proofOfWork.stats.attempts')}</div>
          <div class="font-mono text-sm font-semibold text-ink">
            {formatNumber(isMining ? attempts : (miningResult?.attempts ?? 0))}
          </div>
        </div>
        <div class="text-center p-3 bg-ink/5 rounded-lg">
          <div class="text-xs text-slate mb-1">{t('proofOfWork.stats.time')}</div>
          <div class="font-mono text-sm font-semibold text-ink">
            {formatTime(isMining ? elapsedMs : (miningResult?.time ?? 0))}
          </div>
        </div>
        <div class="text-center p-3 bg-ink/5 rounded-lg">
          <div class="text-xs text-slate mb-1">{t('proofOfWork.stats.difficulty')}</div>
          <div class="font-mono text-sm font-semibold text-cobalt">
            {'0'.repeat(difficulty)} ({difficulty})
          </div>
        </div>
      </div>

      <!-- Current Hash Display -->
      {#if isMining && currentHash}
        <div class="mb-4">
          <div class="text-xs font-medium text-slate mb-1">{t('proofOfWork.latestHash')}</div>
          <div class="hash-output font-mono text-xs break-all">
            {currentHash}
          </div>
        </div>
      {/if}

      <!-- Result Hash Display -->
      {#if miningResult && !miningResult.timedOut}
        <div>
          <div class="text-xs font-medium text-slate mb-1">{t('proofOfWork.winningHash')}</div>
          <div class="hash-output font-mono text-xs break-all">
            {#each miningResult.hash.split('') as char, i}
              <span
                class:text-emerald={i < difficulty}
                class:font-bold={i < difficulty}
              >{char}</span>
            {/each}
          </div>
          <p class="text-xs text-emerald mt-2 font-medium">
            {t('proofOfWork.hashStartsWith', {
              count: difficulty,
              zeroLabel: getZeroLabel($language, difficulty)
            })}
          </p>
        </div>
      {:else if miningResult?.timedOut}
        <div>
          <p class="text-sm text-rose font-medium">
            {t('proofOfWork.timeoutMessage', { time: formatTime(timeLimitMs) })}
            {t('proofOfWork.timeoutAttempts', { attempts: formatNumber(miningResult.attempts) })}
          </p>
          <p class="text-xs text-slate mt-1">
            {t('proofOfWork.timeoutSuggestion')}
          </p>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Nonce Search Visualization -->
  {#if isMining}
    <div class="card mb-6" aria-label={t('proofOfWork.nonceSearchLabel')}>
      <h3 class="text-sm font-semibold text-ink mb-3">{t('proofOfWork.nonceSearchLabel')}</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        {#each Array(8) as _, i}
          {@const n = Math.max(0, currentNonce - 7 + i)}
          <div
            class="p-2 rounded text-xs font-mono transition-all duration-100 {i === 7 ? 'bg-amber/10 text-amber font-bold' : 'bg-ink/5 text-slate'}"
          >
            {t('proofOfWork.nonceLabel', { value: formatNumber(n) })}
          </div>
        {/each}
      </div>
      <div class="mt-3 w-full bg-mist rounded-full h-1.5" role="progressbar"
           aria-label={t('proofOfWork.timeElapsed')} aria-valuenow={elapsedMs} aria-valuemax={timeLimitMs}>
        <div
          class="h-1.5 rounded-full transition-all duration-300"
          class:bg-amber={elapsedMs < timeLimitMs * 0.75}
          class:bg-rose={elapsedMs >= timeLimitMs * 0.75}
          style="width: {Math.min(100, (elapsedMs / timeLimitMs) * 100)}%"
        ></div>
      </div>
      <div class="text-xs text-slate mt-1 text-right">
        {formatTime(elapsedMs)} / {formatTime(timeLimitMs)}
      </div>
    </div>
  {/if}

  <!-- Learning Prompts -->
  <aside class="p-4 bg-cobalt/5 rounded-lg border border-cobalt/20 mb-6" aria-label={t('common.promptsLabel')}>
    <h3 class="text-sm font-semibold text-cobalt mb-2">{t('common.tryItYourself')}</h3>
    <ul class="text-sm text-slate space-y-2">
      {#each t('proofOfWork.prompts') as prompt, index}
        <li class="flex items-start gap-2">
          <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">{index + 1}</span>
          <span>{prompt}</span>
        </li>
      {/each}
    </ul>
  </aside>

  <!-- Explanation Cards -->
  <div class="grid sm:grid-cols-2 gap-4">
    <aside class="p-4 bg-emerald/5 rounded-lg border border-emerald/20" aria-label={t('proofOfWork.secureChainTitle')}>
      <h3 class="text-sm font-semibold text-emerald mb-2">{t('proofOfWork.secureChainTitle')}</h3>
      <p class="text-sm text-slate leading-relaxed">
        {t('proofOfWork.secureChainDescription')}
      </p>
    </aside>

    <aside class="p-4 bg-amber/5 rounded-lg border border-amber/20" aria-label={t('proofOfWork.difficultyMattersTitle')}>
      <h3 class="text-sm font-semibold text-amber mb-2">{t('proofOfWork.difficultyMattersTitle')}</h3>
      <p class="text-sm text-slate leading-relaxed">
        {t('proofOfWork.difficultyMattersDescription')}
      </p>
    </aside>
  </div>
</section>
