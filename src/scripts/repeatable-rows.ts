/**
 * DOM-as-source-of-truth helper for a repeatable row group (add/remove
 * rows cloned from a <template>, read the current rows straight back out
 * of the live DOM). No parallel in-memory array is kept — every
 * `readRows()` call walks the DOM fresh, so it can never drift out of
 * sync with what the user actually sees/typed.
 */

export interface RepeatableRows<T> {
  addRow(): void;
  readRows(): T[];
}

type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export function initRepeatableRows<T extends Record<keyof T & string, string>>(
  containerId: string,
  templateId: string,
  addButtonId: string,
  fieldNames: (keyof T & string)[],
  seedCount = 1,
): RepeatableRows<T> {
  const container = document.getElementById(containerId);
  const template = document.getElementById(templateId) as HTMLTemplateElement | null;
  const addButton = document.getElementById(addButtonId);

  /** Clones the template and appends it, without firing rows-changed. */
  function appendRow(): void {
    if (!container || !template) return;
    container.appendChild(template.content.cloneNode(true));
  }

  function addRow(): void {
    appendRow();
    container?.dispatchEvent(new CustomEvent('rows-changed'));
  }

  function readRows(): T[] {
    if (!container) return [];
    return Array.from(container.querySelectorAll<HTMLElement>('[data-row]')).map((rowEl) => {
      const row = {} as Record<string, string>;
      for (const name of fieldNames) {
        const field = rowEl.querySelector<FieldElement>(`[data-field="${name}"]`);
        row[name] = field?.value ?? '';
      }
      return row as T;
    });
  }

  addButton?.addEventListener('click', () => addRow());

  container?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const removeBtn = target.closest('[data-action="remove-row"]');
    if (!removeBtn) return;
    removeBtn.closest('[data-row]')?.remove();
    container.dispatchEvent(new CustomEvent('rows-changed'));
  });

  container?.addEventListener('input', () => {
    container.dispatchEvent(new CustomEvent('rows-changed'));
  });

  // Seed initial rows by cloning directly (bypassing addRow()) so
  // construction doesn't fire a redundant rows-changed event before the
  // caller has wired up its own listeners / run its first render().
  for (let i = 0; i < seedCount; i++) {
    appendRow();
  }

  return { addRow, readRows };
}
