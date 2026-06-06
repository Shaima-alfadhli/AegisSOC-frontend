import { AppShell } from "@/components/layout/AppShell";
import { PageTopBar } from "@/components/layout/PageTopBar";
import { IncidentSummaryCards } from "@/components/incidents/IncidentSummaryCards";
import { IncidentsWorkspace } from "@/components/incidents/IncidentsWorkspace";
import { api } from "@/lib/api";

export default async function Incidents() {
  const incidents = await api.incidents();

  return (
    <AppShell>
      <PageTopBar
        titleKey="pages.incidents.title"
        subtitleKey="pages.incidents.subtitle"
      />

      <IncidentSummaryCards />

      <IncidentsWorkspace incidents={incidents} />
    </AppShell>
  );
}
