import { $ } from '@core/dom';

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const { right, width, height, bottom } = $parent.getClientRect();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px'
    });

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - right;
        value = width + delta;
        $resizer.css({ right: -delta + 'px' });
      } else {
        const delta = e.pageY - bottom;
        value = height + delta;
        $resizer.css({ bottom: -delta + 'px' });
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (type === 'col') {
        $parent.css({ width: value + 'px' });
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px');
      } else {
        $parent.css({ height: value + 'px' });
      }

      resolve({
        value,
        type,
        id: $parent.data[type]
      });

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      });
    };
  });
}
