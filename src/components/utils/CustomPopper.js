import React, { useState } from 'react';
import { Popover, PopoverBody } from 'reactstrap';

const CustomPopover = ({ triggerId, content, placement = 'bottom', actions = [], style={} }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const togglePopover = () => setPopoverOpen(!popoverOpen);

  return (
    <>
      <span id={triggerId} onClick={togglePopover} style={{ ...style, cursor: 'pointer' }}>
        {content.trigger}
      </span>
      <Popover
        placement={placement}
        isOpen={popoverOpen}
        target={triggerId}
        toggle={togglePopover}
        hideArrow
      >
        <PopoverBody>
          {actions.map((action, index) => (
            <div
              key={index}
              style={{ cursor: 'pointer', marginTop: '5px' }}
              onClick={() => {
                action.callback();
                togglePopover();
              }}
            >
              <span style={{ color: action.color }}>{action.name}</span>
            </div>
          ))}
        </PopoverBody>
      </Popover>
    </>
  );
};

export default CustomPopover;
