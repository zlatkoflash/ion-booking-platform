import Title from "../typography/Title";
import icon_step_base from '@/assets/images/icon-step-base.svg';
import icon_step_base_disabled from '@/assets/images/icon-step-base-disabled.svg';
import icon_step_checked from '@/assets/images/icon-step-checked.svg';
import { ProgressBar } from "react-bootstrap";
import { useTranslations } from "next-intl";

export default function PaymentFlowProgress(
  {
    completedSteps = [],
    activeStep = "booking-information",
    hideOnMobile = false,
    hideOnDesktop = false,
    steps = []
  }
    :
    {
      completedSteps?: string[],
      activeStep?: "booking-information" | "booking-information-ticket-info" | "payment-details",
      hideOnMobile?: boolean,
      hideOnDesktop?: boolean,
      steps?: {
        title: string,
        subtitle: string,
        label: string
      }[]
    }
) {

  const tForms = useTranslations("Forms");

  const stepsFor = () => {
    if (steps && steps.length > 0) {
      return steps;
    }
    return [
      { title: tForms("contact_details"), subtitle: tForms('provide_your_personal_and_booking_information'), label: "booking-information" },
      { title: tForms("payment_details"), subtitle: tForms("securely_complete_your_booking"), label: "payment-details" },
    ]
  }

  return <>
    {
      // activeStep
    }
    {
      // JSON.stringify(completedSteps)
    }
    <div className={`payment-flow-progress ${hideOnMobile ? 'hide-in-mobile' : ''} ${hideOnDesktop ? 'hide-in-desktop' : ''}`}>
      <div className="wrap-items-mobile">
        {
          stepsFor().map((step, index) => {
            let percent = 0;
            if (activeStep === step.label) {
              percent = 50;
            } else if (completedSteps.includes(step.label)) {
              percent = 100;
            }
            return <div className="item-step" key={`item-${index}`}>
              <ProgressBar now={percent} />
              <Title headingType="span" headingStyle="Text-sm-Medium" color="--color-text-fg">
                {step.title}
              </Title>
            </div>
          })
        }
      </div>
      <div className="wrap-items">
        {
          stepsFor().map((step, index) => {
            return <div className="item-step" key={`item-${index}`}>

              {
                (() => {
                  if (activeStep === step.label) return <img src={icon_step_base.src} alt="Active Step" className="icon-status-step" />;
                  if (completedSteps.includes(step.label)) return <img src={icon_step_checked.src} alt="Active Step" className="icon-status-step" />;
                  return <img src={icon_step_base_disabled.src} alt="Active Step" className="icon-status-step" />;
                })()
              }

              <Title headingType="p" headingStyle="Text-sm-Medium" color="--color-text-fg">{step.title}</Title>
              <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg-subtle">{step.subtitle}</Title>
            </div>
          })
        }
      </div>
    </div>
  </>
}