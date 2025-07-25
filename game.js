// Game State Management
class GameState {
    constructor() {
        this.currentScreen = 'mainMenu';
        this.gameStarted = false;
        this.playersAlive = 50;
        this.gameTime = 0;
        this.player = new Player();
        this.enemies = [];
        this.gameLoop = null;
        this.settings = {
            sensitivity: 5,
            autoFire: false,
            masterVolume: 50,
            soundEffects: true,
            graphicsQuality: 'medium',
            fpsLimit: 60
        };
    }

    switchScreen(newScreen) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(newScreen).classList.add('active');
        this.currentScreen = newScreen;
    }

    startGame() {
        this.switchScreen('gameScreen');
        this.gameStarted = true;
        this.initializeGame();
        this.startGameLoop();
    }

    initializeGame() {
        this.setupCanvas();
        this.setupControls();
        this.spawnEnemies();
        this.updateTimer();
    }

    setupCanvas() {
        const canvas = document.getElementById('gameCanvas');
        if (!canvas) {
            console.error('Game canvas not found!');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        this.canvas = canvas;
        this.ctx = ctx;
        
        console.log('Canvas setup complete:', canvas.width, 'x', canvas.height);
        
        // Setup minimap
        const minimapCanvas = document.getElementById('minimapCanvas');
        if (minimapCanvas) {
            this.minimapCtx = minimapCanvas.getContext('2d');
            console.log('Minimap setup complete');
        } else {
            console.error('Minimap canvas not found!');
        }
    }

    setupControls() {
        this.setupJoystick();
        this.setupActionButtons();
        this.setupKeyboardControls();
    }

    setupJoystick() {
        const joystick = document.getElementById('movementJoystick');
        const knob = joystick.querySelector('.joystick-knob');
        
        if (!joystick || !knob) {
            console.error('Joystick elements not found!');
            return;
        }
        
        let isDragging = false;
        let joystickCenter = { x: 60, y: 60 };
        
        const handleStart = (e) => {
            isDragging = true;
            e.preventDefault();
            console.log('Joystick drag started');
        };
        
        const handleMove = (e) => {
            if (!isDragging) return;
            
            const rect = joystick.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            const x = clientX - rect.left - joystickCenter.x;
            const y = clientY - rect.top - joystickCenter.y;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 35;
            
            if (distance <= maxDistance) {
                knob.style.transform = `translate(${x - 25}px, ${y - 25}px)`;
                this.player.setMovement(x / maxDistance, y / maxDistance);
            } else {
                const angle = Math.atan2(y, x);
                const limitedX = Math.cos(angle) * maxDistance;
                const limitedY = Math.sin(angle) * maxDistance;
                knob.style.transform = `translate(${limitedX - 25}px, ${limitedY - 25}px)`;
                this.player.setMovement(limitedX / maxDistance, limitedY / maxDistance);
            }
        };
        
        const handleEnd = () => {
            isDragging = false;
            knob.style.transform = 'translate(-50%, -50%)';
            this.player.setMovement(0, 0);
            console.log('Joystick drag ended');
        };
        
        joystick.addEventListener('mousedown', handleStart);
        joystick.addEventListener('touchstart', handleStart, { passive: false });
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchend', handleEnd);
    }

    setupActionButtons() {
        document.getElementById('fireBtn').addEventListener('mousedown', () => this.player.startFiring());
        document.getElementById('fireBtn').addEventListener('mouseup', () => this.player.stopFiring());
        document.getElementById('fireBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.player.startFiring();
        });
        document.getElementById('fireBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.player.stopFiring();
        });
        
        document.getElementById('jumpBtn').addEventListener('click', () => this.player.jump());
        document.getElementById('crouchBtn').addEventListener('click', () => this.player.toggleCrouch());
        document.getElementById('reloadBtn').addEventListener('click', () => this.player.reload());
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'KeyW':
                case 'ArrowUp':
                    this.player.keys.up = true;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    this.player.keys.down = true;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    this.player.keys.left = true;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    this.player.keys.right = true;
                    break;
                case 'Space':
                    e.preventDefault();
                    this.player.jump();
                    break;
                case 'KeyR':
                    this.player.reload();
                    break;
                case 'KeyC':
                    this.player.toggleCrouch();
                    break;
            }
        });

        document.addEventListener('keyup', (e) => {
            switch(e.code) {
                case 'KeyW':
                case 'ArrowUp':
                    this.player.keys.up = false;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    this.player.keys.down = false;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    this.player.keys.left = false;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    this.player.keys.right = false;
                    break;
            }
        });

        document.addEventListener('mousedown', (e) => {
            if (this.currentScreen === 'gameScreen' && e.button === 0) {
                this.player.startFiring();
            }
        });

        document.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                this.player.stopFiring();
            }
        });
    }

    spawnEnemies() {
        for (let i = 0; i < 10; i++) {
            this.enemies.push(new Enemy());
        }
    }

    startGameLoop() {
        const targetFPS = this.settings.fpsLimit;
        const frameTime = 1000 / targetFPS;
        let lastTime = 0;

        const gameLoop = (currentTime) => {
            if (currentTime - lastTime >= frameTime) {
                this.update();
                this.render();
                lastTime = currentTime;
            }
            
            if (this.gameStarted) {
                this.gameLoop = requestAnimationFrame(gameLoop);
            }
        };

        this.gameLoop = requestAnimationFrame(gameLoop);
    }

    update() {
        this.player.update();
        this.enemies.forEach(enemy => enemy.update());
        this.updateTimer();
        this.updatePlayerCount();
        this.updateUI();
    }

    render() {
        this.clearCanvas();
        this.renderBackground();
        this.renderPlayer();
        this.renderEnemies();
        this.renderMinimap();
    }

    clearCanvas() {
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    renderBackground() {
        // Render ground
        this.ctx.fillStyle = '#228B22';
        this.ctx.fillRect(0, this.canvas.height * 0.7, this.canvas.width, this.canvas.height * 0.3);
        
        // Add some simple terrain features
        this.ctx.fillStyle = '#654321';
        for (let i = 0; i < 20; i++) {
            const x = (i * 100) % this.canvas.width;
            const y = this.canvas.height * 0.6 + Math.sin(i) * 50;
            this.ctx.fillRect(x, y, 80, 20);
        }
    }

    renderPlayer() {
        this.player.render(this.ctx);
    }

    renderEnemies() {
        this.enemies.forEach(enemy => enemy.render(this.ctx));
    }

    renderMinimap() {
        const ctx = this.minimapCtx;
        ctx.fillStyle = '#333';
        ctx.fillRect(0, 0, 150, 150);
        
        // Render players on minimap
        ctx.fillStyle = '#ff4757';
        ctx.fillRect(75, 75, 4, 4);
        
        // Render enemies on minimap
        ctx.fillStyle = '#ffa500';
        this.enemies.forEach(enemy => {
            const x = (enemy.x / this.canvas.width) * 150;
            const y = (enemy.y / this.canvas.height) * 150;
            ctx.fillRect(x - 1, y - 1, 2, 2);
        });
    }

    updateTimer() {
        this.gameTime += 1/60; // Assuming 60 FPS
        const minutes = Math.floor(this.gameTime / 60);
        const seconds = Math.floor(this.gameTime % 60);
        document.querySelector('.timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updatePlayerCount() {
        // Simulate player elimination
        if (Math.random() < 0.001 && this.playersAlive > 1) {
            this.playersAlive--;
            document.querySelector('.alive-count').textContent = this.playersAlive;
        }
    }

    updateUI() {
        // Update health bar
        const healthPercentage = (this.player.health / this.player.maxHealth) * 100;
        document.querySelector('.health-fill').style.width = `${healthPercentage}%`;
        document.querySelector('.health-text').textContent = this.player.health;
        
        // Update armor bar
        const armorPercentage = (this.player.armor / this.player.maxArmor) * 100;
        document.querySelector('.armor-fill').style.width = `${armorPercentage}%`;
        document.querySelector('.armor-text').textContent = this.player.armor;
        
        // Update ammo count
        document.querySelector('.ammo-count').textContent = 
            `${this.player.currentAmmo}/${this.player.totalAmmo}`;
    }
}

// Player Class
class Player {
    constructor() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.vx = 0;
        this.vy = 0;
        this.speed = 3;
        this.health = 100;
        this.maxHealth = 100;
        this.armor = 100;
        this.maxArmor = 100;
        this.currentAmmo = 30;
        this.totalAmmo = 120;
        this.isMoving = false;
        this.isFiring = false;
        this.isCrouching = false;
        this.lastShot = 0;
        this.fireRate = 100; // ms between shots
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.movementInput = { x: 0, y: 0 };
    }

    setMovement(x, y) {
        this.movementInput.x = x;
        this.movementInput.y = y;
    }

    update() {
        this.handleKeyboardMovement();
        this.handleJoystickMovement();
        this.updatePosition();
        this.handleAutoFire();
    }

    handleKeyboardMovement() {
        let moveX = 0;
        let moveY = 0;
        
        if (this.keys.left) moveX -= 1;
        if (this.keys.right) moveX += 1;
        if (this.keys.up) moveY -= 1;
        if (this.keys.down) moveY += 1;
        
        if (moveX !== 0 || moveY !== 0) {
            const length = Math.sqrt(moveX * moveX + moveY * moveY);
            moveX /= length;
            moveY /= length;
            
            this.vx = moveX * this.speed;
            this.vy = moveY * this.speed;
            this.isMoving = true;
        } else if (this.movementInput.x === 0 && this.movementInput.y === 0) {
            this.vx = 0;
            this.vy = 0;
            this.isMoving = false;
        }
    }

    handleJoystickMovement() {
        if (this.movementInput.x !== 0 || this.movementInput.y !== 0) {
            this.vx = this.movementInput.x * this.speed;
            this.vy = this.movementInput.y * this.speed;
            this.isMoving = true;
        }
    }

    updatePosition() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Keep player within bounds
        this.x = Math.max(20, Math.min(window.innerWidth - 20, this.x));
        this.y = Math.max(20, Math.min(window.innerHeight - 20, this.y));
    }

    handleAutoFire() {
        if (this.isFiring && Date.now() - this.lastShot > this.fireRate) {
            this.fire();
        }
    }

    startFiring() {
        this.isFiring = true;
        this.fire();
    }

    stopFiring() {
        this.isFiring = false;
    }

    fire() {
        if (this.currentAmmo > 0) {
            this.currentAmmo--;
            this.lastShot = Date.now();
            
            // Create muzzle flash effect
            this.createMuzzleFlash();
            
            // Check for hit detection with enemies
            this.checkHitDetection();
        }
    }

    createMuzzleFlash() {
        // Visual effect for shooting
        const flash = document.createElement('div');
        flash.style.position = 'absolute';
        flash.style.left = this.x + 'px';
        flash.style.top = this.y + 'px';
        flash.style.width = '20px';
        flash.style.height = '20px';
        flash.style.background = 'yellow';
        flash.style.borderRadius = '50%';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '1000';
        document.body.appendChild(flash);
        
        setTimeout(() => {
            document.body.removeChild(flash);
        }, 100);
    }

    checkHitDetection() {
        // Simple hit detection with enemies
        game.enemies.forEach((enemy, index) => {
            const distance = Math.sqrt((enemy.x - this.x) ** 2 + (enemy.y - this.y) ** 2);
            if (distance < 100) {
                enemy.takeDamage(25);
                if (enemy.health <= 0) {
                    game.enemies.splice(index, 1);
                }
            }
        });
    }

    reload() {
        if (this.totalAmmo > 0) {
            const ammoNeeded = 30 - this.currentAmmo;
            const ammoToReload = Math.min(ammoNeeded, this.totalAmmo);
            this.currentAmmo += ammoToReload;
            this.totalAmmo -= ammoToReload;
        }
    }

    jump() {
        // Add jump animation or effect
        console.log('Player jumped!');
    }

    toggleCrouch() {
        this.isCrouching = !this.isCrouching;
        this.speed = this.isCrouching ? 1.5 : 3;
    }

    takeDamage(damage) {
        if (this.armor > 0) {
            this.armor = Math.max(0, this.armor - damage);
        } else {
            this.health = Math.max(0, this.health - damage);
        }
    }

    render(ctx) {
        if (!ctx) {
            console.error('No canvas context for player rendering');
            return;
        }
        
        // Draw player as a simple character
        ctx.fillStyle = '#ff4757';
        ctx.fillRect(this.x - 10, this.y - 10, 20, 20);
        
        // Draw weapon
        ctx.fillStyle = '#333';
        ctx.fillRect(this.x + 10, this.y - 2, 15, 4);
        
        // Draw health bar above player
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - 15, this.y - 25, 30, 5);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x - 15, this.y - 25, (this.health / this.maxHealth) * 30, 5);
    }
}

