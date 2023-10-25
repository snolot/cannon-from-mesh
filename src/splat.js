const splatVS = `

varying vec2 vUV;
varying float vAmount;

void main(){
	vUV = uv;
	vAmount = position.z / 8.;

	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const splatFS = `
uniform sampler2D oceanTexture;
uniform sampler2D sandyTexture;
uniform sampler2D grassTexture;
uniform sampler2D rockyTexture;
uniform sampler2D snowyTexture;
uniform float time;

varying vec2 vUV;

varying float vAmount;

void main() {

	vec2 wvUV = vUV;
	wvUV -= time;

    vec4 water = (smoothstep(0.0, 0.25, vAmount) - smoothstep(0.10, 0.26, vAmount)) * texture2D( oceanTexture, wvUV * 10.0 );
    vec4 sandy = (smoothstep(0.18, 0.27, vAmount) - smoothstep(0.21, 0.31, vAmount)) * texture2D( sandyTexture, vUV * 10.0 );
    vec4 grass = (smoothstep(0.28, 0.32, vAmount) - smoothstep(0.35, 0.40, vAmount)) * texture2D( grassTexture, vUV * 10.0 );
    vec4 rocky = (smoothstep(0.30, 0.50, vAmount) - smoothstep(0.40, 0.70, vAmount)) * texture2D( rockyTexture, vUV * 10.0 );
    vec4 snowy = (smoothstep(0.50, 0.65, vAmount))                                   * texture2D( snowyTexture, vUV * 10.0 );

    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0) + water + sandy + grass + rocky + snowy;
}`; 

export {splatFS, splatVS};