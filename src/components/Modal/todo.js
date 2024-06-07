import React from 'react'
import { Button, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap'
import { getTodos } from '../../action'
import moment from 'moment'
import { GoChevronDown } from 'react-icons/go'
import { RxDotsHorizontal } from 'react-icons/rx'
import CustomPopover from '../utils/CustomPopper'
import { FiClock } from 'react-icons/fi'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css';
import { RiPencilLine } from 'react-icons/ri'

const Todo = () => {
  const [todos, setTodos] = React.useState([])
  const [isOpen, setIsOpen] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [dateChanged, setDateChanged] = React.useState(false)
  const [isEdit, setIsEdit] = React.useState(false)

  React.useEffect(() => {
    getTodos().then(data => {
      setTodos(data)
    })
  }, [])

  const deletePopover = {
    trigger: <RxDotsHorizontal style={{ marginRight: 5, marginLeft: 5 }} />,
    body: (
      <div>
        <span style={{ color: "red" }}>Delete</span>
      </div>
    )
  };

  const toggleAccordion = (id) => {
    if (isOpen === id) {
      setIsOpen(null);
    } else {
      setIsOpen(id);
    }
  };

  const handleCalendar = (value) => {
    setSelectedDate(value)
    setShowCalendar(false)
  }

  const toggleShowCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const todoItem = (item, index, isOpen, toggleAccordion) => {
    return (
      <div key={index} style={{ borderBottom: '1px solid #828282' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          padding: 10,
          marginBottom: 10,
          width: '100%',
          alignItems: 'center',
          paddingTop: 22
        }} key={index}>
          <div style={{ width: '70%' }}>
            <FormGroup check>
              <Label check style={{ display: 'flex', alignItems: 'center' }}>
                <Input type="checkbox" />{' '}
                <strong style={{
                  marginLeft: 22,
                  wordWrap: 'break-word',
                  flex: 1,
                  textAlign: 'justify'
                }}>{item.title}</strong>
              </Label>
            </FormGroup>
          </div>
          <div style={{ width: '20%', textAlign: 'right' }}>
            {moment(item.due_on).utc().format('DD/MM/YYYY')}
          </div>
          <div style={{ width: '10%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {/* <GoChevronDown style={{ marginRight: 5, marginLeft: 5 }} /> */}
            <div id={index} onClick={() => toggleAccordion(index)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <GoChevronDown style={{ marginRight: 5, transition: 'transform 0.3s', transform: isOpen === index ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>
            <CustomPopover triggerId={`Popover-${item.id}`} content={deletePopover} />
          </div>
        </div>
        {isOpen === index && (
          <div style={{ padding: 10 }}>
            <div style={{
              position: 'relative',
              display: 'inline-block'
            }}>
              <InputGroup>
                <InputGroupText style={{ borderWidth: 0, backgroundColor: 'transparent' }}>
                  <FiClock />
                </InputGroupText>
                <Input style={{
                  borderRightWidth: 0,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5
                }}
                  placeholder="Set Date"
                  value={selectedDate ? moment(selectedDate).utc().format('DD/MM/YYYY') : ''}
                  readOnly
                  onClick={toggleShowCalendar}
                  onChange={() => setDateChanged(true)}
                />
                <InputGroupText style={{ backgroundColor: 'transparent', borderLeftWidth: 0 }}>
                  <MdOutlineCalendarToday onClick={toggleShowCalendar} />
                </InputGroupText>
              </InputGroup>
              {showCalendar && (
                <div style={{
                  position: 'absolute',
                  left: '90%',
                  backgroundColor: 'white',
                  border: '1px solid #828282',
                  borderRadius: 5,
                  zIndex: 1000
                }}>
                  <DayPicker onDayClick={handleCalendar} selectedDays={selectedDate} />
                </div>
              )}
            </div>
            <InputGroup style={{marginTop: 10}}>
              <InputGroupText style={{ borderWidth: 0, backgroundColor: 'transparent' }}>
                <RiPencilLine color={ isEdit ? 'blue' : 'black' } />
              </InputGroupText>
              <Input
                placeholder="No Description"
                style={{ borderWidth: 0 }}
                size={3}
                type='textarea'
                className='static-input'
                onChange={() => setIsEdit(true)}
              />
            </InputGroup>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div style={{
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Input
          id="myTask"
          name="select"
          type="select"
          defaultValue=""
          style={{
            width: '40%'
          }}
        >
          <option hidden value="">
            My Task
          </option>
          <option>
            Personal Errands
          </option>
          <option>
            Urgent To-Do
          </option>
        </Input>
        <Button
          color="primary"
        >
          New Task
        </Button>
      </div>
      {todos.map((item, index) => (
        todoItem(item, index, isOpen, toggleAccordion)
      ))}
    </div>
  )
}

export default Todo