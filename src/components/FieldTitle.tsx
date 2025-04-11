type FiledHeaderProps = {
  title: string
  essential?: boolean
}
export default function FieldTitle({ title, essential }: FiledHeaderProps) {
  return (
    <div className="text-left">
      <span className="font-bold text-m-medium">{title}</span>
      {essential && <span className="ml-1 text-text-danger">*</span>}
    </div>
  )
}
