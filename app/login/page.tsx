import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import Image from 'next/image';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-center rounded-lg bg-red-700 p-2 md:h-36">
          <div className="w-32 text-white md:w-36">
          <Image 
            src='/LogoCreuRoja.jpg'
            alt='dashboard screen shot'
            width={200}
            height={78}
            className='block'
          />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}