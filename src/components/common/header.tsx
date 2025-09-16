import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Header = () => {
  return (
    <header className="flex justify-between p-5 bg-blue-950 text-white">
      <h1>Taberna do Gute</h1>

      <nav className="">
        <ul className="gap-5 flex items-center justify-center">
          <Link className="hidden" href={"#"}>
            Início
          </Link>
          <Link className="hidden" href={"#"}>
            Cardápio
          </Link>
          <Link className="hidden" href={"#"}>
            Sobre
          </Link>
          <Link className="hidden" href={"#"}>
            Galeria
          </Link>
          <Dialog>
            <DialogTrigger>Reserva Mesa</DialogTrigger>
            <DialogContent>
              <DialogHeader className="flex items-center ">
                <DialogTitle className="text-lg font-semibold">
                  Reserve sua Mesa
                </DialogTitle>
                <DialogDescription className="text-xs font-medium text-center">
                  Planeje sua visita à Taberna do Gute e tenha uma experiência
                  gastronômica inesquecível. Nosso chef está ansioso para recebê-lo.
                </DialogDescription>
                
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
