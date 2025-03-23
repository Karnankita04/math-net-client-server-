import { assertEquals } from "jsr:@std/assert";

const fetchResponse = async (connection) => {
  const buffer = new Uint8Array(1024);
  const byteRead = await connection.read(buffer);
  const decoder = new TextDecoder();
  const decodedData = decoder.decode(buffer.slice(0, byteRead));
  return JSON.parse(decodedData);
};

const request = { command: "ADD", args: [1, 2] };

const sendRequest = async (connection) => {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(request));
  await connection.write(encodedData);
};

const test = async (connection) => {
  await sendRequest(connection);
  const actual = await fetchResponse(connection);
  console.log(actual);
  
  assertEquals(actual, 3);
  console.log("All test passed!!");
};

const main = async (port) => {
  const portNum = parseInt(port[0]);
  const connection = await Deno.connect({ port: portNum });
  test(connection);
};

main(Deno.args);
