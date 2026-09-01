'use client';

import { Input } from '@/components';
import { FilmParameters } from '@/utils';
import { useState } from 'react';

interface Props {
  paramKey: keyof FilmParameters;
  step: number;
  min: number;
  max: number;
  value: number;
  setValue: (paramKey: keyof FilmParameters, value: string) => void;
}

export const LegalInput = ({
  paramKey,
  step,
  min,
  max,
  value,
  setValue,
}: Props) => {
  const [input, setInput] = useState(String(value));

  return (
    <Input
      id={paramKey}
      type="number"
      step={step}
      min={min}
      max={max}
      value={input}
      onChange={e => setInput(e.target.value)}
      onBlur={() => {
        if (input === '') {
          setValue(paramKey, String(value));
          return;
        }

        const number = Number(input);

        const clamped = Math.min(max, Math.max(min, number));

        setInput(String(clamped));
        setValue(paramKey, String(clamped));
      }}
    />
  );
};
