import React, { useState, useRef } from 'react';

function Board() {
    const [lines, setLines] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef(null);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setLines([...lines, { id: lines.length, points: [{ x: offsetX, y: offsetY }] }]);
        setIsDrawing(true);
    };

    const endDrawing = () => {
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        const updatedLines = [...lines];
        updatedLines[lines.length - 1].points.push({ x: offsetX, y: offsetY });
        setLines(updatedLines);
        drawOnCanvas();
    };

    const drawOnCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.lineJoin = 'round';
        context.lineWidth = 2;
        lines.forEach(line => {
            context.beginPath();
            line.points.forEach((point, index) => {
                if (index === 0) {
                    context.moveTo(point.x, point.y);
                } else {
                    context.lineTo(point.x, point.y);
                }
            });
            context.stroke();
        });
    };

    return (
        <div className="App">
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawing}
                onTouchEnd={endDrawing}
                onTouchMove={draw}
            />
        </div>
    );
}

export default Board;
