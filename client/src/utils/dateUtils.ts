import { formatDistance } from "date-fns";
import th from "date-fns/locale/th";

export const formatDistanceToNow = (date?: string) => {
  if (!date) return "";
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
    locale: th,
  }).replace("ประมาณ", "");
};
