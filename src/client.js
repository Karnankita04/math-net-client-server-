const main = async (port) => {
  const portNum = parseInt(port[0]);
  const connection = await Deno.connect({ port:portNum });
  console.log(connection);
};

main(Deno.args);
