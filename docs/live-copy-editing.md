# Live copy editing

`tools/live-edit/server.mjs` lets you edit the page's text directly in the browser and saves every change straight back into `index.html`. It is a local tool only. The live site never loads it.

## Run

```
node tools/live-edit/server.mjs
```

Then open http://127.0.0.1:4817/. It needs Node 18+ and has no dependencies. Optional arguments: `node tools/live-edit/server.mjs [path/to/index.html] [port]`.

## Edit

- Hover to see editable text outlined. Click it and type.
- Press Enter, click away, or use the floating **Save** button. The change is written to `index.html` right away and stays after a reload.
- Only text changes. Markup, classes and links are preserved. Link text is editable, and clicking it won't follow the link.
- The editor rejects text that has been cleared completely. Reword the text instead of deleting it.
- The outlines and the Save button are added only while the server shows the page. They are never written to `index.html`.
- Every change is logged as before -> after in `tools/live-edit/changelog.md`, which git ignores. Use it to write the PR description.

## Ship

Stop the server with Ctrl-C. Check `git diff index.html` (it should show text changes only), commit on a branch, and open a PR listing the before -> after changes. The first session that used this tool shipped as https://github.com/askprateek/facebook.build/pull/3.
