import { useState, useCallback, useRef } from "react";
import { getBreed } from "api/catApi";
import { debounce } from "lodash-es";

import Layout from "components/common/Layout";
import Input from "components/common/Input";
import Item from "components/Item";
import Spinner from 'components/common/Spinner';

import NoDataImg from 'assets/images/img-no-data.jpg';

import style from "./style.module.scss";

const LOAD_MAX_IMG_NUM = 8;

const Landing = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [totalList, setTotalList] = useState([]);
  const [isNoData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const nameRef = useRef(name);
  const totalListRef = useRef([]);

  const getData = () => {
    setLoading(true);
    getBreed(nameRef.current)
      .then((res) => {
        console.log(res.data);
        const { data } = res;
        // totalListRef.current = data;
        setTotalList(data);
        if (data.length > LOAD_MAX_IMG_NUM) {
          setList(data.slice(0, LOAD_MAX_IMG_NUM));
        } else {
          setList(data);
        }

        setNoData(data.length === 0);
      })
      .catch((err) => {
        console.error(err);
        setNoData(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getDataDebounce = useCallback(
    debounce(() => {
      getData();
    }, 1000),
    []
  );

  const handleInputChange = (value) => {
    const val = value || "";
    setName(val);
    nameRef.current = val;
    getDataDebounce();
    // if (val.length > 2) {
    //   getDataDebounce();
    // } else {
    //   getData();
    // }
  };

  const handleLoadMore = () => {
    const totalSize = totalList.length;
    const currentSize = list.length;
    if (totalSize > currentSize) {
      const start = currentSize;
      const end =
        start + LOAD_MAX_IMG_NUM > totalSize
          ? totalSize
          : start + LOAD_MAX_IMG_NUM;

      setList((prev) => [...prev, ...totalList.slice(start, end)]);
    }
  };

  const renderItemList = () => {
    return (
      <>
        <div className={style["item-container"]}>
          {
            list.map((d) => {
              return (
                <Item
                  key={d.name}
                  imgId={d.reference_image_id}
                  name={d.name}
                  weight={d.weight}
                  lifeSpan={d.life_span}
                />
              );
            })
          }
        </div>

        {
          totalList.length > list.length && (
            <div className={style["load-more-btn"]} onClick={handleLoadMore}>
              Load More
            </div>
          )
        }
      </>
    );
  };

  return (
    <Layout>
      <div className={style.container}>
        <h1 className={style.title}>Search Cat</h1>
        <div className={style["search-input-wrapper"]}>
          <Input
            placeholder="input cat name"
            onChange={handleInputChange}
            value={name}
          />
        </div>

        {
          loading
            ? (
                <div className={style['status-wrapper']}>
                  <Spinner />
                </div>
              )
            : isNoData
              ? <img
                  className={style['status-wrapper']}
                  src={NoDataImg}
                  alt="no data"
                  width="300px"
                />
              : renderItemList()
        }
      </div>
    </Layout>
  );
};

export default Landing;
