import React, { useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Copy, Check, FileText } from 'lucide-react';
import './mp.css';

marked.setOptions({
  breaks: true,
  gfm: true
});

const FORMAL_DEFAULT_MARKDOWN = `# Executive Summary & Systems Documentation

## Project Overview
This document serves as the formal operational framework for the newly deployed **Content Render System**. The core objective is to maximize client-side throughput while maintaining ironclad security paradigms.

### 1. Core Strategic Deliverables:
- **Instantaneous Synchronization:** Live parsing engine built on the Vite standard.
- **Enterprise-Grade Sanitation:** Complete elimination of XSS attack vectors.
- **Cross-Platform Scalability:** Fluid layout responsive across viewport environments.

---

## 2. Technical Specifications
The infrastructure leverages encapsulated modular architectures. For integration protocols, developers must invoke the initialization routine as illustrated below:

\`\`\`javascript
// Formal Initialization Hook Protocol
function initializeRenderEngine(configuration) {
  const status = configuration.isActive ? "Operational" : "Deferred";
  console.log(\`[SYSTEM LOG]: Engine status verified as: \${status}\`);
  return status;
}
\`\`\`

> **Corporate Compliance Directive:** All inline structural logic, such as \`dangerouslySetInnerHTML\`, must remain accompanied by a rigorous sanitization middle-layer without exception.

---

## 3. Operational Timeline & Status
1. Review layout constraints and component state architecture.
2. Execute target dependency installations (\`marked\`, \`dompurify\`).
3. Deploy finalized workspace panels to staging environments.

For further escalations or architectural blueprints, please consult the [Official Technical Repository](https://js.org).

***

*Document Status: Verified and Released for Distribution.*
`;

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(FORMAL_DEFAULT_MARKDOWN);
  const [copied, setCopied] = useState(false);

  const renderMarkdown = () => {
    const rawHtml = marked.parse(markdown);
    return { __html: DOMPurify.sanitize(rawHtml) };
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="mp-container">
      <header className="mp-header">
        <div className="mp-header-title">
          <FileText size={22} color="#58a6ff" />
          <h1>Markdown Live Previewer</h1>
        </div>
        <button onClick={handleCopy} className="mp-copy-btn">
          {copied ? <Check size={14} color="#3fb950" /> : <Copy size={14} />}
          <span>{copied ? 'Copied!' : 'Copy Raw Markdown'}</span>
        </button>
      </header>

      <div className="mp-workspace">
        <div className="mp-panel">
          <div className="mp-panel-header">Editor Workspace</div>
          <textarea
            id="editor"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="mp-textarea"
            placeholder="Type your formal markdown data structure here..."
          />
        </div>

        <div className="mp-panel">
          <div className="mp-panel-header">Render Output</div>
          <div
            id="preview"
            className="mp-preview"
            dangerouslySetInnerHTML={renderMarkdown()}
          />
        </div>
      </div>
    </div>
  );
}
