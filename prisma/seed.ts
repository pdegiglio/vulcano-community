import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create test admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@vulcano.towers' },
    update: {},
    create: {
      email: 'admin@vulcano.towers',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      apartmentNumber: 'A000',
      tower: 'A',
      role: 'ADMIN',
      phoneNumber: '+1 (555) 000-0000',
    },
  });

  // Create test resident user
  const residentPassword = await bcrypt.hash('resident123', 12);
  const residentUser = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      password: residentPassword,
      firstName: 'John',
      lastName: 'Doe',
      apartmentNumber: 'A101',
      tower: 'A',
      role: 'RESIDENT',
      phoneNumber: '+1 (555) 123-4567',
    },
  });

  // Create sample announcement
  const announcement = await prisma.announcement.upsert({
    where: { id: 'clkj9876543210' },
    update: {},
    create: {
      id: 'clkj9876543210',
      title: 'Welcome to Vulcano Towers Community Portal',
      content: 'We are excited to launch our new community portal! Here you can connect with neighbors, stay updated on building news, submit maintenance requests, and much more. Please explore all the features available in the Resident Portal.',
      priority: 'HIGH',
    },
  });

  console.log({ adminUser, residentUser, announcement });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });