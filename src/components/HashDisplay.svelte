<script>
  import { formatHashGroups } from '../lib/hash.js';
  import { language, translate } from '../lib/i18n.js';

  let { hash = '', differences = null, label = null } = $props();

  let hashGroups = $derived(formatHashGroups(hash, 8));

  const t = (key, vars) => translate($language, key, vars);

  let resolvedLabel = $derived(label || t('hashDisplay.defaultLabel'));
</script>

<div class="hash-display" role="region" aria-label={resolvedLabel}>
  <div class="text-sm font-medium text-slate mb-2">{resolvedLabel}</div>
  <div class="hash-output font-mono text-sm leading-relaxed" aria-live="polite">
    {#if hash}
      {#each hash.split('') as char, i}
        <span
          class="inline-block transition-colors duration-150"
          class:text-rose={differences && differences[i]}
          class:font-bold={differences && differences[i]}
          class:text-ink={!differences || !differences[i]}
          aria-hidden={differences && differences[i] ? undefined : 'true'}
        >{char}</span>
      {/each}
      <span class="sr-only">{hash}</span>
    {:else}
      <span class="text-slate/50">{t('hashDisplay.emptyMessage')}</span>
    {/if}
  </div>
  {#if hash}
    <div
      class="mt-2 text-xs text-slate"
      aria-label={t('hashDisplay.lengthAria', { count: hash.length })}
    >
      {t('hashDisplay.lengthLabel', { count: hash.length })}
    </div>
  {/if}
</div>
