/**
 * Film WebGL Shader System
 * Realistic film stock emulation using WebGL shaders
 * Optimized for performance and visual fidelity
 */

export type FilmStock =
  | 'kodak-gold-200'
  | 'kodak-ultramax-400'
  | 'kodak-portra-400'
  | 'fujifilm-superia-400'
  | 'fujifilm-velvia-50'
  | 'fujifilm-provia-100f'
  | 'ilford-hp5-plus-400'
  | 'kodak-tri-x-400'
  | 'ilford-fp4-plus-125'
  | 'kodak-t-max-100'
  | 'cinestill-800t';

interface FilmCharacteristics {
  name: string;
  grain: number;
  contrast: number;
  saturation: number;
  warmth: number;
  highlights: number;
  shadows: number;
  redCurve: [number, number, number];
  greenCurve: [number, number, number];
  blueCurve: [number, number, number];
  halation: number;
  blackAndWhite: boolean;
  grainSize: number;
}

const FILM_CHARACTERISTICS: Record<FilmStock, FilmCharacteristics> = {
  'kodak-gold-200': {
    name: 'Kodak Gold 200',
    grain: 0.15,
    contrast: 1.08,
    saturation: 1.15,
    warmth: 0.12,
    highlights: 0.95,
    shadows: 1.05,
    redCurve: [1.08, 0.98, 1.02],
    greenCurve: [0.95, 1.0, 0.98],
    blueCurve: [0.88, 0.92, 0.95],
    halation: 0.0,
    blackAndWhite: false,
    grainSize: 1.2,
  },
  'kodak-ultramax-400': {
    name: 'Kodak Ultramax 400',
    grain: 0.22,
    contrast: 1.12,
    saturation: 1.25,
    warmth: 0.08,
    highlights: 0.92,
    shadows: 1.08,
    redCurve: [1.1, 1.02, 1.05],
    greenCurve: [0.98, 1.05, 1.0],
    blueCurve: [0.9, 0.95, 0.98],
    halation: 0.0,
    blackAndWhite: false,
    grainSize: 1.5,
  },
  'kodak-portra-400': {
    name: 'Kodak Portra 400',
    grain: 0.12,
    contrast: 1.05,
    saturation: 1.08,
    warmth: 0.05,
    highlights: 0.98,
    shadows: 1.02,
    redCurve: [1.02, 1.0, 1.01],
    greenCurve: [0.98, 1.0, 0.99],
    blueCurve: [0.96, 0.98, 0.99],
    halation: 0.0,
    blackAndWhite: false,
    grainSize: 1.0,
  },
  'fujifilm-superia-400': {
    name: 'Fujifilm Superia 400',
    grain: 0.2,
    contrast: 1.1,
    saturation: 1.18,
    warmth: -0.05,
    highlights: 0.93,
    shadows: 1.06,
    redCurve: [1.05, 1.0, 1.02],
    greenCurve: [0.95, 1.08, 1.02],
    blueCurve: [0.92, 1.05, 1.08],
    halation: 0.0,
    blackAndWhite: false,
    grainSize: 1.4,
  },
  'fujifilm-velvia-50': {
    name: 'Fujifilm Velvia 50',
    grain: 0.08,
    contrast: 1.25,
    saturation: 1.45,
    warmth: 0.02,
    highlights: 0.88,
    shadows: 1.15,
    redCurve: [1.15, 1.08, 1.1],
    greenCurve: [0.95, 1.12, 1.08],
    blueCurve: [0.88, 1.05, 1.15],
    halation: 0.0,
    blackAndWhite: false,
    grainSize: 0.8,
  },
  'fujifilm-provia-100f': {
    name: 'Fujifilm Provia 100F',
    grain: 0.1,
    contrast: 1.08,
    saturation: 1.12,
    warmth: 0.0,
    highlights: 0.96,
    shadows: 1.04,
    redCurve: [1.0, 1.0, 1.0],
    greenCurve: [1.0, 1.0, 1.0],
    blueCurve: [1.0, 1.0, 1.0],
    halation: 0.0,
    blackAndWhite: false,
    grainSize: 0.9,
  },
  'ilford-hp5-plus-400': {
    name: 'Ilford HP5 Plus 400',
    grain: 0.28,
    contrast: 1.15,
    saturation: 0.0,
    warmth: 0.0,
    highlights: 0.9,
    shadows: 1.12,
    redCurve: [1.0, 1.0, 1.0],
    greenCurve: [1.0, 1.0, 1.0],
    blueCurve: [1.0, 1.0, 1.0],
    halation: 0.0,
    blackAndWhite: true,
    grainSize: 1.6,
  },
  'kodak-tri-x-400': {
    name: 'Kodak Tri-X 400',
    grain: 0.32,
    contrast: 1.22,
    saturation: 0.0,
    warmth: 0.0,
    highlights: 0.88,
    shadows: 1.18,
    redCurve: [1.0, 1.0, 1.0],
    greenCurve: [1.0, 1.0, 1.0],
    blueCurve: [1.0, 1.0, 1.0],
    halation: 0.0,
    blackAndWhite: true,
    grainSize: 1.8,
  },
  'ilford-fp4-plus-125': {
    name: 'Ilford FP4 Plus 125',
    grain: 0.18,
    contrast: 1.12,
    saturation: 0.0,
    warmth: 0.0,
    highlights: 0.93,
    shadows: 1.08,
    redCurve: [1.0, 1.0, 1.0],
    greenCurve: [1.0, 1.0, 1.0],
    blueCurve: [1.0, 1.0, 1.0],
    halation: 0.0,
    blackAndWhite: true,
    grainSize: 1.2,
  },
  'kodak-t-max-100': {
    name: 'Kodak T-Max 100',
    grain: 0.12,
    contrast: 1.18,
    saturation: 0.0,
    warmth: 0.0,
    highlights: 0.92,
    shadows: 1.1,
    redCurve: [1.0, 1.0, 1.0],
    greenCurve: [1.0, 1.0, 1.0],
    blueCurve: [1.0, 1.0, 1.0],
    halation: 0.0,
    blackAndWhite: true,
    grainSize: 0.9,
  },
  'cinestill-800t': {
    name: 'CineStill 800T',
    grain: 0.25,
    contrast: 1.08,
    saturation: 1.15,
    warmth: 0.15,
    highlights: 0.85,
    shadows: 1.05,
    redCurve: [1.12, 1.05, 1.08],
    greenCurve: [0.95, 1.0, 0.98],
    blueCurve: [0.85, 0.88, 0.92],
    halation: 0.35,
    blackAndWhite: false,
    grainSize: 1.5,
  },
};

