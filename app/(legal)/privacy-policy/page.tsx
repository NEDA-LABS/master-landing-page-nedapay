"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const effectiveDate = "October 20, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-[72ch] py-8 text-np-ink">
      {/* Header */}
      <section className="mb-10">
        <Badge className="np-label mb-6 rounded-full border border-np-ink bg-transparent px-3 py-1.5 text-np-ink hover:bg-transparent">
          Legal
        </Badge>
        <h1 className="np-h2">
          Data Protection Policy
        </h1>
        <p className="np-label mt-6 text-np-label">
          Effective as of {effectiveDate}
        </p>
        <Card className="mt-10 rounded-2xl border-0 bg-np-paper shadow-none">
          <CardHeader>
            <CardTitle className="text-xl font-medium tracking-tight text-np-ink">
              At-a-glance
            </CardTitle>
          </CardHeader>
          <CardContent className="np-body space-y-3 text-np-ink/80">
            <p>
              We process personal information lawfully, fairly, and securely in
              line with Tanzania&apos;s Personal Data Protection Act, 2022, and
              applicable international requirements.
            </p>
            <p>
              You have rights to access, correct, delete, restrict, object to
              processing, and request data portability. Contact{" "}
              <Link
                href="mailto:support@nedapay.xyz"
                className="font-semibold text-np-blue underline underline-offset-4"
              >
                support@nedapay.xyz
              </Link>{" "}
              to exercise these rights.
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-12 bg-np-ink/15" />

      {/* Purpose */}
      <section id="purpose" className="space-y-3">
        <h2 className="text-[clamp(24px,2.4vw,34px)] font-medium leading-tight tracking-tight text-np-ink">
          1. Purpose
        </h2>
        <p>
          This Data Protection Policy (&quot;Policy&quot;) sets out{" "}
          <span className="font-semibold">NEDA LABS LTD</span>&apos;s (&quot;
          <strong>Company</strong>&quot;, &quot;<strong>NEDApay</strong>&quot;,
          &quot;<strong>we</strong>&quot;, &quot;<strong>us</strong>&quot;, or
          &quot;<strong>our</strong>&quot;) commitment to protecting the privacy,
          confidentiality, integrity, and security of personal data collected,
          processed, stored, transmitted, or otherwise handled during its
          business operations.
        </p>
        <p>
          The Company recognizes the importance of personal data protection and
          is committed to ensuring that personal data is processed lawfully,
          fairly, transparently, and securely.
        </p>
        <p>
          This Policy is implemented in accordance with the{" "}
          <span className="font-medium">
            Personal Data Protection Act, 2022 of the United Republic of Tanzania
          </span>
          , its associated Regulations, and other applicable legal, regulatory,
          and contractual requirements relating to privacy and data protection.
          Where the Company processes personal data originating from other
          jurisdictions, it shall take reasonable measures to comply with
          applicable international data protection requirements to the extent
          required by law.
        </p>
      </section>

      <Separator className="my-12 bg-np-ink/15" />

      {/* Scope */}
      <section id="scope" className="space-y-3">
        <h2 className="text-[clamp(24px,2.4vw,34px)] font-medium leading-tight tracking-tight text-np-ink">
          2. Scope
        </h2>
        <p>
          This Policy applies to all personal information that we collect, use,
          disclose, and otherwise process in connection with our business
          operations. This includes personal information that we collect from
          you directly, as well as personal information that we collect from
          third parties.
        </p>
        <p className="np-body text-np-ink/80">
          <span className="font-medium">Controller:</span> NEDA Labs Ltd., 9th
          Floor, Tan House, Victoria, Dar es Salaam.
          <br />
          <span className="font-medium">Contact:</span>{" "}
          <Link
            href="mailto:support@nedapay.xyz"
            className="font-semibold text-np-blue underline underline-offset-4"
          >
            support@nedapay.xyz
          </Link>
          .
        </p>
      </section>

      <Separator className="my-12 bg-np-ink/15" />

      {/* Definitions */}
      <section id="definitions" className="space-y-3">
        <h2 className="text-[clamp(24px,2.4vw,34px)] font-medium leading-tight tracking-tight text-np-ink">
          3. Definitions
        </h2>
        <ul className="np-body ml-6 list-disc space-y-2 text-np-ink/80 marker:text-np-blue">
          <li>
            <span className="font-medium">Personal information:</span> Any
            information that can be used to identify an individual, either
            directly or indirectly.
          </li>
          <li>
            <span className="font-medium">Processing:</span> Any operation or set
            of operations performed on personal information, whether or not by
            automated means, such as collection, use, disclosure, and storage.
          </li>
          <li>
            <span className="font-medium">Data controller:</span> The entity that
            determines the purposes and means of processing personal
            information.
          </li>
          <li>
            <span className="font-medium">Data processor:</span> A natural or
            legal person, public authority, agency or other body which processes
            personal information on behalf of the controller.
          </li>
          <li>
            <span className="font-medium">Data subject:</span> The individual to
            whom the personal information relates.
          </li>
        </ul>
      </section>

      <Separator className="my-12 bg-np-ink/15" />

      {/* Data Protection Principles */}
      <section id="principles" className="space-y-3">
        <h2 className="text-[clamp(24px,2.4vw,34px)] font-medium leading-tight tracking-tight text-np-ink">
          4. Data Protection Principles
        </h2>
        <p>
          We will process your personal information in accordance with the
          following data protection principles:
        </p>
        <ul className="np-body ml-6 list-disc space-y-2 text-np-ink/80 marker:text-np-blue">
          <li>
            <span className="font-medium">
              Lawfulness, fairness, and transparency:
            </span>{" "}
            We will only process your personal information in a lawful, fair, and
            transparent manner.
          </li>
          <li>
            <span className="font-medium">Purpose limitation:</span> We will only
            process your personal information for specified, explicit, and
            legitimate purposes.
          </li>
          <li>
            <span className="font-medium">Data minimization:</span> We will only
            collect and process the personal information that is necessary for
            the purposes for which it is processed.
          </li>
          <li>
            <span className="font-medium">Accuracy:</span> We will take
            reasonable steps to ensure that your personal information is accurate
            and up to date.
          </li>
          <li>
            <span className="font-medium">Storage limitation:</span> We will only
            store your personal information for as long as is necessary for the
            purposes for which it is processed.
          </li>
          <li>
            <span className="font-medium">Integrity and confidentiality:</span> We
            will take appropriate technical and organizational measures to
            protect your personal information from unauthorized access, use,
            disclosure, or destruction.
          </li>
        </ul>
      </section>

      <Separator className="my-12 bg-np-ink/15" />

      {/* Data Collection */}
      <section id="data-collection" className="space-y-3">
        <h2 className="text-[clamp(24px,2.4vw,34px)] font-medium leading-tight tracking-tight text-np-ink">
          5. Data Collection
        </h2>
        <p>We collect personal information from you in a variety of ways, including:</p>
        <ul className="np-body ml-6 list-disc space-y-2 text-np-ink/80 marker:text-np-blue">
          <li>
            When you provide it to us directly, such as when you create an
            account, contact us with a question, or submit a form.
          </li>
          <li>When you use our website or mobile app.</li>
          <li>When you interact with us on social media.</li>
          <li>
            When we receive it from third parties, such as our business partners
            or service providers.
          </li>
        </ul>
        <p className="mt-4">
          The types of personal information that we collect may include:
        </p>
        <ul className="np-body ml-6 list-disc space-y-2 text-np-ink/80 marker:text-np-blue">
          <li>Your name, email address, and phone number.</li>
          <li>Your billing and shipping address.</li>
          <li>Your credit card or other payment information.</li>
          <li>Your job title and company name.</li>
          <li>Your social media profile information.</li>
          <li>
            Your IP address and other technical information about your device.
          </li>
          <li>
            Usage information from analytics, such as the screens you view, the
            features you use, your device and browser type, and your approximate
            location (see the Analytics section).
          </li>
        </ul>
      </section>

      <Separator className="my-12 bg-np-ink/15" />

      {/* Data Use */}
      <section id="data-use" className="space-y-3">
        <h2 className="text-[clamp(24px,2.4vw,34px)] font-medium leading-tight tracking-tight text-np-ink">
          6. Data Use
        </h2>
        <p>We use your personal information for a variety of purposes, including:</p>
        <ul className="np-body ml-6 list-disc space-y-2 text-np-ink/80 marker:text-np-blue">
          <li>To provide you with our products and services.</li>
          <li>
            To communicate with you about your account and our products and
            services.
          </li>
          <li>To process your payments.</li>
          <li>To personalize your experience on our website and mobile app.</li>
          <li>To improve our products and services.</li>
          <li>
            To understand how our website and mobile app are used, and to find
            and fix problems.
          </li>
          <li>To conduct market research.</li>
          <li>To comply with applicable laws and regulations.</li>
        </ul>
      </section>

      <Separator className="my-12 bg-np-ink/15" />

      {/* Data Sharing */}
      <section id="data-sharing" className="space-y-3">
        <h2 className="text-[clamp(24px,2.4vw,34px)] font-medium leading-tight tracking-tight text-np-ink">
          7. Data Sharing
        </h2>
        <p>
          We may share your personal information with the following third
          parties:
        </p>
        <ul className="np-body ml-6 list-disc space-y-2 text-np-ink/80 marker:text-np-blue">
          <li>
            Our service providers, such as payment processors, shipping
            companies, data storage providers, and analytics providers (Google
            Analytics and Firebase Analytics, see the Analytics section).
          </li>
          <li>
            Our business partners, including marketing partners and co-branding
            partners.
          </li>
          <li>Our affiliates.</li>
          <li>
            Law enforcement or other government agencies, if required by law.
          </li>
        </ul>
        <p className="text-sm text-np-label">
          We require our service providers and business partners to protect your
          personal information in accordance with this Policy and applicable law.
        </p>
      </section>

      <Separator className="my-12 bg-np-ink/15" />

      {/* Analytics */}
      <section id="analytics" className="space-y-3">
        <h2 className="text-[clamp(24px,2.4vw,34px)] font-medium leading-tight tracking-tight text-np-ink">
          8. Analytics
        </h2>
        <p>
          We use Google Analytics on our website and web app, and Firebase
          Analytics (also provided by Google) in our mobile app, to understand
          which features are used and to find and fix problems. Google acts as
          our service provider for this.
        </p>
        <h3 className="pt-2 text-lg font-medium tracking-tight text-np-ink">
          Website and web app
        </h3>
        <ul className="np-body ml-6 list-disc space-y-2 text-np-ink/80 marker:text-np-blue">
          <li>
            Google Analytics runs only if you accept analytics cookies in our
            cookie banner. Nothing is loaded from Google before you choose, and
            if you decline it does not run.
          </li>
          <li>
            It sets cookies named _ga and _ga_ followed by an identifier, to
            tell visits apart.
          </li>
          <li>
            You can withdraw your consent at any time under Settings, then
            Cookie preferences. Withdrawing stops the collection and removes the
            Google cookies.
          </li>
        </ul>
        <h3 className="pt-2 text-lg font-medium tracking-tight text-np-ink">
          Mobile app
        </h3>
        <ul className="np-body ml-6 list-disc space-y-2 text-np-ink/80 marker:text-np-blue">
          <li>
            Firebase Analytics is built into the app and is on for everyone who
            uses it. There is no switch for it in the app. If you object to
            this, contact us at{" "}
            <Link
              href="mailto:support@nedapay.xyz"
              className="font-semibold text-np-blue underline underline-offset-4"
            >
              support@nedapay.xyz
            </Link>
            .
          </li>
        </ul>
        <h3 className="pt-2 text-lg font-medium tracking-tight text-np-ink">
          What we collect
        </h3>
        <ul className="np-body ml-6 list-disc space-y-2 text-np-ink/80 marker:text-np-blue">
          <li>
            The screens you view and the features you use, such as starting a
            deposit, a transfer, a swap or an identity check, and whether a step
            failed (as an error code only).
          </li>
          <li>
            Technical information: your device and browser type, operating
            system, app version, language, and approximate location (country or
            city) that Google works out from your connection.
          </li>
          <li>
            A random internal account identifier, not your name, email address,
            phone number or wallet address, so that activity from the same
            account can be counted together.
          </li>
          <li>
            For payments, only a broad size band (for example under 10 US
            dollars, 10 to 100 US dollars, or over 100 US dollars), never the
            exact amount.
          </li>
        </ul>
        <h3 className="pt-2 text-lg font-medium tracking-tight text-np-ink">
          What we do not send to analytics
        </h3>
        <p>
          We do not send your name, email address, phone number, identity
          document or ID numbers, wallet address, transaction details or exact
          amounts to analytics. We do not use analytics data for advertising,
          and advertising features and personalisation are switched off.
        </p>
        <h3 className="pt-2 text-lg font-medium tracking-tight text-np-ink">
          How long it is kept
        </h3>
        <p>
          Google keeps analytics data for up to 14 months and then deletes it
          automatically. Google may process it in the United States and other
          countries (see Data transfers below).
        </p>
      </section>

      <Separator className="my-12 bg-np-ink/15" />

      {/* Data Security */}
      <section id="data-security" className="space-y-3">
        <h2 className="text-[clamp(24px,2.4vw,34px)] font-medium leading-tight tracking-tight text-np-ink">
          9. Data Security
        </h2>
        <p>
          We take reasonable steps to protect your personal information from
          unauthorized access, use, disclosure, or destruction. We use a variety
          of security measures, including:
        </p>
        <ul className="np-body ml-6 list-disc space-y-2 text-np-ink/80 marker:text-np-blue">
          <li>Encryption</li>
          <li>Access controls</li>
          <li>Physical security measures</li>
          <li>Regular security audits</li>
        </ul>
      </section>

      <Separator className="my-12 bg-np-ink/15" />

      {/* Data Retention */}
      <section id="data-retention" className="space-y-3">
        <h2 className="text-[clamp(24px,2.4vw,34px)] font-medium leading-tight tracking-tight text-np-ink">
          10. Data Retention
        </h2>
        <p>
          We will retain your personal information for as long as is necessary
          for the purposes for which it is processed. We will also retain your
          personal information as required by applicable law.
        </p>
      </section>

      <Separator className="my-12 bg-np-ink/15" />

      {/* Your Rights */}
      <section id="your-rights" className="space-y-3">
        <h2 className="text-[clamp(24px,2.4vw,34px)] font-medium leading-tight tracking-tight text-np-ink">
          11. Your Rights
        </h2>
        <p>
          You have the following rights with respect to your personal
          information:
        </p>
        <ul className="np-body ml-6 list-disc space-y-2 text-np-ink/80 marker:text-np-blue">
          <li>The right to access your personal information.</li>
          <li>The right to correct your personal information.</li>
          <li>The right to delete your personal information.</li>
          <li>
            The right to restrict the processing of your personal information.
          </li>
          <li>
            The right to object to the processing of your personal information.
          </li>
          <li>The right to data portability.</li>
        </ul>
        <p className="mt-4">
          You can exercise your rights by contacting us at{" "}
          <Link
            href="mailto:support@nedapay.xyz"
            className="font-semibold text-np-blue underline underline-offset-4"
          >
            support@nedapay.xyz
          </Link>
          .
        </p>
      </section>

      <Separator className="my-12 bg-np-ink/15" />

      {/* Children's Privacy */}
      <section id="children" className="space-y-3">
        <h2 className="text-[clamp(24px,2.4vw,34px)] font-medium leading-tight tracking-tight text-np-ink">
          12. Children&apos;s Privacy
        </h2>
        <p>
          We do not knowingly collect personal information from children under
          the age of 18. If you are a parent or guardian and you believe that
          your child has provided us with personal information, please contact us
          at{" "}
          <Link
            href="mailto:support@nedapay.xyz"
            className="font-semibold text-np-blue underline underline-offset-4"
          >
            support@nedapay.xyz
          </Link>
          .
        </p>
      </section>

      <Separator className="my-12 bg-np-ink/15" />

      {/* Changes */}
      <section id="changes" className="space-y-3">
        <h2 className="text-[clamp(24px,2.4vw,34px)] font-medium leading-tight tracking-tight text-np-ink">
          13. Changes to This Policy
        </h2>
        <p>
          We may update this Policy from time to time. We will notify you of any
          changes by posting the new Policy on our website.
        </p>
      </section>

      <Separator className="my-12 bg-np-ink/15" />

      {/* Contact */}
      <section id="contact" className="space-y-3">
        <h2 className="text-[clamp(24px,2.4vw,34px)] font-medium leading-tight tracking-tight text-np-ink">
          14. Contact Us
        </h2>
        <p>
          If you have any questions about this Policy, please contact us at{" "}
          <Link
            href="mailto:support@nedapay.xyz"
            className="font-semibold text-np-blue underline underline-offset-4"
          >
            support@nedapay.xyz
          </Link>
          .
        </p>
        <p className="np-body text-np-ink/80">
          NEDA Labs Ltd.
          <br />
          9th Floor, Tan House, Victoria, Dar es Salaam
        </p>
      </section>

      <Separator className="my-12 bg-np-ink/15" />

      {/* Additional information */}
      <section id="additional" className="space-y-3">
        <h2 className="text-[clamp(24px,2.4vw,34px)] font-medium leading-tight tracking-tight text-np-ink">
          Additional Information
        </h2>
        <Accordion
          type="multiple"
          className="rounded-2xl bg-np-paper p-6 text-sm leading-relaxed text-np-ink/70"
        >
          <AccordionItem value="cookies">
            <AccordionTrigger className="gap-4 text-left text-xl font-medium tracking-tight text-np-ink hover:no-underline">
              Cookies and other tracking technologies
            </AccordionTrigger>
            <AccordionContent className="np-body text-np-ink/80">
              We use cookies and similar technologies. Necessary cookies are
              required for basic site functionality and security. Analytics
              cookies are used only with your consent, as described in the
              Analytics section. You can change your choice at any time under
              Settings, then Cookie preferences in the web app, and you can also
              control cookies through your browser settings.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="third-party">
            <AccordionTrigger className="gap-4 text-left text-xl font-medium tracking-tight text-np-ink hover:no-underline">
              Third-party websites
            </AccordionTrigger>
            <AccordionContent className="np-body text-np-ink/80">
              Our website and mobile app may contain links to third-party
              websites. We are not responsible for the privacy practices of these
              third-party websites.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="transfers">
            <AccordionTrigger className="gap-4 text-left text-xl font-medium tracking-tight text-np-ink hover:no-underline">
              Data transfers
            </AccordionTrigger>
            <AccordionContent className="np-body text-np-ink/80">
              Your personal information may be transferred to countries outside
              of the United Republic of Tanzania. If we transfer your personal
              information to a country outside of Tanzania, we will take steps to
              ensure that your personal information is protected in accordance
              with applicable law. This includes analytics data processed by
              Google.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
