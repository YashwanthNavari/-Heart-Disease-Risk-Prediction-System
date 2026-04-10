# StrokeGuard AI — How to Run

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

## Steps

### 1. Open a terminal in the project folder

```bash
cd "c:\Naa Projects\ML PBL"
```

### 2. Install dependencies (first time only)

```bash
npm install
```

This installs:
- `react` + `react-dom` — UI framework
- `vite` — fast dev server + bundler
- `recharts` — charting library
- `lucide-react` — icon set

### 3. Start the development server

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

The page hot-reloads automatically whenever you save a file — no manual refresh needed.

---

## Stopping the Server

Press `Ctrl + C` in the terminal.

## Building for Production (optional)

```bash
npm run build
```

Output goes to the `dist/` folder — open `dist/index.html` in any browser.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `npm: command not found` | Install Node.js from https://nodejs.org |
| Port 5173 already in use | Run `npm run dev -- --port 3000` |
| Fonts not loading | Check internet connection (Google Fonts CDN) |
| Blank white screen | Open browser DevTools → Console for errors |
