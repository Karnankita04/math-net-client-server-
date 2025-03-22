async function main(port) {
  const portNum = parseInt(port[0]);
  const listener = Deno.listen({ port: portNum });

  for await (const conn of listener) {
    for await (const buffer of conn.readable) {
      const decoder = new TextDecoder();
      const decodedData = decoder.decode(buffer);
      console.log("Request: ", decodedData);
    }
  }
}

main(Deno.args);
