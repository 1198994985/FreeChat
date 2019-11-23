import React from 'react';
import './index.less'

export function FreeAvatar(props) {
  return (
    <div class="bruce flex-ct-x">
      <div class="avatar-shadow" style={{ background: `url(${props.image})  no-repeat center/cover` }}></div>
    </div>
  )
}