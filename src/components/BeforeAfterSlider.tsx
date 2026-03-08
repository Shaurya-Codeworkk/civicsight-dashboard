import { useState, useRef } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, x)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-lg overflow-hidden cursor-col-resize select-none"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      <img src={afterImage} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={beforeImage} alt={beforeLabel} className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: containerRef.current?.offsetWidth }} />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground shadow-lg"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-primary-foreground border-2 border-primary flex items-center justify-center shadow-lg">
          <span className="text-primary text-xs font-bold">⇔</span>
        </div>
      </div>
      <span className="absolute top-2 left-2 bg-foreground/70 text-background text-xs px-2 py-0.5 rounded">{beforeLabel}</span>
      <span className="absolute top-2 right-2 bg-foreground/70 text-background text-xs px-2 py-0.5 rounded">{afterLabel}</span>
    </div>
  );
}