// Enemy Class
class Enemy {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.health = 100;
        this.maxHealth = 100;
        this.lastDirectionChange = Date.now();
    }

    update() {
        // Simple AI movement
        if (Date.now() - this.lastDirectionChange > 2000) {
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.lastDirectionChange = Date.now();
        }
        
        this.x += this.vx;
        this.y += this.vy;
        
        // Keep enemy within bounds
        if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
        
        this.x = Math.max(0, Math.min(window.innerWidth, this.x));
        this.y = Math.max(0, Math.min(window.innerHeight, this.y));
    }

    takeDamage(damage) {
        this.health -= damage;
    }

    render(ctx) {
        // Draw enemy as a simple character
        ctx.fillStyle = '#ffa500';
        ctx.fillRect(this.x - 8, this.y - 8, 16, 16);
        
        // Draw health bar above enemy
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - 10, this.y - 20, 20, 3);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x - 10, this.y - 20, (this.health / this.maxHealth) * 20, 3);
    }
}

// Global game instance
let game;

// UI Functions
function startGame() {
    console.log('Starting game...');
    if (!game) {
        game = new GameState();
        console.log('Game state created');
    }
    game.startGame();
    console.log('Game started');
}

function showSettings() {
    if (!game) {
        game = new GameState();
    }
    game.switchScreen('settingsScreen');
}

