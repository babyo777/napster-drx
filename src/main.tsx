import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SharePlay from "./components/SharePlay/SharePlay.tsx";
import Search from "./components/Search/Search.tsx";
import Library from "./components/Library/Library.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./Store/Store.ts";
import { RememberLib } from "./components/Library/RememberLib.tsx";
import NotFound from "./components/404.tsx";
import Check from "./components/Check.tsx";
import AlbumPage from "./Artists/AlbumPage.tsx";
import ArtistPage from "./Artists/ArtistPage.tsx";
import ListenNow from "./components/ListenNow/ListenNow.tsx";
import LikedSong from "./LikedSongs/likedSongs.tsx";
import Suggested from "./Suggested/Suggested.tsx";
const client = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Check />,
    errorElement: (
      <div className="flex text-center px-7 h-screen justify-center items-center">
        <p>
          Something went wrong restart app to fix or <br /> {""}
          <a
            target="_blank"
            href="https://www.instagram.com/babyo7_/"
            className="underline underline-offset-4 text-red-500"
          >
            Get help!
          </a>
        </p>
      </div>
    ),
    children: [
      {
        path: "",
        element: <ListenNow />,
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
        path: "/artist/:id",
        element: <ArtistPage />,
      },
      {
        path: "/album/:id",
        element: <AlbumPage />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/liked/:id",
        element: <LikedSong />,
      },
      {
        path: "/suggested",
        element: <Suggested />,
      },
      {
        path: "/suggested/:id",
        element: <Suggested />,
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
