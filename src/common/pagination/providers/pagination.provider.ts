import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    if (!paginationQuery.page) {
      paginationQuery.page = 1;
    }
    if (!paginationQuery.limit) {
      paginationQuery.limit = 10;
    }

    let results = await repository.find({
      skip:
        ((paginationQuery.page as number) - 1) *
        (paginationQuery?.limit as number),
      take: paginationQuery.limit,
    });

    const baseUrl =
      this.request.protocol +
      '://' +
      this.request.headers.host +
      this.request.baseUrl;

    const newUrl = new URL(this.request.url, baseUrl);

    const totalItems = await repository.count();
    const totalPages = Math.ceil(
      totalItems / (paginationQuery?.limit as number),
    );
    const nextPage =
      paginationQuery.page === totalPages
        ? paginationQuery.page
        : (paginationQuery?.page as number) + 1;

    const previousPage =
      paginationQuery.page === 1
        ? paginationQuery.page
        : (paginationQuery?.page as number) - 1;

    let finalResponse = {
      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit,
        totalItems: totalItems,
        currentPage: paginationQuery.page,
        totalPages: Math.ceil(totalItems / paginationQuery.limit),
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${previousPage}`,
      },
    };

    return finalResponse;
  }
}
