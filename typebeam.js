(function () {
    var script = document.currentScript || (function () {
      var s = document.getElementsByTagName('script');
      return s[s.length - 1];
    })();

    function getParam(name, fallback) {
      var dataVal = script.getAttribute('tb-' + name);
      if (dataVal != null) return dataVal;
      try {
        var u = new URL(script.src, window.location.href);
        var v = u.searchParams.get(name);
        return v != null ? v : fallback;
      } catch (e) {
        return fallback;
      }
    }

    var fontUrl  = getParam('url', '');
    var family   = getParam('family', 'TypeBeamFont');
    var scopeSel = getParam('scope', ':root'); 
    var weight   = getParam('weight', 'normal');
    var styleVal = getParam('style', 'normal');

    if (!fontUrl) { console.warn('[TypeBeam] Missing font url'); return; }
    try {
      var parsed = new URL(fontUrl, window.location.href);
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'data:') {
        console.warn('[TypeBeam] Unsupported protocol for font url:', parsed.protocol);
        return;
      }
    } catch (e) {
      console.warn('[TypeBeam] Invalid font url:', fontUrl);
      return;
    }

    if (document.documentElement.__typebeam_loaded__) {

      var cache = document.documentElement.__typebeam_loaded__;
      if (cache.family === family && cache.url === fontUrl) return;
    }

    try {
      var host = new URL(fontUrl, window.location.href).origin;
      if (host !== window.location.origin) {
        var preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = host;
        preconnect.crossOrigin = 'anonymous';
        document.head.appendChild(preconnect);
      }

      var preload = document.createElement('link');
      preload.rel = 'preload';
      preload.as = 'font';
      preload.href = fontUrl;
      preload.crossOrigin = 'anonymous';

      if (/\.woff2(\?|#|$)/i.test(fontUrl)) preload.type = 'font/woff2';
      document.head.appendChild(preload);
    } catch (e) {  }

    var STYLE_ID = '__typebeam_style__';
    var prev = document.getElementById(STYLE_ID);
    if (prev && prev.parentNode) prev.parentNode.removeChild(prev);

    var fallbackStack = "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji'";
    var excludeSel = 'code, pre, kbd, samp, .icon, [class*="icon"], [data-icon]';
    var css = [
      "@font-face{",
        "font-family:'" + family + "';",
        "src:url('" + fontUrl + "') format('woff2');",  
        "font-display:swap;",
        "font-weight:" + weight + ";",
        "font-style:" + styleVal + ";",
      "}",
      scopeSel + " {",
        "font-family:'" + family + "', " + fallbackStack + ";",
      "}",
      scopeSel + " " + excludeSel + " {",
        "font-family:inherit !important;", 
      "}"
    ].join('');

    var styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    styleEl.type = 'text/css';
    styleEl.appendChild(document.createTextNode(css));
    document.head.appendChild(styleEl);

    function afterLoad() {
      document.documentElement.__typebeam_loaded__ = { family: family, url: fontUrl };

      document.documentElement.setAttribute('data-typebeam', family);
    }

    if ('fonts' in document && 'FontFace' in window) {
      try {
        var ff = new FontFace(family, "url('" + fontUrl + "')", {
          display: 'swap',
          weight:  String(weight),
          style:   String(styleVal)
        });
        ff.load().then(function (loaded) {
          document.fonts.add(loaded);

          document.fonts.ready.then(afterLoad).catch(afterLoad);
        }).catch(function (err) {
          console.warn('[TypeBeam] FontFace load failed:', err);
          afterLoad();
        });
      } catch (e) {
        console.warn('[TypeBeam] FontFace API error:', e);
        afterLoad();
      }
    } else {

      afterLoad();
    }

    window.TypeBeam = window.TypeBeam || {};
    window.TypeBeam.unload = function () {
      var s = document.getElementById(STYLE_ID);
      if (s && s.parentNode) s.parentNode.removeChild(s);
      document.documentElement.removeAttribute('data-typebeam');
      if (document.documentElement.__typebeam_loaded__) {
        document.documentElement.__typebeam_loaded__ = null;
      }
    };
  })();
