import React, { useRef, useEffect } from "react";

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

interface GridOffset {
  x: number;
  y: number;
}

interface ShapeGridProps {
  speed?: number;
  borderColor?: CanvasStrokeStyle;
  squareSize?: number;
  hoverFillColor?: CanvasStrokeStyle;
  hoverTrailAmount?: number;
}

const ShapeGrid: React.FC<ShapeGridProps> = ({
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "#222",
  hoverTrailAmount = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<GridOffset | null>(null);
  const trailCells = useRef<GridOffset[]>([]);
  const cellOpacities = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const offsetX =
        ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
      const offsetY =
        ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

      const cols = Math.ceil(canvas.width / squareSize) + 3;
      const rows = Math.ceil(canvas.height / squareSize) + 3;

      for (let col = -2; col < cols; col++) {
        for (let row = -2; row < rows; row++) {
          const sx = col * squareSize + offsetX;
          const sy = row * squareSize + offsetY;

          const cellKey = `${col},${row}`;
          const alpha = cellOpacities.current.get(cellKey);
          if (alpha) {
            ctx.globalAlpha = alpha;
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(sx, sy, squareSize, squareSize);
            ctx.globalAlpha = 1;
          }

          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 0.1;
          ctx.strokeRect(sx, sy, squareSize, squareSize);
        }
      }

      const gradient = ctx.createConicGradient(
        0,
        100,
        canvas.width + canvas.height
      );

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      updateCellOpacities();
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const updateCellOpacities = () => {
      const targets = new Map<string, number>();

      if (hoveredSquareRef.current) {
        targets.set(
          `${hoveredSquareRef.current.x},${hoveredSquareRef.current.y}`,
          1,
        );
      }

      if (hoverTrailAmount > 0) {
        for (let i = 0; i < trailCells.current.length; i++) {
          const t = trailCells.current[i];
          const key = `${t.x},${t.y}`;
          if (!targets.has(key)) {
            targets.set(
              key,
              (trailCells.current.length - i) / (trailCells.current.length + 1),
            );
          }
        }
      }

      for (const [key] of targets) {
        if (!cellOpacities.current.has(key)) {
          cellOpacities.current.set(key, 0);
        }
      }

      for (const [key, opacity] of cellOpacities.current) {
        const target = targets.get(key) || 0;
        const next = opacity + (target - opacity) * 0.15;
        if (next < 0.005) {
          cellOpacities.current.delete(key);
        } else {
          cellOpacities.current.set(key, next);
        }
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const offsetX =
        ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
      const offsetY =
        ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

      const adjustedX = mouseX - offsetX;
      const adjustedY = mouseY - offsetY;

      const col = Math.floor(adjustedX / squareSize);
      const row = Math.floor(adjustedY / squareSize);

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== col ||
        hoveredSquareRef.current.y !== row
      ) {
        if (hoveredSquareRef.current && hoverTrailAmount > 0) {
          trailCells.current.unshift({ ...hoveredSquareRef.current });
          if (trailCells.current.length > hoverTrailAmount)
            trailCells.current.length = hoverTrailAmount;
        }
        hoveredSquareRef.current = { x: col, y: row };
      }
    };

    const handleMouseLeave = () => {
      if (hoveredSquareRef.current && hoverTrailAmount > 0) {
        trailCells.current.unshift({ ...hoveredSquareRef.current });
        if (trailCells.current.length > hoverTrailAmount)
          trailCells.current.length = hoverTrailAmount;
      }
      hoveredSquareRef.current = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [speed, borderColor, hoverFillColor, squareSize, hoverTrailAmount]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full border-none block"
    ></canvas>
  );
};

export default ShapeGrid;