function showStats() {
    if (!game) {
        game = new GameState();
    }
    game.switchScreen('statsScreen');
}

function backToMenu() {
    if (game) {
        game.gameStarted = false;
        if (game.gameLoop) {
            cancelAnimationFrame(game.gameLoop);
        }
        game.switchScreen('mainMenu');
    }
}

function saveSettings() {
    if (game) {
        game.settings.sensitivity = document.getElementById('sensitivity').value;
        game.settings.autoFire = document.getElementById('autoFire').checked;
        game.settings.masterVolume = document.getElementById('masterVolume').value;
        game.settings.soundEffects = document.getElementById('soundEffects').checked;
        game.settings.graphicsQuality = document.getElementById('graphicsQuality').value;
        game.settings.fpsLimit = parseInt(document.getElementById('fpsLimit').value);
    }
    backToMenu();
}

// Initialize settings UI
document.addEventListener('DOMContentLoaded', () => {
    // Update sensitivity display
    const sensitivitySlider = document.getElementById('sensitivity');
    const sensitivityValue = document.getElementById('sensitivityValue');
    sensitivitySlider.addEventListener('input', () => {
        sensitivityValue.textContent = sensitivitySlider.value;
    });
    
    // Update volume display
    const volumeSlider = document.getElementById('masterVolume');
    const volumeValue = document.getElementById('volumeValue');
    volumeSlider.addEventListener('input', () => {
        volumeValue.textContent = volumeSlider.value;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (game && game.canvas) {
            game.canvas.width = window.innerWidth;
            game.canvas.height = window.innerHeight;
        }
    });
});

// Prevent context menu on right click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Prevent zooming on mobile
document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});

document.addEventListener('gesturechange', (e) => {
    e.preventDefault();
});

document.addEventListener('gestureend', (e) => {
    e.preventDefault();
});