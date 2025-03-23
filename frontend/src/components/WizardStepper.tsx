import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

const FINAL_STEP_3 = 3;
const PAYMENT_STEP_2 = 2;
const CHECKOUT_INITIAL_1 = 1;

const WizardStepper = ({ currentStep }: WizardStepperProps) => {
  return (
    <div className="wizard-stepper">
      <div className="wizard-stepper__container">
        {[CHECKOUT_INITIAL_1, PAYMENT_STEP_2, FINAL_STEP_3].map(
          (step, index) => (
            <React.Fragment key={step}>
              <div className="wizard-stepper__step">
                <div
                  className={cn("wizard-stepper__circle", {
                    "wizard-stepper__circle--completed":
                      currentStep > step ||
                      (currentStep === FINAL_STEP_3 && step === FINAL_STEP_3),
                    "wizard-stepper__circle--current":
                      currentStep === step && step !== FINAL_STEP_3,
                    "wizard-stepper__circle--upcoming": currentStep < step,
                  })}
                >
                  {currentStep > step ||
                  (currentStep === FINAL_STEP_3 && step === FINAL_STEP_3) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
                <p
                  className={cn("wizard-stepper__text", {
                    "wizard-stepper__text--active": currentStep >= step,
                    "wizard-stepper__text--inactive": currentStep < step,
                  })}
                >
                  {step === CHECKOUT_INITIAL_1 && "Details"}
                  {step === PAYMENT_STEP_2 && "Payment"}
                  {step === FINAL_STEP_3 && "Completion"}
                </p>
              </div>
              {index < PAYMENT_STEP_2 && (
                // Drawing the horizontal lines
                <div
                  className={cn("wizard-stepper__line", {
                    "wizard-stepper__line--completed": currentStep > step,
                    "wizard-stepper__line--incomplete": currentStep <= step,
                  })}
                />
              )}
            </React.Fragment>
          )
        )}
      </div>
    </div>
  );
};

export default WizardStepper;
