import { assertEquals } from "jsr:@std/assert";
import { fetchResponse, sendRequest } from "../src/client.js";

const testADD = async (connection) => {
  const request = { command: "ADD", args: [1, 2] };

  await sendRequest(request, connection);
  const actual = await fetchResponse(connection);

  assertEquals(actual, 3);
  console.log("All test passed!!");
};

const main = async (port) => {
  const portNum = parseInt(port[0]);
  const connection = await Deno.connect({ port: portNum });
  await testADD(connection);
};

main(Deno.args);
