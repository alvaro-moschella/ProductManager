
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


export const URL_BASE = 'http://localhost:8080/api';

export const buildPaginatedResponse = (data, sort = null, query = null, baseUrl = URL_BASE) => {
    return {
      status: 'success',
      payload: data.docs.map((doc) => doc.toJSON()),
      totalPages: data.totalPages,
      prevPage: data.prevPage,
      nextPage: data.nextPage,
      page: data.page,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage,
      prevLink: data.hasPrevPage ? `${baseUrl}/products?limit=${data.limit}&page=${data.prevPage}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null,
      nextLink: data.hasNextPage ? `${baseUrl}/products?limit=${data.limit}&page=${data.nextPage}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null,
    };
  };