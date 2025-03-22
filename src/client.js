import { assertEquals } from "jsr:@std/assert";

const request = "abc";
const sendRequest = async (connection) => {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(request);
  await connection.write(encodedData);
};

const main = async (port) => {
  const portNum = parseInt(port[0]);
  const connection = await Deno.connect({ port: portNum });
  sendRequest(connection);
};

main(Deno.args);
