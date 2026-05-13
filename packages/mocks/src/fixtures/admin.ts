import type {
  AdminCampaignDetail,
  AdminCampaignQueueItem,
  AdminDashboardData,
  AdminDeliveryItem
} from "@give-on/schemas";

export const adminCampaignQueueFixture: AdminCampaignQueueItem[] = [
  {
    id: "campaign-apple-001",
    title: "청송 우박 피해 사과 긴급 지원",
    region: "경북 청송",
    farmerName: "김철수",
    produceType: "사과",
    urgencyLevel: "긴급",
    reviewStatus: "승인대기",
    urgencyScore: 9.4,
    requestedAmount: 4500000,
    rewardLabel: "사과 2kg 박스",
    submittedAt: "2026-05-12 09:20",
    summary: "우박 피해로 출하 등급이 낮아진 사과를 답례품으로 전환하는 캠페인입니다."
  },
  {
    id: "campaign-duck-002",
    title: "익산 폭염 대응 오리 농가 냉방 지원",
    region: "전북 익산",
    farmerName: "박민정",
    produceType: "오리",
    urgencyLevel: "위험",
    reviewStatus: "검토중",
    urgencyScore: 7.8,
    requestedAmount: 3200000,
    rewardLabel: "감사 카드 + 레시피북",
    submittedAt: "2026-05-11 18:40",
    summary: "폭염 구간에 냉방 설비 유지 비용을 긴급 보전하는 사료/전력 지원 캠페인입니다."
  },
  {
    id: "campaign-pear-003",
    title: "나주 배 저온 피해 후속 복구 지원",
    region: "전남 나주",
    farmerName: "이수현",
    produceType: "배",
    urgencyLevel: "주의",
    reviewStatus: "승인대기",
    urgencyScore: 6.1,
    requestedAmount: 2100000,
    rewardLabel: "배 3kg 박스",
    submittedAt: "2026-05-10 14:05",
    summary: "저온 피해 이후 상품성이 낮아진 배를 묶음 배송형 답례품으로 재구성합니다."
  }
];

const appleCampaign = adminCampaignQueueFixture[0]!;
const duckCampaign = adminCampaignQueueFixture[1]!;
const pearCampaign = adminCampaignQueueFixture[2]!;

export const adminCampaignDetailsFixture: AdminCampaignDetail[] = [
  {
    ...appleCampaign,
    story:
      "5월 초 우박이 집중되며 청송 사과 표면에 상처가 생겼습니다. 맛과 당도는 유지되지만 외관 등급이 낮아져 일반 유통이 어려운 상황입니다. Give On은 이 물량을 시민 기부형 답례품으로 전환해 농가의 손실을 줄이려 합니다.",
    climateSignals: [
      "5월 8일 우박 특보 발효",
      "표면 흠집 비율 63%",
      "긴급 출하 전환 필요"
    ],
    reviewChecklist: [
      "농가 실명과 연락처 확인",
      "답례품 배송 가능 물량 검토",
      "긴급도 점수와 기상 데이터 교차 확인"
    ],
    contactPhone: "010-4021-1820",
    boxQuantity: 180
  },
  {
    ...duckCampaign,
    story:
      "익산 지역 폭염이 길어지며 오리 농가의 냉방 전력비가 급증했습니다. 사육 환경 안정화를 위해 단기간에 운영 자금을 확보해야 합니다.",
    climateSignals: [
      "일 최고기온 34도 이상 3일 연속",
      "습도 상승으로 환기 비용 증가",
      "냉방 설비 점검 필요"
    ],
    reviewChecklist: [
      "전력비 산출 근거 확인",
      "기존 후원 캠페인 중복 여부 확인",
      "스토리 문구와 피해 데이터 정합성 검토"
    ],
    contactPhone: "010-9921-2201",
    boxQuantity: 0
  },
  {
    ...pearCampaign,
    story:
      "저온 피해 이후 외관 불균형이 생긴 배를 선별해 못난이 작물 박스로 배송하는 복구형 캠페인입니다.",
    climateSignals: [
      "4월 저온 경보 이력",
      "외관 불균형 비율 39%",
      "냉해 후속 복구 단계"
    ],
    reviewChecklist: [
      "물량 산정값 확인",
      "답례품 포장 가능 일정 확인",
      "피해 농가 사진 검수"
    ],
    contactPhone: "010-1182-4410",
    boxQuantity: 96
  }
];

export const adminDeliveriesFixture: AdminDeliveryItem[] = [
  {
    id: "delivery-001",
    orderNumber: "GO-250512-104",
    campaignTitle: "청송 우박 피해 사과 긴급 지원",
    donorName: "김소연",
    farmerName: "김철수",
    region: "서울 성동구",
    rewardLabel: "사과 2kg 박스",
    status: "배송준비",
    updatedAt: "2026-05-12 16:20"
  },
  {
    id: "delivery-002",
    orderNumber: "GO-250511-083",
    campaignTitle: "익산 폭염 대응 오리 농가 냉방 지원",
    donorName: "정유진",
    farmerName: "박민정",
    region: "경기 성남시",
    rewardLabel: "감사 카드 + 레시피북",
    status: "배송중",
    updatedAt: "2026-05-12 13:40"
  },
  {
    id: "delivery-003",
    orderNumber: "GO-250510-071",
    campaignTitle: "나주 배 저온 피해 후속 복구 지원",
    donorName: "이재훈",
    farmerName: "이수현",
    region: "부산 해운대구",
    rewardLabel: "배 3kg 박스",
    status: "지연",
    updatedAt: "2026-05-12 11:05",
    issueLabel: "택배 집하 지연"
  },
  {
    id: "delivery-004",
    orderNumber: "GO-250508-029",
    campaignTitle: "청송 우박 피해 사과 긴급 지원",
    donorName: "최민아",
    farmerName: "김철수",
    region: "대전 유성구",
    rewardLabel: "사과 2kg 박스",
    status: "도착확인",
    updatedAt: "2026-05-12 09:12"
  }
];

export const adminDashboardFixture: AdminDashboardData = {
  stats: {
    atRiskFarms: 23,
    pendingCampaigns: 6,
    activeDeliveries: 14,
    weeklyDonationAmount: 4280000
  },
  riskFarms: [
    {
      id: "farm-001",
      farmName: "청송 별빛과수원",
      region: "경북 청송",
      produceType: "사과",
      riskLevel: "긴급",
      note: "우박 피해 후 48시간 내 선별 필요",
      updatedAt: "10분 전"
    },
    {
      id: "farm-002",
      farmName: "익산 푸른오리농장",
      region: "전북 익산",
      produceType: "오리",
      riskLevel: "위험",
      note: "폭염 경보 지속, 환기 장비 점검 권장",
      updatedAt: "22분 전"
    },
    {
      id: "farm-003",
      farmName: "나주 햇살배농원",
      region: "전남 나주",
      produceType: "배",
      riskLevel: "주의",
      note: "저온 후속 피해 모니터링 중",
      updatedAt: "1시간 전"
    }
  ],
  approvalQueue: adminCampaignQueueFixture,
  deliveryAlerts: adminDeliveriesFixture.filter(
    (delivery) => delivery.status === "배송준비" || delivery.status === "지연"
  )
};
