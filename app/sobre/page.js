
export default function Sobre() {
  return (
    <div>
      <h1 className='text-4xl font-bold mb-12'>Sobre</h1>

      <p><strong>Autores:</strong> <a className='hover:underline' href="https://x.com/andrepcg">@andrepcg</a></p>
    </div>
  )
}

export function generateMetadata() {
  return {
    title: "Sobre"
  }
}
