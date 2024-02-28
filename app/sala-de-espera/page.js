import Image from 'next/image'

import Countdown from '@/app/_components/countdown'

const DATE = new Date("2024-03-10T22:00:00Z")

export default function SalaDeEspera() {

  return (
    <div className='text-center mx-auto'>
      <div className='block relative h-32 mb-12'>
        <Image
          src="/logo.svg"
          fill
        />

      </div>
      <h2 className='mb-12'>Aguardando pacientemente pelo dia das eleições legislativas de 2024.</h2>

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
