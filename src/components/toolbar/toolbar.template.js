import { getButtons } from '@/components/toolbar/toolbar.buttons';

function toButton(button) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `;
  return `
    <div 
      class="button ${button.active ? 'active' : ''}"
      ${meta}
    >
      <i class="material-icons" ${meta}>${button.icon}</i>
    </div>
  `;
}

export function createToolbar(state) {
  return getButtons(state).map(toButton).join('');
}
