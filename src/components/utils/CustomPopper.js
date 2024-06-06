import React, { useState } from 'react';
import { Popover, PopoverBody } from 'reactstrap';

const CustomPopover = ({ triggerId, content, placement = 'bottom' }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const togglePopover = () => setPopoverOpen(!popoverOpen);

  return (
    <>
      <span id={triggerId} onClick={togglePopover} style={{ cursor: 'pointer' }}>
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
          {content.body}
        </PopoverBody>
      </Popover>
    </>
  );
};

export default CustomPopover;
