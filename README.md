# Battle Royale Game - Free Fire Style

A web-based battle royale game inspired by Free Fire, built with HTML5, CSS3, and JavaScript. Features mobile-friendly controls, real-time gameplay, and modern UI design.

## 🎮 Game Features

### Core Gameplay
- **Battle Royale Mode**: 50 players fighting for survival
- **Real-time Combat**: Shooting mechanics with hit detection
- **Movement System**: Smooth character movement with joystick/keyboard controls
- **Health & Armor**: Dynamic health and armor system
- **Ammunition Management**: Reload mechanics and ammo tracking
- **Minimap**: Real-time player and enemy tracking

### Controls
#### Desktop (Keyboard & Mouse)
- **Movement**: WASD or Arrow Keys
- **Shoot**: Left Mouse Button (hold for auto-fire)
- **Reload**: R key
- **Jump**: Spacebar
- **Crouch**: C key

#### Mobile (Touch Controls)
- **Movement**: Virtual joystick (bottom-left)
- **Shoot**: Fire button (bottom-right)
- **Jump**: Jump button
- **Crouch**: Crouch button
- **Reload**: Reload button

### UI Features
- **Main Menu**: Modern gaming interface with animated background
- **Settings**: Graphics, controls, and audio customization
- **Statistics**: Player performance tracking
- **HUD Elements**: 
  - Live player count
  - Game timer
  - Safe zone indicator
  - Health/armor bars
  - Weapon info
  - Quick inventory

## 🚀 How to Run

### Option 1: Direct Browser Access
1. Open `index.html` in any modern web browser
2. Click "PLAY NOW" to start the game

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎯 How to Play

1. **Start the Game**: Click "PLAY NOW" from the main menu
2. **Movement**: 
   - Desktop: Use WASD keys or virtual joystick
   - Mobile: Drag the virtual joystick on screen
3. **Combat**: 
   - Desktop: Click and hold to shoot
   - Mobile: Tap and hold the fire button
4. **Survival**: Eliminate enemies while maintaining your health and armor
5. **Ammunition**: Watch your ammo count and reload when necessary

## ⚙️ Game Settings

### Graphics Options
- **Quality**: Low, Medium, High
- **FPS Limit**: 30, 60, 120 FPS

### Control Options
- **Sensitivity**: 1-10 scale for movement sensitivity
- **Auto-Fire**: Toggle automatic firing when holding fire button

### Audio Options
- **Master Volume**: 0-100%
- **Sound Effects**: Enable/disable game sounds

## 📱 Mobile Compatibility

The game is fully optimized for mobile devices with:
- Responsive design for all screen sizes
- Touch-friendly controls
- Optimized performance for mobile browsers
- Gesture prevention (zoom, context menu)

## 🏗️ Technical Details

### Built With
- **HTML5 Canvas**: For game rendering
- **CSS3**: Modern styling with animations
- **Vanilla JavaScript**: ES6+ features, no external dependencies
- **Responsive Design**: Mobile-first approach

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎮 Game Mechanics

### Player System
- Health: 100 HP
- Armor: 100 AP (absorbs damage before health)
- Speed: 3 units/frame (reduced when crouching)
- Ammo: 30 rounds per magazine, 120 total

### Combat System
- Fire Rate: 100ms between shots
- Damage: 25 HP per hit
- Range: 100 pixel radius for hit detection
- Muzzle Flash: Visual feedback for shooting

### Enemy AI
- Random movement patterns
- Direction changes every 2 seconds
- Boundary collision detection
- Health system (100 HP)

### Game Flow
- 50 players start alive
- Players are eliminated over time
- Game timer tracks match duration
- Real-time UI updates

## 🔧 Customization

### Adding New Features
The code is modular and easy to extend:

1. **New Weapons**: Modify the `Player` class
2. **Map Elements**: Update the `renderBackground()` method
3. **Enemy Types**: Extend the `Enemy` class
4. **UI Elements**: Add to the HTML and update CSS

### Performance Optimization
- Adjustable FPS limits in settings
- Canvas size optimization
- Efficient rendering pipeline
- Mobile-optimized controls

## 🐛 Known Issues

- Enemy AI is basic (random movement only)
- No multiplayer networking (single-player simulation)
- Limited weapon variety
- Simple graphics (can be enhanced with sprites)

## 🚀 Future Enhancements

- Multiplayer support with WebSockets
- More weapons and items
- Advanced enemy AI
- Map variety and terrain features
- Sound effects and music
- Particle effects for explosions
- Power-ups and special abilities
- Ranking system
- Mobile app version

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

---

**Enjoy the battle! Good luck surviving!** 🎯