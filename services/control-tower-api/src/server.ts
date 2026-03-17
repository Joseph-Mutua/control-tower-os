import { createServer } from "node:http";

const server = createServer((_request, response) => {
  response.writeHead(200, { "content-type": "application/json" });
  response.end(
    JSON.stringify({
      service: "cxtms-control-tower-api",
      status: "booting",
      message: "Control tower API scaffold is in place."
    }),
  );
});

const port = Number(process.env.PORT ?? 4010);

server.listen(port, () => {
  console.log(`control tower api listening on ${port}`);
});
