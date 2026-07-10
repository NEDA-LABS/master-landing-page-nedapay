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

const effectiveDate = "January 22, 2025";

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <section className="mb-10">
        <Badge className="mb-4 bg-indigo-600 dark:bg-indigo-700/60 text-white dark:text-indigo-50">
          Legal
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-300 dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
          Data Protection Policy
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Effective as of {effectiveDate}
        </p>
        <Card className="mt-6 border-slate-300 dark:border-slate-700/60 bg-slate-100 dark:bg-slate-900/40">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-slate-100">
              At-a-glance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-700 dark:text-slate-300">
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
                className="underline underline-offset-4"
              >
                support@nedapay.xyz
              </Link>{" "}
              to exercise these rights.
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Purpose */}
      <section id="purpose" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
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

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Scope */}
      <section id="scope" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          2. Scope
        </h2>
        <p>
          This Policy applies to all personal information that we collect, use,
          disclose, and otherwise process in connection with our business
          operations. This includes personal information that we collect from
          you directly, as well as personal information that we collect from
          third parties.
        </p>
        <p className="text-slate-700 dark:text-slate-300">
          <span className="font-medium">Controller:</span> NEDA Labs Ltd., 9th
          Floor, Tan House, Victoria, Dar es Salaam.
          <br />
          <span className="font-medium">Contact:</span>{" "}
          <Link
            href="mailto:support@nedapay.xyz"
            className="underline underline-offset-4"
          >
            support@nedapay.xyz
          </Link>
          .
        </p>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Definitions */}
      <section id="definitions" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          3. Definitions
        </h2>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
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

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Data Protection Principles */}
      <section id="principles" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          4. Data Protection Principles
        </h2>
        <p>
          We will process your personal information in accordance with the
          following data protection principles:
        </p>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
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

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Data Collection */}
      <section id="data-collection" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          5. Data Collection
        </h2>
        <p>We collect personal information from you in a variety of ways, including:</p>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
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
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>Your name, email address, and phone number.</li>
          <li>Your billing and shipping address.</li>
          <li>Your credit card or other payment information.</li>
          <li>Your job title and company name.</li>
          <li>Your social media profile information.</li>
          <li>
            Your IP address and other technical information about your device.
          </li>
        </ul>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Data Use */}
      <section id="data-use" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          6. Data Use
        </h2>
        <p>We use your personal information for a variety of purposes, including:</p>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>To provide you with our products and services.</li>
          <li>
            To communicate with you about your account and our products and
            services.
          </li>
          <li>To process your payments.</li>
          <li>To personalize your experience on our website and mobile app.</li>
          <li>To improve our products and services.</li>
          <li>To conduct market research.</li>
          <li>To comply with applicable laws and regulations.</li>
        </ul>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Data Sharing */}
      <section id="data-sharing" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          7. Data Sharing
        </h2>
        <p>
          We may share your personal information with the following third
          parties:
        </p>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            Our service providers, such as payment processors, shipping
            companies, and data storage providers.
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
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          We require our service providers and business partners to protect your
          personal information in accordance with this Policy and applicable law.
        </p>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Data Security */}
      <section id="data-security" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          8. Data Security
        </h2>
        <p>
          We take reasonable steps to protect your personal information from
          unauthorized access, use, disclosure, or destruction. We use a variety
          of security measures, including:
        </p>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>Encryption</li>
          <li>Access controls</li>
          <li>Physical security measures</li>
          <li>Regular security audits</li>
        </ul>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Data Retention */}
      <section id="data-retention" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          9. Data Retention
        </h2>
        <p>
          We will retain your personal information for as long as is necessary
          for the purposes for which it is processed. We will also retain your
          personal information as required by applicable law.
        </p>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Your Rights */}
      <section id="your-rights" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          10. Your Rights
        </h2>
        <p>
          You have the following rights with respect to your personal
          information:
        </p>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
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
            className="underline underline-offset-4"
          >
            support@nedapay.xyz
          </Link>
          .
        </p>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Children's Privacy */}
      <section id="children" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          11. Children&apos;s Privacy
        </h2>
        <p>
          We do not knowingly collect personal information from children under
          the age of 18. If you are a parent or guardian and you believe that
          your child has provided us with personal information, please contact us
          at{" "}
          <Link
            href="mailto:support@nedapay.xyz"
            className="underline underline-offset-4"
          >
            support@nedapay.xyz
          </Link>
          .
        </p>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Changes */}
      <section id="changes" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          12. Changes to This Policy
        </h2>
        <p>
          We may update this Policy from time to time. We will notify you of any
          changes by posting the new Policy on our website.
        </p>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Contact */}
      <section id="contact" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          13. Contact Us
        </h2>
        <p>
          If you have any questions about this Policy, please contact us at{" "}
          <Link
            href="mailto:support@nedapay.xyz"
            className="underline underline-offset-4"
          >
            support@nedapay.xyz
          </Link>
          .
        </p>
        <p className="text-slate-700 dark:text-slate-300">
          NEDA Labs Ltd.
          <br />
          9th Floor, Tan House, Victoria, Dar es Salaam
        </p>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Additional information */}
      <section id="additional" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Additional Information
        </h2>
        <Accordion
          type="multiple"
          className="rounded-xl border border-slate-300 dark:border-slate-700/60 bg-slate-100 dark:bg-slate-900/40 p-2"
        >
          <AccordionItem value="cookies">
            <AccordionTrigger className="text-slate-900 dark:text-slate-100">
              Cookies and other tracking technologies
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 dark:text-slate-300">
              We use cookies and other tracking technologies to collect
              information about your use of our website and mobile app. You can
              control the use of cookies through your browser settings.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="third-party">
            <AccordionTrigger className="text-slate-900 dark:text-slate-100">
              Third-party websites
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 dark:text-slate-300">
              Our website and mobile app may contain links to third-party
              websites. We are not responsible for the privacy practices of these
              third-party websites.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="transfers">
            <AccordionTrigger className="text-slate-900 dark:text-slate-100">
              Data transfers
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 dark:text-slate-300">
              Your personal information may be transferred to countries outside
              of the United Republic of Tanzania. If we transfer your personal
              information to a country outside of Tanzania, we will take steps to
              ensure that your personal information is protected in accordance
              with applicable law.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  );
}
