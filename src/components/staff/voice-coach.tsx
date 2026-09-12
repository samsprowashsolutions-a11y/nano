import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RecCtor = new () => {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((ev: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal?: boolean }> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function Rec(): RecCtor | null {
  const w = window as unknown as { SpeechRecognition?: RecCtor; webkitSpeechRecognition?: RecCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-AU";
  u.rate = 0.92;
  u.pitch = 1;
  window.speechSynthesis.speak(u);
}

export function VoiceCoach({
  ask,
  value,
  onHeard,
}: {
  ask: string;
  value: string;
  onHeard: (text: string) => void;
}) {
  const [live, setLive] = useState(false);
  const [err, setErr] = useState("");
  const recRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => () => {
    recRef.current?.stop();
    window.speechSynthesis?.cancel();
  }, []);

  function hearAsk() {
    speak(ask);
  }

  function hearBack() {
    speak(value.trim() ? `I heard. ${value}` : "Nothing written yet. Tap talk and say it.");
  }

  function talk() {
    const Ctor = Rec();
    if (!Ctor) {
      setErr("This phone cannot listen. Type in the box.");
      return;
    }
    setErr("");
    if (live) {
      recRef.current?.stop();
      setLive(false);
      return;
    }
    const rec = new Ctor();
    rec.lang = "en-AU";
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (ev) => {
      let text = "";
      for (let i = 0; i < ev.results.length; i++) {
        text += ev.results[i][0]?.transcript ?? "";
      }
      onHeard(text.trim());
    };
    rec.onerror = () => {
      setLive(false);
      setErr("Could not hear. Tap talk again, or type.");
    };
    rec.onend = () => setLive(false);
    recRef.current = rec;
    rec.start();
    setLive(true);
    speak("I’m listening. Say the answer.");
  }

  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="crew-btn crew-btn-navy" onClick={hearAsk}>
          Hear the question
        </button>
        <button
          type="button"
          className={cn("crew-btn", live ? "crew-btn-orange" : "crew-btn-gold")}
          onClick={talk}
        >
          {live ? "Listening… tap to stop" : "Talk — I will write it"}
        </button>
      </div>
      <button type="button" className="crew-btn crew-btn-ghost" onClick={hearBack}>
        Hear that back
      </button>
      {err ? <p className="text-center text-base font-bold text-[#c2410c]">{err}</p> : null}
      {live ? (
        <p className="text-center text-lg font-extrabold uppercase tracking-wide text-[#c2410c]">
          Recording. Speak now.
        </p>
      ) : null}
    </div>
  );
}
