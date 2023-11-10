import { definePlugin } from "@unding/studio";

export default definePlugin({
  name: "@unding/content",
  slug: "content",

  routes: () => [
    {
      path: "",
      element: () =>
        import("./routes/Index").then((module) => ({ default: module.Index })),
    },

    {
      path: ":contentType",
      element: () =>
        import("./routes/:contentType/Index").then((module) => ({
          default: module.ContentTypeList,
        })),
    },

    {
      path: ":contentType/:documentId",
      element: () =>
        import("./routes/:contentType/:documentId/Index").then((module) => ({
          default: module.DocumentForm,
        })),
    },
  ],
});
