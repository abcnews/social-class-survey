<script lang="ts">
  import Worm from '../Worm/Worm.svelte';

  export let x: number;
  export let y: string;
  export let z: boolean;
</script>

<div>
  <Worm />
  <pre>{JSON.stringify({ x, y, z })}</pre>
  <h1>Social Class Survey</h1>
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 320px;
    background-color: #3178c7;
    color: #fff;
    text-align: center;
  }

  h1 {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
    font-size: 24px !important;
    font-weight: normal !important;
    line-height: normal !important;
    letter-spacing: normal !important;
  }
</style>