import { useState } from 'react';
import './App.css';
import { Preview } from './Preview';
import { emptyTemplate, Template } from './Template';
import { TemplateInput, TemplateInputState } from './TemplateInput';
import { VariablesInput } from './VariablesInput';
import { VariablesSchemaInput } from './VariablesSchemaInput';

function App() {
  const [template, setTemplate] = useState<TemplateInputState>({
    state: 'valid',
    template: emptyTemplate,
  });
  const [possibleVariableNames, setPossibleVariableNames] = useState<string[]>(
    []
  );
  const [variables, setVariables] = useState<Record<string, string>>({});

  return (
    <div className="App">
      <h2>Template: </h2>
      <TemplateInput
        onChange={setTemplate}
        possibleVariableNames={possibleVariableNames}
      />
      <h2>Variables schema:</h2>
      <VariablesSchemaInput
        onChange={(schema) => {
          setPossibleVariableNames(schema.map((v) => v.name));
        }}
      />
      <h2>Variable values:</h2>
      <VariablesInput
        possibleVariableNames={possibleVariableNames}
        onChange={setVariables}
      />
      <h2>Preview:</h2>
      {template.state === 'valid' ? (
        <Preview template={template.template} variables={variables} />
      ) : (
        <p style={{ color: 'red' }}>Invalid template</p>
      )}
    </div>
  );
}

export default App;
