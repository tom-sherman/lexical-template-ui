import { useState } from 'react';
import { z } from 'zod';

const variablesSchema = z.array(
  z.object({
    name: z.string(),
    type: z.union([z.literal('string'), z.literal('number')]),
  })
);

export type VariablesSchema = z.infer<typeof variablesSchema>;

interface VariablesSchemaInputProps {
  onChange: (schema: VariablesSchema) => void;
}

export function VariablesSchemaInput({ onChange }: VariablesSchemaInputProps) {
  const [hasError, setHasError] = useState(false);
  return (
    <textarea
      className="variables-schema-input"
      style={{ border: hasError ? '5px solid red' : undefined }}
      defaultValue="[]"
      onChange={(event) => {
        try {
          const schema = variablesSchema.parse(JSON.parse(event.target.value));
          setHasError(false);
          onChange(schema);
        } catch (error) {
          setHasError(true);
        }
      }}
    />
  );
}
