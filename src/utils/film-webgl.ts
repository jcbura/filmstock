export interface FilmParameters {
  grainIntensity: number;
  warmth: number;
  contrast: number;
  vignette: number;
  fade: number;
  halation: number;
  bloom: number;
  saturation: number;
  exposure: number;
}

export type FilmPresetName =
  | 'custom'
  | 'kodak-portra'
  | 'fuji-velvia'
  | 'cinestill-800t'
  | 'kodak-gold'
  | 'fuji-400h'
  | 'ilford-hp5'
  | 'kodak-tri-x';

export const FILM_PRESETS: Record<FilmPresetName, FilmParameters> = {
  custom: {
    grainIntensity: 0.1,
    warmth: 0.5,
    contrast: 0.0,
    vignette: 0.0,
    fade: 0.0,
    halation: 0.0,
    bloom: 0.0,
    saturation: 1.0,
    exposure: 1.0,
  },
  // Fine grain, warm but gentle skin tones, low contrast with a soft
  // shoulder, and a slightly airy/overexposed feel - Portra's signature.
  'kodak-portra': {
    grainIntensity: 0.08,
    warmth: 0.58,
    contrast: 0.15,
    vignette: 0.08,
    fade: 0.05,
    halation: 0.05,
    bloom: 0.05,
    saturation: 0.95,
    exposure: 1.05,
  },
  // Velvia is a punchy, highly saturated slide film: fine grain, high
  // contrast, deep blacks (no fade), and a slightly cool/neutral cast
  // that lets the saturation carry the look.
  'fuji-velvia': {
    grainIntensity: 0.08,
    warmth: 0.48,
    contrast: 0.45,
    vignette: 0.15,
    fade: 0.0,
    halation: 0.05,
    bloom: 0.08,
    saturation: 1.4,
    exposure: 1.0,
  },
  // CineStill 800T is tungsten-balanced (cooler baseline) and known
  // above all for pronounced red halation around bright/point light
  // sources, since it lacks a remjet anti-halation backing. Grainier
  // than most color stocks and often shot at night.
  'cinestill-800t': {
    grainIntensity: 0.15,
    warmth: 0.35,
    contrast: 0.25,
    vignette: 0.15,
    fade: 0.1,
    halation: 0.75,
    bloom: 0.3,
    saturation: 0.9,
    exposure: 1.0,
  },
  // Kodak Gold is a warm, nostalgic consumer stock: noticeable grain,
  // moderate contrast, a gentle vignette, and a bit of fade for that
  // "old photo album" feel.
  'kodak-gold': {
    grainIntensity: 0.12,
    warmth: 0.62,
    contrast: 0.2,
    vignette: 0.15,
    fade: 0.12,
    halation: 0.08,
    bloom: 0.05,
    saturation: 1.05,
    exposure: 1.0,
  },
  // Fuji 400H is prized for soft, low-contrast pastel tones with a
  // slightly cool/green cast, fine grain, and gently desaturated color
  // - a favorite for weddings and portraits.
  'fuji-400h': {
    grainIntensity: 0.08,
    warmth: 0.45,
    contrast: 0.1,
    vignette: 0.05,
    fade: 0.08,
    halation: 0.03,
    bloom: 0.05,
    saturation: 0.85,
    exposure: 1.05,
  },
  // Ilford HP5 Plus: classic, versatile black & white with moderate
  // grain and contrast - saturation is zeroed out entirely.
  'ilford-hp5': {
    grainIntensity: 0.12,
    warmth: 0.5,
    contrast: 0.3,
    vignette: 0.15,
    fade: 0.05,
    halation: 0.02,
    bloom: 0.05,
    saturation: 0.0,
    exposure: 1.0,
  },
  // Kodak Tri-X: the classic gritty photojournalism stock - heavier,
  // more pronounced grain and punchier contrast than HP5, with a touch
  // of highlight bloom.
  'kodak-tri-x': {
    grainIntensity: 0.15,
    warmth: 0.5,
    contrast: 0.4,
    vignette: 0.2,
    fade: 0.03,
    halation: 0.02,
    bloom: 0.08,
    saturation: 0.0,
    exposure: 1.0,
  },
};

