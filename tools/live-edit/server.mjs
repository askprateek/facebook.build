// Live copy editor for index.html. Local dev tool only; not served by the site.
// Usage: node tools/live-edit/server.mjs [path/to/index.html] [port]
import http from 'node:http';
import fs from 'node:fs';
const FILE = process.argv[2] || new URL('../../index.html', import.meta.url).pathname;
const PORT = +process.argv[3] || 4817;
const LOG = new URL('./changelog.md', import.meta.url).pathname;

// Split body into segments; text segments outside script/style/svg are editable.
function segments(src) {
  const bodyAt = src.search(/<body[^>]*>/i);
  const out = []; // {start,end} of editable text cores
  const re = /<[^>]*>/g;
  let pos = bodyAt, skip = null, m;
  re.lastIndex = bodyAt;
  while ((m = re.exec(src))) {
    if (!skip && m.index > pos) addText(pos, m.index);
    const tag = m[0].toLowerCase();
    const open = tag.match(/^<(script|style|svg|textarea|title)\b/);
    if (!skip && open) skip = open[1];
    else if (skip && tag.startsWith('</' + skip)) skip = null;
    pos = re.lastIndex;
  }
  function addText(a, b) {
    const t = src.slice(a, b);
    const lead = t.length - t.trimStart().length, trail = t.length - t.trimEnd().length;
    if (t.trim()) out.push({ start: a + lead, end: b - trail });
  }
  return out;
}

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const unesc = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

const CLIENT = `
<style id="fbt-style">fb-t{outline:1px dashed transparent;border-radius:2px;cursor:text}
fb-t:hover{outline-color:rgba(200,0,0,.45)}fb-t:focus{outline:2px solid #c00;background:rgba(255,230,0,.25)}
#fbt-bar{position:fixed;right:16px;bottom:16px;z-index:99999;font:13px/1.2 system-ui,sans-serif;display:flex;gap:8px;align-items:center;background:#111;color:#fff;padding:8px 10px;border-radius:10px;box-shadow:0 4px 18px rgba(0,0,0,.3)}
#fbt-bar button{font:inherit;background:#e33;color:#fff;border:0;border-radius:6px;padding:6px 12px;cursor:pointer}</style>
<div id="fbt-bar"><span id="fbt-msg">Click any text to edit</span><button id="fbt-save">Save</button></div>
<script id="fbt-script">(()=>{
const els=[...document.querySelectorAll('fb-t')];const orig=new Map();
els.forEach(e=>{e.contentEditable='plaintext-only';e.spellcheck=true;orig.set(e,e.textContent);
 e.addEventListener('click',ev=>{if(e.closest('a'))ev.preventDefault()});
 e.addEventListener('keydown',ev=>{if(ev.key==='Enter'){ev.preventDefault();e.blur()}});
 e.addEventListener('blur',()=>save([e]))});
document.querySelectorAll('a').forEach(a=>a.addEventListener('click',ev=>{if(ev.target.closest('fb-t'))ev.preventDefault()}));
const msg=document.getElementById('fbt-msg');
async function save(list){const edits=list.filter(e=>e.textContent!==orig.get(e)).map(e=>({i:+e.dataset.i,before:orig.get(e),after:e.textContent.replace(/\\u00a0/g,' ')}));
 if(!edits.length){msg.textContent='No unsaved changes';return}
 msg.textContent='Saving…';const r=await fetch('/__save',{method:'POST',body:JSON.stringify(edits)});const j=await r.json();
 if(j.ok){edits.forEach(d=>{const e=els[d.i];orig.set(e,d.after)});msg.textContent='Saved '+new Date().toLocaleTimeString()}
 else{msg.textContent='Error: '+j.error+' — reloading';setTimeout(()=>location.reload(),1500)}}
document.getElementById('fbt-save').onclick=()=>save(els);
})()</script>`;

function render(src) {
  const segs = segments(src);
  let html = '', last = 0;
  segs.forEach((s, i) => { html += src.slice(last, s.start) + `<fb-t data-i="${i}">` + src.slice(s.start, s.end) + '</fb-t>'; last = s.end; });
  html += src.slice(last);
  return html.replace(/<\/body>/i, CLIENT + '</body>');
}

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/__save') {
    let body = ''; req.on('data', c => body += c); req.on('end', () => {
      try {
        const edits = JSON.parse(body);
        let src = fs.readFileSync(FILE, 'utf8');
        const segs = segments(src);
        for (const d of edits) {
          const s = segs[d.i];
          if (!s || unesc(src.slice(s.start, s.end)) !== d.before) throw new Error('page out of date with file');
          if (!d.after.trim()) throw new Error('empty text not allowed (would shift segments)');
        }
        for (const d of [...edits].sort((a, b) => b.i - a.i)) {
          const s = segs[d.i], after = d.after.trim();
          src = src.slice(0, s.start) + esc(after) + src.slice(s.end);
          fs.appendFileSync(LOG, `- ${new Date().toISOString()} [#${d.i}]\n  - before: ${d.before.replace(/\s+/g, ' ')}\n  - after:  ${after.replace(/\s+/g, ' ')}\n`);
        }
        fs.writeFileSync(FILE, src);
        res.writeHead(200, { 'content-type': 'application/json' }); res.end('{"ok":true}');
      } catch (e) { res.writeHead(409, { 'content-type': 'application/json' }); res.end(JSON.stringify({ ok: false, error: e.message })); }
    });
    return;
  }
  if (req.url === '/' || req.url.startsWith('/index.html') || req.url.startsWith('/?')) {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
    return res.end(render(fs.readFileSync(FILE, 'utf8')));
  }
  res.writeHead(404); res.end();
}).listen(PORT, '127.0.0.1', function () { console.log('http://127.0.0.1:' + this.address().port + '/'); });
