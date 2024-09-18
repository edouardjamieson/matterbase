"use client";
import {
  ChevronDown,
  Database,
  File,
  Home,
  LayoutDashboard,
  PanelRightOpen,
  Settings,
  Sidebar,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { ReactElement, ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn, string2Color } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Cms } from "@prisma/client";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { useCms } from "./cms";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export interface DashboardProps {
  children: ReactNode[] | ReactNode;
  cms?: Cms;
}

export interface DashboardNavButtonProps {
  icon?: ReactElement;
  title: string;
  path: string;
  asAccordion?: boolean;
}

export default function Dashboard({ children, cms }: DashboardProps) {
  const router = useRouter();
  const path = usePathname();
  const cmsData = useCms();

  const mainSideNav = [
    {
      id: "home",
      path: "/",
      name: "Home",
      icon: <Home />,
    },
    {
      id: "cms",
      path: "/cms",
      name: "CMS",
      icon: <Database />,
    },
  ];

  const CMSNavButton = ({
    path,
    title,
    icon,
  }: {
    icon?: ReactElement;
    title: string;
    path: string;
  }) => {
    const active = cmsData.getCurrentRoute() == path;
    const route = cmsData.buildCmsRoute(path);

    return (
      <button
        type="button"
        onClick={() => router.push(route)}
        className={cn("flex items-center gap-4 px-4 py-3 transition-all", {
          "bg-zinc-900 text-white": active,
          "hover:bg-zinc-200": !active,
        })}
      >
        {icon &&
          React.cloneElement(icon, {
            className: cn("text-zinc-400", { "text-white": active }),
            size: 20,
          })}
        <span
          className={cn("text-sm font-semibold", {
            "font-bold": active,
          })}
        >
          {title}
        </span>
      </button>
    );
  };

  return (
    <main className="flex h-screen w-screen items-start bg-white">
      {/* Primary Sidebar */}
      <div className="flex h-screen w-16 shrink-0 flex-col items-center border-r bg-zinc-100 py-4">
        <Image
          src={"/images/logo-black-vertical.svg"}
          width={500}
          height={500}
          alt="logo"
          className="w-1/4 opacity-60 transition-all hover:opacity-100"
        />
      </div>
      {/* CMS Sidebar */}
      {cmsData.cms && (
        <div className="flex h-screen min-w-[250px] shrink-0 flex-col border-r bg-zinc-100">
          {/* Cms */}
          <button
            type="button"
            className="group flex h-16 w-full items-center justify-between border-b transition-all hover:bg-zinc-200"
          >
            <div className="flex items-center px-4">
              <span className="text-2xl">🚀</span>
              <span className="ml-2 text-sm font-bold">
                {cmsData.cms.title}
              </span>
            </div>

            <ChevronDown
              size={18}
              className="mx-4 shrink-0 transition-all group-hover:translate-y-1"
            />
          </button>
          {/* Nav */}
          <div className="flex w-full flex-col">
            {/* Dashboard */}
            <CMSNavButton
              path="/"
              icon={<LayoutDashboard />}
              title="Overview"
            />
            {/* Settings */}
            <CMSNavButton
              path="/settings"
              icon={<Settings />}
              title="Settings"
            />
            {/* Templates */}
            <CMSNavButton
              path="/entries?template=123"
              icon={<span>📝</span>}
              title="Pages"
            />
            <CMSNavButton
              path="/entries?template=456"
              icon={<span>🧩</span>}
              title="Items"
            />
            <CMSNavButton
              path="/entries?template=789"
              icon={<span>✏️</span>}
              title="Articles"
            />
          </div>
        </div>
      )}

      {/* CMS bar */}
      {/* {cmsData.cms && (
        <div className="h-screen border-r">
          <div className="flex h-16 w-full items-center border-b pl-4 pr-8">
            <span className="text-3xl">🚀</span>
            <div className="ml-4 flex flex-col items-start">
              <Badge variant={"color"}>Pro</Badge>
              <span className="text-sm font-bold">{cmsData.cms.title}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4">
            <NavButton path="/" title="yo" icon={<File />} />
          </div>
        </div>
      )} */}
      <div className="h-screen w-full overflow-auto">{children}</div>
    </main>
  );
}
