import { Badge } from "@give-on/ui";

type AdminStatusProps = {
  tone:
    | "안전"
    | "주의"
    | "위험"
    | "긴급"
    | "승인대기"
    | "검토중"
    | "승인완료"
    | "반려"
    | "기부완료"
    | "배송준비"
    | "배송중"
    | "도착확인"
    | "지연";
};

export function AdminStatus({ tone }: AdminStatusProps) {
  if (tone === "긴급" || tone === "반려" || tone === "지연") {
    return <Badge variant="destructive" className="px-2.5 py-1 text-[11px]">{tone}</Badge>;
  }

  if (tone === "주의" || tone === "배송준비" || tone === "검토중") {
    return <Badge variant="warning" className="px-2.5 py-1 text-[11px]">{tone}</Badge>;
  }

  if (tone === "위험" || tone === "배송중" || tone === "승인대기") {
    return <Badge variant="secondary" className="px-2.5 py-1 text-[11px]">{tone}</Badge>;
  }

  if (tone === "안전" || tone === "승인완료" || tone === "도착확인") {
    return <Badge className="px-2.5 py-1 text-[11px]">{tone}</Badge>;
  }

  return <Badge variant="neutral" className="px-2.5 py-1 text-[11px]">{tone}</Badge>;
}
