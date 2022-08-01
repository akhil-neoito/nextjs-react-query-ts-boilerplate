import { useMemo, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { getArticles } from '@/services/api/article.service';
import useDebounce from '@/hooks/useDebounce';
import { useArticlesQuery } from '@/services/queries/article.query';
import ArticleList from '@/components/ArticleList';
import { Article } from '@/types/article';

export type Filter = { page: number; search?: string };

interface Props {
  articles: Article[];
}

const Articles: NextPage<Props> = ({ articles }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const filter = useMemo<Filter>(
    () => ({
      page: 1,
      pageSize: 10,
      search: debouncedSearchTerm?.length ? debouncedSearchTerm : undefined,
    }),
    [debouncedSearchTerm]
  );
  const { isLoading, data } = useArticlesQuery(filter);

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex justify-center w-full">
        <div className="mb-3 xl:w-[40%]">
          <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 block w-auto mr-2 px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Enter search term"
              aria-label="Search"
              aria-describedby="button-addon3"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {!articles?.length && isLoading ? (
          <div>Loading...</div>
        ) : (
          <ArticleList articles={data?.results ?? articles} />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data = await getArticles({ page: 1 });

  return {
    props: {
      articles: data.results,
    },
  };
};

export default Articles;
