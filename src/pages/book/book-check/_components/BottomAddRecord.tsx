import BottomDrawer from '../../../../components/BottomDrawer'
import { useState } from 'react'
import { useMakeUpClassCreate } from '../queries'
import { useParams } from 'react-router-dom'

import { TimeSelectionView } from './bottomPages/TimeSelect'
import { StudentSearchView } from './bottomPages/StudentSearch'

type BottomAddRecordProps = {
  openFilter: boolean
  onDrawerChange: () => void
  attendanceBookId: number
  currentDate: string
}

export const BottomAddRecord = (props: BottomAddRecordProps) => {
  const { openFilter, onDrawerChange, attendanceBookId } = props

  const { bookId } = useParams()

  const [search, setSearch] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<{
    id: number
    name: string
  } | null>(null)

  const unsetSelectedStudent = () => {
    setSelectedTime('')
    setSelectedStudent(null)
  }

  const closeDrawer = () => {
    setSearch('')
    unsetSelectedStudent()
    onDrawerChange()
  }

  const { mutate: makeUpClassMutation } = useMakeUpClassCreate({
    attendanceBookId: Number(bookId!),
    currentDate: props.currentDate,
    attendTime: selectedTime,
    studentName: selectedStudent?.name || '',
    closeDrawer: closeDrawer,
  })

  return (
    <BottomDrawer isOpen={openFilter} onClose={() => closeDrawer()}>
      <div className="flex flex-col min-h-[350px] gap-0 p-1  max-h-[80vh] overflow-y-auto">
        {!selectedStudent ? (
          <StudentSearchView
            attendanceBookId={attendanceBookId}
            onSelectStudent={setSelectedStudent}
            search={search}
            setSearch={setSearch}
          />
        ) : (
          <TimeSelectionView
            student={selectedStudent}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            onBack={() => unsetSelectedStudent()}
            onConfirm={() =>
              makeUpClassMutation({
                attendeeId: selectedStudent.id,
              })
            }
          />
        )}
      </div>
    </BottomDrawer>
  )
}
