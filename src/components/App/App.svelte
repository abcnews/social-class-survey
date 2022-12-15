<script lang="ts">
  import { createForm } from 'felte';
  import { QUESTIONS } from '../../constants';
  import type { Answers, Result } from '../../types';
  import { answersToQuery, fetchResult, getDataLookupURL } from '../../utils';
  import Select from '../Select/Select.svelte';

  let hasSubmitted = false;
  let result: Result | null = null;

  const { data, form, isValid, setFields } = createForm<Answers>({
    validate: values =>
      QUESTIONS.reduce((errors, { id }) => {
        const value = values[id];

        if (Array.isArray(value) ? value.length === 0 : value === undefined) {
          errors[id] = `Select ${Array.isArray(values) ? 'at least one' : 'an'} option.`;
        }

        return errors;
      }, {}),
    transform: values => {
      // Handle "None of these" options asynchronously
      QUESTIONS.forEach(({ id, isMultiple, noneIndex }) => {
        if (!isMultiple || typeof noneIndex !== 'number') {
          return;
        }

        const value = (values as Answers)[id] as string[];

        if (value.length > 1 && value.includes(String(noneIndex))) {
          requestAnimationFrame(() => {
            setFields(id, [String(noneIndex)]);
          });
        }
      });

      return values as Answers;
    },
    onSubmit: answers => {
      const query = answersToQuery(answers);

      fetchResult(query).then(_result => {
        result = _result;
      });

      hasSubmitted = true;
    }
  });
</script>

<form use:form>
  {#each QUESTIONS as { id, title, hint, options, isMultiple }}
    <div>
      <h3>{title}</h3>
      {#if hint}<p>{hint}</p>{/if}
      <Select name={id} {options} selected={$data[id] || []} isMultiple={!!isMultiple} disabled={hasSubmitted} />
    </div>
  {/each}
  {#if !hasSubmitted && $isValid}
    <div>
      <h3>Complete</h3>
      <p>Happy with all your answers? Submit the survey below.</p>
      <button type="submit">Submit</button>
    </div>
  {/if}
  {#if result}
    <div>
      <h3>Results</h3>
      {#if result.conclusion}
        <p>
          According to the ANU's analysis the class group you most closely match is: <strong
            >{result.conclusion.name}</strong
          >
        </p>
        <p>Estimate of population percentage: <strong>{result.conclusion.poppct}%</strong></p>
        <p>{result.conclusion.desc}</p>
      {:else}
        <p>
          You're a hard one to pin down - based on your answers the ANU model can't make a good prediction about which
          class you fit into.
        </p>
        <p>Read on below to find out more about each of the classes identified in the research.</p>
      {/if}
    </div>
  {/if}
</form>

<style>
  form {
    padding-inline: 1rem;
    margin-block-end: 2rem;
    font-family: ABCSerif, system-ui;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  div > * {
    margin-block: 0 1.5rem;
  }

  h3,
  p,
  button {
    margin-inline: auto;
    max-width: 620px;
  }

  h3 {
    margin-block-start: 1.5rem;
    font-size: 1.75rem;
    text-align: center;
  }

  p {
    line-height: 1.667;
    font-size: 1.125rem;
  }

  button {
    display: block;
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid #ccc;
    padding: 12px 24px;
    background-color: #fff;
    color: #000;
    font-size: 14px;
  }
</style>
