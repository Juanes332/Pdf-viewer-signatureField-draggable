import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import SignatureCanvas from 'react-signature-canvas';

const DraggableComp = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);
  const signatureCanvasRef = useRef(null);

  const handleDrag = (e, data) => {
    if (!isDrawing) {
      // Esta función se llamará cuando el componente sea arrastrado, pero solo si no se está dibujando
      console.log('Posición:', data.x, data.y);
    }
  };

  const handleDoubleClick = () => {
    setIsDrawing(true);
  };

  const handleSaveSignature = () => {
    if (signatureCanvasRef.current) {
      const signatureDataUrl = signatureCanvasRef.current.toDataURL('image/png');
      setSignatureDataUrl(signatureDataUrl);
      setIsDrawing(false);
    }
  };

  const handleClearSignature = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear();
      setSignatureDataUrl(null);
    }
  };

  const handleCancelDrawing = () => {
    setIsDrawing(false);
    setSignatureDataUrl(null);
  };

  const draggableHandlers = isDrawing ? { onStart: (e) => e.preventDefault() } : {};

  return (
    <Draggable
      onDrag={handleDrag}
      defaultPosition={{ x: 0, y: 0 }} // Establece la posición inicial del campo
      bounds="parent"
      style={{ position: 'absolute' }}
      cancel=".signature-canvas" // Indica que el campo no debe arrastrarse cuando se está dibujando en el canvas de firma
      {...draggableHandlers}
    >
      <div
        style={{ width: '200px', height: '100px', backgroundColor: 'lightblue', zIndex: 1000 }}
        onDoubleClick={handleDoubleClick}
      >
        {isDrawing ? (
          <div style={{ position: 'absolute', top: 0, left: 0 }}>
            <SignatureCanvas
              ref={signatureCanvasRef}
              penColor="black"
              canvasProps={{ width: 200, height: 100, className: 'signature-canvas' }}
            />
            <button onClick={handleSaveSignature}>Guardar</button>
            <button onClick={handleClearSignature}>Borrar</button>
            <button onClick={handleCancelDrawing}>Cancelar</button>
          </div>
        ) : null}
        {signatureDataUrl && !isDrawing ? (
          <img src={signatureDataUrl} alt="Firma" style={{ width: '100%', height: '100%' }} />
        ) : null}
      </div>
    </Draggable>
  );
};

export default DraggableComp;