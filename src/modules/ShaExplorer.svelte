<script>
  import { sha256, compareHashes, countDifferingBits, hexToBinary, compareBinaryStrings } from '../lib/hash.js';
  import HashDisplay from '../components/HashDisplay.svelte';
  import GlossaryTooltip from '../components/GlossaryTooltip.svelte';

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

  function toggleComparisonMode() {
    comparisonMode = !comparisonMode;
  }
</script>

<div class="sha-explorer">
  <!-- Header -->
  <div class="mb-8">
    <h2 class="text-2xl font-semibold text-ink mb-3">SHA-256 Explorer</h2>
    <p class="text-slate leading-relaxed max-w-2xl">
      A <GlossaryTooltip term="hash">hash</GlossaryTooltip> function turns any input into a
      fixed-length fingerprint. <GlossaryTooltip term="sha-256">SHA-256</GlossaryTooltip> always
      produces a 256-bit (64 hex character) output, no matter how long or short your input is.
    </p>
  </div>

  <!-- Mode Toggle -->
  <div class="flex gap-3 mb-6">
    <button
      class="px-4 py-2 rounded-lg font-medium transition-colors duration-150"
      class:bg-cobalt={!comparisonMode}
      class:text-white={!comparisonMode}
      class:bg-mist={comparisonMode}
      class:text-slate={comparisonMode}
      onclick={() => comparisonMode = false}
    >
      Live Hashing
    </button>
    <button
      class="px-4 py-2 rounded-lg font-medium transition-colors duration-150"
      class:bg-cobalt={comparisonMode}
      class:text-white={comparisonMode}
      class:bg-mist={!comparisonMode}
      class:text-slate={!comparisonMode}
      onclick={() => comparisonMode = true}
    >
      Avalanche Effect
    </button>
  </div>

  {#if !comparisonMode}
    <!-- Single Input Mode -->
    <div class="card mb-6">
      <label for="hash-input" class="block text-sm font-medium text-ink mb-2">
        Enter any text
      </label>
      <textarea
        id="hash-input"
        bind:value={input}
        placeholder="Type something here..."
        rows="3"
        class="input-field resize-none"
      ></textarea>
    </div>

    <div class="card">
      <HashDisplay {hash} label="SHA-256 Hash" />
    </div>

    <!-- Learning Prompts -->
    <div class="mt-6 p-4 bg-cobalt/5 rounded-lg border border-cobalt/20">
      <h3 class="text-sm font-semibold text-cobalt mb-2">Try it yourself</h3>
      <ul class="text-sm text-slate space-y-1">
        <li>Type a short word and observe the hash.</li>
        <li>Add a single character. Notice how the entire hash changes.</li>
        <li>Try a very long sentence. The hash is still 64 characters.</li>
      </ul>
    </div>

  {:else}
    <!-- Comparison Mode for Avalanche Effect -->
    <div class="mb-4">
      <p class="text-slate text-sm leading-relaxed">
        The <GlossaryTooltip term="avalanche effect">avalanche effect</GlossaryTooltip> means
        that even a tiny change in input produces a completely different hash.
        Compare two inputs below to see this in action.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-4 mb-6">
      <!-- Input 1 -->
      <div class="card">
        <label for="input-1" class="block text-sm font-medium text-ink mb-2">
          Input 1
        </label>
        <textarea
          id="input-1"
          bind:value={input1}
          placeholder="First input..."
          rows="2"
          class="input-field resize-none"
        ></textarea>
      </div>

      <!-- Input 2 -->
      <div class="card">
        <label for="input-2" class="block text-sm font-medium text-ink mb-2">
          Input 2
        </label>
        <textarea
          id="input-2"
          bind:value={input2}
          placeholder="Second input..."
          rows="2"
          class="input-field resize-none"
        ></textarea>
      </div>
    </div>

    <!-- Hash Comparison -->
    <div class="grid md:grid-cols-2 gap-4 mb-6">
      <div class="card">
        <HashDisplay hash={hash1} label="Hash of Input 1" />
      </div>
      <div class="card">
        <HashDisplay hash={hash2} {differences} label="Hash of Input 2 (differences highlighted)" />
      </div>
    </div>

    <!-- Statistics -->
    {#if hash1 && hash2}
      <div class="card mb-6">
        <h3 class="text-sm font-semibold text-ink mb-3">Comparison Statistics</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-3 bg-paper rounded-lg border border-mist">
            <div class="text-2xl font-bold text-cobalt">{differingBitCount}</div>
            <div class="text-xs text-slate">Bits Changed</div>
          </div>
          <div class="text-center p-3 bg-paper rounded-lg border border-mist">
            <div class="text-2xl font-bold text-cobalt">256</div>
            <div class="text-xs text-slate">Total Bits</div>
          </div>
          <div class="text-center p-3 bg-paper rounded-lg border border-mist">
            <div class="text-2xl font-bold text-cobalt">
              {((differingBitCount / 256) * 100).toFixed(1)}%
            </div>
            <div class="text-xs text-slate">Bits Changed</div>
          </div>
          <div class="text-center p-3 bg-paper rounded-lg border border-mist">
            <div class="text-2xl font-bold text-cobalt">
              {differences.filter(d => d).length}
            </div>
            <div class="text-xs text-slate">Hex Chars Changed</div>
          </div>
        </div>

        <!-- Binary View Toggle -->
        <div class="mt-4">
          <button
            class="btn-secondary text-sm"
            onclick={() => showBinary = !showBinary}
          >
            {showBinary ? 'Hide' : 'Show'} Binary Representation
          </button>
        </div>

        {#if showBinary}
          <div class="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <div class="text-xs font-medium text-slate mb-1">Binary of Hash 1</div>
              <div class="hash-output text-xs overflow-x-auto">
                {hexToBinary(hash1)}
              </div>
            </div>
            <div>
              <div class="text-xs font-medium text-slate mb-1">Binary of Hash 2 (differences in red)</div>
              <div class="hash-output text-xs overflow-x-auto">
                {#each hexToBinary(hash2).split('') as bit, i}
                  <span
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
    <div class="p-4 bg-cobalt/5 rounded-lg border border-cobalt/20">
      <h3 class="text-sm font-semibold text-cobalt mb-2">Try it yourself</h3>
      <ul class="text-sm text-slate space-y-1">
        <li>Change just one letter in Input 2. How many bits change?</li>
        <li>Make the inputs identical. What percentage of bits differ?</li>
        <li>Why does this property matter for security?</li>
      </ul>
    </div>

    <!-- Explanation -->
    <div class="mt-6 p-4 bg-emerald/5 rounded-lg border border-emerald/20">
      <h3 class="text-sm font-semibold text-emerald mb-2">Why this matters</h3>
      <p class="text-sm text-slate leading-relaxed">
        The avalanche effect is crucial for security. If similar inputs produced similar hashes,
        attackers could guess inputs by comparing outputs. With SHA-256, about 50% of bits
        change with any input modification, making such attacks impractical.
      </p>
    </div>
  {/if}
</div>
