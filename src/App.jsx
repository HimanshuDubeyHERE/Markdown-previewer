import { useState } from 'react';
import{Marked} from 'marked';
import DOMPurify from 'dompurify';


export default function App() {

  const[code , setCode] = useState('# Write your Markdown here!');
  const getRawHtml =() => {
    const rawHtml= marked.parse(code);
    return DOMPurify.sanitize(rawHtml);

  }
}  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px', height: '80vh' }}>
      
      {/* The Editor Panel */}
      <textarea
        style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      {/* The Live Preview Panel */}
      <div
        style={{ flex: 1, padding: '10px', border: '1px solid #ccc', overflowY: 'auto' }}
        dangerouslySetInnerHTML={{ __html: getRawHtml() }}
      />
      
    </div>
  );
}