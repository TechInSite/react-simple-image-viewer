import React, { CSSProperties, useEffect, useState } from 'react';
import styles from './styles.module.css';

interface IProps {
  src: string[];
  currentIndex?: number;
  backgroundStyle?: CSSProperties;
  onClose?: () => void;
}

const ReactSimpleImageViewer = (props: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(props.currentIndex ?? 0);

  const changeImage = (delta: number) => {
    let nextIndex = (currentIndex + delta) % props.src.length;
    if (nextIndex < 0) nextIndex = props.src.length - 1;
    setCurrentIndex(nextIndex);
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Escape') {
      props.onClose?.();
    }

    if (['ArrowLeft', 'h'].includes(event.key)) {
      changeImage(-1);
    }

    if (['ArrowRight', 'l'].includes(event.key)) {
      changeImage(1);
    }
  }

  const handleWheel = (event: any) => {
    if (event.wheelDeltaY > 0) {
      changeImage(-1);
    } else {
      changeImage(1);
    }
  }

  const handleClick = (event: any) => {
    if (event.target && event.target.id === 'ReactSimpleImageViewer') {
      props.onClose?.();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
    }
  })
  
  return (
    <div
      id="ReactSimpleImageViewer"
      className={`${styles.wrapper} react-simple-image-viewer__modal`}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      style={props.backgroundStyle}
    >
      <span className={`${styles.close} react-simple-image-viewer__close`} onClick={() => props.onClose?.()}>
        &times;
      </span>

      {props.src.length > 1 && <span className={`${styles.navigation} ${styles.prev} react-simple-image-viewer__previous`} onClick={() => changeImage(-1)}>
        &#10094;
      </span>}

      {props.src.length > 1 && <span className={`${styles.navigation} ${styles.next} react-simple-image-viewer__next`} onClick={() => changeImage(1)}>
        &#10095;
      </span>}

      <div className={`${styles.content} react-simple-image-viewer__modal-content`}>
        <div className={`${styles.slide} react-simple-image-viewer__slide`}>
          <img className={styles.image} src={props.src[currentIndex]} alt=""/>
        </div>
      </div>
    </div>
  );
}

export default ReactSimpleImageViewer;
