interface EmailTemplateProps {
  name: string
  url: string

}

const EmailTemplate = ({name, url}: EmailTemplateProps ) => {
  return (
    <>
      <h2>Olá, ${name || "usuário"}!</h2>
      <p>Recebemos um pedido para redefinir sua senha.</p>
      <p>
        <a href={url}>Clique aqui</a> para criar uma nova senha.
      </p>
      <p>Se você não fez esse pedido, ignore este e-mail.</p>
    </>
  );
}

export default EmailTemplate;