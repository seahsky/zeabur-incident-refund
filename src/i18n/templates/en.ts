import type { TemplateDictionary } from '../dictionary';

export default {
  bracketOpen: '[',
  bracketClose: ']',
  placeholders: {
    accountName: 'account name',
    serviceName: 'project / service name (production)',
    credentialName: 'variable name, e.g. ANTHROPIC_API_KEY',
    noRows: 'no affected services entered yet',
    provider: 'provider name, e.g. Anthropic',
    abusedDate: 'date of abuse',
    normalCost: 'normal daily amount',
    abnormalCost: 'abnormal amount',
    rechargeCount: 'number of auto-recharge charges',
    timeUtc: 'UTC time range',
    timeTaipei: 'Taipei time range',
    totalAmount: 'total amount for the day',
    normalBaseline: 'normal baseline amount',
    multiplier: 'multiplier',
    affectedKeyCount: 'number of affected keys',
    perKeyRange: 'per-key amount range',
    ipList: 'source IP list',
    detail: 'please add details',
    anomaliesFound: 'findings',
    netLossScope: 'actual financial loss scope',
    rotationInProgress: 'rotation scope, e.g. remaining 5 services',
  },
  sections: {
    account: {
      title: '1. Account Identification',
      accountLabel: 'Zeabur account name',
    },
    lossSummary: {
      title: '2. Loss Summary',
      narrativeLine: (provider: string, date: string, normal: string, abnormal: string, count: string) =>
        `This account's ${provider} API was used without authorization on ${date}. Charges jumped from a normal ${normal} to ${abnormal}, triggering ${count} auto-recharge charges.`,
    },
    evidence: {
      title: '3. Supporting Evidence',
      timeRangeLine: (utc: string, taipei: string) => `${utc} (Taipei time ${taipei})`,
      amountLine: (total: string, baseline: string, multiplier: string, keyCount: string, perKeyRange: string) =>
        `Total for the day: ${total} (normal baseline: ${baseline}, roughly ${multiplier}x normal). Usage was spread across ${keyCount} different API keys, each around ${perKeyRange}. The per-key names, timestamps, and token breakdown are listed below (see attached screenshots):`,
      usageRowLine: (label: string, amount: string, note: string) => `${label}: ${amount} (${note})`,
      sourceIpKnownLine: (ips: string) => `Already obtained — the source IP(s) are ${ips}.`,
      sourceIpUnknownFallback:
        'Not yet obtained — I have already requested this from the provider\'s technical support and will supplement it here as soon as I receive it.',
      otherPoints: {
        disabledProjectNotRunning:
          'Some of the affected keys belong to projects that were already disabled or long unmaintained, and had nothing running during the incident window, so they could not have generated any traffic themselves',
        uniformCostPattern:
          "Usage was suspiciously uniform across services — this account's workloads normally vary widely, and would not produce nearly identical per-key charges in the same window under normal operation; this pattern is consistent with someone working through a list of stolen keys one by one",
        localOnlyIsolation:
          'All affected credentials were stored in the platform\'s environment variables; I keep a separate copy of the same kind of credential locally only, which was never uploaded, and that copy shows no abnormal usage at all',
        ruledOutLocalCompromise:
          'I have completed my own investigation and ruled out local compromise, credentials committed to version control, or a frontend bundle leak',
      },
    },
    otherServices: {
      title: '4. Other Services Checked',
      checkedLine: 'I checked every other provider named in the leak notification and confirmed whether any showed unusual usage.',
      uncheckedLine: 'I have not yet finished checking every other provider named in the leak notification, and will confirm and follow up as soon as possible.',
      anomaliesLine: (text: string) => `After checking, ${text}.`,
      netLossLine: (text: string) => `The actual financial loss scope being claimed here is: ${text}.`,
      rotatedLine: 'All related credentials have been fully rotated.',
      notRotatedLine: 'Not all related credentials have been rotated yet; this is still in progress.',
    },
    remediation: {
      title: '5. Remediation Already Completed',
      credentialsRevokedLine: 'All affected credentials have been disabled / revoked.',
      zeaburTokensRevokedLine: 'All Zeabur platform API tokens have been revoked.',
      autoRechargeBlockedLine: 'Auto-recharge has been blocked through the card issuer.',
      autoRechargeNotApplicableLine: 'This account has no auto-recharge mechanism, so this does not apply.',
      rotationInProgressLine: (text: string) => `Per the notification list, credential rotation for ${text} is currently in progress.`,
    },
    requests: {
      title: '6. Requests',
      compensationLine: '(1) I am requesting compensation for the charges resulting from this unauthorized use.',
      provideEvidenceLine: '(2) If needed, I am willing to provide the above evidence for forwarding to upstream providers and law enforcement.',
      willSupplementIpLine: '(3) I will proactively supplement the source IP to this ticket once I obtain it.',
    },
  },
  ticket: {
    suggestedSubject: 'Security Incident (2026-08-27) — Unauthorized Usage Claim & Compensation Request',
    suggestedCategory: 'Billing',
  },
  email: {
    subjectLine: (accountName: string) =>
      `[Zeabur Account ${accountName}] Security Incident (2026-08-27) — Unauthorized Usage Claim & Compensation Request`,
    salutation: 'Dear Zeabur Support Team,',
    signoff: (accountName: string) => `Thank you for your time and assistance with this matter.\n\nZeabur account: ${accountName}`,
  },
} satisfies TemplateDictionary;
