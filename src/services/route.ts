import { Path as PathParser } from 'path-parser';
import QueryString, { ParsedQuery } from 'query-string';

import history from './history';

interface RouteParams {
  [key: string]: string;
}

interface SetParamsProps {
  params: RouteParams;
  options?: {
    clearCurrentParams: boolean;
  };
}

export default class Route extends PathParser {
  static getCurrentUrlParams(): ParsedQuery {
    const { location } = history;

    return QueryString.parse(location.search);
  }

  static getShowPath(id: number): string {
    const { location } = history;

    return `${location.pathname}/${id}/show`;
  }

  static getCreatePath(): string {
    const { location } = history;

    return `${location.pathname}/new`;
  }

  static getEditPath(id: number): string {
    const { location } = history;

    return `${location.pathname}/${id}/edit`;
  }

  private static getParamsFromPath(path: string): string {
    const pathArr = path.split('?');

    return pathArr[1] ?? '';
  }

  private static removeInvalidParams(params: RouteParams): object {
    const invalidValues = ['', undefined, null];
    const newParams: RouteParams = {};

    Object.keys(params).forEach((param: string) => {
      const paramValue = params[param];

      if (!invalidValues.includes(paramValue)) {
        newParams[param] = paramValue;
      }
    });

    return newParams;
  }

  public getPath(): string {
    const params = Route.getCurrentUrlParams();
    const hasUrlParams = Object.keys(params).length;
    const hasParamsIncluded = Object.keys(this.queryParams).length;

    // When screen refresh params keys are not included on route instance
    if (hasUrlParams && !hasParamsIncluded) {
      this.queryParams = Object.keys(params);
    }

    return this.build(Route.getCurrentUrlParams());
  }

  public setParams({ params, options }: SetParamsProps): void {
    const { clearCurrentParams } = options || {};
    const currentUrlParams: object = Route.getCurrentUrlParams();
    const newParams: RouteParams = clearCurrentParams
      ? params
      : { ...currentUrlParams, ...params };
    const formatedParams = Route.removeInvalidParams(newParams);

    this.queryParams = Object.keys(formatedParams);

    const stringifyParams = Route.getParamsFromPath(this.build(newParams));

    if (stringifyParams) {
      history.push({ search: stringifyParams });
    }
  }
}
