import React, { useEffect, useState, useCallback, useMemo } from 'react';
import UserHomePage from '../userHomePage/index'
import PrivateChat from '../PrivatePage/index'
import './index.less'

export default  function ChatView() {
  const [nowChatId, setNowChatId] = useState()

  return (
    <div className='free-layout-chat free-switch'>
      <UserHomePage setNowChatId={setNowChatId} />
      <PrivateChat nowChatId={nowChatId} myId={JSON.parse(localStorage.getItem('freeUser')).id}/>
    </div>
  )
}
