export interface MeasurePoint {
  date: Date;
  comment: string;
  take1: Take;
  take2: Take;
  take3: Take;
}

interface Take {
  sys: number;
  dia: number;
  pulse: number;
}

export type NullablePartial<T> = { [P in keyof T]?: T[P] | null };

export type formMeasure = NullablePartial<{
  date: Date;
  comment: string;
  take1: NullablePartial<Take>;
  take2: NullablePartial<Take>;
  take3: NullablePartial<Take>;
}>;

export function isValidMeasure(x: formMeasure): x is MeasurePoint {
  return (
    !!x.date &&
    !!x.take1 &&
    isValidTake(x.take1) &&
    !!x.take2 &&
    isValidTake(x.take2) &&
    !!x.take3 &&
    isValidTake(x.take3) &&
    (!!x.comment || x.comment === '')
  );
}

function isValidTake(x: NullablePartial<Take>): x is Take {
  return !!x.sys && !!x.dia && !!x.pulse; // cannot be 0 values
}
