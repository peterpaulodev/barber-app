const Footer = () => {
  return (
    <footer className="bg-muted p-7">
      <p className="text-foreground text-xs font-semibold">
        &copy; {new Date().getFullYear()} Barber App.
      </p>
      <p className="text-muted-foreground text-xs">
        Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
