import SectionLayout from "./SectionLayout";

const DoctorsSection = ({ isDark }: { isDark: boolean }) => {
  return (
    <SectionLayout id="doctors" title="Doctors" isDark={isDark}>
      <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Doctors section component (replace this with your real content/cards).
      </p>
    </SectionLayout>
  );
};

export default DoctorsSection;
