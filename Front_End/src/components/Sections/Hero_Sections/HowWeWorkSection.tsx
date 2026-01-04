import SectionLayout from "./SectionLayout";

const HowWeWorkSection = ({ isDark }: { isDark: boolean }) => {
  return (
    <SectionLayout id="how-we-work" title="How we Work" isDark={isDark}>
      <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        How we work section component.
      </p>
    </SectionLayout>
  );
};

export default HowWeWorkSection;
