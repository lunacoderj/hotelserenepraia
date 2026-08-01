import ReactGA from 'react-ga4';

const TRACKING_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (TRACKING_ID && TRACKING_ID !== 'your_ga4_measurement_id_here') {
    ReactGA.initialize(TRACKING_ID);
    console.log('Google Analytics initialized');
  }
};

export const logPageView = () => {
  if (TRACKING_ID && TRACKING_ID !== 'your_ga4_measurement_id_here') {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
  }
};
