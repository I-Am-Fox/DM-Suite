import { LoadingState } from "@/components/ui/state-views";

export default function AppLoading() {
  return (
    <div className="content-wrap">
      <LoadingState
        title="Loading workspace"
        body="Fetching campaign navigation and session context."
      />
    </div>
  );
}
