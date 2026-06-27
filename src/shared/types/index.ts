import React from 'react';

export interface Competitor {
  id: string;
  name: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  complaints: string[];
  outdated: string;
}

export interface StackLayer {
  id: string;
  name: string;
  selected: string;
  selectedReason: string;
  alternatives: { name: string; reason: string }[];
  icon: React.ComponentType<any>;
}

export interface ArchModule {
  id: string;
  name: string;
  category: string;
  responsibility: string;
  subsystems: { name: string; desc: string }[];
  inputsOutputs: { type: 'input' | 'output'; data: string; description: string }[];
  designPatterns: string[];
  dataFlowSteps: string[];
  icon: React.ComponentType<any>;
}

export interface UXScreenSpec {
  id: string;
  name: string;
  category: string;
  concept: string;
  anatomyDescription: string;
  typographyAndColors: string;
  keyInteractions: string[];
  keyboardShortcuts: { key: string; action: string }[];
  usabilityEdgeCases: string[];
  mobileResponsive: string;
  icon: React.ComponentType<any>;
}