export function applyFilmShader(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  preset: FilmPresetName,
): void;
export function applyFilmShader(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  parameters: Partial<FilmParameters>,
): void;
export function applyFilmShader(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  grainIntensity: number,
  warmth: number,
  contrast: number,
  vignette: number,
  fade: number,
  halation: number,
  bloom: number,
  saturation: number,
): void;
export function applyFilmShader(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  presetOrGrainOrParams:
    | FilmPresetName
    | Partial<FilmParameters>
    | number = 0.1,
  warmth: number = 0.5,
  contrast: number = 0.0,
  vignette: number = 0.0,
  fade: number = 0.0,
  halation: number = 0.0,
  bloom: number = 0.0,
  saturation: number = 1.0,
  exposure: number = 1.0,
): void {
  let params: FilmParameters;

  // Determine which API was used
  if (typeof presetOrGrainOrParams === 'string') {
    // Preset name provided
    params = FILM_PRESETS[presetOrGrainOrParams];
  } else if (typeof presetOrGrainOrParams === 'object') {
    // Parameters object provided
    const defaults: FilmParameters = {
      grainIntensity: 0.1,
      warmth: 0.5,
      contrast: 0.0,
      vignette: 0.0,
      fade: 0.0,
      halation: 0.0,
      bloom: 0.0,
      saturation: 1.0,
      exposure: 1.0,
    };
    params = { ...defaults, ...presetOrGrainOrParams };
  } else {
    // Individual parameters provided
    params = {
      grainIntensity: presetOrGrainOrParams,
      warmth,
      contrast,
      vignette,
      fade,
      halation,
      bloom,
      saturation,
      exposure,
    };
  }
  const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });
  if (!gl) {
    console.error('WebGL not supported');
    return;
  }

  // Vertex shader - just positions the texture
  const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texCoord = a_texCoord;
    }
  `;

  // Fragment shader - complete film emulation with halation and bloom
  const fragmentShaderSource = `
    precision mediump float;
    varying vec2 v_texCoord;
    uniform sampler2D u_image;
    uniform float u_time;
    uniform float u_grainIntensity;
    uniform float u_warmth;
    uniform float u_contrast;
    uniform float u_vignette;
    uniform float u_fade;
    uniform float u_halation;
    uniform float u_bloom;
    uniform float u_saturation;
    uniform float u_exposure;
    uniform vec2 u_resolution;
    
    // Simple pseudo-random function for grain
    float random(vec2 co) {
      return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    // S-curve for contrast adjustment
    // Brightens highlights, deepens shadows
    float applySCurve(float x, float strength) {
      if (strength == 0.0) return x;
      
      // Simple S-curve using smoothstep-like function
      float curved = x * x * (3.0 - 2.0 * x); // Basic S-curve
      return mix(x, curved, strength);
    }
    
    void main() {
      vec4 color = texture2D(u_image, v_texCoord);
      
      // Apply halation (red/orange glow around bright areas)
      if (u_halation > 0.0) {
        // Sample surrounding pixels to create glow effect
        vec2 texelSize = 1.0 / u_resolution;
        vec3 glow = vec3(0.0);
        float totalBrightness = 0.0;
        const float halationSamples = 49.0; // 7x7 kernel below

        // Sample in a small radius around current pixel
        // Using constant loop bounds (WebGL requirement)
        for (int x = -3; x <= 3; x++) {
          for (int y = -3; y <= 3; y++) {
            vec2 offset = vec2(float(x), float(y)) * texelSize * 2.0;
            vec4 sample = texture2D(u_image, v_texCoord + offset);
            
            // Calculate brightness
            float brightness = dot(sample.rgb, vec3(0.299, 0.587, 0.114));
            
            // Only bright areas contribute to halation
            if (brightness > 0.7) {
              float dist = length(vec2(float(x), float(y)));
              float falloff = 1.0 - dist / 3.0;
              totalBrightness += (brightness - 0.7) * falloff;
            }
          }
        }
        // Average over the kernel so glow intensity doesn't scale with
        // sample count, then cap it — otherwise large bright regions can
        // sum well past 1.0 and blow out highlights regardless of u_halation.
        totalBrightness = min(totalBrightness / halationSamples * 8.0, 1.0);

        // Create red-orange halation glow
        if (totalBrightness > 0.0) {
          glow = vec3(1.0, 0.3, 0.1) * totalBrightness * u_halation * 0.4;
          color.rgb += glow;
        }
      }
      
      // Apply bloom (soft color-preserving glow around bright areas)
      if (u_bloom > 0.0) {
        vec2 texelSize = 1.0 / u_resolution;
        vec3 bloomGlow = vec3(0.0);
        const float bloomSamples = 81.0; // 9x9 kernel below

        // Sample in a slightly larger radius for softer bloom
        for (int x = -4; x <= 4; x++) {
          for (int y = -4; y <= 4; y++) {
            vec2 offset = vec2(float(x), float(y)) * texelSize * 1.5;
            vec4 sample = texture2D(u_image, v_texCoord + offset);
            
            // Calculate brightness
            float brightness = dot(sample.rgb, vec3(0.299, 0.587, 0.114));
            
            // Lower threshold for bloom (affects more areas)
            if (brightness > 0.6) {
              float dist = length(vec2(float(x), float(y)));
              float falloff = 1.0 - dist / 4.0;
              // Preserve the color of the bright area
              bloomGlow += sample.rgb * (brightness - 0.6) * falloff;
            }
          }
        }
        // Average over the kernel for the same reason as halation above.
        bloomGlow = min(bloomGlow / bloomSamples * 10.0, vec3(1.0));

        // Add soft color-preserving bloom
        color.rgb += bloomGlow * u_bloom * 0.18;
      }

      // Clamp before exposure/contrast/saturation so the unbounded glow
      // effects above can't distort the S-curve or blow past white.
      color.rgb = clamp(color.rgb, 0.0, 1.0);
      
      // Apply exposure
      color.rgb *= u_exposure;
      
      // Apply contrast S-curve per channel
      color.r = applySCurve(color.r, u_contrast);
      color.g = applySCurve(color.g, u_contrast);
      color.b = applySCurve(color.b, u_contrast);
      
      // Apply saturation (0.0 = B&W, 1.0 = full color, >1.0 = oversaturated)
      if (u_saturation != 1.0) {
        // Calculate luminance (grayscale value)
        float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        // Mix between grayscale and original color based on saturation
        color.rgb = mix(vec3(luminance), color.rgb, u_saturation);
      }
      
      // Apply color shift based on warmth (0.5 = neutral)
      // warmth > 0.5: warmer (more red/yellow, less blue)
      // warmth < 0.5: cooler (more blue, less red/yellow)
      float warmthShift = (u_warmth - 0.5) * 0.2; // Scale to reasonable range
      color.r *= 1.0 + warmthShift;
      color.g *= 1.0 + warmthShift * 0.5;
      color.b *= 1.0 - warmthShift;
      
      // Apply fade (lift blacks) - characteristic of film
      // True black-point lift: output = input * (1 - lift) + lift.
      // This raises the floor so pure black becomes a milky gray while
      // highlights (input = 1.0) stay anchored at 1.0 — the flat, hazy
      // shadow look of faded film, rather than a uniform brightness boost
      // that would also wash out the highlights.
      if (u_fade > 0.0) {
        float liftAmount = u_fade * 0.12; // max black-point lift
        color.rgb = color.rgb * (1.0 - liftAmount) + vec3(liftAmount);
      }
      
      // Apply vignette (darkening at edges)
      if (u_vignette > 0.0) {
        // Calculate distance from center
        vec2 center = vec2(0.5, 0.5);
        float dist = distance(v_texCoord, center);
        
        // Create smooth falloff from center to edges
        float vignetteFactor = smoothstep(0.8, 0.3, dist);
        vignetteFactor = mix(1.0, vignetteFactor, u_vignette);
        
        color.rgb *= vignetteFactor;
      }
      
      // Add grain with dynamic intensity
      // random() returns [0,1) — remap to [-1,1) so grain is noise around
      // the original value instead of a one-directional brightness lift,
      // which was the main source of the overall overexposed look.
      float grain = (random(v_texCoord * u_time) - 0.5) * 2.0 * u_grainIntensity;
      color.rgb += grain;
      
      // Final clamp - warmth shift and grain above can still push channels
      // out of [0,1]; without this they'd get hard-clipped unevenly per
      // channel by the framebuffer instead of a clean, intentional clamp.
      color.rgb = clamp(color.rgb, 0.0, 1.0);

      gl_FragColor = color;
    }
  `;

  // Compile shaders
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource,
  );

  if (!vertexShader || !fragmentShader) return;

  // Create program
  const program = createProgram(gl, vertexShader, fragmentShader);
  if (!program) return;

  // Set up positions (full canvas rectangle)
  const positions = new Float32Array([
    -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
  ]);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  // Set up texture coordinates
  const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]);

  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

  // Create texture from image
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  // Use program and set attributes
  gl.useProgram(program);

  const positionLocation = gl.getAttribLocation(program, 'a_position');
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.enableVertexAttribArray(texCoordLocation);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

  // Set uniforms
  const timeLocation = gl.getUniformLocation(program, 'u_time');
  gl.uniform1f(timeLocation, Math.random() * 100);

  const grainIntensityLocation = gl.getUniformLocation(
    program,
    'u_grainIntensity',
  );
  gl.uniform1f(grainIntensityLocation, params.grainIntensity);

  const warmthLocation = gl.getUniformLocation(program, 'u_warmth');
  gl.uniform1f(warmthLocation, params.warmth);

  const contrastLocation = gl.getUniformLocation(program, 'u_contrast');
  gl.uniform1f(contrastLocation, params.contrast);

  const vignetteLocation = gl.getUniformLocation(program, 'u_vignette');
  gl.uniform1f(vignetteLocation, params.vignette);

  const fadeLocation = gl.getUniformLocation(program, 'u_fade');
  gl.uniform1f(fadeLocation, params.fade);

  const halationLocation = gl.getUniformLocation(program, 'u_halation');
  gl.uniform1f(halationLocation, params.halation);

  const bloomLocation = gl.getUniformLocation(program, 'u_bloom');
  gl.uniform1f(bloomLocation, params.bloom);

  const saturationLocation = gl.getUniformLocation(program, 'u_saturation');
  gl.uniform1f(saturationLocation, params.saturation);

  const exposureLocation = gl.getUniformLocation(program, 'u_exposure');
  gl.uniform1f(exposureLocation, params.exposure);

  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

  // Draw
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}
