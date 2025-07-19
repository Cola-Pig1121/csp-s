"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import "./RollingGallery.css";

gsap.registerPlugin(Observer);

const defaultItems = [
  {
    img: "../FeaturedEpisodes/Interview1.svg",
    title: "AI Youth Entrepreneur : Xiaoteng Ma",
    subtitle: "Watch on YouTube ↗",
  },
  {
    img: "../FeaturedEpisodes/Interview2.svg",
    title: "Coming Soon...",
    subtitle: "Watch on YouTube ↗",
  },
  {
    img: "../FeaturedEpisodes/Interview3.svg",
    title: "Featured Episodes",
    subtitle: "Watch on YouTube ↗",
  },
  {
    img: "../FeaturedEpisodes/Interview3.svg",
    title: "Featured Episodes",
    subtitle: "Watch on YouTube ↗",
  },
];

const RollingGallery = ({
  items = defaultItems,
  width = "100%",
  height = "500px",
  itemMinWidth = 468,
  itemGap = "10px",
  autoplay = false,
  autoplaySpeed = 0.5,
  autoplayDirection = "left",
  pauseOnHover = false,
}) => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0) return;

    const divItems = gsap.utils.toArray(container.children);
    if (!divItems.length) return;

    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem);
    const itemWidth = firstItem.offsetWidth;
    const itemMarginLeft = parseFloat(itemStyle.marginLeft) || 0;
    const totalItemWidth = itemWidth + itemMarginLeft;
    const totalWidth = totalItemWidth * items.length;

    const wrapFn = gsap.utils.wrap(-totalWidth, totalWidth);

    divItems.forEach((child, i) => {
      gsap.set(child, { x: i * totalItemWidth });
    });

    const observer = Observer.create({
      target: container,
      type: "wheel,touch,pointer",
      preventDefault: true,
      onPress: (self) => {
        self.target.style.cursor = "grabbing";
      },
      onRelease: (self) => {
        self.target.style.cursor = "grab";
      },
      onChange: (self) => {
        const { deltaX, isDragging, event } = self;
        const d = event.type === "wheel" ? -deltaX : deltaX;
        const distance = isDragging ? d * 5 : d * 10;
        divItems.forEach((child) => {
          gsap.to(child, {
            duration: 0.5,
            ease: "expo.out",
            x: `+=${distance}`,
            modifiers: { x: gsap.utils.unitize(wrapFn) },
          });
        });
      },
    });

    let rafId;
    if (autoplay) {
      const directionFactor = autoplayDirection === "left" ? -1 : 1;
      const speedPerFrame = autoplaySpeed * directionFactor;

      const tick = () => {
        divItems.forEach((child) => {
          gsap.set(child, {
            x: `+=${speedPerFrame}`,
            modifiers: { x: gsap.utils.unitize(wrapFn) },
          });
        });
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      if (pauseOnHover) {
        const stopTicker = () => cancelAnimationFrame(rafId);
        const startTicker = () => { rafId = requestAnimationFrame(tick); };

        container.addEventListener("mouseenter", stopTicker);
        container.addEventListener("mouseleave", startTicker);

        return () => {
          observer.kill();
          stopTicker();
          container.removeEventListener("mouseenter", stopTicker);
          container.removeEventListener("mouseleave", startTicker);
        };
      } else {
        return () => {
          observer.kill();
          cancelAnimationFrame(rafId);
        };
      }
    }

    return () => {
      observer.kill();
      cancelAnimationFrame(rafId);
    };
  }, [items, width, height, itemMinWidth, itemGap, autoplay, autoplaySpeed, autoplayDirection, pauseOnHover]);

  return (
    <div className="gallery-wrapper" ref={wrapperRef} style={{ height, width, overflow: "hidden" }}>
      <div className="gallery-container" ref={containerRef} style={{ display: "flex", flexDirection: "row", height: "100%", alignItems: "center" }}>
        {items.map((item, i) => (
          <div
            className="gallery-item"
            key={i}
            style={{
              minWidth: `${itemMinWidth}px`,
              marginLeft: itemGap,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "0 10px",
              boxSizing: "border-box",
              flexShrink: 0,
            }}
          >
            <img src={item.img} alt="gallery" className="gallery-img" />
            <div className="gallery-title">{item.title}</div>
            <div className="gallery-subtitle">{item.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RollingGallery;