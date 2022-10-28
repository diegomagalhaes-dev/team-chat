import React, { useEffect } from "react";
import GlobalStyles from "main/styles/GlobalStyles";
import Normalize from "main/styles/Normalize";
import { ApplicationRouter } from "./Router";
import { appTheme } from "./Theme";
import Pubnub from "pubnub";
import { createPubNubListener } from "pubnub-redux";
import { PubNubProvider } from "pubnub-react";
import { Provider } from "react-redux";
import { createAppStore } from "main/store";
import keyConfiguration from "config/pubnub-keys.json";
import { ThemeProvider } from "styled-components";

const pubnubConfig = Object.assign(
  {},
  {
    // Ensure that subscriptions will be retained if the network connection is lost
    restore: true,
    heartbeatInterval: 0
  },
  keyConfiguration
);
const pubnub = new Pubnub(pubnubConfig);

const store = createAppStore({
  pubnub: {
    api: pubnub
  }
});

const leaveApplication = () => {
  // This is required to show the current user leave immediately rather than
  // wating for the timeout period
  pubnub.unsubscribeAll();
};

const App = () => {
  useEffect(() => {
    // Start listening for messages and events from PubNub
    pubnub.addListener(createPubNubListener(store.dispatch));
    return leaveApplication;
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", leaveApplication);
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <Provider store={store}>
        <PubNubProvider client={pubnub}>
          <Normalize />
          <GlobalStyles />
          <ApplicationRouter />
        </PubNubProvider>
      </Provider>
    </ThemeProvider>
  );
};

export { App };
