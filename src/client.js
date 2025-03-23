export const fetchResponse = async (connection) => {
  for await (const buffer of connection.readable) {
    const decoder = new TextDecoder();
    const decodedData = decoder.decode(buffer);
    return JSON.parse(decodedData);
  }
};

export const sendRequest = async (request, connection) => {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(request));
  await connection.write(encodedData);
};

const main = async (port) => {
  const portNum = parseInt(port[0]);
  const connection = await Deno.connect({ port: portNum });
};

// main(Deno.args);
