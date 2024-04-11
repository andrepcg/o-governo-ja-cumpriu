
export default function Sobre() {
  return (
    <div>
      <h1 className='text-4xl font-bold mb-12'>Sobre</h1>

      <p className="mb-4">A fiscalização da ação governativa e o escrutínio público do Executivo são aspetos fundamentais de um regime democrático, por diversas razões. Entre estas, destaca-se a transparência e prestação de contas, a garantia de direitos, a melhoria de qualidade dos serviços públicos, o fortalecimento das instituições democráticas e o engajamento dos cidadãos. Em suma, a fiscalização dos Governos é um exercício que confere legitimidade, eficiência e responsabilidade na gestão pública.</p>
      <p className="mb-4">Em Portugal, o papel de fiscalização política do Governo cabe tradicionalmente à Assembleia da República, estando consagrado como uma das suas competências na Constituição (<a className="text-gray-400 hover:underline" href="https://www.parlamento.pt/Legislacao/Paginas/ConstituicaoRepublicaPortuguesa.aspx#art162">Artigo 162.º da CRP</a>). Uma das primeiras atividades enquadradas nesta competência é a apreciação do programa do Governo, exercício que tem lugar no início da legislatura e imediatamente após a nomeação do Executivo (<a className="text-gray-400 hover:underline" href="https://www.parlamento.pt/Legislacao/Paginas/ConstituicaoRepublicaPortuguesa.aspx#art192">Artigo 192.º da CRP</a>).</p>
      <p className="mb-4">De acordo com a Constituição “do programa do Governo constarão as principais orientações políticas e medidas a adotar ou a propor nos diversos domínios da atividade governamental” (<a className="text-gray-400 hover:underline" href="https://www.parlamento.pt/Legislacao/Paginas/ConstituicaoRepublicaPortuguesa.aspx#art192">Artigo 188.º da CRP</a>). No fundo, trata-se da “espinha dorsal” da ação governativa estando baseado, em princípio, no programa eleitoral. Deverá refletir, portanto, as promessas e compromissos assumidos durante a campanha eleitoral.</p>
      <p>Não obstante o trabalho fundamental e meritório da Assembleia da República, acreditamos que sociedade civil deve também desempenhar um papel no escrutínio da ação governativa. Por essa razão nasce “O Governo Já Cumpriu”, cujo objetivo é acompanhar de forma simples e sistemática o cumprimento do programa do Governo.</p>

      <p className="mt-6"><strong>Autores:</strong> <a className='hover:underline' href="https://x.com/andrepcg">@andrepcg</a></p>
    </div>
  )
}

export function generateMetadata() {
  return {
    title: "Sobre"
  }
}
