import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const LoadingView = ({ currentlySending, fallbackDelay = 500 }) => {
  const [delayed, setDelayed] = useState(true);
  useEffect(() => {
    if (currentlySending) {
      setDelayed(currentlySending);
    }
    const timeout = setTimeout(() => {
      setDelayed(currentlySending);
    }, fallbackDelay);
    return () => clearTimeout(timeout);
  }, [currentlySending, fallbackDelay]);

  return delayed ? <LinearProgress /> : null;
};

LoadingView.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  fallbackDelay: PropTypes.number,
};

LoadingView.defaultProps = {
  fallbackDelay: 500,
};
export default LoadingView;
