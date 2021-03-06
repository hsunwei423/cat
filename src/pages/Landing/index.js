import { useState, useCallback, useRef, useEffect } from 'react';
import useDebounce from 'utils/hooks/useDebounce';
import useSWR from 'swr';
import { BREED_SEARCH_PATH } from 'api/catApi';

import apiInstance from 'api/instance';

import Layout from 'components/common/Layout';
import Input from 'components/common/Input';
import Item from 'components/Item';
import Spinner from 'components/common/Spinner';
import RadioButton from 'components/common/RadioButton';

import NoDataImg from 'assets/images/img-no-data.jpg';

import style from './style.module.scss';

const LOAD_MAX_IMG_NUM = 8;

const SORTABLE_LIST = ['Name', 'Weight', 'LifeSpan'];

const fetcher = (url) => apiInstance.get(url).then((res) => res.data);

const Landing = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [sortKey, setSortKey] = useState(SORTABLE_LIST[0]);
  const [totalList, setTotalList] = useState([]);
  const debounceName = useDebounce(name, name.length > 3 ? 1000 : 0);

  const { data, error } = useSWR(
    debounceName ? `${BREED_SEARCH_PATH}?q=${debounceName}` : null,
    fetcher
  );

  const loading = !data && !error && debounceName;

  // TODO: maybe remove useEffect
  useEffect(() => {
    if (!data) {
      return;
    }
    const sortableList = data.sort((firstItem, secondItem) => {
      if (sortKey === SORTABLE_LIST[0]) {
        return firstItem.name > secondItem.name ? 1 : -1;
      } else if (sortKey === SORTABLE_LIST[1]) {
        return firstItem.weight?.imperial > secondItem.weight?.imperial ? 1 : -1;
      } else {
        return firstItem.life_span > secondItem.life_span ? 1 : -1;
      }
    });

    setTotalList(sortableList);
    if (sortableList.length > LOAD_MAX_IMG_NUM) {
      setList(sortableList.slice(0, LOAD_MAX_IMG_NUM));
    } else {
      setList(sortableList);
    }
  }, [data, sortKey]);

  const handleLoadMore = () => {
    const totalSize = totalList.length;
    const currentSize = list.length;
    if (totalSize > currentSize) {
      const start = currentSize;
      const end = start + LOAD_MAX_IMG_NUM > totalSize ? totalSize : start + LOAD_MAX_IMG_NUM;

      setList((prev) => [...prev, ...totalList.slice(start, end)]);
    }
  };

  const renderSortList = () => {
    return SORTABLE_LIST.map((d) => {
      return (
        <RadioButton name={d} key={d} checked={sortKey === d} onChnage={() => setSortKey(d)} />
      );
    });
  };

  const renderItemList = () => {
    return (
      <>
        <div className={style['item-container']}>
          {list.map((d) => {
            return (
              <Item
                key={d.name}
                imgId={d.reference_image_id}
                name={d.name}
                weight={d.weight}
                lifeSpan={d.life_span}
              />
            );
          })}
        </div>

        {totalList.length > list.length && (
          <div className={style['load-more-btn']} onClick={handleLoadMore}>
            Load More
          </div>
        )}
      </>
    );
  };

  return (
    <Layout>
      <div className={style.container}>
        <h1 className={style.title}>Search Cat</h1>
        <div className={style['search-input-wrapper']}>
          <Input placeholder="input cat name" onChange={setName} value={name} />
        </div>
        <div className={style['radio-group-wrapper']}>{renderSortList()}</div>

        {loading ? (
          <div className={style['status-wrapper']}>
            <Spinner />
          </div>
        ) : !data || data?.length === 0 ? (
          <img className={style['status-wrapper']} src={NoDataImg} alt="no data" width="300px" />
        ) : (
          renderItemList()
        )}
      </div>
    </Layout>
  );
};

export default Landing;
