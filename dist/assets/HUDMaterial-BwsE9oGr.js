const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./HUDMaterial.glsl-CLNn556e.js","./index-BsCXzwnb.js","./index-FMl8DCyv.css","./OutputColorHighlightOID.glsl-CjQqyRIv.js","./videoUtils-BX9jEn1m.js","./requestImageUtils-DfMVDow9.js","./basicInterfaces-N86vRvDz.js","./TextureFormat-1mYWTFa-.js","./BufferView-B_PDljhX.js","./mat4f64-q_b6UJoq.js","./Indices-B--PKD2I.js","./triangle-xr_Al5yR.js","./sphere-DFLmRbd5.js","./mat3f64-B5o_lm6j.js","./vectorStacks-Bm8FJ0X2.js","./quatf64-aQ5IuZRd.js","./lineSegment-SVPjKNtT.js","./VertexAttribute-BfkzOMLV.js","./glsl-Cj7KC756.js","./BindType-BBwFZqyN.js","./ShaderOutput-Bdd80V3g.js","./renderState-CCsB1oGz.js","./orientedBoundingBox-CW1s3kkJ.js","./quat-CRfohkkk.js","./spatialReferenceEllipsoidUtils-BdIFzKv6.js","./computeTranslationToOriginAndRotation-BW--CjIX.js","./plane-Bq_T8WV4.js","./boundedPlane-Dpv74qhA.js","./projectVectorToVector-BrVgLkbr.js","./projectPointToVector-DBNh2Nfd.js","./dehydratedFeatureUtils-4U0MKobw.js","./meshVertexSpaceUtils-C9dfiDkm.js","./MeshLocalVertexSpace-BZEPLunl.js","./hydratedFeatures-PsnM6_vq.js","./vec3f32-WCVSSNPR.js","./ShaderBuilder-DWlXPNYu.js"])))=>i.map(i=>d[i]);
import{og as Se,dB as Re,cf as ut,h6 as Pe,oh as dt,jY as Ae,oi as ft,kl as pt,hY as ht,_ as gt,jH as Fe,k2 as vt,M as A,mC as Ie,hS as Ge,fc as le,fa as Z,aM as k,ba as xe,eV as Xe,eY as q,kc as pe,oj as We,aR as Qe,bk as X,f8 as oe,fd as Ye,d8 as mt,eX as Ee,fS as St,cv as xt,hT as bt,b6 as Ct,aO as Ot,ok as $t,bl as Tt}from"./index-BsCXzwnb.js";import{i as Pt,L as At,a as Et,m as yt,s as zt,b as Rt,e as Ft,c as It,o as wt,d as we,f as ge,g as _e,h as De,w as _t,t as Dt,j as Mt,k as H,l as jt,q as Lt,r as Nt,u as ee,v as Bt,x as Ut,F as Vt,y as qt,z as Ht,A as kt,B as Gt,C as E,D as Xt,E as Y,G as Wt,H as Ze,I as Je,J as Qt,K as Yt,M as Zt,N as Jt,O as Kt,R as eo,S as to,P as oo,Q as ao,T as Me,U as je,V as io,W as so,X as Le}from"./OutputColorHighlightOID.glsl-CjQqyRIv.js";import{e as Ke}from"./mat3f64-B5o_lm6j.js";import{e as ro}from"./mat4f64-q_b6UJoq.js";import{s as no,g as lo,o as Ne,f as co,y as uo,T as Be}from"./BufferView-B_PDljhX.js";import{O as fo}from"./InterleavedLayout-Bnp9hrdG.js";import{n as B,u as et,w as ve}from"./ShaderOutput-Bdd80V3g.js";import{l as tt,u as po,n as ho,t as go,d as vo}from"./dehydratedFeatureUtils-4U0MKobw.js";import{e as u}from"./VertexAttribute-BfkzOMLV.js";import{n as d,t as z}from"./glsl-Cj7KC756.js";import{a as mo}from"./BindType-BBwFZqyN.js";import{i as So}from"./ShaderBuilder-DWlXPNYu.js";import{B as xo,o as bo,g as Co,p as Oo}from"./renderState-CCsB1oGz.js";let $o=class extends Pt{constructor(e,t){super(e,"vec4",mo.Draw,((a,i,s)=>a.setUniform4fv(e,t(i,s))))}};const ye=128,Q=.5,fa=Se(Q/2,Q/2,1-Q/2,1-Q/2);function pa(o){return o==="cross"||o==="x"}function ha(o,e=ye,t=e*Q,a=0){const{data:i,parameters:s}=To(o,e,t,a);return new At(i,s)}function To(o,e=ye,t=e*Q,a=0){return{data:Po(o,e,t,a),parameters:{mipmap:!1,wrap:{s:Re.CLAMP_TO_EDGE,t:Re.CLAMP_TO_EDGE},width:e,height:e,components:4,noUnpackFlip:!0,reloadable:!0}}}function Po(o,e=ye,t=e*Q,a=0){switch(o){case"circle":default:return Ao(e,t);case"square":return Eo(e,t);case"cross":return zo(e,t,a);case"x":return Ro(e,t,a);case"kite":return yo(e,t);case"triangle":return Fo(e,t);case"arrow":return Io(e,t)}}function Ao(o,e){const t=o/2-.5;return ie(o,it(t,t,e/2))}function Eo(o,e){return ot(o,e,!1)}function yo(o,e){return ot(o,e,!0)}function zo(o,e,t=0){return at(o,e,!1,t)}function Ro(o,e,t=0){return at(o,e,!0,t)}function Fo(o,e){return ie(o,st(o/2,e,e/2))}function Io(o,e){const t=e,a=e/2,i=o/2,s=.8*t,r=it(i,(o-e)/2-s,Math.sqrt(s*s+a*a)),l=st(i,t,a);return ie(o,((c,n)=>Math.max(l(c,n),-r(c,n))))}function ot(o,e,t){return t&&(e/=Math.SQRT2),ie(o,((a,i)=>{let s=a-.5*o+.25,r=.5*o-i-.75;if(t){const l=(s+r)/Math.SQRT2;r=(r-s)/Math.SQRT2,s=l}return Math.max(Math.abs(s),Math.abs(r))-.5*e}))}function at(o,e,t,a=0){e-=a,t&&(e*=Math.SQRT2);const i=.5*e;return ie(o,((s,r)=>{let l,c=s-.5*o,n=.5*o-r-1;if(t){const S=(c+n)/Math.SQRT2;n=(n-c)/Math.SQRT2,c=S}return c=Math.abs(c),n=Math.abs(n),l=c>n?c>i?Math.sqrt((c-i)*(c-i)+n*n):n:n>i?Math.sqrt(c*c+(n-i)*(n-i)):c,l-=a/2,l}))}function it(o,e,t){return(a,i)=>{const s=a-o,r=i-e;return Math.sqrt(s*s+r*r)-t}}function st(o,e,t){const a=Math.sqrt(e*e+t*t);return(i,s)=>{const r=Math.abs(i-o)-t,l=s-o+e/2+.75,c=(e*r+t*l)/a,n=-l;return Math.max(c,n)}}function ie(o,e){const t=new Uint8Array(4*o*o);for(let a=0;a<o;a++)for(let i=0;i<o;i++){const s=i+o*a;let r=e(i,a);r=r/o+.5,ut(r,t,4*s)}return t}function wo(o){return o instanceof Float32Array&&o.length>=16}function _o(o){return Array.isArray(o)&&o.length>=16}function Do(o){return wo(o)||_o(o)}class Mo{constructor(){this.factor=new Ue,this.factorAlignment=new Ue}}class Ue{constructor(){this.scale=0,this.factor=0,this.minScaleFactor=0}}function jo(o,e){const{vertex:t,fragment:a}=o;o.include(Et,e),t.include(tt),t.main.add(d`vec4 posProjCenter;
if (dot(position, position) > 0.0) {
ProjectHUDAux projectAux;
vec4 posProj = projectPositionHUD(projectAux);
posProjCenter = alignToPixelCenter(posProj, viewport.zw);
forwardViewPosDepth(projectAux.posView);
vec3 vpos = projectAux.posModel;
if (rejectBySlice(vpos)) {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
} else {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
gl_Position = posProjCenter;
gl_PointSize = 1.0;`),a.main.add(d`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)}function Lo(o){const e=new So,{signedDistanceFieldEnabled:t,occlusionTestEnabled:a,horizonCullingEnabled:i,pixelSnappingEnabled:s,hasScreenSizePerspective:r,debugDrawLabelBorder:l,vvSize:c,vvColor:n,hasRotation:S,occludedFragmentFade:p,sampleSignedDistanceFieldTexelCenter:h}=o;e.include(po,o),e.vertex.include(yt,o);const{occlusionPass:$,output:F,oitPass:I}=o;if($)return e.include(jo,o),e;const{vertex:b,fragment:x}=e;e.include(zt),e.include(Rt,o),e.include(Ft,o),a&&e.include(ho),x.include(go),x.include(It),e.varyings.add("vcolor","vec4"),e.varyings.add("vtc","vec2"),e.varyings.add("vsize","vec2");const P=F===B.Highlight,R=P&&a;R&&e.varyings.add("voccluded","float"),b.uniforms.add(new wt("viewport",(f=>f.camera.fullViewport)),new we("screenOffset",((f,j)=>Ae(ce,2*f.screenOffset[0]*j.camera.pixelRatio,2*f.screenOffset[1]*j.camera.pixelRatio))),new we("anchorPosition",(f=>ae(f))),new ge("materialColor",(f=>f.color)),new _e("materialRotation",(f=>f.rotation)),new De("tex",(f=>f.texture))),_t(b),t&&(b.uniforms.add(new ge("outlineColor",(f=>f.outlineColor))),x.uniforms.add(new ge("outlineColor",(f=>Ve(f)?f.outlineColor:ft)),new _e("outlineSize",(f=>Ve(f)?f.outlineSize:0)))),i&&b.uniforms.add(new $o("pointDistanceSphere",((f,j)=>{const O=j.camera.eye,_=f.origin;return pt(_[0]-O[0],_[1]-O[1],_[2]-O[2],ht.radius)}))),s&&b.include(tt),r&&(Dt(b),Mt(b)),l&&e.varyings.add("debugBorderCoords","vec4"),e.attributes.add(u.UVI,"vec2"),e.attributes.add(u.COLOR,"vec4"),e.attributes.add(u.SIZE,"vec2"),e.attributes.add(u.ROTATION,"float"),(c||n)&&e.attributes.add(u.FEATUREATTRIBUTE,"vec4"),b.code.add(i?d`bool behindHorizon(vec3 posModel) {
vec3 camToEarthCenter = pointDistanceSphere.xyz - localOrigin;
vec3 camToPos = pointDistanceSphere.xyz + posModel;
float earthRadius = pointDistanceSphere.w;
float a = dot(camToPos, camToPos);
float b = dot(camToPos, camToEarthCenter);
float c = dot(camToEarthCenter, camToEarthCenter) - earthRadius * earthRadius;
return b > 0.0 && b < a && b * b  > a * c;
}`:d`bool behindHorizon(vec3 posModel) { return false; }`),b.main.add(d`
    ProjectHUDAux projectAux;
    vec4 posProj = projectPositionHUD(projectAux);
    forwardObjectAndLayerIdColor();

    if (rejectBySlice(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    if (behindHorizon(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    vec2 inputSize;
    ${z(r,d`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,d`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${z(c,d`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${z(a,d`
    bool visible = testHUDVisibility(posProj);
    if (!visible) {
      vtc = vec2(0.0);
      ${z(l,"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);")}
      return;
    }`)}
    ${z(R,d`voccluded = visible ? 0.0 : 1.0;`)}
  `);const w=d`
      vec2 uvi1 = vec2(uvi.x < 0.0 ? 1.0 : 0.0, uvi.y < 0.0 ? 1.0 : 0.0);
      vec2 uv = abs(uvi + uvi1);
      vec2 texSize = vec2(textureSize(tex, 0));
      uv.x = uv.x >= ${qe} ? 1.0 : uv.x / texSize.x;
      uv.y = uv.y >= ${qe} ? 1.0 : uv.y / texSize.y;
      quadOffset.xy = (uvi1 - anchorPosition) * 2.0 * combinedSize;

      ${z(S,d`
          float angle = radians(materialRotation + rotation);
          float cosAngle = cos(angle);
          float sinAngle = sin(angle);
          mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

          quadOffset.xy = rotate * quadOffset.xy;
        `)}

      quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,g=s?t?d`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:d`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:d`posProj += quadOffset;`;b.main.add(d`
    ${w}
    ${n?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":"vcolor = color / 255.0 * materialColor;"}

    ${z(F===B.ObjectAndLayerIdColor,d`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${d.float(H)};
    ${z(t,`alphaDiscard = alphaDiscard && outlineColor.a < ${d.float(H)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${g}
      gl_Position = posProj;
    }

    vtc = uv;

    ${z(l,d`debugBorderCoords = vec4(uv01, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),x.uniforms.add(new De("tex",(f=>f.texture))),p&&!P&&x.uniforms.add(new jt("depthMap",(f=>f.mainDepth)),new Lt("occludedOpacity",(f=>f.hudOccludedFragmentOpacity)));const L=l?d`(isBorder > 0.0 ? 0.0 : ${d.float(H)})`:d.float(H),D=d`
    ${z(l,d`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${z(h,d`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${t?d`
      vec4 fillPixelColor = vcolor;

      // Get distance and map it into [-0.5, 0.5]
      float d = rgbaTofloat(texture(tex, samplePos)) - 0.5;

      // Distance in output units (i.e. pixels)
      float dist = d * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - dist, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(dist) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${L} ||
          fillPixelColor.a + outlinePixelColor.a < ${d.float(H)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${z(!P,d`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${L}) {
          discard;
        }

        ${z(!P,d`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-dist/vsize.x*2.0, 0.0, 1.0), clamp(dist/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:d`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${L}) {
            discard;
          }
          ${z(!P,d`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${z(p&&!P,d`
        float zSample = texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x;
        if (zSample < gl_FragCoord.z) {
          fragColor *= occludedOpacity;
        }
        `)}

    ${z(!P&&l,d`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}
  `;switch(F){case B.Color:case B.ColorEmission:e.outputs.add("fragColor","vec4",0),F===B.ColorEmission&&e.outputs.add("fragEmission","vec4",1),I===ee.ColorAlpha&&e.outputs.add("fragAlpha","float",F===B.ColorEmission?2:1),x.main.add(d`
        ${D}
        ${z(I===ee.FrontFace,d`fragColor.rgb /= fragColor.a;`)}
        ${z(F===B.ColorEmission,d`fragEmission = vec4(0.0);`)}
        ${z(I===ee.ColorAlpha,d`fragAlpha = fragColor.a;`)}`);break;case B.ObjectAndLayerIdColor:x.main.add(d`
        ${D}
        outputObjectAndLayerIdColor();`);break;case B.Highlight:e.include(Nt,o),x.main.add(d`
        ${D}
        outputHighlight(${z(R,d`voccluded == 1.0`,d`false`)});`)}return e}function Ve(o){return o.outlineColor[3]>0&&o.outlineSize>0}function ae(o){return o.textureIsSignedDistanceField?No(o.anchorPosition,o.distanceFieldBoundingBox,ce):dt(ce,o.anchorPosition),ce}function No(o,e,t){Ae(t,o[0]*(e[2]-e[0])+e[0],o[1]*(e[3]-e[1])+e[1])}const ce=Pe(),de=32e3,qe=d.float(de),Bo=Object.freeze(Object.defineProperty({__proto__:null,build:Lo,calculateAnchorPosition:ae,fullUV:de},Symbol.toStringTag,{value:"Module"}));class Uo extends Bt{constructor(e,t){super(e,t,new Ut(Bo,(()=>gt(()=>import("./HUDMaterial.glsl-CLNn556e.js").then(a=>a.H),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]),import.meta.url)))),this.primitiveType=t.occlusionPass?Fe.POINTS:Fe.TRIANGLES}initializePipeline(e){const{oitPass:t,hasPolygonOffset:a,draped:i,output:s,depthTestEnabled:r,occlusionPass:l}=e,c=t===ee.NONE,n=t===ee.ColorAlpha,S=s===B.Highlight,p=r&&!i&&!n&&!l&&!S;return xo({blending:et(s)?c?bo:qt(t):null,depthTest:r&&!i?{func:vt.LEQUAL}:null,depthWrite:p?Oo:null,drawBuffers:Vt(t,s),colorWrite:Co,polygonOffset:a?Vo:null})}}const Vo={factor:0,units:-4};class T extends Ht{constructor(e){super(),this.spherical=e,this.screenCenterOffsetUnitsEnabled=!1,this.occlusionTestEnabled=!0,this.signedDistanceFieldEnabled=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.vvSize=!1,this.vvColor=!1,this.hasVerticalOffset=!1,this.hasScreenSizePerspective=!1,this.hasRotation=!1,this.debugDrawLabelBorder=!1,this.hasPolygonOffset=!1,this.depthTestEnabled=!0,this.pixelSnappingEnabled=!0,this.draped=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.occlusionPass=!1,this.occludedFragmentFade=!1,this.objectAndLayerIdColorInstanced=!1,this.horizonCullingEnabled=!0,this.isFocused=!0,this.textureCoordinateType=kt.None,this.emissionSource=Gt.None,this.discardInvisibleFragments=!0,this.hasVvInstancing=!1,this.snowCover=!1}}A([E()],T.prototype,"screenCenterOffsetUnitsEnabled",void 0),A([E()],T.prototype,"occlusionTestEnabled",void 0),A([E()],T.prototype,"signedDistanceFieldEnabled",void 0),A([E()],T.prototype,"sampleSignedDistanceFieldTexelCenter",void 0),A([E()],T.prototype,"vvSize",void 0),A([E()],T.prototype,"vvColor",void 0),A([E()],T.prototype,"hasVerticalOffset",void 0),A([E()],T.prototype,"hasScreenSizePerspective",void 0),A([E()],T.prototype,"hasRotation",void 0),A([E()],T.prototype,"debugDrawLabelBorder",void 0),A([E()],T.prototype,"hasPolygonOffset",void 0),A([E()],T.prototype,"depthTestEnabled",void 0),A([E()],T.prototype,"pixelSnappingEnabled",void 0),A([E()],T.prototype,"draped",void 0),A([E()],T.prototype,"terrainDepthTest",void 0),A([E()],T.prototype,"cullAboveTerrain",void 0),A([E()],T.prototype,"occlusionPass",void 0),A([E()],T.prototype,"occludedFragmentFade",void 0),A([E()],T.prototype,"objectAndLayerIdColorInstanced",void 0),A([E()],T.prototype,"horizonCullingEnabled",void 0),A([E()],T.prototype,"isFocused",void 0);let ga=class extends Xt{constructor(e,t){super(e,Qo),this.produces=new Map([[Y.HUD_MATERIAL,a=>ve(a)&&!this.parameters.drawAsLabel],[Y.LABEL_MATERIAL,a=>ve(a)&&this.parameters.drawAsLabel],[Y.OCCLUSION_PIXELS,()=>this.parameters.occlusionTest],[Y.DRAPED_MATERIAL,a=>this.parameters.draped&&ve(a)]]),this._visible=!0,this._configuration=new T(t)}getConfiguration(e,t){const a=this.parameters.draped;return super.getConfiguration(e,t,this._configuration),this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasVerticalOffset=!!this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,this._configuration.screenCenterOffsetUnitsEnabled=this.parameters.centerOffsetUnits==="screen",this._configuration.hasPolygonOffset=this.parameters.polygonOffset,this._configuration.draped=a,this._configuration.occlusionTestEnabled=this.parameters.occlusionTest,this._configuration.pixelSnappingEnabled=this.parameters.pixelSnappingEnabled,this._configuration.signedDistanceFieldEnabled=this.parameters.textureIsSignedDistanceField,this._configuration.sampleSignedDistanceFieldTexelCenter=this.parameters.sampleSignedDistanceFieldTexelCenter,this._configuration.hasRotation=this.parameters.hasRotation,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.occlusionPass=t.slot===Y.OCCLUSION_PIXELS,this._configuration.occludedFragmentFade=!a&&this.parameters.occludedFragmentFade,this._configuration.horizonCullingEnabled=this.parameters.horizonCullingEnabled,this._configuration.isFocused=this.parameters.isFocused,this._configuration.depthTestEnabled=this.parameters.depthEnabled||t.slot===Y.OCCLUSION_PIXELS,et(e)&&(this._configuration.debugDrawLabelBorder=!!Wt.LABELS_SHOW_BORDER),this._configuration.oitPass=t.oitPass,this._configuration.terrainDepthTest=t.terrainDepthTest,this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration}intersect(e,t,a,i,s,r){const{options:{selectionMode:l,hud:c,excludeLabels:n},point:S,camera:p}=a,{parameters:h}=this;if(!l||!c||n&&h.isLabel||!e.visible||!S||!p)return;const $=e.attributes.get(u.FEATUREATTRIBUTE),F=$==null?null:Ie($.data,Oe),{scaleX:I,scaleY:b}=$e(F,h,p.pixelRatio);Ge(ue,t),e.attributes.has(u.FEATUREATTRIBUTE)&&ko(ue);const x=e.attributes.get(u.POSITION),P=e.attributes.get(u.SIZE),R=e.attributes.get(u.NORMAL),w=e.attributes.get(u.ROTATION),g=e.attributes.get(u.CENTEROFFSETANDDISTANCE);no(x.size>=3);const L=ae(h),D=this.parameters.centerOffsetUnits==="screen";for(let f=0;f<x.data.length/x.size;f++){const j=f*x.size;le(v,x.data[j],x.data[j+1],x.data[j+2]),Z(v,v,t),Z(v,v,p.viewMatrix);const O=f*g.size;if(le(C,g.data[O],g.data[O+1],g.data[O+2]),!D&&(v[0]+=C[0],v[1]+=C[1],C[2]!==0)){const N=C[2];xe(C,v),Xe(v,v,q(C,C,N))}const _=f*R.size;if(le(W,R.data[_],R.data[_+1],R.data[_+2]),be(W,ue,p,te),Te(this.parameters,v,te,p,J),p.applyProjection(v,m),m[0]>-1){D&&(C[0]||C[1])&&(m[0]+=C[0]*p.pixelRatio,C[1]!==0&&(m[1]+=Ze(C[1],J.factorAlignment)*p.pixelRatio),p.unapplyProjection(m,v)),m[0]+=this.parameters.screenOffset[0]*p.pixelRatio,m[1]+=this.parameters.screenOffset[1]*p.pixelRatio,m[0]=Math.floor(m[0]),m[1]=Math.floor(m[1]);const N=f*P.size;y[0]=P.data[N],y[1]=P.data[N+1],Je(y,J.factor,y);const G=lt*p.pixelRatio;let se=0;h.textureIsSignedDistanceField&&(se=Math.min(h.outlineSize,.5*y[0])*p.pixelRatio/2),y[0]*=I,y[1]*=b;const he=f*w.size,re=h.rotation+w.data[he];if(Ce(S,m[0],m[1],y,G,se,re,h,L)){const U=a.ray;if(Z(fe,v,Qe(nt,p.viewMatrix)),m[0]=S[0],m[1]=S[1],p.unprojectFromRenderScreen(m,v)){const V=k();X(V,U.direction);const ze=1/oe(V);q(V,V,ze),r(Ye(U.origin,v)*ze,V,-1,fe)}}}}}intersectDraped(e,t,a,i,s){const r=e.attributes.get(u.POSITION),l=e.attributes.get(u.SIZE),c=e.attributes.get(u.ROTATION),n=this.parameters,S=ae(n),p=e.attributes.get(u.FEATUREATTRIBUTE),h=p==null?null:Ie(p.data,Oe),{scaleX:$,scaleY:F}=$e(h,n,e.screenToWorldRatio),I=Xo*e.screenToWorldRatio;for(let b=0;b<r.data.length/r.size;b++){const x=b*r.size,P=r.data[x],R=r.data[x+1],w=b*l.size;y[0]=l.data[w],y[1]=l.data[w+1];let g=0;n.textureIsSignedDistanceField&&(g=Math.min(n.outlineSize,.5*y[0])*e.screenToWorldRatio/2),y[0]*=$,y[1]*=F;const L=b*c.size,D=n.rotation+c.data[L];Ce(a,P,R,y,I,g,D,n,S)&&i(s.distance,s.normal,-1)}}createBufferWriter(){return new Zo}applyShaderOffsetsView(e,t,a,i,s,r,l){const c=be(t,a,s,te);return this._applyVerticalGroundOffsetView(e,c,s,l),Te(this.parameters,l,c,s,r),this._applyPolygonOffsetView(l,c,i[3],s,l),this._applyCenterOffsetView(l,i,l),l}applyShaderOffsetsNDC(e,t,a,i,s){return this._applyCenterOffsetNDC(e,t,a,i),s!=null&&X(s,i),this._applyPolygonOffsetNDC(i,t,a,i),i}_applyPolygonOffsetView(e,t,a,i,s){const r=i.aboveGround?1:-1;let l=Math.sign(a);l===0&&(l=r);const c=r*l;if(this.parameters.shaderPolygonOffset<=0)return X(s,e);const n=mt(Math.abs(t.cosAngle),.01,1),S=1-Math.sqrt(1-n*n)/n/i.viewport[2];return q(s,e,c>0?S:1/S),s}_applyVerticalGroundOffsetView(e,t,a,i){const s=oe(e),r=a.aboveGround?1:-1,l=a.computeRenderPixelSizeAtDist(s)*vo,c=q(v,t.normal,r*l);return Ee(i,e,c),i}_applyCenterOffsetView(e,t,a){const i=this.parameters.centerOffsetUnits!=="screen";return a!==e&&X(a,e),i&&(a[0]+=t[0],a[1]+=t[1],t[2]&&(xe(W,a),St(a,a,q(W,W,t[2])))),a}_applyCenterOffsetNDC(e,t,a,i){const s=this.parameters.centerOffsetUnits!=="screen";return i!==e&&X(i,e),s||(i[0]+=t[0]/a.fullWidth*2,i[1]+=t[1]/a.fullHeight*2),i}_applyPolygonOffsetNDC(e,t,a,i){const s=this.parameters.shaderPolygonOffset;if(e!==i&&X(i,e),s){const r=a.aboveGround?1:-1,l=r*Math.sign(t[3]);i[2]-=(l||r)*s}return i}set visible(e){this._visible=e}get visible(){const{color:e,outlineSize:t,outlineColor:a}=this.parameters,i=e[3]>=H||t>=H&&a[3]>=H;return this._visible&&i}createGLMaterial(e){return new qo(e)}calculateRelativeScreenBounds(e,t,a=xt()){return Ho(this.parameters,e,t,a),a[2]=a[0]+e[0],a[3]=a[1]+e[1],a}};class qo extends so{constructor(e){super({...e,...e.material.parameters})}beginSlot(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.getTechnique(Uo,e)}}function Ho(o,e,t,a){a[0]=o.anchorPosition[0]*-e[0]+o.screenOffset[0]*t,a[1]=o.anchorPosition[1]*-e[1]+o.screenOffset[1]*t}function be(o,e,t,a){return Do(e)&&(e=Ge(Go,e)),bt(a.normal,o,e),Z(a.normal,a.normal,t.viewInverseTransposeMatrix),a.cosAngle=Ct(rt,Wo),a}function ko(o){const e=o[0],t=o[1],a=o[2],i=o[3],s=o[4],r=o[5],l=o[6],c=o[7],n=o[8],S=1/Math.sqrt(e*e+t*t+a*a),p=1/Math.sqrt(i*i+s*s+r*r),h=1/Math.sqrt(l*l+c*c+n*n);return o[0]=e*S,o[1]=t*S,o[2]=a*S,o[3]=i*p,o[4]=s*p,o[5]=r*p,o[6]=l*h,o[7]=c*h,o[8]=n*h,o}function Ce(o,e,t,a,i,s,r,l,c){let n=e-i-a[0]*c[0],S=n+a[0]+2*i,p=t-i-a[1]*c[1],h=p+a[1]+2*i;const $=l.distanceFieldBoundingBox;return l.textureIsSignedDistanceField&&$!=null&&(n+=a[0]*$[0],p+=a[1]*$[1],S-=a[0]*(1-$[2]),h-=a[1]*(1-$[3]),n-=s,S+=s,p-=s,h+=s),Ae(He,e,t),$t(K,o,He,Tt(r)),K[0]>n&&K[0]<S&&K[1]>p&&K[1]<h}const J=new Mo,v=k(),W=k(),m=pe(),rt=k(),fe=k(),K=Pe(),He=Pe(),ue=Ke(),Go=Ke(),nt=ro(),ne=pe(),C=k(),me=k(),Oe=pe(),te={normal:rt,cosAngle:0},lt=1,Xo=2,y=We(0,0),M=6,Wo=Ot(0,0,1);class Qo extends Qt{constructor(){super(...arguments),this.renderOccluded=Yt.Occlude,this.isDecoration=!1,this.color=Se(1,1,1,1),this.polygonOffset=!1,this.anchorPosition=We(.5,.5),this.screenOffset=[0,0],this.shaderPolygonOffset=1e-5,this.textureIsSignedDistanceField=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.outlineColor=Se(1,1,1,1),this.outlineSize=0,this.distanceFieldBoundingBox=pe(),this.rotation=0,this.hasRotation=!1,this.vvSizeEnabled=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.hasSlicePlane=!1,this.pixelSnappingEnabled=!0,this.occlusionTest=!0,this.occludedFragmentFade=!1,this.horizonCullingEnabled=!1,this.centerOffsetUnits="world",this.drawAsLabel=!1,this.depthEnabled=!0,this.isFocused=!0,this.focusStyle="bright",this.draped=!1,this.isLabel=!1}}const ct=fo().vec3f(u.POSITION).vec3f(u.NORMAL).vec2i16(u.UVI).vec4u8(u.COLOR).vec2f(u.SIZE).f32(u.ROTATION).vec4f(u.CENTEROFFSETANDDISTANCE).vec4f(u.FEATUREATTRIBUTE),Yo=ct.clone().vec4u8(u.OLIDCOLOR);class Zo{constructor(){this.vertexBufferLayout=Kt()?Yo:ct}elementCount(e){return e.get(u.POSITION).indices.length*M}write(e,t,a,i,s,r){var f,j;const{position:l,normal:c,uvi:n,color:S,size:p,rotation:h,centerOffsetAndDistance:$,featureAttribute:F}=s;eo(a.get(u.POSITION),e,l,r,M),to(a.get(u.NORMAL),t,c,r,M);const I=(f=a.get(u.UVI))==null?void 0:f.data;let b=0,x=0,P=-1-de,R=-1-de;I&&I.length>=4&&(b=I[0],x=I[1],P=-1-I[2],R=-1-I[3]);let w=a.get(u.POSITION).indices.length,g=r;for(let O=0;O<w;++O)n.set(g,0,b),n.set(g,1,x),g++,n.set(g,0,P),n.set(g,1,x),g++,n.set(g,0,P),n.set(g,1,R),g++,n.set(g,0,P),n.set(g,1,R),g++,n.set(g,0,b),n.set(g,1,R),g++,n.set(g,0,b),n.set(g,1,x),g++;oo(a.get(u.COLOR),4,S,r,M);const{data:L,indices:D}=a.get(u.SIZE);w=D.length,g=r;for(let O=0;O<w;++O){const _=L[2*D[O]],N=L[2*D[O]+1];for(let G=0;G<M;++G)p.set(g,0,_),p.set(g,1,N),g++}if(ao(a.get(u.ROTATION),h,r,M),a.get(u.CENTEROFFSETANDDISTANCE)?Me(a.get(u.CENTEROFFSETANDDISTANCE),$,r,M):je($,r,w*M),a.get(u.FEATUREATTRIBUTE)?Me(a.get(u.FEATUREATTRIBUTE),F,r,M):je(F,r,w*M),i!=null){const O=(j=a.get(u.POSITION))==null?void 0:j.indices;if(O){const _=O.length,N=s.getField(u.OLIDCOLOR,lo);io(i,N,_,r,M)}}return{numVerticesPerItem:M,numItems:w}}intersect(e,t,a,i,s,r,l){const{options:{selectionMode:c,hud:n,excludeLabels:S},point:p,camera:h}=i;if(!c||!n||S&&t.isLabel||!p)return;const $=this.vertexBufferLayout.createView(e),F=$.getField(u.POSITION,Ne),I=$.getField(u.NORMAL,Ne),b=$.getField(u.ROTATION,co),x=$.getField(u.SIZE,uo),P=$.getField(u.FEATUREATTRIBUTE,Be),R=$.getField(u.CENTEROFFSETANDDISTANCE,Be),w=t.centerOffsetUnits==="screen",g=ae(t);if(F==null||I==null||b==null||x==null||R==null||h==null)return;const L=P==null?null:P.getVec(0,Oe),{scaleX:D,scaleY:f}=$e(L,t,h.pixelRatio),j=F.count/M;for(let O=0;O<j;O++){const _=O*M;if(F.getVec(_,v),a!=null&&Ee(v,v,a),Z(v,v,h.viewMatrix),R.getVec(_,ne),le(C,ne[0],ne[1],ne[2]),!w&&(v[0]+=C[0],v[1]+=C[1],C[2]!==0)){const N=C[2];xe(C,v),Xe(v,v,q(C,C,N))}if(I.getVec(_,W),be(W,ue,h,te),Te(t,v,te,h,J),h.applyProjection(v,m),m[0]>-1){w&&(C[0]||C[1])&&(m[0]+=C[0]*h.pixelRatio,C[1]!==0&&(m[1]+=Ze(C[1],J.factorAlignment)*h.pixelRatio),h.unapplyProjection(m,v)),m[0]+=t.screenOffset[0]*h.pixelRatio,m[1]+=t.screenOffset[1]*h.pixelRatio,m[0]=Math.floor(m[0]),m[1]=Math.floor(m[1]),x.getVec(_,y),Je(y,J.factor,y);const N=lt*h.pixelRatio;let G=0;t.textureIsSignedDistanceField&&(G=Math.min(t.outlineSize,.5*y[0])*h.pixelRatio/2),y[0]*=D,y[1]*=f;const se=b.get(_),he=t.rotation+se;if(Ce(p,m[0],m[1],y,N,G,he,t,g)){const re=i.ray;if(Z(fe,v,Qe(nt,h.viewMatrix)),m[0]=p[0],m[1]=p[1],h.unprojectFromRenderScreen(m,v)){const U=k();X(U,re.direction);const V=1/oe(U);q(U,U,V),l(Ye(re.origin,v)*V,U,O,fe)}}}}}}function $e(o,e,t){return o==null||e.vvSize==null?{scaleX:t,scaleY:t}:(Zt(me,e,o),{scaleX:me[0]*t,scaleY:me[1]*t})}function Te(o,e,t,a,i){var c;if(!((c=o.verticalOffset)!=null&&c.screenLength))return o.screenSizePerspective||o.screenSizePerspectiveAlignment?ke(o,i,oe(e),t.cosAngle):(i.factor.scale=1,i.factorAlignment.scale=1),e;const s=oe(e),r=o.screenSizePerspectiveAlignment??o.screenSizePerspective,l=Jt(a,s,o.verticalOffset,t.cosAngle,r);return ke(o,i,s,t.cosAngle),q(t.normal,t.normal,l),Ee(e,e,t.normal)}function ke(o,e,t,a){o.screenSizePerspective!=null?Le(a,t,o.screenSizePerspective,e.factor):(e.factor.scale=1,e.factor.factor=0,e.factor.minScaleFactor=0),o.screenSizePerspectiveAlignment!=null?Le(a,t,o.screenSizePerspectiveAlignment,e.factorAlignment):(e.factorAlignment.factor=e.factor.factor,e.factorAlignment.scale=e.factor.scale,e.factorAlignment.minScaleFactor=e.factor.minScaleFactor)}export{Lo as B,ae as M,de as V,ha as a,ye as b,pa as c,To as i,Q as o,fa as s,ga as u};
