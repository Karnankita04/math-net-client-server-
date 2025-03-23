const fetchRequest = (buffer) => {
  const decoder = new TextDecoder();
  const decodedData = decoder.decode(buffer);
  const request = JSON.parse(decodedData);
  return request;
};

const calculate = (command, a, b) => {
  const commands = {
    ADD: (a, b) => a + b,
  };

  return commands[command](a, b);
};

const sendResponse = async (command, args, conn) => {
  console.log(command, args);
  const encoder = new TextEncoder();
  const result = calculate(command, ...args);
  const encodedData = encoder.encode(JSON.stringify(result));
  await conn.write(encodedData);
};

async function main(port) {
  const portNum = parseInt(port[0]);
  const listener = Deno.listen({ port: portNum });

  for await (const conn of listener) {
    for await (const buffer of conn.readable) {
      const { command, args } = fetchRequest(buffer);
      sendResponse(command, args, conn);
    }
  }
}

main(Deno.args);
