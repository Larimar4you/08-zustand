import css from "./LayoutNotes.module.css";

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function Layout({ children, sidebar }: Props) {
  return (
    <section className={css.container}>
      {sidebar}
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
