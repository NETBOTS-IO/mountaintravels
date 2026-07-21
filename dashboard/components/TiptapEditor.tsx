"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useEffect } from "react";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  onImageUpload?: (file: File) => Promise<string | null>;
}

export default function TiptapEditor({
  content,
  onChange,
  onImageUpload,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ allowBase64: false }),
      Placeholder.configure({
        placeholder: "Start writing your blog post here...",
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addImage = useCallback(async () => {
    if (!onImageUpload || !editor) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event: any) => {
      const file = event.target.files?.[0];
      if (file) {
        const url = await onImageUpload(file);
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      }
    };
    input.click();
  }, [editor, onImageUpload]);

  useEffect(() => {
    if (!editor || content === undefined) return;
    const currentHTML = editor.getHTML();
    if (
      content !== currentHTML &&
      !(content === "" && currentHTML === "<p></p>")
    ) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 6,
          padding: 16,
          minHeight: 300,
          background: "#fafafa",
          color: "#aaa",
        }}
      >
        Loading editor...
      </div>
    );
  }

  const btnBase: React.CSSProperties = {
    padding: "4px 8px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
  };

  const activeStyle: React.CSSProperties = {
    ...btnBase,
    background: "#e0e7ff",
    borderColor: "#6366f1",
  };

  const menuStyle: React.CSSProperties = {
    display: "flex",
    gap: 4,
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 6,
    boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
    padding: "4px 6px",
    alignItems: "center",
  };

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        overflow: "visible",
        background: "#fff",
      }}
    >
      {/* Static Toolbar */}
      <div
        style={{
          ...menuStyle,
          borderRadius: "8px 8px 0 0",
          borderBottom: "1px solid #e5e7eb",
          boxShadow: "none",
          borderLeft: 0,
          borderRight: 0,
          borderTop: 0,
          borderBottomWidth: 1,
        }}
      >
        <button
          type="button"
          style={editor.isActive("bold") ? activeStyle : btnBase}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          style={
            editor.isActive("italic")
              ? { ...activeStyle, fontStyle: "italic" }
              : { ...btnBase, fontStyle: "italic" }
          }
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          style={
            editor.isActive("strike")
              ? { ...activeStyle, textDecoration: "line-through" }
              : { ...btnBase, textDecoration: "line-through" }
          }
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strike"
        >
          S
        </button>
        <span
          style={{
            width: 1,
            background: "#e5e7eb",
            margin: "0 4px",
            alignSelf: "stretch",
          }}
        />
        <button
          type="button"
          style={
            editor.isActive("heading", { level: 1 }) ? activeStyle : btnBase
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          style={
            editor.isActive("heading", { level: 2 }) ? activeStyle : btnBase
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          style={
            editor.isActive("heading", { level: 3 }) ? activeStyle : btnBase
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          title="Heading 3"
        >
          H3
        </button>
        <span
          style={{
            width: 1,
            background: "#e5e7eb",
            margin: "0 4px",
            alignSelf: "stretch",
          }}
        />
        <button
          type="button"
          style={editor.isActive("bulletList") ? activeStyle : btnBase}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          style={editor.isActive("orderedList") ? activeStyle : btnBase}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Ordered List"
        >
          1. List
        </button>
        <button
          type="button"
          style={editor.isActive("blockquote") ? activeStyle : btnBase}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Blockquote"
        >
          ❝
        </button>
        <span
          style={{
            width: 1,
            background: "#e5e7eb",
            margin: "0 4px",
            alignSelf: "stretch",
          }}
        />
        <button
          type="button"
          style={btnBase}
          onClick={addImage}
          title="Insert Image"
        >
          🖼 Image
        </button>
      </div>

      {/* Bubble Menu — shows on text selection */}
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div style={menuStyle}>
          <button
            type="button"
            style={editor.isActive("bold") ? activeStyle : btnBase}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            B
          </button>
          <button
            type="button"
            style={editor.isActive("italic") ? activeStyle : btnBase}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <i>I</i>
          </button>
          <button
            type="button"
            style={editor.isActive("strike") ? activeStyle : btnBase}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <s>S</s>
          </button>
        </div>
      </BubbleMenu>

      {/* Editor Area */}
      <div style={{ minHeight: 320, padding: "16px 20px" }}>
        <style>{`
          .tiptap-editor .tiptap:focus { outline: none; }
          .tiptap-editor .tiptap p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #aaa;
            pointer-events: none;
            height: 0;
          }
          .tiptap-editor .tiptap h1 { font-size: 2em; font-weight: bold; margin: 0.5em 0; }
          .tiptap-editor .tiptap h2 { font-size: 1.5em; font-weight: bold; margin: 0.5em 0; }
          .tiptap-editor .tiptap h3 { font-size: 1.2em; font-weight: bold; margin: 0.5em 0; }
          .tiptap-editor .tiptap p { margin: 0.4em 0; line-height: 1.7; }
          .tiptap-editor .tiptap ul { list-style: disc; padding-left: 1.5em; margin: 0.4em 0; }
          .tiptap-editor .tiptap ol { list-style: decimal; padding-left: 1.5em; margin: 0.4em 0; }
          .tiptap-editor .tiptap blockquote { border-left: 3px solid #6366f1; padding-left: 1em; color: #555; margin: 0.8em 0; }
          .tiptap-editor .tiptap img { max-width: 100%; border-radius: 6px; margin: 0.5em 0; }
          .tiptap-editor .tiptap strong { font-weight: bold; }
          .tiptap-editor .tiptap em { font-style: italic; }
          .tiptap-editor .tiptap s { text-decoration: line-through; }
        `}</style>
        <div className="tiptap-editor">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
