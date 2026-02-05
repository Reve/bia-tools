<script>
  import { formatHashGroups } from '../lib/hash.js';

  let { hash = '', differences = null, label = 'Hash Output' } = $props();

  let hashGroups = $derived(formatHashGroups(hash, 8));
</script>

<div class="hash-display" role="region" aria-label={label}>
  <div class="text-sm font-medium text-slate mb-2">{label}</div>
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
      <span class="text-slate/50">Enter text above to see the hash</span>
    {/if}
  </div>
  {#if hash}
    <div class="mt-2 text-xs text-slate" aria-label="{hash.length} characters representing 256 bits">
      {hash.length} characters (256 bits)
    </div>
  {/if}
</div>