// Vertex shader - simple pass-through
const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

// Fragment shader - film emulation with all effects
const FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform float u_grain;
  uniform float u_contrast;
  uniform float u_saturation;
  uniform float u_warmth;
  uniform float u_highlights;
  uniform float u_shadows;
  uniform vec3 u_redCurve;
  uniform vec3 u_greenCurve;
  uniform vec3 u_blueCurve;
  uniform float u_halation;
  uniform float u_blackAndWhite;
  uniform float u_grainSize;
  uniform float u_time;
  
  varying vec2 v_texCoord;
  
  // High-quality pseudo-random number generator
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  // Perlin-like noise for organic grain
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  // Fractal noise for realistic grain structure
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(st * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    
    return value;
  }
  
  // Film grain with varying intensity
  vec3 applyGrain(vec3 color, vec2 uv, float intensity, float size) {
    if (intensity <= 0.0) return color;
    
    vec2 grainCoord = uv * u_resolution / size + vec2(u_time * 0.001);
    float grainValue = fbm(grainCoord) * 2.0 - 1.0;
    
    // Grain intensity varies with luminance (more visible in midtones)
    float luma = dot(color, vec3(0.299, 0.587, 0.114));
    float grainMask = 1.0 - abs(luma * 2.0 - 1.0);
    grainMask = pow(grainMask, 0.7) * 1.5;
    
    return color + grainValue * intensity * grainMask * 0.1;
  }
  
  // S-curve for contrast
  float applySCurve(float x, float strength) {
    x = clamp(x, 0.0, 1.0);
    float s = strength - 1.0;
    return (x - 0.5) * (1.0 + s) / (1.0 + s * abs(x - 0.5) * 2.0) + 0.5;
  }
  
  // Color curves with toe and shoulder
  vec3 applyColorCurves(vec3 color, vec3 rCurve, vec3 gCurve, vec3 bCurve) {
    float r = pow(color.r, 1.0 / rCurve.x) * rCurve.y + (1.0 - rCurve.y) * rCurve.z;
    float g = pow(color.g, 1.0 / gCurve.x) * gCurve.y + (1.0 - gCurve.y) * gCurve.z;
    float b = pow(color.b, 1.0 / bCurve.x) * bCurve.y + (1.0 - bCurve.y) * bCurve.z;
    
    return vec3(r, g, b);
  }
  
  // Highlight and shadow adjustments
  vec3 adjustTones(vec3 color, float highlights, float shadows) {
    float luma = dot(color, vec3(0.299, 0.587, 0.114));
    
    // Separate highlights and shadows
    float highlightMask = smoothstep(0.5, 1.0, luma);
    float shadowMask = smoothstep(0.5, 0.0, luma);
    
    color = mix(color, color * highlights, highlightMask);
    color = mix(color, color * shadows, shadowMask);
    
    return color;
  }
  
  // Halation effect (light bloom around highlights)
  vec3 applyHalation(vec2 uv, float intensity) {
    if (intensity <= 0.0) return vec3(0.0);
    
    vec3 bloom = vec3(0.0);
    const int SAMPLES = 16;
    float radius = 0.01 * intensity;
    
    for (int i = 0; i < SAMPLES; i++) {
      float angle = (float(i) / float(SAMPLES)) * 6.28318;
      vec2 offset = vec2(cos(angle), sin(angle)) * radius;
      vec3 sample = texture2D(u_image, uv + offset).rgb;
      
      // Only bright areas contribute to halation
      float brightness = max(max(sample.r, sample.g), sample.b);
      if (brightness > 0.8) {
        bloom += sample * (brightness - 0.8) * 5.0;
      }
    }
    
    bloom /= float(SAMPLES);
    
    // Red halation characteristic of CineStill
    bloom.r *= 1.5;
    bloom.g *= 0.8;
    bloom.b *= 0.6;
    
    return bloom * 0.3;
  }
  
  // Black and white conversion with color channel weighting
  vec3 toBlackAndWhite(vec3 color) {
    // Classic black and white film sensitivity
    float luma = dot(color, vec3(0.3, 0.59, 0.11));
    return vec3(luma);
  }
  
  // RGB to HSV
  vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }
  
  // HSV to RGB
  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }
  
  void main() {
    vec2 uv = v_texCoord;
    vec3 color = texture2D(u_image, uv).rgb;
    
    // Apply halation first (affects highlights)
    if (u_halation > 0.0) {
      vec3 halation = applyHalation(uv, u_halation);
      color += halation;
    }
    
    // Apply color curves for film response
    color = applyColorCurves(color, u_redCurve, u_greenCurve, u_blueCurve);
    
    // Warmth adjustment
    if (u_warmth != 0.0) {
      color.r = color.r + u_warmth * 0.1;
      color.b = color.b - u_warmth * 0.08;
    }
    
    // Saturation
    if (u_blackAndWhite < 0.5) {
      vec3 hsv = rgb2hsv(color);
      hsv.y *= u_saturation;
      color = hsv2rgb(hsv);
    } else {
      color = toBlackAndWhite(color);
    }
    
    // Contrast with S-curve
    color.r = applySCurve(color.r, u_contrast);
    color.g = applySCurve(color.g, u_contrast);
    color.b = applySCurve(color.b, u_contrast);
    
    // Highlight and shadow adjustments
    color = adjustTones(color, u_highlights, u_shadows);
    
    // Apply film grain
    color = applyGrain(color, uv, u_grain, u_grainSize);
    
    // Clamp to valid range
    color = clamp(color, 0.0, 1.0);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export class FilmWebGL {
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private sourceTexture: WebGLTexture | null = null;
  private positionBuffer: WebGLBuffer | null = null;
  private texCoordBuffer: WebGLBuffer | null = null;
  private startTime: number = Date.now();
  private currentFilmStock: FilmStock = 'kodak-portra-400';

  constructor(private canvas: HTMLCanvasElement) {
    this.initialize();
  }

  private initialize(): boolean {
    const gl = this.canvas.getContext('webgl', {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: true,
    });

    if (!gl) {
      console.error('WebGL not supported');
      return false;
    }

    this.gl = gl;

    // Create shader program
    const vertexShader = this.createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = this.createShader(
      gl.FRAGMENT_SHADER,
      FRAGMENT_SHADER,
    );

    if (!vertexShader || !fragmentShader) {
      return false;
    }

    this.program = this.createProgram(vertexShader, fragmentShader);

    if (!this.program) {
      return false;
    }

    // Set up geometry buffers
    this.setupBuffers();

    return true;
  }

  private createShader(type: number, source: string): WebGLShader | null {
    if (!this.gl) return null;

    const shader = this.gl.createShader(type);
    if (!shader) return null;

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(
        'Shader compilation error:',
        this.gl.getShaderInfoLog(shader),
      );
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  private createProgram(
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader,
  ): WebGLProgram | null {
    if (!this.gl) return null;

    const program = this.gl.createProgram();
    if (!program) return null;

    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error(
        'Program linking error:',
        this.gl.getProgramInfoLog(program),
      );
      this.gl.deleteProgram(program);
      return null;
    }

    return program;
  }

  private setupBuffers(): void {
    if (!this.gl) return;

    // Position buffer (full screen quad)
    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);

    this.positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

    // Texture coordinate buffer
    const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]);

    this.texCoordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, texCoords, this.gl.STATIC_DRAW);
  }

  public loadImage(image: HTMLImageElement): void {
    if (!this.gl) return;

    // Create texture
    this.sourceTexture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.sourceTexture);

    // Set texture parameters for high quality
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE,
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE,
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.LINEAR,
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MAG_FILTER,
      this.gl.LINEAR,
    );

    // Upload image
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      image,
    );

    // Set canvas size to match image
    this.canvas.width = image.width;
    this.canvas.height = image.height;
    this.gl.viewport(0, 0, image.width, image.height);
  }

  public setFilmStock(filmStock: FilmStock): void {
    this.currentFilmStock = filmStock;
    this.render();
  }

  public render(): void {
    if (!this.gl || !this.program || !this.sourceTexture) return;

    const characteristics = FILM_CHARACTERISTICS[this.currentFilmStock];

    this.gl.useProgram(this.program);

    // Set up attributes
    const positionLocation = this.gl.getAttribLocation(
      this.program,
      'a_position',
    );
    const texCoordLocation = this.gl.getAttribLocation(
      this.program,
      'a_texCoord',
    );

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(
      positionLocation,
      2,
      this.gl.FLOAT,
      false,
      0,
      0,
    );

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
    this.gl.enableVertexAttribArray(texCoordLocation);
    this.gl.vertexAttribPointer(
      texCoordLocation,
      2,
      this.gl.FLOAT,
      false,
      0,
      0,
    );

    // Set uniforms
    this.gl.uniform1i(this.gl.getUniformLocation(this.program, 'u_image'), 0);
    this.gl.uniform2f(
      this.gl.getUniformLocation(this.program, 'u_resolution'),
      this.canvas.width,
      this.canvas.height,
    );
    this.gl.uniform1f(
      this.gl.getUniformLocation(this.program, 'u_grain'),
      characteristics.grain,
    );
    this.gl.uniform1f(
      this.gl.getUniformLocation(this.program, 'u_contrast'),
      characteristics.contrast,
    );
    this.gl.uniform1f(
      this.gl.getUniformLocation(this.program, 'u_saturation'),
      characteristics.saturation,
    );
    this.gl.uniform1f(
      this.gl.getUniformLocation(this.program, 'u_warmth'),
      characteristics.warmth,
    );
    this.gl.uniform1f(
      this.gl.getUniformLocation(this.program, 'u_highlights'),
      characteristics.highlights,
    );
    this.gl.uniform1f(
      this.gl.getUniformLocation(this.program, 'u_shadows'),
      characteristics.shadows,
    );
    this.gl.uniform3fv(
      this.gl.getUniformLocation(this.program, 'u_redCurve'),
      characteristics.redCurve,
    );
    this.gl.uniform3fv(
      this.gl.getUniformLocation(this.program, 'u_greenCurve'),
      characteristics.greenCurve,
    );
    this.gl.uniform3fv(
      this.gl.getUniformLocation(this.program, 'u_blueCurve'),
      characteristics.blueCurve,
    );
    this.gl.uniform1f(
      this.gl.getUniformLocation(this.program, 'u_halation'),
      characteristics.halation,
    );
    this.gl.uniform1f(
      this.gl.getUniformLocation(this.program, 'u_blackAndWhite'),
      characteristics.blackAndWhite ? 1.0 : 0.0,
    );
    this.gl.uniform1f(
      this.gl.getUniformLocation(this.program, 'u_grainSize'),
      characteristics.grainSize,
    );
    this.gl.uniform1f(
      this.gl.getUniformLocation(this.program, 'u_time'),
      Date.now() - this.startTime,
    );

    // Bind texture
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.sourceTexture);

    // Draw
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }

  public dispose(): void {
    if (!this.gl) return;

    if (this.sourceTexture) {
      this.gl.deleteTexture(this.sourceTexture);
      this.sourceTexture = null;
    }

    if (this.positionBuffer) {
      this.gl.deleteBuffer(this.positionBuffer);
      this.positionBuffer = null;
    }

    if (this.texCoordBuffer) {
      this.gl.deleteBuffer(this.texCoordBuffer);
      this.texCoordBuffer = null;
    }

    if (this.program) {
      this.gl.deleteProgram(this.program);
      this.program = null;
    }

    this.gl = null;
  }

  public getAvailableFilmStocks(): Array<{ id: FilmStock; name: string }> {
    return Object.entries(FILM_CHARACTERISTICS).map(([id, char]) => ({
      id: id as FilmStock,
      name: char.name,
    }));
  }

  public getCurrentFilmStock(): FilmStock {
    return this.currentFilmStock;
  }

  public exportToDataURL(quality: number = 0.95): string {
    return this.canvas.toDataURL('image/png', quality);
  }

  public exportToBlob(
    callback: (blob: Blob | null) => void,
    quality: number = 0.95,
  ): void {
    this.canvas.toBlob(callback, 'image/png', quality);
  }
}

// Helper function to create and initialize FilmWebGL instance
export function createFilmRenderer(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  filmStock: FilmStock = 'kodak-portra-400',
): FilmWebGL {
  const renderer = new FilmWebGL(canvas);
  renderer.loadImage(image);
  renderer.setFilmStock(filmStock);
  return renderer;
}

// Helper to get all available film stocks
export function getFilmStocks(): Array<{
  id: FilmStock;
  name: string;
  type: string;
}> {
  return Object.entries(FILM_CHARACTERISTICS).map(([id, char]) => ({
    id: id as FilmStock,
    name: char.name,
    type: char.blackAndWhite ? 'Black & White' : 'Color',
  }));
}
