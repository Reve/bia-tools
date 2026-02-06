<script>
  import { getGlossaryTerm } from '../lib/glossary.js';
  import { language, translate } from '../lib/i18n.js';

  let { term, children } = $props();

  let showTooltip = $state(false);
  let glossaryEntry = $derived(getGlossaryTerm(term, $language));

  const t = (key, vars) => translate($language, key, vars);

  function handleKeydown(event) {
    if (event.key === 'Escape' && showTooltip) {
      showTooltip = false;
      event.stopPropagation();
    }
  }
</script>

<span
  class="glossary-term relative inline-block"
  onmouseenter={() => showTooltip = true}
  onmouseleave={() => showTooltip = false}
  onfocus={() => showTooltip = true}
  onblur={() => showTooltip = false}
  onkeydown={handleKeydown}
  tabindex="0"
  role="button"
  aria-describedby={showTooltip && glossaryEntry ? `tooltip-${term.replace(/\s+/g, '-')}` : undefined}
  aria-label={t('glossary.termLabel', { term: glossaryEntry?.term ?? term })}
>
  <span class="border-b border-dashed border-cobalt text-cobalt cursor-help
               hover:border-cobalt/70 focus:border-cobalt/70 transition-colors duration-150">
    {#if children}
      {@render children()}
    {:else if glossaryEntry}
      {glossaryEntry.term}
    {/if}
  </span>

  {#if showTooltip && glossaryEntry}
    <div
      id={`tooltip-${term.replace(/\s+/g, '-')}`}
      role="tooltip"
      class="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3
             bg-ink text-white text-sm rounded-lg shadow-lg
             animate-tooltip-in"
    >
      <div class="font-semibold mb-1">{glossaryEntry.term}</div>
      <div class="text-white/90 leading-snug">{glossaryEntry.definition}</div>
      <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-px
                  border-8 border-transparent border-t-ink"></div>
    </div>
  {/if}
</span>
