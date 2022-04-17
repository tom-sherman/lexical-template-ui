import LexicalComposer from '@lexical/react/LexicalComposer';
import PlainTextPlugin from '@lexical/react/LexicalPlainTextPlugin';
import ContentEditable from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import OnChangePlugin from '@lexical/react/LexicalOnChangePlugin';
import { $getRoot, EditorState, LexicalEditor, TextNode } from 'lexical';
import {
  TemplateVariablePlugin,
  TemplateVariableNode,
  $isTemplateVariableNode,
} from './TemplateVariablePlugin';
import { useCallback } from 'react';
import { Template } from './Template';

const theme = {
  ltr: 'ltr',
  rtl: 'rtl',
  placeholder: 'editor-placeholder',
  paragraph: 'editor-paragraph',
};

const onError = () => {};

export type TemplateInputState =
  | {
      state: 'invalid';
      errors: string[];
    }
  | {
      state: 'valid';
      template: Template;
    };

interface TemplateInputProps {
  onChange: (template: TemplateInputState) => void;
  possibleVariableNames: string[];
}

export function TemplateInput({
  onChange,
  possibleVariableNames,
}: TemplateInputProps) {
  const handleOnChange = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      editorState.read(() => {
        // Read the contents of the EditorState here.
        const root = $getRoot();
        const nodes = root.getAllTextNodes() as (
          | TextNode
          | TemplateVariableNode
        )[];

        let isValid = true;
        const template: Template = [];

        nodes.forEach((node) => {
          if ($isTemplateVariableNode(node)) {
            if (!node.isValidVariableName()) {
              isValid = false;
            }
            const variableName = node.getVariableName();
            template.push({
              name: variableName,
              type: 'variable',
            });
          } else {
            template.push({
              type: 'text',
              value: node.getTextContent(),
            });
          }
        });

        onChange(
          isValid
            ? { state: 'valid', template }
            : { state: 'invalid', errors: [] }
        );
      });
    },
    [onChange]
  );

  return (
    <LexicalComposer
      initialConfig={{ theme, onError, nodes: [TemplateVariableNode] }}
    >
      <div className="editor-container">
        <PlainTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<Placeholder />}
        />
        <OnChangePlugin onChange={handleOnChange} />
        <HistoryPlugin />
        <TemplateVariablePlugin possibleVariableNames={possibleVariableNames} />
      </div>
    </LexicalComposer>
  );
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some text...</div>;
}
