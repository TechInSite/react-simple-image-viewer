import React from 'react';
import styles from './styles.module.css';

interface IProps {
  src: string[];
  currentIndex?: number;
  backgroundStyle?: any;
  onClose: () => void;
}

interface IState {
  currentIndex: number;
}

export default class ReactSimpleImageViewer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.callOnClose = this.callOnClose.bind(this);

    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('wheel', this.handleWheel);

    this.state = {
      currentIndex: this.props.currentIndex === undefined
        ? 0
        : this.props.currentIndex,
    };
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('wheel', this.handleWheel);
  }

  private changeImage(direction: number) {
    let nextIndex = this.state.currentIndex + direction;

    if (nextIndex > this.props.src.length - 1) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = this.props.src.length - 1;
    }

    this.setState({
      currentIndex: nextIndex,
    });
  }

  private callOnClose() {
    if (this.props.onClose !== undefined) {
      this.props.onClose();
    }
  }

  private handleKeyDown(event: any) {
    if (event.key === 'Escape') {
      this.callOnClose();
    }

    if (['ArrowLeft', 'h'].includes(event.key)) {
      this.changeImage(-1);
    }

    if (['ArrowRight', 'l'].includes(event.key)) {
      this.changeImage(1);
    }
  }

  private handleClick(event: any) {
    if (event.target && event.target.id === 'ReactSimpleImageViewer') {
      this.callOnClose();
    }
  }

  private handleWheel(event: any) {
    if (event.wheelDeltaY > 0) {
      this.changeImage(-1);
    } else {
      this.changeImage(1);
    }
  }

  render() {
    const { src } = this.props;
    const { currentIndex } = this.state;

    return (
      <div
        id="ReactSimpleImageViewer"
        className={`${styles.wrapper} react-simple-image-viewer__modal`}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
        style={this.props.backgroundStyle}
      >
        <span className={`${styles.close} react-simple-image-viewer__close`} onClick={this.callOnClose}>
          &times;
        </span>

        {src.length > 1 && <span className={`${styles.navigation} ${styles.prev} react-simple-image-viewer__previous`} onClick={() => this.changeImage(-1)}>
          &#10094;
        </span>}

        {src.length > 1 && <span className={`${styles.navigation} ${styles.next} react-simple-image-viewer__next`} onClick={() => this.changeImage(1)}>
          &#10095;
        </span>}

        <div className={`${styles.content} react-simple-image-viewer__modal-content`}>
          <div className={`${styles.slide} react-simple-image-viewer__slide`}>
            <img className={styles.image} src={src[currentIndex]} alt=""/>
          </div>
        </div>
      </div>
    );
  }
}
