import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({}: LoaderFunctionArgs) {
  return redirect('/products/zakitos', {status: 301});
}
