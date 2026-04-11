'use client';

import { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Reel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsVisible = useRef(false);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const showControls = useCallback(() => {
    if (videoRef.current) {
      controlsVisible.current = true;
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
      hideControlsTimeout.current = setTimeout(() => {
        controlsVisible.current = false;
      }, 3000);
    }
  }, []);

  const hideControls = useCallback(() => {
    controlsVisible.current = false;
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      video.play().catch(console.error);
      showControls();
    };

    const handlePause = () => {
      video.pause();
      hideControls();
    };

    video.addEventListener('click', () => {
      if (video.paused) {
        handlePlay();
      } else {
        handlePause();
      }
    });

    video.addEventListener('mouseenter', showControls);
    video.addEventListener('mouseleave', () => {
      if (!video.paused) {
        hideControlsTimeout.current = setTimeout(hideControls, 3000);
      }
    });

    return () => {
      video.removeEventListener('click', () => {});
      video.removeEventListener('mouseenter', showControls);
      video.removeEventListener('mouseleave', () => {});
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, [showControls, hideControls]);

  return (
    <section className="relative bg-black">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-auto"
          src="/reel.mp4"
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>

      {controlsVisible.current && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
          <button
            onClick={() => {
              const video = videoRef.current;
              if (video) {
                if (video.paused) {
                  video.play();
                } else {
                  video.pause();
                }
              }
            }}
            className="p-2 hover:bg-white/30 rounded-full transition-colors"
          >
            {videoRef.current?.paused ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23,6 23,18 15,12z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="4" x2="12" y2="20" />
                <line x1="16" y1="4" x2="16" y2="20" />
              </svg>
            )}
          </button>
          <div className="h-4 w-1 bg-white/30"></div>
          <span className="text-xs text-white/80">
            Click to play/pause
          </span>
        </div>
      )}
    </section>
  );
}