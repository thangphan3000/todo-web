import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

interface RouteCommon {
  ErrorBoundary?: React.ComponentType<unknown>;
}

interface Pages {
  [key: string]: {
    default: React.ComponentType<unknown>;
  } & RouteCommon;
}

interface Route extends RouteCommon {
  path: string;
  Element: React.ComponentType<unknown>;
}

const normalizePath = (fileName: string): string => {
  return fileName.includes('$')
    ? fileName.replace('$', ':')
    : fileName.replace(/\/index/, '');
};

const getRoutes = (): Route[] => {
  const pages: Pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
  const routes: Route[] = [];

  for (const path of Object.keys(pages)) {
    const fileName = RegExp(/\.\/pages\/(.*)\.tsx$/).exec(path)?.[1];

    if (!fileName) continue;

    routes.push({
      path:
        fileName === 'index' ? '/' : `${normalizePath(fileName).toLowerCase()}`,
      Element: pages[path].default,
      ErrorBoundary: pages[path]?.ErrorBoundary,
    });
  }

  return routes;
};

const routes = getRoutes();

export const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  })),
);
