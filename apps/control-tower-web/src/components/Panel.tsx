import type { PropsWithChildren } from "react";

interface PanelProps extends PropsWithChildren {
  title: string;
  eyebrow?: string;
}

export function Panel({ title, eyebrow, children }: PanelProps) {
  return (
    <section className="panel">
      <div className="panel-head">
        {eyebrow ? <p>{eyebrow}</p> : null}
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}
