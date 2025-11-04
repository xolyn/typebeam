(function(){
var script = document.currentScript || (function () {
var scripts = document.getElementsByTagName('script');
return scripts[scripts.length - 1];
})();
var url = new URL(script.src, window.location.href);
var fontUrl = url.searchParams.get('url'); 
var fontName = 'font'; 
var prev = document.getElementById('__inject_remote_font__');
if(prev) prev.parentNode.removeChild(prev);
var style = document.createElement('style');
style.id = '__inject_remote_font__';
style.type = 'text/css';
style.appendChild(document.createTextNode(
"@font-face{font-family: '" + fontName + "'; src: url('" + fontUrl + "'); font-display: swap;}" +
"html, body, * { font-family: '" + fontName + "' !important; }"
));
document.head.appendChild(style);
try {
var ff = new FontFace(fontName, "url(" + fontUrl + ")", { display: 'swap' });
ff.load().then(function(loadedFace){
    document.fonts.add(loadedFace);
    document.documentElement.style.setProperty('font-family', "'" + fontName + "', sans-serif");
}).catch(function(err){
    console.warn('FontFace load failed:', err);
});
} catch (e) {
console.warn('FontFace API not available:', e);
}
})();