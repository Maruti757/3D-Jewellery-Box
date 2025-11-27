# 3D Interactive Jewellery Box (A-Frame)
💎 Project Title

3D Interactive Jewellery Box Display using A-Frame (ECS Architecture)

📌 Overview

This project is an interactive 3D jewellery product display built using the A-Frame WebVR framework.
It includes realistic visuals, smooth animations, drag interactions, and a complete ECS-based architecture.

Users can:

Inspect jewellery in an interactive 3D environment

Focus on a ring by clicking

Rotate the ring using drag gestures

Return the ring to its original position using a close button

🎯 Core Features
✅ 1. High-Quality Visuals

Environment lighting using HDRI-style preset (goldmine)

PBR materials on rings (metalness + roughness)

Ambient, directional, and point lighting

Soft shadows for realism

✅ 2. Jewellery Box Setup

The display contains:

A wooden jewellery box

Velvet inner cushion

Three distinct rings:

Gold

Silver/Platinum

Rose Gold

Each ring stores its original position and scale on scene load.

✅ 3. Focus Interaction (Click)

When clicking a ring:

Moves forward and upward smoothly

Scales up for clear viewing

Slightly tilts for premium presentation

Shows a floating, glass-style “Close” button

Locks interaction with other rings during animation

✅ 4. Close Interaction

When clicking “Close”:

Ring returns to its exact stored position

Restores original scale

Resets rotation to face forward

The Close button hides

All interactions reset

✅ 5. Drag-to-Rotate Interaction

Custom A-Frame component (drag-rotate-y):

Works when a ring is focused

Rotates ring around Y-axis only

Rotation is continuous and smooth

Works on both mouse and touch devices

✅ 6. ECS Architecture (Component-Based)

Implemented using custom components:

ringState → Global state system

store-original → Saves start position & scale

ring-focus → Handles ring click interaction

drag-rotate-y → Handles drag rotation logic

No external interaction libraries were used.

🗂️ Project Structure
project/
│
├── index.html
├── README.md
├── css/
│   └── styles.css
└── js/
    └── main.js

🚀 How to Run the Project (VS Code)
Option 1 — Live Server (Recommended)

Open VS Code

Install Live Server extension

Right-click index.html → Open with Live Server

Option 2 — Python server
python -m http.server

Option 3 — Node.js server
npm install -g http-server
http-server


Then open in browser:

http://localhost:5500

💡 Controls
Action	Function
Click Ring	Brings ring forward (focus mode)
Drag Left/Right	Rotates focused ring
Click Close	Returns ring to original position
📦 Technologies Used

A-Frame 1.5.0

JavaScript (Custom ECS components)

HDRI Environment Component

PBR Materials & WebGL lighting

📚 Conclusion

This project demonstrates a complete and visually polished 3D interactive jewellery display built using A-Frame.
It includes realistic lighting, smooth animations, a professional UI, and touch/mouse interactions suitable for modern web experiences.
