import Image from 'next/image'

import Countdown from '@/app/_components/countdown'

const DATE = new Date("2024-03-20T08:00:00Z")

export default function SalaDeEspera() {

  return (
    <div className='text-center mx-auto'>
      <div className='block relative h-32 mb-12'>
        <Image
          src="/logo.svg"
          fill
        />

      </div>
      <h2 className='mb-2 text-lg'>Aguardando pacientemente pelo dia das eleições legislativas de 2024.</h2>
      <p className='mb-12 text-sm'>PS: Resultados finais deverão ser conhecidos depois de 20 de março</p>

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
