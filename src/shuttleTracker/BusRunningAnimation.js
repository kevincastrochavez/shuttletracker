import React from 'react';
import Lottie from 'lottie-react';

import busRunningAnimation from './busRunning.json';
import classes from './BusRunningAnimation.module.css';

function BusRunningAnimation() {
  return (
    <div className={classes.busAnimationTitle}>
      <h2>The Walmart Shuttle runs from 10:00am to 9:45pm. Come back later!</h2>
      <Lottie animationData={busRunningAnimation} />
    </div>
  );
}

export default BusRunningAnimation;
