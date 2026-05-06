import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "dist");
const port = Number(process.env.PORT ?? 4173);

const types = new Map([
  [".css", "text/css"],
  [".html", "text/html"],
  [".js", "text/javascript"],
  [".json", "application/json"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"]
]);

const server = createServer(async (request, response) => {
  const rawUrl = new URL(request.url ?? "/", `http://localhost:${port}`);
  const cleanPath = normalize(decodeURIComponent(rawUrl.pathname)).replace(
    /^(\.\.[/\\])+/,
    ""
  );
  let filePath = join(root, cleanPath);

  if (!existsSync(filePath) || (await stat(filePath)).isDirectory()) {
    filePath = join(root, "index.html");
  }

  response.setHeader(
    "Content-Type",
    types.get(extname(filePath)) ?? "application/octet-stream"
  );
  createReadStream(filePath).pipe(response);
});

server.listen(port, () => {
  console.log(`Serving ${root} at http://localhost:${port}`);
});
