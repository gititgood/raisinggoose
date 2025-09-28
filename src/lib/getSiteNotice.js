import {draftMode} from "next/headers";
import {client} from "./sanity.client";
import {SITE_NOTICE_QUERY} from "./queries";

export async function getSiteNotice() {
  const {isEnabled} = draftMode();
  const data = await client
    .withConfig({ stega: isEnabled })
    .fetch(SITE_NOTICE_QUERY, {}, { next: { revalidate: 60 } });

  /* Force it on in dev if you want
  if (process.env.NODE_ENV === "development") {
    return {
      enabled: true,
      version: data?.version ?? "dev",
      title: data?.title ?? "Under construction",
      message:
        data?.message ??
        "Dev mode: forcing notice to display so you can test.",
      accentHex: data?.accentHex ?? "#8b0000",
      image: data?.image ?? null,
    };
  }*/

  return data || null;
}
