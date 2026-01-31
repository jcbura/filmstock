/**
 * Ultra-minimal WebGL shader for film effects
 * Start with just film grain - the simplest visible effect
 */

export function applyFilmShader(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  grainIntensity: number = 0.1,
  warmth: number = 0.5,
  contrast: number = 0.0,
  vignette: number = 0.0,
  fade: number = 0.0,
): void {
  const gl = canvas.getContext('webgl');
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

  // Fragment shader - film grain, color shift, contrast curve, vignette, and fade
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
      
      // Apply contrast S-curve per channel
      color.r = applySCurve(color.r, u_contrast);
      color.g = applySCurve(color.g, u_contrast);
      color.b = applySCurve(color.b, u_contrast);
      
      // Apply color shift based on warmth (0.5 = neutral)
      // warmth > 0.5: warmer (more red/yellow, less blue)
      // warmth < 0.5: cooler (more blue, less red/yellow)
      float warmthShift = (u_warmth - 0.5) * 0.2; // Scale to reasonable range
      color.r *= 1.0 + warmthShift;
      color.g *= 1.0 + warmthShift * 0.5;
      color.b *= 1.0 - warmthShift;
      
      // Apply fade (lift blacks) - characteristic of film
      // Prevents pure black, adds that faded vintage look
      if (u_fade > 0.0) {
        color.rgb = mix(color.rgb, color.rgb + vec3(u_fade * 0.15), u_fade);
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
      float grain = random(v_texCoord * u_time) * u_grainIntensity;
      color.rgb += grain;
      
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
  gl.uniform1f(grainIntensityLocation, grainIntensity);

  const warmthLocation = gl.getUniformLocation(program, 'u_warmth');
  gl.uniform1f(warmthLocation, warmth);

  const contrastLocation = gl.getUniformLocation(program, 'u_contrast');
  gl.uniform1f(contrastLocation, contrast);

  const vignetteLocation = gl.getUniformLocation(program, 'u_vignette');
  gl.uniform1f(vignetteLocation, vignette);

  const fadeLocation = gl.getUniformLocation(program, 'u_fade');
  gl.uniform1f(fadeLocation, fade);

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
