import { Template } from './Template';

interface PreviewProps {
  template: Template;
  variables: Record<string, string>;
}

const render = (template: Template, variables: Record<string, string>) => {
  let result = '';

  template.forEach((token) => {
    if (token.type === 'text') {
      result += token.value;
    } else {
      result += variables[token.name];
    }
  });

  return result;
};

export function Preview({ template, variables }: PreviewProps) {
  return <p>{render(template, variables)}</p>;
}
