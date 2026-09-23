# NextStep PWA (GitHub Pages)

An installable wrapper for the NextStep Apps Script web app.

## Files
| File | Purpose |
|---|---|
| `index.html` | Splash screen, full-screen frame of the web app, and install banner |
| `manifest.json` | App name, colors, and icons |
| `sw.js` | Service worker (caches this wrapper only, never the app data) |
| `icon.png` | 512x512 app icon (Android, Chrome, maskable) |
| `icon-192.png` | 192x192 app icon (Android, Chrome, maskable) |
| `apple-touch-icon.png` | 180x180 home screen icon for iPhone |
| `apple-touch-icon-167.png` | 167x167 for iPad Pro |
| `apple-touch-icon-152.png` | 152x152 for iPad |
| `apple-touch-icon-120.png` | 120x120 for older iPhones |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Publish it

1. Create a GitHub repository, for example `nextstep`.
2. Upload every file in this folder to the root of the repository.
3. Go to **Settings → Pages**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`, then click **Save**.
4. After a minute, open `https://<your-username>.github.io/nextstep/`.

## Installing

- **Android or Chrome desktop:** a banner appears a few seconds after opening. Tap **Install**. Chrome's own menu also has "Install app."
- **iPhone or iPad:** a banner shows the steps. Tap the **Share** button, then **Add to Home Screen**.
- The banner stays hidden after it is dismissed or the app is installed.

## When you change the Apps Script web app

The wrapper points to a fixed `/exec` URL, so redeploying with **Manage deployments → Edit → New version** keeps the same link and nothing here needs changing. If you ever create a *new* deployment, paste the new URL into `APP_URL` near the bottom of `index.html`.

After editing any file here, bump `CACHE_NAME` in `sw.js` (for example to `nextstep-v2`) so installed devices pick up the change.
