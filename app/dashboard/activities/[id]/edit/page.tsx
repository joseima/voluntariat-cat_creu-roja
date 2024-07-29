import Form from '@/app/ui/invoices/edit-form'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import { fetchActivityById, fetchVoluntiers } from '@/app/lib/data'
import { notFound } from 'next/navigation'

 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const [activity, voluntiers] = await Promise.all([
        fetchActivityById(id),
        fetchVoluntiers(),
    ])
    if (!activity) {
        notFound();
    }
    console.log(voluntiers)
    console.log(activity)
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/activities' },
          {
            label: 'Edit activity',
            href: `/dashboard/activities/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form activity={activity} voluntiers={voluntiers} />
    </main>
  );
}