# Function Mapper Visualizer
### DMS Mini Project | The National Institute of Engineering, Mysore

---

## Folder Structure

```
FunctionMapperVisualizer/
│
├── public/
│   └── index.html          ← Main HTML entry file
│
├── src/
│   ├── index.js            ← React app entry point
│   ├── App.jsx             ← Main App component (root)
│   │
│   ├── components/
│   │   ├── ControlPanel.jsx   ← Left panel (presets, custom, viewport, inputs)
│   │   ├── GraphCanvas.jsx    ← HTML5 Canvas graph renderer
│   │   ├── MappingTable.jsx   ← Input→Output table container
│   │   └── MappingRow.jsx     ← Single row in mapping table
│   │
│   ├── utils/
│   │   ├── colors.js          ← Color constants
│   │   ├── presets.js         ← Preset function definitions
│   │   ├── safeEval.js        ← Custom expression evaluator
│   │   └── drawCanvas.js      ← Canvas drawing logic
│   │
│   └── styles/
│       └── App.css            ← All CSS styles
│
├── package.json            ← Project dependencies
└── README.md               ← This file
```

---

## Languages & Technologies Used

| Language / Tech  | Purpose                          |
|------------------|----------------------------------|
| JSX (React)      | UI components and structure      |
| JavaScript (ES6) | Logic, math evaluation, state    |
| HTML5 Canvas API | Drawing graphs and curves        |
| CSS3             | Styling and layout               |
| HTML             | Entry point (index.html)         |

---

## How to Run

```bash
# Step 1: Install dependencies
npm install

# Step 2: Start the app
npm start

# App opens at http://localhost:3000
```

---

## DMS Concepts Used

- **Functions** — f(x) maps input x to output f(x)
- **Relations** — ordered pairs (x, f(x)) plotted on graph
- **Domain & Range** — controlled via viewport xMin/xMax and yMin/yMax
- **Set Theory** — sample input set mapped to output set
- **Graph Theory** — Cartesian plane with coordinate curves

---

*Submitted to: Mrs. Savitha Sridharamurthy, Assistant Professor, Dept. of CSE, NIE Mysore*
