import './dropdown.styles.scss';

export const ContentPrefDropDown = () => {
  return (
    <div>
      <select className='contentprefcontainer'>
        <option className='contentprefoption'>ON</option>
        <option className='contentprefoption'>OFF</option>
      </select>
    </div>
  );
}