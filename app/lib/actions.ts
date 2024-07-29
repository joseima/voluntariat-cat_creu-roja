'use server'
import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { title } from 'process'

const FormSchema = z.object({
    id: z.string(),
    voluntierId: z.string({
        invalid_type_error: 'Please select a voluntier.',
      }),
    title: z.string({
      invalid_type_error: 'Please add a title.',
    }),
    description: z.string({
      invalid_type_error: 'Please add a description.',
    }),
    status: z.enum(['pending','taken'], {
        invalid_type_error: 'Please select an invoice status.',
      }),
    date: z.string()
})

const CreateInvoiceFormSchema = FormSchema.omit({
    id: true,
    date: true
})

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
      voluntierId?: string[];
      title?: string[];
      description?: string[];
      status?: string[];
    };
    message?: string | null;
  };

export async function createActivity(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoiceFormSchema.safeParse({
        voluntierId: formData.get('voluntierId'),
        title: formData.get('title'),
        description: formData.get('description'),
        status: formData.get('status'),
    })
    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Invoice.',
        };
      }
    const { voluntierId, title, description, status } = validatedFields.data;
    const [date] = new Date().toISOString().split('T')

    try {
        await sql`INSERT INTO activities (voluntier_id, title, description, status, date) 
            VALUES (${voluntierId}, ${title}, ${description}, ${status}, ${date} )`
    } catch (error) {
        return {
          message: 'Database Error: Failed to Create Invoice.',
        };
      }

    revalidatePath('/dashboard/activities')
    redirect('/dashboard/activities')
}

export async function updateActivity(id: string, formData: FormData) {
    const { voluntierId, title, description, status } = UpdateInvoice.parse({
      voluntierId: formData.get('voluntierId'),
      title: formData.get('title'),
      description: formData.get('description'),
      status: formData.get('status'),
    });
   
    try {
        await sql`
        UPDATE activities
        SET voluntier_id = ${voluntierId}, title = ${title}, description = ${description}, status = ${status}
        WHERE id = ${id}
        `
    } catch (error) {
        return { message: 'Database Error: Failed to Update activity.' };
    }
   
    revalidatePath('/dashboard/activities');
    redirect('/dashboard/activities');
  }

  export async function deleteActivity(id: string) {
    try {
        await sql`DELETE FROM activities WHERE id = ${id}`
    } catch (error) {
        return {message: 'Database Error: Failed to Delete Invoice.'}
    }
    revalidatePath('/dashboard/activities');
  }

  export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }