import React, { useState, useCallback, useEffect } from 'react';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".styles-module_wrapper__1I_qj {\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  position: fixed;\n  padding: 0px 60px 0px 60px;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: black;\n  box-sizing: border-box;\n}\n\n.styles-module_content__2jwZj {\n  margin: auto;\n  padding: 0;\n  width: 90%;\n  height: 100%;\n  max-height: 100%;\n  text-align: center;\n}\n\n.styles-module_slide__1zrfk {\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.styles-module_image__2hdkJ {\n  max-height: 100%;\n  max-width: 100%;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n}\n\n.styles-module_close__2I1sI {\n  color: white;\n  position: absolute;\n  top: 15px;\n  right: 15px;\n  font-size: 40px;\n  font-weight: bold;\n  opacity: 0.2;\n  cursor: pointer;\n}\n\n.styles-module_close__2I1sI:hover {\n  opacity: 1;\n}\n\n.styles-module_navigation__1pqAE {\n  height: 80%;\n  color: white;\n  cursor: pointer;\n  position: absolute;\n  font-size: 60px;\n  line-height: 60px;\n  font-weight: bold;\n  display: flex;\n  align-items: center;\n  opacity: 0.2;\n  padding: 0 15px;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n}\n\n.styles-module_navigation__1pqAE:hover {\n  opacity: 1;\n}\n\n.styles-module_prev__KqFRp {\n  left: 0;\n}\n\n.styles-module_next__1uQwZ {\n  right: 0;\n}\n";
var styles = {"wrapper":"styles-module_wrapper__1I_qj","content":"styles-module_content__2jwZj","slide":"styles-module_slide__1zrfk","image":"styles-module_image__2hdkJ","close":"styles-module_close__2I1sI","navigation":"styles-module_navigation__1pqAE","prev":"styles-module_prev__KqFRp","next":"styles-module_next__1uQwZ"};
styleInject(css_248z);

const ReactSimpleImageViewer = (props) => {
    var _a;
    const [currentIndex, setCurrentIndex] = useState((_a = props.currentIndex) !== null && _a !== void 0 ? _a : 0);
    const changeImage = useCallback((delta) => {
        let nextIndex = (currentIndex + delta) % props.src.length;
        if (nextIndex < 0)
            nextIndex = props.src.length - 1;
        setCurrentIndex(nextIndex);
    }, [setCurrentIndex]);
    const handleClick = useCallback((event) => {
        var _a;
        if (event.target && event.target.id === "ReactSimpleImageViewer") {
            (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
        }
    }, [props.onClose]);
    const handleKeyDown = useCallback((event) => {
        var _a;
        if (event.key === "Escape") {
            (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
        }
        if (["ArrowLeft", "h"].includes(event.key)) {
            changeImage(-1);
        }
        if (["ArrowRight", "l"].includes(event.key)) {
            changeImage(1);
        }
    }, [props.onClose, changeImage]);
    const handleWheel = useCallback((event) => {
        if (event.wheelDeltaY > 0) {
            changeImage(-1);
        }
        else {
            changeImage(1);
        }
    }, [changeImage]);
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("wheel", handleWheel);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("wheel", handleWheel);
        };
    }, [handleKeyDown, handleWheel]);
    return (React.createElement("div", { id: "ReactSimpleImageViewer", className: `${styles.wrapper} react-simple-image-viewer__modal`, onKeyDown: handleKeyDown, onClick: handleClick, style: props.backgroundStyle },
        React.createElement("span", { className: `${styles.close} react-simple-image-viewer__close`, onClick: () => { var _a; return (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props); } }, "\u00D7"),
        props.src.length > 1 && (React.createElement("span", { className: `${styles.navigation} ${styles.prev} react-simple-image-viewer__previous`, onClick: () => changeImage(-1) }, "\u276E")),
        props.src.length > 1 && (React.createElement("span", { className: `${styles.navigation} ${styles.next} react-simple-image-viewer__next`, onClick: () => changeImage(1) }, "\u276F")),
        React.createElement("div", { className: `${styles.content} react-simple-image-viewer__modal-content` },
            React.createElement("div", { className: `${styles.slide} react-simple-image-viewer__slide` },
                React.createElement("img", { className: styles.image, src: props.src[currentIndex], alt: "" })))));
};

export default ReactSimpleImageViewer;
//# sourceMappingURL=index.esm.js.map
