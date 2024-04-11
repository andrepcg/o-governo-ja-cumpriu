
export default function Sobre() {
  return (
    <div>
      <h1 className='text-4xl font-bold mb-12'>Política de Privacidade</h1>

      <p className="py-1">Nós adotamos esta Política de Privacidade, que determina como processamos as informações recolhidas pelo O Governo Já Cumpriu, que também fornece os motivos pelos quais devemos recolher certos dados pessoais sobre si. Portanto, deve ler esta Política de Privacidade antes de usar o site O Governo Já Cumpriu.</p>
      <p className="py-1">Cuidamos dos seus dados pessoais e comprometemo-nos a garantir a sua confidencialidade e segurança.</p>
      <h2 className="text-3xl font-bold pb-2 pt-5">Informações pessoais que recolhemos:</h2>
      <p className="py-1">Quando visita O Governo Já Cumpriu, recolhemos automaticamente certas informações sobre o seu dispositivo, incluindo informações sobre o seu browser, endereço IP, fuso horário, e alguns dos cookies instalados no seu dispositivo. Além disso, conforme navega no Site, recolhemos informações sobre as páginas da web ou produtos individuais que visualiza, quais sites ou termos de pesquisa o direcionaram ao site e como interage com o site. Referimo-nos a essas informações recolhidas automaticamente como “Informações do dispositivo”. Além disso, podemos recolher os dados pessoais que nos fornece (incluindo, mas não se limitando a Nome, Apelido, Morada, Informações de pagamento, etc.) durante o registo para poder cumprir o acordo.</p>
      <h2 className="text-3xl font-bold pb-2 pt-5">Porque processamos os seus dados?</h2>
      <p className="py-1">A nossa principal prioridade é a segurança dos dados do cliente e, como tal, podemos processar apenas dados mínimos do utilizador, apenas o que for absolutamente necessário para manter o site. As informações recolhidas automaticamente são usadas apenas para identificar casos potenciais de abuso e estabelecer informações estatísticas sobre o uso do site.</p>
      <p className="py-1">Pode visitar o site sem nos dizer quem é ou revelar qualquer informação, pela qual alguém possa identificá-lo como um indivíduo específico e identificável. Se, no entanto, deseja utilizar alguns dos recursos do site, ou deseja receber a nossa newsletter ou fornecer outros detalhes preenchendo um formulário, pode-nos fornecer dados pessoais, como o seu email, nome, apelido, cidade de residência, organização, número de telefone. Pode optar por não nos fornecer os seus dados pessoais, mas talvez não consiga tirar proveito de alguns dos recursos do site. Por exemplo, não poderá receber o nosso boletim informativo ou entrar em contato conosco diretamente do site. Os utilizadores que não têm certeza sobre quais informações são obrigatórias podem entrar em contato conosco através de geral@ogovernojacumpriu.pt.</p>
      <h2 className="text-3xl font-bold pb-2 pt-5">Os seus direitos:</h2>
      <p className="py-1">Se é um residente europeu, tem os seguintes direitos relacionados aos seus dados pessoais:</p>
      <ul className="list-decimal py-1 pl-6"><li className="py-1">O direito de ser informado.</li><li className="py-1">O direito de acesso.</li><li className="py-1">O direito à retificação.</li><li className="py-1">O direito de apagar.</li><li className="py-1">O direito de restringir o processamento.</li><li className="py-1">O direito à portabilidade de dados.</li><li className="py-1">O direito de se opor.</li><li className="py-1">Direitos em relação à tomada de decisão automatizada e definição de perfis.</li></ul>
      <p className="py-1">Se desejar exercer esse direito, entre em contato conosco por meio das informações de contato abaixo.</p>
      <p className="py-1">Além disso, se é um residente europeu, note que estamos processando suas informações para cumprir contratos que possamos ter consigo (por exemplo, se fizer um pedido através do Site), ou de outra forma para buscar os nossos interesses comerciais legítimos listados acima.</p>
      <h2 className="text-3xl font-bold pb-2 pt-5">Links para outros sites:</h2>
      <p className="py-1">O nosso site pode conter links para outros sites que não são de nossa propriedade ou controlados por nós. Esteja ciente de que não somos responsáveis por outros sites ou práticas de privacidade de terceiros. Incentivamos a estar atento ao sair do nosso site e ler as declarações de privacidade de cada site que possa recolher informações pessoais.</p>
      <h2 className="text-3xl font-bold pb-2 pt-5">Segurança da informação:</h2>
      <p className="py-1">Protegemos as informações que nos fornece nos servidores de computador num ambiente controlado e seguro, protegido contra acesso, uso ou divulgação não autorizados. Mantemos salvaguardas administrativas, técnicas e físicas razoáveis para proteger contra acesso não autorizado, uso, modificação e divulgação de dados pessoais no seu controlo e custódia. No entanto, nenhuma transmissão de dados pela Internet ou rede sem fio pode ser garantida.</p>
      <h2 className="text-3xl font-bold pb-2 pt-5">Divulgação legal:</h2>
      <p className="py-1">Divulgaremos todas as informações que recolhermos, usarmos ou recebermos se exigido ou permitido por lei, como para cumprir uma intimação ou processo legal semelhante, e quando acreditar de boa fé que a divulgação é necessária para proteger os nossos direitos, proteger a sua segurança ou a segurança de outras pessoas, investigar fraudes ou responder a uma solicitação governamental.</p>
      <h2 className="text-3xl font-bold pb-2 pt-5">Informações de contacto:</h2>
      <p className="py-1">Se desejar entrar em contacto conosco para entender mais sobre esta Política ou se quiser falar sobre qualquer assunto relacionado aos direitos individuais e as suas informações pessoais, pode enviar um email para geral@ogovernojacumpriu.pt.</p>
    </div>
  )
}

export function generateMetadata() {
  return {
    title: "Política de Privacidade"
  }
}
