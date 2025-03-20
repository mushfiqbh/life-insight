import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Read locale from cookies, fallback to "en"
  const locale = (await cookies()).get("locale")?.value || "en";

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
