# 🪶 TypeBeam

A **serverless**, **lightweight**, and **zero-dependency** JavaScript plugin that lets you dynamically change the global font family on any webpage — just by injecting a `<script>` tag.

Ideal for browser extensions, embedded widgets, or theme customization — no build tools or servers required.


## 🚀 Features

* **Serverless:** works entirely client-side
* **Lightweight:** single self-contained JS file
* **Cache-friendly:** same URL, configurable parameters
* **Safe & non-intrusive:** excludes code blocks and icon fonts automatically
* **Fast:** adds automatic `preconnect` and `preload` for font URLs
* **Configurable:** set font family, weight, style, and scope
* **Rollback-ready:** exposes a simple `TypeBeam.unload()` method

## ⚙️ Parameters

You can pass parameters either through **URL query** or via **`data-*` attributes**.
All parameters are optional except for `url`.

| Name     | Default        | Description                                                                    |
| -------- | -------------- | ------------------------------------------------------------------------------ |
| `url`    | *(required)*   | The font file URL (must use `https:` or `data:`)                               |
| `family` | `TypeBeamFont` | Custom font family name                                                        |
| `scope`  | `:root`        | CSS selector that defines where to apply the font (e.g., `body`, `.container`) |
| `weight` | `normal`       | Font weight (e.g., `400`, `700`)                                               |
| `style`  | `normal`       | Font style (`normal`, `italic`, etc.)                                          |

## 💡 Usage

### 1. Via URL parameters

A quick one-liner to inject a remote font:

```html
<script src="https:/cdn.example.com/typebeam.js?url=https://cdn.example.com/MyFont.woff2&family=MyFont"></script>
```

OR

```html
<script src="https:/cdn.example.com/typebeam.min.js?url=https://cdn.example.com/MyFont.woff2&family=MyFont"></script>
```

✅ **Example:**
Replace the `url` value with any `.woff2` font file — e.g. a Geist or Inter font.

### 2. Via `data-*` attributes (recommended, cache-friendly)
> If your CDN provider has its own query parsing rules so that you can't use Method 1. Via URL parameters...

Keep the script URL stable for better CDN caching:

```html
<script
  src="https://raw.githubusercontent.com/xolyn/typebeam/refs/heads/main/typebeam.js"
  data-url="https://cdn.example.com/MyFont.woff2"
  data-family="MyFont"
  data-scope="body"           <!-- optional, default :root -->
  data-weight="400"           <!-- optional -->
  data-style="normal"         <!-- optional -->
></script>
```

OR

```html
<script
  src="https://raw.githubusercontent.com/xolyn/typebeam/refs/heads/main/typebeam.min.js"
  data-url="https://cdn.example.com/MyFont.woff2"
  data-family="MyFont"
  data-scope="body"           <!-- optional, default :root -->
  data-weight="400"           <!-- optional -->
  data-style="normal"         <!-- optional -->
></script>
```

## 🧩 Unloading the font

If you ever need to remove the injected font and revert to the default styles:

```js
TypeBeam.unload();
```


## Speed up
If you are in China mainland, use:
`https://fastly.jsdelivr.net/gh/xolyn/typebeam/refs/heads/main/typebeam.js` instead of `https://raw.githubusercontent.com/xolyn/typebeam/refs/heads/main/typebeam.js`


## 📦 License

MIT
