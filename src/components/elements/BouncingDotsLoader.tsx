import React from 'react';

import styles from '@/components/elements/BouncingDotsLoader.module.css';

const BouncingDotsLoader = ({ fontSize }: { fontSize?: number }) => {
  return (
    <>
      <div className={styles.loader} style={{ fontSize }}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default BouncingDotsLoader;
