import {getSiteNotice} from "../src/lib/getSiteNotice";
import SiteNoticeOverlay from "./SiteNoticeOverlay";

export default async function SiteNoticeContainer() {
  const data = await getSiteNotice();
  return <SiteNoticeOverlay data={data} />;
}
