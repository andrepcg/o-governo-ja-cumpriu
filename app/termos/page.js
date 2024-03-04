
export default function Sobre() {
  return (
    <div>
      <h1 className='text-4xl font-bold mb-12'>Termos e Condições</h1>

      <p className="py-1">Estes termos e condições descrevem as regras e regulamentos para o uso do site O Governo Já Cumpriu, localizado em https://ogovernojacumpriu.pt.</p>
      <p className="py-1">Ao aceder a este site, presumimos que aceita estes termos e condições. Não continue a usar O Governo Já Cumpriu? se não concordar com todos os termos e condições declarados nesta página.</p>

      <h2 className="text-3xl font-bold pb-2 pt-5">Licença:</h2>
      <p className="py-1"><a href="https://github.com/andrepcg/o-governo-ja-cumpriu/blob/main/LICENSE">GNU General Public License v3.0</a></p>


      <h2 className="text-3xl font-bold pb-2 pt-5">Cookies:</h2>
      <p className="py-1">O site usa cookies para ajudar a personalizar a sua experiência online. Ao aceder ao O Governo Já Cumpriu, concordou em usar os cookies necessários para o seu funcionamento.</p>

      <h2 className="text-3xl font-bold pb-2 pt-5">Responsabilidade pelo conteúdo:</h2>
      <p className="py-1">Não se garante a adequabilidade do serviço para nenhum fim específico, sendo sua responsabilidade exclusiva certificar-se de que os conteúdos disponibilizados pelo Elege preenchem as suas necessidades particulares, apresentam carácter autêntico e de que se observam todas as disposições legais aplicáveis à sua situação em concreto.</p>
      <p className="py-1">Nenhum link deve aparecer em qualquer site que possa ser interpretado como calunioso, obsceno ou criminoso, ou que infrinja, de outra forma viole ou defenda a violação ou outra violação de quaisquer direitos de terceiros.</p>
    </div>
  )
}

export function generateMetadata() {
  return {
    title: "Termos e Condições"
  }
}
