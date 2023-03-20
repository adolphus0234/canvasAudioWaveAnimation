import React, { useRef, useEffect, useState, useCallback } from "react";
import AudioWave from "./components/AudioWave";

function App() {

  // Each component has its own update loop, which isn't very effecient if multiple
  // instances are intended in the same area of the app
  // This is fine for the purposes of showing a few versions of the audio wave
  // in this demo

  const canvasRef = useRef();

  const [context, setContext] = useState(null);

  const drawStaticContent = useCallback(() => {

    // include all static content that will be drawn on the canvas underneath the animation

    if (context) {
      const canvas = canvasRef.current;

      context.fillStyle = "black";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [context]);

  useEffect(() => {

      if (canvasRef.current) {
        canvasRef.current.width = 900;
        canvasRef.current.height = 700;
        const ctx = canvasRef.current.getContext("2d");
        setContext(ctx);
      }

      drawStaticContent();   

  }, [drawStaticContent])
  

  return (
    <div className="App" style={{display: "flex", justifyContent: "center"}}>
      <canvas ref={canvasRef} />      
      <AudioWave pos={{x: 405, y: 270}} outerContext={context} drawOuterLayer={drawStaticContent} scale={1} />
      <AudioWave pos={{x: 425, y: 140}} outerContext={context} scale={0.5} />
      <AudioWave pos={{x: 365, y: 450}} outerContext={context} scale={2} color="rgb(255, 170, 0)" />
    </div>
  );
}

export default App;
