import type { Metadata } from "next";
import ErrorPage from "../components/ErrorPage/ErrorPage";

export const metadata: Metadata = {
  title: "404 - Page not found",
  description: "Sorry, the page you are looking for does not exist",
  openGraph: {
    title: "404 - Page not found",
    description: "Sorry, the page you are looking for does not exist",
    url: "https://yourdomain.com/not-found",
    images: [
      {
        url: "https://picsum.photos/200/300",
        width: 300,
        height: 300,
      },
    ],
  },
};

export default function NotFound() {
  return <ErrorPage />;
}
