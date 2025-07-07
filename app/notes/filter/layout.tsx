import css from "./layout.module.css";

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.section}>
      <aside className={css.aside}>{sidebar}</aside>
      <div>{children}</div>
    </section>
  );
};

export default NotesLayout;
