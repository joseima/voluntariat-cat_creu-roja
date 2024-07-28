//  import bcrypt from 'bcrypt';
//  import { db } from '@vercel/postgres';
//  import { activities, voluntiers, realized, users } from '../lib/placeholder-data';

//  const client = await db.connect();

//  async function seedUsers() {
//    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//    await client.sql`
//      CREATE TABLE IF NOT EXISTS users (
//        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//        name VARCHAR(255) NOT NULL,
//        email TEXT NOT NULL UNIQUE,
//        password TEXT NOT NULL
//      );
//    `;

//    const insertedUsers = await Promise.all(
//      users.map(async (user) => {
//        const hashedPassword = await bcrypt.hash(user.password, 10);
//        return client.sql`
//          INSERT INTO users (id, name, email, password)
//          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//          ON CONFLICT (id) DO NOTHING;
//        `;
//      }),
//    );

//    return insertedUsers;
//  }

//  async function seedActivities() {
//    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//    await client.sql`
//      CREATE TABLE IF NOT EXISTS activities (
//        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//        voluntier_id UUID NOT NULL,
//        title VARCHAR(255) NOT NULL,
//        description VARCHAR(255) NOT NULL,
//        status VARCHAR(255) NOT NULL,
//        date DATE NOT NULL
//      );
//    `;

//    const insertedActivities = await Promise.all(
//     activities.map(
//        (activity) => client.sql`
//          INSERT INTO activities (voluntier_id, title, description, status, date)
//          VALUES (${activity.voluntier_id}, ${activity.title}, ${activity.description}, ${activity.status}, ${activity.date})
//          ON CONFLICT (id) DO NOTHING;
//        `,
//      ),
//    );

//    return insertedActivities;
//  }

//  async function seedVoluntiers() {
//    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//    await client.sql`
//      CREATE TABLE IF NOT EXISTS voluntiers (
//        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//        name VARCHAR(255) NOT NULL,
//        email VARCHAR(255) NOT NULL,
//        image_url VARCHAR(255) NOT NULL
//      );
//    `;

//    const insertedVoluntiers = await Promise.all(
//      voluntiers.map(
//        (voluntier) => client.sql`
//          INSERT INTO voluntiers (id, name, email, image_url)
//          VALUES (${voluntier.id}, ${voluntier.name}, ${voluntier.email}, ${voluntier.image_url})
//          ON CONFLICT (id) DO NOTHING;
//        `,
//      ),
//    );

//    return insertedVoluntiers;
//  }

//  async function seedRealized() {
//    await client.sql`
//      CREATE TABLE IF NOT EXISTS realized (
//        month VARCHAR(4) NOT NULL UNIQUE,
//        amount INT NOT NULL
//      );
//    `;

//    const insertedRealized = await Promise.all(
//      realized.map(
//        (rea) => client.sql`
//          INSERT INTO realized (month, amount)
//          VALUES (${rea.month}, ${rea.amount})
//          ON CONFLICT (month) DO NOTHING;
//        `,
//      ),
//    );

//    return insertedRealized;
//  }

// export async function GET() {
//  try {
//    await client.sql`BEGIN`;
//    await seedUsers();
//    await seedVoluntiers();
//    await seedActivities();
//    await seedRealized();
//    await client.sql`COMMIT`;

//    return Response.json({ message: 'Database seeded successfully' });
//  } catch (error) {
//    await client.sql`ROLLBACK`;
//    return Response.json({ error }, { status: 500 });
//  }
// }
