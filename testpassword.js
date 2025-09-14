import bcrypt from "bcrypt";

async function checkPassword() {
  const hash = "$2b$10$88Fq4yRWQSA2yIJkxsAirOS8abZe9hbIHLIWjJ/UDPjexi0mlaK9G";
  const password = "nancy";

  const match = await bcrypt.compare(password, hash);
  console.log("Match?", match);
}

checkPassword();
