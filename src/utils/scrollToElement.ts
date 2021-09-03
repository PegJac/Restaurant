/**
 * Takes an element reference and scrolls that element into view
 *
 * @param element : element reference returned from the useRef hook
 */

export const scrollToElement = (element: React.MutableRefObject<null>) => {
  if (element.current) {
    (element.current! as HTMLElement).scrollIntoView();
  }
};
