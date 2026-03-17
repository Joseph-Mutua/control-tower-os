import { useEffect, useState } from "react";
import type { ShipmentDetail } from "@cxtms/shared";

interface OpsCopilotProps {
  shipment: ShipmentDetail;
  shipments: ShipmentDetail[];
}

const prompts = [
  "Why is this shipment red?",
  "Show loads at risk in the next 24 hours.",
  "Which customers have the most SLA breach exposure today?"
] as const;

function answerPrompt(prompt: string, shipment: ShipmentDetail, shipments: ShipmentDetail[]) {
  if (prompt === prompts[0]) {
    return `${shipment.reference} is red because it carries a ${shipment.riskScore} risk score, has ${shipment.exceptions.length} open exception(s), and is predicted ${shipment.delayHours} hours behind plan. The best next step is ${shipment.recommendations[0]?.title ?? "manual review"}.`;
  }

  if (prompt === prompts[1]) {
    const atRisk = shipments.filter((item) => item.riskScore >= 60);
    return `${atRisk.length} loads are likely to need intervention in the next 24 hours: ${atRisk.map((item) => item.reference).join(", ")}. Prioritize ocean customs blockers and the missed air handoff.`;
  }

  const customers = shipments
    .filter((item) => item.slaState !== "healthy")
    .map((item) => item.customer)
    .filter((value, index, list) => list.indexOf(value) === index);

  return `${customers.join(", ")} have the highest breach exposure today. Apex Retail is concentrated on customs and lane delays, while BlueTrail Pharma is exposed to a missed cold-chain handoff.`;
}

export function OpsCopilot({ shipment, shipments }: OpsCopilotProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<(typeof prompts)[number]>(prompts[0]);
  const [answer, setAnswer] = useState(answerPrompt(prompts[0], shipment, shipments));

  useEffect(() => {
    setAnswer(answerPrompt(selectedPrompt, shipment, shipments));
  }, [selectedPrompt, shipment, shipments]);

  return (
    <section className="panel">
      <div className="panel-head">
        <p>MCP Copilot</p>
        <h2>Audited operational guidance for live exception triage.</h2>
      </div>
      <div className="copilot-stack">
        <div className="chip-row">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              className={selectedPrompt === prompt ? "chip active" : "chip"}
              type="button"
              onClick={() => setSelectedPrompt(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
        <article className="copilot-answer">
          <strong>{selectedPrompt}</strong>
          <span>{answer}</span>
        </article>
      </div>
    </section>
  );
}
