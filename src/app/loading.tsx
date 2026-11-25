import { MobiusLoader } from "@/components/ui/MobiusLoader";

export default function Loading() {
  return (
    <div className="flex-1 w-full min-h-[70vh] flex flex-col items-center justify-center p-6 bg-paper">
      <MobiusLoader
        variant="general"
        size="lg"
        label="Loading CreatorLab..."
        sublabel="Preparing African creator intelligence workspace"
      />
    </div>
  );
}
