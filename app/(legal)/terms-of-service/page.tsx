"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const effectiveDate = "September 14, 2026"; // keep this current when you ship updates

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <section className="mb-10">
        <Badge className="mb-4 bg-indigo-600 dark:bg-indigo-700/60 text-white dark:text-indigo-50">Legal</Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-300 dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
          NEDApay — a service of NEDALabs Ltd
        </p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Last updated: {effectiveDate}
        </p>
        <p className="mt-6 text-slate-700 dark:text-slate-300">
          These Terms of Service ("Terms") govern access to and use of the
          services provided by <span className="font-semibold">NEDALabs Ltd</span>{" "}
          ("<strong>NEDApay</strong>", "<strong>we</strong>", "<strong>us</strong>",
          or "<strong>our</strong>"), a company incorporated in the United
          Republic of Tanzania, through our website at{" "}
          <Link href="https://nedapay.xyz" className="underline underline-offset-4">
            nedapay.xyz
          </Link>{" "}
          and related services (collectively, the "<strong>Services</strong>").
          By accessing or using our Services, you agree to be bound by these Terms
          and our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
        <p className="mt-4 text-slate-700 dark:text-slate-300">
          NEDApay operates as an approved participant in the Bank of Tanzania
          ("BoT") Fintech Regulatory Sandbox. Our Services are provided under
          the terms and limitations of that sandbox approval and are subject
          to change as our regulatory status evolves, including upon
          graduation from the sandbox or issuance of a substantive license by
          the Bank of Tanzania.
        </p>
        <Card className="mt-6 border-slate-300 dark:border-slate-700/60 bg-slate-100 dark:bg-slate-900/40">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-slate-100">Quick Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-700 dark:text-slate-300">
            <p>
              NEDApay is a digital payment platform that enables stablecoin
              transactions, payment processing, and fiat off-ramping
              services, operating under Bank of Tanzania sandbox approval.
              We use blockchain technology to provide secure, efficient
              payment solutions for individuals and businesses in Tanzania.
            </p>
            <p>
              By using our Services, you agree to comply with all applicable
              Tanzanian laws including the Anti-Money Laundering Act, 2006
              ("AMLA") and its regulations, and the Personal Data Protection
              Act, 2022 ("PDPA"); maintain the security of your wallet and
              credentials and use our platform responsibly. We reserve the
              right to suspend or terminate accounts that violate these
              Terms or applicable law.
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Definitions */}
      <section id="definitions" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          1. Definitions
        </h2>
        <p>For the purposes of these Terms of Service, the following definitions apply:</p>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            <span className="font-medium">Company:</span> NEDALabs Ltd, a
            company incorporated in Tanzania, operating under Bank of
            Tanzania Fintech Regulatory Sandbox approval, providing the
            Services described in these Terms.
          </li>
          <li>
            <span className="font-medium">Services:</span> All products and
            services provided by NEDApay, including payment processing,
            stablecoin management, payment links, invoicing, fiat
            off-ramping, and merchant tools.
          </li>
          <li>
            <span className="font-medium">User:</span> Any individual or entity that
            accesses or uses the Services.
          </li>
          <li>
            <span className="font-medium">Merchant:</span> A User who uses our Services
            to accept payments, create invoices, or conduct business transactions.
          </li>
          <li>
            <span className="font-medium">Transaction:</span> Any action initiated
            through the Services involving the transfer or exchange of
            digital assets, stablecoins, or fiat currency.
          </li>
          <li>
            <span className="font-medium">Wallet:</span> A digital wallet
            used to store, send, and receive cryptocurrency and digital
            assets, including both embedded wallets provided through nTZS —
            a system owned and operated by NEDALabs Ltd — and external
            wallets.
          </li>
          <li>
            <span className="font-medium">NIDA Number:</span> The unique
            national identification number issued to an individual by the
            National Identification Authority of Tanzania.
          </li>
          <li>
            <span className="font-medium">TIN:</span> Taxpayer
            Identification Number issued by the Tanzania Revenue Authority.
          </li>
          <li>
            <span className="font-medium">MLRO:</span> Money Laundering
            Reporting Officer, the individual designated by the Company and
            registered with the Financial Intelligence Unit (FIU) of
            Tanzania to receive and act on internal suspicious activity
            reports.
          </li>
        </ul>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Services Overview */}
      <section id="services-overview" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          2. Services Overview
        </h2>
        <p>
          NEDApay provides a digital payment platform built on blockchain
          technology, operating under a Bank of Tanzania Fintech Regulatory
          Sandbox approval. Our Services include:
        </p>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            <span className="font-medium">Payment Processing:</span> Secure payment
            links, invoice creation and management, and transaction monitoring.
          </li>
          <li>
            <span className="font-medium">Stablecoin Management:</span> Real-time
            balance tracking, secure stablecoin transactions on Base
            Network, and integration with major stablecoins, including the
            nTZS Tanzanian shilling-backed stablecoin.
          </li>
          <li>
            <span className="font-medium">Fiat Off-ramping:</span> Direct USDC to
            fiat conversion with multiple currency support and integrated payment
            processors.
          </li>
          <li>
            <span className="font-medium">Merchant Tools:</span> Business verification
            (KYB), payment link generation, invoice management, and analytics.
          </li>
          <li>
            <span className="font-medium">Authentication Services:</span>{" "}
            Secure email-based one-time-password (OTP) authentication, with
            embedded wallet provisioning through nTZS, a system owned and
            operated by NEDALabs Ltd.
          </li>
        </ul>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* User Requirements */}
      <section id="user-requirements" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          3. User Requirements
        </h2>
        <p>To use the Services, you must meet the following criteria:</p>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            <span className="font-medium">Age Requirement:</span> You must be at
            least 18 years old, or of legal age in your jurisdiction, to enter
            into a legally binding agreement.
          </li>
          <li>
            <span className="font-medium">Legal Capacity:</span> You must have the
            legal capacity and authority to enter into and be bound by these Terms.
          </li>
          <li>
            <span className="font-medium">Compliance with Laws:</span> You
            must comply with all applicable Tanzanian and international
            laws, regulations, and guidelines related to the use of the
            Services, including AMLA, PDPA, and applicable sanctions
            regimes.
          </li>
          <li>
            <span className="font-medium">Account Accuracy:</span> You agree to
            provide accurate, current, and complete information, and to update
            this information as necessary.
          </li>
          <li>
            <span className="font-medium">Wallet Security:</span> You are responsible
            for safeguarding your wallet credentials, including private keys and
            seed phrases.
          </li>
        </ul>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Acceptable Use */}
      <section id="acceptable-use" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          4. Acceptable Use
        </h2>
        <p>You agree to use the Services only for lawful purposes and in accordance with these Terms.</p>

        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-4">Permitted Uses</h3>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>Conducting legitimate business transactions and payments</li>
          <li>Creating and managing payment links and invoices for lawful purposes</li>
          <li>Converting stablecoins to fiat currency through our off-ramping services</li>
          <li>Using our merchant tools for legitimate business operations</li>
        </ul>

        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-4">Prohibited Uses</h3>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>Engaging in any fraudulent, unlawful, or harmful activities</li>
          <li>
            Money laundering, terrorist financing, proliferation financing,
            or other illegal financial activities under AMLA or related
            regulations
          </li>
          <li>Violating any applicable financial regulations, sanctions, or AML/CFT laws</li>
          <li>
            Transacting with, or on behalf of, any person or entity subject
            to applicable sanctions lists, including those maintained by
            the United Nations Security Council or relevant Tanzanian
            authorities
          </li>
          <li>Attempting to gain unauthorized access to our systems or other users&apos; accounts</li>
          <li>Using the Services to process payments for illegal goods or services</li>
          <li>Manipulating or interfering with the proper functioning of the Services</li>
          <li>Creating multiple accounts to circumvent verification requirements, limits, or restrictions</li>
        </ul>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* KYC/KYB Requirements */}
      <section id="kyc-kyb" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          5. Identity Verification (KYC/KYB)
        </h2>
        <p>
          As a participant in the Bank of Tanzania Fintech Regulatory
          Sandbox and in compliance with the Anti-Money Laundering Act,
          2006, we require identity verification of all Users before they
          can transact on the Services.
        </p>

        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-4">
          5.1 Individual Verification (KYC)
        </h3>
        <p>Individual Users must provide the following before account activation:</p>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>Full legal name</li>
          <li>Phone number</li>
          <li>Email address</li>
          <li>National Identification Number (NIDA number)</li>
          <li>
            A valid government-issued identity document, uploaded for
            verification, being one of: driver&apos;s license, voter&apos;s
            registration card, or passport
          </li>
        </ul>

        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-4">
          5.2 Business Verification (KYB)
        </h3>
        <p>Merchants and business Users must provide the following in addition to individual KYC for authorized representatives:</p>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>Taxpayer Identification Number (TIN)</li>
          <li>A valid TIN certificate issued by the Tanzania Revenue Authority</li>
          <li>Business registration documents and ownership structure, as applicable</li>
        </ul>

        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-4">
          5.3 Ongoing Monitoring and Verification
        </h3>
        <p className="text-slate-700 dark:text-slate-300">
          We reserve the right to request additional or updated
          verification at any time to maintain compliance with applicable
          regulations, including where a User&apos;s transaction activity,
          profile, or risk classification changes.
        </p>

        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-4">
          5.4 Record Retention
        </h3>
        <p className="text-slate-700 dark:text-slate-300">
          KYC and KYB records, transaction records, and related supporting
          documentation are retained for a minimum of ten (10) years from
          the date of account closure or the date of the relevant
          transaction, whichever is later, in accordance with Bank of
          Tanzania Fintech Regulatory Sandbox requirements. Records may be
          retained longer where required by law, regulatory directive, or
          ongoing legal proceedings.
        </p>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Payment Terms */}
      <section id="payment-terms" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          6. Payment Terms
        </h2>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            <span className="font-medium">Transaction Fees:</span> We may charge
            fees for certain Services, which will be clearly disclosed before
            you complete any transaction.
          </li>
          <li>
            <span className="font-medium">Gas Fees:</span> Blockchain transactions
            may incur network gas fees. For embedded wallet users, we provide
            gas abstraction where applicable.
          </li>
          <li>
            <span className="font-medium">Exchange Rates:</span> For fiat off-ramping
            services, exchange rates are determined at the time of transaction
            and may fluctuate based on market conditions.
          </li>
          <li>
            <span className="font-medium">Payment Processing:</span> All payments
            are processed on blockchain networks and are generally irreversible
            once confirmed.
          </li>
          <li>
            <span className="font-medium">Refunds:</span> Refunds are
            provided where a transaction is not processed successfully due
            to an error attributable to us. Refund requests should be
            submitted to{" "}
            <Link href="mailto:support@nedapay.xyz" className="underline underline-offset-4">
              support@nedapay.xyz
            </Link>
            .
          </li>
        </ul>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Intellectual Property */}
      <section id="intellectual-property" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          7. Intellectual Property
        </h2>
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">Company IP</h3>
        <p className="text-slate-700 dark:text-slate-300">
          All intellectual property rights in the Services, including trademarks,
          logos, and content, are owned by NEDALabs Ltd. You are granted a limited,
          non-exclusive, non-transferable license to use the Services solely for
          personal or business purposes in accordance with these Terms.
        </p>

        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-4">User Submissions</h3>
        <p className="text-slate-700 dark:text-slate-300">
          By submitting any materials to the Services, including feedback,
          transaction data, or support requests, you grant the Company a
          worldwide, royalty-free, non-exclusive license to use, reproduce,
          modify, and distribute those materials for purposes related to
          operating and improving the Services, subject to our obligations
          under the Personal Data Protection Act, 2022 regarding any
          personal data contained in those materials.
        </p>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Privacy and Data Protection */}
      <section id="privacy" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          8. Privacy and Data Protection
        </h2>
        <p className="text-slate-700 dark:text-slate-300">
          Our collection, use, storage, and sharing of your personal data is
          governed by our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-4">
            Privacy Policy
          </Link>{" "}
          and by the Personal Data Protection Act, 2022 ("PDPA") of
          Tanzania. By using our Services, you consent to the collection and
          use of your information as described in our Privacy Policy and
          this section.
        </p>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            <span className="font-medium">Data Protection Officer:</span> We
            maintain a designated point of contact for data protection
            matters, reachable at{" "}
            <Link href="mailto:support@nedapay.xyz" className="underline underline-offset-4">
              support@nedapay.xyz
            </Link>
            .
          </li>
          <li>
            <span className="font-medium">Your Rights:</span> Subject to
            applicable law, you may have the right to access, correct, or
            request deletion of your personal data, and to lodge a
            complaint with the relevant data protection authority.
          </li>
          <li>
            <span className="font-medium">Data Sharing:</span> Personal
            data, including KYC/KYB information, may be shared with
            regulators (including the Bank of Tanzania and the Financial
            Intelligence Unit), and other parties as required by law or
            necessary to operate the Services.
          </li>
          <li>
            <span className="font-medium">Security:</span> We implement
            reasonable technical and organizational measures to protect
            your data but cannot guarantee absolute security. You
            acknowledge that data transmission over the internet carries
            inherent risks.
          </li>
        </ul>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* AML/CFT Compliance and Reporting */}
      <section id="aml-cft" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          9. AML/CFT Compliance and Reporting
        </h2>
        <p className="text-slate-700 dark:text-slate-300">
          As a regulated participant in the Bank of Tanzania Fintech
          Regulatory Sandbox, NEDApay maintains an Anti-Money Laundering and
          Countering the Financing of Terrorism (AML/CFT) program in
          accordance with the Anti-Money Laundering Act, 2006 and its
          regulations.
        </p>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            <span className="font-medium">Monitoring:</span> We monitor
            transactions for suspicious or unusual activity and may request
            additional information from you at any time.
          </li>
          <li>
            <span className="font-medium">Reporting Obligations:</span>{" "}
            Where required by law, we may file suspicious transaction
            reports (STRs) with the Financial Intelligence Unit of
            Tanzania. We are not permitted to notify you if such a report
            has been filed, and nothing in these Terms should be read as a
            waiver of that obligation.
          </li>
          <li>
            <span className="font-medium">Account Restriction:</span> We
            may restrict, suspend, delay, or terminate any transaction or
            account, without prior notice, where we reasonably suspect it
            is connected to money laundering, terrorist financing,
            sanctions violations, or other unlawful activity.
          </li>
          <li>
            <span className="font-medium">Cooperation:</span> You agree to
            cooperate with any information requests we make in connection
            with our AML/CFT obligations.
          </li>
        </ul>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Security and User Responsibility */}
      <section id="security" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          10. Security and User Responsibility
        </h2>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            <span className="font-medium">Wallet Security:</span> Keep your
            cryptocurrency wallet private keys and recovery phrases confidential.
            Never share this information with anyone.
          </li>
          <li>
            <span className="font-medium">Strong Security Practices:</span> Use
            strong, unique passwords and enable two-factor authentication where
            available.
          </li>
          <li>
            <span className="font-medium">Regular Monitoring:</span> Frequently
            review your wallet and transaction history for unauthorized activity.
          </li>
          <li>
            <span className="font-medium">Phishing Awareness:</span> Be cautious
            of phishing attempts. We will never request your wallet keys or
            sensitive information through unsolicited communications.
          </li>
          <li>
            <span className="font-medium">Reporting:</span> Immediately
            report any suspected unauthorized access or suspicious activity
            to{" "}
            <Link href="mailto:support@nedapay.xyz" className="underline underline-offset-4">
              support@nedapay.xyz
            </Link>
            .
          </li>
        </ul>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Limitation of Liability */}
      <section id="limitation-liability" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          11. Limitation of Liability
        </h2>

        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">No Warranty</h3>
        <p className="text-slate-700 dark:text-slate-300">
          The Services are provided on an "as is" and "as available" basis.
          We make no warranties, express or implied, regarding the
          Services, including but not limited to warranties of
          merchantability, fitness for a particular purpose, or
          non-infringement, except as may be required by applicable
          Tanzanian consumer protection law.
        </p>

        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-4">Limitation of Damages</h3>
        <p className="text-slate-700 dark:text-slate-300">
          To the maximum extent permitted by law, we will not be liable for any
          indirect, incidental, special, consequential, or punitive damages,
          including but not limited to:
        </p>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>Loss of profits, revenues, data, or business opportunities</li>
          <li>Damages arising from your use or inability to use the Services</li>
          <li>
            Unauthorized access to your wallet or personal information,
            except where caused by our gross negligence or wilful misconduct
          </li>
          <li>Interruption or cessation of service transmission</li>
          <li>Blockchain network failures or delays</li>
          <li>Third-party service provider failures</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300">
          Nothing in these Terms limits or excludes liability that cannot
          lawfully be limited or excluded under the Bank of Tanzania
          Financial Consumer Protection Regulations, 2019 or other
          applicable Tanzanian law.
        </p>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Consumer Complaints Handling */}
      <section id="complaints" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          12. Consumer Complaints Handling
        </h2>
        <p className="text-slate-700 dark:text-slate-300">
          In accordance with the Bank of Tanzania Financial Consumer
          Protection Regulations, 2019, we maintain a complaint handling
          process for Users.
        </p>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            Users may submit complaints to{" "}
            <Link href="mailto:support@nedapay.xyz" className="underline underline-offset-4">
              support@nedapay.xyz
            </Link>
          </li>
          <li>
            We will acknowledge receipt of a complaint and provide a
            substantive response within the timelines prescribed by
            applicable BoT regulations.
          </li>
          <li>
            If a complaint is not resolved to your satisfaction, you may
            escalate it to the Bank of Tanzania through email address{" "}
            <Link href="mailto:info@bot.go.tz" className="underline underline-offset-4">
              info@bot.go.tz
            </Link>{" "}
            or pursue the dispute resolution options described in Section 13.
          </li>
        </ul>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Governing Law */}
      <section id="governing-law" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          13. Governing Law and Dispute Resolution
        </h2>
        <p className="text-slate-700 dark:text-slate-300">
          These Terms are governed by and construed in accordance with the
          laws of the United Republic of Tanzania.
        </p>
        <p className="text-slate-700 dark:text-slate-300">
          Before initiating any formal dispute resolution, we encourage you to
          contact us directly at{" "}
          <Link href="mailto:support@nedapay.xyz" className="underline underline-offset-4">
            support@nedapay.xyz
          </Link>{" "}
          to resolve any issues informally. Unresolved disputes will be
          referred to arbitration in Dar es Salaam, Tanzania, in accordance
          with the Arbitration Act, 2020, before a single arbitrator
          appointed by agreement of the parties or, failing agreement, by
          the Tanzania Institute of Arbitrators.
        </p>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Modifications */}
      <section id="modifications" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          14. Modifications to Terms and Services
        </h2>
        <p className="text-slate-700 dark:text-slate-300">
          We reserve the right to modify these Terms at any time. We will notify
          you of material changes by posting the updated Terms on our website
          and updating the "Last updated" date. Your continued use of the Services
          after such changes constitutes acceptance of the new Terms.
        </p>
        <p className="text-slate-700 dark:text-slate-300">
          We may also modify, suspend, or discontinue any aspect of the
          Services at any time, with or without notice, including as
          required by changes to our Bank of Tanzania sandbox status or
          other regulatory developments. We will not be liable for any
          modification, suspension, or discontinuation of the Services,
          except as required by applicable law.
        </p>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Termination */}
      <section id="termination" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          15. Termination
        </h2>
        <p className="text-slate-700 dark:text-slate-300">
          You may terminate your use of the Services at any time by
          discontinuing access to our platform. We may terminate or suspend
          your access to the Services immediately, without prior notice, if
          you breach these Terms, engage in prohibited activities, or if
          required to do so by a regulator or law enforcement authority.
        </p>
        <p className="text-slate-700 dark:text-slate-300">
          Upon termination, your right to use the Services will cease
          immediately. However, any transactions already initiated may
          continue to be processed according to blockchain network
          protocols, and your records will continue to be retained in
          accordance with Section 5.4.
        </p>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Miscellaneous */}
      <section id="miscellaneous" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          16. Miscellaneous
        </h2>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            <span className="font-medium">Entire Agreement:</span> These Terms
            constitute the entire agreement between you and NEDApay regarding
            the Services.
          </li>
          <li>
            <span className="font-medium">Severability:</span> If any provision
            of these Terms is found to be unenforceable, the remaining provisions
            will remain in full force and effect.
          </li>
          <li>
            <span className="font-medium">Waiver:</span> Our failure to enforce
            any provision of these Terms does not constitute a waiver of that
            provision.
          </li>
          <li>
            <span className="font-medium">Assignment:</span> You may not
            assign your rights under these Terms without our prior written
            consent. We may assign our rights at any time, subject to
            applicable regulatory notification or approval requirements.
          </li>
          <li>
            <span className="font-medium">Force Majeure:</span> We will not be
            liable for any failure to perform due to circumstances beyond our
            reasonable control.
          </li>
        </ul>
      </section>

      <Separator className="my-8 bg-slate-300 dark:bg-slate-700/60" />

      {/* Contact */}
      <section id="contact" className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          17. Contact Information
        </h2>
        <p className="text-slate-700 dark:text-slate-300">
          If you have any questions about these Terms or need support, please
          contact us:
        </p>
        <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            Email:{" "}
            <Link href="mailto:support@nedapay.xyz" className="underline underline-offset-4">
              support@nedapay.xyz
            </Link>
          </li>
          <li>
            Website:{" "}
            <Link href="https://nedapay.xyz" className="underline underline-offset-4">
              nedapay.xyz
            </Link>
          </li>
        </ul>
      </section>

      <Separator className="my-12 bg-slate-700/60" />

      {/* Acknowledgment */}
      <footer className="rounded-xl border border-slate-300 dark:border-slate-700/60 bg-gradient-to-tr from-indigo-100/60 via-purple-100/40 to-blue-100/40 dark:from-indigo-900/40 dark:via-purple-900/30 dark:to-blue-900/30 p-4 text-xs leading-relaxed text-slate-700 dark:text-slate-400">
        <p>
          <span className="font-semibold text-slate-900 dark:text-slate-300">
            Acknowledgment:
          </span>{" "}
          By using NEDApay's Services, you acknowledge that you have read,
          understood, and agree to be bound by these Terms of Service. You also
          acknowledge the risks associated with cryptocurrency transactions and
          digital asset management.
        </p>
      </footer>
    </main>
  );
}
