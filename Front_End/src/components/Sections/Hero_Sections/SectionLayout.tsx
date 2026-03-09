import type { ReactNode } from 'react';

type Props = {
  id: string;
  fullBleed?: boolean;
  children?: ReactNode;
};

const SectionLayout = ({ id, fullBleed = false, children }: Props) => (
  <section id={id} className="w-full scroll-mt-32 text-[#2C1810]">
    {fullBleed ? children : (
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">{children}</div>
    )}
  </section>
);

export default SectionLayout;