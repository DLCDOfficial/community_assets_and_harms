import{ar as w,s as l}from"./index-B53dC0dU.js";import{a as c}from"./BindType-BBwFZqyN.js";const f=()=>w.getLogger("esri.views.3d.webgl-engine.core.shaderModules.shaderBuilder");class S{constructor(){this._includedModules=new Map}include(e,n){this._includedModules.has(e)?this._includedModules.get(e):(this._includedModules.set(e,n),e(this.builder,n))}}class k extends S{constructor(){super(...arguments),this.vertex=new b,this.fragment=new b,this.attributes=new E,this.varyings=new F,this.extensions=new p,this.outputs=new g}get fragmentUniforms(){return this.fragment.uniforms.entries}get builder(){return this}generate(e,n=!1){const t=this.extensions.generateSource(e),r=this.attributes.generateSource(e),a=this.varyings.generateSource(e),i=e==="vertex"?this.vertex:this.fragment,u=i.uniforms.generateSource(),d=i.code.generateSource(),$=i.main.generateSource(n),_=e==="vertex"?D:x,T=i.constants.generateSource(),v=this.outputs.generateSource(e);return`#version 300 es
${t.join(`
`)}
${_}
${T.join(`
`)}
${u.join(`
`)}
${r.join(`
`)}
${a.join(`
`)}
${v.join(`
`)}
${d.join(`
`)}
${$.join(`
`)}`}generateBind(e){const n=new Map;this.vertex.uniforms.entries.forEach((a=>{const i=a.bind[c.Bind];i&&n.set(a.name,i)})),this.fragment.uniforms.entries.forEach((a=>{const i=a.bind[c.Bind];i&&n.set(a.name,i)}));const t=Array.from(n.values()),r=t.length;return a=>{for(let i=0;i<r;++i)t[i](e,a)}}generateBindPass(e){const n=new Map;this.vertex.uniforms.entries.forEach((a=>{const i=a.bind[c.Pass];i&&n.set(a.name,i)})),this.fragment.uniforms.entries.forEach((a=>{const i=a.bind[c.Pass];i&&n.set(a.name,i)}));const t=Array.from(n.values()),r=t.length;return(a,i)=>{for(let u=0;u<r;++u)t[u](e,a,i)}}generateBindDraw(e){const n=new Map;this.vertex.uniforms.entries.forEach((a=>{const i=a.bind[c.Draw];i&&n.set(a.name,i)})),this.fragment.uniforms.entries.forEach((a=>{const i=a.bind[c.Draw];i&&n.set(a.name,i)}));const t=Array.from(n.values()),r=t.length;return(a,i,u)=>{for(let d=0;d<r;++d)t[d](e,u,a,i)}}}class y{constructor(e){this._stage=e,this._entries=new Map}add(...e){for(const n of e)this._add(n);return this._stage}get(e){return this._entries.get(e)}_add(e){if(e!=null){if(this._entries.has(e.name)&&!this._entries.get(e.name).equals(e))throw new l("shaderbuilder:duplicate-uniform",`Duplicate uniform name ${e.name} for different uniform type`);this._entries.set(e.name,e)}else f().error(`Trying to add null Uniform from ${new Error().stack}.`)}generateSource(){return Array.from(this._entries.values()).map((({name:e,arraySize:n,type:t})=>n!=null?`uniform ${t} ${e}[${n}];`:`uniform ${t} ${e};`))}get entries(){return Array.from(this._entries.values())}}class I{constructor(e){this._stage=e,this._bodies=new Array}add(e){return this._bodies.push(e),this._stage}generateSource(e){if(this._bodies.length>0)return[`void main() {
 ${this._bodies.join(`
`)||""} 
}`];if(e)throw new l("shaderbuilder:missing-main","Shader does not contain main function body.");return[]}}class A{constructor(e){this._stage=e,this._entries=new Array}add(e){return this._entries.push(e),this._stage}generateSource(){return this._entries}}class b extends S{constructor(){super(...arguments),this.uniforms=new y(this),this.main=new I(this),this.code=new A(this),this.constants=new s(this)}get builder(){return this}}class E{constructor(){this._entries=new Array}add(e,n){this._entries.push([e,n])}generateSource(e){return e==="fragment"?[]:this._entries.map((n=>`in ${n[1]} ${n[0]};`))}}class F{constructor(){this._entries=new Map}add(e,n,t){this._entries.has(e)?f().warn(`Ignoring duplicate varying ${n} ${e}`):this._entries.set(e,{type:n,invariant:(t==null?void 0:t.invariant)??!1})}generateSource(e){const n=new Array;return this._entries.forEach(((t,r)=>n.push((t.invariant&&e==="vertex"?"invariant ":"")+(e==="vertex"?"out":"in")+` ${t.type} ${r};`))),n}}const h=class h{constructor(){this._entries=new Set}add(e){this._entries.add(e)}generateSource(e){const n=e==="vertex"?h.ALLOWLIST_VERTEX:h.ALLOWLIST_FRAGMENT;return Array.from(this._entries).filter((t=>n.includes(t))).map((t=>`#extension ${t} : enable`))}};h.ALLOWLIST_FRAGMENT=["GL_EXT_shader_texture_lod","GL_OES_standard_derivatives"],h.ALLOWLIST_VERTEX=[];let p=h;const m=class m{constructor(){this._entries=new Map}add(e,n,t=0){const r=this._entries.get(t);(r==null?void 0:r.name)!==e||(r==null?void 0:r.type)!==n?this._entries.set(t,{name:e,type:n}):f().warn(`Fragment shader output location ${t} occupied`)}generateSource(e){if(e==="vertex")return[];this._entries.size===0&&this._entries.set(0,{name:m.DEFAULT_NAME,type:m.DEFAULT_TYPE});const n=new Array;return this._entries.forEach(((t,r)=>n.push(`layout(location = ${r}) out ${t.type} ${t.name};`))),n}};m.DEFAULT_TYPE="vec4",m.DEFAULT_NAME="fragColor";let g=m;class s{constructor(e){this._stage=e,this._entries=new Set}add(e,n,t){let r="ERROR_CONSTRUCTOR_STRING";switch(n){case"float":r=s._numberToFloatStr(t);break;case"int":r=s._numberToIntStr(t);break;case"bool":r=t.toString();break;case"vec2":r=`vec2(${s._numberToFloatStr(t[0])},                            ${s._numberToFloatStr(t[1])})`;break;case"vec3":r=`vec3(${s._numberToFloatStr(t[0])},                            ${s._numberToFloatStr(t[1])},                            ${s._numberToFloatStr(t[2])})`;break;case"vec4":r=`vec4(${s._numberToFloatStr(t[0])},                            ${s._numberToFloatStr(t[1])},                            ${s._numberToFloatStr(t[2])},                            ${s._numberToFloatStr(t[3])})`;break;case"ivec2":r=`ivec2(${s._numberToIntStr(t[0])},                             ${s._numberToIntStr(t[1])})`;break;case"ivec3":r=`ivec3(${s._numberToIntStr(t[0])},                             ${s._numberToIntStr(t[1])},                             ${s._numberToIntStr(t[2])})`;break;case"ivec4":r=`ivec4(${s._numberToIntStr(t[0])},                             ${s._numberToIntStr(t[1])},                             ${s._numberToIntStr(t[2])},                             ${s._numberToIntStr(t[3])})`;break;case"uvec2":r=`uvec2(${s._numberToIntStr(t[0])},                             ${s._numberToIntStr(t[1])})`;break;case"uvec3":r=`uvec3(${s._numberToIntStr(t[0])},                             ${s._numberToIntStr(t[1])},                             ${s._numberToIntStr(t[2])})`;break;case"uvec4":r=`uvec4(${s._numberToIntStr(t[0])},                             ${s._numberToIntStr(t[1])},                             ${s._numberToIntStr(t[2])},                             ${s._numberToIntStr(t[3])})`;break;case"mat2":case"mat3":case"mat4":r=`${n}(${Array.prototype.map.call(t,(a=>s._numberToFloatStr(a))).join(", ")})`}return this._entries.add(`const ${n} ${e} = ${r};`),this._stage}static _numberToIntStr(e){return e.toFixed(0)}static _numberToFloatStr(e){return Number.isInteger(e)?e.toFixed(1):e.toString()}generateSource(){return Array.from(this._entries)}}const x=`#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  precision highp int;
  precision highp sampler2D;
  precision highp usampler2D;
  precision highp sampler2DArray;
  precision highp sampler2DShadow;
#else
  precision mediump float;
  precision mediump int;
  precision mediump sampler2D;
  precision mediump usampler2D;
  precision mediump sampler2DArray;
  precision mediump sampler2DShadow;
#endif`,D=`precision highp float;
 precision highp sampler2D;
 precision highp usampler2D;
 precision highp sampler2DArray;
 precision highp sampler2DShadow;


 invariant gl_Position;
 `;export{k as i};
