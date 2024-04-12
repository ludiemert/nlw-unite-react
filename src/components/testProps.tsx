interface MeubotaoProps {
  texto: string
}

function Meubotao(props: MeubotaoProps) {
  return <button className="bg-gray-600 h-10 px-3 rounded">{props.texto}</button>
}

export function App() {
  return (
    <div className="flex gap-4 mt-4 font-medium">
      <Meubotao texto="O que vc faz" />
      <Meubotao texto="O que vc eh" />
      <Meubotao texto="O que vc vamos" />
    </div>
  )
}