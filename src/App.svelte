<script>
  import ShaExplorer from './modules/ShaExplorer.svelte';
  import BlockAnatomy from './modules/BlockAnatomy.svelte';
  import BlockchainIntegrity from './modules/BlockchainIntegrity.svelte';
  import ProofOfWork from './modules/ProofOfWork.svelte';
  import { language, languageOptions, translate } from './lib/i18n.js';

  let currentModule = $state(1);
  const totalModules = 4;

  const t = (key, vars) => translate($language, key, vars);

  // Module data for the progress indicator
  let modules = $derived([
    { id: 1, title: t('app.moduleTitles.shaBasics'), available: true },
    { id: 2, title: t('app.moduleTitles.blockAnatomy'), available: true },
    { id: 3, title: t('app.moduleTitles.blockchainIntegrity'), available: true },
    { id: 4, title: t('app.moduleTitles.proofOfWork'), available: true }
  ]);

  function handleProgressKeydown(event, module) {
    if (!module.available) return;
    let targetId = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      const next = modules.find(m => m.id > module.id && m.available);
      if (next) targetId = next.id;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      const prev = [...modules].reverse().find(m => m.id < module.id && m.available);
      if (prev) targetId = prev.id;
    } else if (event.key === 'Home') {
      event.preventDefault();
      targetId = 1;
    } else if (event.key === 'End') {
      event.preventDefault();
      const last = [...modules].reverse().find(m => m.available);
      if (last) targetId = last.id;
    }
    if (targetId !== null) {
      currentModule = targetId;
      // Move focus to the newly active tab
      const el = document.getElementById(`module-tab-${targetId}`);
      if (el) el.focus();
    }
  }
</script>

