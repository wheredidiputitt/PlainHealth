export type SampleId = "blood" | "prescription" | "doctor";

export interface SampleReport {
  id: SampleId;
  label: string;
  shortLabel: string;
  description: string;
  icon: "droplet" | "pill" | "stethoscope";
  content: string;
}

export const SAMPLE_REPORTS: Record<SampleId, SampleReport> = {
  blood: {
    id: "blood",
    label: "Blood Test",
    shortLabel: "Blood Test",
    description: "CBC, lipid panel, metabolic panel",
    icon: "droplet",
    content: `CBC RESULTS:
Hemoglobin: 9.8 g/dL (Ref: 12.0-15.5)
MCV: 76 fL (Ref: 80-100)
MCH: 24 pg (Ref: 27-33)
WBC: 6.2 K/uL (Normal)
Platelets: 245 K/uL (Normal)
Ferritin: 8 ng/mL (Ref: 15-150)
Iron: 38 ug/dL (Ref: 50-170)

Impression: Mild microcytic hypochromic anemia, consistent with iron deficiency anemia.
Recommend iron studies and clinical correlation. Consider oral iron supplementation and dietary counseling.`,
  },
  prescription: {
    id: "prescription",
    label: "Prescription",
    shortLabel: "Prescription",
    description: "Medications, dosages, instructions",
    icon: "pill",
    content: `Rx: Ferrous sulfate 325 mg
Sig: 1 cap PO BID with meals
Disp: #60
Refills: 3

Rx: Vitamin C 500 mg
Sig: 1 tab PO QD
Disp: #30
Refills: 1

Notes: Take with food to minimize GI upset. Recheck CBC in 8 weeks. Avoid dairy/calcium within 2 hours of iron dose. Follow up in clinic PRN.`,
  },
  doctor: {
    id: "doctor",
    label: "Doctor's Note",
    shortLabel: "Doctor's Note",
    description: "Discharge summaries, visit notes",
    icon: "stethoscope",
    content: `DISCHARGE SUMMARY
Admission Dx: Community-acquired pneumonia
Dx at Discharge: CAP, improving
HPI: 54yo M with PMHx of HTN, T2DM, presented with 5-day fever, productive cough, dyspnea on exertion. CXR showed RLL infiltrate. Started on ceftriaxone + azithromycin, clinically improved.

Hospital Course: Day 1-3 IV antibiotics, transitioned to PO azithromycin day 4. Afebrile x 24h. SpO2 96% on RA. Tolerating diet.

Discharge Meds:
- Azithromycin 500 mg PO QD x 5 days (day 3 of 5)
- Metformin 1000 mg PO BID
- Lisinopril 10 mg PO QD
- Aspirin 81 mg PO QD

Follow-up: PCP in 5-7 days. Pulmonary clinic PRN. Return if fever recurs or dyspnea worsens.`,
  },
};

export const SAMPLE_LIST: SampleReport[] = [
  SAMPLE_REPORTS.blood,
  SAMPLE_REPORTS.prescription,
  SAMPLE_REPORTS.doctor,
];

export function getRandomSample(exclude?: SampleId): SampleReport {
  const pool = SAMPLE_LIST.filter((s) => s.id !== exclude);
  if (pool.length === 0) return SAMPLE_LIST[0];
  return pool[Math.floor(Math.random() * pool.length)];
}
