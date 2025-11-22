import { serve } from "bun";
import { stat, readFile } from "fs/promises";
import { join } from "path";

const PORT = process.env.PORT || 8000;
const PUBLIC_DIR = "."; // Serve files from the current directory

serve({
  port: PORT,
  async fetch(request) {
    const url = new URL(request.url);
    let filePath = join(PUBLIC_DIR, url.pathname);

    // If the path is a directory, try to serve index.html
    try {
      const stats = await stat(filePath);
      if (stats.isDirectory()) {
        filePath = join(filePath, "index.html");
      }
    } catch (e) {
      // File or directory does not exist, continue to try serving as a file
    }

    try {
      const file = await readFile(filePath);
      const mimeType = Bun.file(filePath).type;
      return new Response(file, {
        headers: { "Content-Type": mimeType },
      });
    } catch (e) {
      // If file not found, return 404
      return new Response("Not Found", { status: 404 });
    }
  },
  error(error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
});

console.log(`Bun server running on http://localhost:${PORT}`);
