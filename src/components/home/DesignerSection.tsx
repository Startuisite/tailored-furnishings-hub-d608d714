
import DesignerHero from './designer/DesignerHero';
import DesignerBenefits from './designer/DesignerBenefits';
import DesignerFaq from './designer/DesignerFaq';
import DesignerContactForm from './designer/DesignerContactForm';

const DesignerSection = () => {
  return (
    <div id="designers" className="designers-section bg-[rgb(252,247,241)]/30 py-16">
      <div className="container-custom">
        <DesignerHero />
        <DesignerBenefits />
        <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <DesignerFaq />
          <DesignerContactForm />
        </section>
      </div>
    </div>
  );
};

export default DesignerSection;
