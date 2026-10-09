import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '@/App';
import { HeadContext, renderHead, type HeadData } from '@/lib/seo';
import { site } from '@/config/site';

export { staticRoutes } from '@/routes';
export const siteUrl = site.url;

export function render(url: string) {
  const ctx: { data?: HeadData } = {};
  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={ctx}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>,
  );
  return { html, head: ctx.data ? renderHead(ctx.data) : '' };
}
