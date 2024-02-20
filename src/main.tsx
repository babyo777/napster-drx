import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import ListenNow from "./components/ListenNow/ListenNow.tsx";
import SharePlay from "./components/SharePlay/SharePlay.tsx";
import Search from "./components/Search/Search.tsx";
import Library from "./components/Library/Library.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./Store/Store.ts";
import { RememberLib } from "./components/Library/RememberLib.tsx";
import NotFound from "./components/404.tsx";
import Check from "./components/Check.tsx";
import ListenNo from "./components/ListenNow/NewListen.tsx";
const client = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Check />,
    children: [
      {
        path: "",
        element: <ListenNo />,
      },
      {
        path: "/share-play",
        element: <SharePlay />,
      },
      {
        path: "/library",
        element: <RememberLib />,
      },
      {
        path: "/library/:id",
        element: <Library />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
