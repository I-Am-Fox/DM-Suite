import { LoadingState } from "@/components/ui/state-views";

export default function SessionPrepLoading() {
  return (
    <div className="content-wrap">
      <LoadingState
        title="Loading session prep"
        body="Fetching prep blocks, linked world context, and reminders."
      />
    </div>
  );
}
