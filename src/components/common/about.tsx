

const About = () => {
  return (
    <section className="flex flex-col gap-8 px-8 max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-titulo text-center text-gray-900 pt-12 mb-12 relative inline-block after:content-[''] after:block after:h-1 after:w-16 after:bg-blue-800 after:mx-auto after:mt-2">
        Sobre nós
      </h1>

      <div className="flex flex-col lg:flex-row gap-12 items-center ">
        <div className="flex-1 font-texto text-left text-gray-600">
          <p className="mb-4">
            A <span className="text-blue-600 font-bold ">Taberna do Gute</span> nasceu da
            paixão do Chef Artur Schmidt por unir suas raízes alemãs com os sabores
            vibrantes do Brasil. Localizado em Horizonte, Ceará, nosso restaurante oferece
            uma experiência gastronômica única que celebra essa fusão cultural.
          </p>
          <p className="mb-4">
            Nossa proposta é trazer para você o melhor da culinária alemã tradicional com
            toques da rica gastronomia brasileira, criando uma experiência única para o
            seu paladar.
          </p>
          <p>
            Em um ambiente aconchegante e elegante, convidamos você a desfrutar de pratos
            cuidadosamente elaborados, acompanhados de cervejas artesanais e uma seleção
            de vinhos que complementam perfeitamente nossa culinária.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 self-center">
          <div className="flex gap-3 flex-col items-center justify-center text-center aspect-square bg-green-50 rounded-xl p-4">
            <h3 className="font-semibold font-titulo">Gastronomia</h3>
            <p className="text-sm font-texto  text-gray-600">
              Fusão da culinária alemã com ingredientes brasileiros
            </p>
          </div>
          <div className="flex gap-3 flex-col items-center justify-center text-center aspect-square bg-indigo-50 rounded-xl p-4">
            <h3 className="font-semibold font-titulo">Bebidas</h3>
            <p className="text-sm font-texto  text-gray-600">
              Cervejas artesanais e vinhos selecionados
            </p>
          </div>
          <div className="flex gap-3 flex-col items-center justify-center text-center aspect-square bg-yellow-50 rounded-xl p-4">
            <h3 className="font-semibold font-titulo">Ambiente</h3>
            <p className="text-sm font-texto  text-gray-600">
              Aconchegante e elegante para todas as ocasiões
            </p>
          </div>
          <div className="flex gap-3 flex-col items-center justify-center text-center aspect-square bg-rose-50 rounded-xl p-4">
            <h3 className="font-semibold font-titulo">Experiência</h3>
            <p className="text-sm font-texto  text-gray-600">
              Atendimento personalizado e de alta qualidade
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;