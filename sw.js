const staticCacheKey = "calendar-app-v1";

const assetUrls = ["index.html", "script.js", "style.css", "calendar.js"];

self.addEventListener("install", async (event) => {
  const cache = await caches.open(staticCacheKey);
  await cache.addAll(assetUrls);
});

self.addEventListener("activate", async (event) => {
  const cacheKeys = await caches.keys();
  await Promise.all(
    cacheKeys
      .filter((name) => name !== staticCacheKey)
      .map((name) => caches.delete(name))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? (await fetch(request));
}
