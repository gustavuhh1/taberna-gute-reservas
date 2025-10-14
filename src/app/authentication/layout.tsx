import Header from "@/components/common/header";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Header/>
    {children}
    </>
  ) ;
}
