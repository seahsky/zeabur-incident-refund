/**
 * Pure rendering logic that turns a FormState + locale TemplateDictionary
 * into the final copy-pasteable "support ticket" / "email" text.
 *
 * No DOM or browser globals here on purpose: this module must stay
 * trivially unit-testable and reusable outside a browser context.
 */
import type { FormState } from './form-state';
import { REQUIRED_FIELD_PATHS, isFieldMissing } from './form-state';
import type { TemplateDictionary } from '../i18n/dictionary';

type PlaceholderKey = keyof TemplateDictionary['placeholders'];
type OtherPointKey = keyof FormState['evidence']['other'];

/** Wraps a string in the locale's bracket convention, e.g. 【...】 / [...]. */
function bracket(td: TemplateDictionary, s: string): string {
  return `${td.bracketOpen}${s}${td.bracketClose}`;
}

/**
 * Required-field accessor: falls back to a bracketed instructional
 * placeholder when the value is blank, so a forgotten field is still
 * visibly a forgotten field after copy-paste.
 */
function req(td: TemplateDictionary, value: string, placeholderKey: PlaceholderKey): string {
  return value.trim() || bracket(td, td.placeholders[placeholderKey]);
}

/**
 * The colon between a structural "label: value" pair is not translated
 * copy, just a locale-appropriate separator convention (full-width for
 * zh-TW, ASCII + space for en) — inferred from the bracket style already
 * carried by the template dictionary rather than adding a new field.
 */
function colonFor(td: TemplateDictionary): string {
  return td.bracketOpen === '【' ? '：' : ': ';
}

function renderAccountSection(state: FormState, td: TemplateDictionary): string {
  const colon = colonFor(td);
  const s = td.sections.account;
  const lines: string[] = [
    s.title,
    `${s.accountLabel}${colon}${req(td, state.accountName, 'accountName')}`,
  ];

  const rows = state.affectedServices.filter(
    (row) => row.serviceName.trim() !== '' || row.credentialName.trim() !== '',
  );
  if (rows.length === 0) {
    lines.push(bracket(td, td.placeholders.noRows));
  } else {
    for (const row of rows) {
      lines.push(
        `- ${req(td, row.serviceName, 'serviceName')}${colon}${req(td, row.credentialName, 'credentialName')}`,
      );
    }
  }

  return lines.join('\n');
}

function renderLossSummarySection(state: FormState, td: TemplateDictionary): string {
  const s = state.lossSummary;
  const lines = [
    td.sections.lossSummary.title,
    td.sections.lossSummary.narrativeLine(
      req(td, s.provider, 'provider'),
      req(td, s.abusedDate, 'abusedDate'),
      req(td, s.normalCost, 'normalCost'),
      req(td, s.abnormalCost, 'abnormalCost'),
      req(td, s.rechargeCount, 'rechargeCount'),
    ),
  ];
  return lines.join('\n');
}

function renderEvidenceSection(state: FormState, td: TemplateDictionary): string {
  const colon = colonFor(td);
  const e = state.evidence;
  const es = td.sections.evidence;
  const lines: string[] = [];

  lines.push(es.title);

  lines.push(es.timeRangeLine(req(td, e.timeRangeUtc, 'timeUtc'), req(td, e.timeRangeTaipei, 'timeTaipei')));

  lines.push(
    es.amountLine(
      req(td, e.totalAmount, 'totalAmount'),
      req(td, e.normalBaseline, 'normalBaseline'),
      req(td, e.multiplier, 'multiplier'),
      req(td, e.affectedKeyCount, 'affectedKeyCount'),
      req(td, e.perKeyRange, 'perKeyRange'),
    ),
  );

  for (const row of e.apiKeyUsage) {
    if (row.keyLabel.trim() !== '' || row.amount.trim() !== '' || row.note.trim() !== '') {
      lines.push(es.usageRowLine(row.keyLabel, row.amount, row.note));
    }
  }

  if (e.sourceIpMode === 'known') {
    lines.push(es.sourceIpKnownLine(e.sourceIpList.trim() || bracket(td, td.placeholders.ipList)));
  } else {
    lines.push(es.sourceIpUnknownFallback);
  }

  const otherPointKeys: OtherPointKey[] = [
    'disabledProjectNotRunning',
    'uniformCostPattern',
    'localOnlyIsolation',
    'ruledOutLocalCompromise',
  ];
  for (const key of otherPointKeys) {
    const point = e.other[key];
    if (point.checked) {
      lines.push(`- ${es.otherPoints[key]}${colon}${point.detail.trim() || bracket(td, td.placeholders.detail)}`);
    }
  }

  return lines.filter((line) => line !== '').join('\n');
}

