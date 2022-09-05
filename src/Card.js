import React from 'react'
import './Card.css'
import { useState, useEffect, useRef } from 'react';

function FloatingWindowHandler(el) {
  const [{ dx, dy }, setOffset] = useState({ dx: 0, dy: 0 });

  useEffect(() => {
    const handleMouseDown = event => {
      const startX = event.pageX - dx;
      const startY = event.pageY - dy;

      const handleMouseMove = event => {
        const newDx = event.pageX - startX;
        const newDy = event.pageY - startY;
        setOffset({ dx: newDx, dy: newDy });
      };

      document.addEventListener("mousemove", handleMouseMove);

      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", handleMouseMove);
        },
        { once: true }
      );
    };

    el.current.addEventListener("mousedown", handleMouseDown);

    return () => {
      el.current.removeEventListener("mousedown", handleMouseDown);
    };
  }, [dx, dy]);

  useEffect(() => {
    el.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  }, [dx, dy]);
}

const Card = ({ number }) => {
  const [cardOrientation, setCardOrientation] = useState(true);

  const handleDoubleClick = (e) => {
    setCardOrientation(!cardOrientation);
  }

  return (
    <div className='Card' 
    onDoubleClick={handleDoubleClick} 
    style={{backgroundColor: cardOrientation ? '#EF4E6E' : '#39AF8E'}}>
      <p>{cardOrientation ? "" : number }</p>
    </div>
  )
}

const FloatingObject = ({ number }) => {
  const cardRef = useRef(null);
  FloatingWindowHandler(cardRef);

  return (
    <div className="floating-window" ref={cardRef}>
      <Card number={number}  ></Card>
    </div >
  );
};

export default FloatingObject