<div class="min-h-screen bg-paper">
  <!-- Skip to main content link -->
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2
           focus:bg-cobalt focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
  >
    {t('common.skipToContent')}
  </a>

  <!-- Header -->
  <header class="border-b border-mist bg-white">
    <div class="max-w-content mx-auto px-4 sm:px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-lg sm:text-xl font-semibold text-ink">
            {t('app.title')}
          </h1>
          <p class="text-xs sm:text-sm text-slate">{t('app.subtitle')}</p>
        </div>
        <div class="text-xs sm:text-sm text-slate" aria-live="polite">
          {t('common.moduleStatus', { current: currentModule, total: totalModules })}
        </div>
        <div class="flex items-center gap-2 text-xs sm:text-sm text-slate">
          <label for="language-select" class="font-medium text-ink">
            {t('languageLabel')}
          </label>
          <select
            id="language-select"
            class="border border-mist rounded-md px-2 py-1 bg-white text-ink text-xs sm:text-sm"
            bind:value={$language}
          >
            {#each languageOptions as option}
              <option value={option.value}>
                {t(`languages.${option.value}`)}
              </option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </header>

  <!-- Progress Bar / Tab Navigation -->
  <nav class="border-b border-mist bg-white" aria-label={t('app.moduleNavLabel')}>
    <div class="max-w-content mx-auto px-4 sm:px-6">
      <div class="flex gap-1 py-3" role="tablist" aria-label={t('app.moduleTablistLabel')}>
        {#each modules as module}
          <button
            id="module-tab-{module.id}"
            class="flex-1 relative group"
            onclick={() => module.available && (currentModule = module.id)}
            onkeydown={(e) => handleProgressKeydown(e, module)}
            disabled={!module.available}
            role="tab"
            aria-selected={currentModule === module.id}
            aria-controls="module-panel-{module.id}"
            tabindex={currentModule === module.id ? 0 : -1}
            aria-label={`${module.title}${!module.available ? ` (${t('common.comingSoon')})` : ''}`}
          >
            <div
              class="h-2 rounded-full transition-all duration-200"
              class:bg-cobalt={module.id === currentModule && module.available}
              class:bg-emerald={module.id < currentModule && module.available}
              class:bg-mist={module.id > currentModule || !module.available}
              class:scale-y-125={module.id === currentModule}
            ></div>
            <div
              class="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1
                     text-xs bg-ink text-white rounded opacity-0 group-hover:opacity-100
                     group-focus-visible:opacity-100
                     transition-opacity duration-150 whitespace-nowrap pointer-events-none"
              role="tooltip"
            >
              {module.title}
              {#if !module.available}
                <span class="text-white/60">({t('common.comingSoon')})</span>
              {/if}
            </div>
          </button>
        {/each}
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <main id="main-content" class="max-w-content mx-auto px-4 sm:px-6 py-6 sm:py-8">
    <!-- Module 1: SHA Basics -->
    {#if currentModule === 1}
      <div
        id="module-panel-1"
        role="tabpanel"
        aria-labelledby="module-tab-1"
        class="animate-fade-in"
      >
        <div class="mb-8">
          <!-- Learning Objectives -->
          <section class="card mb-8" aria-label={t('app.moduleObjectives.shaBasics.label')}>
            <h3 class="text-lg font-semibold text-ink mb-3">{t('common.learningObjectives')}</h3>
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">1</span>
                <span class="text-slate">{t('app.moduleObjectives.shaBasics.items')[0]}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">2</span>
                <span class="text-slate">{t('app.moduleObjectives.shaBasics.items')[1]}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">3</span>
                <span class="text-slate">{t('app.moduleObjectives.shaBasics.items')[2]}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">4</span>
                <span class="text-slate">{t('app.moduleObjectives.shaBasics.items')[3]}</span>
              </li>
            </ul>
          </section>

          <!-- SHA Explorer -->
          <ShaExplorer />
        </div>

        <!-- Key Concepts Summary -->
        <section class="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4" aria-label={t('common.keyConcepts')}>
          <div class="card text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
              <svg class="w-6 h-6 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="font-semibold text-ink mb-1">{t('app.moduleKeyConcepts.shaBasics.items')[0].title}</h3>
            <p class="text-sm text-slate">{t('app.moduleKeyConcepts.shaBasics.items')[0].description}</p>
          </div>

          <div class="card text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
              <svg class="w-6 h-6 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
            <h3 class="font-semibold text-ink mb-1">{t('app.moduleKeyConcepts.shaBasics.items')[1].title}</h3>
            <p class="text-sm text-slate">{t('app.moduleKeyConcepts.shaBasics.items')[1].description}</p>
          </div>

          <div class="card text-center sm:col-span-2 md:col-span-1">
            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
              <svg class="w-6 h-6 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="font-semibold text-ink mb-1">{t('app.moduleKeyConcepts.shaBasics.items')[2].title}</h3>
            <p class="text-sm text-slate">{t('app.moduleKeyConcepts.shaBasics.items')[2].description}</p>
          </div>
        </section>
      </div>
    {:else if currentModule === 2}
      <!-- Module 2: Block Anatomy -->
      <div
        id="module-panel-2"
        role="tabpanel"
        aria-labelledby="module-tab-2"
        class="animate-fade-in"
      >
        <div class="mb-8">
          <!-- Learning Objectives -->
          <section class="card mb-8" aria-label={t('app.moduleObjectives.blockAnatomy.label')}>
            <h3 class="text-lg font-semibold text-ink mb-3">{t('common.learningObjectives')}</h3>
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">1</span>
                <span class="text-slate">{t('app.moduleObjectives.blockAnatomy.items')[0]}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">2</span>
                <span class="text-slate">{t('app.moduleObjectives.blockAnatomy.items')[1]}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">3</span>
                <span class="text-slate">{t('app.moduleObjectives.blockAnatomy.items')[2]}</span>
              </li>
            </ul>
          </section>

          <!-- Block Anatomy Module -->
          <BlockAnatomy />
        </div>

        <!-- Key Concepts Summary -->
        <section class="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4" aria-label={t('common.keyConcepts')}>
          <div class="card text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
              <svg class="w-6 h-6 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 class="font-semibold text-ink mb-1">{t('app.moduleKeyConcepts.blockAnatomy.items')[0].title}</h3>
            <p class="text-sm text-slate">{t('app.moduleKeyConcepts.blockAnatomy.items')[0].description}</p>
          </div>

          <div class="card text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
              <svg class="w-6 h-6 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 class="font-semibold text-ink mb-1">{t('app.moduleKeyConcepts.blockAnatomy.items')[1].title}</h3>
            <p class="text-sm text-slate">{t('app.moduleKeyConcepts.blockAnatomy.items')[1].description}</p>
          </div>

          <div class="card text-center sm:col-span-2 md:col-span-1">
            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
              <svg class="w-6 h-6 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 class="font-semibold text-ink mb-1">{t('app.moduleKeyConcepts.blockAnatomy.items')[2].title}</h3>
            <p class="text-sm text-slate">{t('app.moduleKeyConcepts.blockAnatomy.items')[2].description}</p>
          </div>
        </section>
      </div>

    {:else if currentModule === 3}
      <!-- Module 3: Blockchain Integrity -->
      <div
        id="module-panel-3"
        role="tabpanel"
        aria-labelledby="module-tab-3"
        class="animate-fade-in"
      >
        <div class="mb-8">
          <!-- Learning Objectives -->
          <section class="card mb-8" aria-label={t('app.moduleObjectives.blockchainIntegrity.label')}>
            <h3 class="text-lg font-semibold text-ink mb-3">{t('common.learningObjectives')}</h3>
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">1</span>
                <span class="text-slate">{t('app.moduleObjectives.blockchainIntegrity.items')[0]}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">2</span>
                <span class="text-slate">{t('app.moduleObjectives.blockchainIntegrity.items')[1]}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">3</span>
                <span class="text-slate">{t('app.moduleObjectives.blockchainIntegrity.items')[2]}</span>
              </li>
            </ul>
          </section>

          <!-- Blockchain Integrity Module -->
          <BlockchainIntegrity />
        </div>

        <!-- Key Concepts Summary -->
        <section class="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4" aria-label={t('common.keyConcepts')}>
          <div class="card text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald/10 flex items-center justify-center" aria-hidden="true">
              <svg class="w-6 h-6 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 class="font-semibold text-ink mb-1">{t('app.moduleKeyConcepts.blockchainIntegrity.items')[0].title}</h3>
            <p class="text-sm text-slate">{t('app.moduleKeyConcepts.blockchainIntegrity.items')[0].description}</p>
          </div>

          <div class="card text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-rose/10 flex items-center justify-center" aria-hidden="true">
              <svg class="w-6 h-6 text-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h3 class="font-semibold text-ink mb-1">{t('app.moduleKeyConcepts.blockchainIntegrity.items')[1].title}</h3>
            <p class="text-sm text-slate">{t('app.moduleKeyConcepts.blockchainIntegrity.items')[1].description}</p>
          </div>

          <div class="card text-center sm:col-span-2 md:col-span-1">
            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-amber/10 flex items-center justify-center" aria-hidden="true">
              <svg class="w-6 h-6 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <h3 class="font-semibold text-ink mb-1">{t('app.moduleKeyConcepts.blockchainIntegrity.items')[2].title}</h3>
            <p class="text-sm text-slate">{t('app.moduleKeyConcepts.blockchainIntegrity.items')[2].description}</p>
          </div>
        </section>
      </div>

    {:else if currentModule === 4}
      <!-- Module 4: Proof of Work -->
      <div
        id="module-panel-4"
        role="tabpanel"
        aria-labelledby="module-tab-4"
        class="animate-fade-in"
      >
        <div class="mb-8">
          <!-- Learning Objectives -->
          <section class="card mb-8" aria-label={t('app.moduleObjectives.proofOfWork.label')}>
            <h3 class="text-lg font-semibold text-ink mb-3">{t('common.learningObjectives')}</h3>
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">1</span>
                <span class="text-slate">{t('app.moduleObjectives.proofOfWork.items')[0]}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">2</span>
                <span class="text-slate">{t('app.moduleObjectives.proofOfWork.items')[1]}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-cobalt/10 text-cobalt flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">3</span>
                <span class="text-slate">{t('app.moduleObjectives.proofOfWork.items')[2]}</span>
              </li>
            </ul>
          </section>

          <!-- Proof of Work Module -->
          <ProofOfWork />
        </div>

        <!-- Key Concepts Summary -->
        <section class="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4" aria-label={t('common.keyConcepts')}>
          <div class="card text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
              <svg class="w-6 h-6 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 class="font-semibold text-ink mb-1">{t('app.moduleKeyConcepts.proofOfWork.items')[0].title}</h3>
            <p class="text-sm text-slate">{t('app.moduleKeyConcepts.proofOfWork.items')[0].description}</p>
          </div>

          <div class="card text-center">
            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
              <svg class="w-6 h-6 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 class="font-semibold text-ink mb-1">{t('app.moduleKeyConcepts.proofOfWork.items')[1].title}</h3>
            <p class="text-sm text-slate">{t('app.moduleKeyConcepts.proofOfWork.items')[1].description}</p>
          </div>

          <div class="card text-center sm:col-span-2 md:col-span-1">
            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-cobalt/10 flex items-center justify-center" aria-hidden="true">
              <svg class="w-6 h-6 text-cobalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="font-semibold text-ink mb-1">{t('app.moduleKeyConcepts.proofOfWork.items')[2].title}</h3>
            <p class="text-sm text-slate">{t('app.moduleKeyConcepts.proofOfWork.items')[2].description}</p>
          </div>
        </section>
      </div>
    {/if}
  </main>

  <!-- Footer -->
  <footer class="border-t border-mist bg-white mt-8">
    <div class="max-w-content mx-auto px-4 sm:px-6 py-4">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate">
        <div>{t('app.title')}</div>
        <div>{t('app.footerOffline')}</div>
      </div>
    </div>
  </footer>
</div>
