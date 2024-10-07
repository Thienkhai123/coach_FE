export default function manifest() {
  return {
    name: "Quang Binh",
    short_name: "Quang Binh",
    version: "1",
    manifest_version: 1,
    start_url: "/",
    icons: [
      {
        src: "./images/logoFooter.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "./images/logoFooter.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  };
}
