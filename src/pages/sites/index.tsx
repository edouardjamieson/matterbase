import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Dashboard from "~/components/core/dashboard";
import CreateCmsForm from "~/components/forms/create-cms-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

export default function Page() {
  const router = useRouter();
  const session = useSession({
    required: true,
  });

  const [dialog, setDialog] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  return (
    <Dashboard
      cms={null}
      session={session.data!}
      requiresCms={false}
      header={{
        title: "All sites",
        buttons: (
          <>
            <Button
              type="button"
              size={"sm"}
              onClick={() => setDialog("create_site")}
            >
              Create new site
            </Button>
          </>
        ),
      }}
    >
      <h1>yo</h1>

      <CreateCmsForm
        visible={dialog == "create_site"}
        onCancel={() => setDialog("")}
      />

      {/* <Dialog open={dialog == "create_site"} onOpenChange={() => setDialog("")}>
        <DialogContent className="w-[400px]">
          <DialogHeader>
            <DialogTitle>Create new site</DialogTitle>
          </DialogHeader>
          <CreateCmsForm
            loading={formLoading}
            onSubmit={() => setFormLoading(true)}
          />
        </DialogContent>
      </Dialog> */}
    </Dashboard>
  );
}
