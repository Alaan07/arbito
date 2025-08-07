import React from "react";
import "../app.css";

function JoinButton({ children }) {
  const handleMouseEnter = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;
    const fromLeft = x;
    const fromRight = w - x;
    const fromTop = y;
    const fromBottom = h - y;
    const min = Math.min(fromLeft, fromRight, fromTop, fromBottom);
    btn.classList.remove("hover-left", "hover-right", "hover-top", "hover-bottom");
    if (min === fromLeft) btn.classList.add("hover-left");
    else if (min === fromRight) btn.classList.add("hover-right");
    else if (min === fromTop) btn.classList.add("hover-top");
    else if (min === fromBottom) btn.classList.add("hover-bottom");
  };

  const handleMouseLeave = (e) => {
    const btn = e.currentTarget;
    btn.classList.remove("hover-left", "hover-right", "hover-top", "hover-bottom");
  };

  return (
    <button
      className="join-btn"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>{children}</span>
    </button>
  );
}

export default JoinButton;
