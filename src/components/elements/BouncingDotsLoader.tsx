import React from 'react';

import styles from '@/components/elements/BouncingDotsLoader.module.css';

const BouncingDotsLoader = () => {
  return (
    <>
      <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default BouncingDotsLoader;
