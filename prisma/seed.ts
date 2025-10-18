import { auth } from "@/lib/auth";

async function main() {

  // Criar usuário admin
  const newUser = await auth.api.createUser({
    body: {
      email: "admin@email.com",
      password: "111222333",
      name: "Gustavo Apeludo Admin",
      role: "admin",
    },
  });

  console.log("Admin criado:", newUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
  });
