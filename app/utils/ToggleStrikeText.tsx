import dynamic from 'next/dynamic';
import React, { FC, useEffect, useState } from 'react';

type ToggleStrikeTextProps = {
  toggleCrossedOut: boolean;
  children: React.ReactNode;
};

const ToggleStrikeText: FC<ToggleStrikeTextProps> = ({ toggleCrossedOut, children }) => {
  // Toggle strikethrough animation state
  const [isCrossedOut, setIsCrossedOut] = useState(false);
  useEffect(() => {
    setIsCrossedOut(toggleCrossedOut);
  }, [toggleCrossedOut]);

  // Handle initial render and strikethrough animation
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [animationClass, setAnimationClass] = useState('');
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      setAnimationClass(isCrossedOut ? 'animate-strikethrough' : 'animate-unstrikethrough');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCrossedOut]);

  return (
    <span className="relative w-fit">
      <span className={`strikethrough ${animationClass}`}>{children}</span>
    </span>
  );
};

export default dynamic(() => Promise.resolve(ToggleStrikeText), { ssr: false });
