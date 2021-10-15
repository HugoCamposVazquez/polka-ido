/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_MOONBEAM_NETWORK_URL: string;
    REACT_APP_FORMSPREE_FORM_ID: string;
  }
}
