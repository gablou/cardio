export interface MeasurePoint {
  date?: Date | null;
  comment?: string | null;
  take1?: Take;
  take2?: Take;
  take3?: Take;
}

interface Take {
  sys?: number | null;
  dia?: number | null;
  pulse?: number | null;
}
