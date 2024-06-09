import React from 'react'
import moment from 'moment'
import { GoChevronDown } from 'react-icons/go'
import { RxDotsHorizontal } from 'react-icons/rx'
import CustomPopover from '../../utils/CustomPopper'
import { FiClock } from 'react-icons/fi'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css';
import { RiPencilLine } from 'react-icons/ri'
import { FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap'
import 'moment/locale/id'

const TodoItem = ({ item, index, updateTodo, removeTodo, addTodo, newTodoItem}) => {

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(null);
  const [checked, setChecked] = React.useState(false);
  const [note, setNote] = React.useState("")
  const [isBlur, setIsBlur] = React.useState(true)

  React.useEffect(() => {
    setChecked(item.status === 'completed')
  }, [item.status])

  const eventPopover = {
    trigger: <RxDotsHorizontal style={{ marginRight: 5, marginLeft: 5 }} />,
    body: (
      <div style={{cursor: 'pointer'}}>
        <span style={{ color: "red" }}>Delete</span>
      </div>
    )
  };
  const deleteTodo = () => {
    removeTodo(item.id).then(() => {
      window.alert("Success Delete Status")
    }).catch(err => {
      window.alert(err.message)
    })
  }

  const actions = [
    {
      name: 'Delete',
      color: 'red',
      callback: deleteTodo,
    },
  ];
  
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
    updateData('datepicker')
  }

  const toggleShowCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const handleCheck = () => {
    setChecked(!checked)
    updateData('checkbox')
  }

  const updateTodoItem = (data) => {
    updateTodo(
      item.id, 
      data
    ).then(() => {
      window.alert("Success Update Status")
    }).catch((e) => window.alert(e.message))
  }

  const updateData = (type) => {
    const {id, ...dataWithoutId} = {
      id: item.id,
      user_id: item.user_id,
      title: item.title,
      due_on: item.due_on,
      status: item.status
    }
    switch (type) {
      case 'checkbox':
        updateTodoItem({
            ...dataWithoutId,
            status: checked ? 'completed' : 'pending'
          })
        break;

      case 'note':
        if (note !== item.title) {
        updateTodoItem({
            ...dataWithoutId,
            title: note
          })
        }
        break;
      
      case 'datepicker':
        if (selectedDate) {
          updateTodoItem({
            ...dataWithoutId,
            due_on: moment(selectedDate, 'DD/MM/YYYY').toISOString()
          })
        }
        break;
    
      default:
        break;
    }
  }

  React.useEffect(() => {
    const { newItem, ...newTodoItemAsyc } = {
      newItem: true,
      ...newTodoItem
    }
    const newTodo = (data) => {
      addTodo(data).then(() => {
        window.alert("Success Add Status")
      }).catch(err => {
        window.alert(err.message)
      })
    }
    if (newItem && selectedDate && note && isBlur) {
      newTodo({
        ...newTodoItemAsyc,
        due_on: moment(selectedDate, 'DD/MM/YYYY').toISOString(),
        title: note
      })
    }
  }, [note, selectedDate, isBlur, addTodo, newTodoItem])

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
              <Input 
                type="checkbox" 
                checked={checked}
                onChange={handleCheck}
              />{' '}
              <strong style={{
                marginLeft: 22,
                wordWrap: 'break-word',
                flex: 1,
                textAlign: 'justify',
                textDecorationLine: checked ? 'line-through' : 'none',
                color: checked ? '#828282' : '#4F4F4F'
              }}>{item.title}</strong>
            </Label>
          </FormGroup>
        </div>
        <div style={{ width: '20%', textAlign: 'right' }}>
          {moment(item.due_on).format('DD/MM/YYYY')}
        </div>
        <div style={{ width: '10%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div id={index} onClick={
            () => toggleAccordion(index)} style={{ 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center' 
            }}>
            <GoChevronDown style={{ 
              marginRight: 5,
              transition: 'transform 0.3s',
              transform: isOpen === index ? 'rotate(180deg)' : 'rotate(0deg)' 
            }} />
          </div>
          <CustomPopover triggerId={`Popover-${item.id}`} content={eventPopover} actions={actions} />
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
                <FiClock color={selectedDate ? 'blue' : 'black'
                } />
              </InputGroupText>
              <Input style={{
                borderRightWidth: 0,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5
              }}
                placeholder="Set Date"
                value={selectedDate
                  ? moment(selectedDate).format('DD/MM/YYYY')
                  : moment(item.due_on).format('DD/MM/YYYY')}
                readOnly
                onClick={toggleShowCalendar}
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
                <DayPicker
                  onDayClick={handleCalendar}
                  selectedDays={selectedDate
                    ? moment(selectedDate).format('DD/MM/YYYY')
                    : moment(item.due_on).format('DD/MM/YYYY')}
                />
              </div>
            )}
          </div>
          <InputGroup style={{ marginTop: 10 }}>
            <InputGroupText style={{ borderWidth: 0, backgroundColor: 'transparent' }}>
              <RiPencilLine color={note !== item.title ? 'blue' : 'black'} />
            </InputGroupText>
            <Input
              placeholder="No Description"
              style={{ borderWidth: 0 }}
              size={3}
              type='textarea'
              className='static-input'
              defaultValue={item.title}
              onChange={e => setNote(e.target.value)}
              onClick={() => setIsBlur(false)}
              onBlur={() => {      
                updateData('note')
                setIsBlur(true)
              }}
            />
          </InputGroup>
        </div>
      )}
    </div>
  );
};

export default TodoItem