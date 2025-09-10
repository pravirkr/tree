console.log("Loading EnhancedFractalTree...");

const { React, ReactDOM } = window;

const EnhancedFractalTree = () => {
  const canvasRef = React.useRef(null);
  const [svgPaths, setSvgPaths] = React.useState([]);
  const [isSavingGif, setIsSavingGif] = React.useState(false);

  const [config, setConfig] = React.useState(window.defaultConfig);

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  // Initialize custom color schemes
  React.useEffect(() => {
    window.initializeCustomColorSchemes();
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new window.FractalTreeRenderer(canvas, config);
    const newSvgPaths = renderer.render();
    setSvgPaths(newSvgPaths);
  }, [config]);

  const saveAsImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new window.FractalTreeRenderer(canvas, config);
    const dataUrl = renderer.exportAsImage(config.exportFormat);
    
    if (config.exportFormat === 'svg') {
      const blob = new Blob([dataUrl], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'yggdrasil-tree.svg';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } else {
      const link = document.createElement('a');
      link.download = `yggdrasil-tree-${config.exportFormat}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const saveSnapshots = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsSavingGif(true);

    // Helper to update config and wait for canvas to update
    function updateConfigAndWait(newConfig) {
      return new Promise(resolve => {
        setConfig(prev => {
          const updated = typeof newConfig === 'function' ? newConfig(prev) : { ...prev, ...newConfig };
          return updated;
        });
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve);
        });
      });
    }

    // Helper to save the canvas as PNG at the selected scale
    function saveCanvasAsPng(filename, scale = 1) {
      const renderer = new window.FractalTreeRenderer(canvas, config);
      const dataUrl = renderer.exportAsImage(scale === 1 ? 'png-1x' : `png-${scale}x`);
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
    }

    // Determine scale from exportFormat
    let scale = 1;
    if (config.exportFormat === 'png-2x') scale = 2;
    if (config.exportFormat === 'png-4x') scale = 4;

    // 1. Save the full tree (no pruning)
    await updateConfigAndWait({ showPruning: false });
    saveCanvasAsPng('yggdrasil-tree_000.png', scale);

    // 2. Save 10 pruned trees
    for (let i = 1; i <= 10; i++) {
      await updateConfigAndWait({ showPruning: true, _pruneSeed: Math.random() });
      const num = String(i).padStart(3, '0');
      saveCanvasAsPng(`yggdrasil-tree_${num}.png`, scale);
    }

    setIsSavingGif(false);
  };

  return React.createElement('div', { className: "container mx-auto py-8" },
    React.createElement('header', { className: "mb-8" },
      React.createElement('h1', { className: "text-4xl font-bold text-center text-gray-800" }, 'Yggdrasil Fractal Tree'),
      React.createElement('p', { className: "text-center text-gray-600 mt-2" },
        'An interactive fractal tree visualization inspired by the World Tree'
      )
    ),

    React.createElement('div', { className: "flex flex-col xl:flex-row gap-8" },
      React.createElement('div', { className: "flex-1" },
        React.createElement('canvas', {
          ref: canvasRef,
          width: config.canvasWidth,
          height: config.canvasHeight,
          className: "w-full h-auto"
        }),
        React.createElement('div', { className: "mt-4 flex justify-center gap-4" },
          React.createElement('button', {
            onClick: saveAsImage,
            className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          }, 'Save as Image'),
          React.createElement('button', {
            onClick: saveSnapshots,
            className: `px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors ${isSavingGif ? 'opacity-50 cursor-not-allowed' : ''}`,
            disabled: isSavingGif
          }, isSavingGif ? 'Saving...' : 'Save Snapshots'),
          React.createElement('select', {
            value: config.exportFormat,
            onChange: (e) => updateConfig('exportFormat', e.target.value),
            className: "px-4 py-2 border rounded-md bg-white text-gray-800"
          }, 
            window.exportFormats.map(format => 
              React.createElement('option', { key: format.value, value: format.value }, format.label)
            )
          )
        ),

        // Color Scheme Swatch Grid
        React.createElement('div', { className: "bg-white rounded-xl shadow-lg p-6 mt-8" },
          React.createElement('h3', { className: "text-lg font-medium text-gray-700 mb-4 text-center" }, 'Color Schemes'),
          React.createElement('div', { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6" },
            Object.keys(window.colorSchemes).map((scheme) =>
              React.createElement('div', {
                key: scheme,
                className: `p-2 rounded-lg cursor-pointer transition-transform duration-200 ${config.colorScheme === scheme ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-105'}`,
                onClick: () => updateConfig('colorScheme', scheme)
              },
                React.createElement('div', { className: "h-8 w-full rounded overflow-hidden flex" },
                  window.colorSchemes[scheme].gradient.map((item, i) =>
                    React.createElement('div', {
                      key: i,
                      className: "h-full flex-grow",
                      style: { backgroundColor: item.color }
                    })
                  )
                ),
                React.createElement('div', { className: "text-center text-xs mt-1 font-medium capitalize" },
                  scheme
                )
              )
            )
          ),
          React.createElement('h3', { className: "text-lg font-medium text-gray-700 mb-4 text-center" }, 'Presets'),
          React.createElement('div', { className: "grid grid-cols-2 sm:grid-cols-3 gap-3" },
            window.treePresets.map(({ name, color, ...settings }) =>
              React.createElement('button', {
                key: name,
                onClick: () => setConfig({ ...config, colorScheme: color, ...settings }),
                className: "px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
              }, name)
            )
          )
        )
      ),

      React.createElement('div', { className: "xl:w-1/3 bg-white p-6 rounded-lg shadow-md" },
        React.createElement('h2', { className: "text-2xl font-semibold mb-4 text-gray-800" }, 'Controls'),

        React.createElement('div', { className: "space-y-6" },
          // Geometry Section
          React.createElement('div', null,
            React.createElement('h3', { className: "text-lg font-medium text-gray-700 mb-2" }, 'Geometry'),
            React.createElement('div', { className: "space-y-4" },
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-medium text-gray-600" }, `Stem Length (${config.stemLength}px)`),
                React.createElement('input', {
                  type: "range",
                  min: "50",
                  max: "300",
                  step: "1",
                  value: config.stemLength,
                  onChange: (e) => updateConfig('stemLength', parseFloat(e.target.value)),
                  className: "w-full"
                })
              ),
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-medium text-gray-600" }, `Initial Branch Length (${config.initialLength}px)`),
                React.createElement('input', {
                  type: "range",
                  min: "50",
                  max: "250",
                  step: "1",
                  value: config.initialLength,
                  onChange: (e) => updateConfig('initialLength', parseFloat(e.target.value)),
                  className: "w-full"
                })
              ),
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-medium text-gray-600" }, `Length Decay (${(config.lengthDecay * 100).toFixed(0)}%)`),
                React.createElement('input', {
                  type: "range",
                  min: "0.2",
                  max: "0.9",
                  step: "0.01",
                  value: config.lengthDecay,
                  onChange: (e) => updateConfig('lengthDecay', parseFloat(e.target.value)),
                  className: "w-full"
                })
              ),
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-medium text-gray-600" }, `Width Decay (${(config.widthDecay * 100).toFixed(0)}%)`),
                React.createElement('input', {
                  type: "range",
                  min: "0.3",
                  max: "0.9",
                  step: "0.01",
                  value: config.widthDecay,
                  onChange: (e) => updateConfig('widthDecay', parseFloat(e.target.value)),
                  className: "w-full"
                })
              ),
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-medium text-gray-600" }, `Branch Angle (${config.baseAngle}°)`),
                React.createElement('input', {
                  type: "range",
                  min: "10",
                  max: "75",
                  step: "1",
                  value: config.baseAngle,
                  onChange: (e) => updateConfig('baseAngle', parseFloat(e.target.value)),
                  className: "w-full"
                })
              )
            )
          ),

          // Appearance Section
          React.createElement('div', null,
            React.createElement('h3', { className: "text-lg font-medium text-gray-700 mb-2" }, 'Appearance'),
            React.createElement('div', { className: "space-y-4" },
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-medium text-gray-600" }, `Node Size (${config.nodeSize}px)`),
                React.createElement('input', {
                  type: "range",
                  min: "1",
                  max: "12",
                  step: "0.1",
                  value: config.nodeSize,
                  onChange: (e) => updateConfig('nodeSize', parseFloat(e.target.value)),
                  className: "w-full"
                })
              ),
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-medium text-gray-600" }, 'Color Scheme'),
                React.createElement('select', {
                  value: config.colorScheme,
                  onChange: (e) => updateConfig('colorScheme', e.target.value),
                  className: "w-full px-3 py-2 border rounded-md"
                },
                  Object.keys(window.colorSchemes).map(scheme =>
                    React.createElement('option', { key: scheme, value: scheme }, scheme.charAt(0).toUpperCase() + scheme.slice(1))
                  )
                )
              ),
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-medium text-gray-600" }, 'Background Color'),
                React.createElement('input', {
                  type: "color",
                  value: config.bgColor,
                  onChange: (e) => updateConfig('bgColor', e.target.value),
                  className: "w-full h-10 border rounded-md"
                })
              ),
              React.createElement('div', { className: "flex items-center" },
                React.createElement('input', {
                  type: "checkbox",
                  checked: config.showNodes,
                  onChange: (e) => updateConfig('showNodes', e.target.checked),
                  className: "h-4 w-4 text-blue-600 border-gray-300 rounded"
                }),
                React.createElement('label', { className: "ml-2 text-sm text-gray-600" }, 'Show Nodes')
              ),
              React.createElement('div', { className: "flex items-center" },
                React.createElement('input', {
                  type: "checkbox",
                  checked: config.highlightBranchNodes,
                  onChange: (e) => updateConfig('highlightBranchNodes', e.target.checked),
                  className: "h-4 w-4 text-blue-600 border-gray-300 rounded"
                }),
                React.createElement('label', { className: "ml-2 text-sm text-gray-600" }, 'Highlight Branch Nodes')
              ),
              React.createElement('div', { className: "flex items-center" },
                React.createElement('input', {
                  type: "checkbox",
                  checked: config.trunkTextureEnabled,
                  onChange: (e) => updateConfig('trunkTextureEnabled', e.target.checked),
                  className: "h-4 w-4 text-blue-600 border-gray-300 rounded"
                }),
                React.createElement('label', { className: "ml-2 text-sm text-gray-600" }, 'Enable Trunk Texture')
              ),
              React.createElement('div', { className: "flex items-center" },
                React.createElement('input', {
                  type: "checkbox",
                  checked: config.showPruning,
                  onChange: (e) => updateConfig('showPruning', e.target.checked),
                  className: "h-4 w-4 text-blue-600 border-gray-300 rounded"
                }),
                React.createElement('label', { className: "ml-2 text-sm text-gray-600" }, 'Show Pruning')
              )
            )
          ),

          // Performance Section
          React.createElement('div', null,
            React.createElement('h3', { className: "text-lg font-medium text-gray-700 mb-2" }, 'Performance'),
            React.createElement('div', { className: "space-y-4" },
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-medium text-gray-600" }, `Max Render Depth (${config.maxDepthRender})`),
                React.createElement('input', {
                  type: "range",
                  min: "8",
                  max: "128",
                  step: "1",
                  value: config.maxDepthRender,
                  onChange: (e) => updateConfig('maxDepthRender', parseInt(e.target.value)),
                  className: "w-full"
                })
              ),
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-medium text-gray-600" }, `Min Branch Length (${config.minBranchLength}px)`),
                React.createElement('input', {
                  type: "range",
                  min: "0.5",
                  max: "15",
                  step: "0.1",
                  value: config.minBranchLength,
                  onChange: (e) => updateConfig('minBranchLength', parseFloat(e.target.value)),
                  className: "w-full"
                })
              ),
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-medium text-gray-600" }, `Zoom Level (${config.zoomLevel.toFixed(2)}x)`),
                React.createElement('input', {
                  type: "range",
                  min: "1",
                  max: "4",
                  step: "0.1",
                  value: config.zoomLevel,
                  onChange: (e) => updateConfig('zoomLevel', parseFloat(e.target.value)),
                  className: "w-full"
                })
              ),
              React.createElement('div', { className: "flex items-center" },
                React.createElement('input', {
                  type: "checkbox",
                  checked: config.acceleratedDecay,
                  onChange: (e) => updateConfig('acceleratedDecay', e.target.checked),
                  className: "h-4 w-4 text-blue-600 border-gray-300 rounded"
                }),
                React.createElement('label', { className: "ml-2 text-sm text-gray-600" }, 'Accelerated Decay')
              )
            )
          )
        )
      )
    ),

    React.createElement('footer', { className: "mt-8 text-center text-gray-600" },
      React.createElement('p', null, 'Built with React & Tailwind CSS'),
      React.createElement('p', null, 'Inspired by the mythological Yggdrasil, the World Tree')
    )
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(EnhancedFractalTree));
