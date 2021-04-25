import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDom.render(<App history={history} />, el);

  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };

// in case user refreshes the page on a route that is not "/" we need
// to tell the memory history router to go to the route that was requested
// otherwise it will just give the "/" route
// this is only true for production because in development we use browser history router
// if (initialPathname !== "/") {
//   history.push(initialPathname);
// }
