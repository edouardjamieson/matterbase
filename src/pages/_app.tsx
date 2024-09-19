import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import CmsProvider from "~/components/core/cms";
import { TooltipProvider } from "~/components/ui/tooltip";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <CmsProvider session={session}>
        <TooltipProvider>
          <Component {...pageProps} />
        </TooltipProvider>
      </CmsProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
