"use client";

import type { Cms } from "@prisma/client";
import { Session } from "next-auth";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CmsContextProps {
  cms: Cms | null;
}

export const CmsContext = createContext<CmsContextProps>({ cms: null });

export default function CmsProvider({
  children,
  cmsId,
  session,
}: {
  children: ReactNode;
  cmsId: string;
  session: Session | null;
}) {
  const [loading, setLoading] = useState(true);
  const [cms, setCms] = useState<Cms | null>(null);

  useEffect(() => {
    // TODO : Check if query is completed

    setCms({
      id: cmsId,
      title: "Danse-danse",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdById: "456",
    });
    setLoading(false);
  }, []);

  return loading ? null : (
    <CmsContext.Provider value={{ cms }}>{children}</CmsContext.Provider>
  );
}

export function useCms() {
  const { cms } = useContext(CmsContext);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params: any = [...searchParams.keys()].reduce((acc, curr) => {
    // @ts-ignore
    acc[curr] = searchParams.get(curr);
    return acc;
  }, {});

  const getCurrentRoute = () => {
    let r = pathname;
    if (cms) r = r.replace(`/cms/${cms.id}`, "");
    if (r == "") r = "/";
    if (searchParams.toString().length > 0) r += `?${searchParams.toString()}`;

    return r;
  };

  const buildCmsRoute = (r: string) => {
    if (!cms) return r;
    return `/cms/${cms.id}/${r}`;
  };

  return { cms, getCurrentRoute, buildCmsRoute };
}
