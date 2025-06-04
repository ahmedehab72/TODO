import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"
import { title } from "process"
const prisma = new PrismaClient()

async function main() {
  // ** Seed the database with 25 Todos
  await prisma.todo.createMany({
    data: Array.from({ length: 25 }, () => ({
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
    }))
  })

}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })