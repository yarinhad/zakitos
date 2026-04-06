export function meta() {
  return [
    {title: 'Privacy Policy | Zakitos'},
    {name: 'description', content: 'Zakitos Privacy Policy — how we collect, use, and protect your data.'},
  ];
}

export default function PrivacyPolicy() {
  return (
    <div className="bg-zakitos-black min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl text-zakitos-cream mb-2 tracking-wide">
          PRIVACY <span className="text-gradient-fire">POLICY</span>
        </h1>
        <p className="text-zakitos-muted text-sm font-mono mb-12">Last updated: April 6, 2026</p>

        <div className="space-y-10 text-zakitos-muted leading-relaxed text-sm">

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">1. WHO WE ARE</h2>
            <p>Zakitos ("we," "us," or "our") operates <a href="https://zakitos.com" className="text-zakitos-red hover:underline">zakitos.com</a>. Contact us at <a href="mailto:support@zakitos.com" className="text-zakitos-red hover:underline">support@zakitos.com</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">2. INFORMATION WE COLLECT</h2>
            <p>We collect information you provide directly:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Name, email, shipping and billing address when you order</li>
              <li>Payment information (processed securely by Shopify Payments — we never store card details)</li>
              <li>Email address if you subscribe to our newsletter</li>
              <li>Messages you send via email or contact forms</li>
            </ul>
            <p className="mt-3">We also automatically collect:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Log data (IP address, browser type, pages visited)</li>
              <li>Device information (OS, unique identifiers)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">3. HOW WE USE YOUR INFORMATION</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To process and fulfill your orders</li>
              <li>To send order confirmations and shipping updates</li>
              <li>To send marketing emails (only if opted in — unsubscribe anytime)</li>
              <li>To improve our website and products</li>
              <li>To prevent fraud and comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">4. SHARING YOUR INFORMATION</h2>
            <p>We do not sell your personal data. We share it only with:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong className="text-zakitos-cream">Shopify</strong> — our e-commerce platform</li>
              <li><strong className="text-zakitos-cream">Shipping carriers</strong> — UPS, USPS, FedEx to fulfill orders</li>
              <li><strong className="text-zakitos-cream">Payment processors</strong> — Shopify Payments / Stripe</li>
              <li><strong className="text-zakitos-cream">Email marketing</strong> — Klaviyo, only for opted-in subscribers</li>
              <li><strong className="text-zakitos-cream">Law enforcement</strong> — if required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">5. COOKIES</h2>
            <p>We use cookies to maintain your cart, remember preferences, and analyze traffic. You can disable cookies in your browser settings, though some features may not work correctly.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">6. DATA RETENTION</h2>
            <p>We retain order data for up to 7 years for legal and accounting purposes. To request deletion of your personal data, email <a href="mailto:support@zakitos.com" className="text-zakitos-red hover:underline">support@zakitos.com</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">7. YOUR RIGHTS</h2>
            <p>You may have the right to access, correct, or delete your personal data, and to opt out of marketing at any time. Contact us at <a href="mailto:support@zakitos.com" className="text-zakitos-red hover:underline">support@zakitos.com</a> to exercise these rights.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">8. SECURITY</h2>
            <p>We use SSL/TLS encryption and Shopify's secure infrastructure to protect your data. No internet transmission is 100% secure, but we take all reasonable precautions.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">9. CHILDREN'S PRIVACY</h2>
            <p>Our site is not directed to children under 13. We do not knowingly collect data from children. If you believe we have, contact us immediately.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">10. CHANGES</h2>
            <p>We may update this policy periodically. Continued use of our site after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-zakitos-cream tracking-wide mb-3">11. CONTACT</h2>
            <p>Questions? Email <a href="mailto:support@zakitos.com" className="text-zakitos-red hover:underline">support@zakitos.com</a></p>
          </section>

        </div>
      </div>
    </div>
  );
}
