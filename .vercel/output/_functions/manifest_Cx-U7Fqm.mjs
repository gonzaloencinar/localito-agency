import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_BRauHljq.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_1PhcCGks.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/gonzalo.encinar/development/localito-agency/","cacheDir":"file:///Users/gonzalo.encinar/development/localito-agency/node_modules/.astro/","outDir":"file:///Users/gonzalo.encinar/development/localito-agency/dist/","srcDir":"file:///Users/gonzalo.encinar/development/localito-agency/src/","publicDir":"file:///Users/gonzalo.encinar/development/localito-agency/public/","buildClientDir":"file:///Users/gonzalo.encinar/development/localito-agency/dist/client/","buildServerDir":"file:///Users/gonzalo.encinar/development/localito-agency/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"contacto/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contacto","isIndex":false,"type":"page","pattern":"^\\/contacto\\/?$","segments":[[{"content":"contacto","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contacto.astro","pathname":"/contacto","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/gonzalo.encinar/development/localito-agency/src/pages/contacto.astro",{"propagation":"none","containsHead":true}],["/Users/gonzalo.encinar/development/localito-agency/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/contacto@_@astro":"pages/contacto.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Cx-U7Fqm.mjs","/Users/gonzalo.encinar/development/localito-agency/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_bBoLXifk.mjs","/Users/gonzalo.encinar/development/localito-agency/src/pages/contacto.astro?astro&type=script&index=0&lang.ts":"_astro/contacto.astro_astro_type_script_index_0_lang.BH19QPQG.js","/Users/gonzalo.encinar/development/localito-agency/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.jDbWrN3m.js","/Users/gonzalo.encinar/development/localito-agency/src/components/Tools.astro?astro&type=script&index=0&lang.ts":"_astro/Tools.astro_astro_type_script_index_0_lang.DjyUApx8.js","/Users/gonzalo.encinar/development/localito-agency/src/components/Faq.astro?astro&type=script&index=0&lang.ts":"_astro/Faq.astro_astro_type_script_index_0_lang.DXhnRduy.js","/Users/gonzalo.encinar/development/localito-agency/src/components/AuditModal.astro?astro&type=script&index=0&lang.ts":"_astro/AuditModal.astro_astro_type_script_index_0_lang.Dgm9EeUc.js","/Users/gonzalo.encinar/development/localito-agency/src/components/StickyCta.astro?astro&type=script&index=0&lang.ts":"_astro/StickyCta.astro_astro_type_script_index_0_lang.BL9SSqrg.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/gonzalo.encinar/development/localito-agency/src/pages/contacto.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const n=document.getElementById(\"contact-form\"),o=document.getElementById(\"contact-success\");n?.addEventListener(\"submit\",async function(a){a.preventDefault();const e=new FormData(n),t=n.querySelector('button[type=\"submit\"]');t.disabled=!0,t.textContent=\"Enviando...\";try{(await fetch(\"/api/contact\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({nombre:e.get(\"nombre\"),email:e.get(\"email\"),telefono:e.get(\"telefono\"),web:e.get(\"web\"),ficha:e.get(\"ficha\"),mensaje:e.get(\"mensaje\"),tipo:\"contacto\"})})).ok?(n.classList.add(\"hidden\"),o.classList.remove(\"hidden\")):(t.disabled=!1,t.textContent=\"Enviar solicitud\",alert(\"Error al enviar. Inténtalo de nuevo.\"))}catch{t.disabled=!1,t.textContent=\"Enviar solicitud\",alert(\"Error al enviar. Inténtalo de nuevo.\")}})});"],["/Users/gonzalo.encinar/development/localito-agency/src/components/Header.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const t=document.querySelector(\"#menu-content\"),n=document.querySelector(\"#menu-open\"),c=document.querySelector(\"#menu-close\");n?.addEventListener(\"click\",e=>{e.preventDefault(),t?.classList.remove(\"-translate-x-[100%]\")}),c?.addEventListener(\"click\",e=>{e.preventDefault(),t?.classList.add(\"-translate-x-[100%]\")}),t?.querySelectorAll(\"li a\").forEach(e=>{e.addEventListener(\"click\",o=>{t?.classList.add(\"-translate-x-[100%]\")})})});"],["/Users/gonzalo.encinar/development/localito-agency/src/components/Faq.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){document.querySelectorAll(\".faq-toggle\").forEach(t=>{t.addEventListener(\"click\",()=>{const e=t.nextElementSibling,o=t.querySelector(\".faq-icon\"),n=e.style.maxHeight&&e.style.maxHeight!==\"0px\";document.querySelectorAll(\".faq-content\").forEach(c=>{c.style.maxHeight=\"0px\"}),document.querySelectorAll(\".faq-icon\").forEach(c=>{c.classList.remove(\"rotate-45\")}),n||(e.style.maxHeight=e.scrollHeight+\"px\",o.classList.add(\"rotate-45\"))})})});"],["/Users/gonzalo.encinar/development/localito-agency/src/components/AuditModal.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const o=document.getElementById(\"audit-modal\"),i=document.getElementById(\"audit-overlay\"),s=document.getElementById(\"audit-close\"),d=document.getElementById(\"audit-form\"),c=document.getElementById(\"audit-success\");function l(e){e.preventDefault(),o.classList.remove(\"hidden\"),o.classList.add(\"flex\"),document.body.style.overflow=\"hidden\"}function a(){o.classList.add(\"hidden\"),o.classList.remove(\"flex\"),document.body.style.overflow=\"\"}document.querySelectorAll(\"[data-audit-trigger]\").forEach(function(e){e.addEventListener(\"click\",l)}),s.addEventListener(\"click\",a),i.addEventListener(\"click\",a),document.addEventListener(\"keydown\",function(e){e.key===\"Escape\"&&a()}),d.addEventListener(\"submit\",async function(e){e.preventDefault();const t=new FormData(d),n=d.querySelector('button[type=\"submit\"]');n.disabled=!0,n.textContent=\"Enviando...\";try{(await fetch(\"/api/contact\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({nombre:t.get(\"nombre\"),email:t.get(\"email\"),telefono:t.get(\"telefono\"),web:t.get(\"web\"),ficha:t.get(\"ficha_google\"),mensaje:t.get(\"mensaje\"),tipo:\"auditoria\"})})).ok?(d.classList.add(\"hidden\"),c.classList.remove(\"hidden\"),setTimeout(a,3e3)):(n.disabled=!1,n.textContent=\"Enviar solicitud\",alert(\"Error al enviar. Inténtalo de nuevo.\"))}catch{n.disabled=!1,n.textContent=\"Enviar solicitud\",alert(\"Error al enviar. Inténtalo de nuevo.\")}})});"],["/Users/gonzalo.encinar/development/localito-agency/src/components/StickyCta.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const t=document.getElementById(\"sticky-cta\"),e=document.querySelector(\"section\");function o(){if(!e||!t)return;e.getBoundingClientRect().bottom<0?(t.classList.remove(\"translate-y-24\",\"opacity-0\"),t.classList.add(\"translate-y-0\",\"opacity-100\")):(t.classList.add(\"translate-y-24\",\"opacity-0\"),t.classList.remove(\"translate-y-0\",\"opacity-100\"))}window.addEventListener(\"scroll\",o,{passive:!0}),o()});"]],"assets":["/_astro/hl.BsEYu58f.svg","/_astro/red-star.BvVdlNa-.svg","/_astro/pink-star.CU4FUfhP.svg","/_astro/logo-pin.BklYssbs.svg","/_astro/hero-content.Ct4RVXck.svg","/_astro/string.DwD9oIV4.svg","/_astro/arrow.CcIOwHyL.svg","/_astro/idea.DHoChmwT.svg","/_astro/new.DQz-ZJNM.svg","/_astro/arrow-card.CN2HXHFq.svg","/_astro/underline.DMGK9YuB.svg","/_astro/research.DUFfJ3v_.svg","/_astro/proto.NeJWaGh8.svg","/_astro/keyword.RQx-m2Q9.svg","/_astro/posts.w7N3kjN3.svg","/_astro/loyalty._RyazBN-.svg","/_astro/signals.DnNFvdsm.svg","/_astro/report.BfpWKlLX.svg","/_astro/ui.Cey-DEil.svg","/_astro/wire.BmDRuYNl.svg","/_astro/contacto.De0paIG5.css","/favicon.svg","/_astro/Tools.astro_astro_type_script_index_0_lang.DjyUApx8.js","/contacto/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"z64lnyWMKmW9APGMtoKXa+vHTHpWfcO6g6bHob5lj5I="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
