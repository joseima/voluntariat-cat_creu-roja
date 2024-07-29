import { sql } from '@vercel/postgres';
import {
  ActivitiesTable,
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  LatestInvoiceRaw,
  Realized,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  try {
    const data = await sql<Realized>`SELECT * FROM realized`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch realized data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT activities.title, voluntiers.name, voluntiers.id, voluntiers.image_url, voluntiers.email
      FROM activities
      JOIN voluntiers ON activities.voluntier_id = voluntiers.id
      ORDER BY activities.date DESC
      LIMIT 5`;
    const latestInvoices = data.rows;
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM activities`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM voluntiers`;
    const invoiceStatusPromise = sql`SELECT SUM(CASE WHEN status = 'pending' 
      THEN 1 ELSE 0 END) AS pending_count FROM activities`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfActivities = Number(data[0].rows[0].count ?? '0');
    const numberOfVoluntiers = Number(data[1].rows[0].count ?? '0');
    const totalPendingActivities = Number(data[2].rows[0].pending_count ?? '0');

    return {
      numberOfVoluntiers,
      numberOfActivities,
      totalPendingActivities,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 8;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const activities = await sql<ActivitiesTable>`
      SELECT
        activities.id,
        activities.title,
        activities.description,
        activities.date,
        activities.status,
        voluntiers.name,
        voluntiers.email,
        voluntiers.image_url
      FROM activities
      JOIN voluntiers ON activities.voluntier_id = voluntiers.id
      WHERE
        voluntiers.name ILIKE ${`%${query}%`} OR
        voluntiers.email ILIKE ${`%${query}%`} OR
        activities.title ILIKE ${`%${query}%`} OR
        activities.description ILIKE ${`%${query}%`} OR
        activities.status ILIKE ${`%${query}%`}
      ORDER BY activities.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return activities.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM activities
    JOIN voluntiers ON activities.voluntier_id = voluntiers.id
    WHERE
        voluntiers.name ILIKE ${`%${query}%`} OR
        voluntiers.email ILIKE ${`%${query}%`} OR
        activities.title ILIKE ${`%${query}%`} OR
        activities.description ILIKE ${`%${query}%`} OR
        activities.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchActivityById(id: string) {
  console.log(id)
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        activities.id,
        activities.voluntier_id,
        activities.title,
        activities.description,
        activities.status
      FROM activities
      WHERE activities.id = ${id};
    `;

    const activity = data.rows;

    return activity[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch activity.');
  }
}

export async function fetchVoluntiers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM voluntiers
      ORDER BY name ASC
    `;

    const voluntiers = data.rows;
    return voluntiers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  voluntiers.id,
		  voluntiers.name,
		  voluntiers.email,
		  voluntiers.image_url
		FROM voluntiers
		WHERE
		  voluntiers.name ILIKE ${`%${query}%`} OR
      voluntiers.email ILIKE ${`%${query}%`}
		GROUP BY voluntiers.id, voluntiers.name, voluntiers.email, voluntiers.image_url
		ORDER BY voluntiers.name ASC
	  `;

    const voluntiers = data.rows
    return voluntiers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch voluntiers table.');
  }
}
