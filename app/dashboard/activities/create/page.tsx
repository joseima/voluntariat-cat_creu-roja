import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import {  fetchVoluntiers } from '@/app/lib/data';
 
export default async function Page() {
  const voluntiers = await fetchVoluntiers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Activities', href: '/dashboard/activities' },
          {
            label: 'Create Activity',
            href: '/dashboard/activities/create',
            active: true,
          },
        ]}
      />
      <Form voluntiers={voluntiers} />
    </main>
  );
}