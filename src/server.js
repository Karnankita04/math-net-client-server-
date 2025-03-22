async function main(port) {
  const portNum = parseInt(port[0]);
  const listener = Deno.listen({ port: portNum });

  for await (const conn of listener) {
    console.log(conn);
  }
}

main(Deno.args);
