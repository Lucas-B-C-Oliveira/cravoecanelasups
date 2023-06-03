import { LinksList } from './LinksList'
import { Links } from './Links'

export async function Footer() {
  return (
    <div
      className={`
      md:px-6 
      lg:px-8 lg:flex lg:flex-row lg:gap-8 lg:justify-center
      xl:px-28 xl:flex xl:flex-row xl:gap-8 xl:justify-center
      2xl:px-28 2xl:flex 2xl:flex-row 2xl:gap-8 2xl:justify-center

      bg-gray-yellow-cc-850
      w-full
      h-fit
      py-7
      px-4
      flex flex-col gap-8 justify-center 
      flex-grow 
    
    `}
    >
      {/* @ts-expect-error -> Async Server Component */}
      <LinksList
        title="Políticas"
        childrens={[
          <Links key="Termos e Condições" text="Termos e Condições" href="" />,
          <Links key="Privacidade" text="Privacidade" href="" />,
          <Links key="Logística" text="Logística" href="" />,
          <Links key="Cookies" text="Cookies" href="" />,
        ]}
      />

      {/* @ts-expect-error -> Async Server Component */}
      <LinksList
        title="Menu"
        childrens={[
          <Links key="Produtos" text="Produtos" href="../products/mais-vendidos" />,
          // <Links key="Blog" text="Blog" href="" />,
          // <Links key="Entrar" text="Entrar" href="" />,
          <Links key="WHEY PROTEIN" text="WHEY PROTEIN" href="" />,
          <Links key="CREATINA" text="CREATINA" href="" />,
          <Links key="PRÉ-TREINO" text="PRÉ-TREINO" href="" />,
        ]}
      />

      {/* @ts-expect-error -> Async Server Component */}
      <LinksList
        title="Redes Sociais"
        childrens={[
          <Links key="@cravoecanela" text="@cravoecanela" href="" />,
          <Links key="@cravoecanela" text="@cravoecanela" href="" />,
        ]}
      />
      <div id='contact'>
        {/* @ts-expect-error -> Async Server Component */}
        <LinksList
          title="Contato"
          childrens={[
            <Links
              key="contato@cravoecanela.com"
              text="contato@cravoecanela.com"
              href=""
            />,
            <Links key="(67) 9 9128-3214Whats" text="(67) 9 9128-3214" href="" />,
            <Links key="(67) 9 9128-3214Tel" text="(67) 9 9128-3214" href="" />,
          ]}
        />
      </div>
      <div id="physicalStores">
        {/* @ts-expect-error -> Async Server Component */}
        <LinksList
          title="Localização"
          childrens={[
            <Links
              key="Unidade I: R. Rui Barbosa, 2030."
              text="Unidade I: R. Rui Barbosa, 2030."
              href=""
            />,
            <Links
              key="Unidade II: R. Joaquim Murtinho, 2148."
              text="Unidade II: R. Joaquim Murtinho, 2148."
              href=""
            />,
            <Links
              key="Unidade III: R. Bahia, 964t"
              text="Unidade III: R. Bahia, 964t"
              href=""
            />,
            <Links
              key="Unidade V: Shopping Norte Sul Plaza."
              text="Unidade V: Shopping Norte Sul Plaza."
              href=""
            />,
          ]}
        />
      </div>
    </div>
  )
}
