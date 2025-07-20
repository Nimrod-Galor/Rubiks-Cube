# 3D Interactive Rubik's Cube

A fully interactive 3D Rubik's Cube implementation built with JavaScript and p5.js. This project features realistic 3D cube manipulation, smooth rotations, and an intuitive interface for solving the classic puzzle.

![Rubik's Cube Demo](https://img.shields.io/badge/Status-Working-brightgreen)

## Features

### 🎮 Interactive Controls

- **Mouse Rotation**: Click and drag to rotate the entire cube in 3D space
- **Face Manipulation**: Click on a cube face and drag to rotate that layer
- **Intelligent Direction Detection**: Automatically determines rotation axis based on mouse movement
- **Smooth Animations**: Fluid 90-degree rotations with visual feedback

### 🎯 Visual Features

- **3D Perspective Rendering**: Realistic 3D cube with proper perspective projection
- **Flat Cube View**: Toggle between 3D view and 2D unfolded cube layout
- **Color-Coded Faces**: Standard Rubik's cube colors (White, Red, Blue, Orange, Green, Yellow)
- **Orientation Indicators**: Visual arrows showing X, Y, Z axes
- **Face Visibility Culling**: Only renders visible faces for better performance

### ⚙️ Customization

- **Variable Dimensions**: Support for NxNxN cubes (2x2, 3x3, 4x4, etc.)
- **Auto Shuffle**: Automatic random shuffling with configurable complexity
- **Adjustable Camera**: FOV and position controls
- **Responsive Design**: Adapts to different screen sizes

## Getting Started

### Prerequisites

- Modern web browser with WebGL support
- No additional installations required

### Installation

1. Clone or download the repository:

```bash
git clone https://github.com/Nimrod-Galor/Rubiks-Cube.git
```

2. Open `index.html` in your web browser

3. Start solving!

### File Structure

```
Rubiks-Cube/
├── index.html              # Main HTML file with UI controls
├── main.js                 # Core application logic and event handlers
├── cube.js                 # Cube class with rotation mechanics
├── face.js                 # Face class for individual cube faces
├── Inconsolata_SemiExpanded-Light.ttf  # Font file
└── README.md              # This file
```

## How to Use

### Basic Controls

1. **Rotate the Cube**:

   - Click and drag on empty space to rotate the entire cube
   - Use mouse movement to control rotation speed and direction

2. **Rotate a Layer**:

   - Click on any visible face of the cube
   - Drag in the direction you want to rotate that layer
   - The system automatically detects which axis to rotate around

3. **Menu Controls**:
   - **Dimension**: Change cube size (2x2, 3x3, 4x4, etc.)
   - **Show Cube Flat**: Toggle 2D unfolded view
   - **Reshuffle**: Randomly scramble the cube

### Advanced Features

- **Perspective Projection**: The cube uses realistic 3D perspective
- **Layer Detection**: Smart algorithm determines which layer to rotate based on mouse movement
- **Rotation Constraints**: Prevents multiple simultaneous rotations
- **Visual Feedback**: Real-time updates during rotations

## Technical Implementation

### Core Technologies

- **p5.js**: 3D graphics and WebGL rendering
- **Bootstrap**: UI components and responsive design
- **Vanilla JavaScript**: Core logic and mathematics

### Key Algorithms

#### 3D Rotation Mathematics

- Custom rotation matrices for X, Y, Z axes
- Rodrigues' rotation formula for arbitrary axis rotation
- Perspective projection for 3D-to-2D conversion

#### Face Detection

- Ray-casting algorithm for mouse-face intersection
- Point-in-polygon testing for accurate face selection
- Line intersection algorithms for rotation direction

#### Layer Rotation

- Matrix transformations for face rotations
- Color index shuffling for layer state updates
- Animation interpolation for smooth movements

### Performance Optimizations

- Face culling (only render visible faces)
- Efficient matrix operations
- Minimal DOM manipulations
- Optimized collision detection

## Code Structure

### Classes

#### `Cube`

- Manages overall cube state and dimensions
- Handles face creation and organization
- Controls rotation animations and shuffling
- Manages color schemes and flat view rendering

#### `Face`

- Represents individual cube faces
- Handles 3D transformations and visibility
- Manages color states and rendering
- Implements point-in-polygon detection

### Key Functions

#### Rotation System

```javascript
// Create plane cut for layer rotation
cube.createPlaneCut(axis, direction);

// Rotate entire cube
cube.rotateCube(x, y, z);

// Finalize layer rotation
cube.finalizeCutPlane();
```

#### Mouse Interaction

```javascript
// Detect which face was clicked
cube.detectFaceClicked(x, y);

// Check line intersections for rotation direction
doLinesIntersect(p1, p2, l1, l2);
```

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

Requires WebGL support for 3D rendering.

## Known Issues

- Performance may decrease with very large cube dimensions (>7x7)
- Touch controls not optimized for mobile devices
- Some edge cases in rotation direction detection

## Future Enhancements

- [ ] Touch/mobile support
- [ ] Solving algorithms and hints
- [ ] Timer and move counter
- [ ] Save/load cube states
- [ ] Custom color schemes
- [ ] Sound effects
- [ ] Solver visualization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- p5.js community for excellent 3D graphics capabilities
- Classic Rubik's Cube for the inspiration
- WebGL specification for 3D rendering standards

## Contact

Created by [Nimrod Galor](https://github.com/Nimrod-Galor)

---

**Enjoy solving! 🧩**
