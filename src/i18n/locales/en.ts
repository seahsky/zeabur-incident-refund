import type { Dictionary } from '../dictionary';

export default {
  meta: {
    title: 'Zeabur Incident Claim Generator',
    description:
      'Helps users affected by the 2026-08-27 Zeabur environment-variable leak generate a clear, well-organized support-ticket or email claim.',
  },
  nav: {
    skipToForm: 'Skip to the form',
    langSwitchLabel: 'Switch language',
  },
  hero: {
    heading: 'Zeabur Environment Variable Leak — Compensation Claim Generator',
    subheading:
      "If your API credits, database passwords, or other credentials were abused because of this incident, fill in the form below to generate a clear, evidence-backed claim you can paste into a Zeabur ticket or email in minutes.",
  },
  disclaimer: {
    heading: 'Important disclaimer',
    body: "This is an independent, community-built tool — it is not affiliated with Zeabur, and nothing it generates is legal advice. It only helps you organize the facts and evidence into a clear claim; whether you're reimbursed, and how much, is entirely up to Zeabur's own review. Please double-check every detail before you send it.",
  },
  incidentFacts: {
    heading: 'Incident summary',
    summary:
      "On August 27, 2026, Zeabur notified affected users that, beyond the previously disclosed scope, attackers also retrieved project environment variables matching sensitive credential naming patterns or value formats.",
    credentialListIntro: 'Environment variables that may have been exposed include (but are not limited to):',
    credentialList: [
      'ANTHROPIC_API_KEY',
      'OPENROUTER_API_KEY',
      'OPENAI_API_KEY',
      'DATABASE_URL',
      'GITHUB_TOKEN',
      'JWT_SECRET',
      'MONGODB_URI',
      'MYSQL_PASSWORD',
      'POSTGRES_PASSWORD',
      'REDIS_PASSWORD',
      'SECRET_KEY',
      'and any variable whose value matches a confirmed AWS, GitHub, Anthropic, OpenRouter, OpenAI, or Stripe credential format, regardless of variable name',
    ],
    noEvidenceFound:
      'Zeabur states it has found no evidence that Zeabur account credentials, personal data, server logs, other project data, or payment/card information were retrieved.',
  },
  channel: {
    heading: 'Which channel should you use to file a claim?',
    intro:
      "After this incident, you can report your loss and request compensation through the channels below. Use the official support ticket as your primary channel — treat email as a backup only.",
    ticket: {
      title: 'Recommended: Zeabur’s official support ticket',
      body: "Zeabur's incident notification explicitly stated that related tickets would be handled with the highest priority, and the ticket portal has a dedicated \"Billing\" category — making it the most direct and formal channel for a financial claim like this one.",
      ctaLabel: 'Go to Zeabur Support',
      url: 'https://zeabur.com/support',
      categoryHint: 'When creating the ticket, choose the "Billing" category so it reaches the right team immediately.',
    },
    emailSecondary: {
      title: 'Backup: Email (not an officially designated claims channel)',
      body: "Based on publicly available Terms of Service content, Zeabur has no dedicated email address for security or compensation claims, so email is not a formal claims channel. Use this text only as a personal paper trail, or as a follow-up if your ticket goes unanswered for a long time — not as a replacement for filing a ticket.",
    },
    tosCaveats: {
      heading: 'Before you send it, a few things worth knowing from the Terms of Service',
      sourceNote:
        "The following is a summary based on publicly available information — refer to Zeabur's official Terms of Service page for the authoritative text.",
      liabilityCap:
        "Zeabur's total liability under its Terms is capped at whichever is greater: US$100, or the fees you paid Zeabur in the 12 months before the incident. That is a platform-fee-level contractual cap — it does not guarantee full reimbursement of third-party charges from providers like Anthropic or OpenAI.",
      promptReporting: 'The Terms expect users to report unauthorized account or security use to Zeabur promptly.',
      noFixedFormula:
        "The Terms don't define a fixed compensation formula for security incidents. This claim is a discretionary, evidence-backed request, not a guaranteed contractual entitlement.",
      arbitrationNote:
        "Disputes under the Terms are resolved through binding individual arbitration (no class actions) — worth knowing as last-resort background, not something you need to act on for this claim.",
    },
  },
  form: {
    heading: 'Fill in your claim details',
    intro:
      "Fill in the fields below as accurately as you can; the tool will assemble them into a complete ticket or email. Any field you leave blank will show up as a bracketed placeholder in the generated text so you can fill it in later.",
    common: {
      addRow: 'Add row',
      removeRow: 'Remove',
      requiredMark: 'Required',
      optional: 'Optional',
      yes: 'Yes',
      no: 'No',
    },
    account: {
      title: 'Account identification',
      accountNameLabel: 'Zeabur account name',
      accountNamePlaceholder: 'e.g. your-username',
      servicesLabel: 'Affected services and leaked credentials',
      serviceNameLabel: 'Project / service name',
      serviceNamePlaceholder: 'e.g. my-app (production)',
      credentialNameLabel: 'Leaked environment variable name',
      credentialNamePlaceholder: 'e.g. ANTHROPIC_API_KEY',
    },
    lossSummary: {
      title: 'Loss summary',
      providerLabel: 'Affected provider',
      providerPlaceholder: 'e.g. Anthropic',
      abusedDateLabel: 'Date of unauthorized use',
      abusedDatePlaceholder: 'e.g. 2026-08-27',
      normalCostLabel: 'Normal daily cost',
      normalCostPlaceholder: 'e.g. US$2',
      abnormalCostLabel: 'Abnormal day cost',
      abnormalCostPlaceholder: 'e.g. US$850',
      rechargeCountLabel: 'Number of auto-recharge charges triggered',
      rechargeCountPlaceholder: 'e.g. 4',
    },
    evidence: {
      title: 'Supporting evidence',
      timeHeading: 'Timing',
      timeRangeUtcLabel: 'UTC time range',
      timeRangeUtcPlaceholder: 'e.g. 2026-08-27 14:00–22:00 UTC',
      timeRangeTaipeiLabel: 'Taipei time range',
      timeRangeTaipeiPlaceholder: 'e.g. 2026-08-27 22:00–2026-08-28 06:00',
      timeHelp:
        "Most AI providers report daily usage in UTC. If the spike spans two calendar days, filling in both time zones saves the reviewer from converting it themselves.",
      amountHeading: 'Amount and token usage',
      totalAmountLabel: 'Total abnormal amount for the day',
      totalAmountPlaceholder: 'e.g. US$850',
      normalBaselineLabel: 'Normal baseline amount',
      normalBaselinePlaceholder: 'e.g. US$2',
      multiplierLabel: 'Roughly how many times normal',
      multiplierPlaceholder: 'e.g. 400',
      affectedKeyCountLabel: 'Number of affected API keys',
      affectedKeyCountPlaceholder: 'e.g. 6',
      perKeyRangeLabel: 'Per-key amount range',
      perKeyRangePlaceholder: 'e.g. US$120–150',
      usageRowsLabel: 'Per-key breakdown (optional, add as many rows as needed)',
      keyLabelLabel: 'Key name / label',
      keyLabelPlaceholder: 'e.g. prod-key-1',
      keyAmountLabel: 'Amount',
      keyAmountPlaceholder: 'e.g. US$135',
      keyNoteLabel: 'Note (timestamps, usage, etc.)',
      keyNotePlaceholder: 'e.g. 14:02–14:47 UTC, ~2.1M tokens',
      sourceIpHeading: 'Source IP / device',
      sourceIpKnown: 'I already have the source IP',
      sourceIpUnknown: 'Not yet obtained — already requested from the provider',
      sourceIpListLabel: 'Source IP list',
      sourceIpListPlaceholder: 'e.g. 198.51.100.23, 203.0.113.45',
      otherHeading: 'Other supporting evidence',
      otherIntro: 'Check any statement below that applies to your situation; unchecked items are left out of the generated text entirely.',
      otherPoints: {
        disabledProjectNotRunning: {
          label: 'Some affected keys belong to a disabled or long-unmaintained project',
          detailPlaceholder: 'e.g. this project has not been deployed since 2025 and had nothing running during the incident',
        },
        uniformCostPattern: {
          label: 'Usage was suspiciously uniform across services, unlike our normal usage pattern',
          detailPlaceholder: 'e.g. all 6 keys fell in the US$120–150 range, even though our normal workloads vary widely',
        },
        localOnlyIsolation: {
          label: 'A local-only copy of the same kind of credential, never uploaded, shows no abnormal usage',
          detailPlaceholder: 'e.g. a separate local-development-only API key shows normal usage throughout',
        },
        ruledOutLocalCompromise: {
          label: 'I have ruled out local compromise, credentials in version control, or a frontend bundle leak',
          detailPlaceholder: 'e.g. checked git history, build artifacts, and ran a local malware scan',
        },
      },
    },
    otherServices: {
      title: 'Other services checked',
      checkedAllProvidersLabel: 'I checked every other provider named in the leak notification for unusual usage',
      anomaliesFoundLabel: 'What you found',
      anomaliesFoundPlaceholder: 'e.g. no unusual usage found on OpenAI or GitHub accounts',
      netLossScopeLabel: 'Actual financial loss scope being claimed',
      netLossScopePlaceholder: 'e.g. claiming only the Anthropic API overage, US$848 total (baseline already subtracted)',
      allRotatedConfirmedLabel: 'All related credentials have been fully rotated',
    },
    remediation: {
      title: 'Remediation already completed',
      credentialsRevokedLabel: 'All affected credentials have been disabled / revoked',
      zeaburTokensRevokedLabel: 'All Zeabur platform API tokens have been revoked',
      autoRechargeBlockedLabel: 'Auto-recharge has been blocked through the card issuer',
      autoRechargeNotApplicableLabel: 'No auto-recharge mechanism / not applicable',
      rotationInProgressLabel: 'Remaining rotation scope',
      rotationInProgressPlaceholder: 'e.g. the remaining 5 services',
    },
    requests: {
      title: 'Requests',
      wantsCompensationLabel: 'Request compensation for the charges from this unauthorized use',
      willingToProvideEvidenceLabel: 'Willing to provide the above evidence for forwarding to upstream providers and law enforcement',
      willSupplementIpLabel: 'Will supplement the source IP to this ticket once obtained',
    },
  },
  output: {
    heading: 'Generated result',
    modeTicket: 'Ticket format',
    modeEmail: 'Email format',
    copy: 'Copy text',
    copied: 'Copied!',
    download: 'Download as .txt',
    validationBannerNone: 'All recommended fields are filled in — this is ready to send.',
    validationBannerSome: (count: number) =>
      `${count} recommended field${count === 1 ? '' : 's'} still empty — blank fields show up as bracketed placeholders below. You can still generate the text, but filling them in makes a stronger claim.`,
    noscript: "This tool needs JavaScript to work — please make sure scripts aren't blocked in your browser.",
  },
  footer: {
    notAffiliated: 'This is an unofficial, community-built tool and is not affiliated with Zeabur.',
    sourceLink: 'View source',
  },
} satisfies Dictionary;
