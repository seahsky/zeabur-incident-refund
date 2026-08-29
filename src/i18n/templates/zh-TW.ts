import type { TemplateDictionary } from '../dictionary';

export default {
  bracketOpen: '【',
  bracketClose: '】',
  placeholders: {
    accountName: '帳號名稱',
    serviceName: '專案名 / 服務名 (production)',
    credentialName: '變數名稱，例如 ANTHROPIC_API_KEY',
    noRows: '尚未填寫受影響的服務與憑證',
    provider: '服務商名稱，例如 Anthropic',
    abusedDate: '遭盜用日期',
    normalCost: '平日金額',
    abnormalCost: '異常金額',
    rechargeCount: '自動儲值扣款筆數',
    timeUtc: 'UTC 時間區間',
    timeTaipei: '台北時間區間',
    totalAmount: '單日總額',
    normalBaseline: '平日基準金額',
    multiplier: '倍數',
    affectedKeyCount: '受影響的 Key 數量',
    perKeyRange: '每把金額區間',
    ipList: '來源 IP 清單',
    detail: '請補充說明',
    anomaliesFound: '檢查結果',
    netLossScope: '實際財務損失範圍',
    rotationInProgress: '輪替範圍，例如：其餘 5 個服務',
  },
  sections: {
    account: {
      title: '一、帳號識別',
      accountLabel: '平台帳號名稱',
    },
    lossSummary: {
      title: '二、損失摘要',
      narrativeLine: (provider: string, date: string, normal: string, abnormal: string, count: string) =>
        `本帳號 ${provider} API 於 ${date} 遭未授權使用，費用由平常 ${normal} 暴增至 ${abnormal}，並觸發 ${count} 筆自動儲值扣款。`,
    },
    evidence: {
      title: '三、佐證資料',
      timeRangeLine: (utc: string, taipei: string) => `${utc}（台北時間 ${taipei}）`,
      amountLine: (total: string, baseline: string, multiplier: string, keyCount: string, perKeyRange: string) =>
        `單日總額 ${total}（平常基準 ${baseline}，約為平日的 ${multiplier} 倍）。用量分散於 ${keyCount} 把不同的 API Key，每把約 ${perKeyRange}。逐把 Key 的名稱、時間戳與 Token 明細如下（詳見附件截圖）：`,
      usageRowLine: (label: string, amount: string, note: string) => `${label}：${amount}（${note}）`,
      sourceIpKnownLine: (ips: string) => `已取得，來源 IP 為 ${ips}。`,
      sourceIpUnknownFallback: '尚未取得，已向服務商技術支援提出調閱申請，取得後將立即補充至本工單。',
      otherPoints: {
        disabledProjectNotRunning:
          '部分受影響的 Key 屬於已停用或長期未維護的專案，該等服務在事發期間並未運行，不可能自行產生任何流量',
        uniformCostPattern:
          '用量在不同服務間高度均勻，本帳號各服務的工作負載差異極大，正常運作下不可能在同一時段產生近乎相同的每把費用，此分布符合持有一份金鑰清單並逐把使用的行為',
        localOnlyIsolation:
          '受影響的憑證全部存放於平台環境變數；本人另有同類憑證僅存放於本機、從未上傳，該等憑證完全沒有異常用量',
        ruledOutLocalCompromise: '本人已完成自身端排查，排除本機遭入侵、憑證進入版本控制、前端打包外洩等可能',
      },
    },
    otherServices: {
      title: '四、其他服務之確認',
      checkedLine: '已逐一檢查同批外洩通知所列之其他服務商，確認是否有異常用量。',
      uncheckedLine: '尚未完成同批外洩通知所列其他服務商之逐一檢查，將盡快確認並視需要補充說明。',
      anomaliesLine: (text: string) => `經檢查後，${text}。`,
      netLossLine: (text: string) => `本次申報之實際財務損失範圍為：${text}。`,
      rotatedLine: '相關憑證已全部完成輪替。',
      notRotatedLine: '相關憑證尚未全部完成輪替，正持續進行中。',
    },
    remediation: {
      title: '五、已完成之處置',
      credentialsRevokedLine: '所有受影響的憑證已完成停用／撤銷。',
      zeaburTokensRevokedLine: 'Zeabur 平台 API Token 已全部撤銷。',
      autoRechargeBlockedLine: '已透過發卡行封鎖自動儲值扣款。',
      autoRechargeNotApplicableLine: '本帳號無自動儲值扣款機制，此項不適用。',
      rotationInProgressLine: (text: string) => `依通知信清單，${text}之憑證輪替作業正在進行中。`,
    },
    requests: {
      title: '六、請求事項',
      compensationLine: '(1) 請求就本次未授權使用所產生之金額進行賠償。',
      provideEvidenceLine: '(2) 若貴平台需要，本人可提供上述佐證資料，供轉交予上游服務商及執法機關。',
      willSupplementIpLine: '(3) 待取得來源 IP 後，將主動補充至本工單。',
    },
  },
  ticket: {
    suggestedSubject: '2026-08-27 環境變數外洩事件 — 遭盜用損失申報與賠償請求',
    suggestedCategory: 'Billing',
  },
  email: {
    subjectLine: (accountName: string) =>
      `[Zeabur 帳號 ${accountName}] 2026-08-27 環境變數外洩事件 — 遭盜用損失申報與賠償請求`,
    salutation: 'Zeabur 客服團隊 您好，',
    signoff: (accountName: string) => `以上，敬請協助處理，謝謝您的時間。\n\nZeabur 帳號：${accountName}`,
  },
} satisfies TemplateDictionary;
