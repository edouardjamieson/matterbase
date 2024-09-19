import { useRouter } from "next/router";
import { useCms } from "~/components/core/cms";
import Dashboard from "~/components/core/dashboard";

export default function Page() {
  const router = useRouter();
  const { cms } = useCms();

  return <Dashboard cms={cms}>yo</Dashboard>;
}
