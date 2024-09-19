import { Cms } from "@prisma/client";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Book,
  Code,
  HelpCircle,
  LayoutDashboard,
  LayoutPanelLeft,
  PanelRightOpen,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { CmsImage } from "./cms";
import { Input } from "../ui/input";

export interface DashboardProps {
  children: ReactNode;
  cms: Cms | null;
  requiresCms?: boolean;
  session: Session;
}

export default function Dashboard({
  cms,
  requiresCms = true,
  session,
  children,
}: DashboardProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (requiresCms && !cms) router.replace("/");
    else setLoading(false);
  }, []);

  const NavItem = ({
    path,
    title,
    icon,
  }: {
    path: string;
    title: string;
    icon: ReactNode;
  }) => {
    const active = router.asPath == path;
    return (
      <Link
        href={path}
        className={cn(
          "flex w-full items-center rounded-md px-2 py-2 transition-all",
          {
            "bg-zinc-900 text-white": active,
            "text-zinc-400 hover:bg-zinc-100": !active,
          },
        )}
      >
        {icon}
        <span
          className={cn("ml-2 font-medium text-black transition-all", {
            "text-white": active,
            "text-zinc-800": !active,
          })}
        >
          {title}
        </span>
      </Link>
    );
  };

  return (
    <main className="flex h-screen w-screen items-start overflow-hidden bg-zinc-100">
      {/* Sidebar */}
      <div className="flex h-full w-[250px] shrink-0 flex-col border-r bg-white p-4">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Image
            src="/images/logo-black-icon.svg"
            width={200}
            height={200}
            alt=""
            className="w-8"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <PanelRightOpen size={20} className="text-zinc-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Collapse sidebar</TooltipContent>
          </Tooltip>
        </div>
        {/* CMS nav */}
        {cms && (
          <nav className="mt-4 flex flex-col gap-1">
            {/* Home */}
            <NavItem
              icon={<LayoutDashboard size={20} />}
              path={`/cms/${cms.id}`}
              title="Dashboard"
            />
            {/* Home */}
            <NavItem
              icon={<Code size={20} />}
              path={`/cms/${cms.id}/api`}
              title="Api"
            />
            {/* Settings */}
            <NavItem
              icon={<Settings size={20} />}
              path={`/cms/${cms.id}/settings`}
              title="Settings"
            />
            <div className="my-4 h-[1px] w-full bg-zinc-100"></div>
            <NavItem
              icon={<span>📝</span>}
              path={`/cms/${cms.id}/entries/222`}
              title="Pages"
            />
            <NavItem
              icon={<span>✏️</span>}
              path={`/cms/${cms.id}/entries/222`}
              title="Blog posts"
            />
            <button
              type="button"
              className="flex w-full items-center rounded-md px-2 py-2 font-medium text-zinc-400 transition-all hover:bg-zinc-100 hover:text-black"
            >
              <Plus size={20} />
              <span className="ml-2">Add template</span>
            </button>
            <div className="my-4 h-[1px] w-full bg-zinc-100"></div>
            {/* Help */}
            <NavItem
              icon={<HelpCircle size={20} />}
              path={`/cms/${cms.id}/help`}
              title="Help"
            />
            {/* Docs */}
            <NavItem
              icon={<Book size={20} />}
              path={`/cms/${cms.id}/help`}
              title="Docs"
            />
          </nav>
        )}
      </div>
      {/* Main view */}
      {cms && (
        <div className="h-screen w-full">
          {/* Top bar */}
          <div className="flex h-16 w-full items-center border-b bg-white">
            {/* Active cms */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="flex h-full shrink-0 items-center gap-2 border-r px-4 transition-all hover:bg-zinc-100"
                  onClick={() => router.push("/")}
                >
                  <CmsImage cms={cms} />
                  <span className="font-semibold">{cms.title}</span>
                  <span className="rounded-full border bg-zinc-100 px-2 py-0.5 text-xs font-semibold">
                    Pro
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent>View all CMS</TooltipContent>
            </Tooltip>
            {/* Search */}
            <div className="group flex w-full items-center px-2">
              <Search
                size={20}
                className="text-zinc-400 transition-all group-focus-within:text-black"
              />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
