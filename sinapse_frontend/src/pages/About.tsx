import type { Component } from "solid-js";

const About: Component = () => {
  return (
    <div
      class="h-full w-full items-center justify-center overflow-auto"
      style={{
        background:
          "linear-gradient(90deg, #F8F8FF calc(23px - 2px), transparent 1%) center / 23px 23px, linear-gradient(#F8F8FF calc(23px - 2px), transparent 1%) center / 23px 23px, #030001",
      }}
    >
      <div class="mx-[10%] my-12 flex flex-col gap-4 rounded-md bg-white px-[15%] py-12 text-justify">
        <h1 class="text-4xl font-bold">Sobre nós</h1>
        <div>
          <h2 class="text-2xl">Sobre a Sinapse:</h2>
          <p class="mt-4">
            Bem-vindo à Sinapse, a plataforma inteligente de memorização
            projetada para transformar seu aprendizado! Nosso objetivo é criar
            uma experiência única e eficiente para quem deseja melhorar sua
            retenção de informações, seja para estudos acadêmicos, aprendizado
            de idiomas ou desenvolvimento profissional.
          </p>
          <h2 class="mt-4 text-2xl">O que fazemos?</h2>
          <p class="mt-4">
            Na Sinapse, oferecemos uma plataforma poderosa e fácil de usar,
            baseada em flashcards dinâmicos, que facilita o aprendizado. Criamos
            uma API robusta que pode ser integrada a diversas plataformas,
            permitindo quevocê crie, organize e estude flashcards de maneira
            otimizada, em qualquer dispositivo.
          </p>
          <h2 class="mt-4 text-2xl">Por que escolher o Sinapse?</h2>
          <ul class="mt-4">
            <li>
              <b>Tecnologia de ponta</b> - Nossa aplicação utiliza tecnologias
              como Rust, MongoDB e SolidJS para oferecer serviços incrivelmente
              rápidos.
            </li>
            <li>
              <b> Flexibilidade </b> - A plataforma oferece uma integração
              simples com qualquer sistema, possibilitando uma experiência
              personalizada de estudo.
            </li>
            <li>
              <b> Acessível e escalável </b> - Seja para uso individual ou em
              larga escala, nossa aplicação é acessível e pode ser facilmente
              adaptada às suas necessidades.
            </li>
            <li>
              <b> Facilidade de uso </b> - Criar e gerenciar flashcards nunca
              foi tão fácil. Em poucos cliques, você pode começar a estudar.
            </li>
            <li>
              <b> Facilidade de uso </b> - Criar e gerenciar flashcards nunca
              foi tão fácil. Em poucos cliques, você pode começar a estudar.
            </li>
          </ul>
          <h2 class="mt-4 text-2xl">Quem pode usar o Sinapse?</h2>
          <ul class="mt-4">
            <li>
              <b>Estudantes:</b> Aprenda e revise para exames de forma mais
              eficaz com flashcards adaptados ao seu ritmo.
            </li>
            <li>
              <b>Profissionais:</b> Memorização de novos conceitos e
              habilidades, seja para aprendizado contínuo ou certificações.
            </li>
            <li>
              <b>Desenvolvedores:</b> Crie suas próprias plataformas de estudo e
              integração com nossaAPI minimalista e de alto desempenho.
            </li>
            <li>
              <b>Educadores:</b> Ofereça uma ferramenta poderosa para seus
              alunos, ajudando-os a melhorar sua memorização e desempenho.
            </li>
          </ul>
          <p class="mt-6">
            Na Sinapse, acreditamos que o aprendizado é uma jornada contínua,e
            nossa plataforma está aqui para ajudá-lo a tornar essa jornada mais
            eficaz e agradável. Combinando a simplicidade da criação de
            flashcards com a potência da repetição espaçada, buscamos
            proporcionar a melhor experiência de memorização possível.
          </p>
          <p>
            Comece a estudar de forma inteligente com a Sinapse. Sua memória,
            nossa missão!
          </p>
          <p class="mt-4 text-xl font-bold">Equipe Sinapse</p>
        </div>
      </div>
    </div>
  );
};

export default About;
