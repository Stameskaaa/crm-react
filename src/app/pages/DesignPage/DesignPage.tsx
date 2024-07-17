import { useEffect, useState } from 'react';
import { getDesigner } from '../../../services/api';
import { ResultsDesignerResponse } from '../../../types/types';
import { DesignComponent } from '../../components/designcomponent/DesignComponent';
import { Container } from '../../components/container/Container';
import styles from './designpage.module.scss';
import ReactPaginate from 'react-paginate';
import { Input } from '../../components/input/Input';
import { DropDown } from '../../components/DropDown/DropDown';
import { useAppSelector } from '../../../hooks/reduxHooks';
import Loader from '../../components/loader/Loader';

const optionsFirst = ['email', '-email', 'username', '-username'];
const optionsSecond = ['All', 'New', 'In Progress', 'Done'];

export const DesignPage = () => {
  const [designerList, setDesignerList] = useState<ResultsDesignerResponse[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const [sort, setSort] = useState<string>('username');
  const [status, setStatus] = useState<string>('All');
  const [timerState, setTimerState] = useState<number | null>(null);
  const { currentLanguageObject } = useAppSelector((state) => state.language);

  useEffect(() => {
    if (!value) {
      getDesignerRequest();
      return;
    }

    if (timerState) {
      clearTimeout(timerState);
    }

    const timer = setTimeout(() => {
      getDesignerRequest();
    }, 1500);

    setTimerState(timer);

    return () => clearTimeout(timer);
  }, [page, sort, value, status]);

  const getDesignerRequest = async () => {
    try {
      const limit = 16;
      setLoading(true);

      const designerList = await getDesigner({
        page,
        limit,
        ordering: sort,
        status: status === 'In Progress' || status === 'Done' ? status : null,
        key: value.trim().length === 0 ? null : value,
      });
      setPageCount(Math.ceil(designerList.data.count / limit));
      setDesignerList(designerList.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <Container className={styles.inner_container}>
          <Input setValue={setValue} value={value} />
          <div className={styles.sorting}>
            <DropDown
              options={optionsFirst}
              text={currentLanguageObject.sortBy}
              onSortChange={setSort}
              selectedOption={sort}
            />
            <DropDown
              options={optionsSecond}
              text={currentLanguageObject.status}
              onSortChange={setStatus}
              selectedOption={status}
            />
          </div>

          {designerList.length > 0 ? (
            <>
              {designerList.map((designer, index) => {
                return (
                  <DesignComponent
                    key={index}
                    src={designer.avatar}
                    name={designer.username}
                    tasks={designer.issues}
                    email={designer.email}
                  />
                );
              })}

              <ReactPaginate
                previousLabel={currentLanguageObject.previous}
                nextLabel={currentLanguageObject.next}
                breakLabel={'...'}
                breakClassName={styles.pagination}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={styles.pagination}
                pageClassName={styles.paginationItem}
                pageLinkClassName={styles.paginationLink}
                activeClassName={styles.paginationActive}
                forcePage={pageCount > 0 ? page - 1 : 0}
              />
            </>
          ) : (
            <div className={styles.empty_list}>{currentLanguageObject.emptyList} . . . </div>
          )}
        </Container>
      )}
    </div>
  );
};
