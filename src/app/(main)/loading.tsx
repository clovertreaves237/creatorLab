import { MobiusLoader } from "@/components/ui/MobiusLoader";

export default function MainLoading() {
  return (
    <div className="flex-1 w-full min-h-[60vh] flex flex-col items-center justify-center p-6">
      <MobiusLoader
        variant="general"
        size="lg"
        label="Loading..."
        sublabel="Synchronizing curated intelligence"
      />
    </div>
  );
}
