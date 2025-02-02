import BottomDrawer from '../../../../components/BottomDrawer';

type IProps = {
  openFilter: boolean;
  onDrawerChange: () => void;
}

export const BottomAddRecord = (props:IProps) => {
  const {openFilter, onDrawerChange} = props;
  return (
    <BottomDrawer
      isOpen={openFilter}
      onClose={onDrawerChange}
      children={
        <p>BottomAddRecord</p>
      }
      />
  )
}