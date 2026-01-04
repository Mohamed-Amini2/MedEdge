import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  isDark: boolean;
  children?: ReactNode;
};

const SectionLayout = ({ id, title, isDark, children }: Props) => {
  return (
    <section
      id={id}
      className={`min-h-screen flex items-center justify-center py-20 ${
        isDark ? "text-white" : "text-gray-900"
      }`}
    >
      <div className="text-center max-w-2xl px-4">
        <h2 className="text-5xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </section>
  );
};

export default SectionLayout;
