export interface AffectedServiceRow {
  serviceName: string;
  credentialName: string;
}

export interface ApiKeyUsageRow {
  keyLabel: string;
  amount: string;
  note: string;
}

export interface EvidenceOtherPoint {
  checked: boolean;
  detail: string;
}

export interface FormState {
  accountName: string;
  affectedServices: AffectedServiceRow[];
  lossSummary: {
    provider: string;
    abusedDate: string;
    normalCost: string;
    abnormalCost: string;
    rechargeCount: string;
  };
  evidence: {
    timeRangeUtc: string;
    timeRangeTaipei: string;
    totalAmount: string;
    normalBaseline: string;
    multiplier: string;
    affectedKeyCount: string;
    perKeyRange: string;
    apiKeyUsage: ApiKeyUsageRow[];
    sourceIpMode: 'known' | 'unknown';
    sourceIpList: string;
    other: {
      disabledProjectNotRunning: EvidenceOtherPoint;
      uniformCostPattern: EvidenceOtherPoint;
      localOnlyIsolation: EvidenceOtherPoint;
      ruledOutLocalCompromise: EvidenceOtherPoint;
    };
  };
  otherServicesConfirmation: {
    checkedAllProviders: boolean;
    anomaliesFound: string;
    netLossScope: string;
    allRotatedConfirmed: boolean;
  };
  remediation: {
    credentialsRevoked: boolean;
    zeaburTokensRevoked: boolean;
    autoRechargeBlocked: boolean;
    autoRechargeNotApplicable: boolean;
    rotationInProgress: string;
  };
  requests: {
    wantsCompensation: boolean;
    willingToProvideEvidence: boolean;
    willSupplementIp: boolean;
  };
}

export function createInitialState(): FormState {
  return {
    accountName: '',
    affectedServices: [],
    lossSummary: {
      provider: '',
      abusedDate: '',
      normalCost: '',
      abnormalCost: '',
      rechargeCount: '',
    },
    evidence: {
      timeRangeUtc: '',
      timeRangeTaipei: '',
      totalAmount: '',
      normalBaseline: '',
      multiplier: '',
      affectedKeyCount: '',
      perKeyRange: '',
      apiKeyUsage: [],
      sourceIpMode: 'unknown',
      sourceIpList: '',
      other: {
        disabledProjectNotRunning: { checked: false, detail: '' },
        uniformCostPattern: { checked: false, detail: '' },
        localOnlyIsolation: { checked: false, detail: '' },
        ruledOutLocalCompromise: { checked: false, detail: '' },
      },
    },
    otherServicesConfirmation: {
      checkedAllProviders: false,
      anomaliesFound: '',
      netLossScope: '',
      allRotatedConfirmed: false,
    },
    remediation: {
      credentialsRevoked: false,
      zeaburTokensRevoked: false,
      autoRechargeBlocked: false,
      autoRechargeNotApplicable: false,
      rotationInProgress: '',
    },
    requests: {
      wantsCompensation: true,
      willingToProvideEvidence: true,
      willSupplementIp: true,
    },
  };
}

/**
 * Dot-notation path setter used by the delegated `data-path` input handler
 * in main.ts. Paths never target the repeatable-row arrays (those are
 * re-read wholesale from the DOM on every change instead).
 */
export function setByPath(obj: unknown, path: string, value: unknown): void {
  const keys = path.split('.');
  let cur = obj as Record<string, unknown>;
  for (let i = 0; i < keys.length - 1; i++) {
    cur = cur[keys[i]] as Record<string, unknown>;
  }
  cur[keys[keys.length - 1]] = value;
}

/**
 * Field paths that must be non-empty for the output to be considered
 * complete. Kept as a flat list (rather than walking FormState) so the
 * validation banner and the renderer's per-field `req()` fallback logic
 * stay obviously in sync with each other.
 */
export const REQUIRED_FIELD_PATHS: string[] = [
  'accountName',
  'lossSummary.provider',
  'lossSummary.abusedDate',
  'lossSummary.normalCost',
  'lossSummary.abnormalCost',
  'evidence.timeRangeUtc',
  'evidence.timeRangeTaipei',
  'evidence.totalAmount',
  'evidence.normalBaseline',
  'evidence.affectedKeyCount',
];

function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((cur, key) => {
    if (cur && typeof cur === 'object') {
      return (cur as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function isFieldMissing(state: FormState, path: string): boolean {
  const value = getByPath(state, path);
  return typeof value !== 'string' || value.trim() === '';
}
