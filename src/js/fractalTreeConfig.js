/**
 * Configuration and data for the Yggdrasil Fractal Tree
 */

/**
 * Default configuration for the fractal tree
 */
window.defaultConfig = {
  canvasWidth: 1000,
  canvasHeight: 800,
  startX: 500,
  startY: 700,
  stemLength: 150,
  stemWidth: 14,
  initialLength: 65,
  initialWidth: 12,
  lengthDecay: 0.83,
  widthDecay: 0.75,
  nodeSize: 3,
  baseAngle: 40,
  bgColor: '#f8f8f8',
  pruneColor: "#99a39c", //'#fcfafa',
  colorScheme: 'autumn',
  showNodes: true,
  highlightBranchNodes: true,
  trunkTextureEnabled: true,
  acceleratedDecay: false,
  minBranchLength: 1,
  maxDepthRender: 50,
  zoomLevel: 1,
  exportFormat: 'png-1x',
  showPruning: false,
  // Survival probabilities for pruning
  // For const-accel search
  survivalProb: [
    0.93, 0.97, 0.89, 0.82, 0.51, 0.63, 0.67, 0.64, 0.84, 0.83, 0.94,
    0.72, 0.64, 0.78, 0.64, 0.87, 0.53, 0.91, 0.58, 0.56, 0.86, 0.91,
    0.94, 0.96, 0.52, 0.78, 0.9, 0.88, 0.86, 0.95, 0.96, 0.8, 0.94,
    0.99, 0.99, 0.83, 0.99, 0.93, 0.94, 0.98, 0.99, 0.83, 0.9, 0.95,
    0.85, 0.99, 0.96, 0.84, 0.92, 1.0, 0.88, 0.98, 0.9, 0.93, 0.86,
    1.0, 0.77, 0.96, 0.8, 1.0, 0.86, 0.9, 0.83, 0.99, 0.73, 0.99,
    0.71, 1.0, 0.82, 0.96, 0.87, 0.97, 0.88, 0.97, 0.99, 0.74, 0.97,
    0.95, 0.86, 0.91, 1.0, 1.0, 0.85, 0.67, 0.89, 1.0, 0.74, 1.0,
    0.82, 1.0, 0.85, 0.79, 0.9, 0.91, 1.0, 0.75, 1.0, 0.67, 0.97,
    0.68, 1.0, 0.81, 0.89, 0.98, 0.73, 0.89, 0.9, 0.77, 0.97, 0.99,
    0.65, 1.0, 0.92, 0.93, 0.64, 0.67, 0.97, 0.82, 0.88, 1.0, 0.85,
    1.0, 0.71, 0.87, 0.98, 0.86, 1.0
  ],
  // Branching patterns for different depths
  branchingPattern: [4, 9, 1, 3, 1, 3, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1,
    1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
};

/**
 * Alternative survival probability configuration for different tree types
 */
window.alternativeSurvivalConfig = {
  survivalProb: [1., 0.99, 1., 1., 0.89, 0.97, 0.87, 0.79, 0.69, 0.63, 0.71,
    0.59, 0.54, 0.49, 0.38, 0.54, 0.33, 0.77, 0.5, 0.59, 0.82, 0.8,
    0.95, 0.39, 0.86, 0.46, 0.74, 0.88, 0.46, 0.74, 0.89, 0.92, 0.8,
    0.47, 0.73, 0.8, 0.79, 0.85, 0.92, 0.78, 0.94, 0.89, 0.96, 1.,
    0.76, 0.3, 0.42, 0.73, 0.91, 0.94, 0.9, 0.78, 0.98, 0.94, 0.84,
    0.25, 0.39, 0.99, 0.65, 0.92, 0.99, 1., 0.81, 0.99, 0.82, 0.97,
    0.83, 0.99, 0.82, 0.97, 0.85, 0.96, 0.72, 0.87, 0.97, 0.7, 1.,
    0.79, 0.96, 0.92, 0.92, 0.81, 0.89, 0.88, 0.78, 0.71, 0.96, 0.79,
    0.69, 0.96, 0.62, 0.95, 1., 0.69, 0.99, 0.6, 0.99, 0.76, 1.,
    0.59, 0.84, 0.86, 0.88, 0.88, 0.97, 1., 0.63, 0.97, 0.94, 0.91,
    0.79, 0.7, 0.84, 0.87, 1., 0.62, 0.96, 0.92, 0.59, 0.99, 0.73,
    0.87, 1., 0.62, 0.85, 0.89, 1.],
  branchingPattern: [4, 9, 1, 3, 3, 3, 1, 9, 1, 1, 3, 1, 1, 9, 1, 3, 1, 3, 3, 1, 1, 1,
    1, 3, 9, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 9,
    1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
};

/**
 * Export format options
 */
window.exportFormats = [
  { value: 'png-1x', label: 'PNG (1x)' },
  { value: 'png-2x', label: 'PNG (2x)' },
  { value: 'png-4x', label: 'PNG (4x)' },
  { value: 'svg', label: 'SVG' }
];

/**
 * Performance monitoring thresholds
 */
window.performanceConfig = {
  maxDepthWarning: 50,
  highComplexityDepth: 15,
  branchFactorLimit: 9,
  cacheSize: 10000
};

/**
 * Utility functions for configuration
 */
window.configUtils = {
  /**
   * Validate configuration object
   */
  validateConfig: (config) => {
    const errors = [];
    
    if (config.lengthDecay <= 0 || config.lengthDecay >= 1) {
      errors.push('Length decay must be between 0 and 1');
    }
    
    if (config.widthDecay <= 0 || config.widthDecay >= 1) {
      errors.push('Width decay must be between 0 and 1');
    }
    
    if (config.baseAngle <= 0 || config.baseAngle >= 90) {
      errors.push('Base angle must be between 0 and 90 degrees');
    }
    
    if (config.survivalProb.length !== config.branchingPattern.length) {
      console.warn(`Survival probability array length (${config.survivalProb.length}) does not match branching pattern length (${config.branchingPattern.length}).`);
    }
    
    if (config.maxDepthRender > window.performanceConfig.maxDepthWarning) {
      console.warn("High maxDepthRender may impact performance. Consider increasing minBranchLength or using zoom.");
    }
    
    return errors;
  },

  /**
   * Get adaptive scaling for deeper levels
   */
  getAdaptiveScale: (maxDepth) => {
    return Math.min(1.5, 1 + (maxDepth - 18) / 50);
  },

  /**
   * Calculate depth scale factor
   */
  getDepthScaleFactor: (depth) => {
    return Math.max(0.4, 1 - depth * 0.05);
  },

  /**
   * Get accelerated decay based on depth
   */
  getAcceleratedDecay: (originalDecay, depth, enabled) => {
    if (!enabled) return originalDecay;
    const depthFactor = Math.min(1, depth / 10);
    return originalDecay * (1 - 0.3 * depthFactor);
  }
};
