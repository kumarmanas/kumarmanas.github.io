import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CodeSquare, BookOpen, Shield, Car } from 'lucide-react';

const InteractiveSlide = () => {
  const [activeSection, setActiveSection] = useState('input');
  
  const sections = {
    input: {
      title: "Natural Language Input",
      content: "Traffic rules & instructions in plain English",
      example: '"Maintain safe distance of at least 2 car lengths when following another vehicle"'
    },
    formalization: {
      title: "Automated Formalization",
      content: "AI converts natural language into precise formal logic",
      example: "distance(ego_vehicle, leading_vehicle) >= 2 * car_length"
    },
    application: {
      title: "Real-World Applications",
      content: "Formal rules power autonomous systems",
      useCases: [
        "Verification: Mathematically prove rule compliance",
        "Planning: Generate safe driving trajectories",
        "Monitoring: Real-time rule checking"
      ]
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Making Traffic Rules Machine-Readable: From Natural Language to Formal Logic
      </h2>
      
      <div className="flex flex-col gap-8">
        {/* Process Flow */}
        <div className="flex justify-between items-center">
          {Object.entries(sections).map(([key, section], index) => (
            <React.Fragment key={key}>
              <Card 
                className={`w-64 cursor-pointer transition-all ${
                  activeSection === key ? 'ring-2 ring-blue-500 shadow-lg' : 'shadow'
                }`}
                onClick={() => setActiveSection(key)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {key === 'input' && <BookOpen className="text-blue-500" />}
                    {key === 'formalization' && <CodeSquare className="text-green-500" />}
                    {key === 'application' && <Car className="text-purple-500" />}
                    <h3 className="font-semibold">{section.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{section.content}</p>
                </CardContent>
              </Card>
              {index < 2 && (
                <ArrowRight className="text-gray-400" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Detail Panel */}
        <Card className="mt-6">
          <CardContent className="p-6">
            {activeSection === 'input' && (
              <div>
                <h4 className="font-semibold mb-4">Example Traffic Rule:</h4>
                <p className="p-3 bg-gray-50 rounded border border-gray-200">
                  {sections.input.example}
                </p>
                <p className="mt-4 text-gray-600">
                  System engineers can input traffic rules in natural language, eliminating the need for formal logic expertise.
                </p>
              </div>
            )}
            
            {activeSection === 'formalization' && (
              <div>
                <h4 className="font-semibold mb-4">AI-Powered Translation:</h4>
                <div className="p-3 bg-gray-50 rounded border border-gray-200 font-mono text-sm">
                  {sections.formalization.example}
                </div>
                <p className="mt-4 text-gray-600">
                  The AI system automatically converts natural language into precise, mathematical representations that computers can understand and work with.
                </p>
              </div>
            )}
            
            {activeSection === 'application' && (
              <div>
                <h4 className="font-semibold mb-4">Use Cases:</h4>
                <ul className="space-y-3">
                  {sections.application.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Shield className="text-green-500 mt-1 w-5 h-5" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveSlide;
