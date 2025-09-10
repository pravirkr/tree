/**
 * Color schemes and utilities for the Yggdrasil Fractal Tree
 */

/**
 * Main color schemes for the fractal tree
 */
window.colorSchemes = {
  autumn: {
    baseColor: '#8B4513',
    gradient: [
      { pos: 0.0, color: '#8B4513' },
      { pos: 0.3, color: '#A0522D' },
      { pos: 0.6, color: '#CD853F' },
      { pos: 0.8, color: '#DEB887' },
      { pos: 1.0, color: '#F5DEB3' }
    ],
    nodeColor: '#FFCC80',
    branchNodeColor: '#FF8F00'
  },
  forest: {
    baseColor: '#2E7D32',
    gradient: [
      { pos: 0.0, color: '#1B5E20' },
      { pos: 0.3, color: '#2E7D32' },
      { pos: 0.6, color: '#388E3C' },
      { pos: 0.8, color: '#43A047' },
      { pos: 1.0, color: '#66BB6A' }
    ],
    nodeColor: '#81C784',
    branchNodeColor: '#2E7D32'
  },
  ocean: {
    baseColor: '#0D47A1',
    gradient: [
      { pos: 0.0, color: '#0D47A1' },
      { pos: 0.3, color: '#1976D2' },
      { pos: 0.6, color: '#2196F3' },
      { pos: 0.8, color: '#64B5F6' },
      { pos: 1.0, color: '#90CAF9' }
    ],
    nodeColor: '#BBDEFB',
    branchNodeColor: '#1976D2'
  },
  sunset: {
    baseColor: '#BF360C',
    gradient: [
      { pos: 0.0, color: '#BF360C' },
      { pos: 0.3, color: '#E64A19' },
      { pos: 0.6, color: '#FF7043' },
      { pos: 0.8, color: '#FFAB91' },
      { pos: 1.0, color: '#FFCCBC' }
    ],
    nodeColor: '#FFCCBC',
    branchNodeColor: '#FF5722'
  },
  monochrome: {
    baseColor: '#212121',
    gradient: [
      { pos: 0.0, color: '#212121' },
      { pos: 0.3, color: '#424242' },
      { pos: 0.6, color: '#616161' },
      { pos: 0.8, color: '#9E9E9E' },
      { pos: 1.0, color: '#BDBDBD' }
    ],
    nodeColor: '#E0E0E0',
    branchNodeColor: '#616161'
  },
  cherry: {
    baseColor: '#4A1D1C',
    gradient: [
      { pos: 0.0, color: '#4A1D1C' },
      { pos: 0.3, color: '#7D3633' },
      { pos: 0.6, color: '#AF4F4B' },
      { pos: 0.8, color: '#D98C88' },
      { pos: 1.0, color: '#F7C2C0' }
    ],
    nodeColor: '#FAE6E5',
    branchNodeColor: '#9A3734'
  },
  maple: {
    baseColor: '#6B4226',
    gradient: [
      { pos: 0.0, color: '#6B4226' },
      { pos: 0.3, color: '#8D5B3A' },
      { pos: 0.6, color: '#BB7F5A' },
      { pos: 0.8, color: '#D9A989' },
      { pos: 1.0, color: '#F7E0CB' }
    ],
    nodeColor: '#F9EDE1',
    branchNodeColor: '#A76C42'
  },
  emerald: {
    baseColor: '#004D40',
    gradient: [
      { pos: 0.0, color: '#004D40' },
      { pos: 0.3, color: '#00695C' },
      { pos: 0.6, color: '#00897B' },
      { pos: 0.8, color: '#26A69A' },
      { pos: 1.0, color: '#80CBC4' }
    ],
    nodeColor: '#B2DFDB',
    branchNodeColor: '#00796B'
  },
  purple: {
    baseColor: '#4A148C',
    gradient: [
      { pos: 0.0, color: '#4A148C' },
      { pos: 0.3, color: '#6A1B9A' },
      { pos: 0.6, color: '#8E24AA' },
      { pos: 0.8, color: '#AB47BC' },
      { pos: 1.0, color: '#CE93D8' }
    ],
    nodeColor: '#E1BEE7',
    branchNodeColor: '#7B1FA2'
  },
  golden: {
    baseColor: '#6D4C41',
    gradient: [
      { pos: 0.0, color: '#6D4C41' },
      { pos: 0.3, color: '#8D6E63' },
      { pos: 0.6, color: '#BF9D7E' },
      { pos: 0.8, color: '#D4B08C' },
      { pos: 1.0, color: '#F9CC89' }
    ],
    nodeColor: '#FFF8E1',
    branchNodeColor: '#FFB300'
  },
  redwood: {
    baseColor: '#5D1B0B',
    gradient: [
      { pos: 0.0, color: '#5D1B0B' },
      { pos: 0.3, color: '#7F2B11' },
      { pos: 0.6, color: '#A23B1A' },
      { pos: 0.8, color: '#C75C37' },
      { pos: 1.0, color: '#E69B7B' }
    ],
    nodeColor: '#FFCCBC',
    branchNodeColor: '#BF360C'
  },
  spring: {
    baseColor: '#558B2F',
    gradient: [
      { pos: 0.0, color: '#558B2F' },
      { pos: 0.3, color: '#7CB342' },
      { pos: 0.6, color: '#9CCC65' },
      { pos: 0.8, color: '#C5E1A5' },
      { pos: 1.0, color: '#F1F8E9' }
    ],
    nodeColor: '#F1F8E9',
    branchNodeColor: '#8BC34A'
  }
};

