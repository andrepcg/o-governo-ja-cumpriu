
export default function Sobre() {
  return (
    <div>
      <h1 className='text-4xl font-bold mb-12'>Sobre</h1>

      <p>O Governo Já Cumpriu nasce da necessidade de manter a democracia, de um sentimento de insatisfação e contestação pelo estado da política em Portugal.</p>
      <p>O principal objectivo é permitir seguir as inúmeras promessas governamentais de uma forma simples e, em caso de serem cumpridas, serem referenciadas com a devida documentação: links para notícias, leis, etc.</p>

      <p className="mt-6"><strong>Autores:</strong> <a className='hover:underline' href="https://x.com/andrepcg">@andrepcg</a></p>
    </div>
  )
}

export function generateMetadata() {
  return {
    title: "Sobre"
  }
}
