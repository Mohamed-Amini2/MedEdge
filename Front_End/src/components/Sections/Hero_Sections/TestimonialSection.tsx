import SectionLayout from "./SectionLayout";

const TestimonialSection = ({ isDark }: { isDark: boolean }) => {
  return (
    <SectionLayout id="testimonial" title="Testimonial" isDark={isDark}>
      <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Testimonial section component.
      </p>
    </SectionLayout>
  );
};

export default TestimonialSection;
