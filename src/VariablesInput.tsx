import { useState } from 'react';

interface VariablesInputProps {
  possibleVariableNames: string[];
  onChange: (variables: Record<string, string>) => void;
}

export function VariablesInput({
  possibleVariableNames,
  onChange,
}: VariablesInputProps) {
  const [hasError, setHasError] = useState('');
  const [variables, setVariables] = useState<Record<string, string>>({});

  return possibleVariableNames.length === 0 ? (
    <p>No variables</p>
  ) : (
    <ul>
      {possibleVariableNames.map((variable) => (
        <li key={variable}>
          {variable}:{' '}
          <input
            onChange={(event) => {
              const value = event.target.value;

              const newVariables = {
                ...variables,
                [variable]: value,
              };

              setVariables(newVariables);
              onChange(newVariables);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
