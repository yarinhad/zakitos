import {json, type ActionFunctionArgs, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, useFetcher} from '@remix-run/react';
import {
  CartForm,
  Image,
  Money,
  useOptimisticCart,
  type CartQueryDataReturn,
} from '@shopify/hydrogen';
import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';

export async function loader({context}: LoaderFunctionArgs) {
  const cart = await context.cart.get();
  return json({cart});
}

export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;

  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  let result: CartQueryDataReturn;
  let status = 200;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;
      const discountCodes = (
        formDiscountCode ? [formDiscountCode] : []
      ) as string[];
      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result.cart.id;
  const headers = cart.setCartId(result.cart.id);
  const {cart: cartResult, errors} = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  return json(
    {cart: cartResult, errors, analytics: {cartId}},
    {status, headers},
  );
}

export function meta() {
  return [{title: 'Cart | Zakitos'}];
}

export default function CartPage() {
  const {cart: serverCart} = useLoaderData<typeof loader>();
  const cart = useOptimisticCart(serverCart);

  const totalItems = cart?.totalQuantity ?? 0;
  const FREE_SHIPPING_THRESHOLD = 35;
  const subtotal = parseFloat(cart?.cost?.subtotalAmount?.amount ?? '0');
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 min-h-[60vh]">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-10">
        <h1 className="font-display text-5xl md:text-6xl text-zakitos-cream tracking-wide">
          YOUR BAG
        </h1>
        {totalItems > 0 && (
          <span className="font-mono text-sm text-zakitos-muted">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {totalItems === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart lines */}
          <div className="lg:col-span-2 space-y-0">
            {/* Free shipping progress */}
            {remaining > 0 ? (
              <div className="bg-zakitos-card border border-zakitos-border p-4 mb-4">
                <p className="text-zakitos-cream text-sm mb-3">
                  Add{' '}
                  <strong className="text-zakitos-gold font-mono">
                    ${remaining.toFixed(2)}
                  </strong>{' '}
                  more for free shipping 🚚
                </p>
                <div className="shipping-progress">
                  <div
                    className="shipping-progress-fill"
                    style={{width: `${progressPct}%`}}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-zakitos-card border border-zakitos-border p-4 mb-4 text-center">
                <p className="text-zakitos-gold font-display text-base tracking-wide">
                  🚚 You've unlocked free shipping!
                </p>
              </div>
            )}

            {/* Line items */}
            {cart.lines?.nodes?.map((line) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <CartSummary cart={cart} />
          </div>
        </div>
      )}
    </div>
  );
}

function CartLineItem({line}: {line: any}) {
  const {id, merchandise, quantity, cost} = line;
  const image = merchandise?.product?.images?.nodes?.[0];

  return (
    <div className="flex gap-4 py-5 border-b border-zakitos-border">
      {/* Image */}
      <Link
        to={`/products/${merchandise.product.handle}`}
        prefetch="intent"
        className="flex-shrink-0 w-20 h-20 bg-zakitos-card overflow-hidden"
      >
        {image && (
          <Image
            data={image}
            loading="lazy"
            className="w-full h-full object-contain p-1"
            sizes="80px"
          />
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/products/${merchandise.product.handle}`}
          prefetch="intent"
          className="font-display text-lg text-zakitos-cream tracking-wide hover:text-zakitos-orange transition-colors block leading-tight"
        >
          {merchandise.product.title}
        </Link>
        {merchandise.title !== 'Default Title' && (
          <p className="text-zakitos-muted text-xs font-mono mt-0.5">{merchandise.title}</p>
        )}

        <div className="flex items-center gap-4 mt-3">
          {/* Qty */}
          <CartForm
            route="/cart"
            action={CartForm.ACTIONS.LinesUpdate}
            inputs={{lines: [{id, quantity: Math.max(1, quantity - 1)}]}}
          >
            <div className="qty-selector h-8 text-sm">
              <button type="submit" className="qty-btn text-sm w-8" aria-label="Decrease">–</button>
              <div className="qty-value text-xs w-8">{quantity}</div>
              <CartForm
                route="/cart"
                action={CartForm.ACTIONS.LinesUpdate}
                inputs={{lines: [{id, quantity: quantity + 1}]}}
              >
                <button type="submit" className="qty-btn text-sm w-8" aria-label="Increase">+</button>
              </CartForm>
            </div>
          </CartForm>

          {/* Remove */}
          <CartForm
            route="/cart"
            action={CartForm.ACTIONS.LinesRemove}
            inputs={{lineIds: [id]}}
          >
            <button
              type="submit"
              className="text-zakitos-muted hover:text-zakitos-red text-xs font-mono transition-colors"
            >
              Remove
            </button>
          </CartForm>
        </div>
      </div>

      {/* Price */}
      <div className="flex-shrink-0 text-right">
        <div className="font-mono text-base text-zakitos-cream">
          <Money data={cost.totalAmount} />
        </div>
        {quantity > 1 && (
          <div className="font-mono text-xs text-zakitos-muted mt-0.5">
            <Money data={cost.amountPerQuantity} /> ea.
          </div>
        )}
      </div>
    </div>
  );
}

function CartSummary({cart}: {cart: any}) {
  const [discountCode, setDiscountCode] = React.useState('');

  return (
    <div className="bg-zakitos-card border border-zakitos-border p-6 sticky top-24">
      <h2 className="font-display text-2xl text-zakitos-cream tracking-wide mb-5">
        ORDER SUMMARY
      </h2>

      {/* Subtotal */}
      <div className="space-y-3 mb-5">
        <div className="flex justify-between text-sm">
          <span className="text-zakitos-muted">Subtotal</span>
          <span className="font-mono text-zakitos-cream">
            <Money data={cart.cost.subtotalAmount} />
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zakitos-muted">Shipping</span>
          <span className="font-mono text-zakitos-cream">
            {parseFloat(cart.cost.subtotalAmount.amount) >= 35
              ? <span className="text-zakitos-gold">FREE</span>
              : 'Calculated at checkout'}
          </span>
        </div>
        {cart.discountCodes?.filter((d: any) => d.applicable).map((code: any) => (
          <div key={code.code} className="flex justify-between text-sm">
            <span className="text-zakitos-gold">Discount ({code.code})</span>
            <CartForm
              route="/cart"
              action={CartForm.ACTIONS.DiscountCodesUpdate}
              inputs={{discountCode: ''}}
            >
              <button type="submit" className="text-zakitos-red text-xs hover:underline">
                Remove
              </button>
            </CartForm>
          </div>
        ))}
      </div>

      {/* Discount code */}
      <div className="mb-5">
        <CartForm
          route="/cart"
          action={CartForm.ACTIONS.DiscountCodesUpdate}
          inputs={{discountCode}}
        >
          <div className="flex gap-0">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Discount code"
              className="input-fire flex-1 text-sm py-2"
            />
            <button type="submit" className="btn-fire text-sm px-4 py-2">
              Apply
            </button>
          </div>
        </CartForm>
      </div>

      <div className="divider-fire mb-5" />

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-display text-lg text-zakitos-cream tracking-wide">TOTAL</span>
        <span className="font-mono text-2xl text-zakitos-cream">
          <Money data={cart.cost.totalAmount} />
        </span>
      </div>

      {/* Checkout */}
      <a
        href={cart.checkoutUrl}
        className="btn-fire w-full text-center py-4 text-lg"
      >
        Checkout → Feel the Heat
      </a>

      <p className="text-zakitos-muted text-xs text-center mt-3 font-mono">
        Secure checkout · Free returns · Real ingredients
      </p>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-6">🌶</div>
      <h2 className="font-display text-4xl text-zakitos-cream tracking-wide mb-3">
        YOUR BAG IS COLD
      </h2>
      <p className="text-zakitos-muted text-base mb-8 max-w-sm mx-auto">
        Time to add some heat. Explore our lineup and find your flavor match.
      </p>
      <Link to="/collections/all" className="btn-fire text-base px-8 py-4" prefetch="intent">
        Shop Now 🌶
      </Link>
    </div>
  );
}

// Need React import for useState in CartSummary
import React from 'react';
