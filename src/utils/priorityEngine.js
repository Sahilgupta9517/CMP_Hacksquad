// JanConnect AI — Priority Calculation Engine
// Formula: Priority Score = (40% Complaint Frequency) + (25% Infrastructure Gap) + (20% Population Impact) + (15% Urgency)

export function calculatePriorityScore({
  complaintFrequency = 0, // 0 - 100
  infrastructureGap = 0,   // 0 - 100
  populationImpact = 0,    // 0 - 100
  urgencyScore = 0         // 0 - 100
}) {
  const w1 = 0.40;
  const w2 = 0.25;
  const w3 = 0.20;
  const w4 = 0.15;

  const c1 = complaintFrequency * w1;
  const c2 = infrastructureGap * w2;
  const c3 = populationImpact * w3;
  const c4 = urgencyScore * w4;

  const totalScore = Math.min(100, Math.max(0, Math.round(c1 + c2 + c3 + c4)));

  return {
    score: totalScore,
    breakdown: {
      complaintFrequency: {
        weight: '40%',
        raw: complaintFrequency,
        contribution: Number(c1.toFixed(1))
      },
      infrastructureGap: {
        weight: '25%',
        raw: infrastructureGap,
        contribution: Number(c2.toFixed(1))
      },
      populationImpact: {
        weight: '20%',
        raw: populationImpact,
        contribution: Number(c3.toFixed(1))
      },
      urgency: {
        weight: '15%',
        raw: urgencyScore,
        contribution: Number(c4.toFixed(1))
      }
    }
  };
}
