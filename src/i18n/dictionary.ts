export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    skipToForm: string;
    langSwitchLabel: string;
  };
  hero: {
    heading: string;
    subheading: string;
  };
  disclaimer: {
    heading: string;
    body: string;
  };
  incidentFacts: {
    heading: string;
    summary: string;
    credentialListIntro: string;
    credentialList: string[];
    noEvidenceFound: string;
  };
  channel: {
    heading: string;
    intro: string;
    ticket: {
      title: string;
      body: string;
      ctaLabel: string;
      url: string;
      categoryHint: string;
    };
    emailSecondary: {
      title: string;
      body: string;
    };
    tosCaveats: {
      heading: string;
      sourceNote: string;
      liabilityCap: string;
      promptReporting: string;
      noFixedFormula: string;
      arbitrationNote: string;
    };
  };
  form: {
    heading: string;
    intro: string;
    common: {
      addRow: string;
      removeRow: string;
      requiredMark: string;
      optional: string;
      yes: string;
      no: string;
    };
    account: {
      title: string;
      accountNameLabel: string;
      accountNamePlaceholder: string;
      servicesLabel: string;
      serviceNameLabel: string;
      serviceNamePlaceholder: string;
      credentialNameLabel: string;
      credentialNamePlaceholder: string;
    };
    lossSummary: {
      title: string;
      providerLabel: string;
      providerPlaceholder: string;
      abusedDateLabel: string;
      abusedDatePlaceholder: string;
      normalCostLabel: string;
      normalCostPlaceholder: string;
      abnormalCostLabel: string;
      abnormalCostPlaceholder: string;
      rechargeCountLabel: string;
      rechargeCountPlaceholder: string;
    };
    evidence: {
      title: string;
      timeHeading: string;
      timeRangeUtcLabel: string;
      timeRangeUtcPlaceholder: string;
      timeRangeTaipeiLabel: string;
      timeRangeTaipeiPlaceholder: string;
      timeHelp: string;
      amountHeading: string;
      totalAmountLabel: string;
      totalAmountPlaceholder: string;
      normalBaselineLabel: string;
      normalBaselinePlaceholder: string;
      multiplierLabel: string;
      multiplierPlaceholder: string;
      affectedKeyCountLabel: string;
      affectedKeyCountPlaceholder: string;
      perKeyRangeLabel: string;
      perKeyRangePlaceholder: string;
      usageRowsLabel: string;
      keyLabelLabel: string;
      keyLabelPlaceholder: string;
      keyAmountLabel: string;
      keyAmountPlaceholder: string;
      keyNoteLabel: string;
      keyNotePlaceholder: string;
      sourceIpHeading: string;
      sourceIpKnown: string;
      sourceIpUnknown: string;
      sourceIpListLabel: string;
      sourceIpListPlaceholder: string;
      otherHeading: string;
      otherIntro: string;
      otherPoints: {
        disabledProjectNotRunning: { label: string; detailPlaceholder: string };
        uniformCostPattern: { label: string; detailPlaceholder: string };
        localOnlyIsolation: { label: string; detailPlaceholder: string };
        ruledOutLocalCompromise: { label: string; detailPlaceholder: string };
      };
    };
    otherServices: {
      title: string;
      checkedAllProvidersLabel: string;
      anomaliesFoundLabel: string;
      anomaliesFoundPlaceholder: string;
      netLossScopeLabel: string;
      netLossScopePlaceholder: string;
      allRotatedConfirmedLabel: string;
    };
    remediation: {
      title: string;
      credentialsRevokedLabel: string;
      zeaburTokensRevokedLabel: string;
      autoRechargeBlockedLabel: string;
      autoRechargeNotApplicableLabel: string;
      rotationInProgressLabel: string;
      rotationInProgressPlaceholder: string;
    };
    requests: {
      title: string;
      wantsCompensationLabel: string;
      willingToProvideEvidenceLabel: string;
      willSupplementIpLabel: string;
    };
  };
  output: {
    heading: string;
    modeTicket: string;
    modeEmail: string;
    copy: string;
    copied: string;
    download: string;
    validationBannerNone: string;
    validationBannerSome: (count: number) => string;
    noscript: string;
  };
  footer: {
    notAffiliated: string;
    sourceLink: string;
  };
}

export interface TemplateDictionary {
  bracketOpen: string;
  bracketClose: string;
  placeholders: {
    accountName: string;
    serviceName: string;
    credentialName: string;
    noRows: string;
    provider: string;
    abusedDate: string;
    normalCost: string;
    abnormalCost: string;
    rechargeCount: string;
    timeUtc: string;
    timeTaipei: string;
    totalAmount: string;
    normalBaseline: string;
    multiplier: string;
    affectedKeyCount: string;
    perKeyRange: string;
    ipList: string;
    detail: string;
    anomaliesFound: string;
    netLossScope: string;
    rotationInProgress: string;
  };
  sections: {
    account: {
      title: string;
      accountLabel: string;
    };
    lossSummary: {
      title: string;
      narrativeLine: (provider: string, date: string, normal: string, abnormal: string, count: string) => string;
    };
    evidence: {
      title: string;
      timeRangeLine: (utc: string, taipei: string) => string;
      amountLine: (total: string, baseline: string, multiplier: string, keyCount: string, perKeyRange: string) => string;
      usageRowLine: (label: string, amount: string, note: string) => string;
      sourceIpKnownLine: (ips: string) => string;
      sourceIpUnknownFallback: string;
      otherPoints: {
        disabledProjectNotRunning: string;
        uniformCostPattern: string;
        localOnlyIsolation: string;
        ruledOutLocalCompromise: string;
      };
    };
    otherServices: {
      title: string;
      checkedLine: string;
      uncheckedLine: string;
      anomaliesLine: (text: string) => string;
      netLossLine: (text: string) => string;
      rotatedLine: string;
      notRotatedLine: string;
    };
    remediation: {
      title: string;
      credentialsRevokedLine: string;
      zeaburTokensRevokedLine: string;
      autoRechargeBlockedLine: string;
      autoRechargeNotApplicableLine: string;
      rotationInProgressLine: (text: string) => string;
    };
    requests: {
      title: string;
      compensationLine: string;
      provideEvidenceLine: string;
      willSupplementIpLine: string;
    };
  };
  ticket: {
    suggestedSubject: string;
    suggestedCategory: string;
  };
  email: {
    subjectLine: (accountName: string) => string;
    salutation: string;
    signoff: (accountName: string) => string;
  };
}
