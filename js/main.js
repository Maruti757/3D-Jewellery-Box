
AFRAME.registerSystem("ringState", {
  init: function () {
    this.busy = false;
    this.focusedRing = null;
  }
});

AFRAME.registerComponent("store-original", {
  init: function () {
    const pos = this.el.getAttribute("position");
    const scale = this.el.getAttribute("scale") || { x: 1, y: 1, z: 1 };

    this.el.dataset.ox = pos.x;
    this.el.dataset.oy = pos.y;
    this.el.dataset.oz = pos.z;

    this.el.dataset.sx = scale.x;
    this.el.dataset.sy = scale.y;
    this.el.dataset.sz = scale.z;
  }
});


AFRAME.registerComponent("ring-focus", {
  init: function () {
    this.onClick = this.onClick.bind(this);
    this.el.addEventListener("click", this.onClick);
  },

  onClick: function () {
    const sceneEl = this.el.sceneEl;
    const state = sceneEl.systems.ringState;

    
    if (state.busy || state.focusedRing) return;

    state.busy = true;
    state.focusedRing = this.el;

    
    this.el.setAttribute("animation__moveForward", {
      property: "position",
      to: "0 1.4 -0.8",
      dur: 700,
      easing: "easeOutCubic"
    });

    
    this.el.setAttribute("animation__scaleUp", {
      property: "scale",
      to: "1.5 1.5 1.5",
      dur: 700,
      easing: "easeOutCubic"
    });

    
    this.el.setAttribute("animation__tilt", {
      property: "rotation",
      to: "0 20 0",
      dur: 700,
      easing: "easeOutCubic"
    });

   
    document.getElementById("closeBtn").classList.remove("hidden");

    
    setTimeout(function () {
      state.busy = false;
    }, 750);
  }
});


(function setupCloseLogic () {
  const btn = document.getElementById("closeBtn");

  btn.addEventListener("click", function (event) {
    event.stopPropagation(); 
    const sceneEl = document.querySelector("a-scene");
    const state = sceneEl.systems.ringState;

    
    if (!state.focusedRing || state.busy) return;

    state.busy = true;
    const ring = state.focusedRing;

    
    ring.setAttribute("animation__moveBack", {
      property: "position",
      to: ring.dataset.ox + " " + ring.dataset.oy + " " + ring.dataset.oz,
      dur: 700,
      easing: "easeOutCubic"
    });

   
    ring.setAttribute("animation__scaleBack", {
      property: "scale",
      to: ring.dataset.sx + " " + ring.dataset.sy + " " + ring.dataset.sz,
      dur: 700,
      easing: "easeOutCubic"
    });

    ring.setAttribute("animation__resetRot", {
      property: "rotation",
      to: "0 0 0",
      dur: 600,
      easing: "easeOutCubic"
    });

   
    btn.classList.add("hidden");

    
    setTimeout(function () {
      state.focusedRing = null;
      state.busy = false;
    }, 750);
  });
})();


AFRAME.registerComponent("drag-rotate-y", {
  schema: {
    speed: { default: 3 } 
  },

  init: function () {
    this.dragging = false;
    this.startX = 0;
    this.currentYRotation = 0;

    
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    
    const sceneEl = this.el.sceneEl;
    sceneEl.addEventListener("mousedown", this.onMouseDown);
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);

  
    sceneEl.addEventListener("touchstart", this.onTouchStart);
    window.addEventListener("touchmove", this.onTouchMove, { passive: false });
    window.addEventListener("touchend", this.onTouchEnd);
  },

  isActiveRing: function () {
    const state = this.el.sceneEl.systems.ringState;
    return state.focusedRing === this.el && !state.busy;
  },

  onMouseDown: function (evt) {
    if (!this.isActiveRing()) return;
    this.dragging = true;
    this.startX = evt.clientX;
  },

  onMouseMove: function (evt) {
    if (!this.dragging) return;

    const deltaX = evt.clientX - this.startX;
    const rotationDelta = (deltaX / 100) * this.data.speed;

    this.el.object3D.rotation.y = this.currentYRotation + rotationDelta;
  },

  onMouseUp: function () {
    if (!this.dragging) return;
    this.dragging = false;
    
    this.currentYRotation = this.el.object3D.rotation.y;
  },

  onTouchStart: function (evt) {
    if (!this.isActiveRing()) return;
    if (evt.touches.length !== 1) return; 
    this.dragging = true;
    this.startX = evt.touches[0].clientX;
  },

  onTouchMove: function (evt) {
    if (!this.dragging) return;
    if (evt.touches.length !== 1) return;

   
    evt.preventDefault();

    const deltaX = evt.touches[0].clientX - this.startX;
    const rotationDelta = (deltaX / 100) * this.data.speed;

    this.el.object3D.rotation.y = this.currentYRotation + rotationDelta;
  },

  onTouchEnd: function () {
    if (!this.dragging) return;
    this.dragging = false;
    this.currentYRotation = this.el.object3D.rotation.y;
  },

  remove: function () {
    
    const sceneEl = this.el.sceneEl;
    sceneEl.removeEventListener("mousedown", this.onMouseDown);
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
    sceneEl.removeEventListener("touchstart", this.onTouchStart);
    window.removeEventListener("touchmove", this.onTouchMove);
    window.removeEventListener("touchend", this.onTouchEnd);
  }
});
