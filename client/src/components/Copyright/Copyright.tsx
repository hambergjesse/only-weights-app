export const Copyright = (): JSX.Element => {
  // get current year
  const currYear = new Date().getFullYear();
  return (
    <section className="copyright__section">
      <a href="mailto:contact@hambergjesse.com">contact@hambergjesse.com</a>
      <p>© {currYear} Jesse Hamberg. All rights reserved.</p>
    </section>
  );
};
