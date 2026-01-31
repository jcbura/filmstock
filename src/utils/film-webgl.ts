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
    grain: 0.16,
    contrast: 1.08,
    saturation: 1.18,
    warmth: 0.15,
    highlights: 0.93,
    shadows: 1.06,
    redCurve: [1.12, 0.97, 1.03],
    greenCurve: [0.95, 1.0, 0.98],
    blueCurve: [0.88, 0.92, 0.95],
    halation: 0.0,
    blackAndWhite: false,
    grainSize: 1.2,
  },
  'kodak-ultramax-400': {
    name: 'Kodak Ultramax 400',
    grain: 0.24,
    contrast: 1.15,
    saturation: 1.22,
    warmth: 0.05,
    highlights: 0.88,
    shadows: 1.12,
    redCurve: [1.18, 1.0, 1.06],
    greenCurve: [0.98, 1.05, 1.0],
    blueCurve: [0.92, 0.97, 1.02],
    halation: 0.0,
    blackAndWhite: false,
    grainSize: 1.6,
  },
  'kodak-portra-400': {
    name: 'Kodak Portra 400',
    grain: 0.1,
    contrast: 1.04,
    saturation: 1.06,
    warmth: 0.03,
    highlights: 0.96,
    shadows: 1.01,
    redCurve: [1.01, 1.0, 1.005],
    greenCurve: [0.99, 1.0, 0.995],
    blueCurve: [0.97, 0.99, 0.995],
    halation: 0.0,
    blackAndWhite: false,
    grainSize: 0.9,
  },
  'fujifilm-superia-400': {
    name: 'Fujifilm Superia 400',
    grain: 0.22,
    contrast: 1.1,
    saturation: 1.14,
    warmth: -0.08,
    highlights: 0.94,
    shadows: 1.08,
    redCurve: [1.03, 0.98, 1.01],
    greenCurve: [0.93, 1.12, 1.04],
    blueCurve: [0.92, 1.05, 1.08],
    halation: 0.0,
    blackAndWhite: false,
    grainSize: 1.5,
  },
  'fujifilm-velvia-50': {
    name: 'Fujifilm Velvia 50',
    grain: 0.06,
    contrast: 1.28,
    saturation: 1.4,
    warmth: -0.02,
    highlights: 0.86,
    shadows: 1.18,
    redCurve: [1.18, 1.1, 1.12],
    greenCurve: [0.92, 1.15, 1.1],
    blueCurve: [0.85, 1.08, 1.18],
    halation: 0.0,
    blackAndWhite: false,
    grainSize: 0.7,
  },
  'fujifilm-provia-100f': {
    name: 'Fujifilm Provia 100F',
    grain: 0.09,
    contrast: 1.08,
    saturation: 1.1,
    warmth: -0.03,
    highlights: 0.94,
    shadows: 1.03,
    redCurve: [1.0, 1.0, 1.0],
    greenCurve: [1.0, 1.0, 1.0],
    blueCurve: [1.0, 1.0, 1.0],
    halation: 0.0,
    blackAndWhite: false,
    grainSize: 0.85,
  },
  'ilford-hp5-plus-400': {
    name: 'Ilford HP5 Plus 400',
    grain: 0.3,
    contrast: 1.12,
    saturation: 0.0,
    warmth: 0.0,
    highlights: 0.92,
    shadows: 1.1,
    redCurve: [1.0, 1.0, 1.0],
    greenCurve: [1.0, 1.0, 1.0],
    blueCurve: [1.0, 1.0, 1.0],
    halation: 0.0,
    blackAndWhite: true,
    grainSize: 1.7,
  },
  'kodak-tri-x-400': {
    name: 'Kodak Tri-X 400',
    grain: 0.38,
    contrast: 1.25,
    saturation: 0.0,
    warmth: 0.0,
    highlights: 0.87,
    shadows: 1.2,
    redCurve: [1.0, 1.0, 1.0],
    greenCurve: [1.0, 1.0, 1.0],
    blueCurve: [1.0, 1.0, 1.0],
    halation: 0.0,
    blackAndWhite: true,
    grainSize: 1.9,
  },
  'ilford-fp4-plus-125': {
    name: 'Ilford FP4 Plus 125',
    grain: 0.2,
    contrast: 1.1,
    saturation: 0.0,
    warmth: 0.0,
    highlights: 0.95,
    shadows: 1.06,
    redCurve: [1.0, 1.0, 1.0],
    greenCurve: [1.0, 1.0, 1.0],
    blueCurve: [1.0, 1.0, 1.0],
    halation: 0.0,
    blackAndWhite: true,
    grainSize: 1.1,
  },
  'kodak-t-max-100': {
    name: 'Kodak T-Max 100',
    grain: 0.12,
    contrast: 1.15,
    saturation: 0.0,
    warmth: 0.0,
    highlights: 0.94,
    shadows: 1.08,
    redCurve: [1.0, 1.0, 1.0],
    greenCurve: [1.0, 1.0, 1.0],
    blueCurve: [1.0, 1.0, 1.0],
    halation: 0.0,
    blackAndWhite: true,
    grainSize: 0.75,
  },
  'cinestill-800t': {
    name: 'CineStill 800T',
    grain: 0.26,
    contrast: 1.12,
    saturation: 1.18,
    warmth: 0.12,
    highlights: 0.8,
    shadows: 1.08,
    redCurve: [1.15, 1.06, 1.1],
    greenCurve: [0.95, 1.0, 0.98],
    blueCurve: [0.88, 0.92, 0.98],
    halation: 0.42,
    blackAndWhite: false,
    grainSize: 1.6,
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
  
  // Film grain with chroma noise for color films
  vec3 applyGrain(vec3 color, vec2 uv, float intensity, float size, float isBW) {
    if (intensity <= 0.0) return color;
    
    vec2 grainCoord = uv * u_resolution / size + vec2(u_time * 0.001);
    float grainValue = fbm(grainCoord) * 2.0 - 1.0;
    
    // Grain intensity varies with luminance (more visible in midtones)
    float luma = dot(color, vec3(0.299, 0.587, 0.114));
    float grainMask = 1.0 - abs(luma * 2.0 - 1.0);
    grainMask = pow(grainMask, 0.7) * 1.5;
    
    float grainAmount = grainValue * intensity * grainMask * 0.1;
    
    if (isBW > 0.5) {
      // B&W: apply uniform grain
      return color + grainAmount;
    } else {
      // Color: apply chroma grain (different per channel for realism)
      vec2 grainCoordR = grainCoord + vec2(0.1, 0.2);
      vec2 grainCoordB = grainCoord + vec2(-0.15, 0.1);
      float grainR = fbm(grainCoordR) * 2.0 - 1.0;
      float grainB = fbm(grainCoordB) * 2.0 - 1.0;
      
      return vec3(
        color.r + grainR * intensity * grainMask * 0.08,
        color.g + grainValue * intensity * grainMask * 0.1,
        color.b + grainB * intensity * grainMask * 0.08
      );
    }
  }
  
  // S-curve for contrast
  float applySCurve(float x, float strength) {
    x = clamp(x, 0.0, 1.0);
    float s = strength - 1.0;
    return (x - 0.5) * (1.0 + s) / (1.0 + s * abs(x - 0.5) * 2.0) + 0.5;
  }
  
  // Film response curve with proper toe and shoulder (more realistic)
  float filmResponse(float x, vec3 curve) {
    // curve.x = toe strength, curve.y = midtone, curve.z = shoulder
    // Use smooth S-curve approximation for better performance
    float toe = curve.x;
    float mid = curve.y;
    float shoulder = curve.z;
    
    // Simplified film response curve
    float t = clamp(x, 0.0, 1.0);
    
    // Toe region (shadows)
    float toeRegion = smoothstep(0.0, 0.3, t);
    float toeCurve = pow(t, 1.0 / (1.0 + toe * 0.5));
    
    // Midtone region
    float midCurve = t * mid;
    
    // Shoulder region (highlights)
    float shoulderRegion = smoothstep(0.7, 1.0, t);
    float shoulderCurve = 1.0 - pow(1.0 - t, 1.0 + shoulder * 0.3);
    
    // Blend regions
    float result = mix(toeCurve, midCurve, toeRegion);
    result = mix(result, shoulderCurve, shoulderRegion);
    
    return clamp(result, 0.0, 1.0);
  }
  
  // Color curves with toe and shoulder
  vec3 applyColorCurves(vec3 color, vec3 rCurve, vec3 gCurve, vec3 bCurve) {
    float r = filmResponse(color.r, rCurve);
    float g = filmResponse(color.g, gCurve);
    float b = filmResponse(color.b, bCurve);
    
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
  
  // Optimized halation effect with radial falloff
  vec3 applyHalation(vec2 uv, float intensity) {
    if (intensity <= 0.0) return vec3(0.0);
    
    vec3 bloom = vec3(0.0);
    const int SAMPLES = 12; // Reduced from 16 for performance
    float radius = 0.015 * intensity;
    float weightSum = 0.0;
    
    // Sample in radial pattern with distance-based weighting
    for (int i = 0; i < SAMPLES; i++) {
      float angle = (float(i) / float(SAMPLES)) * 6.28318;
      float dist = radius * (0.5 + float(i) / float(SAMPLES) * 0.5);
      vec2 offset = vec2(cos(angle), sin(angle)) * dist;
      vec3 sample = texture2D(u_image, uv + offset).rgb;
      
      // Only bright areas contribute to halation
      float brightness = max(max(sample.r, sample.g), sample.b);
      if (brightness > 0.75) {
        // Radial falloff weight
        float weight = 1.0 / (1.0 + dist * 50.0);
        float contribution = (brightness - 0.75) * 4.0 * weight;
        bloom += sample * contribution;
        weightSum += weight;
      }
    }
    
    if (weightSum > 0.0) {
      bloom /= weightSum;
    }
    
    // Red halation characteristic of CineStill (remjet removed)
    bloom.r *= 1.6;
    bloom.g *= 0.75;
    bloom.b *= 0.55;
    
    return bloom * 0.25;
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
  
  // Gamma correction (linear to sRGB)
  vec3 linearToSRGB(vec3 linear) {
    return mix(
      linear * 12.92,
      pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,
      step(0.0031308, linear)
    );
  }
  
  void main() {
    vec2 uv = v_texCoord;
    vec3 originalColor = texture2D(u_image, uv).rgb;
    vec3 color = originalColor;
    
    // Convert to linear space for processing
    // (assuming input is sRGB, convert to linear)
    color = pow(color, vec3(2.2));
    
    // Apply halation first (samples original image before processing)
    if (u_halation > 0.0) {
      vec3 halation = applyHalation(uv, u_halation);
      color += halation;
    }
    
    // Black and white conversion before color curves for B&W films
    if (u_blackAndWhite > 0.5) {
      color = toBlackAndWhite(color);
    }
    
    // Apply color curves for film response (only for color films)
    if (u_blackAndWhite < 0.5) {
      color = applyColorCurves(color, u_redCurve, u_greenCurve, u_blueCurve);
    }
    
    // Warmth adjustment (color temperature shift)
    if (u_warmth != 0.0 && u_blackAndWhite < 0.5) {
      // More realistic color temperature shift
      float tempShift = u_warmth * 0.15;
      color.r = color.r + tempShift;
      color.g = color.g + tempShift * 0.3;
      color.b = color.b - tempShift * 0.7;
    }
    
    // Saturation (only for color films)
    if (u_blackAndWhite < 0.5) {
      vec3 hsv = rgb2hsv(color);
      hsv.y *= u_saturation;
      color = hsv2rgb(hsv);
    }
    
    // Contrast with S-curve
    color.r = applySCurve(color.r, u_contrast);
    color.g = applySCurve(color.g, u_contrast);
    color.b = applySCurve(color.b, u_contrast);
    
    // Highlight and shadow adjustments
    color = adjustTones(color, u_highlights, u_shadows);
    
    // Apply film grain (with chroma for color films)
    color = applyGrain(color, uv, u_grain, u_grainSize, u_blackAndWhite);
    
    // Convert back to sRGB for display
    color = linearToSRGB(color);
    
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
  // Cache uniform locations for performance
  private uniformLocations: Map<string, WebGLUniformLocation | null> =
    new Map();
  private attributeLocations: Map<string, number> = new Map();

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

    // Cache uniform and attribute locations for performance
    this.cacheLocations();

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

  private cacheLocations(): void {
    if (!this.gl || !this.program) return;

    // Cache uniform locations
    const uniformNames = [
      'u_image',
      'u_resolution',
      'u_grain',
      'u_contrast',
      'u_saturation',
      'u_warmth',
      'u_highlights',
      'u_shadows',
      'u_redCurve',
      'u_greenCurve',
      'u_blueCurve',
      'u_halation',
      'u_blackAndWhite',
      'u_grainSize',
      'u_time',
    ];

    uniformNames.forEach(name => {
      this.uniformLocations.set(
        name,
        this.gl!.getUniformLocation(this.program!, name),
      );
    });

    // Cache attribute locations
    this.attributeLocations.set(
      'a_position',
      this.gl.getAttribLocation(this.program!, 'a_position'),
    );
    this.attributeLocations.set(
      'a_texCoord',
      this.gl.getAttribLocation(this.program!, 'a_texCoord'),
    );
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

    // Set up attributes using cached locations
    const positionLocation = this.attributeLocations.get('a_position')!;
    const texCoordLocation = this.attributeLocations.get('a_texCoord')!;

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

    // Set uniforms using cached locations
    const loc = (name: string) => this.uniformLocations.get(name);

    this.gl.uniform1i(loc('u_image')!, 0);
    this.gl.uniform2f(
      loc('u_resolution')!,
      this.canvas.width,
      this.canvas.height,
    );
    this.gl.uniform1f(loc('u_grain')!, characteristics.grain);
    this.gl.uniform1f(loc('u_contrast')!, characteristics.contrast);
    this.gl.uniform1f(loc('u_saturation')!, characteristics.saturation);
    this.gl.uniform1f(loc('u_warmth')!, characteristics.warmth);
    this.gl.uniform1f(loc('u_highlights')!, characteristics.highlights);
    this.gl.uniform1f(loc('u_shadows')!, characteristics.shadows);
    this.gl.uniform3fv(loc('u_redCurve')!, characteristics.redCurve);
    this.gl.uniform3fv(loc('u_greenCurve')!, characteristics.greenCurve);
    this.gl.uniform3fv(loc('u_blueCurve')!, characteristics.blueCurve);
    this.gl.uniform1f(loc('u_halation')!, characteristics.halation);
    this.gl.uniform1f(
      loc('u_blackAndWhite')!,
      characteristics.blackAndWhite ? 1.0 : 0.0,
    );
    this.gl.uniform1f(loc('u_grainSize')!, characteristics.grainSize);
    this.gl.uniform1f(loc('u_time')!, Date.now() - this.startTime);

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

    // Clear caches
    this.uniformLocations.clear();
    this.attributeLocations.clear();

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
