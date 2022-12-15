import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { selectMounts } from '@abcnews/mount-utils';
import App from './components/App/App.svelte';

whenOdysseyLoaded.then(() => {
  const [mountEl] = selectMounts('survey');

  if (mountEl) {
    mountEl.classList.add('u-pull');
    new App({
      target: mountEl,
      props: {}
    });
  }
});

if (process.env.NODE_ENV === 'development') {
  console.debug(`[Social Class Survey] public path: ${__webpack_public_path__}`);
}
