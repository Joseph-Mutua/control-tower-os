import { shipments } from "@cxtms/shared";

export interface CopilotAnswer {
  prompt: string;
  answer: string;
  citedReferences: string[];
}

export function answerCopilotPrompt(prompt: string, shipmentId?: string): CopilotAnswer {
  const normalizedPrompt = prompt.toLowerCase();
  const selectedShipment = shipments.find((shipment) => shipment.id === shipmentId) ?? shipments[0];

  if (normalizedPrompt.includes("why is this shipment red")) {
    return {
      prompt,
      answer: `${selectedShipment.reference} is flagged because its risk score is ${selectedShipment.riskScore}, it has ${selectedShipment.exceptions.length} open exception(s), and the predicted ETA is ${selectedShipment.delayHours} hours behind plan. The top recommendation is ${selectedShipment.recommendations[0]?.title ?? "manual review"}.`,
      citedReferences: [selectedShipment.reference]
    };
  }

  if (normalizedPrompt.includes("next 24 hours")) {
    const atRisk = shipments.filter((shipment) => shipment.riskScore >= 60);
    return {
      prompt,
      answer: `${atRisk.length} loads are at risk in the next 24 hours. The most exposed references are ${atRisk.map((shipment) => shipment.reference).join(", ")}. Ocean and air moves are carrying the highest SLA breach pressure.`,
      citedReferences: atRisk.map((shipment) => shipment.reference)
    };
  }

  const highRiskCustomers = Array.from(new Set(shipments.filter((shipment) => shipment.slaState !== "healthy").map((shipment) => shipment.customer)));
  return {
    prompt,
    answer: `The current risk picture is concentrated around ${highRiskCustomers.join(", ")}. Use the action queue to prioritize customs escalation, rebooking, and consignee notification workflows.`,
    citedReferences: highRiskCustomers
  };
}