function renderOtherServicesSection(state: FormState, td: TemplateDictionary): string {
  const c = state.otherServicesConfirmation;
  const s = td.sections.otherServices;
  const lines = [
    s.title,
    c.checkedAllProviders ? s.checkedLine : s.uncheckedLine,
    s.anomaliesLine(req(td, c.anomaliesFound, 'anomaliesFound')),
    s.netLossLine(req(td, c.netLossScope, 'netLossScope')),
    c.allRotatedConfirmed ? s.rotatedLine : s.notRotatedLine,
  ];
  return lines.join('\n');
}

function renderRemediationSection(state: FormState, td: TemplateDictionary): string {
  const r = state.remediation;
  const s = td.sections.remediation;
  const lines: string[] = [s.title];

  if (r.credentialsRevoked) lines.push(`- ${s.credentialsRevokedLine}`);
  if (r.zeaburTokensRevoked) lines.push(`- ${s.zeaburTokensRevokedLine}`);
  if (r.autoRechargeBlocked) {
    lines.push(`- ${s.autoRechargeBlockedLine}`);
  } else if (r.autoRechargeNotApplicable) {
    lines.push(`- ${s.autoRechargeNotApplicableLine}`);
  }

  lines.push(s.rotationInProgressLine(req(td, r.rotationInProgress, 'rotationInProgress')));

  return lines.join('\n');
}

function renderRequestsSection(_state: FormState, td: TemplateDictionary): string {
  const s = td.sections.requests;
  return [s.title, s.compensationLine, s.provideEvidenceLine, s.willSupplementIpLine].join('\n');
}

export function renderOutput(state: FormState, td: TemplateDictionary, mode: 'ticket' | 'email'): string {
  const sections = [
    renderAccountSection(state, td),
    renderLossSummarySection(state, td),
    renderEvidenceSection(state, td),
    renderOtherServicesSection(state, td),
    renderRemediationSection(state, td),
    renderRequestsSection(state, td),
  ];
  const body = sections.filter(Boolean).join('\n\n');

  if (mode === 'ticket') {
    return [td.ticket.suggestedSubject, td.ticket.suggestedCategory, '', body].join('\n');
  }

  const accountName = state.accountName || bracket(td, td.placeholders.accountName);
  return [
    td.email.subjectLine(accountName),
    '',
    td.email.salutation,
    '',
    body,
    '',
    td.email.signoff(accountName),
  ].join('\n');
}

/**
 * Number of "required" gaps still outstanding: every REQUIRED_FIELD_PATHS
 * entry that is still blank, plus one extra if the claimant hasn't
 * identified at least one fully-filled-in affected service row (a claim
 * needs at least one concrete service/credential pair to investigate).
 */
export function countMissingRequired(state: FormState): number {
  let missing = REQUIRED_FIELD_PATHS.filter((path) => isFieldMissing(state, path)).length;

  const hasCompleteRow = state.affectedServices.some(
    (row) => row.serviceName.trim() !== '' && row.credentialName.trim() !== '',
  );
  if (!hasCompleteRow) missing += 1;

  return missing;
}
