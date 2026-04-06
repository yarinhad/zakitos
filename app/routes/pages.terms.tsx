export function meta() {
  return [
    {title: 'Terms of Service | Zakitos'},
    {name: 'description', content: 'Zakitos Terms of Service — the rules for using our site and purchasing our products.'},
  ];
}

export default function TermsOfService() {
  return (
    <div className="bg-zakitos-black min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl text-zakitos-cream mb-2 tracking-wide">
          TERMS OF <span className="text-gradient-fire">SERVICE</span>
        </h1>
        <p className="text-zakitos-muted text-sm font-mono mb-12">Last updated: April 6, 2026</p>

        <div className="space-y-10 text-zakitos-muted leading-relaxed text-sm">

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">1. ACCEPTANCE OF TERMS</h2>
            <p>By accessing or using zakitos.com (the "Site") or purchasing our products, you agree to be bound by these Terms of Service. If you do not agree, do not use our Site.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">2. PRODUCTS & ORDERS</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>All product descriptions and prices are subject to change without notice</li>
              <li>We reserve the right to refuse or cancel any order at our discretion</li>
              <li>We are not responsible for typographical errors in pricing or product descriptions</li>
              <li>Product images are for illustrative purposes; actual products may vary slightly</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">3. PAYMENT</h2>
            <p>We accept major credit/debit cards and other payment methods shown at checkout. All payments are processed securely via Shopify Payments. You represent that you are authorized to use the payment method provided.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">4. SHIPPING & DELIVERY</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Shipping times are estimates and not guaranteed</li>
              <li>Risk of loss passes to you upon delivery to the carrier</li>
              <li>We are not responsible for delays caused by carriers or customs</li>
              <li>International orders may be subject to import duties and taxes</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">5. RETURNS & REFUNDS</h2>
            <p>We want you to love every bite. If you're not satisfied:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Contact us within 30 days of delivery at <a href="mailto:support@zakitos.com" className="text-zakitos-red hover:underline">support@zakitos.com</a></li>
              <li>Damaged or defective products will be replaced or refunded at no cost</li>
              <li>Opened food products cannot be returned for health and safety reasons unless defective</li>
              <li>Refunds are processed to the original payment method within 5–10 business days</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">6. FOOD ALLERGEN NOTICE</h2>
            <p>
              Our products are manufactured in facilities that may process common allergens including nuts, sesame, soy, and gluten.
              Always read product labels carefully. If you have severe food allergies, consult your doctor before consuming our products.
              Zakitos is not liable for allergic reactions resulting from undisclosed allergens or cross-contamination.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">7. INTELLECTUAL PROPERTY</h2>
            <p>All content on this Site — including logos, images, text, and brand assets — is owned by Zakitos and protected by copyright and trademark law. You may not reproduce, distribute, or create derivative works without our written permission.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">8. USER CONTENT & UGC</h2>
            <p>
              By tagging us or using #ZakitosChallenge, you grant Zakitos a non-exclusive, royalty-free license to use, display, and share your content across our marketing channels.
              We will credit you where possible. You can revoke this by contacting us at <a href="mailto:support@zakitos.com" className="text-zakitos-red hover:underline">support@zakitos.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">9. DISCLAIMER OF WARRANTIES</h2>
            <p>
              Our Site and products are provided "as is" without warranties of any kind, express or implied.
              We do not warrant that the Site will be uninterrupted, error-free, or free of viruses.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">10. LIMITATION OF LIABILITY</h2>
            <p>
              To the maximum extent permitted by law, Zakitos shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our Site or products.
              Our total liability shall not exceed the amount you paid for the specific order in dispute.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">11. GOVERNING LAW</h2>
            <p>These Terms are governed by the laws of the State of Tennessee, United States, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Tennessee.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">12. CHANGES TO TERMS</h2>
            <p>We may update these Terms at any time. Continued use of the Site after changes constitutes acceptance of the updated Terms.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">13. CONTACT</h2>
            <p>Questions about these Terms? Email <a href="mailto:support@zakitos.com" className="text-zakitos-red hover:underline">support@zakitos.com</a></p>
          </section>

        </div>
      </div>
    </div>
  );
}
