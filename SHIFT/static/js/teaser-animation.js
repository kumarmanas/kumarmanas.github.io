// Vanilla JavaScript version of the trajectory animation

// Animation state and elements
let animationStep = 0;
let showUncertainty = false;
let showRules = false;
let showPrediction = false;
let animationInterval;

function createTeaserAnimation(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Create teaser content
  container.innerHTML = `
    <div class="teaser-container">
      <h3 class="teaser-title">Traffic Trajectory Prediction with Uncertainty</h3>
      <svg viewBox="0 0 600 400" class="teaser-svg">
        <!-- Background and Road -->
        <rect x="0" y="0" width="600" height="400" fill="#f8f9fa" />
        <rect x="50" y="150" width="500" height="100" fill="#333" />
        <line x1="50" y1="200" x2="550" y2="200" stroke="#FFF" stroke-width="2" stroke-dasharray="10,10" />
        
        <!-- Historical Path -->
        <path d="M 100,250 Q 150,250 175,230 T 250,200" stroke="#2ecc71" stroke-width="3" fill="none" />
        
        <!-- Vehicles -->
        <rect x="240" y="190" width="20" height="30" rx="5" 
              fill="#3498db" stroke="#2980b9" stroke-width="2"
              transform="rotate(-15, 250, 200)" /> <!-- Ego -->
        
        <rect x="400" y="160" width="20" height="30" rx="5" 
              fill="#e74c3c" stroke="#c0392b" stroke-width="2" /> <!-- V1 -->
        
        <rect x="350" y="220" width="20" height="30" rx="5" 
              fill="#e74c3c" stroke="#c0392b" stroke-width="2" /> <!-- V2 -->
        
        <!-- Predicted Paths (initially hidden) -->
        <g id="prediction-paths" style="display: none;">
          <path d="M 250,200 Q 300,180 350,180 T 450,190" stroke="#9b59b6" stroke-width="3" fill="none" stroke-dasharray="5,5" />
          <path id="alt-path-1" d="M 250,200 Q 300,190 350,210 T 450,230" stroke="#9b59b6" stroke-width="3" fill="none" stroke-dasharray="5,5" style="opacity: 0.8; display: none;" />
          <path id="alt-path-2" d="M 250,200 Q 300,170 350,150 T 450,150" stroke="#9b59b6" stroke-width="3" fill="none" stroke-dasharray="5,5" style="opacity: 0.6; display: none;" />
        </g>
        
        <!-- Uncertainty Zone (initially hidden) -->
        <path id="uncertainty-zone" d="M 250,200 Q 300,170 350,150 T 450,150 L 450,190 Q 350,180 300,180 T 250,200 Z" 
              fill="rgba(241, 196, 15, 0.5)" stroke="#f39c12" stroke-width="2" style="display: none;" />
        
        <!-- Traffic Rules Zone (initially hidden) -->
        <path id="rules-zone" d="M 250,200 Q 300,180 350,180 T 450,190 L 450,150 Q 350,150 300,170 T 250,200 Z" 
              fill="rgba(52, 152, 219, 0.4)" stroke="#3498db" stroke-width="2" style="display: none;" />
        
        <!-- Enhanced Labels with better visibility -->
        <text x="120" y="270" fill="#2ecc71" font-weight="bold" font-size="14" class="animation-label">Observed</text>
        <text x="350" y="150" fill="#9b59b6" font-weight="bold" font-size="14" id="predicted-label" style="display: none;" class="animation-label">Predicted</text>
        <text x="380" y="220" fill="#f39c12" font-weight="bold" font-size="14" id="uncertainty-label" style="display: none;" class="animation-label">Uncertainty</text>
        <text x="300" y="150" fill="#3498db" font-weight="bold" font-size="14" id="rules-label" style="display: none;" class="animation-label">Traffic Rules</text>
        
        <text x="250" y="185" fill="white" font-weight="bold" font-size="11">EGO</text>
        <text x="407" y="180" fill="white" font-weight="bold" font-size="11">V1</text>
        <text x="357" y="240" fill="white" font-weight="bold" font-size="11">V2</text>
        
        <!-- Stage indicators -->
        <circle cx="260" cy="350" r="8" fill="#ddd" id="indicator-1" />
        <circle cx="300" cy="350" r="8" fill="#ddd" id="indicator-2" />
        <circle cx="340" cy="350" r="8" fill="#ddd" id="indicator-3" />
        <circle cx="380" cy="350" r="8" fill="#ddd" id="indicator-4" />
      </svg>
      <div class="teaser-status" id="animation-status">Initial Scene</div>
    </div>
  `;

  // Store references to elements we'll need to update
  const elements = {
    uncertaintyZone: document.getElementById('uncertainty-zone'),
    rulesZone: document.getElementById('rules-zone'),
    predictionPaths: document.getElementById('prediction-paths'),
    altPath1: document.getElementById('alt-path-1'),
    altPath2: document.getElementById('alt-path-2'),
    predictedLabel: document.getElementById('predicted-label'),
    uncertaintyLabel: document.getElementById('uncertainty-label'),
    rulesLabel: document.getElementById('rules-label'),
    status: document.getElementById('animation-status'),
    indicators: {
      1: document.getElementById('indicator-1'),
      2: document.getElementById('indicator-2'),
      3: document.getElementById('indicator-3'),
      4: document.getElementById('indicator-4')
    }
  };

  // Start animation loop
  startAnimation(elements);
  
  return elements;
}

