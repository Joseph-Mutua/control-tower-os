import { createServer } from "node:http";
import { routeRequest } from "./routes/router.js";

const server = createServer((request, response) => {
  routeRequest(request, response).catch((error: Error) => {
    response.writeHead(500, { "content-type": "application/json" });
    response.end(
      JSON.stringify({
        error: "Unhandled server error",
        detail: error.message
      }),
    );
  });
});

const port = Number(process.env.PORT ?? 4010);

server.listen(port, () => {
  console.log(`control tower api listening on ${port}`);
});
