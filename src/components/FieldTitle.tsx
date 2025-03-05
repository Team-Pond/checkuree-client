interface IProps {
  title: string;
  essential?: boolean;
}
export default function FieldHeader({ title, essential }: IProps) {
  return (
    <div className="flex gap-1 items-center">
      <p className="font-bold text-m-medium">{title}</p>
      {essential && <p className="text-text-danger">*</p>}
    </div>
  );
}
