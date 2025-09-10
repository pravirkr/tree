/**
 * Fractal Tree Rendering Engine
 * Contains the core logic for drawing the Yggdrasil fractal tree
 */

/**
 * Fractal Tree Renderer Class
 */
window.FractalTreeRenderer = class FractalTreeRenderer {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.config = config;
    this.svgPaths = [];
    this.nodeCache = new Map();
    
    this.setupCanvas();
  }
  
  setupCanvas() {
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.lineJoin = 'round';
  }
  
  /**
   * Main render method
   */
  render() {
    this.clearCanvas();
    this.svgPaths = [];
    this.nodeCache.clear();
    
    // Apply zoom transformation
    this.applyZoom();
    
    // Fill background
    this.drawBackground();
    
    // Calculate adaptive scaling
    const depthScale = Math.min(1.5, 1 + (this.config.maxDepthRender - 18) / 50);
    const scaledStemLength = this.config.stemLength * depthScale;
    const scaledInitialLength = this.config.initialLength * depthScale;
    
    // Warn about performance
    if (this.config.maxDepthRender > 50) {
      console.warn("High maxDepthRender may impact performance. Consider increasing minBranchLength or using zoom.");
    }
    
    if (this.config.survivalProb.length !== this.config.branchingPattern.length) {
      console.warn(`Survival probability array length (${this.config.survivalProb.length}) does not match branching pattern length (${this.config.branchingPattern.length}).`);
    }
    
    // Draw main stem
    this.drawMainStem(scaledStemLength);
    
    // Draw tree branches (two passes: pruned and surviving)
    const stemEndY = this.config.startY - scaledStemLength;
    this.drawTree(this.config.startX, stemEndY, scaledInitialLength, this.config.initialWidth, 0, 0, 0, true, 'pruned');
    this.drawTree(this.config.startX, stemEndY, scaledInitialLength, this.config.initialWidth, 0, 0, 0, false, 'surviving');
    
    // Reset transformation
    this.resetTransform();
    
    return this.svgPaths;
  }
  
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
  }
  
  applyZoom() {
    const zoom = this.config.zoomLevel;
    this.ctx.scale(zoom, zoom);
    this.ctx.translate(
      (1 - zoom) * this.config.canvasWidth / (2 * zoom), 
      (1 - zoom) * this.config.canvasHeight / (2 * zoom)
    );
  }
  
  resetTransform() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  
  drawBackground() {
    this.ctx.fillStyle = this.config.bgColor;
    this.ctx.fillRect(0, 0, this.config.canvasWidth, this.config.canvasHeight);
    this.svgPaths.push(`<rect x="0" y="0" width="${this.config.canvasWidth}" height="${this.config.canvasHeight}" fill="${this.config.bgColor}"/>`);
  }
  
  drawMainStem(scaledStemLength) {
    const stemStartX = this.config.startX;
    const stemStartY = this.config.startY;
    const stemEndY = stemStartY - scaledStemLength;
    const scheme = window.colorSchemes[this.config.colorScheme];
    const stemColor = scheme.baseColor;
    
    if (this.config.trunkTextureEnabled) {
      this.drawTrunkTexture(stemStartX, stemStartY, stemStartX, stemEndY, this.config.stemWidth, stemColor);
    } else {
      this.drawBranch(stemStartX, stemStartY, stemStartX, stemEndY, this.config.stemWidth, window.getColorFromGradient(0, this.config.maxDepthRender, this.config.colorScheme));
    }
    
    this.drawNode(stemStartX, stemEndY, this.config.nodeSize * 1.2, scheme.branchNodeColor, true);
  }
  
  drawTrunkTexture(x1, y1, x2, y2, width, color) {
    if (!this.config.trunkTextureEnabled) return;
    
    const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, color);
    
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = width;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();
    this.svgPaths.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`);
    
    const trunkLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const numLines = Math.floor(trunkLength / 10);
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const perpendicularAngle = angle + Math.PI / 2;
    
    const rgbColor = window.hexToRgb(window.colorSchemes[this.config.colorScheme].baseColor);
    const darkerColor = `rgba(${Math.max(0, rgbColor.r - 20)}, ${Math.max(0, rgbColor.g - 20)}, ${Math.max(0, rgbColor.b - 20)}, 0.4)`;
    
    this.ctx.strokeStyle = darkerColor;
    this.ctx.lineWidth = 1;
    
    for (let i = 0; i < numLines; i++) {
      const t = i / numLines;
      const pointX = x1 + t * (x2 - x1);
      const pointY = y1 + t * (y2 - y1);
      
      const lineLength = width * 0.3 * (Math.random() * 0.5 + 0.5);
      const offsetX = Math.cos(perpendicularAngle) * lineLength * (Math.random() > 0.5 ? 1 : -1);
      const offsetY = Math.sin(perpendicularAngle) * lineLength * (Math.random() > 0.5 ? 1 : -1);
      
      this.ctx.beginPath();
      this.ctx.moveTo(pointX, pointY);
      this.ctx.lineTo(pointX + offsetX, pointY + offsetY);
      this.ctx.stroke();
      this.svgPaths.push(`<line x1="${pointX}" y1="${pointY}" x2="${pointX + offsetX}" y2="${pointY + offsetY}" stroke="${darkerColor}" stroke-width="1"/>`);
    }
  }
  
  drawBranch(startX, startY, endX, endY, width, color, isPruned = false) {
    if (isPruned && this.config.showPruning) {
      // Pruned branches with dashed/faded effect
      this.ctx.setLineDash([width * 2, width * 1.5]);
      this.ctx.globalAlpha = 0.6;
      this.ctx.lineCap = 'round';
    } else {
      this.ctx.setLineDash([]);
      this.ctx.globalAlpha = 1.0;
      this.ctx.lineCap = 'round';
    }
    
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.strokeStyle = isPruned ? this.config.pruneColor : color;
    this.ctx.lineWidth = width;
    this.ctx.stroke();
    
    // Reset line dash and alpha
    this.ctx.setLineDash([]);
    this.ctx.globalAlpha = 1.0;
    
    const strokeDashArray = isPruned ? `stroke-dasharray="${width * 2},${width * 1.5}"` : '';
    const opacity = isPruned ? 'opacity="0.6"' : '';
    this.svgPaths.push(`<line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="${isPruned ? this.config.pruneColor : color}" stroke-width="${width}" stroke-linecap="round" ${strokeDashArray} ${opacity}/>`);
  }
  
  drawNode(x, y, radius, color, isBranchNode = false, isPruned = false) {
    if (!this.config.showNodes) return;
    
    // Enhanced node rendering with glow effects
    if (isPruned && this.config.showPruning) {
      // Pruned nodes get a subtle glow effect
      const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
      gradient.addColorStop(0, this.config.pruneColor + '80'); // Semi-transparent
      gradient.addColorStop(0.7, this.config.pruneColor + '40');
      gradient.addColorStop(1, this.config.pruneColor + '00'); // Fully transparent
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = isPruned ? this.config.pruneColor : color;
    this.ctx.fill();
    this.svgPaths.push(`<circle cx="${x}" cy="${y}" r="${radius}" fill="${isPruned ? this.config.pruneColor : color}"/>`);
    
    if (isBranchNode && this.config.highlightBranchNodes && !isPruned) {
      // Enhanced branch node highlighting
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.stroke();
      
      // Add inner glow for branch nodes
      const innerGradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
      innerGradient.addColorStop(0, '#ffffff40');
      innerGradient.addColorStop(1, '#ffffff00');
      this.ctx.fillStyle = innerGradient;
      this.ctx.fill();
      
      this.svgPaths.push(`<circle cx="${x}" cy="${y}" r="${radius}" fill="none" stroke="#ffffff" stroke-width="1"/>`);
    }
  }
  
  calculateBranchEndpoint(startX, startY, angle, length) {
    const radians = angle * Math.PI / 180;
    const endX = startX + Math.sin(radians) * length;
    const endY = startY - Math.cos(radians) * length;
    return { x: endX, y: endY };
  }
  
  /**
   * Core recursive tree drawing algorithm
   */
  drawTree(startX, startY, length, width, angle, depth, nodeId = 0, isPruned = false, pass = "pruned") {
    if (depth >= this.config.maxDepthRender || length < this.config.minBranchLength) {
      return;
    }
    
    const cacheKey = `${Math.round(startX)},${Math.round(startY)},${Math.round(length)},${Math.round(angle)},${pass}`;
    if (this.nodeCache.has(cacheKey)) {
      return;
    }
    this.nodeCache.set(cacheKey, true);
    
    const branchFactor = depth < this.config.branchingPattern.length
      ? this.config.branchingPattern[depth]
      : 1;
    
    let lengthDecay = this.config.lengthDecay;
    if (this.config.acceleratedDecay) {
      const depthFactor = Math.min(1, depth / 10);
      lengthDecay = this.config.lengthDecay * (1 - 0.3 * depthFactor);
    }
    
    const nextLength = length * lengthDecay;
    const nextWidth = Math.max(0.5, width * this.config.widthDecay);
    
    const maxDepth = Math.min(this.config.branchingPattern.length, this.config.maxDepthRender);
    const branchColor = window.getColorFromGradient(depth, maxDepth, this.config.colorScheme);
    
    let survivingBranches = branchFactor;
    let prunedBranches = [];
    
    if (this.config.showPruning && depth < this.config.survivalProb.length && branchFactor > 1) {
      const survivalProbability = this.config.survivalProb[depth];
      for (let i = 0; i < branchFactor; i++) {
        if (Math.random() >= survivalProbability) {
          prunedBranches.push(i);
        }
      }
    }
    
    if (branchFactor === 1) {
      // Single branch with variation
      const variation = (Math.random() - 0.5) * 5;
      const nextAngle = angle + variation;
      
      const endPoint = this.calculateBranchEndpoint(startX, startY, nextAngle, nextLength);
      if ((pass === 'pruned' && isPruned) || (pass === 'surviving' && !isPruned)) {
        this.drawBranch(startX, startY, endPoint.x, endPoint.y, nextWidth, branchColor, isPruned);
        const scheme = window.colorSchemes[this.config.colorScheme];
        this.drawNode(endPoint.x, endPoint.y, Math.max(1, this.config.nodeSize * 0.7 * (nextWidth / this.config.initialWidth)), scheme.nodeColor, false, isPruned);
      }
      this.drawTree(endPoint.x, endPoint.y, nextLength, nextWidth, nextAngle, depth + 1, nodeId * branchFactor, isPruned, pass);
    } else {
      // Multiple branches
      const scheme = window.colorSchemes[this.config.colorScheme];
      if ((pass === 'pruned' && isPruned) || (pass === 'surviving' && !isPruned)) {
        this.drawNode(startX, startY, Math.max(1.5, this.config.nodeSize * (width / this.config.initialWidth)), scheme.branchNodeColor, true, isPruned);
      }
      
      let baseAngleSpread = this.config.baseAngle;
      if (branchFactor > 3) {
        baseAngleSpread = this.config.baseAngle * Math.log(branchFactor) / Math.log(3);
      }
      
      const depthScaleFactor = Math.max(0.4, 1 - depth * 0.05);
      baseAngleSpread *= depthScaleFactor;
      
      for (let i = 0; i < branchFactor; i++) {
        let branchAngle;
        if (branchFactor === 2) {
          branchAngle = angle + (i === 0 ? -1 : 1) * baseAngleSpread;
        } else {
          const totalSpread = baseAngleSpread * 2;
          branchAngle = angle - totalSpread / 2 + (totalSpread * i / (branchFactor - 1));
        }
        
        const endPoint = this.calculateBranchEndpoint(startX, startY, branchAngle, nextLength);
        
        const isBranchPruned = this.config.showPruning && prunedBranches.includes(i);
        if ((pass === 'pruned' && (isPruned || isBranchPruned)) || (pass === 'surviving' && !(isPruned || isBranchPruned))) {
          this.drawBranch(startX, startY, endPoint.x, endPoint.y, nextWidth, branchColor, isPruned || isBranchPruned);
          this.drawNode(endPoint.x, endPoint.y, Math.max(1, this.config.nodeSize * 0.7 * (nextWidth / this.config.initialWidth)), scheme.nodeColor, false, isPruned || isBranchPruned);
        }
        
        if (depth < 15 || i % Math.max(1, Math.floor(branchFactor / 3)) === 0) {
          this.drawTree(endPoint.x, endPoint.y, nextLength, nextWidth, branchAngle, depth + 1, nodeId * branchFactor + i + 1, isPruned || isBranchPruned, pass);
        }
      }
    }
  }
  
  /**
   * Export current canvas as image
   */
  exportAsImage(format = 'png-1x') {
    let mimeType = 'image/png';
    let scale = 1;
    
    if (format === 'png-2x') scale = 2;
    if (format === 'png-4x') scale = 4;
    
    if (format.startsWith('png')) {
      if (scale === 1) {
        return this.canvas.toDataURL(mimeType);
      } else {
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = this.config.canvasWidth * scale;
        exportCanvas.height = this.config.canvasHeight * scale;
        const exportCtx = exportCanvas.getContext('2d');
        exportCtx.scale(scale, scale);
        exportCtx.drawImage(this.canvas, 0, 0);
        return exportCanvas.toDataURL(mimeType);
      }
    } else if (format === 'svg') {
      const svgContent = `
        <svg width="${this.config.canvasWidth}" height="${this.config.canvasHeight}" xmlns="http://www.w3.org/2000/svg">
          ${this.svgPaths.join('\n')}
        </svg>
      `;
      return svgContent;
    }
    
    return null;
  }
  
  /**
   * Get current SVG paths for export
   */
  getSvgPaths() {
    return this.svgPaths;
  }
};
