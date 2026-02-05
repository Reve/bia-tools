<script>
  import { sha256 } from '../lib/hash.js';
  import GlossaryTooltip from '../components/GlossaryTooltip.svelte';

  // Block data for mining
  let data = $state('Hello, blockchain!');
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
    data = 'Hello, blockchain!';
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

<section class="proof-of-work" aria-label="Proof of Work Explorer">
  <!-- Header -->
  <div class="mb-8">
    <h2 class="text-2xl font-semibold text-ink mb-3">Proof of Work</h2>
    <p class="text-slate leading-relaxed max-w-2xl">
      <GlossaryTooltip term="proof of work">Proof of work</GlossaryTooltip> requires finding a
      <GlossaryTooltip term="nonce">nonce</GlossaryTooltip> that makes the block's hash start with a
      certain number of zeros. The more zeros required, the harder (and slower) the search becomes.
      This is what makes tampering with a <GlossaryTooltip term="blockchain">blockchain</GlossaryTooltip> expensive.
    </p>
  </div>

  <!-- Configuration Card -->
  <div class="card mb-6">
    <h3 class="text-lg font-semibold text-ink mb-4">Mining Configuration</h3>

    <div class="grid sm:grid-cols-2 gap-6">
      <!-- Data Input -->
      <div>
        <label for="pow-data" class="block text-sm font-medium text-ink mb-1">Block Data</label>
        <textarea
          id="pow-data"
          bind:value={data}
          placeholder="Enter block data..."
          rows="2"
          class="input-field resize-none text-sm"
          disabled={isMining}
        ></textarea>
      </div>

      <!-- Difficulty Slider -->
      <div>
        <label for="pow-difficulty" class="block text-sm font-medium text-ink mb-1">
          <GlossaryTooltip term="difficulty">Difficulty</GlossaryTooltip>:
          <span class="font-mono text-cobalt">{difficulty}</span>
          <span class="text-slate font-normal"> (leading zeros)</span>
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
          aria-label="Set difficulty from {MIN_DIFFICULTY} to {MAX_DIFFICULTY} leading zeros"
        />
        <div class="flex justify-between text-xs text-slate mt-1">
          <span>Easy ({MIN_DIFFICULTY})</span>
          <span>Hard ({MAX_DIFFICULTY})</span>
        </div>
      </div>

      <!-- Time Limit Slider -->
      <div>
        <label for="pow-time-limit" class="block text-sm font-medium text-ink mb-1">
          Time Limit:
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
          aria-label="Set time limit from {MIN_TIME_LIMIT} to {MAX_TIME_LIMIT} seconds"
        />
        <div class="flex justify-between text-xs text-slate mt-1">
          <span>{MIN_TIME_LIMIT}s</span>
          <span>{MAX_TIME_LIMIT}s</span>
        </div>
      </div>
    </div>

    <!-- Target Pattern Display -->
    <div class="mt-4 p-3 bg-ink/5 rounded-lg">
      <div class="text-xs font-medium text-slate mb-1">Target: hash must start with</div>
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
        aria-label="Start mining to find a nonce that meets the difficulty requirement"
      >
        Start Mining
      </button>
    {:else}
      <button
        class="px-4 py-2 rounded-lg font-medium text-sm text-white bg-rose hover:bg-rose/90
               transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-1"
        onclick={stopMining}
        aria-label="Stop the mining process"
      >
        Stop Mining
      </button>
    {/if}
    <button
      class="btn-secondary"
      onclick={resetMining}
      disabled={isMining}
      aria-label="Reset mining configuration and results"
    >
      Reset
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
            Mining in Progress
          {:else if miningResult?.timedOut}
            <span class="w-3 h-3 rounded-full bg-rose" aria-hidden="true"></span>
            Time Limit Reached
          {:else}
            <span class="w-3 h-3 rounded-full bg-emerald" aria-hidden="true"></span>
            Nonce Found
          {/if}
        </h3>
        {#if isMining}
          <span class="text-xs text-slate">
            Limit: {formatTime(timeLimitMs)}
          </span>
        {/if}
      </div>

      <!-- Statistics Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div class="text-center p-3 bg-ink/5 rounded-lg">
          <div class="text-xs text-slate mb-1">Nonce</div>
          <div class="font-mono text-sm font-semibold text-ink">
            {formatNumber(isMining ? currentNonce : (miningResult?.nonce ?? 0))}
          </div>
        </div>
        <div class="text-center p-3 bg-ink/5 rounded-lg">
          <div class="text-xs text-slate mb-1">Attempts</div>
          <div class="font-mono text-sm font-semibold text-ink">
            {formatNumber(isMining ? attempts : (miningResult?.attempts ?? 0))}
          </div>
        </div>
        <div class="text-center p-3 bg-ink/5 rounded-lg">
          <div class="text-xs text-slate mb-1">Time</div>
          <div class="font-mono text-sm font-semibold text-ink">
            {formatTime(isMining ? elapsedMs : (miningResult?.time ?? 0))}
          </div>
        </div>
        <div class="text-center p-3 bg-ink/5 rounded-lg">
          <div class="text-xs text-slate mb-1">Difficulty</div>
          <div class="font-mono text-sm font-semibold text-cobalt">
            {'0'.repeat(difficulty)} ({difficulty})
          </div>
        </div>
      </div>

      <!-- Current Hash Display -->
      {#if isMining && currentHash}
        <div class="mb-4">
          <div class="text-xs font-medium text-slate mb-1">Latest Hash Tested</div>
          <div class="hash-output font-mono text-xs break-all">
            {currentHash}
          </div>
        </div>
      {/if}

      <!-- Result Hash Display -->
      {#if miningResult && !miningResult.timedOut}
        <div>
          <div class="text-xs font-medium text-slate mb-1">Winning Hash</div>
          <div class="hash-output font-mono text-xs break-all">
            {#each miningResult.hash.split('') as char, i}
              <span
                class:text-emerald={i < difficulty}
                class:font-bold={i < difficulty}
              >{char}</span>
            {/each}
          </div>
          <p class="text-xs text-emerald mt-2 font-medium">
            Hash starts with {difficulty} zero{difficulty !== 1 ? 's' : ''} — proof of work satisfied.
          </p>
        </div>
      {:else if miningResult?.timedOut}
        <div>
          <p class="text-sm text-rose font-medium">
            Could not find a valid nonce within {formatTime(timeLimitMs)}.
            Tried {formatNumber(miningResult.attempts)} nonces.
          </p>
          <p class="text-xs text-slate mt-1">
            Try a lower difficulty or different data.
          </p>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Nonce Search Visualization -->
  {#if isMining}
    <div class="card mb-6" aria-label="Nonce search visualization">
      <h3 class="text-sm font-semibold text-ink mb-3">Nonce Search</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        {#each Array(8) as _, i}
          {@const n = Math.max(0, currentNonce - 7 + i)}
          <div
            class="p-2 rounded text-xs font-mono transition-all duration-100 {i === 7 ? 'bg-amber/10 text-amber font-bold' : 'bg-ink/5 text-slate'}"
          >
            Nonce: {formatNumber(n)}
          </div>
        {/each}
      </div>
      <div class="mt-3 w-full bg-mist rounded-full h-1.5" role="progressbar"
           aria-label="Time elapsed" aria-valuenow={elapsedMs} aria-valuemax={timeLimitMs}>
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
  <aside class="p-4 bg-cobalt/5 rounded-lg border border-cobalt/20 mb-6" aria-label="Learning prompts">
    <h3 class="text-sm font-semibold text-cobalt mb-2">Try it yourself</h3>
    <ul class="text-sm text-slate space-y-2">
      <li class="flex items-start gap-2">
        <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">1</span>
        <span>Set difficulty to 2 and start the search. How many attempts did it take?</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">2</span>
        <span>Increase difficulty to 3 and compare the time and attempts. How much harder was it?</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">3</span>
        <span>Why does higher difficulty make tampering with earlier blocks impractical?</span>
      </li>
    </ul>
  </aside>

  <!-- Explanation Cards -->
  <div class="grid sm:grid-cols-2 gap-4">
    <aside class="p-4 bg-emerald/5 rounded-lg border border-emerald/20" aria-label="How proof of work secures the chain">
      <h3 class="text-sm font-semibold text-emerald mb-2">How Proof of Work Secures the Chain</h3>
      <p class="text-sm text-slate leading-relaxed">
        To add a block, miners must find a <GlossaryTooltip term="nonce">nonce</GlossaryTooltip> that
        produces a hash with the required leading zeros. This takes real computational effort. To tamper
        with a past block, an attacker would need to redo this work for that block and every block
        after it — faster than the rest of the network.
      </p>
    </aside>

    <aside class="p-4 bg-amber/5 rounded-lg border border-amber/20" aria-label="Why difficulty matters">
      <h3 class="text-sm font-semibold text-amber mb-2">Why Difficulty Matters</h3>
      <p class="text-sm text-slate leading-relaxed">
        Each additional leading zero roughly multiplies the search space by 16. A
        <GlossaryTooltip term="difficulty">difficulty</GlossaryTooltip> of 2 might take hundreds of
        attempts, while a difficulty of 5 can take millions. Real blockchains use much higher
        difficulties, making history rewriting practically impossible.
      </p>
    </aside>
  </div>
</section>
