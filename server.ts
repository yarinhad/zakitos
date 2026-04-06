import {createRequestHandler} from '@shopify/remix-oxygen';
import {storefrontRedirect} from '@shopify/hydrogen';
import * as remixBuild from 'virtual:remix/server-build';
import {createAppLoadContext} from '~/lib/context';

export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      const appLoadContext = await createAppLoadContext(
        request,
        env,
        executionContext,
      );

      const handleRequest = createRequestHandler({
        build: remixBuild,
        mode: process.env.NODE_ENV,
        getLoadContext: () => appLoadContext,
      });

      const response = await handleRequest(request);

      if (response.status === 404) {
        const url = new URL(request.url);
        // Don't redirect static assets — let them 404 cleanly
        if (url.pathname.startsWith('/assets/') || url.pathname.match(/\.(js|css|png|jpg|ico|svg|woff2?)$/)) {
          return response;
        }
        return storefrontRedirect({
          request,
          response,
          storefront: appLoadContext.storefront,
        });
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};
