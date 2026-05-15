'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Video } from 'lucide-react';

export default function Reel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // Sample video from a public source (tech/computer themed)
  const videoSrc = "https://videos.pexels.com/video-files/3252118/3252118-hd_1920_1080_25fps.mp4";

  useEffect(() => {
    // Check if video is empty
    if (videoRef.current) {
      videoRef.current.addEventListener('error', () => setVideoError(true));
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current && !videoError) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => setVideoError(true));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current && !videoError) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Fallback image when video fails
  if (videoError) {
    return (
      <section className="py-16 bg-[#0f172a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-black/50"
          >
            <div className="aspect-video bg-slate-800 flex items-center justify-center">
              <div className="text-center">
                <Video className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-500">Video no disponible</p>
                <p className="text-slate-600 text-sm mt-2">Añade tu video promocional como reel.mp4</p>
              </div>
            </div>
            <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500/20 backdrop-blur-sm rounded-full border border-cyan-500/30">
              <span className="text-xs font-medium text-cyan-400">Video promocional</span>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#0f172a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-black/50"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {/* Video */}
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            src={videoSrc}
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            onClick={togglePlay}
            onError={() => setVideoError(true)}
          />

          {/* Overlay */}
          <div className={`absolute inset-0 bg-slate-900/40 transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-20 h-20 rounded-full bg-cyan-500/90 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </motion.div>
            </button>

            {/* Bottom Controls */}
            <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/80 to-transparent transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center justify-between">
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5" />
                      <span className="text-sm">Pausar</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span className="text-sm">Reproducir</span>
                    </>
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Corner decoration */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500/20 backdrop-blur-sm rounded-full border border-cyan-500/30">
            <span className="text-xs font-medium text-cyan-400">Video promocional</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
