/**
 *
 * Topbar
 *
 */

import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Menu, PageHeader } from 'antd';
import { Link, withRouter } from 'react-router-dom';

function Topbar({ location }) {
  const [current, setCurrent] = useState(() => {
    const path = location.pathname.split('/')[1];
    return path;
  });

  const handleClick = useCallback(e => {
    setCurrent(e.key);
  }, []);

  return (
    <div>
      {/* <FormattedMessage {...messages.header} /> */}
      <PageHeader
        ghost={false}
        title="Prodigal Assignment"
        extra={
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
          >
            <Menu.Item key="filters">
              <Link to="/filters">Filters</Link>
            </Menu.Item>
            <Menu.Item key="labels">
              <Link to="/labels">Labels</Link>
            </Menu.Item>
          </Menu>
        }
      />
    </div>
  );
}

Topbar.propTypes = {
  location: PropTypes.object.isRequired,
};

export default memo(withRouter(Topbar));
