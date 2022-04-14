export interface TemplateTextToken {
  type: 'text';
  value: string;
}

export interface TemplateVariableToken {
  type: 'variable';
  name: string;
}

export type TemplateToken = TemplateTextToken | TemplateVariableToken;

export type Template = TemplateToken[];

export const emptyTemplate: Template = [];
