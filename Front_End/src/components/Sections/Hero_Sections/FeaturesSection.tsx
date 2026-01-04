import SectionLayout from "./SectionLayout";

const FeaturesSection = ({ isDark }: { isDark: boolean }) => {
  return (
    <SectionLayout id="features" title="Features" isDark={isDark}>
      <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Scroll down to see the navbar highlight change as you navigate through sections.
      </p>
    </SectionLayout>
  );
};

export default FeaturesSection;
