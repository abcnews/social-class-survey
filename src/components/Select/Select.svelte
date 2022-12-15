<script lang="ts">
  import { createField } from 'felte';

  export let name: string;
  export let options: string[];
  export let isMultiple: boolean;
  export let disabled: boolean;

  export let selected: string | string[] = [];

  const { field, onInput } = createField(name);

  $: onInput(selected);
</script>

<div data-is-disabled={disabled ? '' : undefined}>
  {#each options as label, index}
    {@const value = String(index)}
    {@const isSelected = Array.isArray(selected) ? selected.includes(value) : selected === value}
    <label data-is-selected={isSelected ? '' : undefined}>
      {#if isMultiple}
        <input use:field type="checkbox" bind:group={selected} {value} {disabled} />
      {:else}
        <input use:field type="radio" bind:group={selected} {value} {disabled} />
      {/if}
      <span>{label}</span>
    </label>
  {/each}
</div>

<style>
  div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 6px 12px;
    font-family: ABCSans, system-ui;
  }

  label {
    border-radius: 8px;
    background-color: #19568c;
    cursor: pointer;
    display: flex;
    gap: 0.5rem;
  }

  div[data-is-disabled] label {
    cursor: not-allowed;
  }

  input {
    visibility: hidden;
    width: 24px;
  }

  span {
    position: relative;
    border-radius: 0 8px 8px 0;
    border: 1px solid #ccc;
    border-left: none;
    padding: 10px;
    background-color: #fff;
    white-space: nowrap;
    flex-grow: 1;
    font-size: 14px;
    user-select: none;
  }

  label[data-is-selected] span::before {
    content: '✔';
    transform: translate(-36px, -2px);
    position: absolute;
    color: #fff;
    font-size: 18px;
  }
</style>
