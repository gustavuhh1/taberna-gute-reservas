import Header from "@/components/common/header";
import SignUpForm from "./components/sign-up-form";
import SignInForm from "./components/sign-in-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Authentication() {
  return (
    <>
      <Header />
      <div className="flex w-full flex-col gap-6 p-5 md:max-w-md md:mx-auto">
        <Tabs defaultValue="sign-in" className="">
          <TabsList>
            <TabsTrigger value="sign-in">Entrar</TabsTrigger>
            <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in" className="w-full">
            <SignInForm />
          </TabsContent>
          <TabsContent value="sign-up" className="w-full">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
