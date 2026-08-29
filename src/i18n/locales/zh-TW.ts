import type { Dictionary } from '../dictionary';

export default {
  meta: {
    title: 'Zeabur 外洩事件賠償申請產生器',
    description:
      '協助受 2026-08-27 Zeabur 環境變數外洩事件影響的用戶，快速產生完整、有條理的工單或 Email 申訴文字。',
  },
  nav: {
    skipToForm: '跳至填寫表單',
    langSwitchLabel: '切換語言',
  },
  hero: {
    heading: 'Zeabur 環境變數外洩事件｜賠償申請產生器',
    subheading:
      '若你的 API 額度、資料庫密碼等憑證因本次事件遭盜用，填寫以下表單，即可在幾分鐘內產生一份條理清楚、佐證齊全的申請文字，用於 Zeabur 工單或 Email。',
  },
  disclaimer: {
    heading: '重要聲明',
    body: '本工具為社群自製，與 Zeabur 官方無關，所產生內容也不構成法律意見。它只是協助你有條理地整理事實與佐證資料；實際是否獲得賠償、賠償金額多寡，仍完全取決於 Zeabur 官方的審核結果。送出前請務必自行核對所有內容是否正確無誤。',
  },
  incidentFacts: {
    heading: '事件摘要',
    summary:
      '2026 年 8 月 27 日，Zeabur 通知受影響用戶：攻擊者除了先前已知的外洩範圍外，還進一步取得了符合敏感憑證命名模式或數值格式的專案環境變數。',
    credentialListIntro: '本次可能遭外洩、需特別留意的環境變數包含（但不限於）：',
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
      '以及任何數值格式符合 AWS、GitHub、Anthropic、OpenRouter、OpenAI 或 Stripe 憑證格式的變數，不論變數名稱為何',
    ],
    noEvidenceFound:
      'Zeabur 表示，目前沒有證據顯示 Zeabur 帳號憑證、個人資料、伺服器日誌、其他專案資料或金流／信用卡資訊遭到存取。',
  },
  channel: {
    heading: '應該從哪個管道申請賠償？',
    intro:
      '遭遇本次事件後，你可以透過以下管道申報損失並請求賠償；建議優先使用官方工單系統，Email 僅作為備援與存底之用。',
    ticket: {
      title: '首選管道：Zeabur 官方工單系統',
      body: 'Zeabur 於事件通知信中明確表示「相關工單將以最高優先級處理」，且工單系統中設有「Billing」（帳務）分類，是處理本類財務申報最直接、最正式的管道，建議優先透過此管道提出申請。',
      ctaLabel: '前往 Zeabur 工單中心',
      url: 'https://zeabur.com/support',
      categoryHint: '建立工單時，請選擇「Billing」分類，讓客服團隊能第一時間分派給正確的處理窗口。',
    },
    emailSecondary: {
      title: '備援管道：Email（非官方指定申訴管道）',
      body: '根據公開的服務條款內容，Zeabur 並未設有專門處理資安或賠償申訴的官方 Email 信箱，因此 Email 並非正式的申訴管道。建議僅將本文字作為個人存底，或於工單長時間未獲回覆時作為追蹤之用，而非取代工單申請。',
    },
    tosCaveats: {
      heading: '送出前，建議先了解服務條款中的幾個重點',
      sourceNote: '以下為根據公開資訊整理之摘要，正式文字請以 Zeabur 官方服務條款頁面為準。',
      liabilityCap:
        'Zeabur 服務條款中的整體賠償責任上限，為「100 美元」與「事發前 12 個月內你支付給 Zeabur 之費用」兩者取其高者——這是平台費用層級的合約上限，並非保證會全額補償 Anthropic、OpenAI 等第三方服務商所產生的費用。',
      promptReporting: '服務條款要求用戶在發現帳號或安全性遭未授權使用時，應儘速通報 Zeabur。',
      noFixedFormula:
        '服務條款並未針對資安事件訂定固定的賠償公式；本申請屬於附具體佐證的請求，而非保證獲得賠付的契約權利。',
      arbitrationNote:
        '服務條款約定的爭議解決方式為具拘束力之個別仲裁（不得提起集體訴訟）——這通常是萬不得已時的最後手段，並非此次申請的必要步驟，先了解即可。',
    },
  },
  form: {
    heading: '填寫申請資料',
    intro:
      '請依實際狀況填寫下列欄位；系統會依你填寫的內容自動組成完整的工單／Email 文字。留白的欄位，最終文字中會以【提示文字】標示，方便你事後補齊。',
    common: {
      addRow: '新增一列',
      removeRow: '移除',
      requiredMark: '必填',
      optional: '選填',
      yes: '是',
      no: '否',
    },
    account: {
      title: '帳號識別',
      accountNameLabel: 'Zeabur 平台帳號名稱',
      accountNamePlaceholder: '例如：your-username',
      servicesLabel: '受影響的服務與外洩憑證',
      serviceNameLabel: '專案名稱／服務名稱',
      serviceNamePlaceholder: '例如：my-app (production)',
      credentialNameLabel: '外洩的環境變數名稱',
      credentialNamePlaceholder: '例如：ANTHROPIC_API_KEY',
    },
    lossSummary: {
      title: '損失摘要',
      providerLabel: '受影響的服務商',
      providerPlaceholder: '例如：Anthropic',
      abusedDateLabel: '遭盜用日期',
      abusedDatePlaceholder: '例如：2026-08-27',
      normalCostLabel: '平常每日費用',
      normalCostPlaceholder: '例如：US$2',
      abnormalCostLabel: '異常當日費用',
      abnormalCostPlaceholder: '例如：US$850',
      rechargeCountLabel: '觸發自動儲值扣款次數',
      rechargeCountPlaceholder: '例如：4',
    },
    evidence: {
      title: '佐證資料',
      timeHeading: '發生時間',
      timeRangeUtcLabel: 'UTC 時間區間',
      timeRangeUtcPlaceholder: '例如：2026-08-27 14:00–22:00 UTC',
      timeRangeTaipeiLabel: '台北時間區間',
      timeRangeTaipeiPlaceholder: '例如：2026-08-27 22:00–2026-08-28 06:00',
      timeHelp:
        '多數 AI 平台的每日用量統計以 UTC 為準，若異常用量橫跨兩個日期，建議兩種時間都填寫，對方就不需要自己換算時區。',
      amountHeading: '金額與 Token 用量',
      totalAmountLabel: '單日異常總金額',
      totalAmountPlaceholder: '例如：US$850',
      normalBaselineLabel: '平常基準金額',
      normalBaselinePlaceholder: '例如：US$2',
      multiplierLabel: '約為平常的幾倍',
      multiplierPlaceholder: '例如：400',
      affectedKeyCountLabel: '受影響的 API Key 數量',
      affectedKeyCountPlaceholder: '例如：6',
      perKeyRangeLabel: '每把 Key 的金額區間',
      perKeyRangePlaceholder: '例如：US$120–150',
      usageRowsLabel: '逐把 Key 明細（選填，可新增多列）',
      keyLabelLabel: 'Key 名稱／標籤',
      keyLabelPlaceholder: '例如：prod-key-1',
      keyAmountLabel: '金額',
      keyAmountPlaceholder: '例如：US$135',
      keyNoteLabel: '備註（時間戳、用量等）',
      keyNotePlaceholder: '例如：14:02–14:47 UTC，約 2.1M tokens',
      sourceIpHeading: '請求來源 IP／設備',
      sourceIpKnown: '已取得來源 IP',
      sourceIpUnknown: '尚未取得，已另向服務商申請調閱',
      sourceIpListLabel: '來源 IP 清單',
      sourceIpListPlaceholder: '例如：198.51.100.23, 203.0.113.45',
      otherHeading: '其他佐證資料',
      otherIntro: '以下項目請勾選符合你情況的敘述；未勾選的項目不會出現在最終文字中。',
      otherPoints: {
        disabledProjectNotRunning: {
          label: '部分受影響的 Key 屬於已停用或長期未維護的專案',
          detailPlaceholder: '例如：該專案自 2025 年即未部署，事發期間並無任何執行中的服務',
        },
        uniformCostPattern: {
          label: '用量在不同服務間高度均勻，不符合本帳號平常的使用模式',
          detailPlaceholder: '例如：6 把 Key 每把金額都落在 US$120–150 區間，但平常各服務用量差異極大',
        },
        localOnlyIsolation: {
          label: '本機保留的同類憑證（未上傳至 Zeabur）完全沒有異常用量',
          detailPlaceholder: '例如：本機另有一組僅供本地開發用的 API Key，用量紀錄正常',
        },
        ruledOutLocalCompromise: {
          label: '已自行排查，排除本機遭入侵、憑證進入版本控制、前端打包外洩等可能',
          detailPlaceholder: '例如：已檢查 git 歷史紀錄、建置產物與本機防毒掃描結果',
        },
      },
    },
    otherServices: {
      title: '其他服務之確認',
      checkedAllProvidersLabel: '已逐一檢查同批外洩通知中列出的其他服務商，確認是否有異常用量',
      anomaliesFoundLabel: '檢查結果／發現的異常',
      anomaliesFoundPlaceholder: '例如：OpenAI、GitHub 帳號未發現異常用量',
      netLossScopeLabel: '本次申報之實際財務損失範圍',
      netLossScopePlaceholder: '例如：僅申報 Anthropic API 異常費用部分，共 US$848（已扣除平常基準費用）',
      allRotatedConfirmedLabel: '相關憑證已全部完成輪替',
    },
    remediation: {
      title: '已完成之處置',
      credentialsRevokedLabel: '所有受影響的憑證已停用／撤銷',
      zeaburTokensRevokedLabel: 'Zeabur 平台 API Token 已全部撤銷',
      autoRechargeBlockedLabel: '已透過發卡行封鎖自動儲值扣款',
      autoRechargeNotApplicableLabel: '無自動儲值扣款機制／不適用',
      rotationInProgressLabel: '其餘憑證輪替範圍',
      rotationInProgressPlaceholder: '例如：其餘 5 個服務',
    },
    requests: {
      title: '請求事項',
      wantsCompensationLabel: '請求就本次未授權使用產生之金額進行賠償',
      willingToProvideEvidenceLabel: '如平台需要，願意提供上述佐證供轉交上游廠商及執法機關',
      willSupplementIpLabel: '取得來源 IP 後將主動補充至本工單',
    },
  },
  output: {
    heading: '產生結果',
    modeTicket: '工單格式',
    modeEmail: 'Email 格式',
    copy: '複製文字',
    copied: '已複製！',
    download: '下載為 .txt',
    validationBannerNone: '所有建議填寫的欄位皆已完成，內容已準備就緒。',
    validationBannerSome: (count: number) =>
      `尚有 ${count} 個建議填寫的欄位留白，未填寫處會以【提示文字】標示。仍可產生內容，但建議盡量補齊以增加說服力。`,
    noscript: '此工具需要啟用 JavaScript 才能運作，請確認瀏覽器未封鎖指令碼執行。',
  },
  footer: {
    notAffiliated: '本站為社群自製工具，與 Zeabur 官方無關，並非官方產品。',
    sourceLink: '查看原始碼',
  },
} satisfies Dictionary;
