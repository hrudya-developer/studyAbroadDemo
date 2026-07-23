# ClientVideos refactor

Suggested location inside your React project:

```text
src/components/ClientVideos/
  ClientVideos.jsx
  components/
    VideoCarousel.jsx
    VideoCard.jsx
    VideoModal.jsx
    VideoState.jsx
  hooks/
    useCarouselController.js
    useDepartureVideos.js
  utils/
    videoUtils.js
```

Import it with:

```jsx
import ClientVideos from "./components/ClientVideos/ClientVideos";
```

The video modal uses a React portal, so it stays above the navbar and other stacking contexts.
