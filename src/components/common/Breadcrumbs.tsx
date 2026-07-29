import React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbSchema } from './SchemaMarkup';
import { SEO_CONFIG } from '../../config/seo';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const allItems = [{ label: 'Home', path: '/' }, ...items];
  const schemaItems = allItems.map(item => ({
    name: item.label,
    url: `${SEO_CONFIG.siteUrl}${item.path}`,
  }));

  return (
    <>
      <BreadcrumbSchema items={schemaItems} />
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-6 pt-28 pb-4"
      >
        <ol className="flex flex-wrap items-center gap-2 text-body-sm font-body">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {!isLast ? (
                  <>
                    <Link
                      to={item.path}
                      className="text-navy-500/60 hover:text-gold transition-colors uppercase tracking-widest text-[10px]"
                    >
                      {item.label}
                    </Link>
                    <span className="text-navy-500/30 text-xs" aria-hidden="true">/</span>
                  </>
                ) : (
                  <span className="text-gold uppercase tracking-widest text-[10px] font-medium" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
