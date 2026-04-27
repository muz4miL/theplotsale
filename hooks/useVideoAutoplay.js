'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useVideoAutoplay
 *
 * Handles mobile autoplay reliably:
 * 1. Shows poster immediately (never black screen)
 * 2. Attempts muted autoplay on mount
 * 3. Retries on canplay / visibilitychange
 * 4. Falls back to 'blocked' state if browser denies autoplay
 * 5. Falls back to 'error' state if video fails to load
 *
 * Returns: { videoRef, status, play, error, posterVisible }
 *   status: 'loading' | 'playing' | 'blocked' | 'error'
 */
export function useVideoAutoplay({ src, poster, loop = true }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const attemptCount = useRef(0);
  const maxAttempts = 3;
  const loadTimer = useRef(null);

  const attemptPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || status === 'playing') return;

    attemptCount.current += 1;

    try {
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');

      await video.play();
      setStatus('playing');
      console.log('✅ Video autoplay succeeded');
    } catch (err) {
      console.warn('⚠️ Video autoplay attempt failed:', err.name, err.message);

      if (err.name === 'NotAllowedError' && attemptCount.current >= maxAttempts) {
        setStatus('blocked');
      } else if (err.name === 'NotSupportedError') {
        setStatus('error');
        setError(err);
      }
      // Otherwise stay in 'loading' and retry on next event
    }
  }, [status]);

  const play = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    attemptCount.current = 0;
    try {
      video.muted = true;
      await video.play();
      setStatus('playing');
    } catch (err) {
      setStatus('blocked');
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safety timeout: if nothing happens in 8s, assume blocked/error
    loadTimer.current = setTimeout(() => {
      if (status === 'loading') {
        console.warn('⏱ Video load timeout — falling back to poster');
        setStatus('error');
      }
    }, 8000);

    const onCanPlay = () => {
      clearTimeout(loadTimer.current);
      attemptPlay();
    };

    const onPlaying = () => {
      clearTimeout(loadTimer.current);
      setStatus('playing');
    };

    const onError = (e) => {
      clearTimeout(loadTimer.current);
      console.error('❌ Video error:', e);
      setStatus('error');
      setError(e);
    };

    const onEnded = () => {
      if (loop && video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    const onVisibilityChange = () => {
      if (!document.hidden && video && video.paused && status !== 'blocked') {
        attemptPlay();
      }
    };

    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('error', onError);
    video.addEventListener('ended', onEnded);
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Initial load
    video.load();
    attemptPlay();

    return () => {
      clearTimeout(loadTimer.current);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('error', onError);
      video.removeEventListener('ended', onEnded);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [src, loop, attemptPlay, status]);

  const posterVisible = status === 'loading' || status === 'error' || status === 'blocked';

  return { videoRef, status, play, error, posterVisible };
}