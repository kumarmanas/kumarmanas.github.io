import React, { useState, useEffect } from 'react';

const TrajectoryTeaser = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const [showUncertainty, setShowUncertainty] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (animationStep < 6) {
        setAnimationStep(animationStep + 1);
      } else {
        setAnimationStep(0); // Reset animation
      }
    }, 1500);
    
    if (animationStep === 1) setShowUncertainty(false);
    if (animationStep === 2) setShowRules(true);
    if (animationStep === 3) setShowUncertainty(true);
    if (animationStep === 4) setShowPrediction(true);
    if (animationStep === 5) {
      setShowRules(false);
      setShowUncertainty(false);
    }
    if (animationStep === 6) {
      setShowRules(false);
      setShowUncertainty(false);
      setShowPrediction(false);
    }
    
    return () => clearTimeout(timer);
  }, [animationStep]);
  
  // Common styles
  const roadStyle = { fill: "#333", stroke: "none" };
  const laneMarkingStyle = { stroke: "#FFF", strokeWidth: 2, strokeDasharray: "10,10" };
  const vehicleEgoStyle = { fill: "#3498db", stroke: "#2980b9", strokeWidth: 2 };
  const vehicleStyle = { fill: "#e74c3c", stroke: "#c0392b", strokeWidth: 2 };
  const observedPathStyle = { stroke: "#2ecc71", strokeWidth: 3, fill: "none" };
  const predictedPathStyle = { stroke: "#9b59b6", strokeWidth: 3, fill: "none", strokeDasharray: "5,5" };
  const uncertaintyStyle = { fill: "rgba(241, 196, 15, 0.3)", stroke: "#f39c12", strokeWidth: 2 };
  const rulesStyle = { fill: "rgba(52, 152, 219, 0.2)", stroke: "#3498db", strokeWidth: 2 };
  
  // Define path coordinates
  const histPath = "M 100,250 Q 150,250 175,230 T 250,200";
  const predPath1 = "M 250,200 Q 300,180 350,180 T 450,190";  // Main prediction
  const predPath2 = "M 250,200 Q 300,190 350,210 T 450,230";  // Alternative path
  const predPath3 = "M 250,200 Q 300,170 350,150 T 450,150";  // Another alternative
  
  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Traffic Trajectory Prediction with Uncertainty</h2>
      
      <svg viewBox="0 0 600 400" className="w-full max-w-3xl">
        {/* Background and Road */}
        <rect x="0" y="0" width="600" height="400" fill="#f8f9fa" />
        <rect x="50" y="150" width="500" height="100" style={roadStyle} />
        <line x1="50" y1="200" x2="550" y2="200" style={laneMarkingStyle} />
        
        {/* Historical Path */}
        <path d={histPath} style={observedPathStyle} />
        
        {/* Vehicles */}
        <rect x="240" y="190" width="20" height="30" rx="5" 
              style={vehicleEgoStyle} 
              transform="rotate(-15, 250, 200)" /> {/* Ego */}
        
        <rect x="400" y="160" width="20" height="30" rx="5" 
              style={vehicleStyle} /> {/* V1 */}
        
        <rect x="350" y="220" width="20" height="30" rx="5" 
              style={vehicleStyle} /> {/* V2 */}
        
        {/* Predicted Paths - animate in based on step */}
        {showPrediction && (
          <>
            <path d={predPath1} style={predictedPathStyle} />
            
            {/* Only shown with uncertainty */}
            {showUncertainty && (
              <>
                <path d={predPath2} style={{...predictedPathStyle, stroke: "#9b59b6", opacity: 0.7}} />
                <path d={predPath3} style={{...predictedPathStyle, stroke: "#9b59b6", opacity: 0.5}} />
              </>
            )}
          </>
        )}
        
        {/* Uncertainty Zone */}
        {showUncertainty && (
          <path d="M 250,200 Q 300,170 350,150 T 450,150 L 450,190 Q 350,180 300,180 T 250,200 Z" 
                style={uncertaintyStyle} />
        )}
        
        {/* Traffic Rules Zone */}
        {showRules && (
          <path d="M 250,200 Q 300,180 350,180 T 450,190 L 450,150 Q 350,150 300,170 T 250,200 Z" 
                style={rulesStyle} />
        )}
        
        {/* Labels */}
        <text x="120" y="270" fill="#2ecc71" fontWeight="bold">Observed</text>
        {showPrediction && <text x="350" y="150" fill="#9b59b6" fontWeight="bold">Predicted</text>}
        {showUncertainty && <text x="380" y="220" fill="#f39c12" fontWeight="bold">Uncertainty</text>}
        {showRules && <text x="300" y="150" fill="#3498db" fontWeight="bold">Traffic Rules</text>}
        
        <text x="250" y="185" fill="white" fontSize="10">EGO</text>
        <text x="407" y="180" fill="white" fontSize="10">V1</text>
        <text x="357" y="240" fill="white" fontSize="10">V2</text>
        
        {/* Stage indicators */}
        <circle cx="260" cy="350" r="8" fill={animationStep >= 1 ? "#3498db" : "#ddd"} />
        <circle cx="300" cy="350" r="8" fill={animationStep >= 2 ? "#3498db" : "#ddd"} />
        <circle cx="340" cy="350" r="8" fill={animationStep >= 3 ? "#3498db" : "#ddd"} />
        <circle cx="380" cy="350" r="8" fill={animationStep >= 4 ? "#3498db" : "#ddd"} />
      </svg>
      
      <div className="mt-4 text-center text-gray-700">
        {animationStep === 0 && "Initial Scene"}
        {animationStep === 1 && "Tracking Ego Vehicle"}
        {animationStep === 2 && "Applying Traffic Rules"}
        {animationStep === 3 && "Computing Uncertainty"}
        {animationStep === 4 && "Trajectory Prediction"}
        {animationStep === 5 && "Final Prediction"}
        {animationStep === 6 && "Ready to Reset"}
      </div>
    </div>
  );
};

export default TrajectoryTeaser;