function startAnimation(elements) {
  // Clear any existing interval
  if (animationInterval) {
    clearInterval(animationInterval);
  }
  
  // Reset animation state
  animationStep = 0;
  updateAnimationState(elements);
  
  // Set up animation interval
  animationInterval = setInterval(() => {
    animationStep = (animationStep + 1) % 7;
    updateAnimationState(elements);
  }, 1500);
}

function updateAnimationState(elements) {
  // Update animation state based on current step
  if (animationStep === 0) {
    showUncertainty = false;
    showRules = false;
    showPrediction = false;
    elements.status.textContent = "Initial Scene";
  } else if (animationStep === 1) {
    showUncertainty = false;
    showRules = false;
    showPrediction = false;
    elements.status.textContent = "Tracking Ego Vehicle";
  } else if (animationStep === 2) {
    showRules = true;
    showUncertainty = false;
    showPrediction = false;
    elements.status.textContent = "Applying Traffic Rules";
  } else if (animationStep === 3) {
    showRules = true;
    showUncertainty = true;
    showPrediction = false;
    elements.status.textContent = "Computing Uncertainty";
  } else if (animationStep === 4) {
    showRules = true;
    showUncertainty = true;
    showPrediction = true;
    elements.status.textContent = "Trajectory Prediction";
  } else if (animationStep === 5) {
    showRules = false;
    showUncertainty = false;
    showPrediction = true;
    elements.status.textContent = "Final Prediction";
  } else {
    showRules = false;
    showUncertainty = false;
    showPrediction = false;
    elements.status.textContent = "Ready to Reset";
  }
  
  // Update visual elements
  updateVisualElements(elements);
}

function updateVisualElements(elements) {
  // Update visibility of elements
  elements.uncertaintyZone.style.display = showUncertainty ? 'inline' : 'none';
  elements.uncertaintyLabel.style.display = showUncertainty ? 'inline' : 'none';
  
  elements.rulesZone.style.display = showRules ? 'inline' : 'none';
  elements.rulesLabel.style.display = showRules ? 'inline' : 'none';
  
  elements.predictionPaths.style.display = showPrediction ? 'inline' : 'none';
  elements.predictedLabel.style.display = showPrediction ? 'inline' : 'none';
  
  // Show alternative paths only when uncertainty is shown
  elements.altPath1.style.display = (showPrediction && showUncertainty) ? 'inline' : 'none';
  elements.altPath2.style.display = (showPrediction && showUncertainty) ? 'inline' : 'none';
  
  // Update indicators
  for (let i = 1; i <= 4; i++) {
    if (elements.indicators[i]) {
      elements.indicators[i].setAttribute('fill', i <= animationStep ? '#3498db' : '#ddd');
    }
  }
}