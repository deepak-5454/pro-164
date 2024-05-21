AFRAME.registerComponent('shoot', {
    init: function () {
      const paintballGun = document.getElementById('paintballGun');
      const target = document.getElementById('target');
  
      paintballGun.addEventListener('click', () => {
        // Create and shoot a paintball projectile
        const paintball = document.createElement('a-sphere');
        paintball.setAttribute('position', paintballGun.getAttribute('position'));
        paintball.setAttribute('radius', '0.1');
        paintball.setAttribute('color', 'red');
        paintball.setAttribute('dynamic-body', 'mass: 0.1');
        paintball.setAttribute('velocity', '-10 0 0'); // Adjust the velocity as needed
  
        // Add the paintball to the scene
        document.querySelector('a-scene').appendChild(paintball);
  
        // Remove the paintball after a certain time (e.g., 3 seconds)
        setTimeout(() => {
          paintball.parentNode.removeChild(paintball);
        }, 3000);
      });
    }
  });
  // Function to shoot a paintball
function shootPaintball() {
    const cameraEl = document.querySelector('[camera]');
    const cameraDirection = new THREE.Vector3();
    cameraEl.object3D.getWorldDirection(cameraDirection);
  
    const paintball = document.createElement('a-sphere');
    paintball.setAttribute('position', cameraEl.getAttribute('position'));
    paintball.setAttribute('radius', '0.1');
    paintball.setAttribute('color', 'red');
    paintball.setAttribute('dynamic-body', 'mass: 0.1');
  
    // Set velocity in the camera direction
    const velocity = cameraDirection.clone().multiplyScalar(10); // Adjust the speed as needed
    paintball.setAttribute('velocity', `${velocity.x} ${velocity.y} ${velocity.z}`);
  
    // Add a "collide" event handler
    paintball.addEventListener('collide', (event) => {
      // Create a paint splash image entity
      const paintSplash = document.createElement('a-image');
      paintSplash.setAttribute('src', 'path_to_paint_splash.png'); // Set the image source
      paintSplash.setAttribute('position', event.detail.contactPoint);
  
      // Add the paint splash to the scene
      document.querySelector('a-scene').appendChild(paintSplash);
  
      // Remove the paint splash after a certain time (e.g., 2 seconds)
      setTimeout(() => {
        paintSplash.parentNode.removeChild(paintSplash);
      }, 2000);
  
      // Remove the collided paintball
      event.target.parentNode.removeChild(event.target);
    });
  
    // Add the paintball to the scene
    document.querySelector('a-scene').appendChild(paintball);
  }
  
  // Register a component to handle paintball shooting
  AFRAME.registerComponent('paintball-shooter', {
    init: function () {
      // Listen for a "click" event to shoot paintballs
      this.el.addEventListener('click', () => {
        shootPaintball();
      });
  
      // Listen for a "keydown" event (e.g., spacebar) to shoot paintballs
      window.addEventListener('keydown', (event) => {
        if (event.keyCode === 32) {
          shootPaintball();
        }
      });
    },
  });
  
  