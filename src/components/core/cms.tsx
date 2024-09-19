import type { Cms } from "@prisma/client";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { cn, string2Color } from "~/lib/utils";

interface CmsContextProps {
  cms: Cms | null;
}

export const CmsContext = createContext<CmsContextProps>({ cms: null });

export default function CmsProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [cmsId, setCmsId] = useState("");
  const [cms, setCms] = useState<Cms | null>(null);

  useEffect(() => {
    console.log("Changed route!");

    // Check if in CMS
    if (!router.query.cmsId) return;

    // Check if different ID
    if (router.query.cmsId != cmsId) {
      console.log("fetch cms data");

      setLoading(true);
      fetchCmsData()
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          router.replace("/");
        });
    }
  }, [router.asPath]);

  const fetchCmsData = async () => {
    const id = router.query.cmsId as string;

    // TESTING
    if (id == "123") throw new Error("not_allowed");

    // FETCH DATA
    const _cms: Cms = {
      id,
      title: "Co-motion",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdById: "456",
      image: "",
    };

    setCms(_cms);
    setCmsId(id);
  };

  return loading ? null : (
    <CmsContext.Provider value={{ cms }}>{children}</CmsContext.Provider>
  );
}

export function useCms(required = false) {
  const { cms } = useContext(CmsContext);

  return { cms };
}

export function CmsImage({ cms, className }: { cms: Cms; className?: string }) {
  if (cms.image.length > 0) {
    return (
      <Image
        src={cms.image}
        width={200}
        height={200}
        alt={cms.title}
        className={cn(
          "h-8 w-8 rounded-full object-cover object-center",
          className,
        )}
      />
    );
  } else {
    const color = string2Color(cms.title);

    return (
      <div
        className={cn(
          "relative z-20 flex h-8 w-8 items-center justify-center rounded-full border text-lg font-medium",
        )}
        style={{ color, borderColor: color }}
      >
        {cms.title[0]}
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-full rounded-full opacity-20"
          style={{ backgroundColor: color }}
        ></div>
      </div>
    );
  }
}
