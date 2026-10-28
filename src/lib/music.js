/**
 * Ambient score, synthesised live with the Web Audio API.
 *
 * Nothing is downloaded — no mp3, zero bytes of bandwidth. It is a small
 * generative piece: a four-chord progression in A minor with a warm pad, a
 * sub bass, and a sparse pentatonic melody that never repeats the same way
 * twice, all fed into a synthesised plate reverb and a tempo-synced delay.
 *
 * Deliberately slow (56 BPM) and quiet so it sits under the page rather than
 * competing with it.
 */

const BPM = 56;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;

// Am9 — Fmaj7 — Cmaj7 — Gsus2 : warm, unresolved, loops forever
const PROGRESSION = [
  { root: 55.0, pad: [220.0, 261.63, 329.63, 392.0] }, // Am9
  { root: 43.65, pad: [174.61, 261.63, 329.63, 440.0] }, // Fmaj7
  { root: 65.41, pad: [196.0, 261.63, 329.63, 493.88] }, // Cmaj7
  { root: 49.0, pad: [196.0, 293.66, 392.0, 440.0] }, // Gsus2
];

// A minor pentatonic, two octaves — every note is consonant with every chord
const SCALE = [440.0, 523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66];

/** Short synthesised plate reverb, so we never ship an impulse-response file. */
function makeReverb(ctx, seconds = 3.6) {
  const rate = ctx.sampleRate;
  const len = Math.floor(rate * seconds);
  const buf = ctx.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      // noise with an exponential decay = a plausible diffuse tail
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
    }
  }
  const node = ctx.createConvolver();
  node.buffer = buf;
  return node;
}

export function createScore(ctx) {
  const master = new GainNode(ctx, { gain: 0 });

  // gentle bus compression keeps the mix even as voices overlap
  const glue = new DynamicsCompressorNode(ctx, {
    threshold: -26,
    ratio: 3,
    attack: 0.02,
    release: 0.3,
  });

  const reverb = makeReverb(ctx);
  const wet = new GainNode(ctx, { gain: 0.5 });
  const dry = new GainNode(ctx, { gain: 0.75 });

  // tempo-synced delay gives the melody its trailing echoes
  const delay = new DelayNode(ctx, { delayTime: BEAT * 0.75, maxDelayTime: 2 });
  const feedback = new GainNode(ctx, { gain: 0.34 });
  const delayTone = new BiquadFilterNode(ctx, { type: "lowpass", frequency: 1800 });
  delay.connect(feedback).connect(delay);
  delay.connect(delayTone).connect(wet);

  dry.connect(glue);
  wet.connect(reverb).connect(glue);
  glue.connect(master).connect(ctx.destination);

  // slow filter sweep across the whole pad — the "breathing"
  const padFilter = new BiquadFilterNode(ctx, { type: "lowpass", frequency: 700, Q: 0.7 });
  const sweep = new OscillatorNode(ctx, { type: "sine", frequency: 0.022 });
  const sweepAmt = new GainNode(ctx, { gain: 320 });
  sweep.connect(sweepAmt).connect(padFilter.frequency);
  sweep.start();
  padFilter.connect(dry);
  padFilter.connect(wet);

  /** One sustained pad chord. */
  function playChord(time, chord) {
    chord.pad.forEach((freq, i) => {
      const osc = new OscillatorNode(ctx, {
        type: i % 2 ? "triangle" : "sine",
        frequency: freq,
        detune: (Math.random() - 0.5) * 9,
      });
      const g = new GainNode(ctx, { gain: 0 });
      osc.connect(g).connect(padFilter);
      const peak = 0.08 / (1 + i * 0.25);
      g.gain.setValueAtTime(0, time);
      g.gain.linearRampToValueAtTime(peak, time + BAR * 0.45); // slow swell
      g.gain.linearRampToValueAtTime(0, time + BAR * 2);
      osc.start(time);
      osc.stop(time + BAR * 2 + 0.1);
    });

    // sub bass root
    const sub = new OscillatorNode(ctx, { type: "sine", frequency: chord.root });
    const sg = new GainNode(ctx, { gain: 0 });
    sub.connect(sg).connect(dry);
    sg.gain.setValueAtTime(0, time);
    sg.gain.linearRampToValueAtTime(0.16, time + 0.9);
    sg.gain.linearRampToValueAtTime(0, time + BAR * 2);
    sub.start(time);
    sub.stop(time + BAR * 2 + 0.1);
  }

  /** A single soft bell-like note of the melody. */
  function playNote(time, freq) {
    const osc = new OscillatorNode(ctx, { type: "sine", frequency: freq });
    const shimmer = new OscillatorNode(ctx, { type: "sine", frequency: freq * 2.01 });
    const g = new GainNode(ctx, { gain: 0 });
    const sg = new GainNode(ctx, { gain: 0.16 });

    osc.connect(g);
    shimmer.connect(sg).connect(g);
    g.connect(dry);
    g.connect(delay);

    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(0.11, time + 0.03); // soft pluck attack
    g.gain.exponentialRampToValueAtTime(0.0001, time + 2.6);

    osc.start(time);
    shimmer.start(time);
    osc.stop(time + 2.7);
    shimmer.stop(time + 2.7);
  }

  // ---- scheduler: look ahead and queue, so timing never depends on the UI thread
  let bar = 0;
  let nextTime = 0;
  let timer = null;
  let lastNote = -1;

  function schedule() {
    while (nextTime < ctx.currentTime + 1.5) {
      const chord = PROGRESSION[bar % PROGRESSION.length];
      if (bar % 2 === 0) playChord(nextTime, chord);

      // sparse melody: a few notes per bar, never the same note twice running
      const hits = [0, 1.5, 2.5, 3].filter(() => Math.random() > 0.45);
      hits.forEach((beat) => {
        let i = Math.floor(Math.random() * SCALE.length);
        if (i === lastNote) i = (i + 1) % SCALE.length;
        lastNote = i;
        playNote(nextTime + beat * BEAT, SCALE[i]);
      });

      nextTime += BAR;
      bar++;
    }
  }

  return {
    master,
    start() {
      nextTime = ctx.currentTime + 0.1;
      schedule();
      timer = setInterval(schedule, 500);
    },
    stop() {
      if (timer) clearInterval(timer);
      timer = null;
    },
  };
}
