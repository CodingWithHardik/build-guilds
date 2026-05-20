
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UnlockIcon } from "lucide-react";
import UserDetails from "./userdetails";
import Plan from "./plan";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) return <div>Loading...</div>;
  if (slug !== "preview") {
    return <div>Invalid slug</div>;
  }
  return (
    <div className="p-6 flex flex-row">
      <div className="flex flex-col justify-center m-8 bg-[#071930] rounded-lg p-4 w-full">
        <h1 className="text-7xl font-bold text-white p-4 text-center font-rcfull">
          Edit Build Guild Preview
        </h1>
        <UserDetails />
      </div>
    </div>
  );
}
