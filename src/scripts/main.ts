/**
 * DOM wiring entry point for the claim-builder form. Loaded as a plain
 * module script by an Astro component; runs top-level on page load.
 *
 * Contract with the Astro markup (see project spec for the full list):
 *  - `[data-claim-form]` root, with `data-lang` = 'zh-TW' | 'en'.
 *  - Simple fields: `<input>`/`<textarea>` with `data-path="a.b.c"`
 *    matching a FormState dot-path. Checkboxes are `type="checkbox"`;
 *    everything else (text, radio) is read via `.value`.
 *  - Two repeatable-row groups (see repeatable-rows.ts contract):
 *      affected services   -> #affectedServiceRows / #affectedServiceRowTemplate / #addAffectedServiceRowBtn
 *      api key usage       -> #apiKeyUsageRows / #apiKeyUsageRowTemplate / #addApiKeyUsageRowBtn
 *  - Mode toggle buttons: any number of `[data-mode]` elements with
 *    data-mode = 'ticket' | 'email'; the active one gets `.active`.
 *  - Output: `#previewOutput` (readonly textarea), `#validationBanner`,
 *    `#copyBtn`, `#downloadBtn`.
 *
 * Everything is guarded behind `if (root)` so this module is inert (and
 * safe to load) when the markup isn't present, e.g. in isolated tests.
 */
import type { FormState, AffectedServiceRow, ApiKeyUsageRow } from './form-state';
import { createInitialState, setByPath } from './form-state';
import { renderOutput, countMissingRequired } from './renderer';
import { initRepeatableRows } from './repeatable-rows';
import { copyToClipboard, downloadTextFile } from './clipboard';
import type { Locale } from '../i18n/utils';
import { getTemplateDictionary, useTranslations } from '../i18n/utils';

const root = document.querySelector<HTMLElement>('[data-claim-form]');

if (root) {
  const lang: Locale = (root.dataset.lang as Locale | undefined) ?? 'zh-TW';
  const td = getTemplateDictionary(lang);
  const t = useTranslations(lang);
  const state: FormState = createInitialState();
  let mode: 'ticket' | 'email' = 'ticket';

  const preview = root.querySelector<HTMLTextAreaElement>('#previewOutput')!;
  const banner = root.querySelector<HTMLElement>('#validationBanner')!;
  const copyBtn = root.querySelector<HTMLButtonElement>('#copyBtn')!;
  const downloadBtn = root.querySelector<HTMLButtonElement>('#downloadBtn')!;

  const services = initRepeatableRows<AffectedServiceRow>(
    'affectedServiceRows',
    'affectedServiceRowTemplate',
    'addAffectedServiceRowBtn',
    ['serviceName', 'credentialName'],
    1,
  );
  const usage = initRepeatableRows<ApiKeyUsageRow>(
    'apiKeyUsageRows',
    'apiKeyUsageRowTemplate',
    'addApiKeyUsageRowBtn',
    ['keyLabel', 'amount', 'note'],
    1,
  );

  function render(): void {
    state.affectedServices = services.readRows();
    state.evidence.apiKeyUsage = usage.readRows();

    preview.value = renderOutput(state, td, mode);

    const missing = countMissingRequired(state);
    banner.textContent = missing > 0 ? t.output.validationBannerSome(missing) : t.output.validationBannerNone;
  }

  // Delegated input handler for every simple `data-path` field.
  root.addEventListener('input', (e) => {
    const target = e.target as HTMLElement;
    const el = target.closest<HTMLInputElement | HTMLTextAreaElement>('[data-path]');
    if (!el) return;
    const path = el.dataset.path;
    if (!path) return;

    const value = el instanceof HTMLInputElement && el.type === 'checkbox' ? el.checked : el.value;
    setByPath(state, path, value);
    render();
  });

  // Repeatable-row groups fire their own consolidated `rows-changed`
  // event for add/remove/edit; re-render on either.
  document.getElementById('affectedServiceRows')?.addEventListener('rows-changed', render);
  document.getElementById('apiKeyUsageRows')?.addEventListener('rows-changed', render);

  const modeButtons = root.querySelectorAll<HTMLButtonElement>('[data-mode]');
  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextMode = btn.dataset.mode;
      if (nextMode !== 'ticket' && nextMode !== 'email') return;
      mode = nextMode;
      modeButtons.forEach((b) => b.classList.toggle('active', b === btn));
      render();
    });
  });
  root.querySelector('[data-mode="ticket"]')?.classList.add('active');

  copyBtn.addEventListener('click', async () => {
    const ok = await copyToClipboard(preview.value);
    const original = copyBtn.textContent;
    if (ok) {
      copyBtn.textContent = t.output.copied;
      setTimeout(() => {
        copyBtn.textContent = original;
      }, 1500);
    }
  });

  downloadBtn.addEventListener('click', () => {
    downloadTextFile(`zeabur-claim-${mode}.txt`, preview.value);
  });

  render();
}