/**
 * Custom color schemes for additional variety
 */
window.customColorSchemes = [
  { name: 'Earth', colors: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3'] },
  { name: 'Blues', colors: ['#0d46a0', '#2171b5', '#4292c6', '#6baed6', '#9ecae1'] },
  { name: 'GreenYellow', colors: ['#276419', '#4d9221', '#7fbc41', '#b8e186', '#e6f5d0'] },
  { name: 'Purples', colors: ['#4a1486', '#6a51a3', '#807dba', '#9e9ac8', '#bcbddc'] },
  { name: 'Reds', colors: ['#7f0000', '#b30000', '#d7301f', '#ef6548', '#fc8d59'] }
];

/**
 * Tree presets with predefined configurations
 */
window.treePresets = [
  { 
    name: 'Classic Tree', 
    color: 'autumn', 
    stemLength: 140, 
    initialLength: 100, 
    lengthDecay: 0.62, 
    baseAngle: 35, 
    trunkTextureEnabled: true 
  },
  { 
    name: 'Tall Pine', 
    color: 'forest', 
    stemLength: 160, 
    initialLength: 90, 
    lengthDecay: 0.58, 
    baseAngle: 30, 
    trunkTextureEnabled: true 
  },
  { 
    name: 'Cherry Blossom', 
    color: 'cherry', 
    stemLength: 232, 
    initialLength: 78, 
    lengthDecay: 0.83, 
    baseAngle: 40, 
    trunkTextureEnabled: true 
  },
  { 
    name: 'Wide Canopy', 
    color: 'sunset', 
    stemLength: 100, 
    initialLength: 120, 
    lengthDecay: 0.7, 
    baseAngle: 45, 
    trunkTextureEnabled: false 
  },
  { 
    name: 'Slender Willow', 
    color: 'ocean', 
    stemLength: 180, 
    initialLength: 80, 
    lengthDecay: 0.55, 
    baseAngle: 25, 
    trunkTextureEnabled: false 
  },
  { 
    name: 'Maple', 
    color: 'maple', 
    stemLength: 150, 
    initialLength: 100, 
    lengthDecay: 0.65, 
    baseAngle: 35, 
    trunkTextureEnabled: true, 
    nodeSize: 5 
  }
];

/**
 * Convert hex color to RGB object
 */
window.hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

/**
 * Get color from gradient based on depth
 */
window.getColorFromGradient = (depth, maxDepth, colorScheme) => {
  const scheme = window.colorSchemes[colorScheme];
  if (!scheme) return '#8B4513'; // fallback to autumn base
  
  const normalizedDepth = Math.min(1, depth / maxDepth);

  let lowerStop = scheme.gradient[0];
  let upperStop = scheme.gradient[scheme.gradient.length - 1];

  for (let i = 0; i < scheme.gradient.length - 1; i++) {
    if (normalizedDepth >= scheme.gradient[i].pos && normalizedDepth <= scheme.gradient[i + 1].pos) {
      lowerStop = scheme.gradient[i];
      upperStop = scheme.gradient[i + 1];
      break;
    }
  }

  const range = upperStop.pos - lowerStop.pos;
  const normalizedPos = range === 0 ? 0 : (normalizedDepth - lowerStop.pos) / range;

  const lowerRGB = window.hexToRgb(lowerStop.color);
  const upperRGB = window.hexToRgb(upperStop.color);

  const r = Math.round(lowerRGB.r + normalizedPos * (upperRGB.r - lowerRGB.r));
  const g = Math.round(lowerRGB.g + normalizedPos * (upperRGB.g - lowerRGB.g));
  const b = Math.round(lowerRGB.b + normalizedPos * (upperRGB.b - lowerRGB.b));

  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Create custom color scheme from color array
 */
window.createCustomColorScheme = (index) => {
  const customScheme = window.customColorSchemes[index % window.customColorSchemes.length];
  const colors = customScheme.colors;

  const gradient = colors.map((color, i) => ({
    pos: i / (colors.length - 1),
    color
  }));

  return {
    baseColor: colors[0],
    gradient,
    nodeColor: '#ffffff',
    branchNodeColor: colors[1]
  };
};

/**
 * Initialize custom color schemes
 */
window.initializeCustomColorSchemes = () => {
  window.customColorSchemes.forEach((scheme, index) => {
    window.colorSchemes[`custom${index + 1}`] = window.createCustomColorScheme(index);
  });
};
