import Link from "next/link"
import { AudioTypes, ImageTypes, VideoTypes } from '@/config/system'
import Image from 'next/image'
import { buttonVariants } from "@/components/ui/button"
import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge';

export default function IndexPage() {
  return (
    <div className="container grid items-center gap-6 pb-8 [&>section]:mt-16 md:[&>section]:mt-32 [&~section:first-of-type]:mt-8">
      <section className="grid auto-rows-[400px,h-fit] grid-cols-1 gap-6 sm:auto-rows-[500px,h-fit] sm:grid-cols-2 md:gap-12">
        <div className="h-fit">
          <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tighter sm:text-4xl lg:text-6xl">
            Converta seus vídeos, áudios e imagens de forma simples e rápida.
          </h1>
          <ul className="grid grid-cols-1 gap-2 text-sm text-muted-foreground lg:text-lg [&>li]:grid [&>li]:grid-cols-[18px,auto] [&>li]:gap-2">
            <WorthySection />
          </ul>
        </div>
        <div className="hidden flex-col justify-center gap-6 sm:flex">
          <CompatibilitySection />
        </div>
        <div className="col-span-2 flex h-fit flex-col items-center gap-2 sm:gap-4 md:flex-row">
          <Link
            href={'/convert'}
            rel="noreferrer"
            className={buttonVariants({ className: 'md:text-xs lg:text-lg' })}
          >
            Começar converter agora
          </Link>
        </div>
      </section>
      <section className="text-center">
        <h2 id="works" className="mb-10 pt-14 text-3xl font-bold sm:text-5xl">Como Funciona?</h2>
        <ol className="[&>li>p:first-of-type]:bg-red grid grid-cols-1 gap-10 sm:grid-cols-3 [&>li>p:first-of-type]:text-3xl [&>li>p]:font-bold [&>li]:flex [&>li]:flex-col [&>li]:gap-4">
          <HowWorksSection />
        </ol>
      </section>
      <section className="mb-10">
        <h2 id="faq" className="mb-12 pt-14 text-center text-3xl font-bold sm:text-5xl">Perguntas frequentes</h2>
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-3 [&>li>h2]:mb-1 [&>li>h2]:text-xl [&>li>h2]:font-semibold">
          <FAQSection />
        </ol>
      </section>
    </div>
  )
}

const WorthySection = () => {
  return (
    <>
      <WorthyListItem icon={<Icons.money className="w-full" />} text="Economize tempo e esforço" />
      <WorthyListItem icon={<Icons.fileStack className="w-full" />} text="Compatível com vários formatos" />
      <WorthyListItem icon={<Icons.baby className="w-full" />} text="Acesso fácil" />
      <WorthyListItem icon={<Icons.code className="w-full" />} text="Open Source" />
    </>
  );
};

const CompatibilitySection = () => {
  return (
    <>
      <CompatibilityType title="Vídeo" types={VideoTypes as unknown as string[]} variant="red" />
      <CompatibilityType title="Áudio" types={AudioTypes as unknown as string[]} variant="blue" />
      <CompatibilityType title="Imagem" types={ImageTypes as unknown as string[]} variant="green" />
    </>
  );
};

const HowWorksSection = () => {
  return (
    <>
      <HowWorksItem number={1} text="Envie seu arquivo" imageSrc="/send.png" />
      <HowWorksItem number={2} text="Aguarde a conversão" imageSrc="/time.png" />
      <HowWorksItem number={3} text="Baixe seu arquivo" imageSrc="/download.png" />
    </>
  );
};

const FAQSection = () => (
  <>
    <FAQItem
      title="O que é Convert?"
      content="Conversor é um site que permite você converter arquivos de vídeo, áudio ou imagem direto pelo browser sem custo."
    />
    <FAQItemList
      title="Quais tipos de arquivos eu posso converter?"
      types={[
        { title: 'Vídeo', list: VideoTypes as unknown as string[] },
        { title: 'Áudio', list: AudioTypes as unknown as string[] },
        { title: 'Imagem', list: ImageTypes as unknown as string[] }
      ]}
    />
    <FAQItem
      title="Quem pode usar o Convert?"
      content="Qualquer pessoa! Você pode converter qualquer arquivo compatível conosco."
    />
    <FAQItem
      title="Quais são os limites da plataforma?"
      content="Não garantimos 100% de qualidade para arquivos do tipo musical, com chiados ou sem uma fala clara e limpa."
    />
    <FAQItem
      title="Existe algum limite de tamanho para os arquivos de áudio ou vídeo?"
      content="O site aceita arquivos de até 2GB."
    />
    <FAQItem
      title="Quanto custa?"
      content="É gratuito, free, 0800, grátis."
    />
  </>
);

const WorthyListItem = ({ icon, text }: { icon: React.JSX.Element, text: string }) => (
  <li className="grid grid-cols-[18px,auto] gap-2">
    <div className="flex flex-col items-center justify-center">{icon}</div>
    <span className="flex">{text}</span>
  </li>
);

const CompatibilityType = ({ title, types, variant }: { title: string, types: Array<string>, variant: 'red' | 'blue' | 'green' }) => (
  <div className="flex flex-col gap-1">
    <h2 className="text-base font-extrabold lg:text-2xl">{title}</h2>
    <div className="flex flex-row flex-wrap gap-2">
      {types.map((item, index) => (
        <Badge key={index} className="w-fit lg:text-lg" variant={variant}>
          {item}
        </Badge>
      ))}
    </div>
  </div>
);

const HowWorksItem = ({ number, text, imageSrc }: { number: number, text: string, imageSrc: string }) => {
  return (
    <li>
      <p className="relative flex h-[60px] w-full items-center justify-center">
        <span className="absolute top-0 flex h-[60px] ">
          <Icons.circle className="" size={60} />
        </span>
        <span>{number}</span>
      </p>
      <p>{text}</p>
      <div className="flex flex-col items-center">
        <div className="relative aspect-square w-full lg:w-3/4">
          <Image src={imageSrc} fill={true} alt="" className="rounded-xl dark:border-2" />
        </div>
      </div>
    </li>
  );
};



const FAQItem = ({ title, content }: { title: string, content: string }) => (
  <li className="mb-8 sm:mb-0">
    <h2 className="mb-1 text-xl font-semibold">{title}</h2>
    <p>{content}</p>
  </li>
);

const FAQItemList = ({ title, types }: { title: string, types: { title: string, list: string[] }[] }) => (
  <li className="mb-8 sm:mb-0">
    <h2 className="mb-1 text-xl font-semibold">{title}</h2>
    {types.map((type, index) => (
      <p key={index}>
        <strong>{type.title}:</strong> {type.list.map((item, idx) => (
          <span key={idx}>
            {item}
            {idx !== type.list.length - 1 && ', '}
          </span>
        ))}
      </p>
    ))}
  </li>
);