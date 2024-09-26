import { Github } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getServerAuthSession } from "~/server/auth";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);
  if (session) return { redirect: { destination: "/cms" } };

  return { props: { session } };
}

export default function Page() {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-zinc-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome back 👋</CardTitle>
          <CardDescription>
            Sign in using one of the providers below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <button
            onClick={() => signIn("github")}
            type="button"
            className="relative w-full rounded-lg border bg-zinc-900 px-2 py-1.5"
          >
            <Github
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white"
              size={20}
            />
            <span className="font-medium text-white">Github</span>
          </button>
        </CardContent>
      </Card>
    </main>
  );
}
