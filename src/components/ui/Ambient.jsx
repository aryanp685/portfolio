import { useCallback, useEffect, useRef, useState } from "react";
import { createScore } from "../../lib/music";

/**
 * Toggle for the generative ambient score (see lib/music.js).
 * Starts muted: browsers block autoplay without a gesture, and unannounced
 * audio is hostile. Fades in and out so it never clicks.
 */
export default function Ambient() {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const ctxRef = useRef(null);
  const scoreRef = useRef(null);

  useEffect(() => setReady(true), []);

  const toggle = useCallback(async () => {
    const next = !on;
    setOn(next);

    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      const ctx = new AC();
      ctxRef.current = ctx;
      scoreRef.current = createScore(ctx);
    }
    const ctx = ctxRef.current;
    const score = scoreRef.current;
    if (ctx.state === "suspended") await ctx.resume();

    const t = ctx.currentTime;
    const g = score.master.gain;
    g.cancelScheduledValues(t);
    g.setValueAtTime(g.value, t);

    if (next) {
      score.start();
      g.linearRampToValueAtTime(0.5, t + 2.5);
    } else {
      g.linearRampToValueAtTime(0, t + 1.2);
      setTimeout(() => score.stop(), 1300);
    }
  }, [on]);

  // pause while the tab is hidden
  useEffect(() => {
    const onVis = () => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      if (document.hidden) ctx.suspend();
      else if (on) ctx.resume();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [on]);

  useEffect(
    () => () => {
      scoreRef.current?.stop();
      ctxRef.current?.close();
    },
    [],
  );

  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor="link"
      aria-label={on ? "Mute ambient music" : "Play ambient music"}
      aria-pressed={on}
      className="meta flex items-center gap-2"
      title={on ? "Music on" : "Music off"}
    >
      <span aria-hidden className="flex h-4 w-4 items-end gap-[2px]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[2px] bg-current"
            style={{
              height: on ? undefined : "4px",
              animation: on ? `eq 1.1s ease-in-out ${i * 0.18}s infinite` : "none",
            }}
          />
        ))}
      </span>
      <span className="hidden sm:inline">{on ? "Sound" : "Muted"}</span>
    </button>
  );
}
