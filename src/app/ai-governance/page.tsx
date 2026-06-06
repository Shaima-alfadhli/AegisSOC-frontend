import { AiGovernanceMetricCards } from "@/components/ai-governance/AiGovernanceMetricCards";
import { AiGovernanceWorkspace } from "@/components/ai-governance/AiGovernanceWorkspace";
import { AppShell } from "@/components/layout/AppShell";
import { PageTopBar } from "@/components/layout/PageTopBar";
import {
  aiGovernanceEvents,
  aiGovernanceMetrics,
} from "@/lib/data/aiGovernanceData";

export default function AiGovernancePage() {
  return (
    <AppShell>
      <PageTopBar
        titleKey="pages.aiGovernance.title"
        subtitleKey="pages.aiGovernance.subtitle"
      />

      <AiGovernanceMetricCards m={aiGovernanceMetrics} />

      <AiGovernanceWorkspace events={aiGovernanceEvents} />
    </AppShell>
  );
}
