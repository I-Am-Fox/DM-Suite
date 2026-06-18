import { requireCurrentUser } from "@/application/auth/session";
import { PageHeader } from "@/components/ui/page-header";

export default async function AccountPage() {
  const user = await requireCurrentUser();

  return (
    <div className="content-wrap">
      <PageHeader
        eyebrow="Account"
        title="Profile and data controls"
        description="Account settings are represented early so auth, exports, and deletion have visible product paths without adding backend systems prematurely."
      />

      <section className="grid grid-2">
        <div className="card">
          <h2>Profile</h2>
          <div className="form-stack">
            <label className="field">
              <span>Name</span>
              <input className="input focus-ring" defaultValue={user.name} />
            </label>
            <label className="field">
              <span>Email</span>
              <input className="input focus-ring" defaultValue={user.email} />
            </label>
            <button className="button button-disabled" disabled type="button">
              Save after auth integration
            </button>
          </div>
        </div>

        <div className="card">
          <h2>Export and deletion path</h2>
          <p>
            Export and account deletion are intentionally visible from the start. The final
            implementation must generate exports server-side and verify ownership before deletion.
          </p>
          <div className="button-row">
            <button className="button button-disabled" disabled type="button">
              Request account export
            </button>
            <button className="button button-danger button-disabled" disabled type="button">
              Delete account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
