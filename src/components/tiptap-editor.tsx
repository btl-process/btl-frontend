import "./styles.css";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Undo,
  Redo,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Minus,
  RefreshCcw,
  Pilcrow,
} from "lucide-react";

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const buttonClass = (isActive: boolean) =>
    `p-2 rounded transition-colors border border-gray-200 ${
      isActive
        ? "bg-[#182A76] text-white"
        : "bg-white hover:bg-gray-100 text-[#182A76]"
    }`;

  return (
    <div className="overflow-x-auto py-4">
      <div className="flex flex-wrap gap-2 items-center">
        {/* Estilo de texto */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editor.isActive("bold"))}
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editor.isActive("italic"))}
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={buttonClass(editor.isActive("strike"))}
        >
          <Strikethrough size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={buttonClass(editor.isActive("code"))}
        >
          <Code size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className={buttonClass(false)}
        >
          <RefreshCcw size={18} />
        </button>

        {/* Párrafo */}
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={buttonClass(editor.isActive("paragraph"))}
          style={{ transform: "scaleX(-1)" }}
        >
          <Pilcrow size={18} />
        </button>

        {/* Encabezados */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={buttonClass(editor.isActive("heading", { level: 1 }))}
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={buttonClass(editor.isActive("heading", { level: 2 }))}
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={buttonClass(editor.isActive("heading", { level: 3 }))}
        >
          <Heading3 size={18} />
        </button>

        {/* Listas y citas */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonClass(editor.isActive("bulletList"))}
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buttonClass(editor.isActive("orderedList"))}
        >
          <ListOrdered size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={buttonClass(editor.isActive("blockquote"))}
        >
          <Quote size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={buttonClass(false)}
        >
          <Minus size={18} />
        </button>

        {/* Deshacer / Rehacer */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className={buttonClass(false)}
        >
          <Undo size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={buttonClass(false)}
        >
          <Redo size={18} />
        </button>
      </div>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({}),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const contentRCEv1 = `
RCE DAÑOS
<p>Santiago de Cali, xxx de xxxx del 2024</p>
<br />
<p>Señores:</p>
<p>xxxxxxxxxxxxxxxxxxxxxxxxx</p>
<p>NIT. xxxxxxxxxxxxxxxx</p>
<p>CORREO Xxxxxxxxxxxxxx</p>
<p>Bogotá D.C.</p>
<br />
`;

const contentRCEv2 = `
RCE HURTO
<p>Santiago de Cali, xxx de xxxx del 2024</p>
<br />
<p>Señores:</p>
<p>xxxxxxxxxxxxxxxxxxxxxxxxx</p>
<p>NIT. xxxxxxxxxxxxxxxx</p>
<p>CORREO Xxxxxxxxxxxxxx</p>
<p>Bogotá D.C.</p>
<br />
`;

const TiptapEditor = ({
    caseType
} : {
    caseType?: string
}) => {
  const content =
    caseType === "RCE-DANOS"
      ? contentRCEv1
      : caseType === "RCE-HURTO"
      ? contentRCEv2
      : "";
  return (
    <div className="w-full max-h-[500px] overflow-y-auto">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
      ></EditorProvider>
    </div>
  );
};

export default TiptapEditor;
