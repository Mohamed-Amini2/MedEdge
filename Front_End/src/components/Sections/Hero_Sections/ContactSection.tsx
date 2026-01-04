import SectionLayout from "./SectionLayout";

const ContactSection = ({ isDark }: { isDark: boolean }) => {
  return (
    <SectionLayout id="contact" title="Contact" isDark={isDark}>
      <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Contact section component.
      </p>
    </SectionLayout>
  );
};

export default ContactSection;
