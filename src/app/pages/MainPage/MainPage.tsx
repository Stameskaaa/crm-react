import { useEffect, useState } from 'react';
import { Container } from '../../components/container/Container';
import styles from './mainpage.module.scss';
import { getComment, getSortedDesigners } from '../../../services/api';
import { CommentComponent } from '../../components/commentcomponent/CommentComponent';
import { TaskComponent } from '../../components/taskcomponent/TaskComponent';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setTopDesigners, setLastsComments } from '../../../features/slice/mainSlice';
import Loader from '../../components/loader/Loader';

export const MainPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { currentLanguageObject } = useAppSelector((state) => state.language);
  const { lastsComments, topDesigners } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (lastsComments.length === 0 || topDesigners.length === 0) {
      commentRequest();
    }
  }, []);

  const commentRequest = async () => {
    try {
      setLoading(true);
      const responseComments = await getComment();

      if (responseComments?.data) {
        dispatch(setLastsComments(responseComments.data.slice(responseComments.data.length - 10)));
      } else {
        console.log('comments Empty or error');
      }

      const topDesigenersRequest = await getSortedDesigners();

      if (topDesigenersRequest) {
        dispatch(setTopDesigners(topDesigenersRequest));
      } else {
        console.log('designers Empty or error');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className={styles.page_contaier}>
      <Container>
        {lastsComments.length > 0 ? (
          <>
            <p className={styles.title}>{currentLanguageObject.comments}</p>
            <hr />
            {lastsComments.map((comment) => {
              return (
                <CommentComponent
                  key={comment.id}
                  src={comment.designer.avatar}
                  date={comment.date_created}
                  name={comment.designer.username}
                  message={comment.message}
                  issue={comment.issue}
                />
              );
            })}
          </>
        ) : (
          <p className={styles.title}>{currentLanguageObject.noComments}</p>
        )}
      </Container>

      <Container>
        {topDesigners.length > 0 ? (
          <>
            <p className={styles.title}>{currentLanguageObject.bestDesigners}</p>
            <hr />
            {topDesigners.map((designer, index) => {
              return (
                <TaskComponent
                  key={index}
                  src={designer[0].avatar}
                  name={designer[0].username}
                  count={designer[0].issues.length}
                  date={designer[1]}
                />
              );
            })}
          </>
        ) : (
          <p className={styles.title}>{currentLanguageObject.noDesigners}</p>
        )}
      </Container>
    </div>
  );
};
