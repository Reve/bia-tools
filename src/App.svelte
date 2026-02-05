<script>
  import ShaExplorer from './modules/ShaExplorer.svelte';
  import GlossaryTooltip from './components/GlossaryTooltip.svelte';

  let currentModule = $state(1);
  const totalModules = 4;

  // Module data for the progress indicator
  const modules = [
    { id: 1, title: 'SHA Basics', available: true },
    { id: 2, title: 'Block Anatomy', available: false },
    { id: 3, title: 'Blockchain Integrity', available: false },
    { id: 4, title: 'Proof of Work', available: false }
  ];
</script>

<div class="min-h-screen bg-paper">
  <!-- Header -->
  <header class="border-b border-mist bg-white">
    <div class="max-w-content mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold text-ink">
            Blockchain & SHA Learning Tools
          </h1>
          <p class="text-sm text-slate">Interactive cryptography fundamentals</p>
        </div>
        <div class="text-sm text-slate">
          Module {currentModule} of {totalModules}
        </div>
      </div>
    </div>
  </header>

  <!-- Progress Bar -->
  <div class="border-b border-mist bg-white">
    <div class="max-w-content mx-auto px-6">
      <div class="flex gap-1 py-3">
        {#each modules as module}
          <button
            class="flex-1 relative group"
            onclick={() => module.available && (currentModule = module.id)}
            disabled={!module.available}
          >
            <div
              class="h-2 rounded-full transition-colors duration-200"
              class:bg-cobalt={module.id <= currentModule && module.available}
              class:bg-emerald={module.id < currentModule}
              class:bg-mist={module.id > currentModule || !module.available}
            ></div>
            <div
              class="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1
                     text-xs bg-ink text-white rounded opacity-0 group-hover:opacity-100
                     transition-opacity duration-150 whitespace-nowrap pointer-events-none"
            >
              {module.title}
              {#if !module.available}
                <span class="text-white/60">(Coming soon)</span>
              {/if}
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <main class="max-w-content mx-auto px-6 py-8">
    <!-- Module 1: SHA Basics -->
    {#if currentModule === 1}
      <div class="mb-8">
        <!-- Learning Objectives -->
        <div class="card mb-8">
          <h3 class="text-lg font-semibold text-ink mb-3">Learning Objectives</h3>
          <ul class="space-y-2">
            <li class="flex items-start gap-2">
              <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
              <span class="text-slate">Define a <GlossaryTooltip term="cryptographic hash">cryptographic hash</GlossaryTooltip> in plain language.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
              <span class="text-slate">Describe <GlossaryTooltip term="sha-256">SHA-256</GlossaryTooltip> outputs as <GlossaryTooltip term="fixed length">fixed-length</GlossaryTooltip> and <GlossaryTooltip term="deterministic">deterministic</GlossaryTooltip>.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
              <span class="text-slate">Explain the <GlossaryTooltip term="avalanche effect">avalanche effect</GlossaryTooltip> with a simple example.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
              <span class="text-slate">Demonstrate how small input changes produce large output changes.</span>
            </li>
          </ul>
        </div>

        <!-- SHA Explorer -->
        <ShaExplorer />
      </div>

      <!-- Key Concepts Summary -->
      <div class="mt-8 grid md:grid-cols-3 gap-4">
        <div class="card text-center">
          <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-cobalt/10 flex items-center justify-center">
            <svg class="w-6 h-6 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="font-semibold text-ink mb-1">Deterministic</h3>
          <p class="text-sm text-slate">Same input always produces the same hash output.</p>
        </div>

        <div class="card text-center">
          <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-cobalt/10 flex items-center justify-center">
            <svg class="w-6 h-6 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
          <h3 class="font-semibold text-ink mb-1">Fixed Length</h3>
          <p class="text-sm text-slate">Output is always 64 hex characters, regardless of input size.</p>
        </div>

        <div class="card text-center">
          <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-cobalt/10 flex items-center justify-center">
            <svg class="w-6 h-6 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="font-semibold text-ink mb-1">Avalanche Effect</h3>
          <p class="text-sm text-slate">Tiny input changes cause massive hash differences.</p>
        </div>
      </div>
    {:else}
      <!-- Placeholder for other modules -->
      <div class="card text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-mist flex items-center justify-center">
          <svg class="w-8 h-8 text-slate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-ink mb-2">
          {modules[currentModule - 1]?.title || 'Module'} Coming Soon
        </h2>
        <p class="text-slate max-w-md mx-auto">
          This module is under development. Check back soon for more interactive learning content.
        </p>
        <button
          class="btn-primary mt-4"
          onclick={() => currentModule = 1}
        >
          Return to SHA Basics
        </button>
      </div>
    {/if}
  </main>

  <!-- Footer -->
  <footer class="border-t border-mist bg-white mt-8">
    <div class="max-w-content mx-auto px-6 py-4">
      <div class="flex items-center justify-between text-sm text-slate">
        <div>Blockchain & SHA Learning Tools</div>
        <div>Runs entirely offline in your browser</div>
      </div>
    </div>
  </footer>
</div>
