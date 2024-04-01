import Image from 'next/image'

import Countdown from '@/app/_components/countdown'

const DATE = new Date("2024-04-10T08:00:00Z")

export default function SalaDeEspera() {

  return (
    <div className='text-center mx-auto'>
      <div className='block relative h-32 mb-12'>
        <Image
          src="/logo.svg"
          fill
        />

      </div>
      <h1 className='mb-6 text-3xl font-bold'>Plataforma para seguimento das promessas eleitorais</h1>
      <h2 className='mb-2 text-lg'>Aguardando pacientemente pela formação do novo governo.</h2>
      <p className='mb-12 text-sm'>PS: A 10 de Abril será publicado, em Diário da República, o mapa oficial de resultados</p>

      <div className="w-80 mx-auto">
        <Countdown date={DATE} />
      </div>
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: "O Governo Já Cumpriu? - Sala de Espera",
  }
}
